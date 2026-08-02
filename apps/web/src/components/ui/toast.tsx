"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ToastVariant = "default" | "success" | "warning" | "danger";

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Default 5000. */
  duration?: number;
};

type ToastItem = Required<Pick<ToastInput, "title" | "variant">> &
  Pick<ToastInput, "description"> & { id: number };

type ToastContextValue = {
  toast: (input: ToastInput) => number;
  dismiss: (id: number) => void;
};

const DEFAULT_DURATION_MS = 5000;

const ToastContext = createContext<ToastContextValue | null>(null);

/** Access the toast API. Must be used under ToastProvider. */
export function useToast(): ToastContextValue {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return value;
}

const VARIANT_TITLE_CLASSES: Record<ToastVariant, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly ToastItem[]>([]);
  const nextIdRef = useRef(1);
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = DEFAULT_DURATION_MS,
    }: ToastInput) => {
      const id = nextIdRef.current++;
      setToasts((current) => [...current, { id, title, description, variant }]);
      timersRef.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      );
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3",
        )}
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role={item.variant === "danger" ? "alert" : "status"}
            className={cn(
              "rounded-md border border-edge bg-surface-2 p-4 shadow-raised",
              "flex items-start justify-between gap-4",
              "toast-animate",
            )}
          >
            <div className="flex flex-col gap-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  VARIANT_TITLE_CLASSES[item.variant],
                )}
              >
                {item.title}
              </p>
              {item.description && (
                <p className="text-sm text-muted">{item.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Dismiss notification"
              className={cn(
                "shrink-0 rounded-sm p-1 text-muted transition-colors",
                "hover:bg-surface-3 hover:text-foreground",
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
        ))}
      </div>
    </ToastContext.Provider>
  );
}
