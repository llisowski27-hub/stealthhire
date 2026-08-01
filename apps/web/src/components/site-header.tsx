import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

const NAV_LINKS = [
  { href: "/profile", label: "Platform" },
  { href: "/design", label: "Design system" },
] as const;

/** Global top navigation. */
export function SiteHeader() {
  return (
    <header className="border-b border-edge bg-background-raised">
      <div className="mx-auto flex h-14 w-full max-w-content items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm text-foreground hover:text-accent transition-colors"
        >
          stealthhire
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/profile" size="sm" className="ml-2">
            Get started
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
