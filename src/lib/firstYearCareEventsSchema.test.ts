import { describe, expect, it } from "vitest";
import {
  feedMethodsForAge,
  formatDuration,
  solidsAvailable,
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

describe("notes", () => {
  it("requires words on a moment", () => {
    const result = validateCareEventDraft(draft({ eventType: "note", note: "   " }), { now: NOW });
    expect(result.ok).toBe(false);
  });

  it("keeps notes optional on a feed", () => {
    expect(validateCareEventDraft(draft({ note: "" }), { now: NOW }).ok).toBe(true);
  });

  it("keeps notes optional on a nappy", () => {
    const result = validateCareEventDraft(draft({ eventType: "nappy", nappyType: "wet" }), {
      now: NOW,
    });
    expect(result.ok).toBe(true);
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

describe("solids by age", () => {
  it("hides solids under six months", () => {
    expect(solidsAvailable("2026-06-01", NOW)).toBe(false);
    expect(feedMethodsForAge("2026-06-01", NOW)).not.toContain("solids");
  });

  it("offers solids from around six months", () => {
    expect(solidsAvailable("2026-01-01", NOW)).toBe(true);
    expect(feedMethodsForAge("2026-01-01", NOW)).toContain("solids");
  });
});

describe("day summary", () => {
  const event = (overrides: Partial<CareEvent>): CareEvent => ({
    id: crypto.randomUUID(),
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
    updated_at: "2026-08-18T09:00:00.000Z",
    ...overrides,
  });

  it("counts what was logged and totals sleep", () => {
    const summary = summariseDay(
      [
        event({ event_type: "feed", amount_ml: 90 }),
        event({ event_type: "feed", amount_ml: 60 }),
        event({ event_type: "nappy", nappy_type: "wet" }),
        event({
          event_type: "sleep",
          started_at: "2026-08-18T09:00:00.000Z",
          ended_at: "2026-08-18T10:30:00.000Z",
        }),
      ],
      NOW,
    );
    expect(summary.feeds).toBe(2);
    expect(summary.feedMl).toBe(150);
    expect(summary.nappies).toBe(1);
    expect(summary.sleepMinutes).toBe(90);
    expect(summary.runningSleep).toBe(false);
  });

  it("flags a sleep still running", () => {
    const summary = summariseDay(
      [event({ event_type: "sleep", started_at: "2026-08-18T09:00:00.000Z" })],
      new Date("2026-08-18T10:00:00.000Z"),
    );
    expect(summary.runningSleep).toBe(true);
  });
});

describe("durations", () => {
  it("reads as hours and minutes", () => {
    expect(formatDuration(0)).toBe("0m");
    expect(formatDuration(45)).toBe("45m");
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(80)).toBe("1h 20m");
  });
});
