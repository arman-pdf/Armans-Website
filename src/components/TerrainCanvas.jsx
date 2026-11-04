import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dataUrl from '../assets/terrain.bin?url';
import meta from '../assets/terrain.json';

gsap.registerPlugin(ScrollTrigger);

const PAPER = 0x12201a; // deep panel colour: clear colour and curtain fill
const INK = new THREE.Color(0xeee8da);
const INK_FAR = new THREE.Color(0x34463c);
const ROW_STEP = 2; // draw every 2nd row of the 160x120 grid

export default function TerrainCanvas({ onReady, onFail }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    let disposed = false;
    let raf = 0;
    let visible = true;
    const cleanups = [];

    // Refuse software/slow WebGL: the poster image is better than a laggy page.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, failIfMajorPerformanceCaveat: true });
    } catch {
      onFail?.();
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onFail?.(); });
    renderer.setClearColor(PAPER, 1);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 5 / 4, 0.1, 50);
    const state = { yaw: 0, phi: 35, px: 0, py: 0, t: 0 };

    fetch(dataUrl)
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (disposed) return;
        const { cols, rows } = meta;
        const h = new Uint16Array(buf);
        const W = 2.4, D = 1.8, RELIEF = 0.4;
        const rowIdx = [];
        for (let r = 0; r < rows; r += ROW_STEP) rowIdx.push(r);
        const nRows = rowIdx.length;

        const linePos = [], lineCol = [];
        const curtainPos = [];
        const c = new THREE.Color();
        rowIdx.forEach((r, li) => {
          const z = (r / (rows - 1) - 0.5) * D;
          c.copy(INK_FAR).lerp(INK, li / (nRows - 1)); // far rows fade
          for (let i = 0; i < cols; i++) {
            const x = (i / (cols - 1) - 0.5) * W;
            const y = (h[r * cols + i] / 65535) * RELIEF;
            if (i < cols - 1) {
              const x2 = ((i + 1) / (cols - 1) - 0.5) * W;
              const y2 = (h[r * cols + i + 1] / 65535) * RELIEF;
              linePos.push(x, y, z, x2, y2, z);
              lineCol.push(c.r, c.g, c.b, c.r, c.g, c.b);
              // curtain quad from the line down to the base: hides rows behind it
              curtainPos.push(x, y, z, x, -0.02, z, x2, y2, z, x2, y2, z, x, -0.02, z, x2, -0.02, z);
            }
          }
        });

        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3));
        const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ vertexColors: true }));

        const curtainGeo = new THREE.BufferGeometry();
        curtainGeo.setAttribute('position', new THREE.Float32BufferAttribute(curtainPos, 3));
        const curtain = new THREE.Mesh(
          curtainGeo,
          new THREE.MeshBasicMaterial({
            color: PAPER, side: THREE.DoubleSide,
            polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
          })
        );
        scene.add(curtain, lines);
        cleanups.push(() => {
          lineGeo.dispose(); curtainGeo.dispose();
          lines.material.dispose(); curtain.material.dispose();
        });
        onReady?.();
      });

    const size = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    cleanups.push(() => ro.disconnect());

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    cleanups.push(() => io.disconnect());

    const onMove = (e) => {
      state.px = (e.clientX / window.innerWidth - 0.5) * 2;
      state.py = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    cleanups.push(() => window.removeEventListener('pointermove', onMove));

    // Hero scroll: camera tilts from oblique to top-down while the canvas fades.
    const heroTrigger = {
      trigger: el.closest('section') || el,
      start: 'top top', end: 'bottom top', scrub: 0.6,
    };
    const tl = gsap.timeline({ scrollTrigger: heroTrigger });
    tl.to(state, { phi: 78, ease: 'none' }, 0).to(el, { opacity: 0.15, ease: 'none' }, 0);
    cleanups.push(() => { tl.scrollTrigger?.kill(); tl.kill(); });

    const target = new THREE.Vector3(0, 0.1, 0);
    let sx = 0, sy = 0;
    const R = 3.3;
    let last = 0, slow = 0, frames = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) { last = 0; return; }
      // Frame-time guard: if the first ~2s average slower than ~28 fps, give up.
      if (last && frames < 120) {
        slow += now - last;
        frames += 1;
        if (frames === 120 && slow / frames > 36) { onFail?.(); return; }
      }
      last = now;
      state.t = now / 1000;
      sx += (state.px - sx) * 0.05;
      sy += (state.py - sy) * 0.05;
      const yaw = (Math.sin((state.t * Math.PI * 2) / 40) * 6 + sx * 4) * (Math.PI / 180);
      const phi = (state.phi - sy * 2) * (Math.PI / 180);
      camera.position.set(R * Math.sin(yaw) * Math.cos(phi), R * Math.sin(phi), R * Math.cos(yaw) * Math.cos(phi));
      camera.lookAt(target);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onFail]);

  return <div ref={host} className="h-full w-full" />;
}
