import { ButtonLink } from "@/components/ui/button-link";
import {
  EARLY_CAREER_ARCHETYPE,
  QUANT_ARCHETYPE,
} from "./candidate-archetypes";
import { CandidateSpotlightRotator } from "./candidate-spotlight-rotator";

const HERO_PROFILES = [EARLY_CAREER_ARCHETYPE, QUANT_ARCHETYPE] as const;

/**
 * Landing hero: statement type, one soft light source, product in view.
 *
 * The headline states the market thesis rather than the user benefit, because
 * the first question either side of the marketplace asks is why this exists
 * when LinkedIn already does. "Titles are searchable, track records are not"
 * answers that in one line and reads the same to a hiring desk and to a
 * candidate — the sentence is about the industry, not about the reader.
 *
 * The action stays candidate-side: supply has to exist before search can be
 * sold, and no search product is built, so a hero addressed to a hiring desk
 * would promise a capability the page cannot then offer. The employer's
 * argument therefore appears as the reason the profile pays off, in the
 * second sentence, never as a competing pitch.
 *
 * The card cycles between an advisory and a systematic trading profile.
 * Both are early career, so the rotation varies the desk and nothing else —
 * a quant reader who lands on an M&A card has to translate before deciding
 * the product is for them, and most will not bother.
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

            <h1 className="text-display mt-8 text-4xl font-semibold sm:text-5xl 3xl:text-6xl">
              Titles are searchable.
              <br />
              Track records are not.
            </h1>

            <p className="mt-8 max-w-prose text-lg text-muted">
              A hiring desk screens on the CV header because it is the only
              structured field. StealthHire structures the work itself —
              desk, side, and what you ran — so that is what gets searched.
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

          <CandidateSpotlightRotator
            profiles={HERO_PROFILES}
            className="lg:translate-y-2"
          />
        </div>
      </div>
    </section>
  );
}
