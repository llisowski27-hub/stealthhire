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

const ATTESTERS = [
  "Employers confirm the roles",
  "Organisers confirm the results",
  "Certification bodies confirm the credentials",
  "Partner agencies vouch for their candidates",
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
        <h3 className="text-lg font-medium">
          Verified before anyone has to ask
        </h3>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Every claim traces back to whoever confirmed it, so the screening
          conversation is already over before the first message.
        </p>
        <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {ATTESTERS.map((attester) => (
            <li
              key={attester}
              className="flex items-center gap-2.5 text-sm text-muted"
            >
              <span
                className="size-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {attester}
            </li>
          ))}
        </ul>
      </Cell>
    </div>
  );
}
