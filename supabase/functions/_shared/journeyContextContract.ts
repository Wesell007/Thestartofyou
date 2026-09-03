/**
 * AIC-2 — JourneyContextV1: the single source of truth for structured
 * companion journey context.
 *
 * This module is deliberately dependency-free and runtime-neutral: the Deno
 * edge function imports it for request validation, and the browser imports the
 * same file for its types and client-side normalisation. Server-side
 * validation remains the trust boundary — the client never decides what is
 * acceptable.
 *
 * Three provenance layers stay separate for ever:
 *   personal — authoritative, user-owned saved journey state (derived minimum)
 *   page     — what the person is currently reading (content, not identity)
 *   entry    — what they pressed Ask from (content, not identity)
 *
 * Nothing here may hold raw dates, identifiers, profile rows, notes or memory.
 */

export const JOURNEY_CONTEXT_VERSION = 1 as const;

/* ---------------------------------------------------------------- taxonomy */

/** Journeys a person can authoritatively *have* saved. Narrow by design. */
export const PERSONAL_JOURNEYS = ["pregnancy", "trying-to-conceive", "first-year"] as const;
export type PersonalJourney = (typeof PERSONAL_JOURNEYS)[number];

/**
 * Journeys a *page* can be about. Deliberately broader than the personal
 * taxonomy: someone may read Toddler or IVF content without any saved state.
 */
export const CONTENT_JOURNEYS = [
  "pregnancy",
  "trying-to-conceive",
  "ivf",
  "first-year",
  "toddler",
  "family",
  "postpartum",
  "preparing-for-baby",
  "support",
  "general",
] as const;
export type ContentJourney = (typeof CONTENT_JOURNEYS)[number];

export const TRIMESTERS = ["first", "second", "third"] as const;
export type Trimester = (typeof TRIMESTERS)[number];

/**
 * Authoritative TTC stage values. These mirror the user-selected
 * `ttc_journeys.support_status` options exactly; no new taxonomy is invented.
 */
export const TTC_STAGES = [
  "trying_naturally",
  "preparing_to_try",
  "considering_help",
  "in_treatment",
] as const;
export type TtcStage = (typeof TTC_STAGES)[number];

export const PAGE_TYPES = [
  "hub",
  "topic",
  "article",
  "week",
  "month",
  "tool",
  "journey",
  "other",
] as const;
export type PageType = (typeof PAGE_TYPES)[number];

/** Ask entry stage keys already written by `askDestination`. */
export const ENTRY_STAGES = [
  "ttc",
  "pregnancy",
  "first-year",
  "toddler",
  "family",
  "support",
  "recovery",
  "postpartum",
  "preparing",
  "ivf",
] as const;
export type EntryStage = (typeof ENTRY_STAGES)[number];

/* ---------------------------------------------------------------- contract */

/**
 * Discriminated union: cross-journey combinations (pregnancy + ageMonths,
 * first-year + week, TTC + trimester) are structurally impossible.
 */
export type PersonalJourneyContextV1 =
  | { journey: "pregnancy"; week?: number; trimester?: Trimester }
  | { journey: "trying-to-conceive"; ttcStage?: TtcStage; ivfInTreatment?: true }
  | { journey: "first-year"; ageMonths?: number };

export interface PageJourneyContextV1 {
  journey?: ContentJourney;
  pageType?: PageType;
  topic?: string;
  title?: string;
  /** Pregnancy week the PAGE is about. Never a personal fact. */
  week?: number;
  /** First year month the PAGE is about. Never a personal fact. */
  month?: number;
}

export interface EntryJourneyContextV1 {
  journey?: ContentJourney;
  stage?: EntryStage;
  topic?: string;
  title?: string;
}

export interface JourneyContextV1 {
  version: typeof JOURNEY_CONTEXT_VERSION;
  personal?: PersonalJourneyContextV1;
  page?: PageJourneyContextV1;
  entry?: EntryJourneyContextV1;
}

/* ------------------------------------------------------------------ bounds */

/** Pregnancy weeks the product supports, matching the live week routes. */
export const MIN_PREGNANCY_WEEK = 1;
export const MAX_PREGNANCY_WEEK = 42;

/**
 * First year month index. `getFirstYearAge().firstYearMonthIndex` is clamped
 * to 0-11 by the canonical utility, so this range is its real contract, not an
 * assumption.
 */
export const MIN_FIRST_YEAR_MONTH = 0;
export const MAX_FIRST_YEAR_MONTH = 11;

/** Free-text metadata (topic/title) length cap. Short by design. */
export const JOURNEY_TEXT_MAX_LENGTH = 80;

/* -------------------------------------------------------------- validation */

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const unknownKeys = (record: Record<string, unknown>, allowed: readonly string[]): boolean =>
  Object.keys(record).some((key) => !allowed.includes(key));

/**
 * Metadata strings are DATA, never instructions. Control characters and the
 * delimiter characters used by the prompt block are removed so a page title
 * can never terminate or forge a structured block.
 */
export const sanitiseJourneyText = (value: string): string =>
  value
    // deno-lint-ignore no-control-regex
    // eslint-disable-next-line no-control-regex -- stripping control characters is the point
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, JOURNEY_TEXT_MAX_LENGTH);

const optionalText = (
  value: unknown,
  label: string,
): Result<string | undefined> => {
  if (value === undefined || value === null || value === "") return { ok: true, value: undefined };
  if (typeof value !== "string") return { ok: false, error: `${label} must be text.` };
  if (value.length > JOURNEY_TEXT_MAX_LENGTH * 4) return { ok: false, error: `${label} is too long.` };
  const cleaned = sanitiseJourneyText(value);
  return { ok: true, value: cleaned || undefined };
};

const optionalEnum = <T extends string>(
  value: unknown,
  allowed: readonly T[],
  label: string,
): Result<T | undefined> => {
  if (value === undefined || value === null || value === "") return { ok: true, value: undefined };
  if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) {
    return { ok: false, error: `${label} is not a supported value.` };
  }
  return { ok: true, value: value as T };
};

const optionalInt = (
  value: unknown,
  min: number,
  max: number,
  label: string,
): Result<number | undefined> => {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
    return { ok: false, error: `${label} is out of range.` };
  }
  return { ok: true, value };
};

const parsePersonal = (value: unknown): Result<PersonalJourneyContextV1 | undefined> => {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (!isRecord(value)) return { ok: false, error: "Personal journey context must be an object." };

  const journey = value.journey;
  if (typeof journey !== "string" || !(PERSONAL_JOURNEYS as readonly string[]).includes(journey)) {
    return { ok: false, error: "Personal journey is not a supported value." };
  }

  if (journey === "pregnancy") {
    if (unknownKeys(value, ["journey", "week", "trimester"])) {
      return { ok: false, error: "Personal pregnancy context has unsupported fields." };
    }
    const week = optionalInt(value.week, MIN_PREGNANCY_WEEK, MAX_PREGNANCY_WEEK, "Pregnancy week");
    if (week.ok === false) return { ok: false, error: week.error };
    const trimester = optionalEnum(value.trimester, TRIMESTERS, "Trimester");
    if (trimester.ok === false) return { ok: false, error: trimester.error };
    return {
      ok: true,
      value: {
        journey: "pregnancy",
        ...(week.value !== undefined ? { week: week.value } : {}),
        ...(trimester.value ? { trimester: trimester.value } : {}),
      },
    };
  }

  if (journey === "trying-to-conceive") {
    if (unknownKeys(value, ["journey", "ttcStage", "ivfInTreatment"])) {
      return { ok: false, error: "Personal TTC context has unsupported fields." };
    }
    const ttcStage = optionalEnum(value.ttcStage, TTC_STAGES, "TTC stage");
    if (ttcStage.ok === false) return { ok: false, error: ttcStage.error };
    const ivf = value.ivfInTreatment;
    if (ivf !== undefined && ivf !== true) {
      return { ok: false, error: "IVF treatment flag must be true when present." };
    }
    return {
      ok: true,
      value: {
        journey: "trying-to-conceive",
        ...(ttcStage.value ? { ttcStage: ttcStage.value } : {}),
        ...(ivf === true ? { ivfInTreatment: true as const } : {}),
      },
    };
  }

  if (unknownKeys(value, ["journey", "ageMonths"])) {
    return { ok: false, error: "Personal first year context has unsupported fields." };
  }
  const ageMonths = optionalInt(
    value.ageMonths,
    MIN_FIRST_YEAR_MONTH,
    MAX_FIRST_YEAR_MONTH,
    "Baby age in months",
  );
  if (ageMonths.ok === false) return { ok: false, error: ageMonths.error };
  return {
    ok: true,
    value: {
      journey: "first-year",
      ...(ageMonths.value !== undefined ? { ageMonths: ageMonths.value } : {}),
    },
  };
};

const parsePage = (value: unknown): Result<PageJourneyContextV1 | undefined> => {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (!isRecord(value)) return { ok: false, error: "Page context must be an object." };
  if (unknownKeys(value, ["journey", "pageType", "topic", "title", "week", "month"])) {
    return { ok: false, error: "Page context has unsupported fields." };
  }
  const journey = optionalEnum(value.journey, CONTENT_JOURNEYS, "Page journey");
  if (journey.ok === false) return { ok: false, error: journey.error };
  const pageType = optionalEnum(value.pageType, PAGE_TYPES, "Page type");
  if (pageType.ok === false) return { ok: false, error: pageType.error };
  const topic = optionalText(value.topic, "Page topic");
  if (topic.ok === false) return { ok: false, error: topic.error };
  const title = optionalText(value.title, "Page title");
  if (title.ok === false) return { ok: false, error: title.error };
  const week = optionalInt(value.week, MIN_PREGNANCY_WEEK, MAX_PREGNANCY_WEEK, "Page week");
  if (week.ok === false) return { ok: false, error: week.error };
  const month = optionalInt(value.month, MIN_FIRST_YEAR_MONTH, MAX_FIRST_YEAR_MONTH, "Page month");
  if (month.ok === false) return { ok: false, error: month.error };

  const page: PageJourneyContextV1 = {
    ...(journey.value ? { journey: journey.value } : {}),
    ...(pageType.value ? { pageType: pageType.value } : {}),
    ...(topic.value ? { topic: topic.value } : {}),
    ...(title.value ? { title: title.value } : {}),
    ...(week.value !== undefined ? { week: week.value } : {}),
    ...(month.value !== undefined ? { month: month.value } : {}),
  };
  return { ok: true, value: Object.keys(page).length ? page : undefined };
};

const parseEntry = (value: unknown): Result<EntryJourneyContextV1 | undefined> => {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (!isRecord(value)) return { ok: false, error: "Entry context must be an object." };
  if (unknownKeys(value, ["journey", "stage", "topic", "title"])) {
    return { ok: false, error: "Entry context has unsupported fields." };
  }
  const journey = optionalEnum(value.journey, CONTENT_JOURNEYS, "Entry journey");
  if (journey.ok === false) return { ok: false, error: journey.error };
  const stage = optionalEnum(value.stage, ENTRY_STAGES, "Entry stage");
  if (stage.ok === false) return { ok: false, error: stage.error };
  const topic = optionalText(value.topic, "Entry topic");
  if (topic.ok === false) return { ok: false, error: topic.error };
  const title = optionalText(value.title, "Entry title");
  if (title.ok === false) return { ok: false, error: title.error };

  const entry: EntryJourneyContextV1 = {
    ...(journey.value ? { journey: journey.value } : {}),
    ...(stage.value ? { stage: stage.value } : {}),
    ...(topic.value ? { topic: topic.value } : {}),
    ...(title.value ? { title: title.value } : {}),
  };
  return { ok: true, value: Object.keys(entry).length ? entry : undefined };
};

/**
 * Strict, backwards-compatible validation. Absent context is always valid;
 * malformed context is rejected rather than silently repaired.
 */
export const parseJourneyContext = (
  value: unknown,
): Result<JourneyContextV1 | undefined> => {
  if (value === undefined || value === null) return { ok: true, value: undefined };
  if (!isRecord(value)) return { ok: false, error: "Journey context must be an object." };
  if (unknownKeys(value, ["version", "personal", "page", "entry"])) {
    return { ok: false, error: "Journey context has unsupported fields." };
  }
  if (value.version !== JOURNEY_CONTEXT_VERSION) {
    return { ok: false, error: "Journey context version is not supported." };
  }

  const personal = parsePersonal(value.personal);
  if (personal.ok === false) return { ok: false, error: personal.error };
  const page = parsePage(value.page);
  if (page.ok === false) return { ok: false, error: page.error };
  const entry = parseEntry(value.entry);
  if (entry.ok === false) return { ok: false, error: entry.error };

  if (!personal.value && !page.value && !entry.value) {
    // An empty envelope carries nothing: treat it as absent.
    return { ok: true, value: undefined };
  }

  return {
    ok: true,
    value: {
      version: JOURNEY_CONTEXT_VERSION,
      ...(personal.value ? { personal: personal.value } : {}),
      ...(page.value ? { page: page.value } : {}),
      ...(entry.value ? { entry: entry.value } : {}),
    },
  };
};
