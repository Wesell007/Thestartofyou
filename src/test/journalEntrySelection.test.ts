/**
 * AIC-JA3 — the client mirror of the selected-entry reference must agree with
 * the authoritative server parser, and must refuse anything it cannot prove.
 */

import { describe, expect, it } from "vitest";
import {
  buildJournalEntryRef,
  JOURNAL_ENTRY_SOURCES,
  JOURNAL_ENTRY_SOURCE_JOURNEY,
  JOURNAL_ENTRY_SOURCE_LABEL,
} from "@/lib/companion/journal/journalEntryRef";
import {
  parseJournalEntryRef,
  JOURNAL_ENTRY_SOURCES as SERVER_SOURCES,
} from "../../supabase/functions/_shared/journalEntryRefContract";

const UUID = "6f1a7c1e-8a2b-4c3d-9e4f-5a6b7c8d9e0f";

describe("journal entry reference contract", () => {
  it("uses exactly the same source list on both sides", () => {
    expect([...JOURNAL_ENTRY_SOURCES]).toEqual([...SERVER_SOURCES]);
  });

  it("builds a reference carrying only version, source and id", () => {
    const ref = buildJournalEntryRef("ttc_note", UUID);
    expect(ref).toEqual({ version: 1, source: "ttc_note", id: UUID });
    expect(Object.keys(ref ?? {})).toHaveLength(3);
  });

  it("refuses anything that is not a real stored id", () => {
    expect(buildJournalEntryRef("ttc_note", "")).toBeNull();
    expect(buildJournalEntryRef("ttc_note", null)).toBeNull();
    expect(buildJournalEntryRef("ttc_note", "week-21")).toBeNull();
    expect(buildJournalEntryRef("ttc_note", "12345")).toBeNull();
  });

  it("is accepted by the authoritative server parser", () => {
    for (const source of JOURNAL_ENTRY_SOURCES) {
      const ref = buildJournalEntryRef(source, UUID);
      expect(parseJournalEntryRef(ref)).toEqual(ref);
    }
  });

  it("rejects wrong versions, unknown sources and extra fields", () => {
    expect(parseJournalEntryRef({ version: 2, source: "ttc_note", id: UUID })).toBeNull();
    expect(parseJournalEntryRef({ version: 1, source: "week_photo", id: UUID })).toBeNull();
    expect(parseJournalEntryRef({ version: 1, source: "ttc_note", id: UUID, userId: "x" })).toBeNull();
    expect(parseJournalEntryRef({ version: 1, source: "ttc_note", id: "not-a-uuid" })).toBeNull();
    expect(parseJournalEntryRef(null)).toBeNull();
    expect(parseJournalEntryRef("ttc_note")).toBeNull();
  });

  it("labels sources generically, never with the person's own words", () => {
    for (const source of JOURNAL_ENTRY_SOURCES) {
      expect(JOURNAL_ENTRY_SOURCE_LABEL[source]).toBeTruthy();
      expect(JOURNAL_ENTRY_SOURCE_JOURNEY[source]).toBeTruthy();
    }
  });
});
