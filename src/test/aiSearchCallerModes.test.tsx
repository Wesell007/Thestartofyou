import { describe, expect, it } from "vitest";
import daySummaryCardSource from "@/components/firstyear/today/DaySummaryCard.tsx?raw";
import firstYearAskSource from "@/components/firstyear/journey/FirstYearAskCompanion.tsx?raw";
import weekAskSource from "@/components/myweek/SectionAskAI.tsx?raw";
import askPageSource from "@/pages/AskPage.tsx?raw";
import publicWeekAskSource from "@/components/pregnancy/PublicWeekReflectionAsk.tsx?raw";

/**
 * Phase 26I wires only the Today recap to a stricter mode. Every other companion
 * surface must keep its two-argument call so the endpoint resolves `general`
 * and their behaviour is unchanged.
 */
const UNCHANGED_CALLERS = [
  firstYearAskSource,
  weekAskSource,
  askPageSource,
  publicWeekAskSource,
];

describe("AI mode callers", () => {
  it("no longer runs the Today recap as its own AI surface (AIC-J4 closure)", () => {
    expect(daySummaryCardSource).not.toContain("useAISearch");
    expect(daySummaryCardSource).not.toContain("mode: \"first_year_day_recap\"");
  });

  it("leaves the other companion surfaces on the default behaviour", () => {
    for (const source of UNCHANGED_CALLERS) {
      expect(source).not.toMatch(/mode:\s*"(first_year|pregnancy_week)/);
    }
  });
});
