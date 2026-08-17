import { describe, expect, it } from "vitest";
import {
  FIRST_YEAR_CONTEXT_MAX_LENGTH,
  buildFirstYearCompanionContext,
  firstYearAgeBand,
} from "@/lib/firstYearCompanionContext";

const reference = new Date(2026, 5, 1);

const dobDaysBefore = (days: number) => {
  const d = new Date(2026, 5, 1);
  d.setDate(d.getDate() - days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
};

describe("firstYearAgeBand", () => {
  it("returns null for an unusable date of birth", () => {
    expect(firstYearAgeBand(null, reference)).toBeNull();
    expect(firstYearAgeBand("not-a-date", reference)).toBeNull();
  });

  it("uses the first few weeks up to day 27", () => {
    expect(firstYearAgeBand(dobDaysBefore(0), reference)).toBe(
      "Baby is in the first few weeks.",
    );
    expect(firstYearAgeBand(dobDaysBefore(27), reference)).toBe(
      "Baby is in the first few weeks.",
    );
  });

  it("moves through coarse bands only", () => {
    expect(firstYearAgeBand("2026-04-20", reference)).toBe(
      "Baby is around one to three months old.",
    );
    expect(firstYearAgeBand("2026-01-01", reference)).toBe(
      "Baby is around three to six months old.",
    );
    expect(firstYearAgeBand("2025-10-01", reference)).toBe(
      "Baby is around six to nine months old.",
    );
    expect(firstYearAgeBand("2025-07-01", reference)).toBe(
      "Baby is around nine to twelve months old.",
    );
    expect(firstYearAgeBand("2024-01-01", reference)).toBe(
      "The child is past twelve months.",
    );
  });
});

describe("buildFirstYearCompanionContext", () => {
  /** A date of birth roughly four months ago, relative to today. */
  const fourMonthsAgo = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - 4);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  };

  it("includes only coarse stage facts", () => {
    const context = buildFirstYearCompanionContext({
      dateOfBirth: fourMonthsAgo(),
      babyCount: 2,
      tone: "warm",
    });
    expect(context).toContain("First year after birth.");
    expect(context).toContain("three to six months");
    expect(context).toContain("Stage:");
    expect(context).toContain("More than one baby");
    expect(context).toContain("warm, gentle wording");
  });

  it("never carries a date of birth or private content", () => {
    const context = buildFirstYearCompanionContext({
      dateOfBirth: fourMonthsAgo(),
      babyCount: 1,
      tone: "calm",
    });
    expect(context).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(context).not.toMatch(/note|memory|photo|chapter/i);
  });

  it("works without a date of birth", () => {
    const context = buildFirstYearCompanionContext({});
    expect(context).toContain("First year after birth.");
    expect(context).not.toContain("Stage:");
  });

  it("stays within the shared context limit", () => {
    const context = buildFirstYearCompanionContext({
      dateOfBirth: fourMonthsAgo(),
      babyCount: 4,
      tone: "practical",
      pageHint: "x".repeat(600),
    });
    expect(context.length).toBeLessThanOrEqual(FIRST_YEAR_CONTEXT_MAX_LENGTH);
  });
});

