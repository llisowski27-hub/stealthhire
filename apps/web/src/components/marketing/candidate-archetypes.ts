/**
 * Illustrative candidate profiles for marketing surfaces. Identities are
 * never rendered.
 *
 * `mark` is a placeholder monogram, not an institution's logo — see
 * institution-mark.tsx. Swapping in real brand assets requires permission
 * from each rights holder.
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

/** The credentialed path: every box ticked, in order. */
export const CREDENTIALED_ARCHETYPE: CandidateArchetype = {
  role: "Quantitative developer · London",
  credentials: [
    {
      mark: "JPM",
      name: "J.P. Morgan",
      headline: "Quantitative Software Developer",
      detail: "J.P. Morgan · 4 yrs · derivatives pricing",
    },
    {
      mark: "OX",
      name: "University of Oxford",
      headline: "University of Oxford",
      detail: "MSc Computer Science — Distinction",
    },
    {
      mark: "GH",
      headline: "monte-carlo-engine",
      detail: "3.1k stars · GPU path simulation",
    },
    {
      mark: "IOI",
      name: "International Olympiad in Informatics",
      headline: "International Olympiad in Informatics",
      detail: "Silver medal · 2nd place",
    },
  ],
};

/** The unconventional path: no credentials, results that are hard to argue with. */
export const SELF_TAUGHT_ARCHETYPE: CandidateArchetype = {
  role: "ML systems engineer · remote",
  credentials: [
    {
      mark: "◆",
      headline: "Founding engineer · infrastructure startup",
      detail: "Two-person team · acquired 2023",
    },
    {
      mark: "GH",
      headline: "tensor-compile",
      detail: "18k stars · 40M downloads a month",
    },
    {
      mark: "K",
      headline: "Kaggle Grandmaster",
      detail: "Top 30 worldwide · 4 gold medals",
    },
    {
      mark: "—",
      headline: "No degree",
      detail: "Left university after first year",
    },
  ],
};
