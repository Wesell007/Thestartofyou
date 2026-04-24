import { addDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const PENDING_KEY = "pendingJourney";

export type PendingJourney = {
  journey_type: "pregnancy";
  lmp_ms: number;
};

/**
 * Active pregnancy journey shape returned to UI callers.
 * Pages should treat this as the only contract — they must not know
 * which underlying table answered the read.
 */
export type ActivePregnancyJourney = {
  lmp_date: string; // yyyy-MM-dd
  due_date: string; // yyyy-MM-dd
  lmp: Date;
  due: Date;
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

/**
 * Best-effort mirror write to the legacy `saved_journeys` table.
 * Authoritative writes go to the new tables; this mirror exists ONLY so a
 * rollback to a previous version (which still reads `saved_journeys`)
 * continues to work during the dual-read window.
 *
 * Failures here MUST NOT fail the main save — log and swallow.
 */
const mirrorToLegacy = async (
  userId: string,
  lmpDate: string,
  dueDate: string
): Promise<void> => {
  try {
    const { error } = await supabase.from("saved_journeys").upsert(
      {
        user_id: userId,
        journey_type: "pregnancy",
        lmp_date: lmpDate,
        due_date: dueDate,
      },
      { onConflict: "user_id" }
    );
    if (error) {
      console.warn("[savedJourney] legacy mirror write failed (non-fatal):", error.message);
    }
  } catch (err) {
    console.warn("[savedJourney] legacy mirror write threw (non-fatal):", err);
  }
};

/**
 * Authoritative write of a pregnancy journey. Writes the new tables first
 * (authoritative), then mirrors to the legacy table best-effort.
 */
const upsertPregnancyJourney = async (
  userId: string,
  lmpDate: string,
  dueDate: string
): Promise<void> => {
  const { error: pregErr } = await supabase.from("pregnancy_journeys").upsert(
    {
      user_id: userId,
      lmp_date: lmpDate,
      due_date: dueDate,
    },
    { onConflict: "user_id" }
  );
  if (pregErr) throw pregErr;

  const { error: ptrErr } = await supabase.from("journeys").upsert(
    {
      user_id: userId,
      lifecycle: "pregnancy",
    },
    { onConflict: "user_id" }
  );
  if (ptrErr) throw ptrErr;

  await mirrorToLegacy(userId, lmpDate, dueDate);
};

/** Persist the pending journey to the DB for the current user (idempotent upsert). */
export const commitPendingJourneyToDB = async (userId: string) => {
  const pending = readPendingJourney();
  if (!pending) return null;

  const lmp = new Date(pending.lmp_ms);
  const due = addDays(lmp, 280);
  const lmpDate = format(lmp, "yyyy-MM-dd");
  const dueDate = format(due, "yyyy-MM-dd");

  await upsertPregnancyJourney(userId, lmpDate, dueDate);
  clearPendingJourney();
  return { lmp, due };
};

/**
 * Read the user's currently active pregnancy journey.
 *
 * Lookup order (all fallback/backfill logic lives here, not in pages):
 *   1. Read `journeys` pointer + `pregnancy_journeys` payload.
 *      If pointer.lifecycle is not 'pregnancy', return null (v1 supports
 *      one active lifecycle and only pregnancy is wired through the UI).
 *   2. If new tables are empty for this user, fall back to legacy
 *      `saved_journeys`. If found, opportunistically backfill the new
 *      tables so subsequent reads stop falling back.
 *   3. Otherwise return null.
 *
 * Pages must not duplicate this logic.
 */
export const getActivePregnancyJourney = async (
  userId: string
): Promise<ActivePregnancyJourney | null> => {
  // Step 1: new tables (authoritative)
  const { data: pointer } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();

  if (pointer) {
    if (pointer.lifecycle !== "pregnancy") {
      // Active lifecycle is something other than pregnancy — no pregnancy
      // payload to surface in v1.
      return null;
    }
    const { data: preg } = await supabase
      .from("pregnancy_journeys")
      .select("lmp_date, due_date")
      .eq("user_id", userId)
      .maybeSingle();
    if (preg) {
      return {
        lmp_date: preg.lmp_date,
        due_date: preg.due_date,
        lmp: new Date(preg.lmp_date),
        due: new Date(preg.due_date),
      };
    }
    // Pointer exists but payload missing — fall through to legacy fallback.
  }

  // Step 2: legacy fallback + opportunistic backfill
  const { data: legacy } = await supabase
    .from("saved_journeys")
    .select("lmp_date, due_date, journey_type")
    .eq("user_id", userId)
    .maybeSingle();

  if (!legacy || legacy.journey_type !== "pregnancy") return null;

  // Best-effort backfill into new tables. Failures must not block the read.
  try {
    await supabase
      .from("pregnancy_journeys")
      .upsert(
        { user_id: userId, lmp_date: legacy.lmp_date, due_date: legacy.due_date },
        { onConflict: "user_id" }
      );
    await supabase
      .from("journeys")
      .upsert({ user_id: userId, lifecycle: "pregnancy" }, { onConflict: "user_id" });
  } catch (err) {
    console.warn("[savedJourney] opportunistic backfill failed (non-fatal):", err);
  }

  return {
    lmp_date: legacy.lmp_date,
    due_date: legacy.due_date,
    lmp: new Date(legacy.lmp_date),
    due: new Date(legacy.due_date),
  };
};
