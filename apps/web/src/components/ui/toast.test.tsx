import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ToastProvider, useToast } from "./toast";

function Trigger() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({ title: "Saved", description: "Profile updated" })
      }
    >
      Notify
    </button>
  );
}

function DangerTrigger() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ title: "Failed", variant: "danger" })}
    >
      Fail
    </button>
  );
}

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when useToast is used outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(
      "useToast must be used within a ToastProvider",
    );
    spy.mockRestore();
  });

  it("shows a toast with status role and dismisses it automatically", () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByText("Profile updated")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("uses the alert role for danger toasts", () => {
    render(
      <ToastProvider>
        <DangerTrigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Fail" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });

  it("dismisses via the dismiss button before the timeout", () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("stacks multiple toasts", () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    fireEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(screen.getAllByRole("status")).toHaveLength(2);
  });
});
