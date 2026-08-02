import { cn } from "@/lib/cn";
import { HiddenIdentity } from "./hidden-identity";

type Match = {
  role: string;
  evidence: string;
  sources: string;
};

const QUERY =
  "Someone who scaled a database to millions of requests a day and led a monolith to microservices migration";

/** Illustrative results. Identities are never rendered. */
const MATCHES: readonly Match[] = [
  {
    role: "Backend engineer · Kraków",
    evidence: "Sharded Postgres to 4.1M req/day · 11 services extracted",
    sources: "commit history · conference talk",
  },
  {
    role: "Platform engineer · remote",
    evidence: "Wrote the migration playbook their company open-sourced",
    sources: "GitHub · engineering blog",
  },
  {
    role: "Staff engineer · Berlin",
    evidence: "Cut p99 latency 8× during a monolith split",
    sources: "post-mortem write-up · repo history",
  },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="size-4 shrink-0 text-muted"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

/**
 * Shows intent-based search: a plain-language brief, and results that
 * state why each person matched and where the evidence came from.
 */
export function SearchPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border border-edge bg-surface-1/80",
        "shadow-raised backdrop-blur-sm",
        className,
      )}
    >
      <div className="border-b border-edge p-5">
        <div className="flex items-start gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-3">
          <span className="mt-0.5">
            <SearchIcon />
          </span>
          <p className="text-sm text-foreground">{QUERY}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <span className="font-mono text-xs text-muted">
          ranked by evidence, not keywords
        </span>
        <span className="hidden font-mono text-[0.6875rem] text-muted sm:block">
          3 of 47 shown
        </span>
      </div>

      <ul className="flex flex-col gap-2 px-5 pb-5">
        {MATCHES.map((match) => (
          <li
            key={match.role}
            className="flex items-start gap-3 rounded-lg border border-edge bg-surface-2/60 px-3 py-3"
          >
            <HiddenIdentity className="mt-0.5 size-8" blurPx={4} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {match.role}
              </p>
              <p className="mt-0.5 truncate text-xs text-accent">
                {match.evidence}
              </p>
              <p className="mt-1 truncate font-mono text-[0.6875rem] text-muted">
                {match.sources}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
