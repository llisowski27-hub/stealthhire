/**
 * Illustrative candidate profiles for marketing surfaces. Deliberately
 * unattributed — identities are never rendered, and employers are generic
 * descriptors rather than named firms.
 */

export type Credential = {
  /** Category label shown above the entry. */
  kind: string;
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
      kind: "education",
      headline: "University of Oxford",
      detail: "MSc Computer Science — Distinction",
    },
    {
      kind: "experience",
      headline: "Senior Quantitative Developer",
      detail: "Systematic trading fund · 4 yrs · derivatives pricing",
    },
    {
      kind: "open source",
      headline: "monte-carlo-engine",
      detail: "3.1k stars · GPU path simulation",
    },
    {
      kind: "olympiad",
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
      kind: "education",
      headline: "No degree",
      detail: "Left university after first year",
    },
    {
      kind: "experience",
      headline: "Founding engineer · infrastructure startup",
      detail: "Two-person team · acquired 2023",
    },
    {
      kind: "open source",
      headline: "tensor-compile",
      detail: "18k stars · 40M downloads a month",
    },
    {
      kind: "competition",
      headline: "Kaggle Grandmaster",
      detail: "Top 30 worldwide · 4 gold medals",
    },
  ],
};
