import { afterEach, describe, expect, it, vi } from "vitest";
import { clearDraft, loadDraft, saveDraft } from "./draft-storage";
import { createAchievement, EMPTY_PROFILE, type ProfileDraft } from "./schema";

const STORAGE_KEY = "stealthhire.profile-draft.v1";

/**
 * `loadDraft` reads data the user (or anything else with access to this
 * origin) can edit freely, so the negative cases matter more than the happy
 * path: anything that does not match the expected shape must be discarded
 * rather than trusted into application state.
 */

function write(raw: string) {
  window.localStorage.setItem(STORAGE_KEY, raw);
}

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("saveDraft / loadDraft", () => {
  it("round-trips a complete draft", () => {
    const draft: ProfileDraft = {
      ...EMPTY_PROFILE,
      firstName: "Ada",
      lastName: "Lovelace",
      achievements: [{ ...createAchievement(), title: "IMO Silver" }],
    };

    expect(saveDraft(draft)).toBe(true);
    expect(loadDraft()).toEqual(draft);
  });

  it("returns undefined when nothing is stored", () => {
    expect(loadDraft()).toBeUndefined();
  });

  it("reports failure instead of throwing when storage rejects a write", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(saveDraft(EMPTY_PROFILE)).toBe(false);
  });
});

describe("loadDraft rejects malformed data", () => {
  it("discards invalid JSON", () => {
    write("{ not json");
    expect(loadDraft()).toBeUndefined();
  });

  it("discards JSON that is not an object", () => {
    write('"a string"');
    expect(loadDraft()).toBeUndefined();
    write("null");
    expect(loadDraft()).toBeUndefined();
    write("42");
    expect(loadDraft()).toBeUndefined();
  });

  it("coerces non-string fields to empty rather than trusting them", () => {
    write(
      JSON.stringify({
        firstName: 42,
        lastName: { nested: true },
        headline: null,
        university: ["array"],
        linkedinUrl: false,
        githubUrl: undefined,
      }),
    );

    expect(loadDraft()).toEqual(EMPTY_PROFILE);
  });

  it("drops achievements with an unrecognised type", () => {
    write(
      JSON.stringify({
        ...EMPTY_PROFILE,
        achievements: [
          { id: "a", type: "olympiad", title: "Kept", year: "", link: "" },
          { id: "b", type: "__proto__", title: "Dropped", year: "", link: "" },
          { id: "c", type: "notAType", title: "Dropped", year: "", link: "" },
          "not an object",
          null,
        ],
      }),
    );

    const loaded = loadDraft();
    expect(loaded?.achievements).toHaveLength(1);
    expect(loaded?.achievements[0]?.title).toBe("Kept");
  });

  it("falls back to an empty list when achievements is not an array", () => {
    write(JSON.stringify({ ...EMPTY_PROFILE, achievements: "nope" }));
    expect(loadDraft()?.achievements).toEqual([]);
  });

  it("assigns an id to achievements stored before ids existed", () => {
    write(
      JSON.stringify({
        ...EMPTY_PROFILE,
        achievements: [
          { type: "hackathon", title: "Legacy row", year: "", link: "" },
          { id: "", type: "hackathon", title: "Blank id", year: "", link: "" },
        ],
      }),
    );

    const ids = loadDraft()?.achievements.map((a) => a.id) ?? [];
    expect(ids).toHaveLength(2);
    expect(ids.every((id) => typeof id === "string" && id !== "")).toBe(true);
    expect(new Set(ids).size).toBe(2);
  });

  it("ignores unknown extra keys", () => {
    write(JSON.stringify({ ...EMPTY_PROFILE, isAdmin: true, role: "owner" }));
    expect(loadDraft()).toEqual(EMPTY_PROFILE);
  });

  it("returns undefined when reading throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(loadDraft()).toBeUndefined();
  });
});

describe("clearDraft", () => {
  it("removes a stored draft", () => {
    saveDraft({ ...EMPTY_PROFILE, firstName: "Ada" });
    clearDraft();
    expect(loadDraft()).toBeUndefined();
  });

  it("does not throw when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(() => clearDraft()).not.toThrow();
  });
});
