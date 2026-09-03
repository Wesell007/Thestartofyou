/**
 * AIC-2 — the single authoritative resolver for personal journey context.
 *
 * One resolution path for both companion surfaces:
 *   session → `journeys.lifecycle` pointer → only the relevant journey source.
 *
 * Reads are minimal (two round trips at most, three only for the established
 * legacy pregnancy fallback) and column-scoped, so no raw profile row, note or
 * identifier ever enters the client context object. Only derived stage values
 * leave this module.
 *
 * Personalisation is an enhancement: every failure path fails open to `null`,
 * never to a guess and never to an error the AI request depends on.
 */

import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { parseDateOnly } from "@/lib/dateOnly";
import { getFirstYearAge } from "@/lib/firstYearDates";
import { pregnancyWeekFromLmp, trimesterFromWeek } from "@/lib/pregnancyWeek";
import {
  TTC_STAGES,
  type PersonalJourneyContextV1,
  type TtcStage,
} from "../../../supabase/functions/_shared/journeyContextContract";

const isTtcStage = (value: unknown): value is TtcStage =>
  typeof value === "string" && (TTC_STAGES as readonly string[]).includes(value);

const resolvePregnancy = async (
  userId: string,
  reference: Date,
): Promise<PersonalJourneyContextV1 | null> => {
  const { data, error } = await supabase
    .from("pregnancy_journeys")
    .select("lmp_date, status")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return null;

  let lmpDate = data?.lmp_date ?? null;
  if (!data) {
    // Established legacy fallback, used only when the new row is missing.
    const legacy = await getActivePregnancyJourney(userId).catch(() => null);
    if (!legacy || legacy.status !== "active") return null;
    lmpDate = legacy.lmp_date;
  } else if ((data.status ?? "active") !== "active") {
    // given_birth, no_longer_pregnant, pregnancy_loss and paused are never an
    // active pregnancy stage.
    return null;
  }

  const lmp = parseDateOnly(lmpDate);
  if (!lmp) return { journey: "pregnancy" };
  const week = pregnancyWeekFromLmp(lmp, reference);
  return { journey: "pregnancy", week, trimester: trimesterFromWeek(week) };
};

const resolveTtc = async (userId: string): Promise<PersonalJourneyContextV1 | null> => {
  const { data, error } = await supabase
    .from("ttc_journeys")
    .select("support_status, ivf_consideration")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return { journey: "trying-to-conceive" };
  return {
    journey: "trying-to-conceive",
    ...(isTtcStage(data.support_status) ? { ttcStage: data.support_status } : {}),
    ...(data.ivf_consideration === "in_treatment" ? { ivfInTreatment: true as const } : {}),
  };
};

const resolveFirstYear = async (
  userId: string,
  reference: Date,
): Promise<PersonalJourneyContextV1 | null> => {
  const { data, error } = await supabase
    .from("babies")
    .select("date_of_birth, is_primary")
    .eq("user_id", userId);
  if (error || !data || data.length === 0) return { journey: "first-year" };

  // Ambiguity rule: with more than one baby and no unique primary selection,
  // no age is sent. Never first, latest, oldest or youngest by default.
  const primaries = data.filter((baby) => baby.is_primary);
  const selected =
    data.length === 1 ? data[0] : primaries.length === 1 ? primaries[0] : null;
  if (!selected) return { journey: "first-year" };

  const age = getFirstYearAge(selected.date_of_birth, reference);
  if (!age || !age.isInFirstYear) return { journey: "first-year" };
  return { journey: "first-year", ageMonths: age.firstYearMonthIndex };
};

/**
 * Resolve the minimum derived personal journey context, or `null` when the
 * person is signed out, has no active journey, or anything fails.
 */
export const resolvePersonalJourneyContext = async (
  reference: Date = new Date(),
): Promise<PersonalJourneyContextV1 | null> => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) return null;

    const { data: pointer, error } = await supabase
      .from("journeys")
      .select("lifecycle")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) return null;

    const lifecycle = pointer?.lifecycle ?? null;
    if (lifecycle === "pregnancy") return await resolvePregnancy(userId, reference);
    if (lifecycle === "ttc") return await resolveTtc(userId);
    if (lifecycle === "first_year") return await resolveFirstYear(userId, reference);

    if (!lifecycle) {
      // No pointer: the established legacy pregnancy fallback still applies.
      const legacy = await getActivePregnancyJourney(userId).catch(() => null);
      if (!legacy || legacy.status !== "active") return null;
      const week = pregnancyWeekFromLmp(legacy.lmp, reference);
      return { journey: "pregnancy", week, trimester: trimesterFromWeek(week) };
    }
    return null;
  } catch {
    return null;
  }
};
