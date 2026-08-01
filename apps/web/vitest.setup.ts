import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL auto-cleanup only registers when afterEach is global; we run
// without test globals, so register it explicitly.
afterEach(() => {
  cleanup();
});
