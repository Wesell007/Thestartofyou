import { describe, expect, it } from "vitest";
import {
  buildWeekQuestions,
  buildWeeksToMonthsQuestion,
  monthsLabelForWeek,
} from "@/data/weekSupportContent";

describe("Phase 32E C007 — weeks to months context on week pages", () => {
  it("converts weeks into a rounded month label", () => {
    expect(monthsLabelForWeek(4)).toBe("about 1 month");
    expect(monthsLabelForWeek(20)).toBe("about 4½ months");
    expect(monthsLabelForWeek(40)).toBe("about 9 months");
    expect(monthsLabelForWeek(1)).toBe("under a month");
  });

  it("appends exactly one conversion question to every week", () => {
    for (let week = 1; week <= 42; week += 1) {
      const questions = buildWeekQuestions(week, [
        { q: "Is this normal?", a: "Usually, yes." },
      ]);
      const matches = questions.filter((q) => /how many months/i.test(q.q));
      expect(matches).toHaveLength(1);
      expect(questions[0].q).toBe("Is this normal?");
      expect(matches[0].answer).toContain("counted in weeks");
    }
  });

  it("does not duplicate the question when a week already answers it", () => {
    const questions = buildWeekQuestions(12, [
      { q: "How many months is 12 weeks?", a: "About three." },
    ]);
    expect(questions).toHaveLength(1);
  });

  it("keeps the conversion free of clinical claims", () => {
    const q = buildWeeksToMonthsQuestion(28);
    expect(q.readMore).toBeUndefined();
    expect(q.answer).not.toMatch(/should|risk|abnormal|diagnos/i);
  });
});
