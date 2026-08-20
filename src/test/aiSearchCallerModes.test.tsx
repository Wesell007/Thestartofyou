import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Phase 26I wires only the Today recap to a stricter mode. Every other Cindy
 * surface must keep its two-argument call so the endpoint resolves `general`
 * and their behaviour is unchanged.
 */
const read = (file: string) => readFileSync(path.resolve(process.cwd(), file), "utf8");

const UNCHANGED_CALLERS = [
  "src/components/firstyear/journey/FirstYearAskCompanion.tsx",
  "src/components/myweek/SectionAskAI.tsx",
  "src/pages/AskPage.tsx",
  "src/components/pregnancy/PublicWeekReflectionAsk.tsx",
];

describe("AI mode callers", () => {
  it("only the Today recap card passes a mode", () => {
    const card = read("src/components/firstyear/today/DaySummaryCard.tsx");
    expect(card).toContain('ask(query, context, { mode: "first_year_day_recap" })');
  });

  it("leaves the other Cindy surfaces on the default behaviour", () => {
    for (const file of UNCHANGED_CALLERS) {
      expect(read(file)).not.toMatch(/mode:\s*"(first_year|pregnancy_week)/);
    }
  });
});
