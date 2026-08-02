"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ModalProps = {
  open: boolean;
  /** Called on Escape, close button, or overlay click. Owner sets open=false. */
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Close when the backdrop is clicked. Default true. */
  closeOnOverlayClick?: boolean;
  className?: string;
};

/**
 * Modal dialog built on the native <dialog> element: focus trapping,
 * Escape handling, top-layer stacking, and focus return to the opener
 * all come from the platform. Scroll is locked while open.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Native Escape: keep state ownership with the caller.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // The dialog element itself is only the click target when the
        // backdrop (outside the panel) is clicked.
        if (closeOnOverlayClick && event.target === dialogRef.current) {
          onClose();
        }
      }}
      className={cn(
        "m-auto w-full max-w-md rounded-lg border border-edge",
        "bg-surface-1 text-foreground p-0 shadow-raised",
        "backdrop:bg-background/70",
        "modal-animate",
        className,
      )}
    >
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-base font-medium">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={cn(
              "shrink-0 rounded-sm p-1 text-muted transition-colors",
              "hover:bg-surface-2 hover:text-foreground",
            )}
          >
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
        {description && (
          <p id={descriptionId} className="text-sm text-muted">
            {description}
          </p>
        )}
        {children}
      </div>
    </dialog>
  );
}
