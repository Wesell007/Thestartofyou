import { beforeEach, describe, expect, it } from "vitest";
import {
  clearJournalOwner,
  isJournalOwner,
  journalBridgeVariant,
  setJournalOwner,
} from "./journalOwner";

describe("journalOwner preference", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults to false", () => {
    expect(isJournalOwner()).toBe(false);
    expect(journalBridgeVariant()).toBe("discovery");
  });

  it("can be set and read back", () => {
    setJournalOwner();
    expect(window.localStorage.getItem("theStartOfYou:pregnancyJournalOwner")).toBe("true");
    expect(isJournalOwner()).toBe(true);
    expect(journalBridgeVariant()).toBe("owner");
  });

  it("can be cleared", () => {
    setJournalOwner();
    clearJournalOwner();
    expect(isJournalOwner()).toBe(false);
  });

  it("ignores unexpected stored values", () => {
    window.localStorage.setItem("theStartOfYou:pregnancyJournalOwner", "maybe");
    expect(isJournalOwner()).toBe(false);
  });
});
