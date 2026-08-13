import { supabase } from "@/integrations/supabase/client";
import type { MemoryScope } from "@/lib/firstYearMemoriesSchema";
import {
  MEMORY_PHOTO_BUCKET,
  buildMemoryPhotoPath,
  isMemoryPhotoPathOwned,
  type PreparedMemoryPhoto,
} from "@/lib/firstYearMemoryPhoto";

/** A kept moment, exactly as stored. */
export type FirstYearMemory = {
  id: string;
  memory_scope: MemoryScope;
  baby_id: string | null;
  memory_date: string;
  title: string | null;
  note: string;
  source_entry_id: string | null;
  photo_path: string | null;
  photo_mime: string | null;
  photo_size_bytes: number | null;
  photo_width: number | null;
  photo_height: number | null;
  created_at: string;
  updated_at: string;
};

const COLUMNS =
  "id, memory_scope, baby_id, memory_date, title, note, source_entry_id, photo_path, photo_mime, photo_size_bytes, photo_width, photo_height, created_at, updated_at";

const toMemory = (row: Record<string, unknown>): FirstYearMemory => ({
  id: row.id as string,
  memory_scope: row.memory_scope as MemoryScope,
  baby_id: (row.baby_id as string | null) ?? null,
  memory_date: row.memory_date as string,
  title: (row.title as string | null) ?? null,
  note: (row.note as string | null) ?? "",
  source_entry_id: (row.source_entry_id as string | null) ?? null,
  photo_path: (row.photo_path as string | null) ?? null,
  photo_mime: (row.photo_mime as string | null) ?? null,
  photo_size_bytes: (row.photo_size_bytes as number | null) ?? null,
  photo_width: (row.photo_width as number | null) ?? null,
  photo_height: (row.photo_height as number | null) ?? null,
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
 * Update a kept moment's words. `source_entry_id` is never touched here: a
 * memory is a copy-forward of a check-in note, not a live link to it. Photo
 * fields are left alone too, so a text edit can never drop a photo.
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

// ─────────────────────────────────────────────────────────────────────────────
// Photos
//
// The written memory always comes first. A photo is uploaded only after the
// words are safely saved, and a photo problem never takes the words away.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Best-effort removal of a stored object. Never throws: a private orphaned
 * file is far kinder than a memory card pointing at an image that is gone.
 */
export const removeMemoryPhotoObject = async (path: string | null): Promise<void> => {
  if (!path) return;
  const { error } = await supabase.storage.from(MEMORY_PHOTO_BUCKET).remove([path]);
  if (error) {
    console.error("first year memory photo cleanup failed", { path, message: error.message });
  }
};

/**
 * Upload a prepared photo for a saved memory and record it on the row.
 * Returns the updated memory. Any earlier object is removed afterwards, so a
 * failure part-way through never leaves the row pointing at nothing.
 */
export const attachMemoryPhoto = async (input: {
  userId: string;
  memoryId: string;
  prepared: PreparedMemoryPhoto;
  previousPath?: string | null;
}): Promise<FirstYearMemory> => {
  const path = buildMemoryPhotoPath(input.userId, input.memoryId, input.prepared.ext);
  if (!isMemoryPhotoPathOwned(path, input.userId, input.memoryId)) {
    throw new Error("Refusing to store a photo outside this memory's own folder.");
  }

  const { error: uploadError } = await supabase.storage
    .from(MEMORY_PHOTO_BUCKET)
    .upload(path, input.prepared.body, {
      contentType: input.prepared.mime,
      upsert: false,
    });
  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from("first_year_memories")
    .update({
      photo_path: path,
      photo_mime: input.prepared.mime,
      photo_size_bytes: input.prepared.sizeBytes,
      photo_width: input.prepared.width,
      photo_height: input.prepared.height,
    })
    .eq("id", input.memoryId)
    .eq("user_id", input.userId)
    .select(COLUMNS)
    .single();

  if (error) {
    // The row still points at whatever it pointed at before, so clear up the
    // object we just uploaded rather than leaving it unreferenced.
    await removeMemoryPhotoObject(path);
    throw error;
  }

  if (input.previousPath && input.previousPath !== path) {
    await removeMemoryPhotoObject(input.previousPath);
  }
  return toMemory(data);
};

/** Clear the photo from a memory, then tidy the stored object away. */
export const clearMemoryPhoto = async (
  userId: string,
  memoryId: string,
  previousPath: string | null,
): Promise<FirstYearMemory> => {
  const { data, error } = await supabase
    .from("first_year_memories")
    .update({
      photo_path: null,
      photo_mime: null,
      photo_size_bytes: null,
      photo_width: null,
      photo_height: null,
    })
    .eq("id", memoryId)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  await removeMemoryPhotoObject(previousPath);
  return toMemory(data);
};

/**
 * A short-lived signed URL for viewing one photo. Never stored in the
 * database, never exported, never placed in a route.
 */
export const MEMORY_PHOTO_SIGN_TTL_SECONDS = 60 * 60;

export const createMemoryPhotoUrl = async (path: string): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from(MEMORY_PHOTO_BUCKET)
    .createSignedUrl(path, MEMORY_PHOTO_SIGN_TTL_SECONDS);
  if (error) {
    console.error("first year memory photo url failed", error.message);
    return null;
  }
  return data?.signedUrl ?? null;
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
