import { format } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";
import type { BabyInput } from "@/lib/firstYearJourney";

/**
 * Pure validation for the First Year setup flow. No routes, no labels,
 * no Supabase. The reference date is always injectable so tests stay honest.
 */

/** Matches the earliest date accepted by the babies date-of-birth trigger. */
export const MAX_AGE_IN_DAYS = 1826;

export const MAX_BABY_NAME_LENGTH = 60;

export const MIN_BABIES = 1;
export const MAX_BABIES = 4;

export type BabyDraft = {
  /** Optional name. Blank is valid and saves as null. */
  name: string;
};

export type FirstYearSetupDraft = {
  babyCount: number;
  dateOfBirth: string; // yyyy-MM-dd
  babies: BabyDraft[];
};

export type FirstYearSetupErrors = {
  dateOfBirth?: string;
  babyCount?: string;
  /** Keyed by row index. */
  names?: Record<number, string>;
};

export const createEmptyDraft = (): FirstYearSetupDraft => ({
  babyCount: 1,
  dateOfBirth: "",
  babies: [{ name: "" }],
});

/**
 * Resize the baby rows to match a new count, preserving the names already
 * typed in the rows that survive. Row position is birth order, so remaining
 * rows never get reordered when the count changes.
 */
export const setBabyCount = (
  draft: FirstYearSetupDraft,
  count: number,
): FirstYearSetupDraft => {
  const safeCount = Math.min(MAX_BABIES, Math.max(MIN_BABIES, Math.trunc(count)));
  const babies = Array.from({ length: safeCount }, (_, index) => ({
    name: draft.babies[index]?.name ?? "",
  }));
  return { ...draft, babyCount: safeCount, babies };
};

export const setBabyName = (
  draft: FirstYearSetupDraft,
  index: number,
  name: string,
): FirstYearSetupDraft => ({
  ...draft,
  babies: draft.babies.map((baby, i) => (i === index ? { ...baby, name } : baby)),
});

/** Validate a draft. Returns an empty object when the draft is ready to save. */
export const validateDraft = (
  draft: FirstYearSetupDraft,
  reference: Date = new Date(),
): FirstYearSetupErrors => {
  const errors: FirstYearSetupErrors = {};

  if (
    !Number.isInteger(draft.babyCount) ||
    draft.babyCount < MIN_BABIES ||
    draft.babyCount > MAX_BABIES ||
    draft.babies.length !== draft.babyCount
  ) {
    errors.babyCount = "Please choose between one and four babies.";
  }

  if (!draft.dateOfBirth) {
    errors.dateOfBirth = "Please add a date of birth.";
  } else {
    const parsed = parseDateOnly(draft.dateOfBirth);
    if (!parsed) {
      errors.dateOfBirth = "Please add a valid date of birth.";
    } else {
      const today = format(reference, "yyyy-MM-dd");
      const earliest = format(
        new Date(reference.getTime() - MAX_AGE_IN_DAYS * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd",
      );
      if (draft.dateOfBirth > today) {
        errors.dateOfBirth = "A date of birth cannot be in the future.";
      } else if (draft.dateOfBirth < earliest) {
        errors.dateOfBirth = "That date of birth is a little too far in the past.";
      }
    }
  }

  const names: Record<number, string> = {};
  draft.babies.forEach((baby, index) => {
    if (baby.name.trim().length > MAX_BABY_NAME_LENGTH) {
      names[index] = `Please use ${MAX_BABY_NAME_LENGTH} characters or fewer.`;
    }
  });
  if (Object.keys(names).length > 0) errors.names = names;

  return errors;
};

export const isDraftValid = (
  draft: FirstYearSetupDraft,
  reference: Date = new Date(),
): boolean => Object.keys(validateDraft(draft, reference)).length === 0;

/**
 * Build the RPC payload. Birth order follows row position, so the first row
 * is birth order 1 and becomes the primary baby server-side.
 */
export const buildBabyPayload = (draft: FirstYearSetupDraft): BabyInput[] =>
  draft.babies.slice(0, draft.babyCount).map((baby, index) => ({
    date_of_birth: draft.dateOfBirth,
    name: baby.name.trim() ? baby.name.trim() : null,
    birth_order: index + 1,
  }));

/** Turn any save failure into a calm sentence. Never surface Postgres text. */
export const friendlySaveError = (): string =>
  "We could not save this just now. Please try again in a moment.";
