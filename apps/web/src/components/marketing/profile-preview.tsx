import { cn } from "@/lib/cn";
import { VerificationBadge } from "@/features/verification/verification-badge";
import { summarize, type VerificationTier } from "@/features/verification/types";

type ProofEntry = {
  label: string;
  detail: string;
  tier: VerificationTier;
};

/**
 * Illustrative profile used to show the product surface, not a real person.
 * Deliberately mixes evidence tiers — including one self-declared claim —
 * because that is how real profiles look under ADR 0002.
 */
const PROOF_ENTRIES: readonly ProofEntry[] = [
  {
    label: "IOI — Silver Medal",
    detail: "Int. Olympiad in Informatics, 2021",
    tier: "registry",
  },
  {
    label: "Senior Engineer · Payments",
    detail: "4 yrs — scaled ledger to 12k tx/s",
    tier: "attested",
  },
  {
    label: "distributed-cache",
    detail: "4.2k stars · 38 contributors",
    tier: "sourced",
  },
  {
    label: "Internal platform rewrite",
    detail: "Cut deploy time by 60%",
    tier: "self_declared",
  },
];

/**
 * Static preview of a candidate profile. Purely presentational — it shows
 * what graded verification looks like as a product surface.
 */
export function ProfilePreview({ className }: { className?: string }) {
  const summary = summarize(PROOF_ENTRIES.map((entry) => entry.tier));

  return (
    <div
      className={cn(
        "rounded-xl border border-edge bg-surface-1/80 shadow-raised",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-edge px-5 py-3">
        <span className="font-mono text-xs text-muted">candidate profile</span>
        <span className="ml-auto font-mono text-[0.6875rem] text-muted">
          {summary.confirmed} of {summary.total} confirmed
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
              className="flex items-center gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <dt className="truncate text-sm font-medium text-foreground">
                  {entry.label}
                </dt>
                <dd className="truncate text-xs text-muted">{entry.detail}</dd>
              </div>
              <VerificationBadge tier={entry.tier} className="hidden sm:flex" />
              <VerificationBadge tier={entry.tier} iconOnly className="sm:hidden" />
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
