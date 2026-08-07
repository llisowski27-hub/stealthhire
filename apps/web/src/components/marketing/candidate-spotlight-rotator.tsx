"use client";

// Client because the card advances on a timer and reads the user's motion
// preference — both are browser-only, and neither can be lifted into a
// Server Component.

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { CandidateArchetype } from "./candidate-archetypes";
import { CandidateSpotlight } from "./candidate-spotlight";

const ROTATE_MS = 7000;

export type CandidateSpotlightRotatorProps = {
  profiles: readonly CandidateArchetype[];
  className?: string;
};

/**
 * Cycles the hero card between desks, so an advisory reader and a systematic
 * trading reader each see their own vocabulary rather than translating from
 * someone else's.
 *
 * Auto-advance is content that changes without being asked for, so it has to
 * be escapable three ways: it never starts under `prefers-reduced-motion`, it
 * pauses while a pointer or keyboard focus is inside the card, and selecting a
 * profile stops it for the rest of the session. Plain toggle buttons rather
 * than the ARIA tab pattern — tabs oblige a roving tabindex and arrow-key
 * handling, which buys nothing here and is one more thing to get wrong.
 *
 * The cards are stacked in a single grid cell rather than positioned
 * absolutely, so the container keeps the height of the tallest profile and
 * the page does not reflow mid-rotation.
 */
export function CandidateSpotlightRotator({
  profiles,
  className,
}: CandidateSpotlightRotatorProps) {
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [held, setHeld] = useState(false);

  const running = !stopped && !held && profiles.length > 1;

  useEffect(() => {
    if (!running) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    // Re-read on change rather than at mount only: a preference toggled
    // mid-session should take effect without a reload.
    const sync = () => {
      clearInterval(timer);
      timer = media.matches
        ? undefined
        : setInterval(
            () => setIndex((current) => (current + 1) % profiles.length),
            ROTATE_MS,
          );
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", sync);
    };
  }, [running, profiles.length]);

  return (
    <div
      className={cn("flex min-w-0 flex-col gap-4", className)}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* min-w-0 on the track and on every stacked child: grid items default
          to min-width:auto, which sizes the column to the widest headline and
          clips the card inside the hero's overflow-hidden. */}
      <div className="grid min-w-0 grid-cols-1">
        {profiles.map((profile, position) => {
          const active = position === index;
          return (
            <div
              key={profile.role}
              aria-hidden={!active}
              className={cn(
                "[grid-area:1/1] min-w-0 motion-safe:transition-opacity motion-safe:duration-500",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <CandidateSpotlight profile={profile} />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {profiles.map((profile, position) => {
          const active = position === index;
          return (
            <button
              key={profile.role}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setIndex(position);
                setStopped(true);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                active ? "w-6 bg-accent" : "w-1.5 bg-muted/40 hover:bg-muted",
              )}
            >
              <span className="sr-only">{profile.role}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
