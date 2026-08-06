/**
 * Candidate profile schema and validation. Hand-rolled and dependency-free;
 * mirror these rules server-side when the backend lands (client validation
 * is UX, never a security boundary).
 */

import { createId } from "@/lib/id";

export const ACHIEVEMENT_TYPES = [
  "olympiad",
  "hackathon",
  "competition",
  "certification",
  "publication",
  "project",
] as const;

export type AchievementType = (typeof ACHIEVEMENT_TYPES)[number];

export type Achievement = {
  /**
   * Stable client-side identity. Exists so React keys and DOM ids survive
   * reordering and removal — an index would re-point both at a different
   * row. Not a server identifier.
   */
  id: string;
  type: AchievementType;
  title: string;
  year: string;
  link: string;
};

export type ProfileDraft = {
  firstName: string;
  lastName: string;
  headline: string;
  university: string;
  linkedinUrl: string;
  githubUrl: string;
  achievements: Achievement[];
};

export const EMPTY_PROFILE: ProfileDraft = {
  firstName: "",
  lastName: "",
  headline: "",
  university: "",
  linkedinUrl: "",
  githubUrl: "",
  achievements: [],
};

/**
 * A factory rather than a shared constant: every row needs its own identity,
 * and a module-level object would be pushed into the list by reference.
 */
export function createAchievement(): Achievement {
  return { id: createId(), type: "hackathon", title: "", year: "", link: "" };
}

const NAME_MAX = 100;
const TEXT_MAX = 200;
const YEAR_MIN = 1950;

export type AchievementErrors = Partial<Record<keyof Achievement, string>>;

export type ProfileErrors = Partial<
  Record<Exclude<keyof ProfileDraft, "achievements">, string>
> & {
  achievements?: ReadonlyArray<AchievementErrors | undefined>;
};

/**
 * Parses a string as an https URL. Returns undefined for anything that is
 * not parseable or not https — which is what rejects `javascript:` and
 * `data:` payloads before they can reach an href.
 */
function parseHttpsUrl(value: string): URL | undefined {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  return url.protocol === "https:" ? url : undefined;
}

/**
 * Validates a profile URL: https only, host on the given allowlist
 * (exact or subdomain). Rejects javascript:/data: and lookalike hosts.
 */
export function validateProfileUrl(
  value: string,
  allowedHosts: readonly string[],
): string | undefined {
  if (value === "") return undefined;
  const url = parseHttpsUrl(value);
  if (!url) {
    return "Enter a full https:// URL";
  }
  const host = url.hostname.toLowerCase();
  const allowed = allowedHosts.some(
    (candidate) => host === candidate || host.endsWith(`.${candidate}`),
  );
  if (!allowed) {
    return `URL must be on ${allowedHosts.join(" or ")}`;
  }
  return undefined;
}

function validateRequiredText(
  value: string,
  label: string,
  max: number,
): string | undefined {
  if (value.trim() === "") return `${label} is required`;
  if (value.length > max) return `${label} must be at most ${max} characters`;
  return undefined;
}

function validateOptionalText(
  value: string,
  label: string,
  max: number,
): string | undefined {
  if (value.length > max) return `${label} must be at most ${max} characters`;
  return undefined;
}

export function validateAchievement(
  achievement: Achievement,
): AchievementErrors | undefined {
  const errors: AchievementErrors = {};
  const title = validateRequiredText(achievement.title, "Title", TEXT_MAX);
  if (title) errors.title = title;

  const currentYear = new Date().getFullYear();
  if (achievement.year !== "") {
    const year = Number(achievement.year);
    if (
      !Number.isInteger(year) ||
      year < YEAR_MIN ||
      year > currentYear
    ) {
      errors.year = `Year must be between ${YEAR_MIN} and ${currentYear}`;
    }
  }

  // Any host is allowed here — evidence lives on arbitrary sites — but the
  // scheme is not negotiable, since this value ends up in an href.
  if (achievement.link !== "" && !parseHttpsUrl(achievement.link)) {
    errors.link = "Link must be a full https:// URL";
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
}

/** Returns undefined when the draft is valid. */
export function validateProfile(
  draft: ProfileDraft,
): ProfileErrors | undefined {
  const errors: ProfileErrors = {};

  const firstName = validateRequiredText(
    draft.firstName,
    "First name",
    NAME_MAX,
  );
  if (firstName) errors.firstName = firstName;

  const lastName = validateRequiredText(draft.lastName, "Surname", NAME_MAX);
  if (lastName) errors.lastName = lastName;

  const headline = validateOptionalText(draft.headline, "Headline", TEXT_MAX);
  if (headline) errors.headline = headline;

  const university = validateOptionalText(
    draft.university,
    "University",
    TEXT_MAX,
  );
  if (university) errors.university = university;

  const linkedin = validateProfileUrl(draft.linkedinUrl, ["linkedin.com"]);
  if (linkedin) errors.linkedinUrl = linkedin;

  const github = validateProfileUrl(draft.githubUrl, ["github.com"]);
  if (github) errors.githubUrl = github;

  const achievementErrors = draft.achievements.map(validateAchievement);
  if (achievementErrors.some(Boolean)) {
    errors.achievements = achievementErrors;
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
}
