import { ButtonLink } from "@/components/ui/button-link";
import { ProfilePreview } from "./profile-preview";

/** Landing hero: statement type, one soft light source, product in view. */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-edge">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42rem] glow-accent"
      />

      <div className="mx-auto w-full max-w-content px-6 pt-24 pb-20 md:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-1 px-3 py-1 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              talent intelligence platform
            </span>

            <h1 className="text-display mt-8 text-4xl font-semibold sm:text-5xl md:text-6xl 3xl:text-7xl">
              Hire on proof.
              <br />
              <span className="text-muted">Not on résumés.</span>
            </h1>

            <p className="mt-8 max-w-prose text-lg text-muted">
              Headhunters charge 15–30% of a first-year salary to forward a CV.
              StealthHire replaces that with verified performance data —
              olympiads, hackathons, publications, shipped work — and connects
              hiring managers straight to the people behind it.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/profile" size="lg">
                Build your verified profile
              </ButtonLink>
              <ButtonLink href="#comparison" size="lg" variant="secondary">
                See how we compare
              </ButtonLink>
            </div>
          </div>

          <ProfilePreview className="lg:translate-y-2" />
        </div>
      </div>
    </section>
  );
}
