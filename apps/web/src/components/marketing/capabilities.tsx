type Capability = {
  label: string;
  title: string;
  line: string;
};

const CAPABILITIES: readonly Capability[] = [
  {
    label: "signal",
    title: "Private signal",
    line: "Set your number, desk and location. Your employer never sees it.",
  },
  {
    label: "inbox",
    title: "Nothing below your bar",
    line: "A message only sends if it meets every condition you set.",
  },
  {
    label: "outreach",
    title: "Openers that did the reading",
    line: "Written from your actual work, not a template.",
  },
  {
    label: "sources",
    title: "More than one network",
    line: "GitHub, Kaggle, arXiv, CFA registry, competition results.",
  },
];

/** The four capabilities that differentiate the platform, one line each. */
export function Capabilities() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CAPABILITIES.map((capability) => (
        <div
          key={capability.label}
          className="rounded-xl border border-edge bg-surface-1 p-6"
        >
          <span className="font-mono text-[0.6875rem] text-accent">
            {capability.label}
          </span>
          <h3 className="mt-3 text-lg font-medium text-foreground">
            {capability.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{capability.line}</p>
        </div>
      ))}
    </div>
  );
}
