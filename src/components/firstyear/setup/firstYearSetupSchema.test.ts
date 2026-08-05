import { describe, expect, it } from "vitest";
import {
  buildBabyPayload,
  createEmptyDraft,
  isDraftValid,
  setBabyCount,
  setBabyName,
  validateDraft,
} from "./firstYearSetupSchema";

const REFERENCE = new Date(2026, 7, 5); // 5 August 2026, local

const draftWith = (overrides: Partial<ReturnType<typeof createEmptyDraft>> = {}) => ({
  ...createEmptyDraft(),
  dateOfBirth: "2026-08-01",
  ...overrides,
});

describe("validateDraft", () => {
  it("accepts one baby with a recent date of birth", () => {
    expect(validateDraft(draftWith(), REFERENCE)).toEqual({});
    expect(isDraftValid(draftWith(), REFERENCE)).toBe(true);
  });

  it("requires a date of birth", () => {
    const errors = validateDraft(draftWith({ dateOfBirth: "" }), REFERENCE);
    expect(errors.dateOfBirth).toBe("Please add a date of birth.");
  });

  it("rejects malformed dates", () => {
    const errors = validateDraft(draftWith({ dateOfBirth: "2026-13-45" }), REFERENCE);
    expect(errors.dateOfBirth).toBe("Please add a valid date of birth.");
  });

  it("blocks future dates", () => {
    const errors = validateDraft(draftWith({ dateOfBirth: "2026-08-06" }), REFERENCE);
    expect(errors.dateOfBirth).toBe("A date of birth cannot be in the future.");
  });

  it("blocks dates far beyond the first five years", () => {
    const errors = validateDraft(draftWith({ dateOfBirth: "2010-01-01" }), REFERENCE);
    expect(errors.dateOfBirth).toContain("too far in the past");
  });

  it("limits optional names to 60 characters", () => {
    const draft = setBabyName(draftWith(), 0, "a".repeat(61));
    expect(validateDraft(draft, REFERENCE).names?.[0]).toContain("60 characters");
  });

  it("accepts a 60 character name", () => {
    const draft = setBabyName(draftWith(), 0, "a".repeat(60));
    expect(validateDraft(draft, REFERENCE).names).toBeUndefined();
  });
});

describe("setBabyCount", () => {
  it("clamps to one to four babies", () => {
    expect(setBabyCount(createEmptyDraft(), 0).babyCount).toBe(1);
    expect(setBabyCount(createEmptyDraft(), 9).babyCount).toBe(4);
  });

  it("keeps the rows in place when the count changes", () => {
    let draft = setBabyCount(draftWith(), 3);
    draft = setBabyName(draft, 0, "Ada");
    draft = setBabyName(draft, 1, "Bea");
    draft = setBabyName(draft, 2, "Cal");

    const shrunk = setBabyCount(draft, 2);
    expect(shrunk.babies.map((b) => b.name)).toEqual(["Ada", "Bea"]);

    const regrown = setBabyCount(shrunk, 3);
    expect(regrown.babies.map((b) => b.name)).toEqual(["Ada", "Bea", ""]);
  });
});

describe("buildBabyPayload", () => {
  it("gives every baby the shared date of birth and row-order birth order", () => {
    let draft = setBabyCount(draftWith(), 4);
    draft = setBabyName(draft, 0, "  Ada  ");
    draft = setBabyName(draft, 2, "Cal");

    expect(buildBabyPayload(draft)).toEqual([
      { date_of_birth: "2026-08-01", name: "Ada", birth_order: 1 },
      { date_of_birth: "2026-08-01", name: null, birth_order: 2 },
      { date_of_birth: "2026-08-01", name: "Cal", birth_order: 3 },
      { date_of_birth: "2026-08-01", name: null, birth_order: 4 },
    ]);
  });

  it("supports twins and triplets", () => {
    expect(buildBabyPayload(setBabyCount(draftWith(), 2))).toHaveLength(2);
    expect(buildBabyPayload(setBabyCount(draftWith(), 3))).toHaveLength(3);
  });
});
