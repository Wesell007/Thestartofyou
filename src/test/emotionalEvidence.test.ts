/**
 * AIC-5E — deterministic explicit-emotion evidence and fixed tone guidance.
 *
 * Every case here is synthetic. Nothing in these tests writes to a database,
 * a store, analytics or a log.
 */

import { describe, expect, it } from "vitest";
import {
  detectExplicitEmotion,
  hasEmotionalContinuationSignal,
  resolveEmotionalEvidence,
  MAX_EMOTION_CATEGORIES,
  type EmotionalEvidence,
} from "../../supabase/functions/_shared/emotionalEvidence.ts";
import { renderEmotionalGuidance } from "../../supabase/functions/_shared/emotionalGuidance.ts";

const user = (content: string) => ({ role: "user" as const, content });
const assistant = (content: string) => ({ role: "assistant" as const, content });
const resolve = (query: string, priorTurns: Array<{ role: "user" | "assistant"; content: string }> = []) =>
  resolveEmotionalEvidence({ query, priorTurns });
const explicit = (evidence: EmotionalEvidence) => {
  if (evidence.kind !== "explicit") throw new Error("expected explicit evidence");
  return evidence;
};

describe("explicit self-reported emotion", () => {
  it.each([
    ["I'm scared.", "fear"],
    ["I feel overwhelmed.", "overwhelm"],
    ["I'm frustrated.", "frustration"],
    ["I feel guilty.", "self_blame"],
    ["I'm so relieved.", "positive"],
    ["I'm sad.", "low"],
    ["I can't stop worrying about it.", "fear"],
  ])("%s → %s", (query, category) => {
    expect(detectExplicitEmotion(query)).toEqual([category]);
  });

  it("treats the user as the experiencer even when the concern is about someone else", () => {
    expect(detectExplicitEmotion("I'm worried about my baby.")).toEqual(["fear"]);
  });
});

describe("third-party experiencer exclusion", () => {
  it.each([
    "My baby seems worried.",
    "My partner is anxious.",
    "My friend is terrified.",
    "I can't stop my baby crying and she seems worried.",
  ])("%s → none", (query) => {
    expect(detectExplicitEmotion(query)).toEqual([]);
  });
});

describe("generic, hypothetical and quoted wording", () => {
  it.each([
    "What should a worried parent do?",
    "What are signs of anxiety?",
    "Is feeling nervous common?",
    "Why do people feel guilty?",
    "What does 'terrified' mean?",
    "She said 'terrified'.",
    "What should I pack in my hospital bag?",
  ])("%s → none", (query) => {
    expect(detectExplicitEmotion(query)).toEqual([]);
  });
});

describe("standalone self-report", () => {
  it.each([
    ["Feeling overwhelmed.", "overwhelm"],
    ["Terrified.", "fear"],
    ["So relieved.", "positive"],
  ])("%s → %s", (query, category) => {
    expect(detectExplicitEmotion(query)).toEqual([category]);
  });
});

describe("mixed emotion keeps the order the user expressed", () => {
  it("excited but terrified", () => {
    expect(detectExplicitEmotion("I'm excited but terrified.")).toEqual(["positive", "fear"]);
  });
  it("worried but relieved", () => {
    expect(detectExplicitEmotion("I'm worried but relieved.")).toEqual(["fear", "positive"]);
  });
  it("relieved but still worried", () => {
    expect(detectExplicitEmotion("I'm relieved but still worried.")).toEqual(["positive", "fear"]);
  });
  it("never exceeds two categories", () => {
    const categories = detectExplicitEmotion("I'm scared and sad and guilty and frustrated.");
    expect(categories.length).toBeLessThanOrEqual(MAX_EMOTION_CATEGORIES);
  });
});

describe("current turn overrides history", () => {
  it("calmer now replaces earlier fear", () => {
    const result = explicit(resolve("I'm calmer now.", [user("I'm terrified.")]));
    expect(result.categories).toEqual(["positive"]);
    expect(result.categories).not.toContain("fear");
    expect(result.continuity).toBe("changed");
    expect(result.direction).toBe("eased");
    expect(result.source).toBe("current");
  });

  it("records an explicit increase without a score", () => {
    const result = explicit(resolve("I'm even more worried.", [user("I'm worried.")]));
    expect(result.categories).toEqual(["fear"]);
    expect(result.continuity).toBe("changed");
    expect(result.direction).toBe("increased");
    expect(result).not.toHaveProperty("score");
    expect(result).not.toHaveProperty("severity");
    expect(result).not.toHaveProperty("confidence");
  });

  it("records explicit persistence", () => {
    const result = explicit(resolve("I'm still overwhelmed.", [user("I'm overwhelmed.")]));
    expect(result.categories).toEqual(["overwhelm"]);
    expect(result.continuity).toBe("continued");
    expect(result.repeatedFromPrevious).toBe(true);
  });
});

describe("bounded history", () => {
  it("does not carry unrelated recent emotion", () => {
    const result = resolve("What should I pack in my hospital bag?", [
      user("I'm terrified about giving birth."),
    ]);
    expect(result.kind).toBe("none");
  });

  it("carries a connected follow-up", () => {
    const result = explicit(
      resolve("What should I do next?", [user("I'm overwhelmed by all of this.")]),
    );
    expect(result.categories).toEqual(["overwhelm"]);
    expect(result.source).toBe("recent_user");
    expect(result.continuity).toBe("continued");
  });

  it("uses only the most recent qualifying user turn, never an accumulation", () => {
    const result = explicit(
      resolve("What should I do next?", [
        user("I'm scared."),
        assistant("Here is what usually helps."),
        user("I'm frustrated."),
      ]),
    );
    expect(result.categories).toEqual(["frustration"]);
    expect(result.categories).not.toContain("fear");
  });

  it("looks back no further than two user turns", () => {
    const result = resolve("What should I do next?", [
      user("I'm scared."),
      user("What is folic acid?"),
      user("How much water should I drink?"),
    ]);
    expect(result.kind).toBe("none");
  });

  it("never treats assistant wording as evidence", () => {
    const result = resolve("What should I do?", [assistant("You sound worried.")]);
    expect(result.kind).toBe("none");
  });

  it("recognises only narrow continuation wording", () => {
    expect(hasEmotionalContinuationSignal("What should I do next?")).toBe(true);
    expect(hasEmotionalContinuationSignal("What is folic acid?")).toBe(false);
  });
});

describe("fail-open behaviour", () => {
  it("returns none for empty input", () => {
    expect(resolve("").kind).toBe("none");
  });

  it("returns none when the input is malformed", () => {
    const malformed = { query: undefined, priorTurns: undefined } as unknown as Parameters<
      typeof resolveEmotionalEvidence
    >[0];
    expect(resolveEmotionalEvidence(malformed).kind).toBe("none");
  });
});

describe("trusted guidance", () => {
  const guidanceFor = (query: string, prior: Array<{ role: "user" | "assistant"; content: string }> = []) =>
    renderEmotionalGuidance(resolve(query, prior));

  it("injects nothing when there is no explicit emotion", () => {
    expect(guidanceFor("What is folic acid?")).toBe("");
  });

  it("never contains the user's own wording", () => {
    const guidance = guidanceFor("I'm scared about my scan tomorrow at the hospital.");
    expect(guidance).not.toMatch(/scan|hospital|tomorrow/i);
  });

  it("states that safety outranks tone", () => {
    const guidance = guidanceFor("I'm nervous about this.");
    expect(guidance).toMatch(/lower authority than every safety rule/i);
    expect(guidance).toMatch(/may never change what is factually said/i);
  });

  it("gives fear brief acknowledgement without false reassurance", () => {
    const guidance = guidanceFor("I'm scared.");
    expect(guidance).toMatch(/acknowledge the worry briefly/i);
    expect(guidance).toMatch(/try not to worry/i);
  });

  it("only overwhelm simplifies the structure", () => {
    const overwhelm = guidanceFor("I feel overwhelmed.");
    expect(overwhelm).toMatch(/one clear first step/i);
    expect(overwhelm).toMatch(/never drop required safety information/i);
    const frustration = guidanceFor("I'm frustrated.");
    expect(frustration).not.toMatch(/one clear first step/i);
    expect(frustration).toMatch(/keep the usual level of detail/i);
  });

  it("keeps self-blame free of blame and of unearned absolution", () => {
    const guidance = guidanceFor("I feel guilty.");
    expect(guidance).toMatch(/do not automatically say it is not their fault/i);
  });

  it("keeps positive emotion non-clinical", () => {
    const guidance = guidanceFor("I'm so relieved.");
    expect(guidance).toMatch(/not medical evidence/i);
    expect(guidance).toMatch(/verdict about a pregnancy/i);
  });

  it("stays warm without forcing positivity for sadness", () => {
    expect(guidanceFor("I'm sad.")).toMatch(/do not force positivity/i);
  });

  it("does not reopen with an acknowledgement when the context is carried", () => {
    const guidance = guidanceFor("What should I do next?", [user("I'm overwhelmed by all of this.")]);
    expect(guidance).toMatch(/do not open with another acknowledgement/i);
  });

  it("allows a short acknowledgement of persistence and of change", () => {
    expect(guidanceFor("I'm still scared.")).toMatch(/still there/i);
    expect(guidanceFor("I'm even more scared.")).toMatch(/grown stronger/i);
    expect(guidanceFor("I'm calmer now.")).toMatch(/eased/i);
  });
});
