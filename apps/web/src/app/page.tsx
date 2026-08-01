import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { Comparison } from "@/components/marketing/comparison";
import { HowItWorks } from "@/components/marketing/how-it-works";

const BROKEN_THINGS = [
  {
    title: "You pay for introductions",
    description:
      "A headhunter takes 15–30% of a first-year salary to forward a CV. That fee buys access to a network, not evidence that someone can do the job.",
  },
  {
    title: "Your message goes through three people",
    description:
      "The person who understands the role rarely speaks to the candidate. By the time context reaches them, it has been summarized twice and lost the detail that mattered.",
  },
  {
    title: "The best signal never reaches the screen",
    description:
      "An IMO medal, a winning hackathon build, a paper, a repository people actually depend on — none of it survives a keyword filter tuned for job titles.",
  },
] as const;

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <section className="mx-auto w-full max-w-content px-6 py-24 md:py-32">
        <p className="mb-4 font-mono text-sm text-accent">
          talent intelligence platform
        </p>
        <h1 className="mb-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
          Hiring shouldn&apos;t cost 25% of a salary to forward a CV.
        </h1>
        <p className="mb-10 max-w-prose text-lg text-muted">
          StealthHire replaces the headhunter&apos;s network with verified
          performance data — olympiads, hackathons, publications, shipped work —
          and puts hiring managers in direct contact with the people behind it.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/profile" size="lg">
            Build your verified profile
          </ButtonLink>
          <ButtonLink href="#comparison" size="lg" variant="secondary">
            See how we compare
          </ButtonLink>
        </div>
      </section>

      <section
        aria-labelledby="broken-heading"
        className="border-t border-edge bg-background-raised"
      >
        <div className="mx-auto w-full max-w-content px-6 py-20">
          <h2
            id="broken-heading"
            className="mb-3 text-2xl font-semibold tracking-tight"
          >
            What recruitment agencies charge you for
          </h2>
          <p className="mb-10 max-w-prose text-muted">
            Headhunters solved a real problem: finding people is hard. The
            problem is what the model costs once the search is over.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {BROKEN_THINGS.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="comparison"
        aria-labelledby="comparison-heading"
        className="scroll-mt-16 border-t border-edge"
      >
        <div className="mx-auto w-full max-w-content px-6 py-20">
          <h2
            id="comparison-heading"
            className="mb-3 text-2xl font-semibold tracking-tight"
          >
            The old way, and ours
          </h2>
          <p className="mb-10 max-w-prose text-muted">
            Same goal — the right person in the right role. Different evidence,
            different incentives.
          </p>
          <Comparison />
        </div>
      </section>

      <section
        aria-labelledby="how-heading"
        className="border-t border-edge bg-background-raised"
      >
        <div className="mx-auto w-full max-w-content px-6 py-20">
          <h2
            id="how-heading"
            className="mb-3 text-2xl font-semibold tracking-tight"
          >
            How it works
          </h2>
          <p className="mb-10 max-w-prose text-muted">
            Three steps, and no one between you and the person making the
            decision.
          </p>
          <HowItWorks />
        </div>
      </section>

      <section
        aria-labelledby="agencies-heading"
        className="border-t border-edge"
      >
        <div className="mx-auto w-full max-w-content px-6 py-20">
          <div className="max-w-prose">
            <h2
              id="agencies-heading"
              className="mb-3 text-2xl font-semibold tracking-tight"
            >
              We&apos;re not here to delete recruiters
            </h2>
            <p className="mb-4 text-muted">
              Agencies know their candidates better than any scraper does. On
              StealthHire they become verified talent providers: they contribute
              pipelines, vouch for what candidates claim, and earn referral
              revenue.
            </p>
            <p className="text-muted">
              What they stop doing is standing in the middle of every
              conversation and charging for the privilege.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-edge bg-background-raised">
        <div className="mx-auto w-full max-w-content px-6 py-20">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">
            Your proof is already there. Put it somewhere it counts.
          </h2>
          <p className="mb-8 max-w-prose text-muted">
            Start with what you&apos;ve won, built, published, and shipped.
          </p>
          <ButtonLink href="/profile" size="lg">
            Build your verified profile
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
