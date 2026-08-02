import { ButtonLink } from "@/components/ui/button-link";
import { Bento } from "@/components/marketing/bento";
import { Capabilities } from "@/components/marketing/capabilities";
import { SearchPreview } from "@/components/marketing/search-preview";
import { SourceLogos } from "@/components/marketing/source-logos";
import { NON_TARGET_ARCHETYPE } from "@/components/marketing/candidate-archetypes";
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

      <SourceLogos />

      <Section
        headingId="value-heading"
        title="Less time searching. A better list at the end of it."
        lede="Knowing the right person exists was never the hard part. The cost sits in the relays in between, and in profiles that make you read around a layout to work out what somebody actually did."
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
              profile={NON_TARGET_ARCHETYPE}
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h2
                id="unconventional-heading"
                className="text-display max-w-2xl text-3xl font-semibold md:text-4xl"
              >
                Beyond the target list
              </h2>
              <p className="mt-4 max-w-prose text-lg text-muted">
                Most screens sort on institution before anything else. A record
                like this one — two live sell-side processes, a first-class
                degree, CFA Level I at the first attempt, a top-hundred finish
                in the Financial Modeling World Cup — is often set aside before
                any of it is read, because the university is not on the list.
              </p>
              <p className="mt-4 max-w-prose text-muted">
                Institution is a proxy for ability, and an imprecise one.
                Candidates who secured deal experience without on-campus
                recruitment went and found it. A structured profile lets them be
                assessed on that record.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        headingId="search-heading"
        title="Describe the person. Not the keyword."
        lede="Keyword search is looking for a string. Write “Java” and you miss the backend engineer who has shipped Kotlin for six years, because they never typed the word."
        raised
      >
        <SearchPreview className="mx-auto max-w-3xl" />
        <p className="mx-auto mt-8 max-w-prose text-center text-muted">
          Search reads project histories, repositories and publications, then
          tells you which piece of evidence answered your brief — so you can
          judge the match instead of trusting a ranking.
        </p>
      </Section>

      <Section
        headingId="capabilities-heading"
        title="Where the current tools give up"
        lede="Four things that stay broken no matter how good the search index gets."
      >
        <Capabilities />
      </Section>

      <Section
        id="comparison"
        headingId="comparison-heading"
        title="The old way, and ours"
        raised
        lede="Same goal — the right person in the right role. The difference is how many steps it takes to get there."
      >
        <Comparison />
      </Section>

      <Section
        headingId="how-heading"
        title="Set it up once"
        lede="Three steps, and no one standing between you and the person making the decision."
      >
        <HowItWorks />
      </Section>

      <section className="relative isolate overflow-hidden border-t border-edge">
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
