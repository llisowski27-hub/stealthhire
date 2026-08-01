import { cn } from "@/lib/cn";

type SpinnerProps = {
  /** Accessible label. Omit when the spinner is purely decorative. */
  label?: string;
  className?: string;
};

/**
 * Indeterminate loading indicator. Decorative by default (aria-hidden);
 * pass `label` when it is the only loading signal on screen.
 */
export function Spinner({ label, className }: SpinnerProps) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}
