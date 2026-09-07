/**
 * AIC-JA2 — the server must not hold a second, independent pregnancy-week
 * formula. This sweeps a long range of dates through both the browser helper
 * and the edge-function port and asserts they never disagree.
 */
import { describe, expect, it } from "vitest";
import {
  MAX_PREGNANCY_WEEK,
  MIN_PREGNANCY_WEEK,
  pregnancyWeekFromLmp as clientWeek,
} from "@/lib/pregnancyWeek";
import {
  MAX_PREGNANCY_WEEK as SERVER_MAX,
  MIN_PREGNANCY_WEEK as SERVER_MIN,
  pregnancyWeekFromLmp as serverWeek,
} from "../../supabase/functions/_shared/pregnancyWeek";

const DAY = 86_400_000;

describe("pregnancy week parity between client and server", () => {
  it("shares the same clamp bounds", () => {
    expect(SERVER_MIN).toBe(MIN_PREGNANCY_WEEK);
    expect(SERVER_MAX).toBe(MAX_PREGNANCY_WEEK);
  });

  it("agrees on every day across a full pregnancy and beyond", () => {
    const lmp = new Date("2026-01-05T00:00:00.000Z");
    for (let day = -14; day <= 330; day += 1) {
      const reference = new Date(lmp.getTime() + day * DAY);
      expect(serverWeek(lmp, reference)).toBe(clientWeek(lmp, reference));
    }
  });

  it("agrees across many different LMP dates", () => {
    for (let offset = 0; offset < 120; offset += 1) {
      const lmp = new Date(Date.UTC(2025, 0, 1 + offset));
      const reference = new Date(Date.UTC(2026, 2, 3));
      expect(serverWeek(lmp, reference)).toBe(clientWeek(lmp, reference));
    }
  });

  it("stays inside the clamp", () => {
    const lmp = new Date("2026-01-05T00:00:00.000Z");
    expect(serverWeek(lmp, new Date("2020-01-01T00:00:00.000Z"))).toBe(MIN_PREGNANCY_WEEK);
    expect(serverWeek(lmp, new Date("2030-01-01T00:00:00.000Z"))).toBe(MAX_PREGNANCY_WEEK);
  });
});
