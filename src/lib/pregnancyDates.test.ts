import { describe, expect, it } from "vitest";
import { adjustLmpForCycle, estimatedLmpFromUltrasound, isPlausiblePregnancyStart } from "./pregnancyDates";

describe("pregnancy date calculations", () => {
  it("moves the estimated LMP later for a longer cycle", () => {
    expect(adjustLmpForCycle(new Date(2026, 0, 1), 35)).toEqual(new Date(2026, 0, 8));
  });

  it("moves the estimated LMP earlier for a shorter cycle", () => {
    expect(adjustLmpForCycle(new Date(2026, 0, 8), 21)).toEqual(new Date(2026, 0, 1));
  });

  it("uses ultrasound weeks and extra days", () => {
    expect(estimatedLmpFromUltrasound(new Date(2026, 3, 1), 12, 5)).toEqual(new Date(2026, 0, 2));
  });

  it("rejects future and implausibly old starts", () => {
    const now = new Date(2026, 6, 20, 12);
    expect(isPlausiblePregnancyStart(new Date(2026, 6, 21), now)).toBe(false);
    expect(isPlausiblePregnancyStart(new Date(2025, 8, 1), now)).toBe(false);
    expect(isPlausiblePregnancyStart(new Date(2026, 0, 1), now)).toBe(true);
  });
});
