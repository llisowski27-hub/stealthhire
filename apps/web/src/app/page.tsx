import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";

const VALUE_PROPS = [
  {
    title: "Proof over resume",
    description:
      "Be evaluated on verified accomplishments — olympiads, hackathons, publications, shipped work — not keyword-optimized CVs.",
  },
  {
    title: "Talent intelligence",
    description:
      "Your profile combines LinkedIn history, GitHub repositories, certifications, and competition results into one verified identity.",
  },
  {
    title: "Direct hiring",
    description:
      "Hiring managers reach you directly. No recruiter handoffs, no communication bottlenecks.",
  },
] as const;

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <section className="mx-auto w-full max-w-content px-6 py-24 md:py-32">
        <p className="mb-4 font-mono text-sm text-accent">
          talent intelligence platform
        </p>
        <h1 className="mb-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Proof over resume.
        </h1>
        <p className="mb-10 max-w-prose text-lg text-muted">
          StealthHire connects hiring managers directly with exceptional
          professionals through verified performance data — not traditional
          recruitment workflows.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/profile" size="lg">
            Build your profile
          </ButtonLink>
          <ButtonLink href="/design" size="lg" variant="secondary">
            View design system
          </ButtonLink>
        </div>
      </section>

      <section
        aria-labelledby="value-props-heading"
        className="mx-auto w-full max-w-content px-6 pb-24"
      >
        <h2 id="value-props-heading" className="sr-only">
          Why StealthHire
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {VALUE_PROPS.map((prop) => (
            <Card key={prop.title}>
              <CardHeader>
                <CardTitle>{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{prop.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
