// Spoken answers. Two engines, same interface:
//   HighQualityVoice: Kyutai Pocket TTS running in the visitor's browser (opt-in ~125 MB download, cached)
//   BrowserVoice:     the browser's built-in speechSynthesis (instant, no download)
// Nothing here talks to our server: the answer text is already on the page.

const FADE = 480;
const SLOW_BELOW = 0.95; // speech slower than real time stutters: fall back
const SLOW_AFTER_CHUNKS = 4;
const VOICE_NAME = 'alba';
// Built at runtime so Vite leaves these self-hosted /public files alone.
const asset = (path) => new URL(path, window.location.origin).href;

export function voiceSupport() {
  const hasAudio = typeof window !== 'undefined' && !!(window.AudioContext || window.webkitAudioContext);
  const conn = navigator.connection;
  return {
    builtin: 'speechSynthesis' in window,
    // High quality needs WebAssembly, AudioWorklet, Cache Storage, a secure page, and a real computer.
    highQuality:
      hasAudio &&
      typeof WebAssembly === 'object' &&
      !!window.isSecureContext &&
      'caches' in window &&
      typeof AudioWorkletNode !== 'undefined' &&
      window.matchMedia('(min-width: 900px)').matches &&
      !conn?.saveData &&
      (navigator.deviceMemory === undefined || navigator.deviceMemory >= 4),
    recognition: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  };
}

// Make an answer pleasant to hear: no URLs, no markup.
export function speakable(text, projects = []) {
  const titleOf = (slug) => projects.find((p) => p.slug === slug)?.title;
  return text
    .replace(/\(\s*see\s+\/projects\/[a-z0-9-]+\s*\)/gi, '')
    .replace(/\bsee\s+\/projects\/[a-z0-9-]+/gi, '')
    .replace(/\/projects\/([a-z0-9-]+)/g, (_, slug) => titleOf(slug) ?? 'the project page')
    .replace(/\/work\b/g, 'the Experience page')
    .replace(/[*_`#>]/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ------------------------------ built-in voice ------------------------------ */

export class BrowserVoice {
  stop() {
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
      u.onend = u.onerror = () => resolve();
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
    this.ready = false;
    this.loading = null;
    this.onProgress = () => {};
    this.onSlow = () => {};
    this._done = null;
    this._rtf = [];
    this._speaking = false;
  }

  // Must be called from a click or keypress (browsers block audio otherwise).
  load() {
    if (this.ready) return this.unlock().then(() => this);
    if (this.loading) return this.loading;
    this.loading = this._load().catch((e) => {
      this.loading = null;
      this.dispose();
      throw e;
    });
    return this.loading;
  }

  async _load() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx({ sampleRate: 24000, latencyHint: 'interactive' });
    await this.ctx.audioWorklet.addModule(asset('/tts/PCMPlayerWorklet.js?v=1'));
    const { PCMPlayerWorklet } = await import(/* @vite-ignore */ asset('/tts/PCMPlayerWorklet.js?v=1'));
    this.player = new PCMPlayerWorklet(this.ctx, { minBufferBeforePlaybackMs: 700 }); // a little head start avoids gaps
    this.player.addEventListener('audioEnded', () => this._finish());

    this.worker = new Worker(asset('/tts/inference-worker.js?v=1'), { type: 'module' });
    await new Promise((resolve, reject) => {
      this.worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'download_progress') this.onProgress(m.loaded, m.total);
        else if (m.type === 'loaded') resolve();
        else if (m.type === 'error') reject(new Error(String(m.error)));
        else this._onMessage(m);
      };
      this.worker.onerror = (e) => reject(new Error(e.message || 'Voice worker failed'));
      this.worker.postMessage({ type: 'load' });
    });
    this.worker.onmessage = (e) => this._onMessage(e.data);
    this.ready = true;
    return this;
  }

  async unlock() {
    if (this.ctx?.state === 'suspended') await this.ctx.resume();
  }

  _onMessage(m) {
    if (m.type === 'audio_chunk') return this._chunk(m.data, m.metrics);
    if (m.type === 'stream_ended') return this.player?.notifyStreamEnded?.();
    if (m.type === 'error') {
      console.error('[voice]', m.error);
      this.stop();
    }
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
      this.unlock().then(() => this.worker.postMessage({ type: 'generate', data: { text, voice: VOICE_NAME } }));
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
    this._finish();
    singleton = null;
  }
}

// Has the voice been downloaded before? (Then enabling it needs no big download.)
export async function highQualityVoiceIsCached() {
  try {
    return (await caches.keys()).some((k) => k.startsWith('pocket-tts-'));
  } catch {
    return false;
  }
}
