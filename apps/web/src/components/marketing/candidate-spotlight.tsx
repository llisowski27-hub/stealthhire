import { cn } from "@/lib/cn";
import type { CandidateArchetype } from "./candidate-archetypes";
import { InstitutionMark } from "./institution-mark";

/** Blurred stand-in for a person: head and shoulders, no features. */
function HiddenIdentity() {
  return (
    <div
      aria-hidden="true"
      className="relative size-12 shrink-0 overflow-hidden rounded-full border border-edge bg-surface-3"
    >
      <div className="absolute inset-0 blur-[6px]">
        <div className="absolute left-1/2 top-2 size-4 -translate-x-1/2 rounded-full bg-muted/50" />
        <div className="absolute left-1/2 top-7 h-6 w-9 -translate-x-1/2 rounded-t-full bg-muted/50" />
      </div>
    </div>
  );
}

export type CandidateSpotlightProps = {
  profile: CandidateArchetype;
  className?: string;
};

/**
 * Marketing preview of a candidate profile with the identity withheld.
 * Presentational only — credentials are illustrative and belong to no one.
 */
export function CandidateSpotlight({
  profile,
  className,
}: CandidateSpotlightProps) {
  return (
    <div
      className={cn(
        // min-w-0 so the card can shrink inside a grid/flex parent, whose
        // items default to min-width:auto and would otherwise be sized by
        // the widest nowrap descendant.
        "min-w-0 rounded-xl border border-edge bg-surface-1/80",
        "shadow-raised backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <span className="font-mono text-xs text-muted">candidate profile</span>
        <span className="font-mono text-[0.6875rem] text-muted">
          identity hidden
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-4">
          <HiddenIdentity />
          <div className="min-w-0 flex-1">
            <div
              aria-hidden="true"
              className="h-4 w-36 rounded-full bg-muted/25 blur-[3px]"
            />
            <p className="mt-2 truncate text-sm text-muted">{profile.role}</p>
          </div>
        </div>

        <dl className="flex flex-col gap-2">
          {profile.credentials.map((credential) => (
            <div
              key={credential.headline}
              className="flex items-center gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-2.5"
            >
              <InstitutionMark mark={credential.mark} />
              <div className="min-w-0 flex-1">
                <dt className="truncate text-sm font-medium text-foreground">
                  {credential.headline}
                </dt>
                <dd className="truncate text-xs text-muted">
                  {credential.detail}
                </dd>
              </div>
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
