type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Connect your sources",
    description:
      "Import your career history and repositories in a couple of clicks, then add what a CV has no field for — olympiad placements, hackathon wins, publications, certifications.",
  },
  {
    number: "02",
    title: "Most of it verifies itself",
    description:
      "Competition results, publications and certifications are matched against official records automatically. Employment gets confirmed by an employer or partner agency — only when a role is actually in play.",
  },
  {
    number: "03",
    title: "Hiring managers message you",
    description:
      "They search on what you've actually done and write to you themselves — no intermediary deciding which roles reach you, and no scheduling chain before the first reply.",
  },
];

/** Three-step explanation of the candidate journey. */
export function HowItWorks() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-edge bg-edge md:grid-cols-3">
      {STEPS.map((step) => (
        <li
          key={step.number}
          className="flex flex-col gap-4 bg-surface-1 p-6 md:p-8"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-xs text-accent"
          >
            {step.number}
          </span>
          <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
          <p className="text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
