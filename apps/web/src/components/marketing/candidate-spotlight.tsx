import { cn } from "@/lib/cn";
import type { CandidateArchetype } from "./candidate-archetypes";
import { HiddenIdentity } from "./hidden-identity";
import { InstitutionMark } from "./institution-mark";

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
          <HiddenIdentity className="size-12" />
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
              <InstitutionMark
                mark={credential.mark}
                logoSrc={credential.logoSrc}
                name={credential.name}
              />
              <div className="min-w-0 flex-1">
                <dt className="truncate text-sm font-medium text-foreground">
                  {credential.headline}
                </dt>
                {/* Clamped rather than truncated: a mandate needs a full
                    sentence to say what the candidate owned on it. */}
                <dd className="line-clamp-2 text-xs text-muted">
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
