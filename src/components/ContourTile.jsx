import React, { useMemo } from 'react';

// Deterministic terrain-line tile seeded by a slug: every project without a figure
// still gets its own landscape instead of a stock image or a blank box.
function seeded(slug) {
  let h = 2166136261;
  for (const c of slug) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export default function ContourTile({ slug, className = '' }) {
  const paths = useMemo(() => {
    const rnd = seeded(slug);
    const waves = Array.from({ length: 4 }, () => ({
      fx: 0.6 + rnd() * 2.2, fz: 0.5 + rnd() * 2.0, px: rnd() * 6.28, pz: rnd() * 6.28, a: 0.35 + rnd() * 0.65,
    }));
    const height = (x, z) => waves.reduce((s, w) => s + w.a * Math.sin(w.fx * x * 6.28 + w.px) * Math.cos(w.fz * z * 6.28 + w.pz), 0) / 2.2 + 0.5;
    const W = 400, H = 300, ROWS = 26, PTS = 56, TOP = 70, BOT = 40;
    const out = [];
    for (let r = 0; r < ROWS; r++) {
      const z = r / (ROWS - 1);
      const base = TOP + z * (H - TOP - BOT);
      const inset = (1 - z) * 38;
      let d = '';
      for (let i = 0; i < PTS; i++) {
        const x = i / (PTS - 1);
        const px = inset + x * (W - 2 * inset);
        const py = base - height(x, z) * 58;
        d += `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`;
      }
      out.push(`${d}L${W - inset} ${H}L${inset} ${H}Z`);
    }
    return out;
  }, [slug]);

  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Generated terrain line drawing" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#12201a" />
      <g fill="#12201a" stroke="#eee8da" strokeOpacity="0.8" strokeWidth="0.8" strokeLinejoin="round">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}
