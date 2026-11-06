import React from 'react';

// The chat circle. Closed: a quiet ring with a speech bubble. Open: the ring warms to orange.
// While an answer is being written, a soft ring breathes around it.
export default function ChatButton({ open, answering, onClick, controls, tone = 'deep' }) {
  const dark = tone === 'deep';
  const label = open ? 'Close the chat' : 'Open the chat';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={label}
      title={label}
      className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors ${
        open
          ? 'call-glow border-flag text-flag'
          : dark
            ? 'border-paper/60 text-paper hover:border-flag hover:text-flag'
            : 'border-ink-3 text-ink hover:border-flag-ink hover:text-flag-ink'
      }`}
    >
      {answering && <span className="call-ring think" aria-hidden />}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z" />
        <path d="M8.5 8.5h7M8.5 11.5h4.5" />
      </svg>
    </button>
  );
}
