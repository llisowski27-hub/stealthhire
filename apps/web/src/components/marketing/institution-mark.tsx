import { cn } from "@/lib/cn";

export type InstitutionMarkProps = {
  /** Short monogram, 1–3 characters. */
  mark: string;
  className?: string;
};

/**
 * Logo slot for an institution on a profile entry.
 *
 * Renders a designed monogram tile, deliberately **not** a reproduction of
 * any organisation's logo: real brand assets are trademarked, and placing
 * them beside an illustrative profile would imply an affiliation that does
 * not exist. The slot exists so licensed assets can be dropped in later
 * without touching layout.
 */
export function InstitutionMark({ mark, className }: InstitutionMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-md",
        "border border-edge bg-surface-3 font-mono font-medium",
        "tracking-tight text-foreground",
        mark.length > 2 ? "text-[0.5625rem]" : "text-[0.6875rem]",
        className,
      )}
    >
      {mark}
    </span>
  );
}
