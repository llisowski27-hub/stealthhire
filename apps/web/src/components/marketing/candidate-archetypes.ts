/**
 * Illustrative candidate profiles for marketing surfaces. Identities are
 * never rendered.
 *
 * Both archetypes are finance, because the product is positioned on a
 * finance vertical first. They differ by career stage, not by industry —
 * the page argues one thing, and two profiles from two industries would
 * argue two.
 *
 * `mark` is a placeholder monogram, not an institution's logo — see
 * institution-mark.tsx. Swapping in real brand assets requires permission
 * from each rights holder.
 *
 * Naming rules, which bind every entry below:
 *
 * 1. Every credential names a real institution. An anonymous "boutique" or
 *    "student fund" is filler, and an achievement nobody can place is not
 *    evidence.
 * 2. No entry attaches a specific mandate, size or outcome to a named firm.
 *    These profiles belong to no one, so an invented transaction would
 *    assert something false about that firm's record on a commercial page.
 *    State the workstream the candidate owned — that is both the
 *    differentiating detail and a claim about the person, not the firm.
 */

export type Credential = {
  /** Monogram shown when no logo asset is set. */
  mark: string;
  /**
   * Optional brand asset under `public/logos` — see the README there for
   * how to source one and when it is appropriate to show it.
   */
  logoSrc?: string;
  /** Institution name; used as the logo's accessible label. */
  name?: string;
  headline: string;
  detail: string;
};

export type CandidateArchetype = {
  /** Shown under the withheld name. */
  role: string;
  credentials: readonly Credential[];
};

/**
 * Early career, outside the target-school list. This is the profile the
 * product exists for, so it leads the page: real transaction exposure that
 * a CV screen sorted on university would never reach.
 *
 * No degree appears. The surrounding copy argues that the CV header is the
 * least informative field, and leading with one would undercut that in the
 * same viewport. Screening practice is an industry problem, not an
 * attribute of the person, so nothing here labels the candidate.
 */
export const EARLY_CAREER_ARCHETYPE: CandidateArchetype = {
  role: "Off-cycle M&A analyst · Frankfurt",
  credentials: [
    {
      mark: "AL",
      name: "Alantra",
      headline: "Alantra · Off-cycle Analyst, M&A",
      detail:
        "Sell-side execution — owned the operating model, vendor due diligence and IM drafting",
    },
    {
      mark: "CFA",
      name: "CFA Institute",
      headline: "CFA Institute",
      detail: "Level I passed at the first attempt",
    },
    {
      mark: "FMWC",
      name: "Financial Modeling World Cup",
      headline: "Financial Modeling World Cup",
      detail: "Top 100 globally",
    },
  ],
};

/**
 * Mid career, where the job title undersells the work. The second failure
 * the product addresses: "Analyst" is what a search returns on, and it says
 * nothing about which desk, which side of the table, or what this person
 * actually ran.
 */
export const EXPERIENCED_ARCHETYPE: CandidateArchetype = {
  role: "Restructuring analyst · London",
  credentials: [
    {
      mark: "R&Co",
      name: "Rothschild & Co",
      headline: "Rothschild & Co · Analyst, Restructuring",
      detail:
        "Debtor-side advisory — liquidity modelling, covenant analysis and lender presentations",
    },
    {
      mark: "ACA",
      name: "ICAEW",
      headline: "ICAEW · ACA qualified",
      detail: "First-time passes across all levels",
    },
    {
      mark: "CFA",
      name: "CFA Institute",
      headline: "CFA Institute · Charterholder",
      detail: "All three levels",
    },
  ],
};
