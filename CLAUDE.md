# CLAUDE.md

Guidance for AI-assisted development in this repository.

## What this project is

StealthHire — a talent intelligence platform connecting Hiring Managers
directly with candidates via verified performance data. Read
[`docs/VISION.md`](docs/VISION.md) before designing any feature.

## Binding rules

All work in this repository follows:

- [`docs/ENGINEERING_GUIDELINES.md`](docs/ENGINEERING_GUIDELINES.md) —
  development lifecycle, definition of done, per-change requirements for
  APIs, database changes, and frontend pages.
- [`docs/SECURITY.md`](docs/SECURITY.md) — security baseline every change
  is reviewed against.
- [`docs/FRONTEND_GUIDELINES.md`](docs/FRONTEND_GUIDELINES.md) — frontend
  process, code standards, and per-component requirements.
- [`docs/DESIGN_LANGUAGE.md`](docs/DESIGN_LANGUAGE.md) — visual identity,
  color palette, and design principles. The design system must be defined
  and approved before any feature UI is built.

Non-negotiables, summarized:

1. Plan before coding: restate the task, read dependencies, write an
   implementation plan, identify risks and security implications.
2. Implement one small, reviewable task at a time — never large code dumps.
3. If a task is too large, split it first. If it violates the architecture,
   stop and explain instead of coding.
4. Every change passes code, security, performance, architecture, and
   refactoring review before it is considered done.
5. Tests and validation are never skipped; failures are reported honestly.
6. No secrets in commits, docs, examples, or logs — placeholders only.
   Exposed secrets are rotated immediately.

## Repository state

The codebase is not yet bootstrapped — no stack has been chosen. Any session
that introduces the initial application skeleton must first propose the
technology choices and architecture for review, per the guidelines.
