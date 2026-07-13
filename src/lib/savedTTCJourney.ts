import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { deriveTTCDates, computeTTCStage } from "@/lib/ttcDerived";

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
  // Guard: never overwrite an active pregnancy journey.
  const { data: pointer } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();

  if (pointer && pointer.lifecycle === "pregnancy") {
    return { ok: false, reason: "pregnancy_active" };
  }

  const lmp = new Date(values.last_period_date);
  const derived = deriveTTCDates(lmp, values.cycle_length_days);
  const stage = computeTTCStage(new Date(), derived);
  const fmt = (d: Date) => format(d, "yyyy-MM-dd");

  const { error: ttcErr } = await supabase.from("ttc_journeys").upsert(
    {
      user_id: userId,
      stage,
      last_period_date: values.last_period_date,
      cycle_length_days: values.cycle_length_days,
      period_length_days: values.period_length_days ?? null,
      cycle_regularity: values.cycle_regularity,
      actively_trying: values.actively_trying,
      uses_ovulation_tests: values.uses_ovulation_tests,
      tracks_symptoms: values.tracks_symptoms,
      support_status: values.support_status,
      ivf_consideration: values.ivf_consideration,
      current_cycle_start: values.last_period_date,
      likely_ovulation_date: fmt(derived.likely_ovulation_date),
      fertile_window_start: fmt(derived.fertile_window_start),
      fertile_window_end: fmt(derived.fertile_window_end),
      expected_period_date: fmt(derived.expected_period_date),
      possible_test_date: fmt(derived.possible_test_date),
    },
    { onConflict: "user_id" },
  );
  if (ttcErr) return { ok: false, reason: "error", message: ttcErr.message };

  const { error: ptrErr } = await supabase
    .from("journeys")
    .upsert({ user_id: userId, lifecycle: "ttc" }, { onConflict: "user_id" });
  if (ptrErr) return { ok: false, reason: "error", message: ptrErr.message };

  clearPendingTTCJourney();
  return { ok: true };
};

export const getActiveTTCJourney = async (
  userId: string,
): Promise<ActiveTTCJourney | null> => {
  const { data: pointer } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (!pointer || pointer.lifecycle !== "ttc") return null;

  const { data: row } = await supabase
    .from("ttc_journeys")
    .select(
      "id, last_period_date, cycle_length_days, period_length_days, cycle_regularity, actively_trying, uses_ovulation_tests, tracks_symptoms, support_status, ivf_consideration, stage, likely_ovulation_date, fertile_window_start, fertile_window_end, expected_period_date, possible_test_date, started_at",
    )
    .eq("user_id", userId)
    .maybeSingle();
  return (row as ActiveTTCJourney) ?? null;

};
