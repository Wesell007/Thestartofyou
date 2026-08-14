import { describe, expect, it } from "vitest";
import { getStageGuidance, isSurfaceableCopy } from "@/lib/firstYearStageGuidance";

const REF = new Date(2026, 0, 1);

const format = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

/** A `yyyy-MM-dd` date `days` before the reference date. */
const daysBefore = (days: number): string =>
  format(new Date(REF.getFullYear(), REF.getMonth(), REF.getDate() - days));

/** A `yyyy-MM-dd` date `months` before the reference date. */
const monthsBefore = (months: number): string =>
  format(new Date(REF.getFullYear(), REF.getMonth() - months, REF.getDate()));

const BANNED = [
  "milestone",
  "normal",
  "safe",
  "unsafe",
  "tracker",
  "score",
  "progress",
  "diagnosis",
  "symptom checker",
  "risk",
];

const surfacedText = (dob: string): string => {
  const g = getStageGuidance(dob, 1, REF);
  if (!g) return "";
  return [
    g.kicker,
    g.heading,
    g.intro,
    g.parentLine,
    g.parentLabel,
    ...g.cards.flatMap((c) => [c.title, c.detail]),
  ].join(" ");
};

describe("getStageGuidance", () => {
  it("returns nothing for a missing or unusable date of birth", () => {
    expect(getStageGuidance(null, 1, REF)).toBeNull();
    expect(getStageGuidance(undefined, 1, REF)).toBeNull();
    expect(getStageGuidance("not-a-date", 1, REF)).toBeNull();
  });

  it("shows the newborn stage at 3 days and at the 27 day boundary", () => {
    for (const days of [3, 27]) {
      const g = getStageGuidance(daysBefore(days), 1, REF)!;
      expect(g.heading).toBe("Your first weeks");
      expect(g.cards[0].href).toBe("/first-year/newborn");
      expect(g.parentHref).toBe("/first-year/postpartum-recovery");
    }
  });

  it("moves past newborn at 28 days and at 6 weeks", () => {
    for (const days of [28, 42]) {
      const g = getStageGuidance(daysBefore(days), 1, REF)!;
      expect(g.heading).toBe("Around one month");
      expect(g.cards[0].href).toBe("/first-year/1-month");
      expect(g.parentHref).toBe("/first-year/postpartum-recovery");
    }
  });

  it("uses the month guide at 5 months and 11 months", () => {
    const five = getStageGuidance(monthsBefore(5), 1, REF)!;
    expect(five.heading).toBe("Around five months");
    expect(five.cards[0].href).toBe("/first-year/5-months");
    expect(five.parentHref).toBe("/first-year/emotional-wellbeing");

    const eleven = getStageGuidance(monthsBefore(11), 1, REF)!;
    expect(eleven.heading).toBe("Around eleven months");
    expect(eleven.cards[0].href).toBe("/first-year/11-months");
    expect(eleven.cards).toHaveLength(3);
  });

  it("clamps to the past the first year view from 12 months onwards", () => {
    for (const months of [12, 13, 24, 30]) {
      const g = getStageGuidance(monthsBefore(months), 1, REF)!;
      expect(g.heading).toBe("Past the first year");
      expect(g.intro).toContain("built around the first twelve months");
      expect(g.cards).toHaveLength(2);
      expect(g.cards.map((c) => c.href)).toEqual([
        "/first-year/12-months",
        "/first-year/checkups-and-warning-signs",
      ]);
    }
  });

  it("uses one shared section for multiples", () => {
    const shared = getStageGuidance(daysBefore(10), 2, REF)!;
    expect(shared.parentLine).toContain("your babies");
    expect(shared.cards).toHaveLength(3);

    // Different dates of birth: v1 uses the first baby's date only.
    const first = getStageGuidance(monthsBefore(3), 2, REF)!;
    expect(first.heading).toBe("Around three months");
  });

  it("keeps banned words out of every surfaced string", () => {
    const samples = [
      daysBefore(3),
      daysBefore(28),
      ...Array.from({ length: 12 }, (_, i) => monthsBefore(i)),
      monthsBefore(13),
      monthsBefore(30),
    ];
    for (const dob of samples) {
      const text = surfacedText(dob).toLowerCase();
      for (const word of BANNED) {
        expect(new RegExp(`\\b${word}\\b`).test(text), `${word} in ${dob}`).toBe(false);
      }
    }
  });

  it("flags unsuitable copy in the guard", () => {
    expect(isSurfaceableCopy("A calm read.")).toBe(true);
    expect(isSurfaceableCopy("That is normal.")).toBe(false);
    expect(isSurfaceableCopy(undefined)).toBe(false);
  });
});
