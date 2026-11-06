import React, { Suspense, useCallback, useEffect, useState } from 'react';
import posterUrl from '../assets/terrain.svg?url';
import meta from '../assets/terrain.json';
import ErrorBoundary from './ErrorBoundary';

const TerrainCanvas = React.lazy(() => import('./TerrainCanvas'));

const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;
const caption = `${meta.name.toUpperCase()} · ${fmt(meta.centre.lat, 'N', 'S')} ${fmt(meta.centre.lon, 'E', 'W')} · ELEV. ${meta.minElevation}–${meta.maxElevation} m`;

// 3D only on large screens with a fine pointer and no reduced-motion request.
const canRun3D = () =>
  window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TerrainFigure() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => setFailed(true), []);

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
          className="absolute inset-0 h-full w-full transition-opacity duration-700"
          // Once the live 3D drawing is up, the still one must go: otherwise it shows through the
          // 3D while that fades and tilts on scroll, and the two drawings overlap into a smear.
          style={{ opacity: live && ready && !failed ? 0 : 1 }}
        />
        {live && !failed && (
          <Suspense fallback={null}>
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: ready ? 1 : 0 }}
              aria-hidden="true"
            >
              <ErrorBoundary onError={onFail}>
                <TerrainCanvas onReady={onReady} onFail={onFail} />
              </ErrorBoundary>
            </div>
          </Suspense>
        )}
      </div>
      <figcaption className="mt-4 flex items-center gap-2 font-mono text-[11px] tnum tracking-[0.04em] text-paper/70">
        <span aria-hidden className="inline-block h-2.5 w-2.5 bg-flag [clip-path:polygon(0_0,100%_50%,0_100%)]" />
        {caption}
      </figcaption>
    </figure>
  );
}
