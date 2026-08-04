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
      logoSrc: "/logos/github.svg",
      name: "GitHub",
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

/**
 * A candidate whose record is strong but whose university does not appear
 * on a bank's target list.
 *
 * Every entry states something a LinkedIn profile cannot: the side, size
 * and status of a mandate, and what this person personally owned on it.
 * A title and a date range are what the other network shows; they are not
 * what a desk screens on.
 *
 * Three entries, and no degree among them — the surrounding copy argues
 * that the CV header is the least informative field, so the card does not
 * lead with one. Screening practice is an industry problem, not an
 * attribute of the person, so nothing here labels the candidate as
 * "non-target".
 */
export const NON_TARGET_ARCHETYPE: CandidateArchetype = {
  role: "Off-cycle M&A analyst · Frankfurt",
  credentials: [
    {
      mark: "◆",
      headline: "Off-cycle Analyst · M&A boutique",
      detail:
        "Sole analyst on a €380m industrials sell-side — built the operating model, ran vendor DD, drafted the IM. Signed.",
    },
    {
      mark: "SIF",
      headline: "Student investment fund · Portfolio Manager",
      detail: "£1.2m AUM · led the credit book · +14% vs benchmark over two years",
    },
    {
      mark: "FMWC",
      headline: "Financial Modeling World Cup",
      detail: "Top 100 globally · CFA Level I passed at the first attempt",
    },
  ],
};
