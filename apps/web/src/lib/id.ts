/**
 * Client-side identifiers for list items that have no server identity yet.
 *
 * These are React keys and DOM `id` fragments only — never security tokens,
 * and never a substitute for a server-assigned primary key.
 */

let fallbackCounter = 0;

/**
 * Namespace for the counter fallback, drawn once per document load.
 *
 * A bare counter would not be enough. Ids are persisted in the draft, but the
 * counter resets on reload — so a restored `id-1` would collide with the next
 * newly created row. The prefix makes each page load its own id space.
 */
const fallbackNamespace = Math.random().toString(36).slice(2, 10);

/**
 * Prefers `crypto.randomUUID`, which requires a secure context and so is
 * absent over plain HTTP (testing on a LAN address) and in some test
 * environments. The fallback keeps the function total there.
 */
export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  fallbackCounter += 1;
  return `id-${fallbackNamespace}-${fallbackCounter}`;
}
