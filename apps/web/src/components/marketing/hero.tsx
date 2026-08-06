import { ButtonLink } from "@/components/ui/button-link";
import { EARLY_CAREER_ARCHETYPE } from "./candidate-archetypes";
import { CandidateSpotlight } from "./candidate-spotlight";

/**
 * Landing hero: statement type, one soft light source, product in view.
 *
 * Addressed to the candidate, in the candidate's voice, because that is who
 * the page's only action is for. The employer's side of the argument is
 * made later, as the reason building a profile is worth it — not as a
 * second pitch competing with this one.
 *
 * The card shows the early-career profile deliberately. The page argues
 * that strong records get filtered out on pedigree, so the hero has to show
 * someone that happens to; a fully credentialed candidate would be a live
 * counter-argument in the first viewport.
 */
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
              talent intelligence for finance
            </span>

            <h1 className="text-display mt-8 text-4xl font-semibold sm:text-5xl md:text-6xl 3xl:text-7xl">
              Get found for
              <br />
              what you have done.
            </h1>

            <p className="mt-8 max-w-prose text-lg text-muted">
              One profile from your CV and LinkedIn, built so hiring managers
              can find you on the work — and message you directly.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/profile" size="lg">
                Build your profile
              </ButtonLink>
              <ButtonLink href="#comparison" size="lg" variant="secondary">
                See how we compare
              </ButtonLink>
            </div>
          </div>

          <CandidateSpotlight
            profile={EARLY_CAREER_ARCHETYPE}
            className="lg:translate-y-2"
          />
        </div>
      </div>
    </section>
  );
}
