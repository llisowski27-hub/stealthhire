# StealthHire — Design Language

The visual identity of StealthHire is a premium, modern, dark interface. The
application should feel like the Stripe Dashboard, Linear, Vercel, Raycast,
Notion Dark, Arc Browser, or Warp Terminal.

## Principles

- Minimal, premium, clean
- High contrast
- Large spacing
- Soft shadows, matte appearance
- Glass effects only where appropriate
- No unnecessary gradients
- No visual noise

## Color Palette

These are the brand reference values. They must be exposed to code only as
named design tokens (see [`FRONTEND_GUIDELINES.md`](./FRONTEND_GUIDELINES.md))
— never as hard-coded hex values in components.

### Primary — Matte Black

| Token intent | Hex |
| --- | --- |
| Background / base | `#0D0D0D` |
| Background / raised | `#151515` |

### Dark Gray — surfaces

| Token intent | Hex |
| --- | --- |
| Surface 1 | `#1A1A1A` |
| Surface 2 | `#222222` |
| Surface 3 | `#2B2B2B` |

### Accent — Green

| Token intent | Hex |
| --- | --- |
| Accent / primary | `#B8FF6A` |
| Accent / hover | `#C6FF7E` |
| Accent / soft | `#A8FFB0` |

### Neutral

| Token intent | Hex |
| --- | --- |
| Foreground / primary (white) | `#F5F5F5` |
| Foreground / muted (gray text) | `#A8A8A8` |
| Border | `#303030` |

### Semantic

| Token intent | Hex |
| --- | --- |
| Success | `#B8FF6A` |
| Warning | `#FFD95A` |
| Danger | `#FF6464` |

## Contrast Requirements

All foreground/background pairings must meet WCAG 2.1 AA (4.5:1 for body
text, 3:1 for large text and UI components). Notes:

- `#F5F5F5` on `#0D0D0D`–`#2B2B2B` passes comfortably for body text.
- `#A8A8A8` (muted text) passes on `#0D0D0D`/`#151515`/`#1A1A1A`; verify
  before using it on lighter surfaces (`#2B2B2B` and up) or small text.
- Accent green on dark backgrounds passes; **dark text on accent-green
  fills** must use a near-black foreground (e.g. `#0D0D0D`), never white.
- Semantic colors must never be the only carrier of meaning — pair with
  icons or text (color-blind accessibility).

## Motion

- Subtle, fast, purposeful.
- Animate `opacity` and `transform` only; never animate layout properties
  unnecessarily.
- Respect `prefers-reduced-motion`.

## Design System First

No UI component may be built before the design system foundations are
defined and approved: typography scale, spacing scale, grid, container
widths, radius, elevation, color/shadow/animation/transition tokens, icon
sizes, and the component hierarchies (buttons, inputs, modals, navigation,
cards), plus shared empty/loading/skeleton/error states, toasts, and
responsive breakpoints. Defining that system is its own reviewable task.
