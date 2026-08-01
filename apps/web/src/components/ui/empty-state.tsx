import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  /** Optional call-to-action, e.g. a Button provided by the caller. */
  action?: ReactNode;
  className?: string;
};

/** Shown when a list or view has no data. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg",
        "border border-dashed border-edge px-6 py-12 text-center",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="text-sm text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
