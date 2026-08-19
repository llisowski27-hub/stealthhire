import { ButtonLink } from "@/components/ui/button-link";
import {
  EARLY_CAREER_ARCHETYPE,
  EXPERIENCED_ARCHETYPE,
  QUANT_ARCHETYPE,
} from "./candidate-archetypes";
import { CandidateSpotlightRotator } from "./candidate-spotlight-rotator";

/**
 * Three desks and two career stages. One card shows a hiring reader what a
 * record looks like; three show that the structure holds across desks, which
 * is the claim that matters to someone deciding whether this is worth
 * searching.
 */
const HERO_PROFILES = [
  EARLY_CAREER_ARCHETYPE,
  QUANT_ARCHETYPE,
  EXPERIENCED_ARCHETYPE,
] as const;

/**
 * Landing hero: statement type, one soft light source, product in view.
 *
 * The headline states the market thesis rather than the user benefit, because
 * the first question either side of the marketplace asks is why this exists
 * when LinkedIn already does. "Titles are searchable, track records are not"
 * answers that in one line and reads the same to a hiring desk and to a
 * candidate — the sentence is about the industry, not about the reader. It is
 * also why the hero is not split into a candidate half and an employer half:
 * a claim about the market does not need the visitor to pick a side before
 * reading it.
 *
 * The action stays candidate-side: supply has to exist before search can be
 * sold, and no search product is built, so a hero addressed to a hiring desk
 * would promise a capability the page cannot then offer. The employer's
 * argument therefore appears as the reason the profile pays off, in the
 * second sentence, never as a competing pitch.
 *
 * The card beside it is the headline's evidence: it shows the record broken
 * into named fields — experience, workstream, credentials — so a hiring
 * reader can see that the detail they screen on exists as data rather than
 * as prose. It is a profile and is labelled as one. It is deliberately not
 * dressed as a search result: no query, no result count, no relevance line.
 * Search is not built, and a mocked query on a marketing surface would be
 * the same mistake the removed intent-search section already made.
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
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              talent intelligence for finance
            </span>

            <h1 className="text-display mt-8 text-4xl font-semibold sm:text-5xl 3xl:text-6xl">
              Titles are searchable.
              <br />
              Track records are not.
            </h1>

            <p className="mt-8 max-w-prose text-lg text-muted">
              A hiring desk screens on the CV header because it is the only
              structured field. StealthHire structures the work itself — desk,
              side, and what you ran — so that is what gets searched.
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
