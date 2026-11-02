// Builds terrain data from open AWS Terrain Tiles (Terrarium PNG encoding).
// Run once: node scripts/build-terrain.mjs. Output is committed.
import { PNG } from 'pngjs';
import { writeFileSync } from 'node:fs';

const BBOX = { name: 'Waterloo Moraine', south: 43.38, north: 43.52, west: -80.65, east: -80.45 };
const Z = 12;
const COLS = 160;
const ROWS = 120;
const OUT = new URL('../src/assets/', import.meta.url);

const n = 2 ** Z;
const lonToX = (lon) => ((lon + 180) / 360) * n;
const latToY = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
};

const x0 = Math.floor(lonToX(BBOX.west)), x1 = Math.floor(lonToX(BBOX.east));
const y0 = Math.floor(latToY(BBOX.north)), y1 = Math.floor(latToY(BBOX.south));

const tiles = new Map();
for (let ty = y0; ty <= y1; ty++) {
  for (let tx = x0; tx <= x1; tx++) {
    const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${tx}/${ty}.png`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    tiles.set(`${tx}/${ty}`, PNG.sync.read(Buffer.from(await res.arrayBuffer())));
  }
}

function elevationAt(fx, fy) {
  // fx, fy are fractional tile coordinates at zoom Z
  const tx = Math.floor(fx), ty = Math.floor(fy);
  const png = tiles.get(`${tx}/${ty}`);
  const px = Math.min(255, Math.floor((fx - tx) * 256));
  const py = Math.min(255, Math.floor((fy - ty) * 256));
  const i = (py * 256 + px) * 4;
  return png.data[i] * 256 + png.data[i + 1] + png.data[i + 2] / 256 - 32768;
}

const grid = [];
let min = Infinity, max = -Infinity;
for (let r = 0; r < ROWS; r++) {
  const lat = BBOX.north - ((BBOX.north - BBOX.south) * r) / (ROWS - 1);
  for (let c = 0; c < COLS; c++) {
    const lon = BBOX.west + ((BBOX.east - BBOX.west) * c) / (COLS - 1);
    const e = elevationAt(lonToX(lon), latToY(lat));
    grid.push(e);
    min = Math.min(min, e);
    max = Math.max(max, e);
  }
}

const norm = new Uint16Array(grid.map((e) => Math.round(((e - min) / (max - min)) * 65535)));
writeFileSync(new URL('terrain.bin', OUT), Buffer.from(norm.buffer));
writeFileSync(
  new URL('terrain.json', OUT),
  JSON.stringify({
    name: BBOX.name,
    bbox: BBOX,
    cols: COLS,
    rows: ROWS,
    minElevation: Math.round(min),
    maxElevation: Math.round(max),
    centre: { lat: +((BBOX.north + BBOX.south) / 2).toFixed(2), lon: +((BBOX.east + BBOX.west) / 2).toFixed(2) },
    source: 'AWS Terrain Tiles (Mapzen / open data)',
  }, null, 2)
);

// Static ridgeline SVG: poster, mobile and reduced-motion fallback.
const W = 500, H = 400, LINES = 56, PTS = 90, RELIEF = 70, TOP = 70, STEP = (H - TOP - 30) / LINES;
const val = (r, c) => norm[r * COLS + c] / 65535;
let paths = '';
for (let l = 0; l < LINES; l++) {
  const r = Math.round((l / (LINES - 1)) * (ROWS - 1));
  const baseY = TOP + l * STEP;
  const inset = (LINES - l) * 1.2; // back rows narrower: gives an oblique feel
  let d = '';
  for (let p = 0; p < PTS; p++) {
    const c = Math.round((p / (PTS - 1)) * (COLS - 1));
    const x = Math.round(inset + (p / (PTS - 1)) * (W - 2 * inset));
    const y = Math.round(baseY - val(r, c) * RELIEF);
    d += `${p ? 'L' : 'M'}${x} ${y}`;
  }
  paths += `<path d="${d}L${W - Math.round(inset)} ${H}L${Math.round(inset)} ${H}Z"/>`;
}
writeFileSync(
  new URL('terrain.svg', OUT),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#12201A" stroke="#EEE8DA" stroke-width="0.8" stroke-linejoin="round" stroke-opacity="0.85">${paths}</svg>`
);
console.log(`${BBOX.name}: ${Math.round(min)}–${Math.round(max)} m, grid ${COLS}x${ROWS}`);
