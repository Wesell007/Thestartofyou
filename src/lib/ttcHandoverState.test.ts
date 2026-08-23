import { describe, expect, it } from "vitest";
import {
  computeTTCHandoverState,
  hasCurrentCyclePositiveTest,
  ttcHandoverStrings,
} from "@/lib/ttcHandoverState";
import type { TTCLog } from "@/lib/ttcLogs";

const log = (over: Partial<TTCLog>): TTCLog => ({
  id: "log-1",
  journey_id: "j-1",
  user_id: "u-1",
  log_date: "2026-03-10",
  log_type: "pregnancy_test",
  value: "positive",
  notes: "private note text",
  created_at: "2026-03-10T00:00:00Z",
  updated_at: "2026-03-10T00:00:00Z",
  ...over,
});

const CYCLE_START = "2026-03-01";

describe("computeTTCHandoverState", () => {
  it("is neutral when no pregnancy test log exists", () => {
    expect(
      computeTTCHandoverState({
        hasActivePregnancy: false,
        logs: [log({ log_type: "mood", value: "low" })],
        cycleStart: CYCLE_START,
      }),
    ).toBe("neutral");
  });

  it("is neutral for a negative or unclear test", () => {
    for (const value of ["negative", "unclear"]) {
      expect(
        computeTTCHandoverState({
          hasActivePregnancy: false,
          logs: [log({ value })],
          cycleStart: CYCLE_START,
        }),
      ).toBe("neutral");
    }
  });

  it("raises the handover for a current-cycle positive test", () => {
    expect(
      computeTTCHandoverState({
        hasActivePregnancy: false,
        logs: [log({})],
        cycleStart: CYCLE_START,
      }),
    ).toBe("positive_test_logged");
  });

  it("ignores a positive test from before the saved cycle start", () => {
    expect(
      computeTTCHandoverState({
        hasActivePregnancy: false,
        logs: [log({ log_date: "2026-02-04" })],
        cycleStart: CYCLE_START,
      }),
    ).toBe("neutral");
  });

  it("stays neutral when no cycle start is saved", () => {
    expect(
      hasCurrentCyclePositiveTest({ logs: [log({})], cycleStart: null }),
    ).toBe(false);
  });

  it("gives an active pregnancy precedence over a positive test", () => {
    expect(
      computeTTCHandoverState({
        hasActivePregnancy: true,
        logs: [log({})],
        cycleStart: CYCLE_START,
      }),
    ).toBe("active_pregnancy_exists");
  });

  it("returns a plain state and never note text", () => {
    const state = computeTTCHandoverState({
      hasActivePregnancy: false,
      logs: [log({})],
      cycleStart: CYCLE_START,
    });
    expect(typeof state).toBe("string");
    expect(state).not.toContain("private note text");
  });
});

describe("handover copy guardrails", () => {
  const banned = [
    "guaranteed",
    "confirmed pregnancy",
    "confirmed ovulation",
    "fertility score",
    "prediction",
    "predicts",
    "diagnosis",
    "risk",
    "normal",
    "abnormal",
    "unsafe",
    "score",
    "optimal",
    "ideal",
    "unlock",
    "upgrade",
    "performance",
    "success rate",
    "you are pregnant",
    "you are not pregnant",
    "congratulations",
    "failure",
    "failed cycle",
  ];

  it("avoids clinical, certain or pushy wording", () => {
    for (const line of ttcHandoverStrings()) {
      const lower = line.toLowerCase();
      for (const word of banned) {
        expect(lower.includes(word), `${line} contains ${word}`).toBe(false);
      }
    }
  });

  it("uses no em dashes", () => {
    for (const line of ttcHandoverStrings()) {
      expect(line.includes("—")).toBe(false);
    }
  });
});
