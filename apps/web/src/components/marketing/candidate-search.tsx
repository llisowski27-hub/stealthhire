import { cn } from "@/lib/cn";
import { EARLY_CAREER_ARCHETYPE } from "./candidate-archetypes";
import { HiddenIdentity } from "./hidden-identity";

type Facet = {
  label: string;
  /** The option shown as chosen. Always the first entry, so the two stay in
      step if the list is reordered. */
  options: readonly [string, ...string[]];
};

/**
 * The screen a hiring desk would use. Granularity is the entire point: a
 * generic job board filters on "investment banking", which returns everyone,
 * while a desk hires for one seat and knows exactly which one. Naming the
 * team, the side of the table and the model the candidate actually built is
 * what tells a reader this was built by people who have sat on a desk.
 */
const FACETS: readonly Facet[] = [
  {
    label: "Desk",
    options: ["M&A", "Restructuring", "Leveraged finance", "Systematic trading"],
  },
  { label: "Side", options: ["Sell-side", "Buy-side"] },
  { label: "Sector", options: ["Industrials", "TMT", "Healthcare", "FIG"] },
  {
    label: "Artefact",
    options: ["Three-statement model", "LBO", "Merger model"],
  },
  { label: "Location", options: ["Frankfurt", "London", "Paris"] },
];

const MATCH = EARLY_CAREER_ARCHETYPE;
const MATCH_ROLE = MATCH.credentials.find((c) => c.kind === "experience");

/**
 * Illustration of the hiring-desk view: the filters a desk would screen on,
 * and one profile beneath them.
 *
 * Static by design — no state, no input, nothing that invites a click and
 * then does nothing. It shows what the product is for rather than pretending
 * to be the product, which is why the chips are rendered as spans and not as
 * controls: a disabled-looking button a visitor cannot press is worse than a
 * picture of one.
 *
 * The profile shown is the same archetype used elsewhere on the page, so the
 * filters and the record it sits under cannot drift apart.
 */
export function CandidateSearch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        // min-w-0: grid and flex items default to min-width:auto and would
        // otherwise be sized by the widest chip row.
        "min-w-0 rounded-xl border border-edge bg-surface-1/80",
        "shadow-raised backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <span className="font-mono text-xs text-muted">candidate search</span>
        <span className="font-mono text-[0.6875rem] text-muted">
          {FACETS.length} filters
        </span>
      </div>

      <dl className="flex flex-col gap-4 p-5">
        {FACETS.map((facet) => {
          const [selected, ...rest] = facet.options;
          return (
            <div key={facet.label}>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted/70">
                {facet.label}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                  {selected}
                </span>
                {rest.map((option) => (
                  <span
                    key={option}
                    className="rounded-md border border-edge bg-surface-2/60 px-2 py-1 text-xs text-muted"
                  >
                    {option}
                  </span>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="border-t border-edge p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted/70">
            Match
          </span>
          <span className="font-mono text-[0.6875rem] text-muted">
            identity hidden
          </span>
        </div>

        <div className="mt-3 flex items-start gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-3">
          <HiddenIdentity className="size-9 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted">{MATCH.role}</p>
            {MATCH_ROLE && (
              <>
                {/* Wrapped, not truncated. At 390px the firm and the role do
                    not fit on one line, and truncating drops the role — which
                    is the half a desk is screening on. */}
                <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
                  {MATCH_ROLE.headline}
                </p>
                {MATCH_ROLE.artefacts && (
                  <p className="mt-1.5 line-clamp-4 font-mono text-[0.6875rem] leading-relaxed text-muted/75">
                    {MATCH_ROLE.artefacts.join(" · ")}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-xs text-muted">
            no recruiter in between
          </span>
          <span className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
            Message directly
          </span>
        </div>
      </div>
    </div>
  );
}
