import { describe, expect, it } from "vitest";
import { keptChapterNeedsReveal } from "@/lib/firstYearJourney";
import { isProtectedPath } from "@/lib/authIntent";

describe("keptChapterNeedsReveal", () => {
  it("shows a completed pregnancy chapter straight away", () => {
    expect(keptChapterNeedsReveal("given_birth")).toBe(false);
    expect(keptChapterNeedsReveal("active")).toBe(false);
    expect(keptChapterNeedsReveal(null)).toBe(false);
    expect(keptChapterNeedsReveal(undefined)).toBe(false);
  });

  it("keeps sensitive outcomes behind a reveal step", () => {
    expect(keptChapterNeedsReveal("pregnancy_loss")).toBe(true);
    expect(keptChapterNeedsReveal("no_longer_pregnant")).toBe(true);
    expect(keptChapterNeedsReveal("paused")).toBe(true);
  });
});

describe("pregnancy chapter route protection", () => {
  it("treats /my-pregnancy-chapter as protected", () => {
    expect(isProtectedPath("/my-pregnancy-chapter")).toBe(true);
  });
});
