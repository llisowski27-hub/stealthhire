import { cn } from "@/lib/cn";

type FlowStep = {
  label: string;
  detail: string;
};

const SOURCES: readonly FlowStep[] = [
  { label: "LinkedIn", detail: "Where you have been" },
  { label: "Your CV", detail: "Your best work, moved to the top" },
  {
    label: "The work behind the title",
    detail: "What you did, not what you were called",
  },
  {
    label: "Credentials and competitions",
    detail: "A reason to call, not a footnote",
  },
];

const OUTCOME: FlowStep = {
  label: "Built for the person searching",
  detail: "Found in minutes, for the role you actually want",
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
