import React, { useEffect, useRef } from 'react';
import meta from '../assets/terrain.json';

// Scroll position as elevation: summit at the top of the page, base at the bottom.
export default function DepthGauge() {
  const tick = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const f = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const elev = Math.round(meta.maxElevation - f * (meta.maxElevation - meta.minElevation));
      if (tick.current) tick.current.style.transform = `translateY(${f * 100}%)`;
      if (label.current) label.current.textContent = `${elev} m`;
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
      className="hidden min-[1500px]:block fixed right-8 top-1/2 -translate-y-1/2 z-30 h-56 w-px bg-current opacity-70 font-mono text-[11px] tnum text-paper mix-blend-difference pointer-events-none"
    >
      <div ref={tick} className="absolute left-0 top-0 h-full w-px" style={{ willChange: 'transform' }}>
        <div className="absolute -left-[5px] -top-px h-px w-[11px] bg-flag" />
        <span ref={label} className="absolute right-4 -top-2 whitespace-nowrap" />
      </div>
    </div>
  );
}
