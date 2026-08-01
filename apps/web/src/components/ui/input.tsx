import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

export type InputProps = ComponentPropsWithRef<"input"> & {
  /** Marks the input invalid (sets aria-invalid and danger styling). */
  invalid?: boolean;
};

export function Input({ invalid = false, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-10 w-full rounded-md border bg-surface-1 px-3 text-sm",
        "text-foreground placeholder:text-muted transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        invalid ? "border-danger" : "border-edge hover:border-surface-3",
        className,
      )}
      {...rest}
    />
  );
}
