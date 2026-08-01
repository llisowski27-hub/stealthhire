import { cn } from "@/lib/cn";

type ComparisonRow = {
  dimension: string;
  traditional: string;
  stealthhire: string;
};

const ROWS: readonly ComparisonRow[] = [
  {
    dimension: "First contact",
    traditional:
      "Days of relay — sourcer to recruiter to candidate and back again",
    stealthhire: "Immediate. The hiring manager writes to the candidate",
  },
  {
    dimension: "Steps between",
    traditional: "Three or four people carrying the conversation",
    stealthhire: "None",
  },
  {
    dimension: "Context",
    traditional: "A second-hand summary of the role, and of the candidate",
    stealthhire: "Both sides explain themselves, in their own words",
  },
  {
    dimension: "Candidate data",
    traditional: "A CV, reformatted for whichever filter is running",
    stealthhire:
      "Career history plus verified results, pulled from source and kept current",
  },
  {
    dimension: "Screening",
    traditional: "Repeated from scratch at each stage",
    stealthhire: "Already done — claims arrive verified",
  },
  {
    dimension: "Cost",
    traditional: "15–30% of first-year salary per placement",
    stealthhire: "Platform access — no percentage-of-salary fees",
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
