import { supabase } from "@/integrations/supabase/client";

/**
 * TTC log helpers (Phase 9.5e MVP).
 *
 * User-scoped by RLS. Callers must pass the current session's user id.
 * Log values are never surfaced to analytics.
 */

export const TTC_LOG_TYPES = [
  "period",
  "ovulation_test",
  "pregnancy_test",
  "mood",
  "cramps",
  "discharge",
  "energy",
  "note",
] as const;

export type TTCLogType = (typeof TTC_LOG_TYPES)[number];

export type TTCLog = {
  id: string;
  journey_id: string;
  user_id: string;
  log_date: string; // yyyy-MM-dd
  log_type: TTCLogType;
  value: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type TTCLogInput = {
  journey_id: string;
  user_id: string;
  log_date: string;
  log_type: TTCLogType;
  value?: string | null;
  notes?: string | null;
};

export type TTCLogUpdate = {
  log_date?: string;
  log_type?: TTCLogType;
  value?: string | null;
  notes?: string | null;
};

export const getTTCLogsForJourney = async (
  userId: string,
  journeyId: string,
  startDate: string,
  endDate: string,
): Promise<TTCLog[]> => {
  const { data, error } = await supabase
    .from("ttc_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("journey_id", journeyId)
    .gte("log_date", startDate)
    .lte("log_date", endDate)
    .order("log_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as TTCLog[];
};

export const getRecentTTCLogs = async (
  userId: string,
  journeyId: string,
  limit = 8,
): Promise<TTCLog[]> => {
  const { data, error } = await supabase
    .from("ttc_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("journey_id", journeyId)
    .order("log_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as TTCLog[];
};

export const createTTCLog = async (input: TTCLogInput): Promise<TTCLog> => {
  const { data, error } = await supabase
    .from("ttc_logs")
    .insert({
      journey_id: input.journey_id,
      user_id: input.user_id,
      log_date: input.log_date,
      log_type: input.log_type,
      value: input.value ?? null,
      notes: input.notes ?? null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as TTCLog;
};

export const updateTTCLog = async (
  logId: string,
  input: TTCLogUpdate,
): Promise<TTCLog> => {
  const { data, error } = await supabase
    .from("ttc_logs")
    .update({
      ...(input.log_date !== undefined ? { log_date: input.log_date } : {}),
      ...(input.log_type !== undefined ? { log_type: input.log_type } : {}),
      ...(input.value !== undefined ? { value: input.value } : {}),
      ...(input.notes !== undefined ? { notes: input.notes } : {}),
    })
    .eq("id", logId)
    .select("*")
    .single();
  if (error) throw error;
  return data as TTCLog;
};

export const deleteTTCLog = async (logId: string): Promise<void> => {
  const { error } = await supabase.from("ttc_logs").delete().eq("id", logId);
  if (error) throw error;
};

export const groupTTCLogsByDate = (logs: TTCLog[]): Record<string, TTCLog[]> => {
  const out: Record<string, TTCLog[]> = {};
  for (const l of logs) {
    (out[l.log_date] ||= []).push(l);
  }
  return out;
};

/**
 * Human labels — kept in helpers so both the calendar and the recent list
 * stay consistent. Non-clinical, non-interpretive.
 */
export const LOG_TYPE_LABEL: Record<TTCLogType, string> = {
  period: "Period",
  ovulation_test: "Ovulation test",
  pregnancy_test: "Pregnancy test",
  mood: "Mood",
  cramps: "Cramps",
  discharge: "Discharge",
  energy: "Energy",
  note: "Note",
};

export const LOG_TYPE_NOTED_LABEL: Record<TTCLogType, string> = {
  period: "Period noted",
  ovulation_test: "Ovulation test noted",
  pregnancy_test: "Pregnancy test noted",
  mood: "Mood noted",
  cramps: "Cramps noted",
  discharge: "Discharge noted",
  energy: "Energy noted",
  note: "Note added",
};

export const LOG_TYPE_VALUES: Record<TTCLogType, string[]> = {
  period: ["started", "continued", "ended"],
  ovulation_test: ["negative", "positive", "unclear"],
  pregnancy_test: ["negative", "positive", "unclear"],
  mood: ["steady", "emotional", "anxious", "hopeful", "low"],
  cramps: ["mild", "moderate", "strong"],
  discharge: ["dry", "creamy", "watery", "stretchy", "unsure"],
  energy: ["low", "okay", "good"],
  note: [],
};

export const LOG_VALUE_LABEL: Record<string, string> = {
  started: "Started",
  continued: "Continued",
  ended: "Ended",
  negative: "Negative",
  positive: "Positive",
  unclear: "Unclear",
  steady: "Steady",
  emotional: "Emotional",
  anxious: "Anxious",
  hopeful: "Hopeful",
  low: "Low",
  mild: "Mild",
  moderate: "Moderate",
  strong: "Strong",
  dry: "Dry",
  creamy: "Creamy",
  watery: "Watery",
  stretchy: "Stretchy",
  unsure: "Unsure",
  okay: "Okay",
  good: "Good",
};
