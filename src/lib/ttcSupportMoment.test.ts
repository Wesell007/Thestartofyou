import { describe, expect, it } from "vitest";
import {
  ALL_TTC_SUPPORT_MOMENTS,
  computeTTCSupportMoment,
  supportMomentStrings,
} from "@/lib/ttcSupportMoment";
import type { TTCLog } from "@/lib/ttcLogs";

const TODAY = new Date("2026-03-10T09:00:00Z");

const log = (partial: Partial<TTCLog>): TTCLog =>
  ({
    id: Math.random().toString(36).slice(2),
    user_id: "user-1",
    journey_id: "journey-1",
    log_date: "2026-03-10",
    log_type: "note",
    value: null,
    notes: null,
    created_at: "2026-03-10T09:00:00Z",
    updated_at: "2026-03-10T09:00:00Z",
    ...partial,
  }) as TTCLog;

describe("computeTTCSupportMoment", () => {
  it("returns nothing when there is no stage and no logs", () => {
    expect(computeTTCSupportMoment({ stage: null, logs: [], today: TODAY })).toBeNull();
  });

  it("offers two-week wait support during the wait", () => {
    const moment = computeTTCSupportMoment({
      stage: "two_week_wait",
      logs: [],
      today: TODAY,
    });
    expect(moment?.id).toBe("two_week_wait");
  });

  it("offers test day support in the test window", () => {
    expect(
      computeTTCSupportMoment({ stage: "test_window", logs: [], today: TODAY })?.id,
    ).toBe("possible_test_day");
  });

  it.each(["negative", "unclear"])(
    "detects a recent %s pregnancy test",
    (value) => {
      const moment = computeTTCSupportMoment({
        stage: "two_week_wait",
        logs: [log({ log_type: "pregnancy_test", value, log_date: "2026-03-08" })],
        today: TODAY,
      });
      expect(moment?.id).toBe("after_test_result");
    },
  );

  it("ignores a test result that is no longer recent", () => {
    const moment = computeTTCSupportMoment({
      stage: "two_week_wait",
      logs: [
        log({ log_type: "pregnancy_test", value: "negative", log_date: "2026-02-01" }),
      ],
      today: TODAY,
    });
    expect(moment?.id).toBe("two_week_wait");
  });

  it("puts a recent period note above a recent test result", () => {
    const moment = computeTTCSupportMoment({
      stage: "test_window",
      logs: [
        log({ log_type: "pregnancy_test", value: "negative", log_date: "2026-03-08" }),
        log({ log_type: "period", value: "started", log_date: "2026-03-09" }),
      ],
      today: TODAY,
    });
    expect(moment?.id).toBe("period_arrived");
  });

  it("is suppressed entirely when a positive test has been noted", () => {
    const moment = computeTTCSupportMoment({
      stage: "test_window",
      logs: [
        log({ log_type: "pregnancy_test", value: "positive", log_date: "2026-03-09" }),
        log({ log_type: "period", value: "started", log_date: "2026-03-09" }),
      ],
      today: TODAY,
    });
    expect(moment).toBeNull();
  });

  it("does not change the saved cycle start in the period wording", () => {
    const moment = computeTTCSupportMoment({
      stage: "expected_period",
      logs: [log({ log_type: "period", value: "started", log_date: "2026-03-09" })],
      today: TODAY,
    });
    expect(moment?.note).toMatch(/saved cycle start stays as it is/i);
  });
});

describe("support moment copy", () => {
  const strings = ALL_TTC_SUPPORT_MOMENTS.flatMap(supportMomentStrings);

  it("uses no em dashes or en dashes", () => {
    strings.forEach((s) => expect(s).not.toMatch(/[—–]/));
  });

  it("avoids clinical or absolute wording", () => {
    const banned = /\b(normal|abnormal|guarantee|diagnos|prediction|infertile|failed|should have)\b/i;
    strings.forEach((s) => expect(s).not.toMatch(banned));
  });

  it("uses British spellings only", () => {
    const american = /\b(color|realize|analyze|favorite)\b/i;
    strings.forEach((s) => expect(s).not.toMatch(american));
  });
});

describe("support moment headings", () => {
  it("never repeats the Today card headline verbatim", () => {
    ALL_TTC_SUPPORT_MOMENTS.forEach((m) => {
      expect(m.heading).not.toBe(m.today.headline);
      expect(m.focus.heading).not.toBe(m.today.headline);
      expect(m.focus.heading).not.toBe(m.heading);
    });
  });
});
