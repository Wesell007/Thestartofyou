import { beforeEach, describe, expect, it } from "vitest";

import {
  FIRST_YEAR_PENDING_TTL_MS,
  clearPendingFirstYearSetup,
  readPendingFirstYearSetup,
  stashPendingFirstYearSetup,
} from "@/lib/firstYearPendingSetup";

const KEY = "pendingFirstYearSetup";

describe("First Year pre-auth setup state", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("keeps only baby count, date of birth, typed names and a timestamp", () => {
    stashPendingFirstYearSetup(
      { babyCount: 2, dateOfBirth: "2026-01-02", names: ["Ada", ""] },
      1000,
    );
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    expect(Object.keys(stored).sort()).toEqual([
      "babyCount",
      "dateOfBirth",
      "names",
      "savedAt",
    ]);
    expect(stored).toMatchObject({
      babyCount: 2,
      dateOfBirth: "2026-01-02",
      names: ["Ada", ""],
      savedAt: 1000,
    });
  });

  it("reads back a fresh record without extending its expiry", () => {
    stashPendingFirstYearSetup(
      { babyCount: 1, dateOfBirth: "2026-01-02", names: ["Ada"] },
      1000,
    );
    const read = readPendingFirstYearSetup(1000 + FIRST_YEAR_PENDING_TTL_MS - 1);
    expect(read?.savedAt).toBe(1000);
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    expect(stored.savedAt).toBe(1000);
  });

  it("clears and reports nothing once 24 hours have passed", () => {
    stashPendingFirstYearSetup(
      { babyCount: 1, dateOfBirth: "2026-01-02", names: [] },
      1000,
    );
    expect(readPendingFirstYearSetup(1000 + FIRST_YEAR_PENDING_TTL_MS)).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("clears malformed or out-of-range records", () => {
    localStorage.setItem(KEY, "not json");
    expect(readPendingFirstYearSetup()).toBeNull();
    localStorage.setItem(
      KEY,
      JSON.stringify({ babyCount: 9, dateOfBirth: "2026-01-02", names: [], savedAt: 1 }),
    );
    expect(readPendingFirstYearSetup()).toBeNull();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("clears on an explicit reset", () => {
    stashPendingFirstYearSetup({ babyCount: 1, dateOfBirth: "2026-01-02", names: [] });
    clearPendingFirstYearSetup();
    expect(readPendingFirstYearSetup()).toBeNull();
  });
});
