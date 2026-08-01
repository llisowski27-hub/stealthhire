# StealthHire — Engineering Guidelines

These guidelines are binding for all contributors, human or AI-assisted.
They define how software is designed, implemented, reviewed, and shipped in
this repository. If a task cannot be completed within these rules, stop and
raise the conflict instead of writing code.

## 1. Development Lifecycle

Before writing any code:

1. Read the current task and restate it in your own words.
2. Read all dependencies the change touches.
3. Understand the existing architecture.
4. Write down an implementation plan.
5. Identify risks (technical, operational, data).
6. Identify security implications (see [`SECURITY.md`](./SECURITY.md)).
7. Validate all assumptions before implementation begins.

During implementation:

- **No vibe-coding.** Never generate large amounts of code at once.
- Implement one small, reviewable task at a time.
- If a task is too large, split it into smaller tasks *before* writing code.
- If an implementation would violate the existing architecture, stop and
  explain why instead of generating code.
- Perform an internal review after every completed task.

## 2. Definition of Done

Every implementation must include:

- Clean architecture and separation of concerns
- Readable code following SOLID principles
- Dependency injection where appropriate
- Type safety end to end
- Input validation and error handling
- Structured logging (no sensitive data in logs)
- Monitoring hooks
- Unit-testable design with accompanying tests
- Production-ready folder structure

Before finishing any task, complete all five reviews:

1. **Code Review** — correctness, readability, idiom
2. **Security Review** — against the checklist in [`SECURITY.md`](./SECURITY.md)
3. **Performance Review** — complexity, N+1s, payload sizes, indexes
4. **Architecture Review** — boundaries, coupling, layering
5. **Refactoring Review** — dead code, duplication, naming

Every completed task ships with a written summary covering: files changed,
reasoning, potential improvements, technical debt introduced, and future
considerations.

Never skip security validation. Never skip testing considerations. Never
sacrifice maintainability for speed.

## 3. API Endpoints

Every API endpoint must include:

- Request validation (schema-level, reject-by-default)
- Typed request and typed response models
- Structured error responses (no stack traces or internals leaked)
- Authorization checks (deny by default; least privilege)
- Structured logging with correlation IDs
- Rate limiting appropriate to the endpoint's sensitivity
- Tests: happy path, validation failures, authz failures

## 4. Database Changes

Every database change must include:

- A migration with a documented rollback strategy
- Constraints (NOT NULL, FK, CHECK, UNIQUE) enforcing data integrity
- Indexes justified by query patterns
- Transactions where multi-statement consistency is required
- Consideration of race conditions and idempotency for concurrent writers

## 5. Frontend Pages

Every frontend page must include:

- Loading, error, and empty states
- Optimistic updates where appropriate
- Accessibility (semantic HTML, ARIA where needed, contrast)
- Responsive layout
- Full keyboard navigation
- Performance considerations (bundle size, lazy loading, memoization)
- Output sanitization — never render untrusted data as HTML

## 6. Testing

- Unit tests accompany the code they test in the same change.
- Tests cover behavior, not implementation details.
- Security-relevant paths (authn, authz, validation) require explicit
  negative-case tests.
- A change with failing tests is not done; report failures honestly.

## 7. Dependencies & Supply Chain

- Prefer the standard library and existing dependencies over new ones.
- New dependencies require justification: maintenance status, license,
  transitive weight, and known vulnerabilities.
- Lockfiles are committed; versions are pinned.
- Dependency vulnerability scanning is part of CI, not optional.

## 8. Git & Review Hygiene

- Small, focused commits with descriptive messages.
- No secrets, tokens, or credentials in any commit, ever — including in
  documentation, examples, and test fixtures. Use placeholders like
  `<GITHUB_TOKEN>`.
- Every change lands via a reviewed pull request; no direct pushes to main.
