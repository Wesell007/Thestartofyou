/**
 * AIC-2 — the canonical pregnancy-week derivation.
 *
 * This is the exact formula already used verbatim by `MyWeek.tsx`,
 * `MyJourney.tsx` and `KeptChapter.tsx`. It is extracted here so companion
 * journey context derives the same week those pages show. Those three pages
 * are intentionally NOT refactored in AIC-2; their duplication is recorded as
 * backlog debt.
 */

import { differenceInDays } from "date-fns";

export const MIN_PREGNANCY_WEEK = 1;
export const MAX_PREGNANCY_WEEK = 42;

/** Pregnancy week from the last menstrual period date. Clamped to 1-42. */
export const pregnancyWeekFromLmp = (lmp: Date, reference: Date = new Date()): number => {
  const days = differenceInDays(reference, lmp);
  return Math.min(
    Math.max(Math.floor(days / 7) + 1, MIN_PREGNANCY_WEEK),
    MAX_PREGNANCY_WEEK,
  );
};

/** Trimester key for a pregnancy week, matching the existing trimester copy. */
export const trimesterFromWeek = (week: number): "first" | "second" | "third" => {
  if (week <= 12) return "first";
  if (week <= 27) return "second";
  return "third";
};
