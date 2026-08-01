import { cn } from "@/lib/cn";

type SkeletonProps = {
  /** Size the skeleton via className (e.g. "h-4 w-32"). */
  className?: string;
};

/**
 * Loading placeholder. Purely decorative — wrap the loading region in
 * aria-busy at the call site so screen readers announce the state once.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-sm bg-surface-2", className)}
    />
  );
}
