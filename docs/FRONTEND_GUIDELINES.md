# StealthHire — Frontend Engineering Guidelines

Binding rules for all frontend work, extending
[`ENGINEERING_GUIDELINES.md`](./ENGINEERING_GUIDELINES.md) and
[`SECURITY.md`](./SECURITY.md). Visual identity is defined in
[`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md).

Optimize for maintainability, scalability, accessibility, performance,
security, consistency, and readability — never only for speed.

## 1. Design System First

Never build components directly. The design system (tokens, scales,
hierarchies, shared states — see `DESIGN_LANGUAGE.md`) must be defined and
approved before any feature UI is implemented. Components consume tokens;
they never hard-code values.

## 2. Implementation Process (per task)

1. **Understand the feature** — purpose, user flow, expected behavior,
   edge cases, dependencies.
2. **Review existing architecture** — reuse existing abstractions; never
   duplicate logic or create unnecessary components.
3. **Plan** — components, hooks, state, routing, API interactions,
   validation, error handling, loading, animations.
4. **Security review before coding** — XSS, HTML/DOM injection, no unsafe
   `dangerouslySetInnerHTML`, token leakage, sensitive data exposure,
   local/session-storage risks, authn/authz state, no client-side-only
   permission assumptions, CSRF implications, clipboard leaks, file upload
   risks, unsafe/open redirects, URL parameter validation, CSP
   compatibility, dependency and supply-chain risks.
5. **Performance review before coding** — bundle size, tree shaking, lazy
   loading and dynamic imports, image optimization, memoization, rendering
   frequency, hydration cost, virtualization, caching, prefetching,
   re-render prevention, network requests.
6. **Accessibility review before coding** — WCAG compliance, keyboard
   navigation, screen readers, ARIA, focus management and trapping,
   contrast, semantic HTML, reduced motion, touch targets.
7. Only then code.

Before-code output: task understanding, architecture plan, component plan,
security/accessibility/performance validation, risks. After-code output:
files changed, reasoning, possible improvements, technical debt, future
refactoring, open questions.

## 3. Code Standards

- TypeScript with strict typing throughout.
- Small reusable components; composition over inheritance.
- Feature-based architecture, custom hooks, clean folder structure.
- Consistent naming; no duplicated code; no magic values; no inline
  business logic; no giant components.
- Prefer Server Components; Client Components only when necessary.
- Keep files small — split when complexity grows; avoid files over ~250
  lines unless justified.

## 4. Component Rules

Every component has: single responsibility, typed props, loading state,
error state, empty state, accessibility, responsive behavior, reusable
styling, minimal complexity, and documentation comments where useful.

## 5. Forms

Every form requires: client validation, server validation, sanitized input,
a typed schema, clear errors, a disabled loading state, success state,
retry state, and debounced validation where appropriate.

## 6. Tables

Every table requires: sorting, filtering, empty state, loading state,
pagination where needed, keyboard accessibility, and responsive layout.

## 7. Modals

Every modal requires: Escape support, focus trap, scroll locking, ARIA
attributes, a close button, defined overlay-click behavior, and animation.

## 8. API Integration

Never assume backend success. Handle explicitly: 400, 401, 403, 404, 409,
422, 429, 500, timeouts, network failures, and partial failures.

## 9. State Management

Avoid global state unless justified. Prefer local state, server state,
derived state, and memoization. Never duplicate state.

## 10. Error Handling

Every async operation requires: loading, retry, error UI, a logging hook,
and fallback UI.

## 11. Responsive Design

Desktop first, then validate laptop, tablet, mobile, and large monitors.
No layout may break at any breakpoint.

## 12. Animations

Subtle, fast, purposeful, GPU-accelerated. Prefer `opacity` and
`transform`; never animate layout unnecessarily. Respect
`prefers-reduced-motion`.

## 13. Self Review

After every implementation perform: architecture, design, accessibility,
performance, security, code, and refactoring reviews.

## 14. Most Important Rule

If a requested feature is too large, do not implement it — split it into
smaller engineering tasks first and implement one at a time. Never
sacrifice architecture, security, or maintainability for speed. Never
generate code before completing planning and validation.
