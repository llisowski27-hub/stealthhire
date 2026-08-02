import { cn } from "@/lib/cn";
import {
  VERIFICATION_TIER_META,
  isConfirmed,
  type VerificationTier,
} from "./types";

const TIER_CLASSES: Record<VerificationTier, string> = {
  registry: "border-accent/30 bg-accent/10 text-accent",
  sourced: "border-accent/20 bg-accent/[0.06] text-accent-soft",
  self_declared: "border-edge bg-surface-2 text-muted",
};

function TierIcon({ tier }: { tier: VerificationTier }) {
  const shared = {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-3.5 shrink-0",
    "aria-hidden": true,
  };

  switch (tier) {
    case "registry":
      // Double check: independently checkable public record.
      return (
        <svg {...shared}>
          <path d="M1.5 8.5L4 11l5.5-6" />
          <path d="M7 11l1.5 1.5L14.5 5" />
        </svg>
      );
    case "sourced":
      // Link: proves account ownership.
      return (
        <svg {...shared}>
          <path d="M6.5 9.5a3 3 0 004.24 0l2-2a3 3 0 10-4.24-4.24l-.7.7" />
          <path d="M9.5 6.5a3 3 0 00-4.24 0l-2 2a3 3 0 104.24 4.24l.7-.7" />
        </svg>
      );
    case "self_declared":
      return (
        <svg {...shared}>
          <path d="M4 8h8" />
        </svg>
      );
  }
}

export type VerificationBadgeProps = {
  tier: VerificationTier;
  /** Hides the text label, leaving an icon with an accessible name. */
  iconOnly?: boolean;
  className?: string;
};

/**
 * Displays a claim's evidence tier. The label is always available to
 * assistive technology and colour is never the only differentiator — each
 * tier has a distinct icon and its own wording.
 */
export function VerificationBadge({
  tier,
  iconOnly = false,
  className,
}: VerificationBadgeProps) {
  const meta = VERIFICATION_TIER_META[tier];
  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[0.6875rem] whitespace-nowrap",
        TIER_CLASSES[tier],
        className,
      )}
    >
      <TierIcon tier={tier} />
      {iconOnly ? (
        <span className="sr-only">{meta.label}</span>
      ) : (
        meta.label.toLowerCase()
      )}
    </span>
  );
}

/** True when a claim should read as third-party confirmed. */
export { isConfirmed };
