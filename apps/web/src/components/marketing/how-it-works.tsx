type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Bring your proof",
    description:
      "Import LinkedIn history and GitHub repositories, then add what a CV can't hold — olympiad placements, hackathon wins, publications, certifications, shipped projects.",
  },
  {
    number: "02",
    title: "Get it verified",
    description:
      "Employers, certification bodies, and partner agencies attest to what you claim. Every verified entry traces back to who confirmed it.",
  },
  {
    number: "03",
    title: "Hear from the decision maker",
    description:
      "Hiring managers search on demonstrated ability and message you directly. No intermediary deciding which roles you get to hear about.",
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
