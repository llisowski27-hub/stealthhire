import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./modal";

// jsdom does not implement showModal/close; shim just enough for the
// open-state reflection the component relies on.
beforeAll(() => {
  if (typeof HTMLDialogElement.prototype.showModal !== "function") {
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  }
  if (typeof HTMLDialogElement.prototype.close !== "function") {
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    };
  }
});

describe("Modal", () => {
  it("shows title, description, and content when open", () => {
    render(
      <Modal open onClose={() => {}} title="Invite" description="Send invite">
        <p>Body</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName("Invite");
    expect(dialog).toHaveAccessibleDescription("Send invite");
    expect(screen.getByText("Body")).toBeVisible();
  });

  it("is not shown when closed", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Invite">
        <p>Body</p>
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose from the close button", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Invite" />);
    await userEvent.click(
      screen.getByRole("button", { name: "Close dialog" }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape (native cancel event)", () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Invite" />);
    fireEvent(screen.getByRole("dialog"), new Event("cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on backdrop click, but not on panel click", () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Invite">
        <p>Body</p>
      </Modal>,
    );
    fireEvent.click(screen.getByText("Body"));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("ignores backdrop clicks when closeOnOverlayClick is false", () => {
    const onClose = vi.fn();
    render(
      <Modal
        open
        onClose={onClose}
        title="Invite"
        closeOnOverlayClick={false}
      />,
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll while open and restores it on close", () => {
    const { rerender } = render(
      <Modal open onClose={() => {}} title="Invite" />,
    );
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Modal open={false} onClose={() => {}} title="Invite" />);
    expect(document.body.style.overflow).toBe("");
  });
});
