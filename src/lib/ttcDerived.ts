import { addDays, differenceInCalendarDays } from "date-fns";

/**
 * Shared TTC derived-date helpers.
 *
 * Kept isolated from the ovulation calculator's inline formulas in this phase
 * to avoid altering existing calculator behaviour. Both surfaces (calculator
 * result stash and setup form) compute the same values from these helpers.
 */

export type TTCDerivedDates = {
  likely_ovulation_date: Date;
  fertile_window_start: Date;
  fertile_window_end: Date;
  expected_period_date: Date;
  possible_test_date: Date;
};

export const deriveTTCDates = (
  lastPeriodDate: Date,
  cycleLengthDays: number,
): TTCDerivedDates => {
  const likely_ovulation_date = addDays(lastPeriodDate, cycleLengthDays - 14);
  return {
    likely_ovulation_date,
    fertile_window_start: addDays(likely_ovulation_date, -5),
    fertile_window_end: addDays(likely_ovulation_date, 1),
    expected_period_date: addDays(lastPeriodDate, cycleLengthDays),
    possible_test_date: addDays(likely_ovulation_date, 15),
  };
};

export type TTCStage =
  | "before_ovulation"
  | "fertile_window"
  | "likely_ovulation"
  | "two_week_wait"
  | "test_window"
  | "expected_period";

/**
 * Gentle estimate only. Never displayed as certainty.
 */
export const computeTTCStage = (today: Date, d: TTCDerivedDates): TTCStage => {
  const t = today.getTime();
  if (t >= d.expected_period_date.getTime()) return "expected_period";
  if (t >= d.possible_test_date.getTime()) return "test_window";
  if (t > d.fertile_window_end.getTime()) return "two_week_wait";
  if (
    t >= d.likely_ovulation_date.getTime() - 12 * 3600 * 1000 &&
    t <= d.likely_ovulation_date.getTime() + 12 * 3600 * 1000
  ) {
    return "likely_ovulation";
  }
  if (t >= d.fertile_window_start.getTime() && t <= d.fertile_window_end.getTime()) {
    return "fertile_window";
  }
  return "before_ovulation";
};

/**
 * Human-readable label for a TTC stage. Keep tone gentle — no clinical
 * or "safe/unsafe day" framing.
 */
export const stageLabel = (stage: TTCStage | string | null | undefined): string => {
  switch (stage) {
    case "before_ovulation":
      return "Before likely ovulation";
    case "fertile_window":
      return "Possible fertile window";
    case "likely_ovulation":
      return "Likely ovulation";
    case "two_week_wait":
      return "Two-week wait";
    case "test_window":
      return "Possible test window";
    case "expected_period":
      return "Expected period";
    default:
      return "Not set yet";
  }
};

/**
 * Display-only cycle day (1-indexed). Returns null if the last period date
 * is unknown or in the future.
 */
export const cycleDayFrom = (
  lastPeriodDate: Date | null | undefined,
  today: Date = new Date(),
): number | null => {
  if (!lastPeriodDate) return null;
  const diff = differenceInCalendarDays(today, lastPeriodDate);
  if (diff < 0) return null;
  return diff + 1;
};
