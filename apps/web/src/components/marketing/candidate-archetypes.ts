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
 * Every entry names a real institution. An anonymous "M&A boutique" or
 * "student investment fund" reads as filler, and an achievement nobody can
 * place is not evidence of anything.
 *
 * What each entry adds beyond a LinkedIn headline is the workstream the
 * candidate personally owned — the other network shows a title and a date
 * range, which is not what a desk screens on.
 *
 * Deliberately absent: a specific transaction size or status. This profile
 * is illustrative and belongs to no one, so attaching an invented mandate
 * to a named advisory firm would assert something false about that firm's
 * deal record on a commercial page. Ownership of a workstream is the
 * differentiating detail and carries no such claim.
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
