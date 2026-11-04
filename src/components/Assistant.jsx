import React, { Suspense, lazy, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ask } from '../lib/askStream';
import { BrowserVoice, getHighQualityVoice, speakable, voiceSupport } from '../lib/voice';
import { setCallActive } from '../lib/callStore';
import { setLevelSource, startMicMeter } from '../lib/level';
import CallButton from './CallButton';
import VoiceLine from './VoiceLine';
import { contact, projects } from '../content';

const CallStage = lazy(() => import('./CallStage')); // pulls in the Hairline figure only when a call starts

const SUGGESTIONS = [
  'Which projects used Python?',
  'What did the Ore Chimney report conclude?',
  'Has Arman worked with groundwater data?',
];
const MAX_QUESTIONS = 12;
const SLUGS = new Set(projects.map((p) => p.slug));
const MB = (n) => (n / 1e6).toFixed(0);

const ERRORS = {
  busy: 'The assistant is busy answering other visitors. Please try again in a minute.',
  rate_limited: 'That is a lot of questions at once. Please wait a minute and try again.',
  daily_cap: 'The assistant has reached its free limit for today.',
  quota: 'The assistant has reached its free limit for today.',
  bot_check: 'The request could not be verified. Please reload the page and try again.',
  too_large: 'That question is too long. Please shorten it.',
  default: 'The assistant is not available right now.',
};

const MIC_ERRORS = {
  'not-allowed': "Microphone access is blocked. Allow it in your browser's address bar, or type your question.",
  'service-not-allowed': "Microphone access is blocked. Allow it in your browser's address bar, or type your question.",
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection.',
};
const FATAL_MIC = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'network']);

// Turn "/projects/some-slug" and "/work" in an answer into real links.
function renderAnswer(text, linkClass) {
  return text.split(/(\/projects\/[a-z0-9-]+|\/work\b)/g).map((part, i) => {
    const slug = part.startsWith('/projects/') ? part.slice(10) : null;
    if ((slug && SLUGS.has(slug)) || part === '/work') {
      return <Link key={i} to={part} className={linkClass}>{part}</Link>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function Assistant({ tone = 'deep' }) {
  const dark = tone === 'deep';
  const inputId = useId();
  const support = useMemo(() => voiceSupport(), []);

  const [turns, setTurns] = useState([]); // { q, a, error? }
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [download, setDownload] = useState({ loaded: 0, total: 0 });

  const [call, setCall] = useState('idle'); // idle | connecting | listening | thinking | speaking
  const [heard, setHeard] = useState('');
  const [stageSlot, setStageSlot] = useState(null);

  const abortRef = useRef(null);
  const endRef = useRef(null);
  const recRef = useRef(null);
  const meterRef = useRef(null);
  const callOn = useRef(false);
  const browserVoice = useRef(new BrowserVoice());
  const engineRef = useRef(null); // the natural voice, once it is running
  const naturalFailed = useRef(false);

  const stopSpeaking = useCallback(() => {
    browserVoice.current.stop();
    engineRef.current?.stop();
  }, []);

  const endCall = useCallback((message) => {
    callOn.current = false;
    recRef.current?.abort?.();
    recRef.current = null;
    abortRef.current?.abort();
    stopSpeaking();
    meterRef.current?.stop?.();
    meterRef.current = null;
    setLevelSource(null);
    setCall('idle');
    setHeard('');
    setBusy(false);
    setCallActive(false);
    setStageSlot(null);
    if (message) setNotice(message);
  }, [stopSpeaking]);

  useEffect(() => () => {
    abortRef.current?.abort();
    callOn.current = false;
    recRef.current?.abort?.();
    meterRef.current?.stop?.();
    setLevelSource(null);
    setCallActive(false);
    browserVoice.current.stop();
    engineRef.current?.stop();
  }, []);
  useEffect(() => { if (busy) endRef.current?.scrollIntoView({ block: 'nearest' }); }, [turns, busy]);

  /* ------------- natural voice: quiet background download on capable desktops ------------- */

  const watchProgress = useCallback((engine) => {
    let lastPaint = 0;
    engine.onProgress = (loaded, total) => {
      const now = performance.now();
      if (now - lastPaint > 150 || loaded >= total) { lastPaint = now; setDownload({ loaded, total }); }
    };
    engine.onSlow = (rtf) => {
      naturalFailed.current = true;
      engine.dispose();
      engineRef.current = null;
      setNotice(`This computer is too slow for the natural voice (${rtf.toFixed(1)}x real time), so I switched to your browser's voice.`);
    };
  }, []);

  useEffect(() => {
    if (!support.autoDownload) return undefined;
    let cancelled = false;
    const start = () => {
      if (cancelled || document.visibilityState !== 'visible') return;
      const engine = getHighQualityVoice();
      watchProgress(engine);
      engine.prefetch().catch((e) => console.warn('[voice] background download skipped:', e.message));
    };
    // Wait until the page has finished loading and the browser is idle, so it never competes with the site.
    const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 8000 }) : setTimeout(start, 3000));
    const onLoad = () => setTimeout(idle, 2500);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    return () => { cancelled = true; window.removeEventListener('load', onLoad); };
  }, [support.autoDownload, watchProgress]);

  /* -------------------------------- asking -------------------------------- */

  const done = turns.filter((t) => !t.error).length >= MAX_QUESTIONS;

  const send = async (question, { call: inCall = false } = {}) => {
    const q = question.trim();
    if (!q || (busy && !inCall) || done) return '';
    stopSpeaking();
    setNotice('');
    setValue('');
    setHeard('');
    setBusy(true);
    const history = turns.filter((t) => !t.error).flatMap((t) => [
      { role: 'user', content: t.q },
      { role: 'assistant', content: t.a },
    ]);
    setTurns((t) => [...t, { q, a: '' }]);
    const controller = new AbortController();
    abortRef.current = controller;
    const update = (patch) => setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, ...patch } : x)));
    let answer = '';
    try {
      answer = await ask([...history, { role: 'user', content: q }], {
        signal: controller.signal,
        mode: inCall ? 'call' : 'text',
        onText: (a) => update({ a }),
      });
    } catch (e) {
      if (e.name !== 'AbortError') update({ error: ERRORS[e.code] || ERRORS.default });
    } finally {
      setBusy(false);
    }
    return answer;
  };

  const clear = () => {
    abortRef.current?.abort();
    stopSpeaking();
    setTurns([]);
    setBusy(false);
    setNotice('');
  };

  /* ----------------------------------- call ----------------------------------- */

  // One turn of listening: resolves with what was said (or why nothing was).
  const listenOnce = () => new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    recRef.current = rec;
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    let finalText = '';
    let error = null;
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join('').trim();
      setHeard(text);
      if (e.results[e.results.length - 1].isFinal) finalText = text;
    };
    rec.onerror = (e) => { error = e.error; };
    rec.onend = () => { recRef.current = null; resolve({ text: finalText, error }); };
    try { rec.start(); } catch { resolve({ text: '', error: 'audio-capture' }); }
  });

  // Speak with the natural voice when it is running, otherwise the browser's.
  const speak = async (answer) => {
    const text = speakable(answer, projects);
    const engine = engineRef.current;
    if (engine?.ready) {
      setLevelSource(() => engine.getLevel());
      await engine.speak(text);
      if (engineRef.current) return; // finished (or slow check fell back: then read it with the browser voice)
    }
    setLevelSource(() => browserVoice.current.getLevel());
    await browserVoice.current.speak(text);
  };

  const startCall = async () => {
    if (callOn.current) return;
    callOn.current = true;
    setNotice('');
    stopSpeaking();
    // These have to start inside the click, or the browser keeps the audio muted.
    window.speechSynthesis?.speak(new SpeechSynthesisUtterance(''));
    let natural = null;
    if (support.highQuality && !naturalFailed.current) {
      const engine = getHighQualityVoice();
      watchProgress(engine);
      natural = engine.load(); // unlocks audio now, finishes (from the browser's cache) in a moment
      natural.catch(() => {});
    }

    setCall('connecting');
    setCallActive(true);
    setStageSlot(window.matchMedia('(min-width: 1024px)').matches ? document.getElementById('call-stage-slot') : null);

    const meter = await startMicMeter();
    if (meter.error) return endCall(MIC_ERRORS[meter.error]);
    meterRef.current = meter;

    if (natural) {
      try {
        engineRef.current = await natural;
      } catch (e) {
        console.error('[voice]', e);
        naturalFailed.current = true;
        engineRef.current = null;
        setNotice("The natural voice could not start, so I'm using your browser's voice.");
      }
    }
    if (!callOn.current) return undefined;

    let quiet = 0;
    while (callOn.current) {
      setCall('listening');
      setLevelSource(() => meterRef.current?.level() ?? 0);
      const { text, error } = await listenOnce();
      if (!callOn.current) break;
      if (error && FATAL_MIC.has(error)) return endCall(MIC_ERRORS[error]);
      if (!text) {
        quiet += 1;
        if (quiet >= 3) return endCall('I did not hear anything, so I ended the call. Press the circle to start again.');
        continue;
      }
      quiet = 0;
      setCall('thinking');
      setLevelSource(null);
      const answer = await send(text, { call: true });
      if (!callOn.current) break;
      if (document.querySelector('[data-call-limit]')) return endCall('That is the limit for one visit. You can email me for more.');
      if (answer) {
        setCall('speaking');
        await speak(answer);
      } else {
        quiet += 1; // an error turn: give up after a few
        if (quiet >= 3) return endCall('The assistant is not answering right now. Please type your question or email me.');
      }
    }
    return undefined;
  };

  const onCallButton = () => {
    if (call === 'idle') startCall();
    else endCall();
  };

  // Tapping while the assistant is talking cuts in, like interrupting someone on the phone.
  const interrupt = () => {
    if (call === 'speaking') stopSpeaking();
  };

  /* -------------------------------- styling -------------------------------- */

  const c = dark
    ? { muted: 'text-paper/65', body: 'text-paper', rule: 'border-paper/20', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag', sug: 'text-paper/80 hover:text-flag', accent: 'text-flag', line: 'border-paper/40' }
    : { muted: 'text-ink-3', body: 'text-ink', rule: 'border-rule', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink', sug: 'text-ink-2 hover:text-flag-ink', accent: 'text-flag-ink', line: 'border-ink-3' };

  const onCall = call !== 'idle';
  const canCall = support.recognition && (support.builtin || support.highQuality);
  const waitingForVoice = call === 'connecting' && download.total > 0 && download.loaded < download.total;

  const stage = onCall && (
    <Suspense fallback={null}>
      <CallStage state={call} caption={heard} onEnd={() => endCall()} />
    </Suspense>
  );

  return (
    <section aria-labelledby={`${inputId}-label`} className="mt-12 max-w-[56ch]" onClick={interrupt}>
      {canCall && (
        <div className="mb-6 flex items-center gap-4">
          <CallButton state={call} onClick={(e) => { e.stopPropagation(); onCallButton(); }} disabled={done} tone={tone} />
          <div>
            <p className={`font-display text-xl font-bold tracking-[-0.01em] ${c.body}`}>
              {onCall ? { connecting: 'Connecting…', listening: 'Go ahead, I’m listening', thinking: 'One second…', speaking: 'Tap to interrupt' }[call] : 'Talk to me'}
            </p>
            <p className={`text-sm ${c.muted}`}>
              {onCall ? 'Press the circle to hang up.' : 'Call my AI assistant and ask about my work.'}
            </p>
          </div>
        </div>
      )}

      {waitingForVoice && (
        <VoiceLine loaded={download.loaded} total={download.total} tone={tone}
          label={`Getting my voice ready: ${MB(download.loaded)} of ${MB(download.total)} MB`} />
      )}

      {onCall && !stageSlot && <div className="mb-6 max-w-[360px]">{stage}</div>}
      {onCall && stageSlot && createPortal(stage, stageSlot)}

      <form onSubmit={(e) => { e.preventDefault(); send(value); }}>
        <label id={`${inputId}-label`} htmlFor={inputId} className={`block text-sm font-medium ${c.muted}`}>
          {canCall ? 'Or type a question' : "Ask about Arman's projects"}
        </label>
        <div className={`mt-2 flex items-end gap-4 border-b-2 ${c.line} focus-within:border-flag`}>
          <input
            id={inputId}
            value={onCall && heard ? heard : value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={500}
            disabled={done || onCall}
            autoComplete="off"
            placeholder={onCall ? 'On a call…' : done ? 'Question limit reached' : 'Which project involved groundwater?'}
            className={`min-w-0 flex-1 bg-transparent py-2 text-lg outline-none ${c.body} ${dark ? 'placeholder:text-paper/60' : 'placeholder:text-ink-3'}`}
          />
          <button
            type="submit"
            disabled={busy || done || onCall || !value.trim()}
            className={`pb-2 font-semibold ${c.accent} disabled:opacity-40 hover:underline underline-offset-4`}
          >
            {busy && !onCall ? 'Answering…' : 'Ask →'}
          </button>
        </div>
      </form>

      {notice && <p role="status" className={`mt-3 text-sm ${c.muted}`}>{notice}</p>}
      {canCall && !onCall && turns.length === 0 && (
        <p className={`mt-4 text-xs ${c.muted}`}>
          This is an AI assistant that speaks for me, using my project write-ups. The call uses your browser's speech
          recognition; in Chrome, the audio is sent to Google to be transcribed.{' '}
          <a className={c.link} href="/tts/NOTICE.txt" target="_blank" rel="noopener noreferrer">Credits</a>
        </p>
      )}

      {turns.length === 0 && !onCall && (
        <ul className="mt-4 flex flex-col gap-1.5 text-sm">
          {SUGGESTIONS.map((s) => (
            <li key={s}><button type="button" onClick={(e) => { e.stopPropagation(); send(s); }} className={`text-left underline decoration-transparent underline-offset-4 hover:decoration-current ${c.sug}`}>{s}</button></li>
          ))}
        </ul>
      )}

      {turns.length > 0 && (
        <div className={`mt-6 border-t ${c.rule} pt-6 space-y-7`} aria-live="polite" aria-busy={busy}>
          {turns.map((t, i) => (
            <div key={i}>
              <p className={`text-sm ${c.muted}`}>{t.q}</p>
              {t.error ? (
                <p role="alert" className={`mt-1 ${c.body}`}>
                  {t.error} Please email{' '}
                  <a className={c.link} href={`mailto:${contact.email}`}>{contact.email}</a>, or{' '}
                  <Link className={c.link} to="/projects">browse the projects</Link>.
                </p>
              ) : (
                <p className={`mt-1 whitespace-pre-wrap leading-relaxed ${c.body}`}>
                  {t.a ? renderAnswer(t.a, c.link) : <span className={c.muted}>Looking through my project notes…</span>}
                </p>
              )}
            </div>
          ))}
          {done && (
            <p data-call-limit className={c.body}>
              That is the limit for one visit. For more, email <a className={c.link} href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          )}
          <div ref={endRef} className="flex flex-wrap items-center justify-between gap-3">
            <p className={`text-xs ${c.muted}`}>AI answers from the project write-ups on this site. It can be wrong. Nothing is stored.</p>
            <button type="button" onClick={clear} className={`text-sm ${c.sug}`}>Clear</button>
          </div>
        </div>
      )}
    </section>
  );
}
