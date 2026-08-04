import { supabase } from "@/integrations/supabase/client";
import { getFirstYearAge, type FirstYearAge } from "@/lib/firstYearDates";

/** Coarse First Year journey status. Never store free-text reasons alongside it. */
export type FirstYearJourneyStatus = "active" | "paused" | "completed";

/** A single baby record. Multiples are supported: a user may have several. */
export type BabyRecord = {
  id: string;
  date_of_birth: string; // yyyy-MM-dd
  name: string | null;
  birth_order: number;
  is_primary: boolean;
};

/** Input shape for saving a First Year journey. One entry per baby. */
export type BabyInput = {
  date_of_birth: string; // yyyy-MM-dd
  name?: string | null;
  birth_order?: number;
};

/** Active First Year journey shape returned to UI callers. */
export type ActiveFirstYearJourney = {
  status: FirstYearJourneyStatus;
  status_changed_at: string | null;
  source_pregnancy_lmp_date: string | null;
  archived_pregnancy_journey_id: string | null;
  started_at: string;
  startedAt: Date | null;
};

/**
 * Pregnancy statuses that may be invited into First Year setup.
 * Sensitive statuses are never invited, and the RPC enforces this again
 * server-side so a stale client cannot bypass it.
 */
export const canEnterFirstYearSetup = (status: string | null | undefined): boolean =>
  status === "given_birth";

/**
 * Create or refresh the user's First Year journey from one or more babies.
 * Archives the pregnancy chapter and flips the active lifecycle in one
 * transaction. Callers pass one baby today; twins and multiples work already.
 */
export const saveFirstYearJourney = async (babies: BabyInput[]): Promise<void> => {
  if (!Array.isArray(babies) || babies.length < 1) {
    throw new Error("At least one baby is needed to start the first year.");
  }
  if (babies.length > 4) {
    throw new Error("Up to four babies can be added.");
  }

  const payload = babies.map((baby, index) => ({
    date_of_birth: baby.date_of_birth,
    name: baby.name?.trim() ? baby.name.trim() : null,
    birth_order: baby.birth_order ?? index + 1,
  }));

  const { error } = await supabase.rpc("save_first_year_journey", { p_babies: payload });
  if (error) throw error;
};

/**
 * Read the user's active First Year journey. Returns null when the active
 * lifecycle is something else, so pages never need to know the pointer exists.
 */
export const getActiveFirstYearJourney = async (
  userId: string,
  options: { throwOnError?: boolean } = {},
): Promise<ActiveFirstYearJourney | null> => {
  const { data: pointer, error: pointerError } = await supabase
    .from("journeys")
    .select("lifecycle")
    .eq("user_id", userId)
    .maybeSingle();
  if (pointerError && options.throwOnError) throw pointerError;
  if (!pointer || pointer.lifecycle !== "first_year") return null;

  const { data, error } = await supabase
    .from("first_year_journeys")
    .select("status, status_changed_at, source_pregnancy_lmp_date, archived_pregnancy_journey_id, started_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error && options.throwOnError) throw error;
  if (!data) return null;

  return {
    status: data.status as FirstYearJourneyStatus,
    status_changed_at: data.status_changed_at ?? null,
    source_pregnancy_lmp_date: data.source_pregnancy_lmp_date ?? null,
    archived_pregnancy_journey_id: data.archived_pregnancy_journey_id ?? null,
    started_at: data.started_at,
    startedAt: data.started_at ? new Date(data.started_at) : null,
  };
};

/** All babies for the user, in birth order. */
export const getBabies = async (
  userId: string,
  options: { throwOnError?: boolean } = {},
): Promise<BabyRecord[]> => {
  const { data, error } = await supabase
    .from("babies")
    .select("id, date_of_birth, name, birth_order, is_primary")
    .eq("user_id", userId)
    .order("birth_order", { ascending: true });
  if (error) {
    if (options.throwOnError) throw error;
    return [];
  }
  return (data ?? []) as BabyRecord[];
};

/** The baby currently displayed by default, or null when none is saved. */
export const getPrimaryBaby = async (
  userId: string,
  options: { throwOnError?: boolean } = {},
): Promise<BabyRecord | null> => {
  const babies = await getBabies(userId, options);
  return babies.find((baby) => baby.is_primary) ?? babies[0] ?? null;
};

/** Derived age for a baby record, using the shared first-year helper. */
export const getBabyAge = (
  baby: Pick<BabyRecord, "date_of_birth"> | null | undefined,
  reference: Date = new Date(),
): FirstYearAge | null => (baby ? getFirstYearAge(baby.date_of_birth, reference) : null);
