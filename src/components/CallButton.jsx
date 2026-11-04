import React, { useEffect, useRef } from 'react';
import { getLevel } from '../lib/level';

// The call circle. Idle: a quiet ring with a mic. Connecting: rings ripple outward.
// On a call: the ring swells and glows with the loudness of whoever is talking.
export default function CallButton({ state, onClick, disabled, tone = 'deep' }) {
  const ref = useRef(null);
  const on = state !== 'idle';

  useEffect(() => {
    if (!on) { ref.current?.style.setProperty('--lvl', '0'); return undefined; }
    let raf;
    let lvl = 0;
    const tick = () => {
      lvl = lvl * 0.8 + getLevel() * 0.2;
      ref.current?.style.setProperty('--lvl', lvl.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  const label = on ? 'End the call' : 'Start a voice call';
  const dark = tone === 'deep';

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors disabled:opacity-40 ${
        on ? 'call-glow border-flag text-flag' : dark ? 'border-paper/60 text-paper hover:border-flag hover:text-flag' : 'border-ink-3 text-ink hover:border-flag-ink hover:text-flag-ink'
      }`}
    >
      {state === 'connecting' && (
        <>
          <span className="call-ring ripple" aria-hidden />
          <span className="call-ring ripple" aria-hidden />
          <span className="call-ring ripple" aria-hidden />
        </>
      )}
      {(state === 'listening' || state === 'speaking') && <span className="call-ring live" aria-hidden />}
      {state === 'thinking' && <span className="call-ring think" aria-hidden />}
      {on ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><rect x="5" y="5" width="14" height="14" rx="1.5" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
        </svg>
      )}
    </button>
  );
}
