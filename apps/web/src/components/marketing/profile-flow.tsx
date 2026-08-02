import { cn } from "@/lib/cn";

type FlowStep = {
  label: string;
  detail: string;
};

const SOURCES: readonly FlowStep[] = [
  {
    label: "LinkedIn",
    detail:
      "Where you have been. Necessary — and the part every other candidate has too.",
  },
  {
    label: "Your CV",
    detail:
      "Written to survive a filter, so it buries your best work in the middle of a page. We lead with it instead.",
  },
  {
    label: "The work behind the job title",
    detail:
      "Two people share a title and did entirely different work. This is the half that separates them: what you touched, and what moved because you were on it.",
  },
  {
    label: "Credentials and competitions",
    detail:
      "A line at the bottom of a page is worth nothing. Weighted properly, what it cost you to earn becomes a reason someone opens your profile first.",
  },
];

const OUTCOME: FlowStep = {
  label: "Built for the person searching",
  detail:
    "Recruiters read the work, not the layout — minutes instead of days, and a shorter list worth calling. You get found for the role you want rather than the one your last title implies.",
};

/**
 * Vertical flow from source material to a profile a recruiter can act on.
 * Rows reveal top to bottom as the block scrolls into view — see
 * `.reveal-in` in globals.css, which is scroll-driven, needs no client
 * JavaScript, and degrades to static content where unsupported or when the
 * visitor prefers reduced motion.
 */
export function ProfileFlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-2 bottom-16 w-px bg-edge"
      />

      <ol className="flex flex-col gap-7">
        {SOURCES.map((source) => (
          <li key={source.label} className="reveal-in relative pl-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 size-[7px] rounded-full bg-muted"
            />
            <p className="text-sm font-medium text-foreground">
              {source.label}
            </p>
            <p className="mt-1 max-w-prose text-sm text-muted">
              {source.detail}
            </p>
          </li>
        ))}
      </ol>

      <div className="reveal-in relative mt-7 pl-8">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1.5 size-[7px] rounded-full bg-accent ring-4 ring-accent/15"
        />
        <p className="text-sm font-medium text-accent">{OUTCOME.label}</p>
        <p className="mt-1 max-w-prose text-sm text-muted">{OUTCOME.detail}</p>
      </div>
    </div>
  );
}
