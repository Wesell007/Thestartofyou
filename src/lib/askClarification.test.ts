import { describe, expect, it } from "vitest";
import { hasConcernWording, resolveAskClarification } from "@/lib/askClarification";

describe("resolveAskClarification", () => {
  it("clarifies broad harmless terms", () => {
    for (const term of ["Milestones", "Feeding", "Sleep", "Symptoms", "Movement", "Testing"]) {
      const result = resolveAskClarification(term);
      expect(result, term).not.toBeNull();
      expect(result!.question.length).toBeGreaterThan(20);
      expect(result!.chips.length).toBeGreaterThan(1);
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
      expect(resolveAskClarification(query), query).toBeNull();
    }
  });

  it("does not clarify specific questions", () => {
    expect(resolveAskClarification("When will I feel the baby move?")).toBeNull();
    expect(resolveAskClarification("Sleep regression")).toBeNull();
    expect(resolveAskClarification("")).toBeNull();
  });

  it("every chip question resolves to a real question, never back to clarification", () => {
    for (const term of ["Milestones", "Feeding", "Sleep", "Symptoms", "Movement", "Testing"]) {
      const result = resolveAskClarification(term)!;
      for (const chip of result.chips) {
        expect(chip.question.trim().length, chip.label).toBeGreaterThan(10);
        expect(resolveAskClarification(chip.question), chip.label).toBeNull();
      }
      const concernChip = result.chips.find((c) => c.focusInput);
      expect(concernChip).toBeDefined();
    }
  });

  it("milestones offers the expected chips", () => {
    const result = resolveAskClarification("milestones")!;
    expect(result.chips.map((c) => c.label)).toEqual([
      "Pregnancy milestones",
      "Baby milestones",
      "Toddler development",
      "Something I am worried about",
    ]);
    expect(result.chips[0].question).toBe("What pregnancy milestones should I know about?");
  });

  it("flags concern wording independently", () => {
    expect(hasConcernWording("reduced movements")).toBe(true);
    expect(hasConcernWording("milestones")).toBe(false);
  });
});
