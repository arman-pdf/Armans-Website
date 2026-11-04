import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ask } from '../lib/askStream';
import { BrowserVoice, getHighQualityVoice, speakable, voiceSupport } from '../lib/voice';
import VoiceLine from './VoiceLine';
import { contact, projects } from '../content';

const SUGGESTIONS = [
  'Which projects used Python?',
  'What did the Ore Chimney report conclude?',
  'Has Arman worked with groundwater data?',
];
const MAX_QUESTIONS = 12;
const SLUGS = new Set(projects.map((p) => p.slug));
const MODE_KEY = 'ak-voice-mode';
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
  'no-speech': "I didn't hear anything. Please try again.",
  'audio-capture': 'No microphone was found.',
  network: 'Speech recognition needs an internet connection.',
};

const readMode = () => {
  try { return localStorage.getItem(MODE_KEY) || 'off'; } catch { return 'off'; }
};
const writeMode = (m) => {
  try { localStorage.setItem(MODE_KEY, m); } catch { /* private mode: fine */ }
};

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

  const [mode, setModeState] = useState(() => {
    const m = readMode();
    if (m === 'hq' && !support.highQuality) return support.builtin ? 'builtin' : 'off';
    if (m === 'builtin' && !support.builtin) return 'off';
    return m;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [hq, setHq] = useState({ state: 'idle', loaded: 0, total: 0 }); // idle | downloading | ready | error
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [notice, setNotice] = useState('');

  const abortRef = useRef(null);
  const endRef = useRef(null);
  const recRef = useRef(null);
  const browserVoice = useRef(new BrowserVoice());
  const hqRef = useRef(null); // HighQualityVoice instance (lazy-loaded module)
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const stopSpeaking = useCallback(() => {
    browserVoice.current.stop();
    hqRef.current?.stop();
    setSpeaking(false);
  }, []);

  useEffect(() => () => {
    abortRef.current?.abort();
    recRef.current?.abort?.();
    browserVoice.current.stop();
    hqRef.current?.stop();
  }, []);
  useEffect(() => { if (busy) endRef.current?.scrollIntoView({ block: 'nearest' }); }, [turns, busy]);

  const setMode = (m) => { setModeState(m); writeMode(m); };

  /* ----------------------------- natural voice ----------------------------- */

  const loadHq = useCallback(async () => {
    const engine = getHighQualityVoice();
    hqRef.current = engine;
    engine.onProgress = (loaded, total) => setHq({ state: 'downloading', loaded, total });
    engine.onSlow = (rtf) => {
      engine.dispose();
      hqRef.current = null;
      setHq({ state: 'idle', loaded: 0, total: 0 });
      setSpeaking(false);
      setNotice(`This computer is too slow for the natural voice (${rtf.toFixed(1)}x real time), so I switched to your browser's voice.`);
      setMode(support.builtin ? 'builtin' : 'off');
    };
    setHq((h) => (h.state === 'ready' ? h : { state: 'downloading', loaded: 0, total: 0 }));
    try {
      await engine.load();
      setHq({ state: 'ready', loaded: 0, total: 0 });
      return engine;
    } catch (e) {
      console.error('[voice]', e);
      setHq({ state: 'error', loaded: 0, total: 0 });
      setNotice("The natural voice could not be loaded, so I'm using your browser's voice instead.");
      setMode(support.builtin ? 'builtin' : 'off');
      return null;
    }
  }, [support.builtin]);

  const chooseMode = async (m) => {
    stopSpeaking();
    setNotice('');
    setMode(m);
    if (m === 'hq') await loadHq(); // runs inside the click, so the browser allows audio
  };

  /* ------------------------------ speaking ------------------------------- */

  const speakAnswer = useCallback(async (answer) => {
    const m = modeRef.current;
    if (m === 'off' || !answer) return;
    const text = speakable(answer, projects);
    setSpeaking(true);
    try {
      if (m === 'hq') {
        const engine = hqRef.current?.ready ? hqRef.current : await loadHq();
        if (engine && modeRef.current === 'hq') await engine.speak(text);
        else if (modeRef.current === 'builtin') await browserVoice.current.speak(text);
      } else {
        await browserVoice.current.speak(text);
      }
    } finally {
      setSpeaking(false);
    }
  }, [loadHq]);

  /* -------------------------------- asking -------------------------------- */

  const done = turns.filter((t) => !t.error).length >= MAX_QUESTIONS;

  const send = async (question) => {
    const q = question.trim();
    if (!q || busy || done) return;
    stopSpeaking();
    setNotice('');
    setValue('');
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
      answer = await ask([...history, { role: 'user', content: q }], { signal: controller.signal, onText: (a) => update({ a }) });
    } catch (e) {
      if (e.name !== 'AbortError') update({ error: ERRORS[e.code] || ERRORS.default });
    } finally {
      setBusy(false);
    }
    if (answer) speakAnswer(answer);
  };

  const clear = () => {
    abortRef.current?.abort();
    stopSpeaking();
    setTurns([]);
    setBusy(false);
    setNotice('');
  };

  /* ------------------------------ microphone ------------------------------ */

  const stopListening = () => recRef.current?.stop();

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || busy || done) return;
    stopSpeaking();
    setNotice('');
    // First time using the mic: answers are read back by default (browser voice, no download).
    if (modeRef.current === 'off' && support.builtin) {
      setMode('builtin');
      setNotice("Answers will be read aloud with your browser's voice. You can change this under Voice.");
    }
    hqRef.current?.unlock?.(); // allow audio from this click
    const rec = new SR();
    recRef.current = rec;
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    let finalText = '';
    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join('').trim();
      setValue(text);
      if (e.results[e.results.length - 1].isFinal) finalText = text;
    };
    rec.onerror = (e) => {
      if (e.error !== 'aborted') setNotice(MIC_ERRORS[e.error] || 'Voice input did not work. Please type your question.');
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
      if (finalText) send(finalText);
    };
    try { rec.start(); } catch { setListening(false); }
  };

  /* -------------------------------- styling -------------------------------- */

  const c = dark
    ? { muted: 'text-paper/65', body: 'text-paper', rule: 'border-paper/20', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag', sug: 'text-paper/80 hover:text-flag', ctl: 'text-paper/80 hover:text-flag', accent: 'text-flag', line: 'border-paper/40', panel: 'border-paper/20 bg-deep-2', on: 'border-flag text-paper', off: 'border-paper/25 text-paper/80 hover:border-paper/60' }
    : { muted: 'text-ink-3', body: 'text-ink', rule: 'border-rule', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink', sug: 'text-ink-2 hover:text-flag-ink', ctl: 'text-ink-2 hover:text-flag-ink', accent: 'text-flag-ink', line: 'border-ink-3', panel: 'border-rule bg-white/50', on: 'border-flag-ink text-ink', off: 'border-ink-3/40 text-ink-2 hover:border-ink' };

  const modeLabel = { off: 'off', builtin: 'browser voice', hq: 'natural voice' }[mode];
  const option = (active) => `block w-full text-left border px-4 py-3 transition-colors ${active ? c.on : c.off}`;

  return (
    <section aria-labelledby={`${inputId}-label`} className="mt-12 max-w-[56ch]">
      <form onSubmit={(e) => { e.preventDefault(); hqRef.current?.unlock?.(); send(value); }}>
        <label id={`${inputId}-label`} htmlFor={inputId} className={`block text-sm font-medium ${c.muted}`}>
          Ask about Arman's projects
        </label>
        <div className={`mt-2 flex items-end gap-4 border-b-2 ${c.line} focus-within:border-flag`}>
          <input
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={500}
            disabled={done}
            autoComplete="off"
            placeholder={listening ? 'Listening…' : done ? 'Question limit reached' : 'Which project involved groundwater?'}
            className={`min-w-0 flex-1 bg-transparent py-2 text-lg outline-none ${c.body} ${dark ? 'placeholder:text-paper/60' : 'placeholder:text-ink-3'}`}
          />
          {support.recognition && (
            <button
              type="button"
              onClick={listening ? stopListening : startListening}
              disabled={busy || done}
              aria-pressed={listening}
              aria-label={listening ? 'Stop listening' : 'Ask by voice'}
              className={`pb-2 text-sm font-medium disabled:opacity-40 ${listening ? c.accent : c.ctl}`}
            >
              {listening ? '● Listening' : 'Speak'}
            </button>
          )}
          <button
            type="submit"
            disabled={busy || done || !value.trim()}
            className={`pb-2 font-semibold ${c.accent} disabled:opacity-40 hover:underline underline-offset-4`}
          >
            {busy ? 'Answering…' : 'Ask →'}
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        {(support.builtin || support.highQuality) && (
          <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} className={c.ctl}>
            Voice: {modeLabel} {menuOpen ? '▴' : '▾'}
          </button>
        )}
        {speaking && (
          <button type="button" onClick={stopSpeaking} className={c.accent}>■ Stop speaking</button>
        )}
      </div>

      {menuOpen && (
        <div className={`mt-3 border p-4 space-y-2 ${c.panel}`} role="group" aria-label="Voice for spoken answers">
          <button type="button" className={option(mode === 'off')} onClick={() => chooseMode('off')}>
            <span className="font-medium">Off</span>
            <span className={`block text-sm ${c.muted}`}>Answers are text only.</span>
          </button>
          {support.builtin && (
            <button type="button" className={option(mode === 'builtin')} onClick={() => chooseMode('builtin')}>
              <span className="font-medium">Browser voice</span>
              <span className={`block text-sm ${c.muted}`}>Instant. Uses the voice built into your device.</span>
            </button>
          )}
          {support.highQuality && (
            <button type="button" className={option(mode === 'hq')} onClick={() => chooseMode('hq')}>
              <span className="font-medium">Natural voice (AI, runs on your device)</span>
              <span className={`block text-sm ${c.muted}`}>
                One-time download of about 125 MB, kept in your browser. Nothing is sent anywhere. Needs a reasonably fast computer.
              </span>
            </button>
          )}
          <p className={`pt-1 text-xs ${c.muted}`}>
            The natural voice is AI-generated speech: Pocket TTS by Kyutai, voice by Alba Mackenna (CC BY 4.0).{' '}
            <a className={c.link} href="/tts/NOTICE.txt" target="_blank" rel="noopener noreferrer">Credits</a>
          </p>
        </div>
      )}

      {hq.state === 'downloading' && (
        <VoiceLine loaded={hq.loaded} total={hq.total} tone={tone}
          label={hq.total ? `Downloading the voice: ${MB(hq.loaded)} of ${MB(hq.total)} MB` : 'Preparing the voice…'} />
      )}

      {notice && <p role="status" className={`mt-3 text-sm ${c.muted}`}>{notice}</p>}
      {support.recognition && !listening && turns.length === 0 && (
        <p className={`mt-3 text-xs ${c.muted}`}>
          "Speak" uses your browser's speech recognition. In Chrome, the audio is sent to Google to be transcribed.
        </p>
      )}

      {turns.length === 0 && (
        <ul className="mt-4 flex flex-col gap-1.5 text-sm">
          {SUGGESTIONS.map((s) => (
            <li key={s}><button type="button" onClick={() => send(s)} className={`text-left underline decoration-transparent underline-offset-4 hover:decoration-current ${c.sug}`}>{s}</button></li>
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
                  {t.a ? renderAnswer(t.a, c.link) : <span className={c.muted}>Looking through the project notes…</span>}
                </p>
              )}
            </div>
          ))}
          {done && (
            <p className={c.body}>
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
