/**
 * Shapes and validation for First Year daily check-in entries.
 *
 * Pure: no Supabase, no implicit `Date.now()` where a reference can be passed.
 * Dates are always local calendar dates. `toISOString()` is deliberately never
 * used here because it can shift a parent's "today" across a timezone boundary.
 */

import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";

export type EntryLane = "baby" | "parent";

export const BABY_KINDS = ["rhythm", "feeding", "sleep", "nappies"] as const;
export const PARENT_KINDS = ["recovery", "wellbeing", "rest_support", "question"] as const;

export type BabyKind = (typeof BABY_KINDS)[number];
export type ParentKind = (typeof PARENT_KINDS)[number];
export type EntryKind = BabyKind | ParentKind;

export const NOTE_MAX_LENGTH = 2000;
export const MAX_TAGS = 8;
export const TAG_MAX_LENGTH = 40;

/** Lane a kind belongs to. Kinds never cross lanes. */
export const laneForKind = (kind: EntryKind): EntryLane =>
  (BABY_KINDS as readonly string[]).includes(kind) ? "baby" : "parent";

export const isBabyKind = (kind: EntryKind): kind is BabyKind => laneForKind(kind) === "baby";

/** Human labels used in the UI and in the recent-notes list. */
export const KIND_LABELS: Record<EntryKind, string> = {
  rhythm: "Rhythm today",
  feeding: "Feeding",
  sleep: "Sleep",
  nappies: "Nappies",
  recovery: "Recovery",
  wellbeing: "Emotional wellbeing",
  rest_support: "Rest and support",
  question: "Question to ask",
};

/** Today's local calendar date as `yyyy-MM-dd`. Never UTC. */
export const localDateKey = (reference: Date = new Date()): string =>
  format(reference, "yyyy-MM-dd");

export type EntryDraft = {
  lane: EntryLane;
  kind: EntryKind;
  babyId: string | null;
  entryDate: string;
  note: string;
  tags?: string[];
  answered?: boolean;
};

export type ValidationResult = { ok: true; note: string; tags: string[] } | { ok: false; message: string };

/** Trim and cap tags the same way the database trigger does. */
export const normaliseTags = (tags: string[] | undefined): string[] =>
  (tags ?? [])
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, MAX_TAGS);

/**
 * Validate a draft before it reaches the database. Mirrors the server rules so
 * a parent sees calm wording rather than a database message.
 */
export const validateEntryDraft = (
  draft: EntryDraft,
  options: { earliestDateOfBirth?: string | null; today?: string } = {},
): ValidationResult => {
  const note = draft.note.trim();
  if (note.length === 0) {
    return { ok: false, message: "There is nothing to save yet." };
  }
  if (note.length > NOTE_MAX_LENGTH) {
    return { ok: false, message: `Please keep this under ${NOTE_MAX_LENGTH} characters.` };
  }

  const tags = normaliseTags(draft.tags);
  if (tags.some((tag) => tag.length > TAG_MAX_LENGTH)) {
    return { ok: false, message: "Tags need to be short labels." };
  }

  if (!parseDateOnly(draft.entryDate)) {
    return { ok: false, message: "That date could not be read." };
  }

  const expectedLane = laneForKind(draft.kind);
  if (draft.lane !== expectedLane) {
    return { ok: false, message: "That note could not be saved." };
  }
  if (expectedLane === "baby" && !draft.babyId) {
    return { ok: false, message: "Please choose which baby this note is for." };
  }
  if (expectedLane === "parent" && draft.babyId) {
    return { ok: false, message: "A note about you is saved for your journey, not a baby." };
  }

  const today = options.today ?? localDateKey();
  if (draft.entryDate > today) {
    return { ok: false, message: "You can only save notes for today or a day that has passed." };
  }

  const dob = options.earliestDateOfBirth;
  if (dob && draft.entryDate < dob) {
    return { ok: false, message: "A note cannot be saved for a day before your baby was born." };
  }

  return { ok: true, note, tags };
};
