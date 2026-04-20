import { addDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const PENDING_KEY = "pendingJourney";

export type PendingJourney = {
  journey_type: "pregnancy";
  lmp_ms: number;
};

export const stashPendingJourney = (lmp: Date) => {
  const payload: PendingJourney = { journey_type: "pregnancy", lmp_ms: lmp.getTime() };
  localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
};

export const readPendingJourney = (): PendingJourney | null => {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingJourney;
  } catch {
    return null;
  }
};

export const clearPendingJourney = () => localStorage.removeItem(PENDING_KEY);

/** Persist the pending journey to the DB for the current user (idempotent upsert). */
export const commitPendingJourneyToDB = async (userId: string) => {
  const pending = readPendingJourney();
  if (!pending) return null;

  const lmp = new Date(pending.lmp_ms);
  const due = addDays(lmp, 280);

  const { error } = await supabase.from("saved_journeys").upsert(
    {
      user_id: userId,
      journey_type: pending.journey_type,
      lmp_date: format(lmp, "yyyy-MM-dd"),
      due_date: format(due, "yyyy-MM-dd"),
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
  clearPendingJourney();
  return { lmp, due };
};
