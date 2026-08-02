import { cn } from "@/lib/cn";

const SIGNAL_CHIPS = [
  "Career history",
  "Open source",
  "Certifications",
  "Publications",
  "Olympiads",
  "Hackathons",
  "Shipped products",
  "Patents",
] as const;

const AUTO_CHECKS = [
  "Competition results, matched to official records",
  "Publications, resolved by DOI",
  "Certifications, checked with the issuer",
  "Repositories, from accounts you prove you own",
] as const;

function Cell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-edge bg-surface-1 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Value propositions as a varied bento grid rather than uniform cards. */
export function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Cell className="md:col-span-2">
        <h3 className="text-lg font-medium">One profile, every source</h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Your CV is a starting point, not the whole story. We pull career
          history together with the work and results that no CV field has room
          for — and keep it current so you write it once.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SIGNAL_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-edge bg-surface-2 px-3 py-1.5 text-xs text-foreground"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Cell>

      <Cell className="justify-between">
        <div>
          <h3 className="text-lg font-medium">Steps in between</h3>
          <p className="mt-2 text-sm text-muted">
            Hiring manager to candidate. That&apos;s the whole chain.
          </p>
        </div>
        <p
          className="text-display mt-8 text-6xl font-semibold text-accent"
          aria-label="Zero intermediaries"
        >
          0
        </p>
      </Cell>

      <Cell>
        <h3 className="text-lg font-medium">Answer once</h3>
        <p className="mt-2 text-sm text-muted">
          No repeating your background to a sourcer, then a recruiter, then the
          person who actually makes the decision.
        </p>
      </Cell>

      <Cell className="md:col-span-2">
        <h3 className="text-lg font-medium">Nobody has to vouch for you</h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          We only verify what can be checked against public records or an
          account you own — no chasing former managers for a favour. Every
          claim shows exactly what confirmed it, and says so plainly when
          nothing has.
        </p>
        <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {AUTO_CHECKS.map((check) => (
            <li
              key={check}
              className="flex items-center gap-2.5 text-sm text-muted"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {check}
            </li>
          ))}
        </ul>
      </Cell>
    </div>
  );
}
