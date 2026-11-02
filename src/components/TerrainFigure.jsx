import React, { Suspense, useEffect, useState } from 'react';
import posterUrl from '../assets/terrain.svg?url';
import meta from '../assets/terrain.json';

const TerrainCanvas = React.lazy(() => import('./TerrainCanvas'));

const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;
const caption = `${meta.name.toUpperCase()} · ${fmt(meta.centre.lat, 'N', 'S')} ${fmt(meta.centre.lon, 'E', 'W')} · ELEV. ${meta.minElevation}–${meta.maxElevation} m`;

// 3D only on large screens with a fine pointer and no reduced-motion request.
const canRun3D = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TerrainFigure() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRun3D()) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setLive(true));
    return () => cancel(id);
  }, []);

  return (
    <figure>
      <div className="relative aspect-[5/4] w-full overflow-hidden">
        <img
          src={posterUrl}
          alt="Line drawing of terrain relief across the Waterloo Moraine"
          width="500"
          height="400"
          className="absolute inset-0 h-full w-full"
        />
        {live && (
          <Suspense fallback={null}>
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: ready ? 1 : 0 }}
              aria-hidden="true"
            >
              <TerrainCanvas onReady={() => setReady(true)} />
            </div>
          </Suspense>
        )}
      </div>
      <figcaption className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ink-3">{caption}</figcaption>
    </figure>
  );
}
