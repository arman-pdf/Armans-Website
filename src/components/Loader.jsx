import React, { useEffect, useState } from 'react';
import posterUrl from '../assets/terrain.svg?url';
import meta from '../assets/terrain.json';

const SEEN_KEY = 'ak-intro-seen';

const shouldSkip = () => {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return true;
  } catch { /* storage blocked: still show once per load */ }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// First visit of a session only: terrain draws itself while the elevation climbs.
export default function Loader() {
  const [phase, setPhase] = useState(() => (shouldSkip() ? 'done' : 'in'));
  const [elev, setElev] = useState(meta.minElevation);

  useEffect(() => {
    if (phase !== 'in') return;
    const start = performance.now();
    const span = meta.maxElevation - meta.minElevation;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start - 150) / 1300);
      const eased = t <= 0 ? 0 : 1 - Math.pow(1 - t, 3);
      setElev(Math.round(meta.minElevation + span * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const out = setTimeout(() => setPhase('out'), 1750);
    return () => { cancelAnimationFrame(raf); clearTimeout(out); };
  }, [phase]);

  useEffect(() => {
    if (phase === 'out') {
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
      const done = setTimeout(() => setPhase('done'), 700);
      return () => clearTimeout(done);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [phase === 'done']);

  useEffect(() => {
    if (phase !== 'in') return;
    const skip = () => setPhase('out');
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      onClick={() => setPhase('out')}
      className={`on-deep fixed inset-0 z-[60] bg-deep text-paper flex flex-col items-center justify-center px-6 ${phase === 'out' ? 'loader-out' : ''}`}
    >
      <img src={posterUrl} alt="" width="500" height="400" className="loader-terrain w-full max-w-[520px]" />
      <p className="mt-6 font-mono text-sm tnum tracking-[0.04em] text-paper/80">
        {meta.name.toUpperCase()} · ELEV.{' '}
        <span className="text-flag">{elev} m</span>
      </p>
    </div>
  );
}
