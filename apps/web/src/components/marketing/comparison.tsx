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
    <div className="overflow-x-auto rounded-xl border border-edge bg-surface-1">
      <table className="w-full min-w-3xl border-collapse text-left text-sm">
        <caption className="sr-only">
          Traditional headhunting compared with StealthHire
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-40 px-6 py-5">
              <span className="sr-only">Dimension</span>
            </th>
            <th
              scope="col"
              className="px-6 py-5 font-medium text-muted"
            >
              Traditional headhunting
            </th>
            <th
              scope="col"
              className="border-x border-edge bg-accent/[0.06] px-6 py-5 font-medium text-accent"
            >
              StealthHire
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.dimension} className="border-t border-edge">
              <th
                scope="row"
                className="px-6 py-5 align-top font-mono text-xs font-normal text-muted"
              >
                {row.dimension}
              </th>
              <td className="px-6 py-5 align-top text-muted">
                {row.traditional}
              </td>
              <td
                className={cn(
                  "border-x border-edge bg-accent/[0.06] px-6 py-5",
                  "align-top text-foreground",
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
