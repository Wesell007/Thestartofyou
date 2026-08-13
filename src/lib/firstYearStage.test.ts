import { describe, it, expect } from "vitest";
import { resolveFirstYearStage, BEYOND_FIRST_YEAR_NOTE } from "@/lib/firstYearStage";

const REF = new Date(2026, 7, 13); // 13 August 2026, local time

/** Build a `yyyy-MM-dd` date a given number of days before the reference. */
const daysBefore = (days: number): string => {
  const d = new Date(REF.getFullYear(), REF.getMonth(), REF.getDate() - days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/** Build a `yyyy-MM-dd` date a given number of months before the reference. */
const monthsBefore = (months: number): string => {
  const d = new Date(REF.getFullYear(), REF.getMonth() - months, REF.getDate());
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

describe("resolveFirstYearStage", () => {
  it("returns null for an unusable date", () => {
    expect(resolveFirstYearStage(null, REF)).toBeNull();
    expect(resolveFirstYearStage("", REF)).toBeNull();
    expect(resolveFirstYearStage("not-a-date", REF)).toBeNull();
  });

  it("treats the day of birth as newborn", () => {
    expect(resolveFirstYearStage(daysBefore(0), REF)?.stage).toBe("newborn");
  });

  it("holds newborn at 27 days and moves to baby at 28 days", () => {
    expect(resolveFirstYearStage(daysBefore(27), REF)?.stage).toBe("newborn");
    expect(resolveFirstYearStage(daysBefore(28), REF)?.stage).toBe("baby");
  });

  it("holds baby at 11 months and moves to older baby at 12 months", () => {
    expect(resolveFirstYearStage(monthsBefore(11), REF)?.stage).toBe("baby");
    expect(resolveFirstYearStage(monthsBefore(12), REF)?.stage).toBe("older_baby");
  });

  it("holds older baby at 23 months and moves to toddler at 24 months", () => {
    expect(resolveFirstYearStage(monthsBefore(23), REF)?.stage).toBe("older_baby");
    expect(resolveFirstYearStage(monthsBefore(24), REF)?.stage).toBe("toddler");
  });

  it("flags beyondFirstYear only from 12 completed months", () => {
    expect(resolveFirstYearStage(monthsBefore(11), REF)?.beyondFirstYear).toBe(false);
    expect(resolveFirstYearStage(monthsBefore(12), REF)?.beyondFirstYear).toBe(true);
    expect(resolveFirstYearStage(monthsBefore(30), REF)?.beyondFirstYear).toBe(true);
  });

  it("gives every stage a label and a description", () => {
    for (const dob of [daysBefore(1), daysBefore(60), monthsBefore(15), monthsBefore(30)]) {
      const info = resolveFirstYearStage(dob, REF);
      expect(info?.label.length).toBeGreaterThan(0);
      expect(info?.description.length).toBeGreaterThan(0);
    }
  });

  it("keeps the over-twelve-month note calm and non-blocking", () => {
    expect(BEYOND_FIRST_YEAR_NOTE).toContain("You are welcome to carry on.");
    expect(BEYOND_FIRST_YEAR_NOTE).not.toMatch(/cannot|not allowed|too old/i);
  });
});
