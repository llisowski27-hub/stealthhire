import { ButtonLink } from "@/components/ui/button-link";
import { Bento } from "@/components/marketing/bento";
import { SELF_TAUGHT_ARCHETYPE } from "@/components/marketing/candidate-archetypes";
import { CandidateSpotlight } from "@/components/marketing/candidate-spotlight";
import { Comparison } from "@/components/marketing/comparison";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";

type SectionProps = {
  id?: string;
  headingId: string;
  title: string;
  lede: string;
  raised?: boolean;
  children: React.ReactNode;
};

function Section({
  id,
  headingId,
  title,
  lede,
  raised = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={
        raised
          ? "scroll-mt-16 border-b border-edge bg-background-raised"
          : "scroll-mt-16 border-b border-edge"
      }
    >
      <div className="mx-auto w-full max-w-content px-6 py-24">
        <h2
          id={headingId}
          className="text-display max-w-3xl text-3xl font-semibold md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-prose text-lg text-muted">{lede}</p>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />

      <Section
        headingId="value-heading"
        title="Every handoff costs a week"
        lede="Finding people was never the hard part. The delay comes from what sits on top of it — relays, rescheduling, and context that thins out at every step."
        raised
      >
        <Bento />
      </Section>

      <section
        aria-labelledby="unconventional-heading"
        className="border-b border-edge"
      >
        <div className="mx-auto w-full max-w-content px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <CandidateSpotlight
              profile={SELF_TAUGHT_ARCHETYPE}
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h2
                id="unconventional-heading"
                className="text-display max-w-2xl text-3xl font-semibold md:text-4xl"
              >
                And the ones who don&apos;t look the part
              </h2>
              <p className="mt-4 max-w-prose text-lg text-muted">
                Sort by university and this person never surfaces. They have no
                degree — and a library running in forty million installs a
                month, plus a Kaggle Grandmaster title held by a few hundred
                people alive.
              </p>
              <p className="mt-4 max-w-prose text-muted">
                A filter tuned for credentials is measuring the wrong thing.
                Structured profiles let a hiring manager search on what someone
                built, placed in, and shipped — whatever route they took to get
                there.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="comparison"
        headingId="comparison-heading"
        title="The old way, and ours"
        lede="Same goal — the right person in the right role. The difference is how many steps it takes to get there."
      >
        <Comparison />
      </Section>

      <Section
        headingId="how-heading"
        title="Set it up once"
        lede="Three steps, and no one standing between you and the person making the decision."
        raised
      >
        <HowItWorks />
      </Section>

      <Section
        headingId="agencies-heading"
        title="We're not here to delete recruiters"
        lede="Agencies know their candidates better than any scraper does."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-muted">
            On StealthHire they become talent providers: they contribute
            pipelines, expand coverage, and earn referral revenue.
          </p>
          <p className="text-muted">
            What they stop doing is standing in the middle of every
            conversation and charging a percentage for the privilege.
          </p>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-96 glow-accent rotate-180"
        />
        <div className="mx-auto w-full max-w-content px-6 py-28 text-center">
          <h2 className="text-display mx-auto max-w-3xl text-3xl font-semibold md:text-5xl">
            Build it once.
            <br />
            <span className="text-muted">Get messaged directly.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/profile" size="lg">
              Build your profile
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
