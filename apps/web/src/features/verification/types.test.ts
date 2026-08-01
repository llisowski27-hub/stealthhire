import { describe, expect, it } from "vitest";
import {
  VERIFICATION_TIERS,
  VERIFICATION_TIER_META,
  byEvidenceStrength,
  isConfirmed,
  summarize,
} from "./types";

describe("verification tiers", () => {
  it("defines metadata for every tier", () => {
    for (const tier of VERIFICATION_TIERS) {
      const meta = VERIFICATION_TIER_META[tier];
      expect(meta.label).toBeTruthy();
      expect(meta.description).toBeTruthy();
    }
  });

  it("treats only self-declared claims as unconfirmed", () => {
    expect(isConfirmed("registry")).toBe(true);
    expect(isConfirmed("attested")).toBe(true);
    expect(isConfirmed("sourced")).toBe(true);
    expect(isConfirmed("self_declared")).toBe(false);
  });

  it("ranks public record above attestation, and both above self-declared", () => {
    const sorted = ["self_declared", "sourced", "registry", "attested"]
      .slice()
      .sort(byEvidenceStrength as never);
    expect(sorted).toEqual([
      "registry",
      "attested",
      "sourced",
      "self_declared",
    ]);
  });

  it("marks the zero-effort tiers as automatic", () => {
    expect(VERIFICATION_TIER_META.registry.automatic).toBe(true);
    expect(VERIFICATION_TIER_META.sourced.automatic).toBe(true);
    expect(VERIFICATION_TIER_META.attested.automatic).toBe(false);
  });
});

describe("summarize", () => {
  it("counts an empty profile without confirming anything", () => {
    expect(summarize([])).toEqual({
      total: 0,
      confirmed: 0,
      byTier: { registry: 0, attested: 0, sourced: 0, self_declared: 0 },
    });
  });

  it("reports composition rather than a single verified flag", () => {
    const summary = summarize([
      "registry",
      "attested",
      "sourced",
      "self_declared",
      "self_declared",
    ]);
    expect(summary.total).toBe(5);
    expect(summary.confirmed).toBe(3);
    expect(summary.byTier.self_declared).toBe(2);
  });
});
