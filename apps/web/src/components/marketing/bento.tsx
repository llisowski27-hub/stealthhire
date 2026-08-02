import { ProfileFlow } from "./profile-flow";

/**
 * The section's supporting content: the source-to-profile flow, and the
 * one figure worth stating on its own. Deliberately not a uniform grid of
 * cards — the flow carries its own vertical rhythm.
 */
export function Bento() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
      <ProfileFlow />

      <div className="flex h-fit flex-col rounded-xl border border-edge bg-surface-1 p-6">
        <h3 className="text-lg font-medium">Steps in between</h3>
        <p className="mt-2 text-sm text-muted">
          Hiring manager to candidate. That is the whole chain.
        </p>
        <p
          className="text-display mt-8 text-6xl font-semibold text-accent"
          aria-label="Zero intermediaries"
        >
          0
        </p>
      </div>
    </div>
  );
}
