import { ButtonLink } from "@/components/ui/button-link";

/**
 * Landing hero: statement type, one soft light source, nothing else.
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
 * No profile card here. The card is evidence for a specific argument — that
 * the title is the least informative field — and it earns its place in the
 * section that makes that argument, not beside a headline it only decorates.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-edge">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42rem] glow-accent"
      />

      <div className="mx-auto w-full max-w-content px-6 pt-24 pb-24 md:pt-32 md:pb-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-1 px-3 py-1 font-mono text-xs text-muted">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          talent intelligence for finance
        </span>

        {/* Held to max-w-4xl rather than the content width: the line break is
            the point, and a full-bleed measure would set it adrift. */}
        <h1 className="text-display mt-8 max-w-4xl text-4xl font-semibold sm:text-5xl md:text-6xl">
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
    </section>
  );
}
