import { cn } from "@/lib/cn";

type ComparisonRow = {
  dimension: string;
  traditional: string;
  stealthhire: string;
};

const ROWS: readonly ComparisonRow[] = [
  {
    dimension: "First contact",
    traditional: "Days of relay",
    stealthhire: "Immediate, and direct",
  },
  {
    dimension: "Steps between",
    traditional: "Three or four people",
    stealthhire: "None",
  },
  {
    dimension: "What they see",
    traditional: "A CV formatted for a filter",
    stealthhire: "The work, structured and searchable",
  },
  {
    dimension: "Agency fee",
    traditional: "15–30% of first-year salary",
    stealthhire: "Platform access",
  },
];

/**
 * Side-by-side argument: traditional headhunting vs StealthHire.
 *
 * Written from the candidate's side, like the rest of the page. The fee row
 * stays because it is the reason employers have to come here at all — but
 * it is labelled as the agency's fee rather than "cost", which would have
 * been addressed to a buyer this page is not talking to.
 */
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
