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

/** Every type the table can hold. `pump` is dormant and never offered. */
export const CARE_EVENT_TYPES = ["feed", "sleep", "nappy", "pump", "note"] as const;
export type CareEventType = (typeof CARE_EVENT_TYPES)[number];

/** The four actions offered in the interface. */
export const QUICK_ADD_TYPES = ["feed", "sleep", "nappy", "note"] as const;
export type QuickAddType = (typeof QUICK_ADD_TYPES)[number];

/** How a feed happened. Chosen first, before anything else is asked. */
export const FEED_MODES = ["breast", "bottle"] as const;
export type FeedMode = (typeof FEED_MODES)[number];

export const BOTTLE_TYPES = ["expressed", "formula", "tube", "other"] as const;
export type BottleType = (typeof BOTTLE_TYPES)[number];

/** Kept for rows written before this refinement. */
export const FEED_METHODS = ["breast", "bottle", "expressed", "formula", "solids"] as const;
export type FeedMethod = (typeof FEED_METHODS)[number];

export const NAPPY_TYPES = ["wee", "poo", "both", "dry"] as const;
export type NappyType = (typeof NAPPY_TYPES)[number];

/** Values stored before this refinement, still readable. */
export type StoredNappyType = NappyType | "wet" | "dirty";

export const RASH_LEVELS = ["no", "little", "yes", "unsure"] as const;
export type RashLevel = (typeof RASH_LEVELS)[number];

export const POO_TEXTURES = ["runny", "soft", "formed", "hard", "other"] as const;
export type PooTexture = (typeof POO_TEXTURES)[number];

export const POO_SIZES = ["small", "medium", "large"] as const;
export type PooSize = (typeof POO_SIZES)[number];

export const POO_COLOURS = ["yellow", "brown", "green", "other"] as const;
export type PooColour = (typeof POO_COLOURS)[number];

export const SIDES = ["left", "right", "both"] as const;
export type Side = (typeof SIDES)[number];

export type FeedSide = "left" | "right";

export const SLEEP_KINDS = ["nap", "night"] as const;
export type SleepKind = (typeof SLEEP_KINDS)[number];

export type AmountUnit = "ml" | "oz";

export const CARE_NOTE_MAX_LENGTH = 2000;
export const MAX_AMOUNT_ML = 2000;
export const ML_PER_OZ = 29.5735;
/** A single side of one feed cannot sensibly run past twelve hours. */
export const MAX_FEED_SIDE_MINUTES = 720;

/** Warm labels for the quick add row and the timeline. */
export const CARE_EVENT_LABELS: Record<CareEventType, string> = {
  feed: "Feed",
  sleep: "Sleep",
  nappy: "Nappy",
  pump: "Pump",
  note: "Moment",
};

export const FEED_MODE_LABELS: Record<FeedMode, string> = {
  breast: "Breast",
  bottle: "Bottle",
};

export const BOTTLE_TYPE_LABELS: Record<BottleType, string> = {
  expressed: "Expressed breast milk",
  formula: "Formula",
  tube: "Tube feed",
  other: "Other",
};

export const FEED_METHOD_LABELS: Record<FeedMethod, string> = {
  breast: "Breast",
  bottle: "Bottle",
  expressed: "Expressed milk",
  formula: "Formula",
  solids: "Solids",
};

export const NAPPY_LABELS: Record<NappyType, string> = {
  wee: "Wee",
  poo: "Poo",
  both: "Both",
  dry: "Dry",
};

export const RASH_LEVEL_LABELS: Record<RashLevel, string> = {
  no: "No",
  little: "A little",
  yes: "Yes",
  unsure: "Not sure",
};

export const POO_TEXTURE_LABELS: Record<PooTexture, string> = {
  runny: "Runny",
  soft: "Soft",
  formed: "Formed",
  hard: "Hard",
  other: "Other",
};

export const POO_SIZE_LABELS: Record<PooSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export const POO_COLOUR_LABELS: Record<PooColour, string> = {
  yellow: "Yellow",
  brown: "Brown",
  green: "Green",
  other: "Other",
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

/** Older rows used wet and dirty. They read as wee and poo. */
export const normaliseNappyType = (value: StoredNappyType | null): NappyType | null => {
  if (value === null) return null;
  if (value === "wet") return "wee";
  if (value === "dirty") return "poo";
  return value;
};

/** Shaped extras stored on the event. Every key is optional. */
export type CareEventMetadata = {
  feed_mode?: FeedMode;
  bottle_type?: BottleType;
  active_side?: FeedSide;
  active_side_started_at?: string;
  left_duration_seconds?: number;
  right_duration_seconds?: number;
  total_duration_seconds?: number;
  rash_level?: RashLevel;
  poo_texture?: PooTexture;
  poo_size?: PooSize;
  poo_colour?: PooColour;
};

const oneOf = <T extends string>(options: readonly T[], value: unknown): T | undefined =>
  typeof value === "string" && (options as readonly string[]).includes(value)
    ? (value as T)
    : undefined;

const positiveSeconds = (value: unknown): number | undefined => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return undefined;
  return Math.round(numeric);
};

/** Read only the keys we own, and ignore anything else that may be present. */
export const parseCareMetadata = (raw: unknown): CareEventMetadata => {
  if (!raw || typeof raw !== "object") return {};
  const source = raw as Record<string, unknown>;
  const metadata: CareEventMetadata = {};

  const feedMode = oneOf(FEED_MODES, source.feed_mode);
  if (feedMode) metadata.feed_mode = feedMode;
  const bottleType = oneOf(BOTTLE_TYPES, source.bottle_type);
  if (bottleType) metadata.bottle_type = bottleType;
  const activeSide = oneOf(["left", "right"] as const, source.active_side);
  if (activeSide) metadata.active_side = activeSide;
  if (typeof source.active_side_started_at === "string") {
    metadata.active_side_started_at = source.active_side_started_at;
  }
  const left = positiveSeconds(source.left_duration_seconds);
  if (left !== undefined) metadata.left_duration_seconds = left;
  const right = positiveSeconds(source.right_duration_seconds);
  if (right !== undefined) metadata.right_duration_seconds = right;
  const total = positiveSeconds(source.total_duration_seconds);
  if (total !== undefined) metadata.total_duration_seconds = total;

  const rash = oneOf(RASH_LEVELS, source.rash_level);
  if (rash) metadata.rash_level = rash;
  const texture = oneOf(POO_TEXTURES, source.poo_texture);
  if (texture) metadata.poo_texture = texture;
  const size = oneOf(POO_SIZES, source.poo_size);
  if (size) metadata.poo_size = size;
  const colour = oneOf(POO_COLOURS, source.poo_colour);
  if (colour) metadata.poo_colour = colour;

  return metadata;
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
  nappy_type: StoredNappyType | null;
  feed_method: FeedMethod | null;
  sleep_kind: SleepKind | null;
  note: string | null;
  metadata: CareEventMetadata;
  updated_at: string;
};

/** A draft as gathered by the logging sheet, before it reaches the database. */
export type CareEventDraft = {
  eventType: CareEventType;
  babyId: string | null;
  /** Local wall-clock time for a moment, and the start of a sleep or feed. */
  occurredAt: Date | null;
  endedAt?: Date | null;
  /** Amount as typed, in the unit the parent chose. Empty means no amount. */
  amount?: string;
  amountUnit?: AmountUnit;
  feedMode?: FeedMode | null;
  bottleType?: BottleType | null;
  leftDurationSeconds?: number | null;
  rightDurationSeconds?: number | null;
  nappyType?: NappyType | null;
  rashLevel?: RashLevel | null;
  pooTexture?: PooTexture | null;
  pooSize?: PooSize | null;
  pooColour?: PooColour | null;
  sleepKind?: SleepKind | null;
  note?: string;
  /** Extra metadata to keep, used when a live feed is saved. */
  metadata?: CareEventMetadata;
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
  metadata: CareEventMetadata;
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

/** Seconds between two times, floored, never negative. */
export const durationSeconds = (start: Date | string, end: Date | string): number => {
  const from = typeof start === "string" ? new Date(start) : start;
  const to = typeof end === "string" ? new Date(end) : end;
  const seconds = Math.floor((to.getTime() - from.getTime()) / 1000);
  return seconds > 0 ? seconds : 0;
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

/** "08:14" style stopwatch text for a live timer. */
export const formatStopwatch = (seconds: number): string => {
  const safe = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const rest = safe % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${pad(minutes)}:${pad(rest)}`;
};

/** Minutes shown from banked seconds, rounded to the nearest minute. */
export const secondsToMinutes = (seconds: number | undefined | null): number =>
  seconds && seconds > 0 ? Math.round(seconds / 60) : 0;

/** Time already banked on both sides of a breast feed. */
export const bankedFeedSeconds = (metadata: CareEventMetadata): number =>
  (metadata.left_duration_seconds ?? 0) + (metadata.right_duration_seconds ?? 0);

/** Banked time plus whatever the running side has counted so far. */
export const liveFeedSeconds = (metadata: CareEventMetadata, now: Date = new Date()): number => {
  const banked = bankedFeedSeconds(metadata);
  if (!metadata.active_side || !metadata.active_side_started_at) return banked;
  return banked + durationSeconds(metadata.active_side_started_at, now);
};

/** Bank the running side into its total and clear the active side. */
export const bankActiveSide = (
  metadata: CareEventMetadata,
  now: Date = new Date(),
): CareEventMetadata => {
  const next: CareEventMetadata = { ...metadata };
  if (metadata.active_side && metadata.active_side_started_at) {
    const elapsed = durationSeconds(metadata.active_side_started_at, now);
    const key = metadata.active_side === "left" ? "left_duration_seconds" : "right_duration_seconds";
    next[key] = (metadata[key] ?? 0) + elapsed;
  }
  delete next.active_side;
  delete next.active_side_started_at;
  next.total_duration_seconds = bankedFeedSeconds(next);
  return next;
};

/** A running breast feed is one that was started live and has not ended. */
export const isRunningBreastFeed = (event: CareEvent): boolean =>
  event.event_type === "feed" &&
  event.started_at !== null &&
  event.ended_at === null &&
  event.metadata.feed_mode === "breast";

/** Days between a date of birth and a reference day. */
export const babyAgeInDays = (dateOfBirth: string, reference: Date = new Date()): number => {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  if (!year || !month || !day) return 0;
  const dob = new Date(year, month - 1, day);
  const start = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  return Math.max(0, Math.round((start.getTime() - dob.getTime()) / 86400000));
};

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

  const isFeed = draft.eventType === "feed";
  const feedMode = isFeed ? draft.feedMode ?? null : null;
  if (isFeed && !feedMode) {
    return { ok: false, message: "Please choose breast or bottle." };
  }
  if (isFeed && feedMode === "bottle" && !draft.bottleType) {
    return { ok: false, message: "Please choose what was in the bottle." };
  }

  let amountMl: number | null = null;
  if (isFeed && feedMode === "bottle") {
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

  const leftSeconds = Math.max(0, Math.round(draft.leftDurationSeconds ?? 0));
  const rightSeconds = Math.max(0, Math.round(draft.rightDurationSeconds ?? 0));
  if (isFeed && feedMode === "breast") {
    const cap = MAX_FEED_SIDE_MINUTES * 60;
    if (leftSeconds > cap || rightSeconds > cap) {
      return { ok: false, message: `Please enter each side as up to ${MAX_FEED_SIDE_MINUTES} minutes.` };
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
  if (isFeed && feedMode === "breast" && draft.endedAt) {
    endedAt = draft.endedAt;
    if (Number.isNaN(endedAt.getTime())) {
      return { ok: false, message: "Please check the end time." };
    }
    if (endedAt.getTime() > now.getTime() + allowance) {
      return { ok: false, message: "A feed cannot end in the future." };
    }
    if (endedAt.getTime() <= draft.occurredAt.getTime()) {
      return { ok: false, message: "The end time needs to be after the start time." };
    }
  }

  if (draft.eventType === "nappy" && !draft.nappyType) {
    return { ok: false, message: "Please choose what was in the nappy." };
  }

  const isSleep = draft.eventType === "sleep";
  const carriesTimes = isSleep || (isFeed && feedMode === "breast" && Boolean(draft.endedAt));

  const metadata: CareEventMetadata = { ...(draft.metadata ?? {}) };
  if (isFeed && feedMode) {
    metadata.feed_mode = feedMode;
    if (feedMode === "bottle") {
      metadata.bottle_type = draft.bottleType ?? undefined;
      delete metadata.left_duration_seconds;
      delete metadata.right_duration_seconds;
      delete metadata.total_duration_seconds;
      delete metadata.active_side;
      delete metadata.active_side_started_at;
    } else {
      delete metadata.bottle_type;
      if (leftSeconds > 0) metadata.left_duration_seconds = leftSeconds;
      else delete metadata.left_duration_seconds;
      if (rightSeconds > 0) metadata.right_duration_seconds = rightSeconds;
      else delete metadata.right_duration_seconds;
      const total = leftSeconds + rightSeconds;
      if (total > 0) metadata.total_duration_seconds = total;
      else delete metadata.total_duration_seconds;
    }
  }
  if (draft.eventType === "nappy") {
    if (draft.rashLevel) metadata.rash_level = draft.rashLevel;
    else delete metadata.rash_level;
    const poo = draft.nappyType === "poo" || draft.nappyType === "both";
    if (poo && draft.pooTexture) metadata.poo_texture = draft.pooTexture;
    else delete metadata.poo_texture;
    if (poo && draft.pooSize) metadata.poo_size = draft.pooSize;
    else delete metadata.poo_size;
    if (poo && draft.pooColour) metadata.poo_colour = draft.pooColour;
    else delete metadata.poo_colour;
  }

  const breastSide: Side | null =
    isFeed && feedMode === "breast"
      ? leftSeconds > 0 && rightSeconds > 0
        ? "both"
        : leftSeconds > 0
          ? "left"
          : rightSeconds > 0
            ? "right"
            : null
      : null;

  return {
    ok: true,
    payload: {
      event_type: draft.eventType,
      baby_id: draft.babyId,
      occurred_at: draft.occurredAt.toISOString(),
      started_at: carriesTimes ? draft.occurredAt.toISOString() : null,
      ended_at: carriesTimes && endedAt ? endedAt.toISOString() : null,
      amount_ml: isFeed && feedMode === "bottle" ? amountMl : null,
      side: breastSide,
      nappy_type: draft.eventType === "nappy" ? draft.nappyType ?? null : null,
      feed_method: isFeed ? feedMode : null,
      sleep_kind: isSleep ? draft.sleepKind ?? null : null,
      note: note.length > 0 ? note : null,
      metadata,
    },
  };
};

export type NappyBreakdown = Record<NappyType, number>;

export type DaySummary = {
  feeds: number;
  breastFeeds: number;
  bottleFeeds: number;
  /** Minutes of breast feeding from finished feeds only. */
  feedMinutes: number;
  feedMl: number | null;
  nappies: number;
  nappyBreakdown: NappyBreakdown;
  moments: number;
  sleeps: number;
  /** Minutes of sleep from finished sleeps only. */
  sleepMinutes: number;
  runningSleep: boolean;
  runningFeed: boolean;
};

/** Factual counts and totals for one day. No interpretation, no advice. */
export const summariseDay = (events: CareEvent[], now: Date = new Date()): DaySummary => {
  const summary: DaySummary = {
    feeds: 0,
    breastFeeds: 0,
    bottleFeeds: 0,
    feedMinutes: 0,
    feedMl: null,
    nappies: 0,
    nappyBreakdown: { wee: 0, poo: 0, both: 0, dry: 0 },
    moments: 0,
    sleeps: 0,
    sleepMinutes: 0,
    runningSleep: false,
    runningFeed: false,
  };

  for (const event of events) {
    switch (event.event_type) {
      case "feed": {
        if (isRunningBreastFeed(event)) {
          summary.runningFeed = true;
          summary.breastFeeds += 1;
          summary.feeds += 1;
          break;
        }
        summary.feeds += 1;
        if (event.metadata.feed_mode === "breast") {
          summary.breastFeeds += 1;
          summary.feedMinutes += secondsToMinutes(
            event.metadata.total_duration_seconds ?? bankedFeedSeconds(event.metadata),
          );
        } else if (event.metadata.feed_mode === "bottle") {
          summary.bottleFeeds += 1;
        }
        if (event.amount_ml) summary.feedMl = (summary.feedMl ?? 0) + Number(event.amount_ml);
        break;
      }
      case "nappy": {
        summary.nappies += 1;
        const type = normaliseNappyType(event.nappy_type);
        if (type) summary.nappyBreakdown[type] += 1;
        break;
      }
      case "note":
        summary.moments += 1;
        break;
      case "sleep":
        summary.sleeps += 1;
        if (event.ended_at) {
          summary.sleepMinutes += durationMinutes(event.started_at ?? event.occurred_at, event.ended_at);
        } else {
          summary.runningSleep = true;
        }
        break;
      default:
        break;
    }
  }

  void now;
  return summary;
};

/** One short factual line describing a logged moment. */
export const describeEvent = (
  event: CareEvent,
  unit: AmountUnit = "ml",
  now: Date = new Date(),
): string => {
  const parts: string[] = [];

  if (event.event_type === "feed") {
    const mode = event.metadata.feed_mode ?? null;
    if (mode === "breast") {
      if (isRunningBreastFeed(event)) {
        parts.push("Breast feed running");
        parts.push(`${formatDuration(secondsToMinutes(liveFeedSeconds(event.metadata, now)))} so far`);
      } else {
        parts.push("Breast feed");
        const left = secondsToMinutes(event.metadata.left_duration_seconds);
        const right = secondsToMinutes(event.metadata.right_duration_seconds);
        if (left > 0) parts.push(`left ${left}m`);
        if (right > 0) parts.push(`right ${right}m`);
      }
    } else if (mode === "bottle") {
      parts.push("Bottle");
      if (event.metadata.bottle_type) parts.push(BOTTLE_TYPE_LABELS[event.metadata.bottle_type]);
      const amount = formatAmount(event.amount_ml, unit);
      if (amount) parts.push(amount);
    } else {
      // A feed logged before this refinement.
      if (event.feed_method) parts.push(FEED_METHOD_LABELS[event.feed_method]);
      const amount = formatAmount(event.amount_ml, unit);
      if (amount) parts.push(amount);
      if (event.side) parts.push(SIDE_LABELS[event.side]);
    }
    return parts.join(", ");
  }

  if (event.event_type === "nappy") {
    const type = normaliseNappyType(event.nappy_type);
    parts.push(type ? `${NAPPY_LABELS[type]} nappy` : "Nappy");
    if (event.metadata.poo_texture) parts.push(POO_TEXTURE_LABELS[event.metadata.poo_texture].toLowerCase());
    if (event.metadata.poo_size) parts.push(POO_SIZE_LABELS[event.metadata.poo_size].toLowerCase());
    if (event.metadata.poo_colour) parts.push(POO_COLOUR_LABELS[event.metadata.poo_colour].toLowerCase());
    if (event.metadata.rash_level && event.metadata.rash_level !== "no") {
      parts.push(`redness noted: ${RASH_LEVEL_LABELS[event.metadata.rash_level].toLowerCase()}`);
    }
    return parts.join(", ");
  }

  if (event.event_type === "sleep") {
    const start = event.started_at ?? event.occurred_at;
    if (!event.ended_at) {
      return `Sleeping now, started ${formatClock(start)}`;
    }
    if (event.sleep_kind) parts.push(SLEEP_KIND_LABELS[event.sleep_kind]);
    parts.push(`${formatClock(start)} to ${formatClock(event.ended_at)}`);
    parts.push(formatDuration(durationMinutes(start, event.ended_at)));
    return parts.join(", ");
  }

  if (event.event_type === "pump") {
    const amount = formatAmount(event.amount_ml, unit);
    return amount ? `Pump, ${amount}` : "Pump";
  }

  return "";
};

/** 24 hour clock text used in timeline rows. */
export const formatClock = (value: Date | string): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
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
