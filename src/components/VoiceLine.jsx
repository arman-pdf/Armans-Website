import React from 'react';

// A single ridge line that draws itself as the download progresses.
const RIDGE =
  'M0 26 L14 21 L28 24 L44 12 L60 19 L76 8 L94 17 L110 10 L128 20 L146 13 L162 22 L180 9 L198 18 L214 14 L232 23 L250 11 L268 19 L286 15 L304 24 L322 13 L340 20 L358 12 L376 22 L400 16';

export default function VoiceLine({ loaded, total, label, tone = 'deep' }) {
  const progress = total ? Math.min(1, loaded / total) : 0;
  const stroke = tone === 'deep' ? 'rgb(var(--paper-rgb))' : 'rgb(var(--ink-rgb))';
  return (
    <div className="mt-4" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
      <svg viewBox="0 0 400 34" className="block h-8 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d={RIDGE} fill="none" stroke={stroke} strokeOpacity="0.2" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path
          d={RIDGE}
          pathLength="1"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <p className="mt-1 font-mono text-[11px] tnum tracking-[0.04em] opacity-70">{label}</p>
    </div>
  );
}
