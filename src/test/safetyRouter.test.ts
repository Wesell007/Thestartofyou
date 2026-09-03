import { describe, expect, it } from "vitest";
import { decideSafety } from "../../supabase/functions/_shared/safetyRouter.ts";
import {
  isDeterministicSafetyDecision,
  type SafetyState,
} from "../../supabase/functions/_shared/safetyState.ts";
import { matchUrgent, urgentAnswer } from "../../supabase/functions/_shared/urgentPatterns.ts";
import {
  buildDayRhythmDigest,
  buildDaySummaryQuery,
} from "@/lib/firstYearDaySummaryPrompt";

const GREEN_QUERIES = [
  "When will I feel the baby move?",
  "What can help with sleep regression?",
  "How often should my baby be feeding?",
  "What should I pack in my hospital bag?",
];

const CLINICAL_QUERIES = [
  "I am pregnant and bleeding",
  "My baby has blue lips",
  "My waters have broken",
  "I have a severe headache and vision changes",
];

const CRISIS_QUERIES = ["I cannot keep myself safe", "I do not want to be here any more"];

const ABUSE_QUERIES = ["Someone at home is hurting me", "I am afraid of my partner"];

describe("AIC-5A deterministic safety router", () => {
  it.each(GREEN_QUERIES)("returns GREEN routed to the model for %s", (query) => {
    const decision = decideSafety(query);
    expect(decision).toEqual({ state: "green", route: "model" });
    expect(isDeterministicSafetyDecision(decision)).toBe(false);
  });

  it.each(CLINICAL_QUERIES)("maps the clinical match %s to RED", (query) => {
    const decision = decideSafety(query);
    expect(decision.state).toBe("red");
    expect(decision.route).toBe("deterministic");
    expect(decision).toMatchObject({ kind: "clinical" });
  });

  it.each(CRISIS_QUERIES)("maps the crisis match %s to CRISIS/crisis", (query) => {
    const decision = decideSafety(query);
    expect(decision.state).toBe("crisis");
    expect(decision).toMatchObject({ kind: "crisis" });
  });

  it.each(ABUSE_QUERIES)("maps the safeguarding match %s to CRISIS/abuse", (query) => {
    const decision = decideSafety(query);
    expect(decision.state).toBe("crisis");
    expect(decision).toMatchObject({ kind: "abuse" });
  });

  it("keeps crisis and abuse answers distinguishable", () => {
    const crisis = decideSafety("I keep thinking about hurting myself");
    const abuse = decideSafety("Someone at home is hurting me");
    expect("answer" in crisis && "answer" in abuse && crisis.answer).not.toBe(
      "answer" in abuse ? abuse.answer : "",
    );
  });

  it("never emits amber or unsupported", () => {
    const states: SafetyState[] = [
      ...GREEN_QUERIES,
      ...CLINICAL_QUERIES,
      ...CRISIS_QUERIES,
      ...ABUSE_QUERIES,
    ].map((query) => decideSafety(query).state);
    expect(states.filter((state) => state === "amber")).toHaveLength(0);
    expect(states.filter((state) => state === "unsupported")).toHaveLength(0);
  });


  it("preserves existing deterministic answer wording exactly", () => {
    for (const query of [...CLINICAL_QUERIES, ...CRISIS_QUERIES, ...ABUSE_QUERIES]) {
      const decision = decideSafety(query);
      expect("answer" in decision && decision.answer).toBe(urgentAnswer(query));
    }
  });

  it("agrees with matchUrgent on every case, adding no new matching", () => {
    for (const query of [...GREEN_QUERIES, ...CLINICAL_QUERIES, ...CRISIS_QUERIES, ...ABUSE_QUERIES]) {
      const match = matchUrgent(query);
      const decision = decideSafety(query);
      if (match === null) expect(decision.state).toBe("green");
      if (match === "clinical") expect(decision.state).toBe("red");
      if (match === "crisis") expect(decision.state).toBe("crisis");
    }
  });

  it("leaves a legitimate DaySummaryCard recap payload GREEN", () => {
    const base = "2026-08-19T09:15:00.000Z";
    const digest = buildDayRhythmDigest(
      [
        {
          id: "1",
          baby_id: "b1",
          event_type: "feed",
          occurred_at: base,
          started_at: base,
          ended_at: "2026-08-19T09:35:00.000Z",
          metadata: { feed_mode: "bottle", bottle_type: "formula" },
          amount_ml: 120,
        },
        {
          id: "2",
          baby_id: "b1",
          event_type: "nappy",
          occurred_at: "2026-08-19T11:00:00.000Z",
          nappy_type: "wet",
          metadata: {},
        },
        {
          id: "3",
          baby_id: "b1",
          event_type: "note",
          occurred_at: "2026-08-19T14:00:00.000Z",
          note: "He smiled at the window for ages this afternoon.",
          metadata: {},
        },
      ] as never,
      "2026-08-19",
      { ageLabel: "around three months old" },
    );
    const query = buildDaySummaryQuery(digest);
    expect(decideSafety(query)).toEqual({ state: "green", route: "model" });
  });
});
