import React, { useEffect, useRef } from 'react';
import { terrain } from '@lucasmarkes/hairline';
import { getLevel } from '../lib/level';

const LABELS = {
  connecting: 'Connecting',
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
};

// While a call is on, the landscape answers. A Hairline terrain (pillars on a plinth) walks through its
// own loop and rises wider the louder the voice is. Colours come from the site's tokens.
const theme = {
  '--hairline-plate': 'rgb(var(--deep-rgb))',
  '--hairline-hi': 'rgb(var(--paper-rgb))',
  '--hairline-edge': 'rgb(var(--paper-rgb) / 0.72)',
  '--hairline-mid': 'rgb(var(--paper-rgb) / 0.38)',
  '--hairline-lo': 'rgb(var(--paper-rgb) / 0.16)',
  '--hairline-stroke': 1,
};

export default function CallStage({ state, caption, onEnd }) {
  const host = useRef(null);

  useEffect(() => {
    const figure = terrain(host.current, {
      play: true,
      intensity: 0.4,
      theme: 'dark',
      label: 'A field of pillars that rises and falls with the voice on the call',
    });
    let raf;
    let smooth = 0.4;
    let frame = 0;
    const tick = () => {
      smooth = smooth * 0.86 + (0.3 + getLevel() * 0.7) * 0.14;
      if (frame++ % 2 === 0) figure.update({ intensity: smooth });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      figure.destroy();
    };
  }, []);

  return (
    <figure className="call-stage on-deep" style={theme}>
      <div ref={host} className="w-full" />
      <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.04em] text-paper/70">
        <span className="flex items-center gap-2" role="status" aria-live="polite">
          <span aria-hidden className="inline-block h-2.5 w-2.5 bg-flag [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          {(LABELS[state] || 'On a call').toUpperCase()}
          {caption && state === 'listening' ? <span className="normal-case tracking-normal text-paper/50 truncate max-w-[22ch]">{caption}</span> : null}
        </span>
        <button type="button" onClick={onEnd} className="uppercase hover:text-flag">End call</button>
      </figcaption>
    </figure>
  );
}
