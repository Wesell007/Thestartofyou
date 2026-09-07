import { describe, expect, it, vi } from "vitest";

import { decideSafety } from "../../supabase/functions/_shared/safetyRouter.ts";
import {
  assessEnrichmentText,
  filterBackgroundEntries,
  ENRICHMENT_TEXT_MAX_LENGTH,
} from "../../supabase/functions/_shared/enrichmentSafety.ts";
import { buildDaySummaryQuery } from "@/lib/firstYearDaySummaryPrompt";

const SAFE_NOTE = "Slept better after the afternoon nap and took a full feed.";
const CRISIS_NOTE = "I keep thinking about hurting myself";
const RED_NOTE = "I have not felt my baby move since yesterday";

describe("AIC-JA-S1 — current question stays first", () => {
  it("keeps the existing terminal decision for a current crisis question", () => {
    expect(decideSafety(CRISIS_NOTE)).toMatchObject({ state: "crisis" });
  });

  it("keeps the existing terminal decision for a current red-flag question", () => {
    expect(decideSafety(RED_NOTE)).toMatchObject({ state: "red" });
  });

  it("classifies explicit day-recap content because it travels inside the question", () => {
    const safeRecap = buildDaySummaryQuery({
      day: "Monday 1 September",
      counts: "3 feeds",
      lines: [{ core: "09:00 feed", moment: SAFE_NOTE }],
    });
    expect(decideSafety(safeRecap).state).toBe("green");

    const urgentRecap = buildDaySummaryQuery({
      day: "Monday 1 September",
      counts: "3 feeds",
      lines: [{ core: "09:00 note", moment: CRISIS_NOTE }],
    });
    expect(urgentRecap).toContain("hurting myself");
    expect(decideSafety(urgentRecap).state).not.toBe("green");
  });
});

describe("AIC-JA-S1 — background enrichment pre-flight", () => {
  it("allows safe background text", () => {
    expect(assessEnrichmentText(SAFE_NOTE)).toEqual({ usable: true });
  });

  it("drops risky background text instead of escalating", () => {
    expect(assessEnrichmentText(CRISIS_NOTE)).toEqual({ usable: false });
    expect(assessEnrichmentText(RED_NOTE)).toEqual({ usable: false });
  });

  it("exposes no safety state, reason or category", () => {
    expect(Object.keys(assessEnrichmentText(CRISIS_NOTE))).toEqual(["usable"]);
  });

  it("fails closed on empty, non-string and over-long input", () => {
    expect(assessEnrichmentText("")).toEqual({ usable: false });
    expect(assessEnrichmentText("   ")).toEqual({ usable: false });
    expect(assessEnrichmentText(null)).toEqual({ usable: false });
    expect(assessEnrichmentText(42)).toEqual({ usable: false });
    expect(assessEnrichmentText("a".repeat(ENRICHMENT_TEXT_MAX_LENGTH + 1))).toEqual({
      usable: false,
    });
  });

  it("filters a block per entry and keeps only the safe ones", () => {
    const kept = filterBackgroundEntries([
      { text: SAFE_NOTE },
      { text: CRISIS_NOTE },
      { text: "Long walk today, felt calmer afterwards." },
    ]);
    expect(kept.map((entry) => entry.text)).toEqual([
      SAFE_NOTE,
      "Long walk today, felt calmer afterwards.",
    ]);
  });

  it("returns an empty block rather than a terminal outcome when everything is risky", () => {
    expect(filterBackgroundEntries([{ text: CRISIS_NOTE }, { text: RED_NOTE }])).toEqual([]);
    expect(filterBackgroundEntries(null)).toEqual([]);
    expect(filterBackgroundEntries(undefined)).toEqual([]);
  });

  it("makes no model call and logs nothing", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("no calls"));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    assessEnrichmentText(CRISIS_NOTE);
    filterBackgroundEntries([{ text: SAFE_NOTE }, { text: CRISIS_NOTE }]);
    await Promise.resolve();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
