/**
 * Client-side identifiers for list items that have no server identity yet.
 *
 * These are React keys and DOM `id` fragments only — never security tokens,
 * and never a substitute for a server-assigned primary key.
 */

let fallbackCounter = 0;

/**
 * Prefers `crypto.randomUUID`, which needs a secure context. Falls back to a
 * counter so the function stays total in plain-HTTP dev and in test
 * environments that do not implement it; uniqueness within one document is
 * all a React key requires.
 */
export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  fallbackCounter += 1;
  return `id-${fallbackCounter}`;
}
