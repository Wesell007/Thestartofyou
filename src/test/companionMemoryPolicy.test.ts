import { describe, expect, it } from "vitest";
import {
  classifyMemoryCategory,
  evaluateMemoryCandidate,
  findExactMemory,
  isDuplicateMemory,
  MEMORY_VALUE_MAX_LENGTH,
  normaliseMemoryValue,
  resolveForgetTarget,
  resolveReplacementTarget,
  type CompanionMemory,
} from "@/lib/companion/memory/companionMemoryPolicy";

const memory = (id: string, value: string): CompanionMemory => ({
  id,
  value,
  category: "other",
  source: "explicit_command",
  updatedAt: "2026-01-01T00:00:00Z",
});

describe("AIC-3 memory policy", () => {
  it("normalises whitespace and case the same way the database does", () => {
    expect(normaliseMemoryValue("  I  Prefer   Short answers ")).toBe("i prefer short answers");
  });

  it("refuses credentials and secrets", () => {
    for (const value of [
      "my password is hunter2",
      "the pin is 4821",
      "my api key is abc123",
      "my card number is 4111 1111 1111 1111",
      "my login details are saved",
    ]) {
      const result = evaluateMemoryCandidate(value);
      expect(result.ok).toBe(false);
      if (result.ok === false) expect(result.reason).toBe("secret");
    }
  });

  it("refuses clinical and diagnostic content", () => {
    const result = evaluateMemoryCandidate("I was diagnosed with gestational diabetes");
    expect(result.ok).toBe(false);
    if (result.ok === false) expect(result.reason).toBe("clinical");
  });

  it("refuses empty and over-long values", () => {
    expect(evaluateMemoryCandidate("  ").ok).toBe(false);
    expect(evaluateMemoryCandidate("a".repeat(MEMORY_VALUE_MAX_LENGTH + 1)).ok).toBe(false);
  });

  it("classifies deterministically and falls back to other", () => {
    expect(classifyMemoryCategory("I prefer short answers")).toBe("preference");
    expect(classifyMemoryCategory("please remind me gently")).toBe("support_preference");
    expect(classifyMemoryCategory("my partner is called Sam")).toBe("relationship");
    expect(classifyMemoryCategory("qwerty zxcvb")).toBe("other");
    // Same input, same category, every time.
    expect(classifyMemoryCategory("I prefer short answers")).toBe("preference");
  });

  it("accepts an ordinary preference and returns the trimmed value", () => {
    const result = evaluateMemoryCandidate("  I prefer   short answers  ");
    expect(result).toMatchObject({ ok: true, value: "I prefer short answers", category: "preference" });
  });

  it("spots duplicates by normalised value", () => {
    const existing = [memory("1", "I prefer short answers")];
    expect(isDuplicateMemory(existing, "i PREFER short   answers")).toBe(true);
    expect(findExactMemory(existing, "something else")).toBeNull();
  });

  it("only replaces an exactly named memory", () => {
    const existing = [memory("1", "I prefer short answers"), memory("2", "I prefer long answers")];
    expect(resolveReplacementTarget(existing, "I prefer short answers")).toMatchObject({ ok: true });
    expect(resolveReplacementTarget(existing, "answers")).toMatchObject({ ok: false });
  });

  it("asks rather than guesses when a forget target is ambiguous", () => {
    const existing = [memory("1", "I like tea"), memory("2", "I like coffee")];
    expect(resolveForgetTarget(existing, "I like", null)).toMatchObject({ ok: false, reason: "ambiguous" });
    expect(resolveForgetTarget(existing, "I like tea", null)).toMatchObject({ ok: true });
    expect(resolveForgetTarget(existing, "cake", null)).toMatchObject({ ok: false, reason: "not_found" });
    expect(resolveForgetTarget(existing, null, null)).toMatchObject({ ok: false, reason: "ambiguous" });
    expect(resolveForgetTarget(existing, null, existing[0])).toMatchObject({ ok: true });
  });
});
