import { describe, expect, it } from "vitest";
import {
  MEMORY_NOTE_MAX_LENGTH,
  MEMORY_TITLE_MAX_LENGTH,
  localMemoryDateKey,
  memoryMonthKey,
  memoryMonthLabel,
  validateMemoryDraft,
  type MemoryDraft,
} from "./firstYearMemoriesSchema";

const base: MemoryDraft = {
  scope: "family",
  babyId: null,
  memoryDate: "2026-08-10",
  title: "",
  note: "She fell asleep halfway through a song.",
};

const options = { earliestDateOfBirth: "2026-06-01", today: "2026-08-10" };

describe("validateMemoryDraft", () => {
  it("accepts a family moment", () => {
    const result = validateMemoryDraft(base, options);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.scope).toBe("family");
      expect(result.babyId).toBeNull();
      expect(result.title).toBeNull();
    }
  });

  it("rejects an empty note", () => {
    const result = validateMemoryDraft({ ...base, note: "   " }, options);
    expect(result.ok).toBe(false);
  });

  it("rejects a note over the limit", () => {
    const result = validateMemoryDraft(
      { ...base, note: "a".repeat(MEMORY_NOTE_MAX_LENGTH + 1) },
      options,
    );
    expect(result.ok).toBe(false);
  });

  it("rejects a title over the limit", () => {
    const result = validateMemoryDraft(
      { ...base, title: "t".repeat(MEMORY_TITLE_MAX_LENGTH + 1) },
      options,
    );
    expect(result.ok).toBe(false);
  });

  it("keeps a trimmed title when one is given", () => {
    const result = validateMemoryDraft({ ...base, title: "  First giggle  " }, options);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.title).toBe("First giggle");
  });

  it("rejects a future date", () => {
    const result = validateMemoryDraft({ ...base, memoryDate: "2026-08-11" }, options);
    expect(result.ok).toBe(false);
  });

  it("rejects a date before the earliest baby was born", () => {
    const result = validateMemoryDraft({ ...base, memoryDate: "2026-05-31" }, options);
    expect(result.ok).toBe(false);
  });

  it("rejects an unreadable date", () => {
    const result = validateMemoryDraft({ ...base, memoryDate: "not-a-date" }, options);
    expect(result.ok).toBe(false);
  });

  it("requires a baby when the scope is one baby", () => {
    const result = validateMemoryDraft({ ...base, scope: "baby", babyId: null }, options);
    expect(result.ok).toBe(false);
  });

  it("rejects a baby on a family moment", () => {
    const result = validateMemoryDraft({ ...base, scope: "family", babyId: "baby-1" }, options);
    expect(result.ok).toBe(false);
  });

  it("rejects a baby on an all babies moment", () => {
    const result = validateMemoryDraft(
      { ...base, scope: "all_babies", babyId: "baby-1" },
      options,
    );
    expect(result.ok).toBe(false);
  });

  it("keeps the baby on a single baby moment", () => {
    const result = validateMemoryDraft({ ...base, scope: "baby", babyId: "baby-1" }, options);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.babyId).toBe("baby-1");
  });
});

describe("date helpers", () => {
  it("uses the local calendar date, not UTC", () => {
    const lateEvening = new Date(2026, 7, 10, 23, 30);
    expect(localMemoryDateKey(lateEvening)).toBe("2026-08-10");
  });

  it("groups by month", () => {
    expect(memoryMonthKey("2026-08-10")).toBe("2026-08");
    expect(memoryMonthLabel("2026-08-10")).toBe("August 2026");
  });
});
