import Link from "next/link";
import type { ComponentPropsWithRef } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./button";

export type ButtonLinkProps = ComponentPropsWithRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Internal navigation link visually styled as a Button. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  return <Link className={buttonClassName(variant, size, className)} {...rest} />;
}
