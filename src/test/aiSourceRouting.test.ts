import { describe, expect, it } from "vitest";
import {
  APPROVED_SOURCES,
  selectSources,
} from "../../supabase/functions/_shared/aiSources";
import { sanitiseAnswerForDisplay } from "@/lib/aiAnswerSafety";

/**
 * Phase 30B — deterministic coverage for the widened NHS source routing.
 *
 * These assert routing only: no prompt, mode, safety or rendering behaviour is
 * exercised here beyond the standing output-hygiene guarantee at the end.
 */

const NEW_COVERAGE: Array<[string, string]> = [
  ["What can help my body recover after birth?", APPROVED_SOURCES.postpartumBody],
  ["My stitches still feel sore, is that normal?", APPROVED_SOURCES.postpartumBody],
  ["How do I start pelvic floor exercises again?", APPROVED_SOURCES.postpartumBody],
  ["When can I start exercising with a baby?", APPROVED_SOURCES.postpartumFitness],
  ["What happens at the 6-week postnatal check?", APPROVED_SOURCES.postnatalCheck],
  ["What is covered in the six-week check?", APPROVED_SOURCES.postnatalCheck],
  ["When might my baby be ready for solid foods?", APPROVED_SOURCES.firstSolidFoods],
  ["How do I start weaning?", APPROVED_SOURCES.firstSolidFoods],
  ["Are finger foods safe at six months?", APPROVED_SOURCES.firstSolidFoods],
  ["What foods should I avoid giving my baby?", APPROVED_SOURCES.foodsToAvoid],
  ["Is honey safe for a baby?", APPROVED_SOURCES.foodsToAvoid],
  ["When should I move my baby to an open cup?", APPROVED_SOURCES.drinksAndCups],
  ["How can I help my toddler with first words?", APPROVED_SOURCES.learningToTalk],
  ["My toddler is not saying any words yet", APPROVED_SOURCES.learningToTalk],
  ["What are simple play ideas for a toddler?", APPROVED_SOURCES.toddlerActivities],
  ["Things to do with a toddler on a rainy day", APPROVED_SOURCES.toddlerActivities],
];

const EXISTING_COVERAGE: Array<[string, string]> = [
  ["When will I feel the baby move?", APPROVED_SOURCES.movements],
  ["When should I call about reduced movements?", APPROVED_SOURCES.movements],
  ["When might testing make sense?", APPROVED_SOURCES.pregnancyTest],
  ["What can help during the two-week wait?", APPROVED_SOURCES.pregnancyTest],
  ["How do I know my baby is getting enough milk?", APPROVED_SOURCES.breastfeeding],
  ["What can help with night waking?", APPROVED_SOURCES.babySleep],
  ["What should I ask my midwife at an appointment?", APPROVED_SOURCES.appointments],
  ["What are the early signs of labour?", APPROVED_SOURCES.labour],
  ["How does ovulation work in my cycle?", APPROVED_SOURCES.fertility],
];

describe("phase 30B source coverage", () => {
  it.each(NEW_COVERAGE)("routes %s to a relevant approved page", (question, expected) => {
    expect(selectSources(question)).toContain(expected);
  });
});

describe("existing routing is unchanged", () => {
  it.each(EXISTING_COVERAGE)("still routes %s correctly", (question, expected) => {
    expect(selectSources(question)).toContain(expected);
  });

  it("falls back to the broad pages for an unknown question", () => {
    expect(selectSources("hello")).toEqual([
      APPROVED_SOURCES.pregnancySymptoms,
      APPROVED_SOURCES.pregnancyHub,
    ]);
  });
});

describe("collision handling", () => {
  it("keeps an anxious movements question on the movements page", () => {
    const urls = selectSources("I feel anxious about my baby's movements today");
    expect(urls).toContain(APPROVED_SOURCES.movements);
    expect(urls).not.toContain(APPROVED_SOURCES.mentalHealth);
  });

  it("still routes dominant mental-health wording to the mental health page", () => {
    expect(selectSources("I have been having panic attacks and feel worthless")).toEqual([
      APPROVED_SOURCES.mentalHealth,
    ]);
    expect(selectSources("I feel very anxious all the time")).toContain(
      APPROVED_SOURCES.mentalHealth,
    );
  });

  it("treats cramping while breastfeeding as maternal recovery, not feeding only", () => {
    const urls = selectSources("Why do I get cramping while breastfeeding?");
    expect(urls).toContain(APPROVED_SOURCES.postpartumBody);
    expect(urls).not.toContain(APPROVED_SOURCES.breastfeeding);
  });

  it("does not let baby feeding or sleep swallow toddler speech", () => {
    const urls = selectSources("My toddler babbles but has no first words, and feeds well");
    expect(urls).toContain(APPROVED_SOURCES.learningToTalk);
    expect(urls).not.toContain(APPROVED_SOURCES.babySleep);
  });

  it("does not put the postnatal check on the antenatal appointments page", () => {
    expect(selectSources("What happens at my postnatal check?")).not.toContain(
      APPROVED_SOURCES.appointments,
    );
  });

  it("gives brand and product questions no misleading clinical grounding", () => {
    const brand = [
      "Does The Start of You app track my baby's feeds?",
      "How do I change my account password?",
      "Can I rename my companion in the app?",
    ];
    for (const question of brand) {
      const urls = selectSources(question);
      expect(urls).toEqual([APPROVED_SOURCES.pregnancySymptoms, APPROVED_SOURCES.pregnancyHub]);
      expect(urls).not.toContain(APPROVED_SOURCES.babyUnwell);
      expect(urls).not.toContain(APPROVED_SOURCES.mentalHealth);
    }
  });

  it("keeps routine questions away from emergency-only pages", () => {
    for (const [question] of [...NEW_COVERAGE, ...EXISTING_COVERAGE]) {
      const urls = selectSources(question);
      expect(urls).not.toContain(APPROVED_SOURCES.babyUnwell);
      expect(urls).not.toContain(APPROVED_SOURCES.mentalHealth);
    }
  });
});

describe("routing invariants", () => {
  const approved = new Set<string>(Object.values(APPROVED_SOURCES));

  it("returns at most three approved URLs, always at least one", () => {
    for (const [question] of [
      ...NEW_COVERAGE,
      ...EXISTING_COVERAGE,
      ["hello"] as [string],
      ["I feel very anxious"] as [string],
    ]) {
      const urls = selectSources(question);
      expect(urls.length).toBeGreaterThan(0);
      expect(urls.length).toBeLessThanOrEqual(3);
      urls.forEach((url) => expect(approved.has(url)).toBe(true));
    }
  });

  it("appends the family hub without duplicating it", () => {
    const urls = selectSources("What are simple play ideas for a toddler?");
    expect(urls).toContain(APPROVED_SOURCES.toddlerHub);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("uses only official NHS URLs", () => {
    for (const url of approved) {
      expect(url.startsWith("https://www.nhs.uk/")).toBe(true);
      expect(url.endsWith(".pdf")).toBe(false);
    }
  });
});

describe("URLs never reach the model or the reader", () => {
  it("keeps the new pages out of a displayed answer", () => {
    const raw = `Solid foods usually suit babies from around six months, when they can sit up, hold their head steady and bring food to their mouth. Signs vary, and it is fine to take it slowly. Read more at ${APPROVED_SOURCES.firstSolidFoods}\n\n## Sources\n\n- ${APPROVED_SOURCES.foodsToAvoid}`;
    const output = sanitiseAnswerForDisplay(raw);
    expect(output).not.toMatch(/https?:\/\/|www\./);
    expect(output.toLowerCase()).not.toContain("sources");
    expect(output).toContain("around six months");
  });

  it("strips retrieval wording from an answer about the new topics", () => {
    const output = sanitiseAnswerForDisplay(
      "Most babies are ready for solids at around six months. This is not covered in the provided NHS evidence.",
    );
    expect(output.toLowerCase()).not.toContain("provided nhs evidence");
  });
});
