/**
 * AIC-JA2 — the server-side port of the canonical pregnancy-week derivation.
 *
 * Edge functions cannot import from `src/`, so this is a deliberate one-to-one
 * port of `src/lib/pregnancyWeek.ts` — the same clamp, the same
 * "whole weeks since LMP, plus one" formula. It is NOT a second, independent
 * calculation: `src/test/journalPregnancyWeekParity.test.ts` imports both this
 * module and the browser one and asserts identical output across a long sweep
 * of dates, so the two can never drift apart unnoticed.
 *
 * Day counting is done on UTC calendar days, which matches the date-only
 * `lmp_date` column the value is derived from.
 */

export const MIN_PREGNANCY_WEEK = 1;
export const MAX_PREGNANCY_WEEK = 42;

const DAY_MS = 86_400_000;

const utcMidnight = (value: Date): number =>
  Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());

/** Pregnancy week from the last menstrual period date. Clamped to 1-42. */
export const pregnancyWeekFromLmp = (lmp: Date, reference: Date): number => {
  const days = Math.floor((utcMidnight(reference) - utcMidnight(lmp)) / DAY_MS);
  return Math.min(
    Math.max(Math.floor(days / 7) + 1, MIN_PREGNANCY_WEEK),
    MAX_PREGNANCY_WEEK,
  );
};
