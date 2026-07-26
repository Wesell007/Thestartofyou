/**
 * Companion personalisation — small, self-contained helpers.
 * No AI backend integration. Values are read from the profiles table and
 * used for display/copy only.
 */

export const SUGGESTED_NAMES = ["Cindy", "Ava", "Mia"] as const;

export type CompanionTone = "calm" | "practical" | "warm";

export const TONE_OPTIONS: { value: CompanionTone; label: string; hint: string }[] = [
  { value: "calm", label: "Calm", hint: "Quiet and steady" },
  { value: "practical", label: "Practical", hint: "Clear and useful" },
  { value: "warm", label: "Warm", hint: "Gentle and kind" },
];

/**
 * Whole-token, case-insensitive blocklist. A custom name is rejected if any
 * of its tokens (split on whitespace, hyphen or apostrophe) matches.
 */
export const NAME_BLOCKLIST: readonly string[] = [
  "doctor",
  "dr",
  "midwife",
  "nurse",
  "therapist",
  "consultant",
  "nhs",
  "gp",
  "psychologist",
  "psychiatrist",
  "clinician",
];

// Unicode letters (with combining marks), space, apostrophe, hyphen only.
const NAME_ALLOWED_REGEX = /^[\p{L}\p{M} '\-]+$/u;

export type ValidateResult =
  | { ok: true; value: string }
  | { ok: false; message: string };

export function validateCompanionName(raw: string): ValidateResult {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { ok: false, message: "Please enter a name or choose Skip." };
  }
  if (trimmed.length > 24) {
    return { ok: false, message: "Please keep it to 24 characters." };
  }
  if (!NAME_ALLOWED_REGEX.test(trimmed)) {
    return {
      ok: false,
      message: "Please use letters, spaces, apostrophes or hyphens only.",
    };
  }
  const tokens = trimmed
    .toLowerCase()
    .split(/[\s'\-]+/u)
    .filter(Boolean);
  if (tokens.some((token) => NAME_BLOCKLIST.includes(token))) {
    return { ok: false, message: "Please choose a different name." };
  }
  return { ok: true, value: trimmed };
}

export function isCompanionTone(value: unknown): value is CompanionTone {
  return value === "calm" || value === "practical" || value === "warm";
}

export function toneLabel(tone: CompanionTone): string {
  return TONE_OPTIONS.find((t) => t.value === tone)?.label ?? "Calm";
}
