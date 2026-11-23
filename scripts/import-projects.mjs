// Parses PORTFOLIO_PROJECTS.md into src/projects.json so the site copy is never retyped.
// Run: node scripts/import-projects.mjs   (re-run whenever the markdown changes)
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const SRC = new URL('../PORTFOLIO_PROJECTS.md', import.meta.url);
const OUT = new URL('../src/projects.json', import.meta.url);
const PUBLIC = new URL('../public/projects/', import.meta.url);

const clean = (s) => s.replace(/\*\*/g, '').replace(/`/g, '').trim();
const COVER = new Set(['geomicrobiology-remediation']); // photos fill the frame; figures keep their margins

const lines = readFileSync(SRC, 'utf8').split('\n');
const projects = [];
let year = null;
let cur = null;
let key = null;

for (const raw of lines) {
  const y = raw.match(/^## (.+?) · (\d{4})–(\d{2,4})/); // e.g. 'Year 5 · 2024–25' or 'After graduation · 2026–27'
  if (y) { year = { group: y[1], label: `${y[2]}–${y[3].slice(-2)}` }; continue; }

  const h = raw.match(/^### (\d+)\.\s+(⭐\s+)?(.+)$/);
  if (h) {
    cur = { order: Number(h[1]), featured: Boolean(h[2]), title: clean(h[3]), year: year.label, yearGroup: year.group };
    projects.push(cur);
    key = null;
    continue;
  }
  if (raw.startsWith('## ')) { cur = null; continue; } // quick-reference section etc.
  if (!cur) continue;

  const f = raw.match(/^- \*\*([^:*]+):\*\*\s*(.*)$/);
  if (f) {
    key = f[1].trim();
    const val = clean(f[2]);
    cur[key] = val ? val : [];
    continue;
  }
  const sub = raw.match(/^(\s+)- (.*)$/);
  if (sub && key) {
    if (!Array.isArray(cur[key])) cur[key] = [cur[key]];
    const item = { text: clean(sub[2]), sub: [] };
    if (sub[1].length >= 4) cur[key].at(-1)?.sub.push(item.text);
    else cur[key].push(item);
  }
}

const list = (v) => {
  const items = Array.isArray(v) ? v.map((i) => (typeof i === 'string' ? { text: i, sub: [] } : i)) : v ? [{ text: v, sub: [] }] : [];
  // A lead-in ending in ":" owns the items that follow it.
  const i = items.findIndex((it, n) => it.text.endsWith(':') && it.sub.length === 0 && n < items.length - 1);
  if (i === -1) return items;
  const rest = items.splice(i + 1);
  items[i].sub = rest.map((r) => r.text);
  return items;
};

const out = projects.map((p) => {
  const dir = new URL(`${p.slug}/`, PUBLIC);
  const gallery = existsSync(dir) ? readdirSync(dir).filter((f) => /^gallery-\d+\.jpg$/.test(f)).sort() : [];
  const hasHero = existsSync(new URL('hero.jpg', dir));
  return {
    slug: p.slug,
    title: p.title,
    featured: p.featured,
    year: p.year,
    yearGroup: p.yearGroup,
    tagline: p.tagline,
    context: p['when / context'] ?? '',
    role: p.role ?? '',
    team: p.team ?? '',
    tags: (p.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    tools: p['tools & methods'] ?? '',
    summary: p.card_summary ?? '',
    overview: p.overview ?? '',
    did: list(p.what_i_did),
    outcomes: list(p.outcomes),
    related: p['related co-op work to mention'] ?? '',
    image: hasHero ? { fit: COVER.has(p.slug) ? 'cover' : 'contain', gallery } : null,
    // Source file paths in `assets` are deliberately NOT exported: raw PDFs/DOCX show student IDs.
  };
});

writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`${out.length} projects, ${out.filter((p) => p.featured).length} featured, ${out.filter((p) => p.image).length} with images`);
