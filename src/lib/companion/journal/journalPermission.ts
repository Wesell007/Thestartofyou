/**
 * AIC-JA2 — the journal permission, read and written narrowly.
 *
 * The write touches exactly one column on the signed-in person's own profile
 * row. It is never an upsert of a whole profile object, so no unrelated
 * profile field can be overwritten by this screen. The server remains
 * authoritative: this value only records consent, it does not grant access.
 *
 * `profiles.companion_journal_context_enabled` exists in the schema (AIC-JA2-M1)
 * and is inert by default: production activation stays gated on the server flag
 * and on legal and privacy approval.
 */

import { supabase } from "@/integrations/supabase/client";

export const JOURNAL_PERMISSION_COLUMN = "companion_journal_context_enabled" as const;

const currentUserId = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
};


/** The stored permission, or null when there is no session to read it for. */
export const readJournalPermission = async (): Promise<boolean | null> => {
  const userId = await currentUserId();
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
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

  const { error } = await supabase
    .from("profiles")
    .update({ companion_journal_context_enabled: enabled })
    .eq("user_id", userId);
  if (error) throw error;
};
