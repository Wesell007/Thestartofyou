import { supabase } from "@/integrations/supabase/client";
import {
  laneForKind,
  localDateKey,
  normaliseTags,
  type EntryKind,
  type EntryLane,
} from "@/lib/firstYearEntriesSchema";
import { subDays, format } from "date-fns";

/** A saved daily check-in entry, exactly as stored. */
export type FirstYearEntry = {
  id: string;
  baby_id: string | null;
  entry_date: string;
  lane: EntryLane;
  kind: EntryKind;
  note: string | null;
  tags: string[];
  answered: boolean;
  updated_at: string;
};

const COLUMNS = "id, baby_id, entry_date, lane, kind, note, tags, answered, updated_at";

const toEntry = (row: Record<string, unknown>): FirstYearEntry => ({
  id: row.id as string,
  baby_id: (row.baby_id as string | null) ?? null,
  entry_date: row.entry_date as string,
  lane: row.lane as EntryLane,
  kind: row.kind as EntryKind,
  note: (row.note as string | null) ?? null,
  tags: (row.tags as string[] | null) ?? [],
  answered: Boolean(row.answered),
  updated_at: row.updated_at as string,
});

/** Every entry saved for one local calendar day. */
export const getEntriesForDate = async (
  userId: string,
  entryDate: string,
): Promise<FirstYearEntry[]> => {
  const { data, error } = await supabase
    .from("first_year_entries")
    .select(COLUMNS)
    .eq("user_id", userId)
    .eq("entry_date", entryDate)
    .order("kind", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toEntry);
};

/**
 * Entries from the last `days` calendar days, newest day first. Used for the
 * quiet "recent notes" list, never for scoring or streaks.
 */
export const getRecentEntries = async (
  userId: string,
  days = 7,
  reference: Date = new Date(),
): Promise<FirstYearEntry[]> => {
  const from = format(subDays(reference, days - 1), "yyyy-MM-dd");
  const { data, error } = await supabase
    .from("first_year_entries")
    .select(COLUMNS)
    .eq("user_id", userId)
    .gte("entry_date", from)
    .order("entry_date", { ascending: false })
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toEntry);
};

type SaveInput = {
  userId: string;
  kind: EntryKind;
  babyId: string | null;
  entryDate: string;
  note: string;
  tags?: string[];
  answered?: boolean;
};

const findExisting = async (input: SaveInput): Promise<string | null> => {
  let query = supabase
    .from("first_year_entries")
    .select("id")
    .eq("user_id", input.userId)
    .eq("entry_date", input.entryDate)
    .eq("kind", input.kind);
  query = input.babyId ? query.eq("baby_id", input.babyId) : query.is("baby_id", null);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
};

/**
 * Save one entry.
 *
 * Deliberately not a client upsert: partial unique indexes are unreliable as
 * conflict targets from the client. Instead we look the row up by its natural
 * key, update when it exists and insert when it does not. A duplicate-key race
 * is recovered by refetching and updating, so a parent never sees an error for
 * pressing save twice. Every write goes through the table, so the database
 * validation trigger always applies.
 */
export const saveEntry = async (input: SaveInput): Promise<FirstYearEntry> => {
  const lane = laneForKind(input.kind);
  const payload = {
    user_id: input.userId,
    baby_id: lane === "baby" ? input.babyId : null,
    entry_date: input.entryDate,
    lane,
    kind: input.kind,
    note: input.note.trim(),
    tags: normaliseTags(input.tags),
    answered: input.answered ?? false,
  };

  const update = async (id: string): Promise<FirstYearEntry> => {
    const { data, error } = await supabase
      .from("first_year_entries")
      .update({ note: payload.note, tags: payload.tags, answered: payload.answered })
      .eq("id", id)
      .eq("user_id", input.userId)
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return toEntry(data);
  };

  const existingId = await findExisting(input);
  if (existingId) return update(existingId);

  const { data, error } = await supabase
    .from("first_year_entries")
    .insert(payload)
    .select(COLUMNS)
    .single();

  if (error) {
    // 23505: another save for the same day and kind landed first.
    if (error.code === "23505") {
      const raced = await findExisting(input);
      if (raced) return update(raced);
    }
    throw error;
  }
  return toEntry(data);
};

/**
 * Save the same baby note for several babies. Used by the "All babies" option
 * so a parent of multiples never has to write the same note more than once.
 */
export const saveEntryForBabies = async (
  input: Omit<SaveInput, "babyId"> & { babyIds: string[] },
): Promise<FirstYearEntry[]> => {
  const saved: FirstYearEntry[] = [];
  for (const babyId of input.babyIds) {
    saved.push(await saveEntry({ ...input, babyId }));
  }
  return saved;
};

export const deleteEntry = async (userId: string, id: string): Promise<void> => {
  const { error } = await supabase
    .from("first_year_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
};

/** Count of entries saved today, for the quiet Today card summary. */
export const countEntriesForDate = async (
  userId: string,
  entryDate: string = localDateKey(),
): Promise<number> => {
  const { count, error } = await supabase
    .from("first_year_entries")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("entry_date", entryDate);
  if (error) throw error;
  return count ?? 0;
};
