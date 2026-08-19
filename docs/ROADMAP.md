# Roadmap

What is not built yet, in the order it should be built. Nothing here appears
on the marketing site: we do not advertise capability we do not have.

Each entry records why it was deferred and what has to exist first, so it can
be picked up without re-deriving the reasoning.

The order is deliberate and runs smallest-first. Stage 1 is ordinary site work
that needs no backend and no decisions — most of it is an afternoon each.
Stage 2 stops the site regressing while stage 3 is being built. Stage 3 is the
product, and it is gated behind an ADR that does not exist yet. Working
stage 3 first means building on a schema nobody has agreed to.

| Stage | What | Blocked on |
| --- | --- | --- |
| 1 | Finish the public site | Nothing |
| 2 | Stop it regressing | Nothing |
| 3 | Build the product | An ADR |
| — | Deliberately not planned | — |

---

# Stage 1 — Finish the public site

**Status:** not started. No backend needed, no decisions outstanding. This is
the work to pick up next.

The landing page is built and the design system behind it is built. What is
missing is everything around a page that makes it a site.

### The design system page is public

`/design` is an internal token and component gallery. It is linked from the
site footer and is indexable, so it is reachable by anyone and will end up in
search results.

Two changes: drop it from `LINK_GROUPS` in `src/components/site-footer.tsx`,
and set `robots: { index: false }` in its route metadata.

### No social preview

A link to the site pastes as a bare URL — no title card, no image — in Slack,
WhatsApp, LinkedIn and every other surface a candidate would share it on. For
a product whose growth is candidates sending it to each other, this is the
cheapest thing on this list with the largest effect.

Needs an `opengraph-image` and `metadataBase` in the root layout; without
`metadataBase` the generated image URL is relative and most scrapers drop it.

### No `robots.txt` and no sitemap

Neither `robots.ts` nor `sitemap.ts` exists. Both are a few lines in
`src/app/` and both matter more once the pages above are indexable on purpose
rather than by accident.

### The 404 is the framework default

`not-found.tsx` does not exist, so a mistyped URL renders an unstyled Next
page with none of the site's chrome. A candidate who hits it concludes the
site is broken.

### Institution marks are monograms

`InstitutionMark` renders a monogram tile — `MS`, `JS`, `CFA` — because the
`logoSrc` slot has nothing in it. Real assets need permission from each
rights holder, and the rule that they are never traced, redrawn or
screenshotted is in [`../apps/web/public/logos/README.md`](../apps/web/public/logos/README.md).

Worth being honest that this is a sourcing task, not a coding one, and that
monograms are a legitimate permanent answer if permission does not come.

### No privacy notice

The site collects personal data by design and
[`VISION.md`](./VISION.md) §6 treats GDPR/CCPA as product requirements. There
is no page saying what is collected or how it is handled. The rights
mechanics — export, correction, deletion — need the backend, but the notice
itself is a page and does not.

---

# Stage 2 — Stop it regressing

**Status:** known, unaddressed. Also needs no backend.

The code that exists is reviewed carefully; what is missing is anything that
catches a regression *without* someone paying attention. Three defects shipped
in the profile form (index keys, stale validation errors, no autosave) while
lint, tests and the production build all passed, because nothing asserted that
a person could use the form.

- **End-to-end tests in CI.** The profile flow is verified by driving a real
  browser by hand. That protects the change being made, not the next one.
  Highest value of the four.
- **Visual regression.** Landing-page layout has broken three times —
  horizontal overflow at 390px, colliding section backgrounds after a section
  was removed, and a hero card clipped at 390px when a grid track sized to
  max-content — every one caught only by looking at a screenshot.
- **Accessibility automation.** Components are built with focus management,
  ARIA and semantic HTML, but nothing verifies it. Adding axe to the test run
  makes it structural rather than cultural.
- **Performance budget.** Bundle size has never been measured and there is no
  gate in CI.

Related: marketing components have no tests at all. Some product rules are
mechanically checkable — that no marketing surface renders wording implying
verification, for instance — and a test would enforce what is currently
enforced by memory.

---

# Stage 3 — Build the product

Ordered: **backend → LinkedIn/CV import → intent search.** Everything in this
stage is blocked behind the first entry.

## Backend

**Status:** not started. Blocks everything else in this stage.

Nothing server-side exists: no database, no API, no authentication. The
profile builder writes a draft to `localStorage` and that is all.

Needs an ADR before any code, covering at minimum: datastore, API style,
authentication and session handling, the candidate/hiring-manager role split,
and file upload for CV parsing. Postgres is the assumed datastore because
intent search later wants `pgvector` in the same database, but that assumption
belongs in the ADR, not in code.

## LinkedIn and CV import

**Status:** not started. Depends on the backend.

The product's core claim is that a profile is assembled from a LinkedIn
history and a parsed CV rather than typed by hand. Today the profile builder
is manual entry only.

Constraints: LinkedIn's API terms govern what may be imported and how — no
scraping. CV upload is an untrusted file path and inherits the file-upload
rules in [`SECURITY.md`](./SECURITY.md).

## Intent search

**Status:** deferred — depends on the backend.
**Removed from the landing page:** the "Describe the person. Not the
keyword." section was a static mockup with hardcoded results. It was cut
because a marketing surface must not demonstrate a feature that does not run.

### What it is

A hiring manager writes a brief in plain language — "someone who has worked a
live sell-side process and can build an LBO unassisted, regardless of
university" — and gets ranked candidates, each with the specific piece of
evidence that answered the brief.

The point is recall, not phrasing: keyword search returns whoever typed the
right string. A candidate who ran a disposal but wrote "advised the vendor" is
invisible to a search for "sell-side" and visible to this one.

### Architecture

Four stages. Only the last one calls a model per query, which is what keeps it
affordable.

1. **Hard filters (SQL).** Location, right to work, years of experience, and
   the candidate's own contact conditions. No model involved — these are
   constraints, not preferences, and must never be approximated.
2. **Semantic retrieval.** Profile experience text is embedded on write and
   stored as vectors alongside the row (`pgvector` in Postgres, so there is no
   second datastore to keep in sync). The query is embedded at read time and
   matched by similarity. Note the Anthropic API has no embeddings endpoint;
   embeddings come from a separate provider or a self-hosted model, which is
   an explicit vendor decision to make at implementation time.
3. **Hybrid ranking and rerank.** Vector similarity alone is weak on exact
   criteria ("CFA Level I", "FMWC"), so it is blended with keyword search and
   the combined top ~50 is reranked.
4. **Evidence line.** A per-result LLM pass over the ~10 results actually
   displayed produces the one-line "why this matched". Runs on the displayed
   page only, so cost scales with results shown rather than with corpus size.

### How a result must read

The audience is a desk at a firm that receives thousands of applications.
Anything that reads like a CV bullet or a generic job board fails on contact.

- **Artefact register, not CV register.** A result names what the candidate
  built — "Three-statement operating model, sell-side industrials" — never
  what they "owned" or "supported". Same rule that governs the marketing
  cards, and for the same reason: an artefact is specific and belongs to the
  candidate, a verb is vague and implicates the employer.
- **No provenance line.** An earlier mockup labelled sources as "referee" and
  "modelling test". Both imply we contacted a referee or saw a firm's
  modelling test. We do not, and displaying either would break the
  no-verification rule at exactly the point where it is most damaging. A
  result shows the candidate's own structured record and nothing else.
- **Specific or absent.** A vague evidence line is worse than none — it spends
  the reader's attention and returns nothing. If the profile does not carry a
  specific fact answering the brief, the result does not claim one.

### Constraints that are not negotiable

- **Extractive only.** The evidence line must quote the profile, never infer
  or embellish. Every claim rendered has to be checked as present in the
  source record before it reaches the page. A fabricated "€380m sell-side"
  attributed to a real person is a reputational and legal problem, not a
  quality bug.
- **Identity stays hidden** in results until the candidate's own contact
  conditions are met, consistent with the rest of the product.
- **Hard constraints never come from the model.** Stage 1 is SQL for a reason.

### Blocked on

- Backend: database, API, auth. No ADR yet.
- The profile schema. Desk, side, sector and artefacts have to be captured as
  structured fields at intake — no embedding recovers what the profile never
  stored. This is the expensive-to-reverse decision, and it lands well before
  search is built.
- An evaluation set of briefs with known-good answers. Without it there is no
  way to tell a ranking change from a ranking regression.

## Candidate-side controls and outreach

**Status:** not built. Depends on the backend.

Four capabilities were described on the landing page and removed, because none
of them runs. They remain the intended differentiators against a recruiter
seat on LinkedIn:

- **Private signal.** The candidate sets compensation, desk and location.
  Their employer never sees it. This is the feature the product's name refers
  to.
- **Conditional inbox.** A message only reaches the candidate if it meets
  every condition they set.
- **Grounded outreach.** Openers written from the candidate's actual record
  rather than a template — bound by the same extractive rule as intent search,
  since an opener that invents a deal is worse than a template.
- **Multi-source profiles.** Beyond one network: competition results and
  certification registries.

## Work samples and standardised assessment cases

**Status:** not built. Depends on the backend.

The profile carries what a candidate did at an employer, and that is the one
part of the record we can never make more specific — naming a real firm
alongside a specific mandate asserts something false about that firm, so the
detail stops at the artefact ("13-week cash flow model") and cannot reach the
transaction.

A standardised case library removes that ceiling. The candidate completes a
platform case — public-company DCF, LBO of a listed business, merger model,
equity research initiation, factor backtest, options pricing, market-making
simulation — and the output is theirs to publish in full, with no employer
implicated and nothing withheld. It resembles the work done inside the firms a
candidate is applying to without claiming it came from one, and it is the only
route to deal-level specificity that does not require inventing a deal.

Constraints:

- **Nothing produced here is verified.** A case output is the candidate's own
  work under stated conditions; it is not a score we stand behind, and no
  surface may present it as one. Wording like "verified capability" or
  "verified assessment" is banned outright — see
  [`adr/0002-verification-model.md`](./adr/0002-verification-model.md).
  Describe the conditions instead: what the case was, and whether it was
  timed.
- **Not advertised until it runs.** No marketing surface may show an
  assessment case, in any form, before the case library exists.
- Case content, anti-plagiarism and re-use across candidates are unsolved and
  are the reason this is not a small feature.

---

# Deliberately not planned

## Verification

**Status:** deferred, deliberately and indefinitely.

No verification exists and none is planned for v1. The full reasoning, and the
graded-tier design that was worked out and then set aside, are in
[`adr/0002-verification-model.md`](./adr/0002-verification-model.md).

The consequence is a live constraint on every surface built today: nothing on
a profile is confirmed, so nothing may imply that it is.

## Partner / agency layer

**Status:** discussed, not accepted, not built.

The idea: recruitment agencies contribute candidates and receive referral
revenue without owning the hiring process. It was removed from the landing
page and is not part of the product. It is recorded here so it is not
reinvented from scratch, not because it is scheduled.

If it is ever revisited, the permission boundary in
[`SECURITY.md`](./SECURITY.md) §2 already states the rule it must satisfy: an
agency must never impersonate an employer, and an employer must never read
data a candidate has not exposed.
