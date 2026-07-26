import { addDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { parseDateOnly } from "@/lib/dateOnly";

const PENDING_KEY = "pendingJourney";

export type PendingJourney = {
  journey_type: "pregnancy";
  lmp_ms: number;
};

/**
 * Coarse pregnancy journey status. Introduced in Phase 13.2a.
 * Never store free-text reasons or loss-specific detail alongside this.
 */
export type PregnancyJourneyStatus =
  | "active"
  | "given_birth"
  | "no_longer_pregnant"
  | "pregnancy_loss"
  | "paused";

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
  /** ISO timestamp string of when the journey was first saved. */
  started_at: string | null;
  /** Date object form of started_at, or null if unknown. */
  startedAt: Date | null;
  /**
   * Coarse lifecycle status. Legacy fallback reads always resolve to "active"
   * — treat `pregnancy_journeys.status` as authoritative when present.
   */
  status: PregnancyJourneyStatus;
  /** ISO timestamp of the last status change. Null for legacy fallback reads. */
  status_changed_at: string | null;
  /** Optional outcome date (currently reserved for future given_birth use). */
  outcome_date: string | null;
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
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (sessionData.session?.user.id !== userId) throw new Error("Your session no longer matches this journey.");

  const { error } = await (supabase.rpc as any)("save_pregnancy_journey", {
    p_lmp_date: lmpDate,
    p_due_date: dueDate,
  });
  if (error) throw error;

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
  userId: string,
  options: { throwOnError?: boolean } = {},
): Promise<ActivePregnancyJourney | null> => {
  // Step 1: new tables (authoritative)
  const { data: pointer, error: pointerError } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (pointerError && options.throwOnError) throw pointerError;

  if (pointer) {
    if (pointer.lifecycle !== "pregnancy") {
      // Active lifecycle is something other than pregnancy — no pregnancy
      // payload to surface in v1.
      return null;
    }
    const { data: preg, error: pregnancyError } = await supabase
      .from("pregnancy_journeys")
      .select("lmp_date, due_date, started_at, status, status_changed_at, outcome_date")
      .eq("user_id", userId)
      .maybeSingle();
    if (pregnancyError && options.throwOnError) throw pregnancyError;
    if (preg) {
      const lmp = parseDateOnly(preg.lmp_date);
      const due = parseDateOnly(preg.due_date);
      if (!lmp || !due) {
        if (options.throwOnError) throw new Error("The saved pregnancy dates are invalid.");
        return null;
      }
      return {
        lmp_date: preg.lmp_date,
        due_date: preg.due_date,
        lmp,
        due,
        started_at: preg.started_at ?? null,
        startedAt: preg.started_at ? new Date(preg.started_at) : null,
        status: (preg.status ?? "active") as PregnancyJourneyStatus,
        status_changed_at: preg.status_changed_at ?? null,
        outcome_date: preg.outcome_date ?? null,
      };
    }
    // Pointer exists but payload missing — fall through to legacy fallback.
  }

  // Step 2: legacy fallback + opportunistic backfill
  const { data: legacy, error: legacyError } = await supabase
    .from("saved_journeys")
    .select("lmp_date, due_date, journey_type, created_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (legacyError && options.throwOnError) throw legacyError;

  if (!legacy || legacy.journey_type !== "pregnancy") return null;

  // Best-effort backfill into new tables. Failures must not block the read.
  try {
    const { error } = await (supabase.rpc as any)("save_pregnancy_journey", {
      p_lmp_date: legacy.lmp_date,
      p_due_date: legacy.due_date,
    });
    if (error) throw error;
  } catch (err) {
    console.warn("[savedJourney] opportunistic backfill failed (non-fatal):", err);
  }

  const legacyLmp = parseDateOnly(legacy.lmp_date);
  const legacyDue = parseDateOnly(legacy.due_date);
  if (!legacyLmp || !legacyDue) {
    if (options.throwOnError) throw new Error("The saved pregnancy dates are invalid.");
    return null;
  }
  return {
    lmp_date: legacy.lmp_date,
    due_date: legacy.due_date,
    lmp: legacyLmp,
    due: legacyDue,
    started_at: legacy.created_at ?? null,
    startedAt: legacy.created_at ? new Date(legacy.created_at) : null,
    // Legacy fallback cannot express status. Callers must treat
    // pregnancy_journeys.status as authoritative when present.
    status: "active",
    status_changed_at: null,
    outcome_date: null,
  };
};

export const deletePregnancyJourney = async (userId: string): Promise<void> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (sessionData.session?.user.id !== userId) throw new Error("Your session no longer matches this journey.");
  const { error } = await (supabase.rpc as any)("delete_active_journey", { p_lifecycle: "pregnancy" });
  if (error) throw error;
};

/** Human-readable labels for the current status chip / row. */
export const STATUS_LABELS: Record<PregnancyJourneyStatus, string> = {
  active: "Active pregnancy",
  given_birth: "You've given birth",
  no_longer_pregnant: "Pregnancy view paused",
  paused: "Pregnancy view paused",
  pregnancy_loss: "Journey paused",
};

/**
 * Update the coarse status on `pregnancy_journeys`. The only "extra" field
 * this helper will ever write is `outcome_date`, and ONLY when
 * `status === 'given_birth'` and an ISO date (yyyy-MM-dd) is supplied.
 * All other statuses force `outcome_date` back to null so it can't linger.
 *
 * NEVER add: reason, free text, loss detail, loss date, medical info,
 * gestation, analytics fields.
 */
export const updatePregnancyJourneyStatus = async (
  userId: string,
  payload: { status: PregnancyJourneyStatus; outcome_date?: string | null },
): Promise<void> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (sessionData.session?.user.id !== userId) {
    throw new Error("Your session no longer matches this journey.");
  }

  const isValidDate = (v: unknown): v is string =>
    typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

  const outcomeDate =
    payload.status === "given_birth" && isValidDate(payload.outcome_date ?? null)
      ? (payload.outcome_date as string)
      : null;

  const { error } = await supabase
    .from("pregnancy_journeys")
    .update({
      status: payload.status,
      status_changed_at: new Date().toISOString(),
      outcome_date: outcomeDate,
    })
    .eq("user_id", userId);
  if (error) throw error;
};

