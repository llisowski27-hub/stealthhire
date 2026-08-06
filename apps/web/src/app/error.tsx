"use client"; // Error boundaries must be Client Components.

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  /**
   * Re-fetches and re-renders this boundary's children. Named `unstable_retry`
   * by the framework in this version — see
   * `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md`.
   */
  unstable_retry: () => void;
};

/**
 * Route-level error boundary. Covers every segment below the root layout.
 *
 * `error.message` is deliberately not rendered: in production the framework
 * replaces server-thrown messages with a generic string precisely to avoid
 * leaking internals, and surfacing a client-thrown message here would be an
 * inconsistent exception to that rule. The `digest` is shown instead — it is
 * an opaque hash that matches a server log line, which is what someone
 * reporting the problem actually needs to quote.
 */
export default function ErrorBoundary({
  error,
  unstable_retry,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Console until an error reporting service exists. Logs the error object,
    // never the user's draft or any other page state.
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-content px-6 py-24">
        <ErrorState
          title="Something went wrong"
          description="The page could not be displayed. Trying again often resolves it."
          action={
            <div className="flex flex-col items-center gap-3">
              <Button onClick={() => unstable_retry()}>Try again</Button>
              {error.digest && (
                <p className="font-mono text-xs text-muted">
                  Reference: {error.digest}
                </p>
              )}
            </div>
          }
          className="mx-auto max-w-lg"
        />
      </div>
    </main>
  );
}
