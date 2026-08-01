import { cn } from "@/lib/cn";

const SIGNAL_CHIPS = [
  "Olympiads",
  "Hackathons",
  "Publications",
  "Open source",
  "Certifications",
  "Competitions",
  "Shipped products",
  "Patents",
] as const;

const SOURCES = [
  "LinkedIn career history",
  "GitHub repositories",
  "Certification bodies",
  "Employer verification",
  "Partner agencies",
] as const;

function Cell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-edge bg-surface-1 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Value propositions as a varied bento grid rather than uniform cards. */
export function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Cell className="md:col-span-2">
        <h3 className="text-lg font-medium">
          Everything a CV throws away
        </h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Keyword filters are tuned for job titles, so the strongest evidence
          of ability never reaches a human. We index it as first-class data.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SIGNAL_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-edge bg-surface-2 px-3 py-1.5 text-xs text-foreground"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Cell>

      <Cell className="justify-between">
        <div>
          <h3 className="text-lg font-medium">No placement fees</h3>
          <p className="mt-2 text-sm text-muted">
            Nothing taken from the salary you negotiated.
          </p>
        </div>
        <p
          className="text-display mt-8 text-6xl font-semibold text-accent"
          aria-label="Zero percent of salary"
        >
          0%
        </p>
      </Cell>

      <Cell>
        <h3 className="text-lg font-medium">One conversation</h3>
        <p className="mt-2 text-sm text-muted">
          The hiring manager writes to the candidate. That&apos;s the whole
          chain — no handoffs, no summaries of summaries.
        </p>
      </Cell>

      <Cell className="md:col-span-2">
        <h3 className="text-lg font-medium">
          A profile assembled from trusted sources
        </h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Claims are traceable to whoever attested them, so &quot;verified&quot;
          means something specific.
        </p>
        <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {SOURCES.map((source) => (
            <li
              key={source}
              className="flex items-center gap-2.5 text-sm text-muted"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {source}
            </li>
          ))}
        </ul>
      </Cell>
    </div>
  );
}
