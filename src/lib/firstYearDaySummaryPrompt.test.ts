import { describe, expect, it } from "vitest";
import {
  CINDY_DAY_SUMMARY_GUARDRAILS,
  DAY_SUMMARY_QUERY_MAX_LENGTH,
  buildDayRhythmDigest,
  buildDaySummaryQuery,
} from "@/lib/firstYearDaySummaryPrompt";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";

const base = (over: Partial<CareEvent>): CareEvent => ({
  id: Math.random().toString(36).slice(2),
  baby_id: "baby-1",
  event_type: "note",
  occurred_at: "2026-08-19T09:00:00.000Z",
  started_at: null,
  ended_at: null,
  amount_ml: null,
  side: null,
  nappy_type: null,
  feed_method: null,
  sleep_kind: null,
  note: null,
  metadata: {},
  updated_at: "2026-08-19T09:00:00.000Z",
  ...over,
});

const DAY = "2026-08-19";

describe("buildDayRhythmDigest", () => {
  it("includes counts and structured detail", () => {
    const digest = buildDayRhythmDigest(
      [
        base({
          event_type: "feed",
          amount_ml: 120,
          feed_method: "bottle",
          metadata: { feed_mode: "bottle", bottle_type: "formula" },
        }),
        base({ event_type: "nappy", nappy_type: "poo", metadata: { poo_size: "small" } }),
      ],
      DAY,
      { babyLabels: { "baby-1": "Baby 1" } },
    );
    expect(digest.day).toBe(DAY);
    expect(digest.counts).toContain("1 feed");
    expect(digest.counts).toContain("1 nappy change");
    const text = digest.lines.map((line) => line.core).join("\n");
    expect(text).toContain("bottle");
    expect(text).toContain("formula");
    expect(text).toContain("120 ml");
    expect(text).toContain("poo");
    expect(text).toContain("small");
  });

  it("uses neutral labels for multiples and never a name", () => {
    const digest = buildDayRhythmDigest(
      [
        base({ event_type: "nappy", baby_id: "baby-1", nappy_type: "wee" }),
        base({ event_type: "nappy", baby_id: "baby-2", nappy_type: "dry" }),
      ],
      DAY,
      { babyLabels: { "baby-1": "Baby 1", "baby-2": "Baby 2" } },
    );
    const query = buildDaySummaryQuery(digest);
    expect(query).toContain("[Baby 1]");
    expect(query).toContain("[Baby 2]");
    expect(query).not.toMatch(/Nora|Sam|baby-1/i);
  });

  it("keeps moment wording as a short snippet", () => {
    const digest = buildDayRhythmDigest(
      [base({ event_type: "note", note: "x".repeat(400) })],
      DAY,
    );
    expect(digest.lines[0].moment?.length).toBeLessThanOrEqual(95);
  });
});

describe("buildDaySummaryQuery", () => {
  it("always keeps the guardrails, the day and the counts", () => {
    const events = Array.from({ length: 60 }, (_, i) =>
      base({ event_type: "note", note: `moment number ${i} with some longer wording here` }),
    );
    const digest = buildDayRhythmDigest(events, DAY);
    const query = buildDaySummaryQuery(digest);
    expect(query.length).toBeLessThanOrEqual(DAY_SUMMARY_QUERY_MAX_LENGTH);
    expect(query).toContain(CINDY_DAY_SUMMARY_GUARDRAILS);
    expect(query).toContain(`Day: ${DAY}.`);
    expect(query).toContain("Logged: ");
  });

  it("drops moment wording before structural care detail", () => {
    const events = [
      base({ event_type: "note", note: "a long moment about the afternoon feed and a nap" }),
      base({
        event_type: "sleep",
        occurred_at: "2026-08-19T10:00:00.000Z",
        started_at: "2026-08-19T10:00:00.000Z",
        ended_at: "2026-08-19T11:00:00.000Z",
        sleep_kind: "nap",
      }),
    ];
    const digest = buildDayRhythmDigest(events, DAY);
    const tight = buildDaySummaryQuery(digest, CINDY_DAY_SUMMARY_GUARDRAILS.length + 130);
    expect(tight).not.toContain("long moment about the afternoon");
    expect(tight).toContain("Sleep");
  });

  it("handles a day with nothing logged", () => {
    const query = buildDaySummaryQuery(buildDayRhythmDigest([], DAY));
    expect(query).toContain("Events: none logged.");
  });
});
