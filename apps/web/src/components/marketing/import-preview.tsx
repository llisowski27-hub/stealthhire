import { cn } from "@/lib/cn";

type ImportSource = {
  name: string;
  detail: string;
  status: string;
};

const SOURCES: readonly ImportSource[] = [
  {
    name: "LinkedIn",
    detail: "6 roles · 1 degree · 12 skills",
    status: "mapped",
  },
  {
    name: "CV.pdf",
    detail: "Parsed — 3 projects, 2 awards",
    status: "merged",
  },
  {
    name: "GitHub",
    detail: "24 repositories · 4 languages",
    status: "connected",
  },
];

/**
 * Shows how a profile gets built: existing sources are mapped and merged
 * rather than retyped. Presentational only.
 */
export function ImportPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-edge bg-surface-1/80 shadow-raised",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <span className="font-mono text-xs text-muted">build your profile</span>
        <span className="font-mono text-[0.6875rem] text-muted">
          3 sources
        </span>
      </div>

      <ul className="flex flex-col gap-2 p-5">
        {SOURCES.map((source) => (
          <li
            key={source.name}
            className="flex items-center gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {source.name}
              </p>
              <p className="truncate text-xs text-muted">{source.detail}</p>
            </div>
            <span className="shrink-0 font-mono text-[0.6875rem] text-accent">
              {source.status}
            </span>
          </li>
        ))}

        <li className="mt-1 rounded-lg border border-dashed border-edge px-3 py-3 text-center">
          <span className="font-mono text-xs text-muted">
            + add awards, olympiads, hackathons
          </span>
        </li>
      </ul>

      <div className="flex items-center justify-between border-t border-edge px-5 py-4">
        <span className="font-mono text-xs text-muted">one profile</span>
        <span className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Publish
        </span>
      </div>
    </div>
  );
}
