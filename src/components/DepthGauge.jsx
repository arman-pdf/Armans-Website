import React, { useEffect, useRef } from 'react';

// Scroll position as elevation: 425 m (the top of the Waterloo Moraine) at the top of every page,
// 0 m (sea level) at the midpoint, and 425 m below sea level at the bottom.
// Blended against whatever is behind it, so it reads on both the dark panels and the paper.
const TOP = 425;
const MINUS = '−';
const fmt = (m) => (m < 0 ? `${MINUS}${Math.abs(m)}` : String(m));

export default function DepthGauge() {
  const tick = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const f = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const metres = Math.round(TOP - f * 2 * TOP);
      if (tick.current) tick.current.style.transform = `translateY(${f * 100}%)`;
      if (label.current) label.current.textContent = `${fmt(metres)} m`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden min-[1400px]:flex fixed right-16 top-1/2 -translate-y-1/2 z-30 h-56 items-stretch gap-3 font-mono text-[0.6875rem] tnum text-paper mix-blend-difference pointer-events-none"
    >
      <div className="flex flex-col justify-between text-right">
        <span>{TOP}</span>
        <span>0</span>
        <span>{MINUS}{TOP}</span>
      </div>
      <div className="relative w-px bg-current opacity-60">
        <div className="absolute -left-[3px] top-1/2 h-px w-[7px] bg-current opacity-80" />
        <div ref={tick} className="absolute left-0 top-0 h-full w-px" style={{ willChange: 'transform' }}>
          <div className="absolute -left-[5px] -top-px h-px w-[11px] bg-flag" />
          <span ref={label} className="absolute left-4 -top-2 whitespace-nowrap" />
        </div>
      </div>
    </div>
  );
}
