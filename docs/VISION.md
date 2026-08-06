# StealthHire — Product Vision

StealthHire is a talent intelligence platform. Hiring managers search
candidates by what they have actually done and message them directly. There
is no recruiter chain in between.

## 1. The problem

Two separate failures, both expensive.

**The chain is slow.** A hiring manager's brief passes through an internal
recruiter, an agency, and a candidate's contact before a conversation
happens. Days of relay, three or four people, and 15–30% of first-year
salary in fees.

**The screen is blunt.** CV screening sorts on university and keywords.
Someone who ran two live sell-side processes at a boutique is filtered out
before a human reads the page, because their university is not on a list.

## 2. Who this is for

The initial market is **finance — investment banking, private equity and
adjacent roles.** The overlooked candidate is a student or junior with real
transaction exposure, a student-fund track record, or competition and
certification results, from outside the target-school list.

This focus determines the language, the profile fields, and the examples on
every surface. It is a starting market, not a permanent ceiling.

**Why a vertical and not a broad platform.** Liquidity in a search
marketplace is per-vertical: two hundred candidates spread across ten
industries is a database nobody can hire from, while two hundred in
investment banking is a product. The target-school problem is also acutely a
finance problem — few industries maintain a literal list — and the
vocabulary is a credibility test. A page that says "sell-side" and
"off-cycle" signals insider knowledge; a generic one reads as outsiders
building a recruiting app.

**Marketing surfaces address the candidate, not the employer.** Candidates
are the supply, and the supply side has to exist before search can be sold
to anyone. Every call to action on the site is a candidate action, so the
copy is written in the candidate's voice throughout. The employer's argument
still appears — it is the reason building a profile pays off — but as
support, never as a second pitch competing for the same attention. A visitor
who cannot tell within seconds whether they are hiring or being hired leaves.

## 3. What we do

**A profile built from what the candidate already has.** LinkedIn career
history, a CV parsed into structured fields, linked repositories and
credentials. The work behind the title, and impact at the top rather than
buried at the bottom.

**Structured so it can be searched.** The value is not that the profile is
prettier; it is that the fields a hiring manager screens on exist as data.

**Direct contact, on the candidate's terms.** The candidate sets their
conditions — compensation, desk, location. A message only reaches them if it
meets those conditions. Their employer never sees the signal.

## 4. What we deliberately do not do

**No verification.** Nothing on a profile is checked, nothing is badged, and
**no surface may imply that it is** — no "verified" marks, no trust scores,
no wording suggesting third-party confirmation. See
[`adr/0002-verification-model.md`](./adr/0002-verification-model.md).

**No capability we do not have.** Marketing surfaces show what runs today.
Deferred features live in [`ROADMAP.md`](./ROADMAP.md) and stay off the site
until they are built.

## 5. Layers

**Candidate** — builds one profile, controls what is exposed and under what
conditions, talks to hiring managers directly.

**Hiring manager** — searches on demonstrated work, sees the evidence behind
a match, contacts the candidate without an intermediary.

A partner/agency layer has been discussed and is not part of the product.
It is recorded in [`ROADMAP.md`](./ROADMAP.md).

## 6. Compliance is a product requirement

StealthHire aggregates personal data about individuals. Every feature that
touches candidate data must be designed with:

- **Lawful basis for processing** (GDPR/CCPA), especially for data imported
  from LinkedIn, GitHub or other third-party sources.
- **Candidate consent and transparency** — candidates can see, correct,
  export and delete their profile.
- **Data minimization** — collect only what serves the search.
- **Third-party terms of service** — integrations respect the source
  platform's API terms. No unauthorized scraping.
- **Honest presentation** — an unverified claim is never displayed as
  anything other than the candidate's own assertion.

See [`ENGINEERING_GUIDELINES.md`](./ENGINEERING_GUIDELINES.md) and
[`SECURITY.md`](./SECURITY.md).
