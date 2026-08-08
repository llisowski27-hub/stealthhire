# CLAUDE.md

Operating rules for AI-assisted work in this repository. These are permanent
and override default behaviour.

Read [`README.md`](README.md) first for what the project is and what state it
is in. This file is about *how to work here*, not what the product is.

## Binding documents

Detail lives in these; do not restate them, follow them.

| Document | Governs |
| --- | --- |
| [`docs/VISION.md`](docs/VISION.md) | What the product is and is deliberately not. Read before designing any feature. |
| [`docs/ENGINEERING_GUIDELINES.md`](docs/ENGINEERING_GUIDELINES.md) | Lifecycle, definition of done, API/database/page requirements, the five mandatory reviews. |
| [`docs/SECURITY.md`](docs/SECURITY.md) | The security checklist every change is reviewed against. |
| [`docs/FRONTEND_GUIDELINES.md`](docs/FRONTEND_GUIDELINES.md) | Frontend process and per-component/form/table/modal rules. |
| [`docs/DESIGN_LANGUAGE.md`](docs/DESIGN_LANGUAGE.md) | Visual identity and tokens. The design system precedes any feature UI. |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Deferred features and why. Do not build from it without being asked. |
| [`docs/adr/`](docs/adr/) | Accepted architecture decisions. |
| [`apps/web/AGENTS.md`](apps/web/AGENTS.md) | This Next.js version differs from training data — read its docs before framework code. |

## Engineering principles

- **Plan before coding.** Restate the task, read what it touches, write the
  plan, name the risks and security implications. Then code.
- **One small reviewable change at a time.** Never large code dumps. If a
  task is too large, split it before writing anything.
- **If a request conflicts with the architecture, stop and explain.** Do not
  code around it.
- **Tests and validation are never skipped.** A change with failing tests is
  not done. Report failures honestly, with the output.
- **Never sacrifice architecture, security or maintainability for speed.**
- **Verify before claiming done.** Lint, tests and a production build pass
  locally. Visual changes are checked in a real browser, including at 390px.

## Repository conventions

**Layout.** `src/components/ui/` holds design-system primitives with no
product knowledge. `src/components/marketing/` holds landing-page sections.
`src/features/<name>/` holds feature-scoped code — schema, storage,
components — and nothing outside that feature imports its internals.
`src/lib/` holds shared utilities.

**Naming.** Files are kebab-case; React components are PascalCase; types and
props are `PascalCase` (`ProfileFormProps`). Tests sit beside the code they
test as `<name>.test.ts(x)`.

**Files stay small.** Split past ~250 lines unless there is a stated reason.

**Server Components are the default.** `"use client"` requires a comment
justifying it. Client state is local unless something forces otherwise.

**Styling is tokens only.** No raw hex, no arbitrary colour values.
Tailwind's default palette is disabled, so an off-token colour fails the
build. Compose classes with `cn()` from `src/lib/cn.ts`.

**Content data is typed and module-level.** Marketing copy lives in
`readonly T[]` constants at the top of the component file, not inline in
JSX and not fetched.

**Dependencies.** Prefer what is already here. A new dependency needs a
justification: maintenance, license, transitive weight, vulnerabilities.
Lockfiles are committed.

**Validation.** Untrusted input is validated at the boundary with a typed
schema that rejects by default — including URLs (scheme and host
allowlisted) and anything read back from `localStorage`, which is shape-
checked inside `try`/`catch` and discarded when it does not match.

**Errors and logging.** Every async path has loading, error and retry
handling. Errors surface as typed structured responses — never raw
exceptions, stack traces or internals. Nothing sensitive is ever logged.

**Configuration.** No configuration or environment variables exist yet.
When they arrive: secrets are server-side only, never `NEXT_PUBLIC_`, never
committed, documented as placeholders in `.env.example`, and validated at
startup rather than read ad hoc.

**API design** (none built yet — these bind the first one): typed request and
response models, schema validation, deny-by-default authorization, structured
errors, correlation IDs, rate limiting, and tests for happy path, validation
failure and authorization failure.

**Git.** Small focused commits with descriptive messages. Every change lands
via a reviewed pull request; no direct pushes to `main`. Never commit a
secret — in code, docs, examples, fixtures or logs. An exposed secret is
rotated immediately and never reused.

## Product constraints that bind code

1. **No verification exists.** Never render a badge, score, or wording that
   implies a claim has been confirmed by anyone.
2. **Never advertise what is not built.** No marketing surface demonstrates
   a roadmap feature, including with mock data.
3. **Candidate identity stays hidden** until the candidate's own conditions
   are met.
4. **Candidate data is personal data.** GDPR/CCPA obligations are design
   inputs, not a later pass.
5. **Third-party brand assets** come from the rights holder. Never trace,
   redraw or screenshot a logo — see `apps/web/public/logos/README.md`.
6. **Illustrative profiles may name a real institution, but never invent
   its record.** Marketing candidate cards belong to no one. The line runs
   between describing a desk and describing a deal: side, sector and the
   workstream the candidate owned are role descriptors and are allowed;
   counterparty, enterprise value, status and outcome are a specific
   transaction and are not, because attaching one to a named firm asserts
   something false about that firm on a commercial page.
   Work is named in the artefact register, never in verbs. "Owned the
   operating model" is a claim about a person on a deal and reads like every
   other CV; "Three-statement operating model" is a thing that was built.
   The artefact belongs to the candidate, so naming it precisely says
   nothing about the employer's mandate — which is what makes this rule
   satisfiable at the level of detail a finance reader demands. Banned
   verbs: owned, assisted, supported, involved in.
7. **A credential names its institution and is measurable, or it does not
   appear.** An anonymous "boutique" or "student fund" is filler. So is a
   qualification most of the applicant pool also holds — a row that does not
   separate this candidate from the people they are compared against has
   failed at the only job it has.
8. **Marketing copy is written to the candidate, in the candidate's voice.**
   Every call to action on the site is a candidate action. Employer-voice
   copy ("what you screen", "cost per hire") next to a candidate button
   makes a visitor stop to work out which product this is. The employer's
   argument appears as the reason a profile pays off, never as a second
   pitch. See [`docs/VISION.md`](docs/VISION.md) §2.
   Headlines are the exception, and state the market's thesis rather than
   either side's benefit. The first question every visitor asks is why this
   exists when LinkedIn already does; a benefit line answers a different
   question, and a candidate-benefit line ("get found") reads as a consumer
   product to the desks whose interest makes the profile worth building. A
   thesis sentence is true of the industry rather than addressed to a
   reader, so it holds both audiences without splitting the page.
9. **Examples stay inside the vertical.** Illustrative profiles differ by
   desk and by career stage, never by industry. Advisory and systematic
   trading hire on the same argument — that the job title is the least
   informative field on the record — so a second desk widens the audience
   without splitting the page; it also spares a quant reader having to
   translate an M&A card before deciding the product is for them. A profile
   from outside finance argues two different products.

## AI behaviour

- **Never invent requirements.** If it was not asked for, do not build it.
- **Never silently change architecture.** A structural change is proposed
  and recorded as an ADR before it is written.
- **Ask when requirements conflict.** Do not pick a side quietly.
- **Prefer incremental changes** over rewrites.
- **Avoid unnecessary abstractions.** Do not generalize on a single case.
- **Avoid duplicate implementations.** Search for an existing component or
  utility before writing a new one.
- **Preserve consistency** with the surrounding code — naming, structure,
  comment density, idiom.
- **Report accurately.** Say what was skipped, what failed, and what is
  unverified. Do not describe partial work as complete.

## Documentation rules

Documentation drift is a bug, not a chore.

When architecture, APIs, workflows or repository structure change, the same
change updates:

- `README.md` — status, architecture, layout, commands, routes
- the affected document under `docs/`
- an ADR, if the change is an architectural decision
- `docs/ROADMAP.md`, when something ships or is deferred

Additional rules:

- Documentation describes the **current system**, never the history of how it
  was decided. Superseded plans are deleted or moved into an ADR.
- Record the accepted decision only. Rejected alternatives belong in an ADR's
  alternatives section, nowhere else.
- Do not document speculative or unbuilt behaviour outside `docs/ROADMAP.md`.
- Keep each fact in one place and link to it rather than restating it.
