import React, { useEffect, useRef } from 'react';
import { terrain } from '@lucasmarkes/hairline';
import { getLevel } from '../lib/level';

const LABELS = {
  connecting: 'Connecting',
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
};

// While a call is on, the landscape answers. A Hairline terrain (pillars on a plinth) rises wherever its
// "pointer" is. Here the pointer is driven by the voice: it circles the field faster, wider and with a
// stronger rise the louder whoever is talking is, and drifts lazily when the line is quiet.
// Colours come from the site's tokens.
const theme = {
  '--hairline-plate': 'rgb(var(--deep-rgb))',
  '--hairline-hi': 'rgb(var(--paper-rgb))',
  '--hairline-edge': 'rgb(var(--paper-rgb) / 0.72)',
  '--hairline-mid': 'rgb(var(--paper-rgb) / 0.38)',
  '--hairline-lo': 'rgb(var(--paper-rgb) / 0.16)',
  '--hairline-stroke': 1,
};

// Hairline measures the pointer on a 400 x 320 sheet; the pillar field sits around its middle.
const SHEET = { w: 400, h: 320, cx: 200, cy: 168, rx: 98, ry: 58 };

export default function CallStage({ state, caption, onEnd }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const figure = terrain(el, {
      play: false, // the built-in loop is a slow fixed tour; the voice drives it instead
      intensity: 0.45,
      theme: 'dark',
      label: 'A field of pillars that rises and falls with the voice on the call',
    });

    let raf;
    let last = performance.now();
    let phase = Math.random() * 6.28;
    let smooth = 0;
    let frame = 0;

    const send = (u, v) => {
      const stage = el.firstElementChild;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      stage.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          pointerType: 'mouse',
          pointerId: 41,
          isPrimary: true,
          clientX: r.left + (u / SHEET.w) * r.width,
          clientY: r.top + (v / SHEET.h) * r.height,
        })
      );
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // quick attack, slower release: reads like a level meter
      const lvl = getLevel();
      smooth += (lvl - smooth) * (lvl > smooth ? 0.5 : 0.12);

      if (!reduced) {
        phase += dt * (0.7 + smooth * 9); // louder voice: the pointer sweeps faster
        const reach = 0.5 + Math.min(1, smooth * 1.8) * 0.5; // and covers more of the field
        send(
          SHEET.cx + SHEET.rx * reach * Math.sin(phase),
          SHEET.cy + SHEET.ry * reach * Math.sin(phase * 1.31 + 1.1)
        );
      }
      if (frame++ % 2 === 0) figure.update({ intensity: Math.min(1, 0.4 + smooth * 0.9) });
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
