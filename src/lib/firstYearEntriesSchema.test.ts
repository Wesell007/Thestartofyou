import { describe, expect, it } from "vitest";
import {
  KIND_LABELS,
  laneForKind,
  localDateKey,
  normaliseTags,
  validateEntryDraft,
  type EntryDraft,
} from "@/lib/firstYearEntriesSchema";

const draft = (over: Partial<EntryDraft> = {}): EntryDraft => ({
  lane: "baby",
  kind: "rhythm",
  babyId: "baby-1",
  entryDate: "2026-08-06",
  note: "Settled after the afternoon feed.",
  ...over,
});

describe("laneForKind", () => {
  it("keeps baby kinds in the baby lane", () => {
    expect(laneForKind("rhythm")).toBe("baby");
    expect(laneForKind("nappies")).toBe("baby");
  });

  it("keeps parent kinds in the parent lane", () => {
    expect(laneForKind("recovery")).toBe("parent");
    expect(laneForKind("question")).toBe("parent");
  });

  it("has a label for every kind", () => {
    expect(Object.keys(KIND_LABELS)).toHaveLength(8);
  });
});

describe("localDateKey", () => {
  it("uses the local calendar day, not UTC", () => {
    // Late evening local time in a positive-offset zone would roll forward
    // under toISOString(); the local key must not.
    const reference = new Date(2026, 7, 6, 23, 30);
    expect(localDateKey(reference)).toBe("2026-08-06");
  });
});

describe("normaliseTags", () => {
  it("trims, drops blanks and caps the count", () => {
    expect(normaliseTags([" calm ", "", "  "])).toEqual(["calm"]);
    expect(normaliseTags(Array.from({ length: 12 }, (_, i) => `t${i}`))).toHaveLength(8);
  });
});

describe("validateEntryDraft", () => {
  it("accepts a complete baby note", () => {
    const result = validateEntryDraft(draft(), { today: "2026-08-06" });
    expect(result.ok).toBe(true);
  });

  it("rejects an empty note", () => {
    const result = validateEntryDraft(draft({ note: "   " }), { today: "2026-08-06" });
    expect(result).toMatchObject({ ok: false });
  });

  it("requires a baby for baby-lane notes", () => {
    const result = validateEntryDraft(draft({ babyId: null }), { today: "2026-08-06" });
    expect(result).toMatchObject({ ok: false });
  });

  it("refuses a baby on parent-lane notes", () => {
    const result = validateEntryDraft(
      draft({ lane: "parent", kind: "recovery", babyId: "baby-1" }),
      { today: "2026-08-06" },
    );
    expect(result).toMatchObject({ ok: false });
  });

  it("blocks future dates", () => {
    const result = validateEntryDraft(draft({ entryDate: "2026-08-07" }), { today: "2026-08-06" });
    expect(result).toMatchObject({ ok: false });
  });

  it("blocks dates before the baby was born", () => {
    const result = validateEntryDraft(draft({ entryDate: "2026-07-01" }), {
      today: "2026-08-06",
      earliestDateOfBirth: "2026-07-20",
    });
    expect(result).toMatchObject({ ok: false });
  });

  it("returns trimmed content when valid", () => {
    const result = validateEntryDraft(draft({ note: "  quiet morning  ", tags: [" calm "] }), {
      today: "2026-08-06",
    });
    expect(result).toEqual({ ok: true, note: "quiet morning", tags: ["calm"] });
  });
});
