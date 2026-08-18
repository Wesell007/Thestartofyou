/**
 * Shapes, labels and validation for First Year daily care logs.
 *
 * Pure: no Supabase, no hidden `Date.now()` where a reference can be passed.
 * Amounts are always held in millilitres. The ml or oz choice is an input and
 * display preference only, remembered on the device.
 *
 * Nothing here predicts, recommends or scores anything. Summaries are counts
 * and totals of what the parent logged, and nothing more.
 */

export const CARE_EVENT_TYPES = ["feed", "sleep", "nappy", "pump", "note"] as const;
export type CareEventType = (typeof CARE_EVENT_TYPES)[number];

export const FEED_METHODS = ["breast", "bottle", "expressed", "formula", "solids"] as const;
export type FeedMethod = (typeof FEED_METHODS)[number];

export const NAPPY_TYPES = ["wet", "dirty", "both"] as const;
export type NappyType = (typeof NAPPY_TYPES)[number];

export const SIDES = ["left", "right", "both"] as const;
export type Side = (typeof SIDES)[number];

export const SLEEP_KINDS = ["nap", "night"] as const;
export type SleepKind = (typeof SLEEP_KINDS)[number];

export type AmountUnit = "ml" | "oz";

export const CARE_NOTE_MAX_LENGTH = 2000;
export const MAX_AMOUNT_ML = 2000;
export const ML_PER_OZ = 29.5735;

/** Warm labels for the quick add row and the timeline. */
export const CARE_EVENT_LABELS: Record<CareEventType, string> = {
  feed: "Feed",
  sleep: "Sleep",
  nappy: "Nappy",
  pump: "Pump",
  note: "Moment",
};

export const FEED_METHOD_LABELS: Record<FeedMethod, string> = {
  breast: "Breast",
  bottle: "Bottle",
  expressed: "Expressed milk",
  formula: "Formula",
  solids: "Solids",
};

export const NAPPY_LABELS: Record<NappyType, string> = {
  wet: "Wet",
  dirty: "Dirty",
  both: "Both",
};

export const SIDE_LABELS: Record<Side, string> = {
  left: "Left",
  right: "Right",
  both: "Both",
};

export const SLEEP_KIND_LABELS: Record<SleepKind, string> = {
  nap: "Nap",
  night: "Night sleep",
};

/** A care event exactly as stored, with times parsed by the caller. */
export type CareEvent = {
  id: string;
  baby_id: string;
  event_type: CareEventType;
  occurred_at: string;
  started_at: string | null;
  ended_at: string | null;
  amount_ml: number | null;
  side: Side | null;
  nappy_type: NappyType | null;
  feed_method: FeedMethod | null;
  sleep_kind: SleepKind | null;
  note: string | null;
  updated_at: string;
};

/** A draft as gathered by the logging sheet, before it reaches the database. */
export type CareEventDraft = {
  eventType: CareEventType;
  babyId: string | null;
  /** Local wall-clock time for non-sleep events, and the start of a sleep. */
  occurredAt: Date | null;
  endedAt?: Date | null;
  /** Amount as typed, in the unit the parent chose. Empty means no amount. */
  amount?: string;
  amountUnit?: AmountUnit;
  side?: Side | null;
  nappyType?: NappyType | null;
  feedMethod?: FeedMethod | null;
  sleepKind?: SleepKind | null;
  note?: string;
};

export type CareEventPayload = {
  event_type: CareEventType;
  baby_id: string;
  occurred_at: string;
  started_at: string | null;
  ended_at: string | null;
  amount_ml: number | null;
  side: Side | null;
  nappy_type: NappyType | null;
  feed_method: FeedMethod | null;
  sleep_kind: SleepKind | null;
  note: string | null;
};

export type CareValidation =
  | { ok: true; payload: CareEventPayload }
  | { ok: false; message: string };

/** Convert a typed amount into millilitres. Returns null when left empty. */
export const toMillilitres = (amount: string | undefined, unit: AmountUnit): number | null => {
  const trimmed = (amount ?? "").trim();
  if (trimmed.length === 0) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return Number.NaN;
  const ml = unit === "oz" ? value * ML_PER_OZ : value;
  return Math.round(ml * 10) / 10;
};

/** Display an amount in the parent's chosen unit. */
export const formatAmount = (amountMl: number | null, unit: AmountUnit): string | null => {
  if (amountMl === null || !Number.isFinite(amountMl)) return null;
  if (unit === "oz") {
    const oz = amountMl / ML_PER_OZ;
    return `${Math.round(oz * 10) / 10} oz`;
  }
  return `${Math.round(amountMl)} ml`;
};

/** Minutes between two times, floored, never negative. */
export const durationMinutes = (start: Date | string, end: Date | string): number => {
  const from = typeof start === "string" ? new Date(start) : start;
  const to = typeof end === "string" ? new Date(end) : end;
  const minutes = Math.floor((to.getTime() - from.getTime()) / 60000);
  return minutes > 0 ? minutes : 0;
};

/** "1h 20m", "45m", "0m". Factual only. */
export const formatDuration = (minutes: number): string => {
  const safe = Math.max(0, Math.floor(minutes));
  const hours = Math.floor(safe / 60);
  const rest = safe % 60;
  if (hours === 0) return `${rest}m`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}m`;
};

/** Days between a date of birth and a reference day. */
export const babyAgeInDays = (dateOfBirth: string, reference: Date = new Date()): number => {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  if (!year || !month || !day) return 0;
  const dob = new Date(year, month - 1, day);
  const start = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  return Math.max(0, Math.round((start.getTime() - dob.getTime()) / 86400000));
};

/**
 * Solids are only offered from around six months. Younger babies never see the
 * option. This is an interface choice, not feeding advice.
 */
export const solidsAvailable = (dateOfBirth: string, reference: Date = new Date()): boolean =>
  babyAgeInDays(dateOfBirth, reference) >= 182;

export const feedMethodsForAge = (
  dateOfBirth: string | null,
  reference: Date = new Date(),
): FeedMethod[] =>
  FEED_METHODS.filter(
    (method) => method !== "solids" || (dateOfBirth ? solidsAvailable(dateOfBirth, reference) : false),
  );

/** Validate a draft with the same rules the database trigger applies. */
export const validateCareEventDraft = (
  draft: CareEventDraft,
  options: { now?: Date; dateOfBirth?: string | null } = {},
): CareValidation => {
  const now = options.now ?? new Date();
  const allowance = 5 * 60 * 1000;

  if (!draft.babyId) {
    return { ok: false, message: "Please choose which baby this is for." };
  }
  if (!draft.occurredAt || Number.isNaN(draft.occurredAt.getTime())) {
    return { ok: false, message: "Please check the time." };
  }
  if (draft.occurredAt.getTime() > now.getTime() + allowance) {
    return { ok: false, message: "That time is still ahead. Please choose a time that has passed." };
  }

  const note = (draft.note ?? "").trim();
  if (note.length > CARE_NOTE_MAX_LENGTH) {
    return { ok: false, message: `Please keep this under ${CARE_NOTE_MAX_LENGTH} characters.` };
  }
  if (draft.eventType === "note" && note.length === 0) {
    return { ok: false, message: "There is nothing to save yet." };
  }

  if (options.dateOfBirth) {
    const [y, m, d] = options.dateOfBirth.split("-").map(Number);
    if (y && m && d) {
      const dobStart = new Date(y, m - 1, d - 1);
      if (draft.occurredAt.getTime() < dobStart.getTime()) {
        return { ok: false, message: "A log cannot be saved before your baby was born." };
      }
    }
  }

  let amountMl: number | null = null;
  if (draft.eventType === "feed" || draft.eventType === "pump") {
    amountMl = toMillilitres(draft.amount, draft.amountUnit ?? "ml");
    if (amountMl !== null && Number.isNaN(amountMl)) {
      return { ok: false, message: "Please enter the amount as a number." };
    }
    if (amountMl !== null && amountMl <= 0) {
      return { ok: false, message: "An amount needs to be more than zero, or left empty." };
    }
    if (amountMl !== null && amountMl > MAX_AMOUNT_ML) {
      return { ok: false, message: `Please enter an amount up to ${MAX_AMOUNT_ML} ml.` };
    }
  }

  let endedAt: Date | null = null;
  if (draft.eventType === "sleep") {
    endedAt = draft.endedAt ?? null;
    if (endedAt) {
      if (Number.isNaN(endedAt.getTime())) {
        return { ok: false, message: "Please check the end time." };
      }
      if (endedAt.getTime() > now.getTime() + allowance) {
        return { ok: false, message: "A sleep cannot end in the future." };
      }
      if (endedAt.getTime() <= draft.occurredAt.getTime()) {
        return { ok: false, message: "The end time needs to be after the start time." };
      }
    }
  }

  const isSleep = draft.eventType === "sleep";
  const canCarryAmount = draft.eventType === "feed" || draft.eventType === "pump";

  return {
    ok: true,
    payload: {
      event_type: draft.eventType,
      baby_id: draft.babyId,
      occurred_at: draft.occurredAt.toISOString(),
      started_at: isSleep ? draft.occurredAt.toISOString() : null,
      ended_at: isSleep && endedAt ? endedAt.toISOString() : null,
      amount_ml: canCarryAmount ? amountMl : null,
      side: canCarryAmount ? draft.side ?? null : null,
      nappy_type: draft.eventType === "nappy" ? draft.nappyType ?? null : null,
      feed_method: draft.eventType === "feed" ? draft.feedMethod ?? null : null,
      sleep_kind: isSleep ? draft.sleepKind ?? null : null,
      note: note.length > 0 ? note : null,
    },
  };
};

export type DaySummary = {
  feeds: number;
  nappies: number;
  pumps: number;
  moments: number;
  sleeps: number;
  sleepMinutes: number;
  feedMl: number | null;
  runningSleep: boolean;
};

/** Factual counts and totals for one day. No interpretation, no advice. */
export const summariseDay = (events: CareEvent[], now: Date = new Date()): DaySummary => {
  const summary: DaySummary = {
    feeds: 0,
    nappies: 0,
    pumps: 0,
    moments: 0,
    sleeps: 0,
    sleepMinutes: 0,
    feedMl: null,
    runningSleep: false,
  };

  for (const event of events) {
    switch (event.event_type) {
      case "feed":
        summary.feeds += 1;
        if (event.amount_ml) summary.feedMl = (summary.feedMl ?? 0) + Number(event.amount_ml);
        break;
      case "nappy":
        summary.nappies += 1;
        break;
      case "pump":
        summary.pumps += 1;
        break;
      case "note":
        summary.moments += 1;
        break;
      case "sleep":
        summary.sleeps += 1;
        if (event.ended_at) {
          summary.sleepMinutes += durationMinutes(event.started_at ?? event.occurred_at, event.ended_at);
        } else {
          summary.runningSleep = true;
          summary.sleepMinutes += durationMinutes(event.started_at ?? event.occurred_at, now);
        }
        break;
    }
  }

  return summary;
};

/** One short factual line describing a logged moment. */
export const describeEvent = (
  event: CareEvent,
  unit: AmountUnit = "ml",
  now: Date = new Date(),
): string => {
  const parts: string[] = [];
  if (event.event_type === "feed" && event.feed_method) parts.push(FEED_METHOD_LABELS[event.feed_method]);
  if (event.event_type === "nappy" && event.nappy_type) parts.push(NAPPY_LABELS[event.nappy_type]);
  if (event.event_type === "sleep") {
    if (event.sleep_kind) parts.push(SLEEP_KIND_LABELS[event.sleep_kind]);
    const start = event.started_at ?? event.occurred_at;
    parts.push(
      event.ended_at
        ? formatDuration(durationMinutes(start, event.ended_at))
        : `${formatDuration(durationMinutes(start, now))} so far`,
    );
  }
  const amount = formatAmount(event.amount_ml, unit);
  if (amount) parts.push(amount);
  if (event.side) parts.push(SIDE_LABELS[event.side]);
  return parts.join(" · ");
};

const UNIT_STORAGE_KEY = "tsoy.firstYear.amountUnit";

/** Remembered on the device only. Never stored on the account. */
export const readAmountUnit = (): AmountUnit => {
  if (typeof window === "undefined") return "ml";
  try {
    return window.localStorage.getItem(UNIT_STORAGE_KEY) === "oz" ? "oz" : "ml";
  } catch {
    return "ml";
  }
};

export const writeAmountUnit = (unit: AmountUnit): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(UNIT_STORAGE_KEY, unit);
  } catch {
    // A device that blocks storage simply falls back to ml each visit.
  }
};
