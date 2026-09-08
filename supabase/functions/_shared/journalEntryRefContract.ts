/**
 * AIC-JA3 — the typed reference to one explicitly selected journal entry.
 *
 * This is the ONLY journal information a browser may send. It carries no text,
 * no user id, no baby id, no journey id, no date, no week, no month, no
 * storage path and no media. The server loads the record itself, under the
 * caller's own session, and decides everything else.
 *
 * This parser is authoritative. A minimal mirror type exists on the client
 * (`src/lib/companion/journal/journalEntryRef.ts`) purely so the browser can
 * construct a well-formed reference without importing Deno-flavoured modules;
 * parity between the two is proved by test, and the client type has no
 * authority whatsoever.
 */

/** Every source JA3 V1 will ever accept. Text-only, user-written only. */
export const JOURNAL_ENTRY_SOURCES = [
  "pregnancy_reflection",
  "first_year_entry",
  "first_year_memory",
  "ttc_note",
] as const;

export type JournalEntrySource = (typeof JOURNAL_ENTRY_SOURCES)[number];

export interface JournalEntryRefV1 {
  version: 1;
  source: JournalEntrySource;
  id: string;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Strict parse. `null` means "there is no selected entry for this request" —
 * never an error, never an explanation, and never a hint about whether a
 * record exists. The ordinary question always continues.
 *
 * The source is never inferred from an id, and no other field is read: an
 * object carrying `text`, `user_id`, `baby_id` or anything else contributes
 * nothing, because only `version`, `source` and `id` are ever consulted.
 */
export const parseJournalEntryRef = (value: unknown): JournalEntryRefV1 | null => {
  if (!isRecord(value)) return null;
  if (value.version !== 1) return null;
  const source = value.source;
  if (typeof source !== "string") return null;
  if (!(JOURNAL_ENTRY_SOURCES as readonly string[]).includes(source)) return null;
  // Anything beyond the three known fields is not a reference this version
  // understands, so it resolves to no selected context rather than being
  // partially trusted.
  const keys = Object.keys(value);
  if (keys.length !== 3) return null;
  if (!keys.every((key) => key === "version" || key === "source" || key === "id")) return null;
  const id = value.id;
  if (typeof id !== "string" || !UUID_PATTERN.test(id.trim())) return null;
  return { version: 1, source: source as JournalEntrySource, id: id.trim() };
};

/** Which lifecycle a source belongs to. Drives the JA3 V1 current-only rule. */
export const JOURNAL_ENTRY_SOURCE_LIFECYCLE: Record<JournalEntrySource, string> = {
  pregnancy_reflection: "pregnancy",
  first_year_entry: "first_year",
  first_year_memory: "first_year",
  ttc_note: "ttc",
};
