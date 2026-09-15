import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { deriveTTCDates, computeTTCStage } from "@/lib/ttcDerived";
import { notifyJourneyStateChanged } from "@/lib/journeyStateSignal";
import {
  isIVFTransferType,
  isValidNewIVFTransferDate,
  parseIVFTransferDate,
  type IVFTransferType,
} from "@/lib/ivfTimeline";

/**
 * Local-first TTC journey save.
 *
 * Mirrors the pregnancy pattern in `savedJourney.ts` but scoped to TTC.
 * We deliberately keep the pre-auth stash minimal — just what the ovulation
 * calculator already knows — so sensitive setup answers never sit on-device
 * before the user has authenticated.
 */

const PENDING_KEY = "pendingTTCJourney";

export type PendingTTCJourney = {
  journey_type: "ttc";
  lmp_ms: number;
  cycle_length_days: number;
  period_length_days?: number | null;
  savedAt: string;
};

export type TTCFormValues = {
  last_period_date: string; // yyyy-MM-dd
  cycle_length_days: number;
  period_length_days: number | null;
  cycle_regularity: "regular" | "irregular" | "unsure";
  actively_trying: "yes" | "preparing" | "unsure";
  uses_ovulation_tests: "yes" | "no" | "sometimes";
  tracks_symptoms: "yes" | "not_now";
  support_status:
    | "trying_naturally"
    | "preparing_to_try"
    | "considering_help"
    | "in_treatment";
  ivf_consideration: "no" | "considering" | "in_treatment" | "prefer_not_to_say";
};

export type ActiveTTCJourney = {
  id: string;
  last_period_date: string | null;
  cycle_length_days: number | null;
  period_length_days: number | null;
  cycle_regularity: string | null;
  actively_trying: string | null;
  uses_ovulation_tests: string | null;
  tracks_symptoms: string | null;
  support_status: string | null;
  ivf_consideration: string | null;
  stage: string | null;
  likely_ovulation_date: string | null;
  fertile_window_start: string | null;
  fertile_window_end: string | null;
  expected_period_date: string | null;
  possible_test_date: string | null;
  started_at: string | null;
};


export const stashPendingTTCJourney = (input: {
  lmp: Date;
  cycle_length_days: number;
  period_length_days?: number | null;
}) => {
  const payload: PendingTTCJourney = {
    journey_type: "ttc",
    lmp_ms: input.lmp.getTime(),
    cycle_length_days: input.cycle_length_days,
    period_length_days: input.period_length_days ?? null,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
};

export const getPendingTTCJourney = (): PendingTTCJourney | null => {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingTTCJourney;
  } catch {
    return null;
  }
};

export const clearPendingTTCJourney = () => localStorage.removeItem(PENDING_KEY);

export type CommitResult =
  | { ok: true }
  | { ok: false; reason: "pregnancy_active" }
  | { ok: false; reason: "error"; message: string };

/**
 * Persist a TTC journey for the given user.
 * Refuses to overwrite an active pregnancy pointer.
 */
export const commitPendingTTCJourneyToDB = async (
  userId: string,
  values: TTCFormValues,
): Promise<CommitResult> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) return { ok: false, reason: "error", message: sessionError.message };
  if (sessionData.session?.user.id !== userId) {
    return { ok: false, reason: "error", message: "Your session no longer matches this journey." };
  }

  const lmp = new Date(values.last_period_date);
  const derived = deriveTTCDates(lmp, values.cycle_length_days);
  const stage = computeTTCStage(new Date(), derived);
  const fmt = (d: Date) => format(d, "yyyy-MM-dd");

  const { data, error } = await supabase.rpc("save_ttc_journey", {
    p_stage: stage,
    p_last_period_date: values.last_period_date,
    p_cycle_length_days: values.cycle_length_days,
    p_period_length_days: values.period_length_days ?? null,
    p_cycle_regularity: values.cycle_regularity,
    p_actively_trying: values.actively_trying,
    p_uses_ovulation_tests: values.uses_ovulation_tests,
    p_tracks_symptoms: values.tracks_symptoms,
    p_support_status: values.support_status,
    p_ivf_consideration: values.ivf_consideration,
    p_likely_ovulation_date: fmt(derived.likely_ovulation_date),
    p_fertile_window_start: fmt(derived.fertile_window_start),
    p_fertile_window_end: fmt(derived.fertile_window_end),
    p_expected_period_date: fmt(derived.expected_period_date),
    p_possible_test_date: fmt(derived.possible_test_date),
  });
  if (error) return { ok: false, reason: "error", message: error.message };
  if ((data as unknown) === "pregnancy_active") return { ok: false, reason: "pregnancy_active" };

  clearPendingTTCJourney();
  notifyJourneyStateChanged();
  return { ok: true };
};

export const getActiveTTCJourney = async (
  userId: string,
  options: { throwOnError?: boolean } = {},
): Promise<ActiveTTCJourney | null> => {
  const { data: pointer, error: pointerError } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (pointerError && options.throwOnError) throw pointerError;
  if (!pointer || pointer.lifecycle !== "ttc") return null;

  const { data: row, error: rowError } = await supabase
    .from("ttc_journeys")
    .select(
      "id, last_period_date, cycle_length_days, period_length_days, cycle_regularity, actively_trying, uses_ovulation_tests, tracks_symptoms, support_status, ivf_consideration, stage, likely_ovulation_date, fertile_window_start, fertile_window_end, expected_period_date, possible_test_date, started_at",
    )
    .eq("user_id", userId)
    .maybeSingle();
  if (rowError && options.throwOnError) throw rowError;
  return (row as ActiveTTCJourney) ?? null;

};

export const deleteTTCJourney = async (userId: string): Promise<void> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (sessionData.session?.user.id !== userId) throw new Error("Your session no longer matches this journey.");
  const { error } = await supabase.rpc("delete_active_journey", { p_lifecycle: "ttc" });
  if (error) throw error;
  notifyJourneyStateChanged();
};

/* ------------------------------------------------------------------ *
 * Phase 34G — optional IVF timeline context on the existing TTC row.
 *
 * IVF is a treatment context within the trying-to-conceive journey, not a
 * fourth saved lifecycle. These helpers:
 *   - resolve the authenticated user internally (no caller-supplied id)
 *   - UPDATE the existing ttc_journeys row only — never insert, never upsert
 *   - prove a row was actually matched instead of trusting "no error"
 *   - store only the two source values; every milestone stays derived
 * Nothing calls them while IVF_TIMELINE_SAVE_ENABLED is off.
 * ------------------------------------------------------------------ */

export type IVFTimelineContext = {
  transfer_date: string | null;
  transfer_type: IVFTransferType | null;
};

export type IVFTimelineLoadResult =
  | { ok: true; context: IVFTimelineContext }
  | { ok: false; reason: "no_ttc_journey" }
  | { ok: false; reason: "not_authenticated" }
  | { ok: false; reason: "error"; message: string };

export type IVFTimelineWriteResult =
  | { ok: true }
  | { ok: false; reason: "no_ttc_journey" }
  | { ok: false; reason: "not_authenticated" }
  | { ok: false; reason: "invalid_context" }
  | { ok: false; reason: "error"; message: string };

const EMPTY_IVF_CONTEXT: IVFTimelineContext = { transfer_date: null, transfer_type: null };

type AuthFailure =
  | { ok: false; reason: "not_authenticated" }
  | { ok: false; reason: "error"; message: string };

type AuthResolution = { ok: true; userId: string } | AuthFailure;

const resolveAuthenticatedUserId = async (): Promise<AuthResolution> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) return { ok: false, reason: "error", message: error.message };
  const userId = data.session?.user.id;
  if (!userId) return { ok: false, reason: "not_authenticated" };
  return { ok: true, userId };
};

/**
 * Read the stored IVF context for the signed-in person.
 *
 * Historical context never expires: we validate shape and transfer type only,
 * and deliberately do not apply the calculator's entry window here.
 */
export const loadIVFTimelineContext = async (): Promise<IVFTimelineLoadResult> => {
  const auth = await resolveAuthenticatedUserId();
  if (!auth.ok) return auth as AuthFailure;

  const { data, error } = await supabase
    .from("ttc_journeys")
    .select("ivf_transfer_date, ivf_transfer_type")
    .eq("user_id", auth.userId)
    .maybeSingle();
  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data) return { ok: false, reason: "no_ttc_journey" };

  const type = isIVFTransferType(data.ivf_transfer_type) ? data.ivf_transfer_type : null;
  const date = parseIVFTransferDate(data.ivf_transfer_date) ? (data.ivf_transfer_date as string) : null;
  if (!type || !date) return { ok: true, context: EMPTY_IVF_CONTEXT };
  return { ok: true, context: { transfer_date: date, transfer_type: type } };
};

/**
 * Explicitly save or update the IVF context on the signed-in person's existing
 * TTC journey. Never creates a journey: with no row we report no_ttc_journey.
 */
export const saveIVFTimelineContext = async (context: {
  transfer_date: string;
  transfer_type: IVFTransferType;
}): Promise<IVFTimelineWriteResult> => {
  if (!isIVFTransferType(context?.transfer_type)) return { ok: false, reason: "invalid_context" };
  if (!isValidNewIVFTransferDate(context?.transfer_date)) return { ok: false, reason: "invalid_context" };

  const auth = await resolveAuthenticatedUserId();
  if (!auth.ok) return auth;

  const { data, error } = await supabase
    .from("ttc_journeys")
    .update({
      ivf_transfer_date: context.transfer_date,
      ivf_transfer_type: context.transfer_type,
    })
    .eq("user_id", auth.userId)
    .select("user_id");
  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data || data.length === 0) return { ok: false, reason: "no_ttc_journey" };
  return { ok: true };
};

/**
 * Explicitly clear the IVF context. Sets both values to null together and
 * leaves the TTC journey, its answers and every other journey untouched.
 */
export const clearIVFTimelineContext = async (): Promise<IVFTimelineWriteResult> => {
  const auth = await resolveAuthenticatedUserId();
  if (!auth.ok) return auth;

  const { data, error } = await supabase
    .from("ttc_journeys")
    .update({ ivf_transfer_date: null, ivf_transfer_type: null })
    .eq("user_id", auth.userId)
    .select("user_id");
  if (error) return { ok: false, reason: "error", message: error.message };
  if (!data || data.length === 0) return { ok: false, reason: "no_ttc_journey" };
  return { ok: true };
};
