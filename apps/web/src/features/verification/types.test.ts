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
    expect(isConfirmed("sourced")).toBe(true);
    expect(isConfirmed("self_declared")).toBe(false);
  });

  it("ranks public record above connected sources, and both above self-declared", () => {
    const sorted = ["self_declared", "sourced", "registry"]
      .slice()
      .sort(byEvidenceStrength as never);
    expect(sorted).toEqual(["registry", "sourced", "self_declared"]);
  });

  it("requires no human effort for any supported tier", () => {
    for (const tier of VERIFICATION_TIERS) {
      expect(VERIFICATION_TIER_META[tier].automatic).toBe(true);
    }
  });
});

describe("summarize", () => {
  it("counts an empty profile without confirming anything", () => {
    expect(summarize([])).toEqual({
      total: 0,
      confirmed: 0,
      byTier: { registry: 0, sourced: 0, self_declared: 0 },
    });
  });

  it("reports composition rather than a single verified flag", () => {
    const summary = summarize([
      "registry",
      "sourced",
      "self_declared",
      "self_declared",
    ]);
    expect(summary.total).toBe(4);
    expect(summary.confirmed).toBe(2);
    expect(summary.byTier.self_declared).toBe(2);
  });
});
