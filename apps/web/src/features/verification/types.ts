/**
 * Graded verification model. See docs/adr/0002-verification-model.md.
 *
 * Verification is per claim, never per profile, and never a boolean: a
 * claim matched against a public results table and a claim confirmed by a
 * named former manager are different kinds of evidence and are displayed
 * differently.
 */

export const VERIFICATION_TIERS = [
  "registry",
  "attested",
  "sourced",
  "self_declared",
] as const;

export type VerificationTier = (typeof VERIFICATION_TIERS)[number];

export type VerificationTierMeta = {
  /** Short label shown on the badge. */
  label: string;
  /** Plain-language explanation, used for tooltips and a11y descriptions. */
  description: string;
  /**
   * How hard the evidence is to fabricate — higher is stronger. Not a
   * measure of how much a hiring manager should care.
   */
  strength: number;
  /** Whether confirming this tier costs a human any effort. */
  automatic: boolean;
};

export const VERIFICATION_TIER_META: Record<
  VerificationTier,
  VerificationTierMeta
> = {
  registry: {
    label: "Registry verified",
    description:
      "Matched against an official public record, such as published competition results, a DOI, or an issuer-verifiable certification.",
    strength: 4,
    automatic: true,
  },
  attested: {
    label: "Attested",
    description:
      "Confirmed by a named third party with standing — an employer, competition organiser, certification body, or partner agency.",
    strength: 3,
    automatic: false,
  },
  sourced: {
    label: "Source connected",
    description:
      "Pulled from an account the candidate proved they own. The platform data is genuine; the interpretation of it is not independently confirmed.",
    strength: 2,
    automatic: true,
  },
  self_declared: {
    label: "Self-declared",
    description: "Stated by the candidate. Nothing has confirmed it yet.",
    strength: 1,
    automatic: true,
  },
};

/** True when the tier represents third-party evidence, not just a claim. */
export function isConfirmed(tier: VerificationTier): boolean {
  return tier !== "self_declared";
}

/** Sorts claims strongest evidence first; ties keep their original order. */
export function byEvidenceStrength(
  a: VerificationTier,
  b: VerificationTier,
): number {
  return (
    VERIFICATION_TIER_META[b].strength - VERIFICATION_TIER_META[a].strength
  );
}

export type VerificationSummary = {
  total: number;
  confirmed: number;
  byTier: Record<VerificationTier, number>;
};

/**
 * Summarises a profile's claims so the UI can state composition
 * ("3 confirmed, 1 self-declared") instead of implying blanket verification.
 */
export function summarize(
  tiers: readonly VerificationTier[],
): VerificationSummary {
  const byTier: Record<VerificationTier, number> = {
    registry: 0,
    attested: 0,
    sourced: 0,
    self_declared: 0,
  };
  for (const tier of tiers) {
    byTier[tier] += 1;
  }
  return {
    total: tiers.length,
    confirmed: tiers.filter(isConfirmed).length,
    byTier,
  };
}
