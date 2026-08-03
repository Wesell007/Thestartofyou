import { describe, expect, it } from "vitest";
import {
  BIRTH_PLAN_BANDS,
  BIRTH_PLAN_SECTIONS,
  answeredCount,
  bandHasAnswers,
  sectionsForBand,
} from "./birthPlanSchema";

describe("birth plan bands", () => {
  it("places every section in exactly one band", () => {
    const keys = BIRTH_PLAN_BANDS.flatMap((b) => b.sectionKeys);
    expect(new Set(keys).size).toBe(keys.length);
    expect([...keys].sort()).toEqual(BIRTH_PLAN_SECTIONS.map((s) => s.key).sort());
  });

  it("keeps a stable band order", () => {
    expect(BIRTH_PLAN_BANDS.map((b) => b.id)).toEqual([
      "on_the_day",
      "people",
      "after_birth",
      "your_words",
    ]);
  });

  it("resolves sections for a band in declared order", () => {
    expect(sectionsForBand("on_the_day").map((s) => s.key)).toEqual([
      "birth",
      "labour",
      "pain_relief",
      "environment",
    ]);
    expect(sectionsForBand("your_words").map((s) => s.key)).toEqual(["midwife_notes"]);
  });
});

describe("answeredCount", () => {
  it("counts selected choices", () => {
    expect(answeredCount({ choices: ["a", "b"], notes: "" })).toBe(2);
  });
  it("is zero for notes only", () => {
    expect(answeredCount({ choices: [], notes: "hello" })).toBe(0);
  });
  it("is zero for an undefined answer", () => {
    expect(answeredCount(undefined)).toBe(0);
  });
});

describe("bandHasAnswers", () => {
  const band = BIRTH_PLAN_BANDS[0];

  it("is false when nothing in the band is answered", () => {
    expect(bandHasAnswers({}, band)).toBe(false);
    expect(bandHasAnswers({ midwife_notes: { choices: [], notes: "hi" } }, band)).toBe(false);
  });

  it("is true when a section in the band has choices or notes", () => {
    expect(bandHasAnswers({ birth: { choices: ["Keep me informed"], notes: "" } }, band)).toBe(true);
    expect(bandHasAnswers({ labour: { choices: [], notes: "Move about" } }, band)).toBe(true);
  });
});
