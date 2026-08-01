import { describe, expect, it } from "vitest";
import {
  buildCompanionContext,
  trimesterLabel,
  COMPANION_CONTEXT_MAX_LENGTH,
} from "./companionContext";

describe("buildCompanionContext", () => {
  it("includes week and trimester", () => {
    const ctx = buildCompanionContext({ week: 20 });
    expect(ctx).toContain("Pregnancy week 20");
    expect(ctx).toContain("second trimester");
  });

  it("includes only the day and month of the due date", () => {
    const ctx = buildCompanionContext({ week: 12, dueDate: new Date(2026, 2, 9) });
    expect(ctx).toContain("9 March");
    expect(ctx).not.toContain("2026");
  });

  it("adds a tone hint when a tone is saved", () => {
    expect(buildCompanionContext({ week: 8, tone: "practical" })).toContain(
      "practical",
    );
    expect(buildCompanionContext({ week: 8 })).not.toContain("Prefers");
  });

  it("includes the My Week page hint by default", () => {
    expect(buildCompanionContext({ week: 8 })).toContain("My Week");
  });

  it("never includes identifying or memory data", () => {
    const ctx = buildCompanionContext({
      week: 30,
      dueDate: new Date(2026, 5, 1),
      tone: "warm",
    });
    for (const forbidden of ["reflection", "photo", "video", "voice", "http"]) {
      expect(ctx.toLowerCase()).not.toContain(forbidden);
    }
  });

  it("clamps to the 500 character cap", () => {
    const ctx = buildCompanionContext({
      week: 10,
      pageHint: "x".repeat(900),
    });
    expect(ctx.length).toBeLessThanOrEqual(COMPANION_CONTEXT_MAX_LENGTH);
  });

  it("clamps out-of-range weeks", () => {
    expect(buildCompanionContext({ week: 99 })).toContain("week 42");
    expect(buildCompanionContext({ week: 0 })).toContain("week 1");
  });

  it("labels trimesters at the boundaries", () => {
    expect(trimesterLabel(12)).toBe("first trimester");
    expect(trimesterLabel(13)).toBe("second trimester");
    expect(trimesterLabel(28)).toBe("third trimester");
    expect(trimesterLabel(41)).toBe("past their due date");
  });
});
