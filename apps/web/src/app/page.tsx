import { ButtonLink } from "@/components/ui/button-link";
import { Bento } from "@/components/marketing/bento";
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
        title="What the agency model leaves on the table"
        lede="Headhunters solved a real problem: finding people is hard. The cost is everything that happens after the search."
        raised
      >
        <Bento />
      </Section>

      <Section
        id="comparison"
        headingId="comparison-heading"
        title="The old way, and ours"
        lede="Same goal — the right person in the right role. Different evidence, different incentives."
      >
        <Comparison />
      </Section>

      <Section
        headingId="how-heading"
        title="How it works"
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
            On StealthHire they become verified talent providers: they
            contribute pipelines, vouch for what candidates claim, expand
            coverage, and earn referral revenue.
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
            Your proof already exists.
            <br />
            <span className="text-muted">Put it where it counts.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/profile" size="lg">
              Build your verified profile
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
