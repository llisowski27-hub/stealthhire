import { afterEach, describe, expect, it, vi } from "vitest";
import { createId } from "./id";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createId", () => {
  it("returns distinct non-empty ids", () => {
    const ids = Array.from({ length: 100 }, createId);
    expect(new Set(ids).size).toBe(100);
    expect(ids.every((id) => id !== "")).toBe(true);
  });

  it("stays unique without crypto.randomUUID", () => {
    vi.spyOn(crypto, "randomUUID").mockImplementation(() => {
      throw new Error("not a secure context");
    });
    // The guard checks for a function, so stub the property away entirely.
    const stubbed = { ...crypto, randomUUID: undefined };
    vi.stubGlobal("crypto", stubbed);

    const ids = Array.from({ length: 50 }, createId);
    expect(new Set(ids).size).toBe(50);

    vi.unstubAllGlobals();
  });

  it("namespaces fallback ids so they cannot collide with persisted ones", () => {
    vi.stubGlobal("crypto", { ...crypto, randomUUID: undefined });

    // A persisted draft from an earlier page load would hold ids from that
    // load's namespace. A bare counter would restart at 1 and collide.
    const id = createId();
    expect(id).toMatch(/^id-[a-z0-9]+-\d+$/);
    expect(id).not.toBe("id-1");

    vi.unstubAllGlobals();
  });
});
