import { describe, expect, it } from "vitest";
import { buildWeekQuestionNavigation, weekReflectionDraftKey } from "@/lib/publicWeekInteraction";

describe("public week interaction helpers", () => {
  it("builds a contextual Ask destination", () => {
    const destination = buildWeekQuestionNavigation(12, " Can I exercise? ");

    expect(destination.to).toEqual({ pathname: "/ask", search: "?stage=pregnancy" });
    expect(destination.state).toEqual({ question: "Can I exercise?", context: "Pregnancy week 12" });
  });

  it("uses a separate reflection-draft key for every week", () => {
    expect(weekReflectionDraftKey(1)).toBe("tsoy:public-week-1:reflection-draft");
    expect(weekReflectionDraftKey(42)).toBe("tsoy:public-week-42:reflection-draft");
    expect(weekReflectionDraftKey(1)).not.toBe(weekReflectionDraftKey(2));
  });
});
