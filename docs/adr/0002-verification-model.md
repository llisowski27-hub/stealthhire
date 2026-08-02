# ADR 0002 — Graded Verification Model

- **Status:** Accepted
- **Date:** 2026-08-01
- **Supersedes:** the implicit binary "verified / not verified" model used in
  early UI work

## Context

StealthHire's core promise is that claims on a profile are verified. The
first implementation treated verification as a single boolean requiring a
third party to actively confirm each claim.

That model does not scale, for two independent reasons:

1. **Volume.** 1,000 candidates with ~10 claims each is ~10,000 verification
   events. Manual review is not viable at any headcount we would want.
2. **Incentives.** The party being asked — usually a former employer — gains
   nothing from answering. Response rates for cold verification requests are
   low, and the ones that do respond are biased toward candidates with warm
   relationships, which corrupts the signal.

A binary badge also overclaims: it presents "confirmed by a human who knew
the candidate" and "matched against a public results table" as the same
thing, and gives no honest way to display a claim nobody has confirmed.

## Decision

**We verify only what verifies itself.** No tier we build requires a third
party to answer a request, so verification cost does not grow with user
count and no external party is asked to do unpaid work. Human attestation is
deliberately deferred — see "Deferred" below.

### 1. Verification is graded, not binary

Every claim carries one of three tiers:

| Tier | Meaning | Human effort |
| --- | --- | --- |
| `registry` | Matched against an official public record — olympiad results (IOI, IMO, ICPC), DOI/ORCID publications, issuer-verifiable certifications (Credly and similar) | None |
| `sourced` | Pulled from an account the candidate cryptographically proved they own via OAuth (GitHub, ORCID) | None |
| `self_declared` | The candidate's claim; nothing has confirmed it yet | None |

Strength ordering (how hard the evidence is to fabricate, *not* how
important it is to a hiring manager): `registry` > `sourced` >
`self_declared`. `registry` ranks highest because it is independently
checkable public record. `sourced` proves account ownership and the platform
data attached to it, but not the candidate's interpretation of that data.

### 2. Everything automatic, or honestly unconfirmed

Verification pipelines are entirely machine-driven. The claims this product
cares about most — competition placements, publications, certifications,
open-source work — are matchable against public sources or OAuth-connected
accounts with nobody in the loop.

Employment history has no public registry and therefore stays
`self_declared` for now. That is an accepted, visible limitation rather than
a hidden one: a hiring manager reading the profile can see exactly which
claims carry evidence and which do not.

### 3. Unverified claims are displayed, honestly

Self-declared claims are shown, clearly labelled, never silently promoted.
A profile surfaces its composition ("3 registry-verified, 1 self-declared")
rather than a single badge. Honest labelling is more defensible than
implying blanket verification, and it makes the verified tiers mean
something.

### 4. Deterrence over prevention

We do not attempt to make fraudulent claims impossible. We make them
unattractive:

- Cross-source consistency checks (claimed employment dates against
  connected-account activity) flag anomalies for review.
- Every claim is permanently attributed to its evidence tier.
- Hiring managers can report claims; substantiated false claims terminate
  the account.

## Deferred: human attestation

A fourth tier — `attested`, meaning a named third party with standing
confirmed a claim — is intentionally **not** built yet. It is the only way
to put evidence behind employment history, so it is likely to arrive
eventually. It is deferred because it is the only part of the model with
per-claim human cost, and that cost lands on people who have no reason to
pay it.

When it is revisited, the reasoning that shaped it should be preserved:

- **Requests must be on demand, never upfront.** Triggering attestation when
  a hiring manager actually engages with a candidate collapses volume from
  "every claim by every user" to "claims on candidates in play", and gives
  the request context ("this person is being considered for a role") that
  materially lifts response rates over a cold ask.
- **Capacity must come from aligned parties.** Partner agencies earn
  referral revenue and are therefore motivated to validate candidates;
  employers are not. An employer domain-email round-trip is a cheaper middle
  ground — control of an `@company` address is evidence of affiliation
  without asking the employer to act — but it is weaker than a named
  attestation and must be recorded as such.

Adding the tier is additive: the enum, badge, and summary already treat
tiers as a list, so nothing in the current model needs to be unwound.

## Consequences

- Employment history carries no evidence tier until human attestation
  exists, which is the single largest gap in the model and must not be
  papered over in the UI.
- The UI must render every tier wherever a claim appears; a single
  "verified" badge is a design regression and should fail review.
- Verification state is per claim, not per profile.
- Each automatic tier needs an integration (registry adapters, OAuth
  providers). These are separate, independently shippable tasks — the model
  degrades gracefully, since anything unmatched simply stays
  `self_declared`.
- Registry matching is name-based and will produce ambiguity (common names,
  transliteration). Matching must be conservative: prefer leaving a claim
  `self_declared` over a false positive.
- Third-party data use is bound by the compliance constraints in
  `VISION.md` §3 — registry adapters must respect source terms of service.

## Open questions

- Whether `self_declared` claims are visible to employers by default, or
  only to the candidate until they reach a stronger tier.
- Whether a minimum verification threshold is required before a profile is
  searchable.
- Which registries to integrate first. Ranked by (public availability ×
  signal value): GitHub via OAuth, DOI/ORCID, Credly-style certification
  badges, then competition results (IOI, IMO, ICPC, Codeforces), which are
  public but inconsistently structured and need per-source adapters.
