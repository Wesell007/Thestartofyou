import { supabase } from "@/integrations/supabase/client";
import type { MemoryScope } from "@/lib/firstYearMemoriesSchema";

/** A kept moment, exactly as stored. */
export type FirstYearMemory = {
  id: string;
  memory_scope: MemoryScope;
  baby_id: string | null;
  memory_date: string;
  title: string | null;
  note: string;
  source_entry_id: string | null;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, memory_scope, baby_id, memory_date, title, note, source_entry_id, created_at, updated_at";

const toMemory = (row: Record<string, unknown>): FirstYearMemory => ({
  id: row.id as string,
  memory_scope: row.memory_scope as MemoryScope,
  baby_id: (row.baby_id as string | null) ?? null,
  memory_date: row.memory_date as string,
  title: (row.title as string | null) ?? null,
  note: (row.note as string | null) ?? "",
  source_entry_id: (row.source_entry_id as string | null) ?? null,
  created_at: row.created_at as string,
  updated_at: row.updated_at as string,
});

/** Every kept moment, newest first. */
export const getMemories = async (userId: string): Promise<FirstYearMemory[]> => {
  const { data, error } = await supabase
    .from("first_year_memories")
    .select(COLUMNS)
    .eq("user_id", userId)
    .order("memory_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toMemory);
};

/**
 * The most recent kept moments, for the quiet card on the First Year home.
 * Deliberately a small number: this is a glance, never a feed.
 */
export const getRecentMemories = async (
  userId: string,
  limit = 2,
): Promise<FirstYearMemory[]> => {
  const { data, error } = await supabase
    .from("first_year_memories")
    .select(COLUMNS)
    .eq("user_id", userId)
    .order("memory_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(toMemory);
};

type CreateInput = {
  userId: string;
  scope: MemoryScope;
  babyId: string | null;
  memoryDate: string;
  title: string | null;
  note: string;
  sourceEntryId?: string | null;
};

export const createMemory = async (input: CreateInput): Promise<FirstYearMemory> => {
  const { data, error } = await supabase
    .from("first_year_memories")
    .insert({
      user_id: input.userId,
      memory_scope: input.scope,
      baby_id: input.scope === "baby" ? input.babyId : null,
      memory_date: input.memoryDate,
      title: input.title,
      note: input.note.trim(),
      source_entry_id: input.sourceEntryId ?? null,
    })
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toMemory(data);
};

type UpdateInput = Omit<CreateInput, "sourceEntryId"> & { id: string };

/**
 * Update a kept moment. `source_entry_id` is never touched here: a memory is a
 * copy-forward of a check-in note, not a live link to it.
 */
export const updateMemory = async (input: UpdateInput): Promise<FirstYearMemory> => {
  const { data, error } = await supabase
    .from("first_year_memories")
    .update({
      memory_scope: input.scope,
      baby_id: input.scope === "baby" ? input.babyId : null,
      memory_date: input.memoryDate,
      title: input.title,
      note: input.note.trim(),
    })
    .eq("id", input.id)
    .eq("user_id", input.userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toMemory(data);
};

export const deleteMemory = async (userId: string, id: string): Promise<void> => {
  const { error } = await supabase
    .from("first_year_memories")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
};

export type MemorySource = {
  id: string;
  note: string;
  entry_date: string;
  baby_id: string | null;
};

/**
 * Read one check-in note to copy forward into a memory.
 *
 * The note text is never carried in the URL: only an id travels, and the row
 * is read back from the user-owned table with an explicit owner filter so a
 * borrowed id can never surface someone else's words.
 */
export const getMemorySource = async (
  userId: string,
  entryId: string,
): Promise<MemorySource | null> => {
  const { data, error } = await supabase
    .from("first_year_entries")
    .select("id, note, entry_date, baby_id")
    .eq("id", entryId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!data || !(data.note ?? "").trim()) return null;
  return {
    id: data.id as string,
    note: (data.note as string).trim(),
    entry_date: data.entry_date as string,
    baby_id: (data.baby_id as string | null) ?? null,
  };
};
