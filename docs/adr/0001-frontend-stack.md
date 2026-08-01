# ADR 0001 — Frontend Stack

- **Status:** Accepted
- **Date:** 2026-08-01
- **Deciders:** Project owner (approved the recommendation in review)

## Context

The repository has binding engineering and frontend guidelines
([`FRONTEND_GUIDELINES.md`](../FRONTEND_GUIDELINES.md)) but no application
code. The guidelines require: strict TypeScript, Server Components
preferred, feature-based architecture, a design-token-first styling
approach ([`DESIGN_LANGUAGE.md`](../DESIGN_LANGUAGE.md)), and a premium
dark UI in the vein of Vercel/Linear/Stripe.

## Decision

- **Framework:** Next.js (App Router) — first-class React Server
  Components, file-based routing, built-in code splitting and image
  optimization, mature ecosystem.
- **Language:** TypeScript with `strict: true`; no untyped escape hatches.
- **Styling:** Tailwind CSS consuming **CSS custom properties** as the
  token layer. All colors, spacing, radii, shadows, and motion values are
  defined once as `--token-*` variables; Tailwind utilities map to them.
  Components never contain raw hex/px design values.
- **Repository layout:** monorepo-shaped from the start — the web app
  lives in `apps/web/`; future backend services and shared packages get
  sibling directories (`apps/*`, `packages/*`). No monorepo tooling
  (turborepo/nx) until more than one package exists.
- **Package manager:** npm with a committed lockfile and pinned versions.

## Alternatives considered

- **Vite + React SPA:** lighter, but no Server Components, and SEO/perf
  characteristics worse for a marketing-facing product surface.
- **Remix:** strong data-loading model, but smaller ecosystem and the
  team standard (guidelines) explicitly prefers Server Components.
- **CSS-in-JS (styled-components etc.):** runtime cost and hydration
  weight conflict with the performance guidelines; rejected.

## Consequences

- Feature UI can only be built after the design token layer exists
  (this is enforced by the design-system-first rule, and the token layer
  ships as the first coding task).
- Client Components must be justified case by case.
- Security headers/CSP configuration is deferred until a deployment
  target exists — tracked as known technical debt.
