import { cn } from "@/lib/cn";

type Capability = {
  label: string;
  title: string;
  problem: string;
  answer: string;
};

const CAPABILITIES: readonly Capability[] = [
  {
    label: "signal",
    title: "Say what would move you, without saying who you are",
    problem:
      "An \"open to work\" badge is public, so the people most worth hiring never switch it on.",
    answer:
      "Set your terms privately instead — the number, the stack, remote or not. Your employer sees nothing.",
  },
  {
    label: "inbox",
    title: "Only reachable by people who clear your bar",
    problem:
      "Recruiter mail is a numbers game, so everyone gets pitched roles that pay less than the one they have.",
    answer:
      "A message only sends if it meets every condition you set. Nothing else arrives.",
  },
  {
    label: "outreach",
    title: "First messages that read like someone did the reading",
    problem:
      "Templated outreach converts badly for a reason — it opens with nothing specific to the person.",
    answer:
      "Drafts start from the work itself: the repository, the write-up, the talk. Follow-up questions run async, in the candidate's own time.",
  },
  {
    label: "sources",
    title: "A 360° profile from the public record",
    problem:
      "One network's data, behind an increasingly closed API, describes what a person typed about themselves.",
    answer:
      "GitHub, Stack Overflow, Kaggle, Hugging Face, arXiv, Medium and patent registries describe what they actually produced.",
  },
];

function Cell({ capability }: { capability: Capability }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-edge bg-surface-1 p-6",
      )}
    >
      <span className="font-mono text-[0.6875rem] text-accent">
        {capability.label}
      </span>
      <h3 className="mt-3 text-lg font-medium text-foreground">
        {capability.title}
      </h3>
      <p className="mt-3 text-sm text-muted">{capability.problem}</p>
      <p className="mt-3 text-sm text-foreground">{capability.answer}</p>
    </div>
  );
}

/** The four capabilities that differentiate the platform. */
export function Capabilities() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CAPABILITIES.map((capability) => (
        <Cell key={capability.label} capability={capability} />
      ))}
    </div>
  );
}
