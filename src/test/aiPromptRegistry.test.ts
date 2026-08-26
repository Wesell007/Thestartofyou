import { describe, expect, it } from "vitest";
import {
  AI_MODES,
  ESCALATION_BLOCKS,
  GROUNDING_USE_RULE,
  OUTPUT_HYGIENE_RULES,
  SAFETY_BLOCKS,
  WORD_LIMITS,
  buildSystemPrompt,
  getAiModeConfig,
  getPromptFingerprint,
  type AiMode,
} from "../../supabase/functions/_shared/aiModes";
import {
  DAY_RECAP_UNAVAILABLE_ANSWER,
  SAFE_FALLBACK_ANSWER,
} from "../../supabase/functions/_shared/aiAnswerWording";
import { SAFE_FALLBACK_ANSWER as CLIENT_SAFE_FALLBACK_ANSWER } from "@/lib/aiAnswerSafety";

/**
 * Recorded fingerprints. Never update these to make a test pass: change them
 * only alongside a deliberate prompt edit and an AI_PROMPT_VERSION bump.
 */
const FINGERPRINTS: Record<AiMode, string> = {
  general: "ae539e47",
  first_year_day_recap: "d2cb005b",
  first_year_companion: "5681fc75",
  pregnancy_week_companion: "bc30a6b2",
  ttc_companion: "39fbb97e",
};

const GROUNDED_MODES: AiMode[] = [
  "general",
  "first_year_companion",
  "pregnancy_week_companion",
  "ttc_companion",
];

describe("prompt fingerprints", () => {
  it("match the recorded values for every mode", () => {
    for (const mode of AI_MODES) {
      expect(getPromptFingerprint(mode), `prompt drift in ${mode}`).toBe(FINGERPRINTS[mode]);
    }
  });

  it("gives each mode a distinct prompt", () => {
    const prompts = AI_MODES.map((mode) => getAiModeConfig(mode).systemPrompt);
    expect(new Set(prompts).size).toBe(AI_MODES.length);
  });
});

describe("shared prompt blocks", () => {
  it("are present in every grounded mode", () => {
    for (const mode of GROUNDED_MODES) {
      const prompt = getAiModeConfig(mode).systemPrompt;
      expect(prompt).toContain(SAFETY_BLOCKS.notADiagnosis);
      expect(prompt).toContain(SAFETY_BLOCKS.noReviewerClaim);
      expect(prompt).toContain(SAFETY_BLOCKS.untrustedInput);
      expect(prompt).toContain(GROUNDING_USE_RULE);
      expect(prompt).toContain(OUTPUT_HYGIENE_RULES);
      expect(prompt).toContain(SAFE_FALLBACK_ANSWER);
      expect(prompt).toContain("Use British English.");
    }
  });

  it("gives each mode its own escalation block", () => {
    expect(getAiModeConfig("general").systemPrompt).toContain(ESCALATION_BLOCKS.full);
    expect(getAiModeConfig("pregnancy_week_companion").systemPrompt).toContain(
      ESCALATION_BLOCKS.movementAware,
    );
    expect(getAiModeConfig("first_year_companion").systemPrompt).toContain(
      ESCALATION_BLOCKS.onlyWhenRaised,
    );
    expect(getAiModeConfig("ttc_companion").systemPrompt).toContain(ESCALATION_BLOCKS.encourage);
  });

  it("uses the normalised word limits", () => {
    expect(getAiModeConfig("general").systemPrompt).toContain(`under ${WORD_LIMITS.general} words`);
    for (const mode of ["pregnancy_week_companion", "first_year_companion", "ttc_companion"] as const) {
      expect(getAiModeConfig(mode).systemPrompt).toContain(`under ${WORD_LIMITS.companion} words`);
    }
    expect(getAiModeConfig("first_year_day_recap").systemPrompt).toContain(
      `between ${WORD_LIMITS.recapMin} and ${WORD_LIMITS.recapMax} words`,
    );
  });
});

describe("recap mode stays recap-only", () => {
  const prompt = getAiModeConfig("first_year_day_recap").systemPrompt;

  it("carries no escalation, grounding, hygiene or section wording", () => {
    for (const block of Object.values(ESCALATION_BLOCKS)) {
      expect(prompt).not.toContain(block);
    }
    expect(prompt).not.toContain(GROUNDING_USE_RULE);
    expect(prompt).not.toContain(OUTPUT_HYGIENE_RULES);
    expect(prompt).not.toContain(SAFE_FALLBACK_ANSWER);
    expect(prompt).not.toMatch(/What this means|What may help|When to seek support/);
    expect(prompt).not.toMatch(/nhs\s?111|\b999\b|A&E|maternity unit/i);
  });

  it("keeps its controlled unavailable answer", () => {
    expect(DAY_RECAP_UNAVAILABLE_ANSWER).toMatch(/simple day recap/);
    expect(DAY_RECAP_UNAVAILABLE_ANSWER).not.toMatch(/nhs\s?111|\b999\b|A&E|midwife|GP/i);
  });
});

describe("fallback wording has one source of truth", () => {
  it("is byte-identical on the client and in the prompts", () => {
    expect(CLIENT_SAFE_FALLBACK_ANSWER).toBe(SAFE_FALLBACK_ANSWER);
  });
});

describe("buildSystemPrompt", () => {
  it("composes blocks in the order given and honours the flags", () => {
    const prompt = buildSystemPrompt({
      identity: "Identity line.",
      rulesHeading: "Safety rules:",
      rules: [SAFETY_BLOCKS.notADiagnosis, SAFETY_BLOCKS.untrustedInput],
      useGrounding: false,
      useOutputHygiene: false,
    });
    expect(prompt).toBe(
      `Identity line.\n\nSafety rules:\n${SAFETY_BLOCKS.notADiagnosis}\n${SAFETY_BLOCKS.untrustedInput}`,
    );
  });
});
