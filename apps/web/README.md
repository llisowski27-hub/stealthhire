# StealthHire — Web

The StealthHire web application. Next.js (App Router) + strict TypeScript +
Tailwind CSS v4 consuming CSS-variable design tokens.

Stack rationale: [`../../docs/adr/0001-frontend-stack.md`](../../docs/adr/0001-frontend-stack.md)
Design tokens source of truth: [`../../docs/DESIGN_LANGUAGE.md`](../../docs/DESIGN_LANGUAGE.md)
Binding rules: [`../../docs/FRONTEND_GUIDELINES.md`](../../docs/FRONTEND_GUIDELINES.md)

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev server
npm run build   # production build (must pass before any push)
npm run lint    # eslint
```

## Conventions

- All design values come from tokens in `src/app/globals.css` — the
  Tailwind default color palette is disabled, so only token utilities
  (`bg-surface-1`, `text-muted`, `border-edge`, …) compile.
- Server Components by default; `"use client"` requires justification.
- Feature-based structure under `src/` as features are added.
