import { describe, expect, it } from "vitest";
import { getFirstYearAge } from "@/lib/firstYearDates";

const at = (value: string) => new Date(`${value}T12:00:00`);

describe("getFirstYearAge", () => {
  it("returns null for unusable input", () => {
    expect(getFirstYearAge(null)).toBeNull();
    expect(getFirstYearAge("not-a-date")).toBeNull();
  });

  it("handles day 0", () => {
    const age = getFirstYearAge("2026-03-01", at("2026-03-01"));
    expect(age).toMatchObject({
      ageInDays: 0,
      ageInWeeks: 0,
      ageInMonths: 0,
      firstYearMonthIndex: 0,
      isInFirstYear: true,
      isEarlyPostpartum: true,
      postpartumWeek: 0,
    });
  });

  it("rolls from day 6 to day 7", () => {
    expect(getFirstYearAge("2026-03-01", at("2026-03-07"))?.ageInWeeks).toBe(0);
    expect(getFirstYearAge("2026-03-01", at("2026-03-08"))?.ageInWeeks).toBe(1);
  });

  it("covers the postpartum window edges at weeks 11, 12 and 13", () => {
    const week11 = getFirstYearAge("2026-01-01", at("2026-03-20"));
    expect(week11?.ageInWeeks).toBe(11);
    expect(week11?.postpartumWeek).toBe(11);

    const week12 = getFirstYearAge("2026-01-01", at("2026-03-27"));
    expect(week12?.ageInWeeks).toBe(12);
    expect(week12?.isEarlyPostpartum).toBe(true);
    expect(week12?.postpartumWeek).toBe(12);

    const week13 = getFirstYearAge("2026-01-01", at("2026-04-03"));
    expect(week13?.ageInWeeks).toBe(13);
    expect(week13?.isEarlyPostpartum).toBe(false);
    expect(week13?.postpartumWeek).toBeNull();
  });

  it("uses calendar months, not thirty day blocks", () => {
    expect(getFirstYearAge("2026-01-31", at("2026-02-28"))?.ageInMonths).toBe(0);
    expect(getFirstYearAge("2026-01-31", at("2026-03-31"))?.ageInMonths).toBe(2);
    expect(getFirstYearAge("2026-01-15", at("2026-04-14"))?.ageInMonths).toBe(2);
    expect(getFirstYearAge("2026-01-15", at("2026-04-15"))?.ageInMonths).toBe(3);
  });

  it("handles a leap day birth", () => {
    expect(getFirstYearAge("2024-02-29", at("2025-02-28"))?.ageInMonths).toBe(11);
    expect(getFirstYearAge("2024-02-29", at("2025-02-28"))?.isInFirstYear).toBe(true);
    expect(getFirstYearAge("2024-02-29", at("2025-03-01"))?.ageInMonths).toBe(12);
    expect(getFirstYearAge("2024-02-29", at("2025-03-01"))?.isInFirstYear).toBe(false);
  });

  it("closes the first year at twelve months", () => {
    const dayBefore = getFirstYearAge("2026-01-01", at("2026-12-31"));
    expect(dayBefore?.ageInMonths).toBe(11);
    expect(dayBefore?.isInFirstYear).toBe(true);
    expect(dayBefore?.firstYearMonthIndex).toBe(11);

    const onBirthday = getFirstYearAge("2026-01-01", at("2027-01-01"));
    expect(onBirthday?.ageInMonths).toBe(12);
    expect(onBirthday?.isInFirstYear).toBe(false);
  });

  it("clamps the month index past the first year", () => {
    const toddler = getFirstYearAge("2024-01-01", at("2026-06-01"));
    expect(toddler?.ageInMonths).toBe(29);
    expect(toddler?.firstYearMonthIndex).toBe(11);
    expect(toddler?.isInFirstYear).toBe(false);
  });

  it("never returns a negative age for a future date of birth", () => {
    const age = getFirstYearAge("2026-06-01", at("2026-03-01"));
    expect(age?.ageInDays).toBe(0);
    expect(age?.ageInMonths).toBe(0);
  });
});
