// Spoken answers for the call. Two engines, same interface:
//   HighQualityVoice: Kyutai Pocket TTS running in the visitor's browser. The model files (~125 MB)
//                     are fetched quietly in the background on capable desktops, then kept in the
//                     browser's cache. The speech engine itself only starts when a call does.
//   BrowserVoice:     the browser's built-in speechSynthesis (instant, no download). Used on phones,
//                     data-saver connections, or if the natural voice cannot run.
// Nothing here talks to our server: the answer text is already on the page.

const FADE = 480;
const SLOW_BELOW = 0.95; // speech slower than real time stutters: fall back
const SLOW_AFTER_CHUNKS = 4;
const VOICE = 'marius';
// Built at runtime so Vite leaves these self-hosted /public files alone.
const asset = (path) => new URL(path, window.location.origin).href;

export function voiceSupport() {
  const hasAudio = !!(window.AudioContext || window.webkitAudioContext);
  const conn = navigator.connection;
  const capable =
    hasAudio &&
    typeof WebAssembly === 'object' &&
    window.isSecureContext &&
    'caches' in window &&
    typeof AudioWorkletNode !== 'undefined' &&
    !conn?.saveData &&
    (navigator.deviceMemory === undefined || navigator.deviceMemory >= 4);
  return {
    builtin: 'speechSynthesis' in window,
    highQuality: !!capable,
    // Download in the background only where it is clearly fine: a desktop-sized screen on a fast connection.
    autoDownload:
      !!capable &&
      window.matchMedia('(min-width: 900px)').matches &&
      (conn?.effectiveType === undefined || conn.effectiveType === '4g'),
    recognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  };
}

// Make an answer pleasant to hear: no URLs, no markup, no symbols a speech engine reads badly.
export function speakable(text, projects = []) {
  const titleOf = (slug) => projects.find((p) => p.slug === slug)?.title;
  return text
    .replace(/\(\s*see\s+\/projects\/[a-z0-9-]+\s*\)/gi, '')
    .replace(/\bsee\s+\/projects\/[a-z0-9-]+/gi, '')
    .replace(/\/projects\/([a-z0-9-]+)/g, (_, slug) => titleOf(slug) ?? 'the project page')
    .replace(/\/work\b/g, 'the experience page')
    .replace(/[‐-―]/g, '-') // fancy hyphens and dashes
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[≈~]/g, 'about ')
    .replace(/%/g, ' percent')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/\s*\(\s*/g, ', ') // asides read better as commas
    .replace(/\s*\)\s*/g, ', ')
    .replace(/[*_`#>]/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*([.!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ------------------------------ built-in voice ------------------------------ */

export class BrowserVoice {
  constructor() {
    this._pulse = 0;
    this._speaking = false;
  }

  // There is no audio to measure for the built-in voice, so word boundaries drive a soft pulse.
  getLevel() {
    this._pulse *= 0.9;
    return this._speaking ? Math.min(1, 0.18 + this._pulse * 0.6) : 0;
  }

  stop() {
    this._speaking = false;
    window.speechSynthesis?.cancel();
  }

  speak(text) {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth || !text) return resolve();
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      u.voice = voices.find((v) => /^en[-_]/i.test(v.lang) && v.localService) || voices.find((v) => /^en/i.test(v.lang)) || null;
      u.lang = u.voice?.lang || 'en-US';
      u.onboundary = () => { this._pulse = 1; };
      u.onend = u.onerror = () => { this._speaking = false; resolve(); };
      this._speaking = true;
      synth.speak(u);
    });
  }
}

/* --------------------------- high-quality voice ---------------------------- */

let singleton = null;
export const getHighQualityVoice = () => (singleton ??= new HighQualityVoice());

export class HighQualityVoice {
  constructor() {
    this.ctx = null;
    this.player = null;
    this.worker = null;
    this.ready = false; // engine running, can speak
    this.cached = false; // model files stored in the browser
    this.onProgress = () => {};
    this.onSlow = () => {};
    this._pending = {};
    this._prefetching = null;
    this._loading = null;
    this._done = null;
    this._rtf = [];
    this._speaking = false;
    this._buf = null;
  }

  /* worker plumbing */

  _worker() {
    if (!this.worker) {
      this.worker = new Worker(asset('/tts/inference-worker.js?v=2'), { type: 'module' });
      this.worker.onmessage = (e) => this._dispatch(e.data);
      this.worker.onerror = (e) => this._reject(new Error(e.message || 'Voice worker failed'));
    }
    return this.worker;
  }

  _wait(kind) {
    return new Promise((resolve, reject) => { this._pending[kind] = { resolve, reject }; });
  }

  _reject(err) {
    const waiting = Object.values(this._pending);
    this._pending = {};
    if (waiting.length) waiting.forEach((p) => p.reject(err));
    else console.error('[voice]', err);
  }

  _dispatch(m) {
    switch (m.type) {
      case 'download_progress': this.onProgress(m.loaded, m.total); break;
      case 'prefetched': this._pending.prefetched?.resolve(); delete this._pending.prefetched; break;
      case 'loaded': this._pending.loaded?.resolve(); delete this._pending.loaded; break;
      case 'error':
        this._reject(new Error(String(m.error)));
        this.stop();
        break;
      case 'audio_chunk': this._chunk(m.data, m.metrics); break;
      case 'stream_ended': this.player?.notifyStreamEnded?.(); break;
      default: break;
    }
  }

  /* loading */

  // Quietly download and store the model files. Does not start the speech engine, so it is cheap on memory.
  prefetch() {
    if (this.cached || this.ready) return Promise.resolve();
    this._prefetching ??= (async () => {
      const wait = this._wait('prefetched');
      this._worker().postMessage({ type: 'prefetch' });
      await wait;
      this.cached = true;
    })().catch((e) => { this._prefetching = null; throw e; });
    return this._prefetching;
  }

  // Start the speech engine. Must be called from a click or keypress (browsers block audio otherwise).
  load() {
    if (this.ready) return this.unlock().then(() => this);
    this._loading ??= this._load().catch((e) => {
      this._loading = null;
      this.dispose();
      throw e;
    });
    return this._loading;
  }

  async _load() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx({ sampleRate: 24000, latencyHint: 'interactive' });
    await this.ctx.audioWorklet.addModule(asset('/tts/PCMPlayerWorklet.js?v=1'));
    const { PCMPlayerWorklet } = await import(/* @vite-ignore */ asset('/tts/PCMPlayerWorklet.js?v=1'));
    this.player = new PCMPlayerWorklet(this.ctx, { minBufferBeforePlaybackMs: 700 }); // a little head start avoids gaps
    this.player.addEventListener('audioEnded', () => this._finish());

    const wait = this._wait('loaded');
    this._worker().postMessage({ type: 'load' });
    await wait;
    this.ready = true;
    this.cached = true;
    return this;
  }

  async unlock() {
    if (this.ctx?.state === 'suspended') await this.ctx.resume();
  }

  /* speaking */

  // Loudness of what is playing right now, 0..1 (for the visuals).
  getLevel() {
    const an = this.player?.analyser;
    if (!an || !this._speaking) return 0;
    this._buf ??= new Uint8Array(an.fftSize);
    an.getByteTimeDomainData(this._buf);
    let sum = 0;
    for (let i = 0; i < this._buf.length; i++) { const v = (this._buf[i] - 128) / 128; sum += v * v; }
    return Math.min(1, Math.sqrt(sum / this._buf.length) * 4);
  }

  _chunk(data, metrics) {
    if (!this._speaking) return;
    if (!metrics.isSilence) {
      if (metrics.isFirst || metrics.chunkStart) for (let i = 0; i < Math.min(FADE, data.length); i++) data[i] *= i / FADE;
      if (metrics.isLast) for (let i = 0; i < Math.min(FADE, data.length); i++) data[data.length - 1 - i] *= i / FADE;
      if (metrics.genTimeSec > 0) {
        this._rtf.push(metrics.chunkDuration / metrics.genTimeSec);
        if (this._rtf.length >= SLOW_AFTER_CHUNKS) {
          const avg = this._rtf.reduce((a, b) => a + b, 0) / this._rtf.length;
          if (avg < SLOW_BELOW) {
            this.stop();
            this.onSlow(avg);
            return;
          }
        }
      }
    }
    this.player.playAudio(data);
  }

  speak(text) {
    if (!this.ready || !text) return Promise.resolve();
    this.stop();
    this._rtf = [];
    this._speaking = true;
    return new Promise((resolve) => {
      this._done = resolve;
      this.unlock().then(() => this.worker.postMessage({ type: 'generate', data: { text, voice: VOICE } }));
    });
  }

  _finish() {
    this._speaking = false;
    const done = this._done;
    this._done = null;
    done?.();
  }

  stop() {
    if (this.worker && this._speaking) this.worker.postMessage({ type: 'stop' });
    this.player?.reset();
    this._finish();
  }

  dispose() {
    this.worker?.terminate();
    this.ctx?.close().catch(() => {});
    this.worker = this.player = this.ctx = null;
    this.ready = false;
    this._loading = null;
    this._prefetching = null;
    this._finish();
    singleton = null;
  }
}
