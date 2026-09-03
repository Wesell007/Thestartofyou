/**
 * AIC-3 — the only browser-side Supabase access to companion memory.
 *
 * Identity comes from the authenticated session and row-level security, never
 * from a caller-supplied user id: no method here accepts one. Inserts omit
 * `user_id` entirely, so the database default (`auth.uid()`) sets ownership
 * and the insert policy checks it.
 *
 * `normalised_value` is a generated column derived by the database from
 * `value`, so a modified client cannot fabricate one to slip past the unique
 * index on `(user_id, normalised_value)`.
 *
 * Nothing in this module logs a memory value.
 */

import { supabase } from "@/integrations/supabase/client";
import type { CompanionMemory, MemoryCategory, MemorySource } from "./companionMemoryPolicy";

type Row = {
  id: string;
  value: string;
  category: MemoryCategory;
  source: MemorySource;
  updated_at: string;
};

const toMemory = (row: Row): CompanionMemory => ({
  id: row.id,
  value: row.value,
  category: row.category,
  source: row.source,
  updatedAt: row.updated_at,
});

export type MemoryWriteError = "duplicate" | "cap" | "rejected" | "unavailable";

export class CompanionMemoryError extends Error {
  readonly reason: MemoryWriteError;
  constructor(reason: MemoryWriteError, message: string) {
    super(message);
    this.reason = reason;
  }
}

const classify = (code: string | undefined, message: string): CompanionMemoryError => {
  if (code === "23505") {
    return new CompanionMemoryError("duplicate", "Your companion already remembers that.");
  }
  if (/maximum number of saved memories/i.test(message)) {
    return new CompanionMemoryError(
      "cap",
      "Your companion is keeping as many things as it can. Please remove one first.",
    );
  }
  if (/not something the companion keeps|nothing to remember/i.test(message)) {
    return new CompanionMemoryError(
      "rejected",
      "That is not something your companion keeps. Nothing was saved.",
    );
  }
  return new CompanionMemoryError("unavailable", "That could not be saved. Please try again.");
};

/** True when someone is signed in. Anonymous people have no memory at all. */
export const hasMemorySession = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session?.user);
};

export const listMemories = async (): Promise<CompanionMemory[]> => {
  const { data, error } = await supabase
    .from("companion_memories")
    .select("id, value, category, source, updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw new CompanionMemoryError("unavailable", "Your memories could not be loaded.");
  return (data ?? []).map((row) => toMemory(row as Row));
};

export const createMemory = async (input: {
  value: string;
  category: MemoryCategory;
  source: MemorySource;
}): Promise<CompanionMemory> => {
  // No user_id: the database default and the insert policy own attribution.
  const { data, error } = await supabase
    .from("companion_memories")
    .insert({ value: input.value, category: input.category, source: input.source })
    .select("id, value, category, source, updated_at")
    .single();
  if (error || !data) throw classify(error?.code, error?.message ?? "");
  return toMemory(data as Row);
};

export const updateMemory = async (
  id: string,
  input: { value: string; category: MemoryCategory },
): Promise<CompanionMemory> => {
  const { data, error } = await supabase
    .from("companion_memories")
    .update({ value: input.value, category: input.category })
    .eq("id", id)
    .select("id, value, category, source, updated_at")
    .single();
  if (error || !data) throw classify(error?.code, error?.message ?? "");
  return toMemory(data as Row);
};

export const deleteMemory = async (id: string): Promise<void> => {
  const { error } = await supabase.from("companion_memories").delete().eq("id", id);
  if (error) throw new CompanionMemoryError("unavailable", "That could not be removed.");
};
