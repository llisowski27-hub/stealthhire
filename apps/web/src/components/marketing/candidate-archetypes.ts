/**
 * Illustrative candidate profiles for marketing surfaces. Identities are
 * never rendered.
 *
 * Every archetype is finance, because the product is positioned on a finance
 * vertical first, and never leaves that vertical. Desks other than advisory
 * are carried by the search panel's facets rather than by further archetypes:
 * the page shows one record, and a second would repeat the point rather than
 * extend it.
 *
 * `mark` is a placeholder monogram, not an institution's logo. Swapping in
 * real brand assets requires permission from each rights holder, and no
 * surface renders them today.
 *
 * Naming rules, which bind every entry below:
 *
 * 1. Every credential names a real institution. An anonymous "boutique" or
 *    "student fund" is filler, and an achievement nobody can place is not
 *    evidence.
 * 2. No entry attaches a specific mandate, size or outcome to a named firm.
 *    These profiles belong to no one, so an invented transaction would
 *    assert something false about that firm's record on a commercial page.
 *    The line runs between describing a desk and describing a deal: side,
 *    sector and the workstream owned are role descriptors and are allowed;
 *    counterparty, enterprise value, status and outcome are a specific
 *    transaction and are not.
 * 3. A credential earns its row by being measurable. A qualification most
 *    of the applicant pool also holds is noise — it fills the card without
 *    separating the candidate from the people they are being compared
 *    against, which is the only job these rows have.
 * 4. Work is named as artefacts, never as verbs. "Owned the operating
 *    model" is a claim about a person on a deal and reads like every other
 *    CV; "Three-statement operating model" is a thing that was built. The
 *    artefact register is also what keeps rule 2 satisfiable at this level
 *    of detail — an artefact belongs to the candidate, so naming it says
 *    nothing about the employer's mandate. Banned verbs: owned, assisted,
 *    supported, involved in.
 */

/**
 * Which field group a row belongs to. The split is the point of the card: a
 * hiring reader has to see named groups to read the profile as a record with
 * fields rather than as a list, and a record with fields is the thing that
 * can later be searched on.
 */
export type CredentialKind = "experience" | "credential";

export type Credential = {
  kind: CredentialKind;
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
  /** One short qualifier: the desk, or the result. Not a sentence. */
  detail: string;
  /**
   * Technical work products, in the noun register — "Three-statement
   * operating model", not "built the model". Present on experience rows,
   * where the artefact is the only thing that distinguishes one analyst
   * from the next; absent on qualifications, which have no work product.
   */
  artefacts?: readonly string[];
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
      kind: "experience",
      mark: "MS",
      name: "Morgan Stanley",
      headline: "Morgan Stanley · Off-cycle Analyst, M&A",
      detail: "Sell-side M&A · industrials",
      artefacts: [
        "Three-statement operating model",
        "Vendor due diligence tracker",
        "Information memorandum",
      ],
    },
    {
      kind: "credential",
      mark: "CFA",
      name: "CFA Institute",
      headline: "CFA Institute Research Challenge",
      detail: "National final",
      artefacts: [
        "Equity research initiation",
        "DCF",
        "Trading comparables",
      ],
    },
    {
      kind: "credential",
      mark: "FMWC",
      name: "Financial Modeling World Cup",
      headline: "Financial Modeling World Cup",
      detail: "Top 100 globally",
      artefacts: ["Timed modelling under exam conditions"],
    },
  ],
};

