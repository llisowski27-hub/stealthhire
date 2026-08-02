import Link from "next/link";

const LINK_GROUPS = [
  {
    heading: "Platform",
    links: [
      { href: "/profile", label: "Build your profile" },
      { href: "/design", label: "Design system" },
    ],
  },
] as const;

/** Global site footer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-edge bg-background-raised">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 px-6 py-14 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <p className="font-mono text-sm text-foreground">stealthhire</p>
          <p className="mt-3 text-sm text-muted">
            One profile from your LinkedIn, CV and repositories — and direct conversations.
          </p>
        </div>
        <div className="flex gap-16">
          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-medium text-foreground">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
