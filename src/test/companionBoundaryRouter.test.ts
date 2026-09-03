/**
 * AIC-5C — the shared companion boundary router.
 *
 * Clarification parity with the retired client rules, conservative referent
 * handling, and precision-first UNSUPPORTED detection. No model, no classifier,
 * no persisted state.
 */
import { describe, expect, it } from "vitest";
import {
  decideBoundary,
  UNSUPPORTED_ANSWERS,
} from "../../supabase/functions/_shared/companionBoundaryRouter";
import {
  CLARIFICATION_TOPICS,
  hasConcernWording,
  hasUsableReferent,
  resolveClarification,
} from "../../supabase/functions/_shared/clarification";

const decide = (query: string, priorTurns?: Array<{ role: "user" | "assistant"; content: string }>) =>
  decideBoundary({ query, priorTurns });

describe("clarification parity with the retired client rules", () => {
  it("clarifies the six broad terms", () => {
    for (const term of ["Milestones", "Feeding", "Sleep", "Symptoms", "Movement", "Testing"]) {
      const decision = decide(term);
      expect(decision.kind, term).toBe("clarify");
      if (decision.kind !== "clarify") continue;
      expect(decision.answer.length).toBeGreaterThan(20);
      expect(CLARIFICATION_TOPICS).toContain(decision.topic);
    }
  });

  it("never clarifies concerning or urgent wording", () => {
    const concerning = [
      "reduced movements",
      "bleeding",
      "pain",
      "severe headache",
      "baby not feeding",
      "baby breathing fast",
      "I am worried about symptoms",
      "urgent",
      "help now",
    ];
    for (const query of concerning) {
      expect(decide(query).kind, query).toBe("continue");
      expect(resolveClarification(query), query).toBeNull();
    }
  });

  it("continues on well-specified and short-but-clear questions", () => {
    for (const query of [
      "When will I feel the baby move?",
      "Sleep regression",
      "What helps with heartburn?",
      "Is nausea normal at 7 weeks?",
      "",
    ]) {
      expect(decide(query).kind, query).toBe("continue");
    }
  });

  it("flags concern wording independently", () => {
    expect(hasConcernWording("reduced movements")).toBe(true);
    expect(hasConcernWording("milestones")).toBe(false);
  });
});

describe("relevant-history referent rule", () => {
  const sleepTurns = [
    { role: "user" as const, content: "How much sleep does a six month old need?" },
    { role: "assistant" as const, content: "Most babies of six months sleep around 12 to 15 hours in total." },
  ];
  const feedingTurns = [
    { role: "user" as const, content: "How often should I be bottle feeding?" },
    { role: "assistant" as const, content: "Newborns usually feed 8 to 12 times in 24 hours." },
  ];

  it("continues a bare topic when the same subject is genuinely in recent turns", () => {
    expect(decide("sleep", sleepTurns).kind).toBe("continue");
    expect(hasUsableReferent("sleep", sleepTurns)).toBe(true);
  });

  it("still clarifies when recent turns are about something else", () => {
    expect(decide("sleep", feedingTurns).kind).toBe("clarify");
    expect(hasUsableReferent("sleep", feedingTurns)).toBe(false);
  });

  it("clarifies when there is no history at all", () => {
    expect(decide("sleep").kind).toBe("clarify");
    expect(decide("sleep", []).kind).toBe("clarify");
  });

  it("treats a failed history load as no referent rather than fabricating one", () => {
    // A failed load reaches the router as [] / undefined.
    expect(hasUsableReferent("sleep", undefined)).toBe(false);
    expect(decide("sleep", undefined).kind).toBe("clarify");
  });

  it("only looks at the most recent bounded turns", () => {
    const stale = [
      { role: "assistant" as const, content: "Safer sleep guidance for naps." },
      { role: "user" as const, content: "Thanks" },
      { role: "assistant" as const, content: "You are welcome." },
      { role: "user" as const, content: "What about nappies?" },
      { role: "assistant" as const, content: "Newborns need frequent nappy changes." },
    ];
    expect(decide("sleep", stale).kind).toBe("clarify");
  });
});

describe("unsupported — professional act requested of the companion", () => {
  it.each([
    ["Diagnose me.", "diagnosis"],
    ["Can you diagnose me?", "diagnosis"],
    ["Give me a diagnosis.", "diagnosis"],
    ["Prescribe me medication.", "prescribing"],
    ["Write me a prescription.", "prescribing"],
    ["Can you prescribe something for this?", "prescribing"],
  ])("%s is an explicit capability boundary", (query, kind) => {
    const decision = decide(query);
    expect(decision.kind, query).toBe("unsupported");
    if (decision.kind !== "unsupported") return;
    expect(decision.unsupportedKind).toBe(kind);
    expect(decision.answer).toBe(UNSUPPORTED_ANSWERS[decision.unsupportedKind]);
  });

  it.each([
    "What does my diagnosis mean?",
    "What does a gestational diabetes diagnosis mean?",
    "My doctor diagnosed me with gestational diabetes — what happens next?",
    "My doctor prescribed this medication — what is it for?",
    "What are common side effects of this medicine?",
    "Should I ask my GP to diagnose this properly?",
  ])("%s continues as an ordinary question", (query) => {
    expect(decide(query).kind, query).toBe("continue");
  });
});

describe("unsupported — external action the product cannot perform", () => {
  it.each([
    ["Call my midwife for me.", "contact_clinician"],
    ["Contact my doctor for me.", "contact_clinician"],
    ["Book me an appointment.", "booking"],
    ["Send my GP a message.", "send_message"],
    ["Access my medical record for me.", "medical_records"],
    ["Please call my GP surgery for me.", "contact_clinician"],
  ])("%s is an explicit capability boundary", (query, kind) => {
    const decision = decide(query);
    expect(decision.kind, query).toBe("unsupported");
    if (decision.kind !== "unsupported") return;
    expect(decision.unsupportedKind).toBe(kind);
    expect(decision.answer).toMatch(/not able to/i);
  });

  it.each([
    "Should I call my midwife?",
    "Who should I contact?",
    "How do I book an appointment?",
    "What should I say when I message my GP?",
    "Can you help me write a message to my midwife?",
    "How can I access my medical record?",
    "When do I get my scan appointment?",
  ])("%s continues as ordinary guidance", (query) => {
    expect(decide(query).kind, query).toBe("continue");
  });

  it("never claims an action happened", () => {
    for (const answer of Object.values(UNSUPPORTED_ANSWERS)) {
      expect(answer).not.toMatch(/i have (called|booked|sent|contacted|accessed)/i);
      expect(answer).toMatch(/[a-z]/);
    }
    expect(UNSUPPORTED_ANSWERS.booking).toMatch(/nothing has been booked/i);
    expect(UNSUPPORTED_ANSWERS.contact_clinician).toMatch(/nothing has been sent or dialled/i);
  });

  it("keeps every boundary answer useful rather than a dead end", () => {
    for (const [kind, answer] of Object.entries(UNSUPPORTED_ANSWERS)) {
      expect(answer.length, kind).toBeGreaterThan(120);
      expect(answer, kind).toMatch(/i can help|what i can do|i can explain/i);
    }
  });
});

describe("boundary decisions carry no internal labels", () => {
  it("never leaks a routing label into visible text", () => {
    const visible = Object.values(UNSUPPORTED_ANSWERS).join(" ");
    expect(visible).not.toMatch(/unsupported|clarification_required|amber|green|crisis_state/i);
  });
});
