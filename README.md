# StealthHire

A talent intelligence platform. Hiring managers search candidates by what
they have actually done and message them directly — one profile assembled
from a LinkedIn history, a CV and linked credentials, with no recruiter
chain in between.

Full product reasoning: [`docs/VISION.md`](docs/VISION.md).

## The problem

Hiring goes through a chain — internal recruiter, agency, candidate contact
— that costs days and 15–30% of first-year salary. And CV screening sorts on
university and keywords, so a candidate with two live sell-side processes
behind them is filtered out before anyone reads the page.

The initial market is **finance**: investment banking, private equity and
adjacent roles. That focus drives the vocabulary and the profile fields
across the product.

## Status

**Frontend only. There is no backend.**

| Area | State |
| --- | --- |
| Design system and component library | Built |
| Landing page | Built |
| Profile builder (`/profile`) | Built — manual entry, saves to `localStorage` |
| Database, API, authentication | **Not started** |
| LinkedIn / CV import | **Not started** — described in the vision, not implemented |
| Intent search | **Not started** — see the roadmap |
| Verification | **Deliberately not built**, and not planned |

Marketing surfaces show only what runs today. Nothing on the roadmap is
advertised on the site before it exists.

## Roadmap

Backend → LinkedIn/CV import → intent search. Detail, constraints and the
reasoning behind each deferral: [`docs/ROADMAP.md`](docs/ROADMAP.md).

The backend is the current priority and blocks the other two. It needs an
ADR before any code is written.

## Architecture

A single Next.js application in `apps/web`, statically rendered, with no
server-side dependencies. Server Components are the default; Client
Components are the exception and are justified where used.

The design token layer is CSS custom properties consumed through Tailwind
v4. Tailwind's default palette is switched off, so only brand tokens compile
into utilities — a raw hex in a component fails the build rather than
passing review. See [`docs/DESIGN_LANGUAGE.md`](docs/DESIGN_LANGUAGE.md) and
[`docs/adr/0001-frontend-stack.md`](docs/adr/0001-frontend-stack.md).

## Technology

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), React |
| Language | TypeScript, `strict` plus `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS v4, CSS-variable design tokens |
| Tests | Vitest, Testing Library, jsdom |
| Lint | ESLint |
| CI | Lint, tests and a production build on every push and PR |

Exact versions are in `apps/web/package.json` — that file is the source of
truth, not this table.

> `apps/web/AGENTS.md`: this Next.js version has breaking changes relative to
> most training data. Read `node_modules/next/dist/docs/` before writing
> framework code.

## Repository layout

```
apps/web/               Next.js application
  src/app/              Routes: / , /profile , /design
  src/components/ui/    Design-system primitives
  src/components/marketing/  Landing-page sections
  src/features/         Feature-scoped code (profile)
  src/lib/              Shared utilities
  public/logos/         Brand assets (see the README there before adding any)
docs/                   Vision, guidelines, design language, roadmap
docs/adr/               Architecture decision records
CLAUDE.md               Operating rules for AI-assisted sessions
```

## Running it

Requires **Node 22** and npm.

```bash
git clone https://github.com/llisowski27-hub/stealthhire.git
cd stealthhire/apps/web
npm install
npm run dev
```

Open <http://localhost:3000>. To pull later changes: `git pull origin main`,
then `npm install` if dependencies moved.

All commands run from `apps/web`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on :3000 |
| `npm run build` | Production build — must pass before pushing |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Re-run tests on change |

Port busy? `npm run dev -- --port 3001`.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/profile` | Candidate profile builder |
| `/design` | Internal design-system gallery — tokens and components |

## Development workflow

Plan, then implement one small reviewable change at a time. Lint, tests and
the production build all pass before pushing. Changes land through reviewed
pull requests; no direct pushes to `main`.

The full lifecycle and definition of done are binding and live in
[`docs/ENGINEERING_GUIDELINES.md`](docs/ENGINEERING_GUIDELINES.md).

## Constraints every contributor must know

1. **No verification exists.** No surface may imply a claim is confirmed —
   no badges, no trust scores, no wording suggesting third-party checks.
2. **No unbuilt capability is advertised.** If it is on the roadmap, it does
   not appear on a marketing page.
3. **The design system comes first.** Components consume tokens; they never
   hard-code values.
4. **Illustrative profiles may name a real institution, never invent its
   record.** Marketing candidate cards belong to no one. A named firm plus a
   role is fine; a named firm plus an invented mandate is a false claim
   about that firm. Every credential names its institution or is cut.
5. **No secrets anywhere** — commits, docs, examples, logs. Placeholders
   only. An exposed secret is rotated immediately.
6. **Candidate data is personal data.** GDPR/CCPA obligations are product
   requirements, not a later compliance pass.
7. **Documentation drift is a bug.** Architecture changes update the docs in
   the same change.

## Documentation

| Document | Purpose |
| --- | --- |
| [docs/VISION.md](docs/VISION.md) | What the product is, who it is for, what it deliberately is not |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Deferred features, why, and what they are blocked on |
| [docs/ENGINEERING_GUIDELINES.md](docs/ENGINEERING_GUIDELINES.md) | Lifecycle, definition of done, per-change requirements |
| [docs/SECURITY.md](docs/SECURITY.md) | Security baseline every change is reviewed against |
| [docs/FRONTEND_GUIDELINES.md](docs/FRONTEND_GUIDELINES.md) | Frontend process, code standards, component rules |
| [docs/DESIGN_LANGUAGE.md](docs/DESIGN_LANGUAGE.md) | Visual identity, palette, design principles |
| [docs/adr/](docs/adr/) | Architecture decision records |
| [CLAUDE.md](CLAUDE.md) | Operating rules for AI-assisted sessions |
