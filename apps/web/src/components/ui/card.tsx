import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-edge bg-surface-1 shadow-soft",
        className,
      )}
      {...rest}
    />
  );
}

export function CardHeader({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1 p-5 pb-0", className)}
      {...rest}
    />
  );
}

export function CardTitle({
  className,
  ...rest
}: ComponentPropsWithRef<"h3">) {
  return (
    <h3
      className={cn("text-base font-medium text-foreground", className)}
      {...rest}
    />
  );
}

export function CardDescription({
  className,
  ...rest
}: ComponentPropsWithRef<"p">) {
  return <p className={cn("text-sm text-muted", className)} {...rest} />;
}

export function CardContent({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return <div className={cn("p-5", className)} {...rest} />;
}

export function CardFooter({
  className,
  ...rest
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 p-5 pt-0", className)}
      {...rest}
    />
  );
}
