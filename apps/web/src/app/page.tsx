import { ButtonLink } from "@/components/ui/button-link";
import { Bento } from "@/components/marketing/bento";
import { Comparison } from "@/components/marketing/comparison";
import { Hero } from "@/components/marketing/hero";

type SectionProps = {
  id?: string;
  headingId: string;
  title: string;
  /** One short line. Sections carry a single idea; prose belongs elsewhere. */
  lede?: string;
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
      <div className="mx-auto w-full max-w-content px-6 py-20">
        <h2
          id={headingId}
          className="text-display max-w-3xl text-3xl font-semibold md:text-4xl"
        >
          {title}
        </h2>
        {lede && <p className="mt-3 max-w-prose text-lg text-muted">{lede}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />

      <Section headingId="value-heading" title="One profile. Built to be searched.">
        <Bento />
      </Section>

      <Section
        id="comparison"
        headingId="comparison-heading"
        title="The old way, and ours"
        raised
      >
        <Comparison />
      </Section>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-96 glow-accent rotate-180"
        />
        <div className="mx-auto w-full max-w-content px-6 py-24 text-center">
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
