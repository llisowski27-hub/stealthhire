# StealthHire

A talent intelligence platform that connects hiring managers directly with
professionals — one profile mapped from LinkedIn, a CV and public sources,
and no recruiter chain in between.

## Getting started

Requires **Node 22** and npm (`node --version` to check).

```bash
git clone https://github.com/llisowski27-hub/stealthhire.git
cd stealthhire/apps/web
npm install
npm run dev
```

Then open <http://localhost:3000>. The dev server hot-reloads on save.

### Pulling the latest changes

```bash
git pull origin main
cd apps/web
npm install     # only needed when dependencies changed
npm run dev
```

### Commands

Run these from `apps/web`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on :3000 |
| `npm run build` | Production build — must pass before pushing |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Re-run tests on change |

If port 3000 is busy, pass another: `npm run dev -- --port 3001`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/profile` | Candidate profile builder |
| `/design` | Internal design-system gallery (tokens and components) |

## Repository layout

```
apps/web/          Next.js app (App Router, TypeScript, Tailwind v4)
  src/app/         Routes
  src/components/  Shared UI, marketing sections, dev galleries
  src/features/    Feature-scoped code (e.g. profile)
  public/logos/    Institution and platform brand assets
docs/              Guidelines, design language, and ADRs
```

## Documentation

| Document | Purpose |
| --- | --- |
| [docs/VISION.md](docs/VISION.md) | Product vision, value proposition, platform architecture |
| [docs/ENGINEERING_GUIDELINES.md](docs/ENGINEERING_GUIDELINES.md) | Development lifecycle, definition of done, per-change requirements |
| [docs/SECURITY.md](docs/SECURITY.md) | Security baseline every change is reviewed against |
| [docs/FRONTEND_GUIDELINES.md](docs/FRONTEND_GUIDELINES.md) | Frontend process, code standards, per-component requirements |
| [docs/DESIGN_LANGUAGE.md](docs/DESIGN_LANGUAGE.md) | Visual identity, color palette, design principles |
| [docs/adr/](docs/adr/) | Architecture decision records |
| [CLAUDE.md](CLAUDE.md) | Rules for AI-assisted development in this repository |

## Status

The frontend is built: landing page, profile builder, and the design system
with its component library. There is **no backend yet** — the profile
builder saves a draft to your browser's local storage, and LinkedIn/CV
import is described but not implemented. Choosing the backend stack is the
next architecture decision.

## Contributing

All contributions — human or AI-assisted — follow the engineering guidelines
and security baseline above. Changes land via reviewed pull requests in
small, focused increments. CI runs lint, tests, and a production build on
every push and pull request.
