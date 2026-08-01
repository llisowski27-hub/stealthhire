import { cn } from "@/lib/cn";

type ComparisonRow = {
  dimension: string;
  traditional: string;
  stealthhire: string;
};

const ROWS: readonly ComparisonRow[] = [
  {
    dimension: "Sourcing",
    traditional: "Cold outreach based on job titles and keyword matches",
    stealthhire: "Search over verified performance data and demonstrated skill",
  },
  {
    dimension: "Evaluation",
    traditional: "Keyword-optimized CVs, screened in seconds by non-experts",
    stealthhire:
      "Olympiads, hackathons, publications, shipped work — with proof attached",
  },
  {
    dimension: "Communication",
    traditional: "Every message relayed through recruiter handoff chains",
    stealthhire: "Hiring managers and candidates talk directly, from day one",
  },
  {
    dimension: "Cost",
    traditional: "15–30% of first-year salary per placement",
    stealthhire: "Platform access — no percentage-of-salary fees",
  },
  {
    dimension: "Incentives",
    traditional: "Paid on placement speed, not on long-term fit",
    stealthhire: "Nothing to gain from a bad match — the data decides",
  },
];

/** Side-by-side argument: traditional headhunting vs StealthHire. */
export function Comparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-32 pb-4 pr-4 font-mono text-xs text-muted">
              &nbsp;
            </th>
            <th scope="col" className="pb-4 pr-4 font-medium text-muted">
              Traditional headhunting
            </th>
            <th scope="col" className="pb-4 font-medium text-accent">
              StealthHire
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr key={row.dimension}>
              <th
                scope="row"
                className={cn(
                  "border-t border-edge py-4 pr-4 align-top font-mono text-xs",
                  "font-normal text-muted",
                  index === ROWS.length - 1 && "border-b",
                )}
              >
                {row.dimension}
              </th>
              <td
                className={cn(
                  "border-t border-edge py-4 pr-4 align-top text-muted",
                  index === ROWS.length - 1 && "border-b",
                )}
              >
                {row.traditional}
              </td>
              <td
                className={cn(
                  "border-t border-edge py-4 align-top text-foreground",
                  index === ROWS.length - 1 && "border-b",
                )}
              >
                {row.stealthhire}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
