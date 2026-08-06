import { createId } from "@/lib/id";
import {
  ACHIEVEMENT_TYPES,
  EMPTY_PROFILE,
  type Achievement,
  type ProfileDraft,
} from "./schema";

/**
 * Local draft persistence. Interim until the backend exists — holds only
 * user-entered profile data (no credentials or tokens). All reads are
 * shape-checked; malformed or foreign data is discarded.
 */

const STORAGE_KEY = "stealthhire.profile-draft.v1";

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asAchievement(value: unknown): Achievement | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const record = value as Record<string, unknown>;
  const type = ACHIEVEMENT_TYPES.find((t) => t === record.type);
  if (!type) return undefined;
  // A stored id is only a React key, so a missing or malformed one is
  // replaced rather than treated as corruption — drafts written before ids
  // existed still restore.
  const id = typeof record.id === "string" && record.id !== ""
    ? record.id
    : createId();
  return {
    id,
    type,
    title: asString(record.title),
    year: asString(record.year),
    link: asString(record.link),
  };
}

export function loadDraft(): ProfileDraft | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return undefined;
    const record = parsed as Record<string, unknown>;
    return {
      firstName: asString(record.firstName),
      lastName: asString(record.lastName),
      headline: asString(record.headline),
      university: asString(record.university),
      linkedinUrl: asString(record.linkedinUrl),
      githubUrl: asString(record.githubUrl),
      achievements: Array.isArray(record.achievements)
        ? record.achievements
            .map(asAchievement)
            .filter((a): a is Achievement => a !== undefined)
        : [],
    };
  } catch {
    return undefined;
  }
}

export function saveDraft(draft: ProfileDraft): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
}

export { EMPTY_PROFILE };
