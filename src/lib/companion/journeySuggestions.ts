/**
 * AIC-J3 — the canonical source of PERSONAL JOURNEY STARTERS.
 *
 * Scope is strictly the three personal lifecycles: trying to conceive,
 * pregnancy and first year.
 *
 *   - PERSONAL starters can only be produced from an authoritative
 *     `JourneyContextV1.personal` object. There is deliberately no
 *     `startersFor("pregnancy")` shortcut, so a mode, route, hub, page, topic
 *     or entry string can never obtain personal starters.
 *   - CONTENT / MODE starters are a separate, clearly labelled concept that
 *     happens to live in the same module so the copy exists once. They
 *     describe what a person is reading, never who they are.
 *   - This module never classifies safety (GREEN/AMBER/RED/CRISIS), never
 *     decides urgency and never states what is medically normal. A selected
 *     chip is simply the visible question the person asked, sent through the
 *     ordinary send() → useAISearch → ai-search → AIC-5 path.
 *   - It holds no personal data, no dates, no identifiers and no free user
 *     text. Pure data plus a pure function: same input, same output.
 */

import type {
  EntryJourneyContextV1,
  PageJourneyContextV1,
  PersonalJourneyContextV1,
  Trimester,
  TtcStage,
} from "../../../supabase/functions/_shared/journeyContextContract";
import type { CompanionMode } from "./companionMode";
import { trimesterFromWeek } from "@/lib/pregnancyWeek";

/** Where the chips are being rendered. */
export type SuggestionSurface = "companion" | "ask" | "hub";

/** Maximum chips shown anywhere. Mobile stays uncluttered. */
export const MAX_SUGGESTIONS = 4;

/** Neutral fallback: no personal journey and no content family. */
export const GENERAL_STARTERS: readonly string[] = [
  "What can I find here?",
  "Help me choose where to start",
  "What should I read next?",
];

/* -------------------------------------------------- personal: journey level */

const PERSONAL_TTC_STARTERS: readonly string[] = [
  "What can I focus on this cycle?",
  "How can I understand my cycle better?",
  "How can I make the waiting feel easier?",
  "When is it worth asking for support?",
];

const PERSONAL_PREGNANCY_STARTERS: readonly string[] = [
  "What changes might I notice around now?",
  "What could be useful to prepare for?",
  "What might be worth asking my midwife?",
  "How can I look after myself just now?",
];

const PERSONAL_FIRST_YEAR_STARTERS: readonly string[] = [
  "What tends to matter around this age?",
  "How can I support sleep just now?",
  "What can help with feeding?",
  "When is it worth asking for help?",
];

/* --------------------------------------------------- personal: TTC stages */

const TTC_STAGE_STARTERS: Record<TtcStage, readonly string[]> = {
  preparing_to_try: [
    "What could help us prepare before we start?",
    "How can I understand my cycle better?",
    "What might be worth asking my GP first?",
    "How do we decide when to start trying?",
  ],
  trying_naturally: [
    "What can I focus on this cycle?",
    "How does the fertile window work?",
    "How can I make the waiting feel easier?",
    "When is it worth asking for support?",
  ],
  considering_help: [
    "What happens if we ask for help?",
    "What might my GP ask about?",
    "What checks are sometimes offered?",
    "How can we decide together what's next?",
  ],
  in_treatment: [
    "What might be useful to ask my clinic?",
    "How can I look after myself during treatment?",
    "How can I cope with the waiting?",
    "What support is there for us right now?",
  ],
};

/* ---------------------------------------------- personal: pregnancy stages */

const PREGNANCY_TRIMESTER_STARTERS: Record<Trimester, readonly string[]> = {
  first: [
    "What changes might I notice in early pregnancy?",
    "What could help with tiredness or sickness?",
    "What happens at my first appointments?",
    "What might be worth asking my midwife?",
  ],
  second: [
    "What changes might I notice this trimester?",
    "Which appointments and scans come next?",
    "How can I rest more comfortably?",
    "What could be useful to prepare now?",
  ],
  third: [
    "What might I notice as birth gets closer?",
    "How can I prepare for labour?",
    "What could I pack in my hospital bag?",
    "What might be worth asking my midwife?",
  ],
};

/* --------------------------------------------- personal: first year bands */

/**
 * Non-overlapping age bands. Every supported `ageMonths` (0-11) matches
 * exactly one band. Month 12 is outside the personal contract and is not
 * introduced here.
 */
export const FIRST_YEAR_BANDS = [
  { from: 0, to: 2 },
  { from: 3, to: 5 },
  { from: 6, to: 8 },
  { from: 9, to: 11 },
] as const;

const FIRST_YEAR_BAND_STARTERS: readonly (readonly string[])[] = [
  [
    "What tends to matter in the early weeks?",
    "How can I support feeding just now?",
    "What can help with sleep at this age?",
    "How can I look after myself too?",
  ],
  [
    "What might change around this age?",
    "How can I help my baby settle?",
    "What kind of play suits this age?",
    "When is it worth asking for help?",
  ],
  [
    "What tends to matter around this age?",
    "How do I start offering solid food?",
    "What can help with naps just now?",
    "What play ideas suit this age?",
  ],
  [
    "What might I notice around this age?",
    "How can I support moving and exploring?",
    "What can help with meals at this age?",
    "How can I prepare for the first birthday?",
  ],
];

/** Band index for a supported month, or null when the month is unusable. */
export const firstYearBandIndex = (ageMonths: number | undefined): number | null => {
  if (typeof ageMonths !== "number" || !Number.isInteger(ageMonths)) return null;
  const index = FIRST_YEAR_BANDS.findIndex(
    (band) => ageMonths >= band.from && ageMonths <= band.to,
  );
  return index === -1 ? null : index;
};

/* ------------------------------------------------- content / mode starters */

/**
 * CONTENT-level chips for a route family. These describe the area of the site
 * someone is reading and are explicitly NOT a claim about their saved journey.
 * `companionStarters(mode)` delegates here so this copy exists exactly once.
 */
const CONTENT_MODE_STARTERS: Record<CompanionMode, readonly string[]> = {
  general: GENERAL_STARTERS,
  ttc_companion: [
    "What can help today?",
    "How can I wait without overthinking?",
    "When might testing make sense?",
  ],
  pregnancy_week_companion: [
    "What might matter this week?",
    "What can help me prepare?",
    "When is it worth asking my midwife?",
  ],
  first_year_companion: [
    "What can help today?",
    "How can I support sleep?",
    "When is it worth asking for help?",
  ],
};

const take = (chips: readonly string[]): string[] => [...chips].slice(0, MAX_SUGGESTIONS);

/** Content/mode chips. Never personal journey starters. */
export function contentModeStarters(mode: CompanionMode): string[] {
  return take(CONTENT_MODE_STARTERS[mode] ?? GENERAL_STARTERS);
}

/* ------------------------------------------------------ personal resolution */

/**
 * Stage-aware starters for authoritative personal context, falling back to
 * journey level whenever the bounded stage field is absent or unusable.
 *
 * Only reachable with a real personal object, by design.
 */
function personalStarters(personal: PersonalJourneyContextV1): string[] {
  if (personal.journey === "trying-to-conceive") {
    // `ivfInTreatment` is authoritative TTC context: a bounded refinement, not
    // a fourth lifecycle and not a new stage. A saved `ttcStage` always wins,
    // so a contradictory pair can never be silently reconciled here.
    const stage: TtcStage | undefined =
      personal.ttcStage ?? (personal.ivfInTreatment ? "in_treatment" : undefined);
    return stage ? take(TTC_STAGE_STARTERS[stage]) : take(PERSONAL_TTC_STARTERS);
  }

  if (personal.journey === "pregnancy") {
    // Trimester is preferred; a known week reuses the one canonical
    // week → trimester helper rather than a second derivation.
    const trimester: Trimester | undefined =
      personal.trimester ??
      (typeof personal.week === "number" ? trimesterFromWeek(personal.week) : undefined);
    return trimester
      ? take(PREGNANCY_TRIMESTER_STARTERS[trimester])
      : take(PERSONAL_PREGNANCY_STARTERS);
  }

  const band = firstYearBandIndex(personal.ageMonths);
  return band === null
    ? take(PERSONAL_FIRST_YEAR_STARTERS)
    : take(FIRST_YEAR_BAND_STARTERS[band]);
}

export interface ResolveJourneySuggestionsInput {
  /** Authoritative saved journey state. The ONLY personal starter trigger. */
  personal?: PersonalJourneyContextV1 | null;
  /** Where the person pressed Ask from. Content provenance, never identity. */
  entry?: EntryJourneyContextV1 | null;
  /**
   * What the person is reading. Accepted so callers can pass the whole
   * JourneyContextV1 shape without reshaping it, and deliberately NEVER
   * consulted: page context cannot create, refine or overwrite a personal
   * journey. Documented rather than dropped so the omission stays explicit.
   */
  page?: PageJourneyContextV1 | null;
  surface: SuggestionSurface;
}

/**
 * Deterministic PERSONAL starter chips for a surface.
 *
 * Precedence:
 *   ask       — an explicit content entry (a topic was pressed) means the
 *               surface's own content-specific prompts lead, so no personal
 *               starters are returned;
 *   companion — personal (stage-aware when known) → general;
 *   hub       — hubs are content surfaces: they only get personal starters
 *               when authoritative personal context is actually supplied.
 */
export function resolveJourneySuggestions({
  personal,
  entry,
  surface,
}: ResolveJourneySuggestionsInput): string[] {
  if (surface === "ask" && entry?.topic) return [];
  if (!personal) return take(GENERAL_STARTERS);
  return personalStarters(personal);
}
