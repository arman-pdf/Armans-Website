# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Arman Kanorwalla's portfolio (environmental scientist / geoscience specialist). Product context lives in [PRODUCT.md](PRODUCT.md): read it before design work. The owner is not technical: explain decisions plainly and keep tooling simple. Running cost must stay $0.

## Stack

- React 18 + react-router-dom 7, Vite 8, Tailwind CSS 3
- Three.js + GSAP (lazy-loaded 3D terrain, desktop only)
- Cloudflare Pages + Pages Functions (`/functions`) for hosting and the server side
- Assistant model: Ollama Cloud (`gpt-oss`), key in an environment variable, never in code
- Fonts self-hosted via `@fontsource` (Bricolage Grotesque, IBM Plex Sans/Mono)

## Commands

```bash
npm run dev        # http://localhost:3000 (also runs /functions locally; secrets in .dev.vars)
npm run build      # prebuild regenerates functions/_knowledge.js, then builds to /dist
npm run preview    # serve the production build
node scripts/import-projects.mjs   # re-import PORTFOLIO_PROJECTS.md -> src/projects.json
node scripts/build-terrain.mjs     # rebuild terrain data (needs network; output is committed)
```

Node must be >= 22.23.4 (October 2026 security release). Restart `npm run dev` after editing `tailwind.config.js` or `vite.config.js`.

## Structure

```
src/
  content.js            all site copy (profile, bio, skills, experience, education, projectLinks)
  projects.json         GENERATED from PORTFOLIO_PROJECTS.md: edit the markdown, re-run the importer
  pages/                Home, Work, Projects, ProjectDetail, About, Contact
  components/           Nav, Footer, Layout, Loader, DepthGauge, TerrainFigure/Canvas, Assistant,
                        ContactForm, ProjectImage, ContourTile, Entry, PageHeader, ErrorBoundary
  lib/askStream.js      client for /api/chat (streams text)
  assets/terrain.*      Waterloo Moraine elevation data + still SVG (from scripts/build-terrain.mjs)
functions/api/          chat.js, contact.js (Cloudflare Pages Functions)
functions/_prompt.js    assistant system prompt; _knowledge.js is generated (gitignored)
public/projects/<slug>/ hero.jpg, thumb.jpg, gallery-N.jpg (ID-free crops)
```

## Design system ("field survey")

- Tokens are RGB channels in `src/index.css` (`--paper-rgb`, ...) so Tailwind opacity works (`bg-paper/80`). Never define a Tailwind colour as a plain `var(--x)`: opacity modifiers silently fail.
- Palette: paper (warm off-white), ink, deep green panel, ONE accent: survey-flag orange (`flag`, `flag-ink` for text on paper). No other accent colours.
- Type: Bricolage Grotesque for display, IBM Plex Sans for text, IBM Plex Mono only for data/coordinates.
- Banned: particles, gradient or glass backgrounds, glow, card grids of identical tiles, icon tiles, eyebrow labels above headings, section numbers, hero stat strips, gradient text, bounce/pulse animations.
- Motion: one authored moment (the terrain + first-visit loader). Respect `prefers-reduced-motion`.
- The elevation gauge intentionally uses `mix-blend-difference`; keep it.

## Safety rules (do not regress)

- WebGL must never take the page down: `TerrainCanvas` refuses software rendering and slow frames; `ErrorBoundary` wraps it and the app root. Phones/reduced-motion get the static SVG.
- Student ID numbers appear in the raw course PDFs/DOCX. Never commit them or link raw files. `projects_selected.zip` and `*.zip` are gitignored. Only use cropped figures verified by eye.
- Other students' names/work must not appear (e.g. the La Cloche sign-up sheet was excluded).
- Assistant answers only from `functions/_knowledge.js` (projects). Do not widen it without the owner's approval. Group work must credit teammates.
- Secrets live in `.dev.vars` (local) and the Cloudflare dashboard (production). Never commit them.
- Dependencies: keep `npm audit` at 0, versions pinned exactly (`.npmrc`), use `npm ci`; install scripts are skipped in CI.

## Testing

Use the Playwright MCP tools for UI work: navigate to http://localhost:3000, take screenshots at 1280px and 375px, check console errors, and verify interactions. The first-visit loader is skipped when `sessionStorage['ak-intro-seen']` is set.

## Open items

- Real Ollama key + model choice (`OLLAMA_MODEL`), Turnstile keys, rate-limit binding at deploy time
- Contact destination (`CONTACT_WEBHOOK_URL`, e.g. n8n) is undecided
- Voice (push-to-talk + opt-in Kyutai TTS) not built yet
- Résumé PDF, headshot, per-project GitHub links (`projectLinks` in content.js)
