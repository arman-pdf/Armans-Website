import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ask } from '../lib/askStream';
import ChatButton from './ChatButton';
import { contact, projects } from '../content';

const SUGGESTIONS = [
  'Which projects used Python?',
  'What did the Ore Chimney report conclude?',
  'Has Arman worked with groundwater data?',
];
const MAX_QUESTIONS = 12;
const SLUGS = new Set(projects.map((p) => p.slug));

const ERRORS = {
  busy: 'The assistant is busy answering other visitors. Please try again in a minute.',
  rate_limited: 'That is a lot of questions at once. Please wait a minute and try again.',
  daily_cap: 'The assistant has reached its free limit for today.',
  quota: 'The assistant has reached its free limit for today.',
  bot_check: 'The request could not be verified. Please reload the page and try again.',
  too_large: 'That question is too long. Please shorten it.',
  default: 'The assistant is not available right now.',
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
  const panelId = `${inputId}-panel`;

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState([]); // { q, a, error? }
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  const abortRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { if (busy) endRef.current?.scrollIntoView({ block: 'nearest' }); }, [turns, busy]);
  useEffect(() => { if (open) inputRef.current?.focus({ preventScroll: true }); }, [open]);

  const done = turns.filter((t) => !t.error).length >= MAX_QUESTIONS;

  const send = async (question) => {
    const q = question.trim();
    if (!q || busy || done) return;
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
    try {
      await ask([...history, { role: 'user', content: q }], { signal: controller.signal, onText: (a) => update({ a }) });
    } catch (e) {
      if (e.name !== 'AbortError') update({ error: ERRORS[e.code] || ERRORS.default });
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    abortRef.current?.abort();
    setTurns([]);
    setBusy(false);
  };

  const c = dark
    ? { muted: 'text-paper/65', body: 'text-paper', rule: 'border-paper/20', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag', sug: 'text-paper/80 hover:text-flag', accent: 'text-flag', line: 'border-paper/40' }
    : { muted: 'text-ink-3', body: 'text-ink', rule: 'border-rule', link: 'underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink', sug: 'text-ink-2 hover:text-flag-ink', accent: 'text-flag-ink', line: 'border-ink-3' };

  return (
    <section aria-label="Chat with Arman's AI assistant" className="mt-12 max-w-[56ch]">
      <div className="flex items-center gap-4">
        <ChatButton open={open} answering={busy} controls={panelId} tone={tone} onClick={() => setOpen((o) => !o)} />
        <div>
          <p className={`font-display text-xl font-bold tracking-[-0.01em] ${c.body}`}>Chat with me</p>
          <p className={`text-sm ${c.muted}`}>Ask my AI assistant about my work.</p>
        </div>
      </div>

      {open && (
        <div id={panelId} className="mt-6">
          <form onSubmit={(e) => { e.preventDefault(); send(value); }}>
            <label htmlFor={inputId} className={`block text-sm font-medium ${c.muted}`}>Type a question</label>
            <div className={`mt-2 flex items-end gap-4 border-b-2 ${c.line} focus-within:border-flag`}>
              <input
                ref={inputRef}
                id={inputId}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={500}
                disabled={done}
                autoComplete="off"
                placeholder={done ? 'Question limit reached' : 'Which project involved groundwater?'}
                style={{ outline: 'none' }} // the orange underline is the focus cue; no box
                className={`min-w-0 flex-1 bg-transparent py-2 text-lg ${c.body} ${dark ? 'placeholder:text-paper/60' : 'placeholder:text-ink-3'}`}
              />
              <button
                type="submit"
                disabled={busy || done || !value.trim()}
                className={`pb-2 font-semibold ${c.accent} disabled:opacity-40 hover:underline underline-offset-4`}
              >
                {busy ? 'Answering…' : 'Ask →'}
              </button>
            </div>
          </form>

          {turns.length === 0 && (
            <>
              <ul className="mt-4 flex flex-col gap-1.5 text-sm">
                {SUGGESTIONS.map((s) => (
                  <li key={s}><button type="button" onClick={() => send(s)} className={`text-left underline decoration-transparent underline-offset-4 hover:decoration-current ${c.sug}`}>{s}</button></li>
                ))}
              </ul>
              <p className={`mt-5 text-xs ${c.muted}`}>
                This is an AI assistant that speaks for me, using my project write-ups. It can be wrong. Nothing is stored.
              </p>
            </>
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
        </div>
      )}
    </section>
  );
}
