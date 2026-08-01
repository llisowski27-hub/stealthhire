# StealthHire — Security Baseline

This is the security checklist referenced by
[`ENGINEERING_GUIDELINES.md`](./ENGINEERING_GUIDELINES.md). Every change is
reviewed against the applicable sections before it ships. StealthHire handles
personal data about candidates; the bar is correspondingly high.

## 1. Authentication & Session

- Strong authentication for all non-public surfaces; MFA-capable design.
- Passwords hashed with a modern memory-hard algorithm (argon2id or bcrypt
  with adequate cost). Never store or log plaintext credentials.
- Secure session handling: server-side revocation, rotation on privilege
  change, absolute and idle timeouts.
- Cookies: `Secure`, `HttpOnly`, `SameSite` set appropriately.
- Protect against replay attacks (nonces/expiry on signed requests).

## 2. Authorization

- Deny by default; least privilege everywhere.
- Explicit permission boundaries between the Candidate, Employer, and
  Partner (agency) layers — an employer must never read data a candidate has
  not exposed; an agency must never impersonate an employer.
- Object-level authorization checks on every access (no IDOR).
- Audit logs for privileged and cross-tenant actions.

## 3. Input & Output

- Validate all input at the boundary with typed schemas; reject by default.
- Parameterized queries only — no string-built SQL (SQL injection).
- Sanitize/encode all output rendered to users (XSS).
- CSRF protection on all state-changing browser endpoints.
- File uploads: allowlisted types, size limits, content-type verification,
  stored outside the web root, never executed.

## 4. Server-Side Request Risks

- SSRF: any feature that fetches user-supplied URLs (profile imports,
  webhooks, data-source integrations) must use an allowlist and block
  internal address ranges.
- RCE: no dynamic evaluation of untrusted input; deserialize only from
  safe formats with strict schemas.

## 5. Transport & Headers

- TLS everywhere; HSTS enabled.
- Content Security Policy configured and enforced.
- Standard security headers: `X-Content-Type-Options`,
  `Referrer-Policy`, frame-ancestors restrictions.
- CORS: explicit origin allowlist; never `*` with credentials.

## 6. Secrets & Configuration

- Secrets live in a secret manager or environment variables — never in
  source, config files, documentation, or chat/issue history.
- Any secret that is ever exposed (committed, pasted, logged) is treated as
  compromised and rotated immediately.
- Separate credentials per environment; least-privilege scopes on all
  tokens and service accounts.

## 7. Data Protection

- Encryption at rest for personal data; encryption in transit always.
- Data minimization: collect and retain only what the product requires.
- Sensitive fields (contact details, verification evidence) access-logged.
- No sensitive data in application logs, error messages, or analytics.
- Candidate rights: export, correction, and deletion paths are product
  requirements (see [`VISION.md`](./VISION.md), §3).

## 8. Abuse & Availability

- Rate limiting on authentication, search, messaging, and outreach
  endpoints (StealthHire's direct-outreach model is a spam vector if
  unthrottled).
- Idempotency keys on payment/referral and messaging operations.
- Guard against enumeration of candidate profiles by unauthenticated or
  low-privilege users.

## 9. Supply Chain

- Pinned, lockfile-managed dependencies with vulnerability scanning in CI.
- Review new dependencies for maintenance status and provenance.
- Build artifacts produced from CI only; no locally built deploys.

## Reporting

Security issues in this repository should be reported privately to the
maintainers, not via public issues.
