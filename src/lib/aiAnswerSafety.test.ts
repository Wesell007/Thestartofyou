import { describe, expect, it } from "vitest";
import { sanitiseAiAnswer, sanitiseStreamingAiAnswer, SAFE_FALLBACK_ANSWER } from "@/lib/aiAnswerSafety";
import { stripExternalSourceLinks } from "@/lib/answerSourceLinks";
import {
  GENERAL_SYSTEM_PROMPT,
  getAiModeConfig,
  AI_MODES,
} from "../../supabase/functions/_shared/aiModes";
import { selectSources, APPROVED_SOURCES } from "../../supabase/functions/_shared/aiSources";

const BANNED = [
  "provided NHS evidence",
  "provided evidence",
  "retrieved evidence",
  "source material does not cover",
  "context provided does not include",
  "not covered in the evidence",
  "not covered by the provided sources",
  "I cannot provide specific information on this topic because",
];

describe("answer sanitiser", () => {
  it("replaces a pure retrieval refusal with the approved fallback", () => {
    const raw =
      "I cannot provide specific information on this topic because it is not covered in the provided NHS evidence.";
    expect(sanitiseAiAnswer(raw)).toBe(SAFE_FALLBACK_ANSWER);
  });

  it.each(BANNED)("removes banned wording: %s", (phrase) => {
    const raw = `Most people feel first movements between 16 and 24 weeks, and it can be later with a first pregnancy. ${phrase}. Contact your maternity unit if movements change.`;
    const output = sanitiseAiAnswer(raw);
    expect(output.toLowerCase()).not.toContain(phrase.toLowerCase());
    expect(output).toContain("16 and 24 weeks");
  });

  it("keeps professional-care and escalation wording intact", () => {
    const raw =
      "If your baby's movements slow down or change, contact your maternity unit straight away, day or night. Do not wait until the next day. This is general information and not a substitute for your midwife or GP.";
    const output = sanitiseAiAnswer(raw);
    expect(output).toContain("contact your maternity unit straight away");
    expect(output).toContain("midwife or GP");
  });

  it("returns an empty string for empty input, and stays empty while streaming", () => {
    expect(sanitiseAiAnswer("")).toBe("");
    expect(sanitiseStreamingAiAnswer("")).toBe("");
    expect(sanitiseStreamingAiAnswer("Most people fee")).toContain("Most people fee");
  });
});

describe("external source links", () => {
  it("strips a trailing sources block", () => {
    const raw = `Some guidance here that is long enough to keep.

## Sources

- https://www.nhs.uk/pregnancy/
- https://www.nhs.uk/baby/`;
    const output = stripExternalSourceLinks(raw);
    expect(output).not.toMatch(/https?:\/\//);
    expect(output.toLowerCase()).not.toContain("sources");
    expect(output).toContain("Some guidance here");
  });

  it("renders markdown link text as plain text and removes bare URLs", () => {
    const raw = "Read [the NHS movements page](https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/) or visit www.nhs.uk for more.";
    const output = stripExternalSourceLinks(raw);
    expect(output).toContain("the NHS movements page");
    expect(output).not.toContain("](");
    expect(output).not.toMatch(/https?:\/\/|www\./);
  });

  it("leaves an answer without links unchanged in substance", () => {
    const raw = "Feeding cues include rooting, sucking on hands and turning towards you.";
    expect(stripExternalSourceLinks(raw)).toBe(raw);
  });
});

describe("mode prompts", () => {
  it.each(AI_MODES)("%s prompt contains no banned retrieval wording", (mode) => {
    const prompt = getAiModeConfig(mode).systemPrompt;
    for (const phrase of BANNED) {
      // The general ban rule names some wording as forbidden; the prompt must
      // never instruct the model to produce it.
      expect(prompt).not.toMatch(new RegExp(`use only[^.]*${phrase}`, "i"));
    }
    expect(prompt).not.toMatch(/end .*with a "Sources" section/i);
  });

  it("no longer tells the model to refuse when evidence is missing", () => {
    expect(GENERAL_SYSTEM_PROMPT).not.toMatch(/if the evidence does not answer the question/i);
    expect(GENERAL_SYSTEM_PROMPT).toMatch(/never mention evidence, sources/i);
  });

  it("gives the pregnancy week companion its own prompt", () => {
    expect(getAiModeConfig("pregnancy_week_companion").systemPrompt).not.toBe(GENERAL_SYSTEM_PROMPT);
    expect(getAiModeConfig("pregnancy_week_companion").systemPrompt).toMatch(/maternity unit or triage/i);
  });
});

describe("approved source routing", () => {
  const cases: Array<[string, string]> = [
    ["When will I feel the baby move?", APPROVED_SOURCES.movements],
    ["What can baby movements feel like?", APPROVED_SOURCES.movements],
    ["When should I call about reduced movements?", APPROVED_SOURCES.movements],
    ["What should I ask my midwife at an appointment?", APPROVED_SOURCES.appointments],
    ["Feeding cues", APPROVED_SOURCES.breastfeeding],
    ["When should I ask for help with feeding?", APPROVED_SOURCES.breastfeeding],
    ["What can help with night waking?", APPROVED_SOURCES.babySleep],
    ["When might testing make sense?", APPROVED_SOURCES.pregnancyTest],
    ["What can help during the two-week wait?", APPROVED_SOURCES.pregnancyTest],
  ];

  it.each(cases)("routes %s to a relevant approved page", (question, expected) => {
    expect(selectSources(question)).toContain(expected);
  });

  it("does not send routine questions to an emergency-only page", () => {
    for (const [question] of cases) {
      expect(selectSources(question)).not.toContain(APPROVED_SOURCES.babyUnwell);
      expect(selectSources(question)).not.toContain(APPROVED_SOURCES.mentalHealth);
    }
  });

  it("uses only approved URLs and at most three of them", () => {
    const approved = new Set<string>(Object.values(APPROVED_SOURCES));
    for (const [question] of [...cases, ["hello"], ["I feel very anxious"]] as Array<[string]>) {
      const urls = selectSources(question);
      expect(urls.length).toBeGreaterThan(0);
      expect(urls.length).toBeLessThanOrEqual(3);
      urls.forEach((url) => expect(approved.has(url)).toBe(true));
    }
  });
});
