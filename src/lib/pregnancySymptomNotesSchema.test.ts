import { describe, expect, it } from "vitest";
import {
  personalNoteLevelFromDatabase,
  personalNoteLevelToDatabase,
} from "@/lib/pregnancySymptomNotesSchema";

describe("pregnancy symptom personal note levels", () => {
  it("maps interface labels to the database smallint constraint", () => {
    expect(personalNoteLevelToDatabase("a_little")).toBe(1);
    expect(personalNoteLevelToDatabase("noticeable")).toBe(2);
    expect(personalNoteLevelToDatabase("hard_to_ignore")).toBe(3);
    expect(personalNoteLevelToDatabase(null)).toBeNull();
  });

  it("maps stored values back to interface labels safely", () => {
    expect(personalNoteLevelFromDatabase(1)).toBe("a_little");
    expect(personalNoteLevelFromDatabase(2)).toBe("noticeable");
    expect(personalNoteLevelFromDatabase(3)).toBe("hard_to_ignore");
    expect(personalNoteLevelFromDatabase(99)).toBeNull();
    expect(personalNoteLevelFromDatabase(null)).toBeNull();
  });
});
