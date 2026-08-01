import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Field, fieldDescriptionIds } from "./field";
import { Input } from "./input";

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field id="email" label="Email">
        <Input id="email" />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders the hint when there is no error", () => {
    render(
      <Field id="email" label="Email" hint="Work email preferred">
        <Input id="email" />
      </Field>,
    );
    expect(screen.getByText("Work email preferred")).toHaveAttribute(
      "id",
      "email-hint",
    );
  });

  it("renders the error as an alert and hides the hint", () => {
    render(
      <Field id="email" label="Email" hint="Work email" error="Required">
        <Input id="email" invalid />
      </Field>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.queryByText("Work email")).not.toBeInTheDocument();
  });

  it("wires aria-describedby ids through the helper", () => {
    render(
      <Field id="email" label="Email" error="Required">
        <Input
          id="email"
          invalid
          aria-describedby={fieldDescriptionIds("email", { error: true })}
        />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});

describe("fieldDescriptionIds", () => {
  it("returns undefined with no descriptions", () => {
    expect(fieldDescriptionIds("x", {})).toBeUndefined();
  });

  it("orders error before hint", () => {
    expect(fieldDescriptionIds("x", { hint: true, error: true })).toBe(
      "x-error x-hint",
    );
  });
});
