import Image from "next/image";
import { cn } from "@/lib/cn";

export type InstitutionMarkProps = {
  /** Fallback monogram, 1–3 characters. Used when no logo is supplied. */
  mark: string;
  /**
   * Path to a brand asset under `public/logos` (see the README there).
   * Assets must be obtained from the rights holder's brand page — do not
   * hotlink or trace them.
   */
  logoSrc?: string;
  /** Institution name, used as the image's accessible label. */
  name?: string;
  className?: string;
};

const SIZE_PX = 40;

/**
 * Logo slot for an institution on a profile entry.
 *
 * Renders an official brand asset when one is supplied, otherwise a
 * designed monogram tile. The monogram is a placeholder, not an
 * approximation of anyone's logo — tracing a trademark produces both an
 * inaccurate mark and an implied affiliation.
 */
export function InstitutionMark({
  mark,
  logoSrc,
  name,
  className,
}: InstitutionMarkProps) {
  const tile = cn(
    "flex size-10 shrink-0 items-center justify-center overflow-hidden",
    "rounded-md border border-edge bg-surface-3",
    className,
  );

  if (logoSrc) {
    return (
      <span className={tile}>
        <Image
          src={logoSrc}
          alt={name ?? ""}
          width={SIZE_PX}
          height={SIZE_PX}
          className="size-7 object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        tile,
        "font-mono font-medium tracking-tight text-foreground",
        mark.length > 2 ? "text-[0.5625rem]" : "text-[0.6875rem]",
      )}
    >
      {mark}
    </span>
  );
}
