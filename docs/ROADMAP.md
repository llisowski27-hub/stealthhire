# Roadmap

Features that are decided in principle but deliberately not built yet.
Nothing here is on the marketing site: we do not advertise capability we
do not have.

Each entry records why it was deferred and what has to exist first, so it
can be picked up without re-deriving the reasoning.

Priority order: **backend → LinkedIn/CV import → intent search.** Everything
else waits.

---

## Backend

**Status:** not started. This is the top priority and blocks everything else.

Nothing server-side exists: no database, no API, no authentication. The
profile builder writes a draft to `localStorage` and that is all.

Needs an ADR before any code, covering at minimum: datastore, API style,
authentication and session handling, the candidate/hiring-manager role
split, and file upload for CV parsing. Postgres is the assumed datastore
because intent search later wants `pgvector` in the same database, but that
assumption belongs in the ADR, not in code.

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
because a marketing surface must not demonstrate a feature that does not
run.

### What it is

A hiring manager writes a brief in plain language — "someone who has
worked a live sell-side process and can build an LBO unassisted,
regardless of university" — and gets ranked candidates, each with the
specific piece of evidence that answered the brief.

The point is recall, not phrasing: keyword search returns whoever typed
the right string. A candidate who ran a disposal but wrote "advised the
vendor" is invisible to a search for "sell-side" and visible to this one.

### Architecture

Four stages. Only the last one calls a model per query, which is what
keeps it affordable.

1. **Hard filters (SQL).** Location, right to work, years of experience,
   and the candidate's own contact conditions. No model involved — these
   are constraints, not preferences, and must never be approximated.
2. **Semantic retrieval.** Profile experience text is embedded on write
   and stored as vectors alongside the row (`pgvector` in Postgres, so
   there is no second datastore to keep in sync). The query is embedded
   at read time and matched by similarity. Note the Anthropic API has no
   embeddings endpoint; embeddings come from a separate provider or a
   self-hosted model, which is an explicit vendor decision to make at
   implementation time.
3. **Hybrid ranking and rerank.** Vector similarity alone is weak on
   exact criteria ("CFA Level I", "FMWC"), so it is blended with keyword
   search and the combined top ~50 is reranked.
4. **Evidence line.** A per-result LLM pass over the ~10 results actually
   displayed produces the one-line "why this matched". Runs on the
   displayed page only, so cost scales with results shown rather than
   with corpus size.

### How a result must read

The audience is a desk at a firm that receives thousands of applications.
Anything that reads like a CV bullet or a generic job board fails on
contact.

- **Deal-sheet register, not CV register.** A result states side, sector,
  size, status and what the person personally owned: "Sell-side,
  industrials, €380m EV, signed — owned the operating model and the DD
  tracker." Not "built the operating model on a take-private."
- **No provenance line.** An earlier mockup labelled sources as "referee"
  and "modelling test". Both imply we contacted a referee or saw a firm's
  modelling test. We do not, and displaying either would break the
  no-verification rule at exactly the point where it is most damaging.
  A result shows the candidate's own structured record and nothing else.
- **Specific or absent.** A vague evidence line is worse than none — it
  spends the reader's attention and returns nothing. If the profile does
  not carry a specific fact answering the brief, the result does not
  claim one.

### Constraints that are not negotiable

- **Extractive only.** The evidence line must quote the profile, never
  infer or embellish. Every claim rendered has to be verified as present
  in the source record before it reaches the page. A fabricated
  "€380m sell-side" attributed to a real person is a reputational and
  legal problem, not a quality bug.
- **Identity stays hidden** in results until the candidate's own contact
  conditions are met, consistent with the rest of the product.
- **Hard constraints never come from the model.** Stage 1 is SQL for a
  reason.

### Blocked on

- Backend: database, API, auth. No ADR yet.
- The profile schema. Deal exposure, mandate size and role have to be
  captured as structured fields at intake — no embedding recovers what
  the profile never stored. This is the expensive-to-reverse decision,
  and it lands well before search is built.
- An evaluation set of briefs with known-good answers. Without it there
  is no way to tell a ranking change from a ranking regression.

## Verification

**Status:** deferred, deliberately and indefinitely.

No verification exists and none is planned for v1. The full reasoning, and
the graded-tier design that was worked out and then set aside, are in
[`adr/0002-verification-model.md`](./adr/0002-verification-model.md).

The consequence is a live constraint on every surface built today: nothing
on a profile is confirmed, so nothing may imply that it is.

## Partner / agency layer

**Status:** discussed, not accepted, not built.

The idea: recruitment agencies contribute candidates and receive referral
revenue without owning the hiring process. It was removed from the landing
page and is not part of the product. It is recorded here so it is not
reinvented from scratch, not because it is scheduled.

If it is ever revisited, the permission boundary in
[`SECURITY.md`](./SECURITY.md) §2 already states the rule it must satisfy:
an agency must never impersonate an employer, and an employer must never
read data a candidate has not exposed.
