# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Arman Kanorwalla's portfolio (environmental scientist / geoscience specialist). Product context lives in [PRODUCT.md](PRODUCT.md): read it before design work. The owner is not technical: explain decisions plainly and keep tooling simple. Running cost must stay $0.

## Stack

- React 18 + react-router-dom 7, Vite 8, Tailwind CSS 3
- Three.js + GSAP (lazy-loaded 3D terrain, desktop only); @lucasmarkes/hairline (the call visual, lazy-loaded)
- Cloudflare Pages + Pages Functions (`/functions`) for hosting and the server side
- Assistant model: Groq (`openai/gpt-oss-120b`, free tier: 8,000 tokens/min, 1,000 requests/day). Key `GROQ_API_KEY` is an environment variable, never in code. Ollama and Workers AI are optional fallbacks in `functions/api/chat.js`
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

## The call ("Talk to me")

- `Assistant.jsx` runs the loop: listen (browser speech recognition) -> think (`/api/chat`, `mode: 'call'`) -> speak -> listen. Tap while it speaks to interrupt; hangs up after 3 silent turns.
- Persona is Arman in the FIRST person, honest that it is an AI if asked. Call mode writes short, speakable sentences (numbers as words, no codes/links). Text mode keeps `/projects/slug` links. Prompts live in `functions/_prompt.js`.
- Voice: Kyutai Pocket TTS "marius" (CC0) in the browser, default on capable desktops. Model files (~125 MB) are fetched in the background after the page is idle (`prefetch`: stored in Cache Storage, SHA-256 verified, speech engine NOT started). Phones, data-saver and slow connections use the browser's built-in voice. Typed answers are never spoken.
- The hero landscape is replaced by a Hairline `terrain` figure during a call. Its built-in `play` loop is too slow, so `CallStage.jsx` drives a virtual pointer from the voice level (`src/lib/level.js`).
- Third-party voice code is vendored in `public/tts/` (Apache-2.0 / CC BY 4.0 / MIT; see NOTICE.txt). Do not add a CDN at runtime.

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
- A better paid/API voice may replace the in-browser one later (keep the `speak()` interface)
- Deploy to Cloudflare Pages (secrets: GROQ_API_KEY; later TURNSTILE_SECRET)
- Résumé PDF, headshot, per-project GitHub links (`projectLinks` in content.js)
