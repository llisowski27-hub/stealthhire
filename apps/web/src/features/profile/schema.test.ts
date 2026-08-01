import { describe, expect, it } from "vitest";
import {
  EMPTY_ACHIEVEMENT,
  EMPTY_PROFILE,
  validateAchievement,
  validateProfile,
  validateProfileUrl,
} from "./schema";

describe("validateProfileUrl", () => {
  it("accepts empty (optional field)", () => {
    expect(validateProfileUrl("", ["linkedin.com"])).toBeUndefined();
  });

  it("accepts https URLs on the allowed host and subdomains", () => {
    expect(
      validateProfileUrl("https://www.linkedin.com/in/ada", ["linkedin.com"]),
    ).toBeUndefined();
    expect(
      validateProfileUrl("https://linkedin.com/in/ada", ["linkedin.com"]),
    ).toBeUndefined();
  });

  it("rejects http, javascript, and lookalike hosts", () => {
    expect(
      validateProfileUrl("http://linkedin.com/in/ada", ["linkedin.com"]),
    ).toMatch(/https/);
    expect(
      validateProfileUrl("javascript:alert(1)", ["linkedin.com"]),
    ).toBeDefined();
    expect(
      validateProfileUrl("https://evillinkedin.com/in/ada", ["linkedin.com"]),
    ).toMatch(/must be on/);
    expect(validateProfileUrl("not a url", ["linkedin.com"])).toBeDefined();
  });
});

describe("validateAchievement", () => {
  it("requires a title", () => {
    expect(validateAchievement(EMPTY_ACHIEVEMENT)?.title).toBeDefined();
  });

  it("accepts a complete achievement", () => {
    expect(
      validateAchievement({
        type: "olympiad",
        title: "IMO Silver Medal",
        year: "2019",
        link: "https://imo-official.org/",
      }),
    ).toBeUndefined();
  });

  it("rejects out-of-range years and non-https links", () => {
    const errors = validateAchievement({
      type: "hackathon",
      title: "Won",
      year: "1900",
      link: "ftp://x",
    });
    expect(errors?.year).toBeDefined();
    expect(errors?.link).toBeDefined();
  });
});

describe("validateProfile", () => {
  it("requires first name and surname", () => {
    const errors = validateProfile(EMPTY_PROFILE);
    expect(errors?.firstName).toBeDefined();
    expect(errors?.lastName).toBeDefined();
  });

  it("accepts a valid profile and returns undefined", () => {
    expect(
      validateProfile({
        ...EMPTY_PROFILE,
        firstName: "Ada",
        lastName: "Lovelace",
        university: "University of London",
        linkedinUrl: "https://www.linkedin.com/in/ada",
        githubUrl: "https://github.com/ada",
        achievements: [
          {
            type: "publication",
            title: "Notes on the Analytical Engine",
            year: "1993",
            link: "",
          },
        ],
      }),
    ).toBeUndefined();
  });

  it("indexes achievement errors by position", () => {
    const errors = validateProfile({
      ...EMPTY_PROFILE,
      firstName: "Ada",
      lastName: "Lovelace",
      achievements: [
        { type: "hackathon", title: "Valid entry", year: "", link: "" },
        EMPTY_ACHIEVEMENT,
      ],
    });
    expect(errors?.achievements?.[0]).toBeUndefined();
    expect(errors?.achievements?.[1]?.title).toBeDefined();
  });
});
