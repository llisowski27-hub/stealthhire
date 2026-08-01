"use client";

import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

function ToastButtons() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: "Invite sent", description: "We emailed the candidate." })
        }
      >
        Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: "Profile verified", variant: "success" })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Invite failed",
            description: "The email address bounced.",
            variant: "danger",
          })
        }
      >
        Danger toast
      </Button>
    </div>
  );
}

/** Dev-only interactive demo for the toast system. */
export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  );
}
