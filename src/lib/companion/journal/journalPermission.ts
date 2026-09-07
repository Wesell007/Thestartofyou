/**
 * AIC-JA2 — the journal permission, read and written narrowly.
 *
 * The write touches exactly one column on the signed-in person's own profile
 * row. It is never an upsert of a whole profile object, so no unrelated
 * profile field can be overwritten by this screen. The server remains
 * authoritative: this value only records consent, it does not grant access.
 *
 * `profiles.companion_journal_context_enabled` is specified by the JA2
 * migration, which is deliberately NOT applied — production activation is
 * gated on legal and privacy approval. The generated database types therefore
 * do not know the column yet, so this module declares the one narrow shape it
 * needs locally. When the migration is applied and the types regenerate, the
 * local declaration can be deleted with no behaviour change.
 */

import { supabase } from "@/integrations/supabase/client";

export const JOURNAL_PERMISSION_COLUMN = "companion_journal_context_enabled" as const;

interface JournalPermissionRow {
  companion_journal_context_enabled?: boolean | null;
}

interface JournalPermissionTable {
  select(columns: string): {
    eq(column: string, value: string): {
      maybeSingle(): Promise<{ data: JournalPermissionRow | null; error: unknown }>;
    };
  };
  update(values: { companion_journal_context_enabled: boolean }): {
    eq(column: string, value: string): Promise<{ error: unknown }>;
  };
}

const profiles = (): JournalPermissionTable =>
  supabase.from("profiles") as unknown as JournalPermissionTable;

const currentUserId = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
};

/** The stored permission, or null when there is no session to read it for. */
export const readJournalPermission = async (): Promise<boolean | null> => {
  const userId = await currentUserId();
  if (!userId) return null;

  const { data, error } = await profiles()
    .select(JOURNAL_PERMISSION_COLUMN)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.companion_journal_context_enabled === true;
};

/** Narrow update of the one column. Throws so the UI can revert honestly. */
export const writeJournalPermission = async (enabled: boolean): Promise<void> => {
  const userId = await currentUserId();
  if (!userId) throw new Error("No account session");

  const { error } = await profiles()
    .update({ companion_journal_context_enabled: enabled })
    .eq("user_id", userId);
  if (error) throw error;
};
