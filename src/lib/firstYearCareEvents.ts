/**
 * Reads and writes for the First Year daily care log.
 *
 * Every write goes through the table so the database validation trigger and
 * row level security always apply. Care events are private to the parent and
 * are never sent to the AI companion.
 */

import { supabase } from "@/integrations/supabase/client";
import {
  bankActiveSide,
  bankedFeedSeconds,
  parseCareMetadata,
  type CareEvent,
  type CareEventMetadata,
  type CareEventPayload,
  type CareEventType,
  type FeedMethod,
  type FeedSide,
  type Side,
  type SleepKind,
  type StoredNappyType,
} from "@/lib/firstYearCareEventsSchema";

const COLUMNS =
  "id, baby_id, event_type, occurred_at, started_at, ended_at, amount_ml, side, nappy_type, feed_method, sleep_kind, note, metadata, updated_at";

const toEvent = (row: Record<string, unknown>): CareEvent => ({
  id: row.id as string,
  baby_id: row.baby_id as string,
  event_type: row.event_type as CareEventType,
  occurred_at: row.occurred_at as string,
  started_at: (row.started_at as string | null) ?? null,
  ended_at: (row.ended_at as string | null) ?? null,
  amount_ml: row.amount_ml === null || row.amount_ml === undefined ? null : Number(row.amount_ml),
  side: (row.side as Side | null) ?? null,
  nappy_type: (row.nappy_type as StoredNappyType | null) ?? null,
  feed_method: (row.feed_method as FeedMethod | null) ?? null,
  sleep_kind: (row.sleep_kind as SleepKind | null) ?? null,
  note: (row.note as string | null) ?? null,
  metadata: parseCareMetadata(row.metadata),
  updated_at: row.updated_at as string,
});

/** Local start and end of a calendar day, so "today" follows the parent. */
export const dayBounds = (dateKey: string): { from: string; to: string } => {
  const [year, month, day] = dateKey.split("-").map(Number);
  const from = new Date(year, month - 1, day, 0, 0, 0, 0);
  const to = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
  return { from: from.toISOString(), to: to.toISOString() };
};

/** Every care event logged on one local calendar day, newest first. */
export const getCareEventsForDay = async (
  userId: string,
  dateKey: string,
): Promise<CareEvent[]> => {
  const { from, to } = dayBounds(dateKey);
  const { data, error } = await supabase
    .from("first_year_care_events")
    .select(COLUMNS)
    .eq("user_id", userId)
    .gte("occurred_at", from)
    .lt("occurred_at", to)
    .order("occurred_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toEvent);
};

/**
 * Any sleep still running, whenever it started. A sleep that began last night
 * has to stay stoppable this morning.
 */
export const getRunningSleeps = async (userId: string): Promise<CareEvent[]> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .select(COLUMNS)
    .eq("user_id", userId)
    .eq("event_type", "sleep")
    .is("ended_at", null)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toEvent);
};

/** Any live breast feed still running, so a refresh picks it straight back up. */
export const getRunningFeeds = async (userId: string): Promise<CareEvent[]> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .select(COLUMNS)
    .eq("user_id", userId)
    .eq("event_type", "feed")
    .not("started_at", "is", null)
    .is("ended_at", null)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toEvent).filter((event) => event.metadata.feed_mode === "breast");
};

/** Events across a window of recent days, for the quiet recent days summary. */
export const getRecentCareEvents = async (
  userId: string,
  days = 7,
  reference: Date = new Date(),
): Promise<CareEvent[]> => {
  const start = new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate() - (days - 1),
    0,
    0,
    0,
    0,
  );
  const { data, error } = await supabase
    .from("first_year_care_events")
    .select(COLUMNS)
    .eq("user_id", userId)
    .gte("occurred_at", start.toISOString())
    .order("occurred_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toEvent);
};

export const saveCareEvent = async (
  userId: string,
  payload: CareEventPayload,
): Promise<CareEvent> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .insert({ ...payload, metadata: payload.metadata as never, user_id: userId })
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toEvent(data);
};

export const updateCareEvent = async (
  userId: string,
  id: string,
  payload: CareEventPayload,
): Promise<CareEvent> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .update({ ...payload, metadata: payload.metadata as never })
    .eq("id", id)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toEvent(data);
};

export const deleteCareEvent = async (userId: string, id: string): Promise<void> => {
  const { error } = await supabase
    .from("first_year_care_events")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
};

/** Start a sleep now. One running sleep per baby is enforced by the database. */
export const startSleep = async (
  userId: string,
  babyId: string,
  startedAt: Date = new Date(),
): Promise<CareEvent> =>
  saveCareEvent(userId, {
    event_type: "sleep",
    baby_id: babyId,
    occurred_at: startedAt.toISOString(),
    started_at: startedAt.toISOString(),
    ended_at: null,
    amount_ml: null,
    side: null,
    nappy_type: null,
    feed_method: null,
    sleep_kind: null,
    note: null,
    metadata: {},
  });

/** Stop a running sleep. The duration is calculated, never suggested. */
export const stopSleep = async (
  userId: string,
  id: string,
  endedAt: Date = new Date(),
): Promise<CareEvent> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .update({ ended_at: endedAt.toISOString() })
    .eq("id", id)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toEvent(data);
};

const patchFeed = async (
  userId: string,
  id: string,
  patch: Record<string, unknown>,
  // The Data API types are generated; a shaped patch is validated by the trigger.
): Promise<CareEvent> => {
  const { data, error } = await supabase
    .from("first_year_care_events")
    .update(patch as never)
    .eq("id", id)
    .eq("user_id", userId)
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return toEvent(data);
};

/** Start a live breast feed on one side. One per baby, enforced by the database. */
export const startBreastFeed = async (
  userId: string,
  babyId: string,
  side: FeedSide,
  startedAt: Date = new Date(),
): Promise<CareEvent> =>
  saveCareEvent(userId, {
    event_type: "feed",
    baby_id: babyId,
    occurred_at: startedAt.toISOString(),
    started_at: startedAt.toISOString(),
    ended_at: null,
    amount_ml: null,
    side: null,
    nappy_type: null,
    feed_method: "breast",
    sleep_kind: null,
    note: null,
    metadata: {
      feed_mode: "breast",
      active_side: side,
      active_side_started_at: startedAt.toISOString(),
    },
  });

/** Bank the running side and start the other one. */
export const switchFeedSide = async (
  userId: string,
  event: CareEvent,
  side: FeedSide,
  now: Date = new Date(),
): Promise<CareEvent> => {
  const banked = bankActiveSide(event.metadata, now);
  const metadata: CareEventMetadata = {
    ...banked,
    active_side: side,
    active_side_started_at: now.toISOString(),
  };
  return patchFeed(userId, event.id, { metadata: metadata as never });
};

/** Bank the running side and leave the feed paused. */
export const pauseBreastFeed = async (
  userId: string,
  event: CareEvent,
  now: Date = new Date(),
): Promise<CareEvent> =>
  patchFeed(userId, event.id, { metadata: bankActiveSide(event.metadata, now) as never });

/** Pick a side back up after a pause. */
export const resumeBreastFeed = async (
  userId: string,
  event: CareEvent,
  side: FeedSide,
  now: Date = new Date(),
): Promise<CareEvent> => {
  const metadata: CareEventMetadata = {
    ...event.metadata,
    active_side: side,
    active_side_started_at: now.toISOString(),
  };
  return patchFeed(userId, event.id, { metadata: metadata as never });
};

/** Bank any running side, then close the feed with its total. */
export const endBreastFeed = async (
  userId: string,
  event: CareEvent,
  now: Date = new Date(),
): Promise<CareEvent> => {
  const metadata = bankActiveSide(event.metadata, now);
  const total = bankedFeedSeconds(metadata);
  const left = metadata.left_duration_seconds ?? 0;
  const right = metadata.right_duration_seconds ?? 0;
  const side: Side | null =
    left > 0 && right > 0 ? "both" : left > 0 ? "left" : right > 0 ? "right" : null;
  return patchFeed(userId, event.id, {
    ended_at: now.toISOString(),
    side,
    metadata: { ...metadata, total_duration_seconds: total } as never,
  });
};
