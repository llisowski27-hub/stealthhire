import { cn } from "@/lib/cn";
import type {
  CandidateArchetype,
  Credential,
  CredentialKind,
} from "./candidate-archetypes";
import { HiddenIdentity } from "./hidden-identity";
import { InstitutionMark } from "./institution-mark";

export type CandidateSpotlightProps = {
  profile: CandidateArchetype;
  className?: string;
};

const GROUPS: readonly { kind: CredentialKind; label: string }[] = [
  { kind: "experience", label: "Experience" },
  { kind: "credential", label: "Credentials" },
];

/**
 * Marketing preview of a candidate profile with the identity withheld.
 * Presentational only — credentials are illustrative and belong to no one.
 *
 * Rows are grouped under named field labels rather than listed flat. The
 * card's job on this page is to show a hiring reader that the record is
 * structured — that experience, workstream and credential are separate
 * fields and not one blob of prose — because a record with fields is the
 * thing a desk can screen on. A flat list reads as a CV; named groups read
 * as a record.
 *
 * The labels are a fieldset, not document structure, so they are `role=group`
 * rather than headings — the card renders under an `h1` in the hero and an
 * `h2` elsewhere, and no single heading level is correct in both.
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

        {GROUPS.map((group) => {
          const rows = profile.credentials.filter(
            (credential) => credential.kind === group.kind,
          );
          if (rows.length === 0) return null;

          return (
            <div key={group.kind} role="group" aria-label={group.label}>
              <p
                aria-hidden="true"
                className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted/70"
              >
                {group.label}
              </p>
              <dl className="mt-2 flex flex-col gap-2">
                {rows.map((credential) => (
                  <CredentialRow
                    key={credential.headline}
                    credential={credential}
                  />
                ))}
              </dl>
            </div>
          );
        })}

        {/* Provenance is stated rather than left to inference. No claim on a
            profile is checked by anyone, so the card says whose account this
            is — which is both the honest label and the one an institutional
            reader expects to find on a data surface. */}
        <p className="font-mono text-[0.6875rem] text-muted/75">
          candidate-declared record
        </p>

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

function CredentialRow({ credential }: { credential: Credential }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-2.5">
      <InstitutionMark
        mark={credential.mark}
        logoSrc={credential.logoSrc}
        name={credential.name}
      />
      <div className="min-w-0 flex-1">
        <dt className="truncate text-sm font-medium text-foreground">
          {credential.headline}
        </dt>
        <dd className="truncate text-xs text-muted">{credential.detail}</dd>
        {credential.artefacts && (
          // Mono, because these are records rather than prose, and a finance
          // reader is used to reading an instrument line that way. Three
          // lines, which is what a three-artefact row needs at 390px — a
          // tighter clamp silently drops the last one.
          <dd className="mt-1.5 line-clamp-3 font-mono text-[0.6875rem] leading-relaxed text-muted/75">
            {credential.artefacts.join(" · ")}
          </dd>
        )}
      </div>
    </div>
  );
}
