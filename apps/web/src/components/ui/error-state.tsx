import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  /**
   * Optional recovery action (e.g. a retry Button). Passed as a node —
   * not a callback — so this component stays Server-Component-safe.
   */
  action?: ReactNode;
  className?: string;
};

/** Shown when a view fails to load. Announced via role="alert". */
export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg",
        "border border-danger/40 bg-surface-1 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="text-sm font-medium text-danger">{title}</p>
      {description && <p className="text-sm text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
