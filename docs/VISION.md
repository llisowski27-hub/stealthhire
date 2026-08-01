# StealthHire — Product Vision

StealthHire is a next-generation talent intelligence platform that connects
Hiring Managers directly with exceptional professionals through **verified
performance data** instead of traditional recruitment workflows.

Rather than replacing recruiters, the platform removes unnecessary
communication layers and enables companies to identify, evaluate, and contact
top talent with institutional-level precision.

## 1. Core Value Proposition

### Direct Hiring
Hiring Managers connect directly with candidates without relying on multiple
recruiter handoffs.

### Proof over Resume
Candidates are evaluated using verified accomplishments, measurable business
impact, certifications, technical projects, publications, competitions, and
career outcomes — not keyword-optimized CVs.

### Talent Intelligence
Professional profiles are enriched by combining multiple trusted data sources:

- LinkedIn career history
- GitHub repositories
- Certifications
- Publications
- Competition results
- Partner recruitment agencies
- Employer verification
- Additional public professional data

The result is a structured professional identity that is significantly richer
than a traditional résumé.

### Agency-Powered Ecosystem
Recruitment firms contribute verified talent pipelines while employers retain
a direct relationship with candidates.

## 2. Platform Architecture

```
          Hiring Manager
                │
                │
    Verified Professional Profile
                ▲
    Multi-Source Talent Intelligence
                ▲
LinkedIn • GitHub • Agencies • Certifications
Publications • Projects • Public Professional Data
```

### Candidate Layer
- Comprehensive professional profile
- Multi-source data aggregation
- Verified achievements
- Proof-of-skill portfolio
- Direct communication with Hiring Managers

### Employer Layer
- Search using verified competencies
- AI-powered ranking based on demonstrated performance
- Rich candidate intelligence
- Direct outreach to candidates
- No communication bottlenecks

### Partner Layer
Recruitment agencies become verified talent providers by:

- Contributing high-quality candidates
- Validating candidate information
- Expanding talent coverage
- Receiving referral revenue without owning the hiring process

## 3. Product-Level Compliance Notes

StealthHire aggregates personal and professional data about individuals.
Every feature that touches candidate data must be designed with:

- **Lawful basis for processing** (GDPR/CCPA) — especially for data scraped
  or imported from third-party sources such as LinkedIn and GitHub.
- **Candidate consent and transparency** — candidates must be able to see,
  correct, export, and delete their aggregated profile.
- **Data minimization** — collect only what serves verified evaluation.
- **Third-party terms of service** — data-source integrations must respect
  the source platform's API terms; no unauthorized scraping.
- **Verification integrity** — "verified" claims must be auditable back to
  their attesting source (employer, agency, certification body).

These constraints are product requirements, not afterthoughts. See
[`ENGINEERING_GUIDELINES.md`](./ENGINEERING_GUIDELINES.md) and
[`SECURITY.md`](./SECURITY.md).
