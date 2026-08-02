import { cn } from "@/lib/cn";

type FlowStep = {
  label: string;
  detail: string;
};

const SOURCES: readonly FlowStep[] = [
  {
    label: "LinkedIn",
    detail: "Roles, dates, education and skills",
  },
  {
    label: "Your CV",
    detail: "Parsed into structured fields, not a stored PDF",
  },
  {
    label: "Transactions and mandates",
    detail: "What you worked on, its size, and your role on it",
  },
  {
    label: "Credentials and competitions",
    detail: "CFA progress, modelling placements, olympiads",
  },
];

/**
 * Vertical flow from source material to a single profile. Rows reveal top
 * to bottom as the block scrolls into view — see `.reveal-in` in
 * globals.css, which is scroll-driven, needs no client JavaScript, and
 * degrades to static content where unsupported or when the visitor
 * prefers reduced motion.
 */
export function ProfileFlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-2 bottom-10 w-px bg-edge"
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
            <p className="mt-1 text-sm text-muted">{source.detail}</p>
          </li>
        ))}
      </ol>

      <div className="reveal-in relative mt-7 pl-8">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1.5 size-[7px] rounded-full bg-accent ring-4 ring-accent/15"
        />
        <p className="text-sm font-medium text-accent">One profile</p>
        <p className="mt-1 text-sm text-muted">
          Structured, searchable, and current — written once rather than
          rewritten for every application.
        </p>
      </div>
    </div>
  );
}
