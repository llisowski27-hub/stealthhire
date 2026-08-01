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

### 1. Verification is graded, not binary

Every claim carries one of four tiers:

| Tier | Meaning | Human effort |
| --- | --- | --- |
| `registry` | Matched against an official public record — olympiad results (IOI, IMO, ICPC), DOI/ORCID publications, issuer-verifiable certifications (Credly and similar) | None |
| `sourced` | Pulled from an account the candidate cryptographically proved they own via OAuth (GitHub, ORCID) | None |
| `attested` | A named third party with standing confirmed it — employer, competition organiser, certification body, or partner agency | One click |
| `self_declared` | The candidate's claim; nothing has confirmed it yet | None |

Strength ordering (how hard the evidence is to fabricate, *not* how
important it is to a hiring manager): `registry` > `attested` > `sourced` >
`self_declared`. `registry` ranks highest because it is independently
checkable public record. `sourced` proves account ownership and the platform
data attached to it, but not the candidate's interpretation of that data.

### 2. Automatic first

Verification pipelines run automatic tiers before ever involving a person.
The large majority of the claims this product cares about — competition
placements, publications, certifications, open-source work — are matchable
against public sources or OAuth-connected accounts with no human in the loop.
Human attestation is reserved primarily for employment history, which has no
public registry.

### 3. Human attestation is on demand, not upfront

Attestation requests are **not** sent when a profile is created. They are
triggered when a claim becomes decision-relevant — typically when a hiring
manager engages with the candidate.

This does two things: it collapses request volume from "every claim by every
user" to "claims on candidates actually in play", and it gives the request
context ("this person is being considered for a role"), which materially
improves response rates over a cold request.

### 4. Attestation capacity comes from aligned parties

- **Partner agencies** are the primary human-verification channel. They earn
  referral revenue, so unlike employers they are economically motivated to
  validate their candidates. This is the partner layer in `VISION.md`,
  serving double duty.
- **Employer domain email round-trip** verifies employment without requiring
  any employer action: control of an `@company` address is evidence of
  affiliation. Weaker than a named attestation, and recorded as such.
- **Named manager confirmation** is a one-click flow, used on demand.

### 5. Unverified claims are displayed, honestly

Self-declared claims are shown, clearly labelled, never silently promoted.
A profile surfaces its composition ("3 registry-verified, 1 self-declared")
rather than a single badge. Honest labelling is more defensible than
implying blanket verification, and it makes the verified tiers mean
something.

### 6. Deterrence over prevention

We do not attempt to make fraudulent claims impossible. We make them
unattractive:

- Cross-source consistency checks (claimed employment dates against
  connected-account activity) flag anomalies for review.
- Every claim is permanently attributed to its evidence tier.
- Hiring managers can report claims; substantiated false claims terminate
  the account.

## Consequences

- The UI must render four tiers everywhere a claim appears; a single
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
- Whether agencies attest at the claim level or vouch for a whole profile.
- Whether a minimum verification threshold is required before a profile is
  searchable.
