import { describe, expect, it } from "vitest";
import { format } from "date-fns";
import { isFutureDateOnly, parseDateOnly } from "./dateOnly";

describe("date-only values", () => {
  it("parses a calendar date without UTC conversion", () => {
    const parsed = parseDateOnly("2026-07-20");
    expect(parsed).not.toBeNull();
    expect(format(parsed!, "yyyy-MM-dd")).toBe("2026-07-20");
    expect(parsed!.getHours()).toBe(0);
  });

  it("rejects malformed and impossible dates", () => {
    expect(parseDateOnly("20/07/2026")).toBeNull();
    expect(parseDateOnly("2026-02-30")).toBeNull();
    expect(parseDateOnly(null)).toBeNull();
  });

  it("detects future log dates by calendar day", () => {
    const today = new Date(2026, 6, 20, 23, 30);
    expect(isFutureDateOnly("2026-07-21", today)).toBe(true);
    expect(isFutureDateOnly("2026-07-20", today)).toBe(false);
    expect(isFutureDateOnly("2026-07-19", today)).toBe(false);
  });
});
