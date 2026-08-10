/**
 * Shapes and validation for First Year memories.
 *
 * A memory is a short written moment a parent chose to keep. It is never a
 * checklist item, a score or a tracked measurement.
 *
 * Pure: no Supabase, no implicit `Date.now()` where a reference can be passed.
 * Dates are always local calendar dates. `toISOString()` is deliberately never
 * used here because it can shift a parent's "today" across a timezone boundary.
 */

import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";

/** Who a kept moment belongs to. Mirrors the database check constraint. */
export const MEMORY_SCOPES = ["family", "baby", "all_babies"] as const;
export type MemoryScope = (typeof MEMORY_SCOPES)[number];

export const MEMORY_NOTE_MAX_LENGTH = 2000;
export const MEMORY_TITLE_MAX_LENGTH = 120;

/** Today's local calendar date as `yyyy-MM-dd`. Never UTC. */
export const localMemoryDateKey = (reference: Date = new Date()): string =>
  format(reference, "yyyy-MM-dd");

export type MemoryDraft = {
  scope: MemoryScope;
  babyId: string | null;
  memoryDate: string;
  title: string;
  note: string;
};

export type MemoryValidationResult =
  | { ok: true; scope: MemoryScope; babyId: string | null; note: string; title: string | null }
  | { ok: false; message: string };

export const isMemoryScope = (value: string): value is MemoryScope =>
  (MEMORY_SCOPES as readonly string[]).includes(value);

/**
 * Validate a draft before it reaches the database. Mirrors the server rules so
 * a parent sees warm wording rather than a database message.
 */
export const validateMemoryDraft = (
  draft: MemoryDraft,
  options: { earliestDateOfBirth?: string | null; today?: string } = {},
): MemoryValidationResult => {
  const note = draft.note.trim();
  if (note.length === 0) {
    return { ok: false, message: "There is nothing to keep yet." };
  }
  if (note.length > MEMORY_NOTE_MAX_LENGTH) {
    return { ok: false, message: `Please keep this under ${MEMORY_NOTE_MAX_LENGTH} characters.` };
  }

  const trimmedTitle = draft.title.trim();
  if (trimmedTitle.length > MEMORY_TITLE_MAX_LENGTH) {
    return { ok: false, message: `Please keep the title under ${MEMORY_TITLE_MAX_LENGTH} characters.` };
  }

  if (!isMemoryScope(draft.scope)) {
    return { ok: false, message: "That memory could not be saved." };
  }

  if (draft.scope === "baby" && !draft.babyId) {
    return { ok: false, message: "Please choose who this moment is for." };
  }
  if (draft.scope !== "baby" && draft.babyId) {
    return { ok: false, message: "That memory could not be saved." };
  }

  if (!parseDateOnly(draft.memoryDate)) {
    return { ok: false, message: "That date could not be read." };
  }

  const today = options.today ?? localMemoryDateKey();
  if (draft.memoryDate > today) {
    return { ok: false, message: "You can only keep a moment from today or a day that has passed." };
  }

  const dob = options.earliestDateOfBirth;
  if (dob && draft.memoryDate < dob) {
    return { ok: false, message: "A memory cannot be kept for a day before your baby was born." };
  }

  return {
    ok: true,
    scope: draft.scope,
    babyId: draft.scope === "baby" ? draft.babyId : null,
    note,
    title: trimmedTitle.length > 0 ? trimmedTitle : null,
  };
};

/** Month grouping key, e.g. `2026-08`. Local, never UTC. */
export const memoryMonthKey = (memoryDate: string): string => memoryDate.slice(0, 7);

/** Readable month heading, e.g. "August 2026". */
export const memoryMonthLabel = (memoryDate: string): string => {
  const parsed = parseDateOnly(memoryDate);
  return parsed ? format(parsed, "MMMM yyyy") : "Earlier";
};
