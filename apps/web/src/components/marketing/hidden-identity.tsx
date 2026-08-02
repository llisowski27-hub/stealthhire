import { cn } from "@/lib/cn";

export type HiddenIdentityProps = {
  /** Tile size utility, e.g. "size-12". Silhouette scales with it. */
  className?: string;
  /** Blur radius in px. Smaller tiles need less. */
  blurPx?: number;
};

/**
 * Blurred stand-in for a person: head and shoulders, no features. The
 * silhouette is percentage-based so one implementation scales to any tile.
 */
export function HiddenIdentity({
  className,
  blurPx = 6,
}: HiddenIdentityProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-edge",
        "bg-surface-3",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{ filter: `blur(${blurPx}px)` }}
      >
        <div className="absolute left-1/2 top-[15%] aspect-square w-[33%] -translate-x-1/2 rounded-full bg-muted/50" />
        <div className="absolute left-1/2 top-[58%] h-[42%] w-[75%] -translate-x-1/2 rounded-t-full bg-muted/50" />
      </div>
    </div>
  );
}
