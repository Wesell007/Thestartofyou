import { describe, expect, it } from "vitest";
import {
  bankActiveSide,
  describeEvent,
  formatDuration,
  formatStopwatch,
  isRunningBreastFeed,
  liveFeedSeconds,
  normaliseNappyType,
  parseCareMetadata,
  summariseDay,
  toMillilitres,
  validateCareEventDraft,
  type CareEvent,
} from "@/lib/firstYearCareEventsSchema";

const NOW = new Date("2026-08-18T12:00:00");
const BABY = "11111111-1111-1111-1111-111111111111";

const draft = (overrides: Partial<Parameters<typeof validateCareEventDraft>[0]> = {}) => ({
  eventType: "feed" as const,
  babyId: BABY,
  occurredAt: new Date("2026-08-18T09:00:00"),
  feedMode: "bottle" as const,
  bottleType: "formula" as const,
  ...overrides,
});

const event = (overrides: Partial<CareEvent>): CareEvent => ({
  id: "event-id",
  baby_id: BABY,
  event_type: "feed",
  occurred_at: "2026-08-18T09:00:00.000Z",
  started_at: null,
  ended_at: null,
  amount_ml: null,
  side: null,
  nappy_type: null,
  feed_method: null,
  sleep_kind: null,
  note: null,
  metadata: {},
  updated_at: "2026-08-18T09:00:00.000Z",
  ...overrides,
});

describe("amounts", () => {
  it("leaves an empty amount empty", () => {
    expect(toMillilitres("", "ml")).toBeNull();
  });

  it("converts ounces to millilitres", () => {
    expect(toMillilitres("2", "oz")).toBeCloseTo(59.1, 1);
  });

  it("rejects a zero amount", () => {
    const result = validateCareEventDraft(draft({ amount: "0" }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("rejects an amount above the cap", () => {
    const result = validateCareEventDraft(draft({ amount: "2001" }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("accepts an amount within range", () => {
    const result = validateCareEventDraft(draft({ amount: "120" }), { now: NOW });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.payload.amount_ml).toBe(120);
  });
});

describe("feed mode", () => {
  it("asks for breast or bottle", () => {
    const result = validateCareEventDraft(draft({ feedMode: null, bottleType: null }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("asks what was in the bottle", () => {
    const result = validateCareEventDraft(draft({ bottleType: null }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("stores the bottle type in metadata", () => {
    const result = validateCareEventDraft(draft({ bottleType: "tube" }), { now: NOW });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.metadata.feed_mode).toBe("bottle");
      expect(result.payload.metadata.bottle_type).toBe("tube");
      expect(result.payload.started_at).toBeNull();
    }
  });

  it("totals a manual breast feed without treating it as running", () => {
    const result = validateCareEventDraft(
      draft({
        feedMode: "breast",
        bottleType: null,
        leftDurationSeconds: 480,
        rightDurationSeconds: 600,
      }),
      { now: NOW },
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.metadata.total_duration_seconds).toBe(1080);
      expect(result.payload.started_at).toBeNull();
      expect(result.payload.ended_at).toBeNull();
      expect(result.payload.side).toBe("both");
      expect(result.payload.amount_ml).toBeNull();
    }
  });

  it("refuses a side longer than the cap", () => {
    const result = validateCareEventDraft(
      draft({ feedMode: "breast", bottleType: null, leftDurationSeconds: 60 * 60 * 13 }),
      { now: NOW },
    );
    expect(result.ok).toBe(false);
  });
});

describe("nappies", () => {
  it("asks what was in the nappy", () => {
    const result = validateCareEventDraft(draft({ eventType: "nappy", nappyType: null }), {
      now: NOW,
    });
    expect(result.ok).toBe(false);
  });

  it("keeps poo detail only for poo nappies", () => {
    const result = validateCareEventDraft(
      draft({
        eventType: "nappy",
        nappyType: "wee",
        rashLevel: "little",
        pooTexture: "soft",
      }),
      { now: NOW },
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.metadata.rash_level).toBe("little");
      expect(result.payload.metadata.poo_texture).toBeUndefined();
    }
  });

  it("keeps poo detail for a poo nappy", () => {
    const result = validateCareEventDraft(
      draft({
        eventType: "nappy",
        nappyType: "poo",
        pooTexture: "runny",
        pooSize: "small",
        pooColour: "green",
      }),
      { now: NOW },
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.metadata.poo_texture).toBe("runny");
      expect(result.payload.metadata.poo_size).toBe("small");
      expect(result.payload.metadata.poo_colour).toBe("green");
    }
  });

  it("reads older wet and dirty rows", () => {
    expect(normaliseNappyType("wet")).toBe("wee");
    expect(normaliseNappyType("dirty")).toBe("poo");
  });
});

describe("notes", () => {
  it("requires words on a moment", () => {
    const result = validateCareEventDraft(draft({ eventType: "note", note: "   " }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("keeps notes optional on a feed", () => {
    expect(validateCareEventDraft(draft({ note: "" }), { now: NOW }).ok).toBe(true);
  });
});

describe("times", () => {
  it("refuses a future time", () => {
    const result = validateCareEventDraft(
      draft({ occurredAt: new Date("2026-08-18T18:00:00") }),
      { now: NOW },
    );
    expect(result.ok).toBe(false);
  });

  it("refuses an end time before the start", () => {
    const result = validateCareEventDraft(
      draft({
        eventType: "sleep",
        occurredAt: new Date("2026-08-18T09:00:00"),
        endedAt: new Date("2026-08-18T08:00:00"),
      }),
      { now: NOW },
    );
    expect(result.ok).toBe(false);
  });

  it("stores a sleep start on both columns", () => {
    const result = validateCareEventDraft(
      draft({
        eventType: "sleep",
        occurredAt: new Date("2026-08-18T09:00:00"),
        endedAt: new Date("2026-08-18T10:30:00"),
      }),
      { now: NOW },
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.payload.started_at).toBe(result.payload.occurred_at);
      expect(result.payload.ended_at).not.toBeNull();
    }
  });

  it("refuses a time before the baby was born", () => {
    const result = validateCareEventDraft(draft(), {
      now: NOW,
      dateOfBirth: "2026-08-20",
    });
    expect(result.ok).toBe(false);
  });
});

describe("breast timer", () => {
  const running = event({
    started_at: "2026-08-18T11:30:00.000Z",
    occurred_at: "2026-08-18T11:30:00.000Z",
    metadata: {
      feed_mode: "breast",
      active_side: "left",
      active_side_started_at: "2026-08-18T11:50:00.000Z",
      right_duration_seconds: 300,
    },
  });

  it("recognises only a live feed as running", () => {
    expect(isRunningBreastFeed(running)).toBe(true);
    expect(
      isRunningBreastFeed(
        event({ metadata: { feed_mode: "breast", total_duration_seconds: 600 } }),
      ),
    ).toBe(false);
  });

  it("counts banked time plus the running side", () => {
    const seconds = liveFeedSeconds(running.metadata, new Date("2026-08-18T11:52:00.000Z"));
    expect(seconds).toBe(300 + 120);
  });

  it("banks the running side and clears it", () => {
    const banked = bankActiveSide(running.metadata, new Date("2026-08-18T11:52:00.000Z"));
    expect(banked.left_duration_seconds).toBe(120);
    expect(banked.active_side).toBeUndefined();
    expect(banked.active_side_started_at).toBeUndefined();
    expect(banked.total_duration_seconds).toBe(420);
  });

  it("shows a stopwatch", () => {
    expect(formatStopwatch(65)).toBe("01:05");
    expect(formatStopwatch(3725)).toBe("1:02:05");
  });
});

describe("metadata parsing", () => {
  it("keeps only the keys we own", () => {
    const parsed = parseCareMetadata({
      feed_mode: "breast",
      bottle_type: "nonsense",
      left_duration_seconds: "120",
      surprise: true,
    });
    expect(parsed).toEqual({ feed_mode: "breast", left_duration_seconds: 120 });
  });
});

describe("day summary", () => {
  it("counts what was logged and totals finished timers only", () => {
    const summary = summariseDay(
      [
        event({ amount_ml: 90, metadata: { feed_mode: "bottle", bottle_type: "formula" } }),
        event({
          metadata: {
            feed_mode: "breast",
            left_duration_seconds: 600,
            right_duration_seconds: 600,
            total_duration_seconds: 1200,
          },
        }),
        event({
          started_at: "2026-08-18T11:40:00.000Z",
          metadata: { feed_mode: "breast", active_side: "left", active_side_started_at: "2026-08-18T11:40:00.000Z" },
        }),
        event({ event_type: "nappy", nappy_type: "wet" }),
        event({ event_type: "nappy", nappy_type: "poo" }),
        event({
          event_type: "sleep",
          started_at: "2026-08-18T09:00:00.000Z",
          ended_at: "2026-08-18T10:30:00.000Z",
        }),
        event({ event_type: "sleep", started_at: "2026-08-18T11:00:00.000Z" }),
        event({ event_type: "note", note: "A good morning" }),
      ],
      NOW,
    );

    expect(summary.feeds).toBe(3);
    expect(summary.breastFeeds).toBe(2);
    expect(summary.bottleFeeds).toBe(1);
    expect(summary.feedMinutes).toBe(20);
    expect(summary.feedMl).toBe(90);
    expect(summary.runningFeed).toBe(true);
    expect(summary.nappies).toBe(2);
    expect(summary.nappyBreakdown.wee).toBe(1);
    expect(summary.nappyBreakdown.poo).toBe(1);
    expect(summary.sleepMinutes).toBe(90);
    expect(summary.runningSleep).toBe(true);
    expect(summary.moments).toBe(1);
  });
});

describe("row text", () => {
  it("describes a breast feed by side", () => {
    const text = describeEvent(
      event({
        metadata: {
          feed_mode: "breast",
          left_duration_seconds: 480,
          right_duration_seconds: 600,
        },
      }),
    );
    expect(text).toBe("Breast feed, left 8m, right 10m");
  });

  it("describes a bottle", () => {
    const text = describeEvent(
      event({ amount_ml: 90, metadata: { feed_mode: "bottle", bottle_type: "formula" } }),
    );
    expect(text).toBe("Bottle, Formula, 90 ml");
  });

  it("describes a poo nappy", () => {
    const text = describeEvent(
      event({
        event_type: "nappy",
        nappy_type: "poo",
        metadata: { poo_texture: "soft", poo_size: "medium" },
      }),
    );
    expect(text).toBe("Poo nappy, soft, medium");
  });

  it("describes a dry nappy", () => {
    expect(describeEvent(event({ event_type: "nappy", nappy_type: "dry" }))).toBe("Dry nappy");
  });

  it("describes a running sleep", () => {
    const text = describeEvent(
      event({ event_type: "sleep", started_at: "2026-08-18T10:15:00.000Z" }),
    );
    expect(text.startsWith("Sleeping now, started ")).toBe(true);
  });

  it("formats durations", () => {
    expect(formatDuration(50)).toBe("50m");
    expect(formatDuration(125)).toBe("2h 5m");
  });
});
