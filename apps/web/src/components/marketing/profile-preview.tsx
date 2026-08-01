import { cn } from "@/lib/cn";

type ProofEntry = {
  label: string;
  detail: string;
  source: string;
};

/** Illustrative profile used to show the product surface, not a real person. */
const PROOF_ENTRIES: readonly ProofEntry[] = [
  {
    label: "IOI — Silver Medal",
    detail: "International Olympiad in Informatics, 2021",
    source: "Verified by organiser",
  },
  {
    label: "ETHGlobal — 1st place",
    detail: "Zero-knowledge track, 2024",
    source: "Verified by organiser",
  },
  {
    label: "distributed-cache",
    detail: "4.2k stars · 38 contributors",
    source: "Verified via GitHub",
  },
];

function VerifiedMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 4.5L6.5 12L2.5 8" />
    </svg>
  );
}

/**
 * Static preview of a verified candidate profile. Purely presentational —
 * it shows what "proof over resume" looks like as a product surface.
 */
export function ProfilePreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-edge bg-surface-1/80 shadow-raised",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-edge px-5 py-3">
        <span className="font-mono text-xs text-muted">
          candidate profile
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.6875rem] text-accent">
          <VerifiedMark />
          verified
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-edge bg-surface-3 font-mono text-sm text-muted"
          >
            AK
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">A. Kowalska</p>
            <p className="truncate text-sm text-muted">
              Systems engineer · Distributed storage
            </p>
          </div>
        </div>

        <dl className="flex flex-col gap-2">
          {PROOF_ENTRIES.map((entry) => (
            <div
              key={entry.label}
              className="flex items-start gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-2.5"
            >
              <span className="mt-0.5">
                <VerifiedMark />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="truncate text-sm font-medium text-foreground">
                  {entry.label}
                </dt>
                <dd className="truncate text-xs text-muted">{entry.detail}</dd>
              </div>
              <span className="hidden shrink-0 font-mono text-[0.6875rem] text-muted sm:block">
                {entry.source}
              </span>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between border-t border-edge pt-4">
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
