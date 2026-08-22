import { describe, expect, it } from "vitest";
import {
  askButtonLabelFor,
  askHeadingFor,
  buildTTCAskContext,
  ttcAskChipsFor,
  ttcAskTopicFor,
  TTC_ASK_CHIPS,
  TTC_ASK_CONTEXT_MAX_LENGTH,
  TTC_ASK_TOPICS,
} from "./ttcAskContext";

const FULL = {
  stage: "two_week_wait" as const,
  cycleDay: 22,
  momentId: "two_week_wait" as const,
  possibleTestDate: new Date(2026, 7, 30),
  expectedPeriodDate: new Date(2026, 7, 28),
  hasRecentUnclearOrNegativeTest: true,
  hasRecentPeriodStarted: false,
};

describe("buildTTCAskContext", () => {
  it("stays inside the shared 500 character cap", () => {
    expect(buildTTCAskContext(FULL).length).toBeLessThanOrEqual(
      TTC_ASK_CONTEXT_MAX_LENGTH,
    );
  });

  it("includes only coarse cycle facts", () => {
    const context = buildTTCAskContext(FULL);
    expect(context).toContain("day 22");
    expect(context).toContain("30 August");
    expect(context).toContain("estimates");
  });

  it("never carries a year, an identifier, an email or note text", () => {
    const context = buildTTCAskContext(FULL);
    expect(context).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(context).not.toMatch(/@/);
    expect(context).not.toMatch(/[0-9a-f]{8}-[0-9a-f]{4}/i);
  });

  it("reduces log-derived facts to booleans, never row content", () => {
    const withTest = buildTTCAskContext(FULL);
    const withoutTest = buildTTCAskContext({
      ...FULL,
      hasRecentUnclearOrNegativeTest: false,
    });
    expect(withTest).toContain("negative or unclear");
    expect(withoutTest).not.toContain("negative or unclear");
  });

  it("handles an empty journey without inventing detail", () => {
    const context = buildTTCAskContext({ stage: null });
    expect(context).toContain("trying to conceive journey");
    expect(context).not.toContain("day");
  });
});

describe("chip ordering", () => {
  it("keeps a fixed, safe chip set and only reorders it", () => {
    for (const moment of [
      "two_week_wait",
      "possible_test_day",
      "after_test_result",
      "period_arrived",
    ] as const) {
      const chips = ttcAskChipsFor(null, moment, TTC_ASK_CHIPS.length);
      expect(chips).toHaveLength(TTC_ASK_CHIPS.length);
      for (const chip of chips) expect(TTC_ASK_CHIPS).toContain(chip);
    }
  });

  it("leads with the moment chip", () => {
    expect(ttcAskChipsFor(null, "two_week_wait")[0].label).toBe(
      "Help me through the wait",
    );
    expect(ttcAskChipsFor(null, "after_test_result")[0].label).toBe(
      "My test was negative",
    );
    expect(ttcAskChipsFor(null, "period_arrived")[0].label).toBe("My period arrived");
    expect(ttcAskChipsFor(null, "possible_test_day")[0].label).toBe("Testing timing");
  });

  it("falls back to the stage when no moment is active", () => {
    expect(ttcAskChipsFor("test_window", null)[0].label).toBe("Testing timing");
    expect(ttcAskChipsFor(null, null)).toHaveLength(4);
  });

  it("only uses approved Ask topics", () => {
    for (const chip of TTC_ASK_CHIPS) {
      expect(TTC_ASK_TOPICS).toContain(chip.topic);
    }
    expect(TTC_ASK_TOPICS).toContain(ttcAskTopicFor("fertile_window", null));
    expect(ttcAskTopicFor(null, "after_test_result")).toBe("pregnancy-tests");
  });
});

describe("companion naming copy", () => {
  it("uses the chosen name when one exists", () => {
    expect(askHeadingFor("Ava")).toBe("Ask Ava about this part");
    expect(askButtonLabelFor("Ava")).toBe("Ask Ava");
  });

  it("uses neutral fallbacks and never a hardcoded name", () => {
    expect(askHeadingFor(null)).toBe("Ask about this part");
    expect(askButtonLabelFor(null)).toBe("Ask your companion");
    expect(askHeadingFor(null)).not.toMatch(/cindy/i);
    expect(askButtonLabelFor(null)).not.toMatch(/cindy/i);
  });
});
