/**
 * Illustrative candidate profiles for marketing surfaces. Identities are
 * never rendered.
 *
 * `mark` is a placeholder monogram, not an institution's logo — see
 * institution-mark.tsx. Swapping in real brand assets requires permission
 * from each rights holder.
 */

export type Credential = {
  /** Monogram shown in the logo slot. */
  mark: string;
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
      headline: "Quantitative Software Developer",
      detail: "J.P. Morgan · 4 yrs · derivatives pricing",
    },
    {
      mark: "OX",
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
