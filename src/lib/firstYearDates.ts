import { differenceInCalendarDays, differenceInMonths, isValid } from "date-fns";
import { parseDateOnly } from "@/lib/dateOnly";

/**
 * Derived first-year age. Pure: no Supabase, no implicit `Date.now()`.
 * The reference date is always injectable so tests and callers stay honest.
 */
export type FirstYearAge = {
  /** Completed days since birth. Never negative. */
  ageInDays: number;
  /** Completed weeks since birth. */
  ageInWeeks: number;
  /** Completed calendar months since birth, not days divided by 30. */
  ageInMonths: number;
  /** 0-11, mapping onto the existing first year month pages. Clamped. */
  firstYearMonthIndex: number;
  /** True until 12 completed calendar months. */
  isInFirstYear: boolean;
  /** True for the first 12 completed weeks after birth. */
  isEarlyPostpartum: boolean;
  /** 0-12 during the early postpartum window, otherwise null. */
  postpartumWeek: number | null;
};

const startOfDayLocal = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * Derive first-year and postpartum timings from a baby's date of birth.
 *
 * @param dateOfBirth `yyyy-MM-dd` calendar date, or a Date.
 * @param reference Reference date, defaulting to today.
 * @returns Derived age, or null when the date of birth is unusable.
 */
export const getFirstYearAge = (
  dateOfBirth: string | Date | null | undefined,
  reference: Date = new Date(),
): FirstYearAge | null => {
  const dob =
    typeof dateOfBirth === "string" ? parseDateOnly(dateOfBirth) : dateOfBirth ?? null;
  if (!dob || !isValid(dob) || !isValid(reference)) return null;

  const birth = startOfDayLocal(dob);
  const today = startOfDayLocal(reference);

  const ageInDays = Math.max(0, differenceInCalendarDays(today, birth));
  const ageInWeeks = Math.floor(ageInDays / 7);
  const ageInMonths = Math.max(0, differenceInMonths(today, birth));

  const isInFirstYear = ageInMonths < 12;
  const firstYearMonthIndex = Math.min(11, Math.max(0, ageInMonths));
  const isEarlyPostpartum = ageInWeeks <= 12;

  return {
    ageInDays,
    ageInWeeks,
    ageInMonths,
    firstYearMonthIndex,
    isInFirstYear,
    isEarlyPostpartum,
    postpartumWeek: isEarlyPostpartum ? ageInWeeks : null,
  };
};
