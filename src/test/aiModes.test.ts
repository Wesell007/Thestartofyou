import { describe, expect, it } from "vitest";
import {
  AI_MODES,
  DAY_RECAP_UNAVAILABLE_ANSWER,
  DEFAULT_AI_MODE,
  GENERAL_SYSTEM_PROMPT,
  getAiModeConfig,
  resolveAiMode,
} from "../../supabase/functions/_shared/aiModes";

/** Wording the recap surface must never show, whatever the endpoint returns. */
const ESCALATION_WORDING = /nhs\s?111|\b999\b|A&E|maternity unit|emergency|helpline|call your|speak to your|contact your/i;
const LINK_OR_SOURCE = /https?:|www\.|\bsources?\b|\breferences?\b/i;
const NEXT_STEP_WORDING = /what to do next|next steps?|you (?:should|could) try|we recommend|try to/i;

describe("AI mode resolution", () => {
  it("falls back to general for absent, non-string and unknown values", () => {
    expect(resolveAiMode(undefined)).toBe("general");
    expect(resolveAiMode(null)).toBe("general");
    expect(resolveAiMode(42)).toBe("general");
    expect(resolveAiMode({ mode: "first_year_day_recap" })).toBe("general");
    expect(resolveAiMode("not_a_mode")).toBe("general");
    expect(DEFAULT_AI_MODE).toBe("general");
  });

  it("keeps the known modes", () => {
    expect(resolveAiMode("first_year_day_recap")).toBe("first_year_day_recap");
    expect(resolveAiMode("first_year_companion")).toBe("first_year_companion");
    expect(resolveAiMode("pregnancy_week_companion")).toBe("pregnancy_week_companion");
    expect(resolveAiMode("ttc_companion")).toBe("ttc_companion");
    expect([...AI_MODES]).toHaveLength(5);
  });
});

describe("ttc_companion configuration", () => {
  const config = getAiModeConfig("ttc_companion");

  it("is grounded and may still return the urgent help answer", () => {
    expect(config.useGrounding).toBe(true);
    expect(config.allowUrgentEscalationAnswer).toBe(true);
  });

  it("uses its own prompt rather than the shared guidance prompt", () => {
    expect(config.systemPrompt).not.toBe(GENERAL_SYSTEM_PROMPT);
  });

  it("bans diagnosis, prediction and test interpretation", () => {
    const prompt = config.systemPrompt.toLowerCase();
    for (const rule of [
      "never say whether someone is or is not pregnant",
      "never confirm that ovulation has happened",
      "never interpret or reinterpret a pregnancy test result",
      "test accuracy",
      "blanket reassurance",
      "do not diagnose",
    ]) {
      expect(prompt).toContain(rule);
    }
  });

  it("keeps professional help available rather than gated on the question", () => {
    expect(config.systemPrompt).toMatch(/never discourage professional advice/i);
    expect(config.systemPrompt).toMatch(/999|nhs 111/i);
  });
});

describe("first_year_day_recap configuration", () => {
  const config = getAiModeConfig("first_year_day_recap");

  it("never grounds against external sources", () => {
    expect(config.useGrounding).toBe(false);
  });

  it("never returns the shared urgent escalation answer", () => {
    expect(config.allowUrgentEscalationAnswer).toBe(false);
  });

  it("uses a recap prompt rather than the shared guidance prompt", () => {
    expect(config.systemPrompt).not.toBe(GENERAL_SYSTEM_PROMPT);
  });

  it("has a controlled fallback with no escalation, links, sources or next steps", () => {
    expect(DAY_RECAP_UNAVAILABLE_ANSWER).not.toMatch(ESCALATION_WORDING);
    expect(DAY_RECAP_UNAVAILABLE_ANSWER).not.toMatch(LINK_OR_SOURCE);
    expect(DAY_RECAP_UNAVAILABLE_ANSWER).not.toMatch(NEXT_STEP_WORDING);
    expect(DAY_RECAP_UNAVAILABLE_ANSWER.length).toBeLessThan(200);
  });
});

describe("existing modes are unchanged", () => {
  it("general and pregnancy_week_companion stay grounded answer surfaces", () => {
    expect(getAiModeConfig("general").systemPrompt).toBe(GENERAL_SYSTEM_PROMPT);
    // Phase 29B.1: the pregnancy week companion now has its own stage-aware
    // prompt, but the grounding and escalation behaviour is unchanged.
    for (const mode of ["general", "pregnancy_week_companion"] as const) {
      const config = getAiModeConfig(mode);
      expect(config.useGrounding).toBe(true);
      expect(config.allowUrgentEscalationAnswer).toBe(true);
    }
  });

  it("first_year_companion is defined but grounded like the other answer surfaces", () => {
    const config = getAiModeConfig("first_year_companion");
    expect(config.useGrounding).toBe(true);
    expect(config.allowUrgentEscalationAnswer).toBe(true);
  });
});
