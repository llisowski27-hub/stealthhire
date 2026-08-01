import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FieldProps = {
  /**
   * Id of the control this field wraps. Explicit (not useId) so the
   * component stays Server-Component-compatible. The control inside
   * `children` must use the same id, and should reference
   * `fieldDescriptionIds(id, …)` via aria-describedby when hint/error
   * are present.
   */
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Ids the wrapped control should list in aria-describedby. */
export function fieldDescriptionIds(
  id: string,
  opts: { hint?: boolean; error?: boolean },
): string | undefined {
  const ids = [
    opts.error ? `${id}-error` : null,
    opts.hint ? `${id}-hint` : null,
  ].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/** Label + control + hint/error wrapper for form controls. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
