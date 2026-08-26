/**
 * Phase 29F — the safe pregnancy context contract.
 *
 * This module is the single place that decides what a pregnancy AI call is
 * allowed to know. It is pure: no Supabase reads, no localStorage reads, no
 * network, no side effects, no browser APIs beyond string handling.
 *
 * Allowed fields, and nothing else:
 *   journey, weekNumber, trimester, pageFamily, pageTopic, toneHint,
 *   contextSource
 *
 * Deliberately excluded, permanently: exact due date, date of last period,
 * any date at all, first or companion or baby or partner names, emails, user
 * IDs, pregnancy IDs, child IDs, journal text, notes, reflections, symptoms,
 * uploaded photos, videos, voice notes, private logs, appointment details,
 * medical history and any other free-text user record.
 *
 * The person's actual question is sent separately as the prompt. It must never
 * be copied into `pageTopic`, which is a short public page label only
 * ("baby movements", "hospital bag", "week detail").
 *
 * Safeguard: the builder never spreads, stringifies, serialises or forwards
 * the raw input object. It picks the approved fields explicitly at runtime, so
 * an unknown property cannot reach the model even if the type is bypassed.
 */

import { trimesterLabel, COMPANION_CONTEXT_MAX_LENGTH } from "@/lib/companionContext";

/** Shared cap, re-exported so the ceiling stays defined in one place. */
export const PREGNANCY_CONTEXT_MAX_LENGTH = COMPANION_CONTEXT_MAX_LENGTH;

export type PregnancyPageFamily =
  | "my-week"
  | "week-detail"
  | "journey"
  | "toolkit"
  | "due-date"
  | "pregnancy-guidance"
  | "ask";

export type PregnancyToneHint = "calm" | "practical" | "reassuring";

export type PregnancyContextSource = "route" | "savedJourney" | "page";

/** The complete set of fields a pregnancy AI call may carry. No index signature. */
export interface PregnancyAiContext {
  journey: "pregnancy";
  weekNumber?: number;
  trimester?: string;
  pageFamily?: PregnancyPageFamily;
  pageTopic?: string;
  toneHint?: PregnancyToneHint;
  contextSource?: PregnancyContextSource;
}

export interface PregnancyAiContextInput {
  weekNumber?: number | null;
  pageFamily?: PregnancyPageFamily | null;
  /** Short public page label only. Never user text. */
  pageTopic?: string | null;
  toneHint?: PregnancyToneHint | null;
  contextSource?: PregnancyContextSource | null;
}

const PAGE_FAMILIES: readonly PregnancyPageFamily[] = [
  "my-week",
  "week-detail",
  "journey",
  "toolkit",
  "due-date",
  "pregnancy-guidance",
  "ask",
];

const TONE_HINTS: readonly PregnancyToneHint[] = ["calm", "practical", "reassuring"];

const CONTEXT_SOURCES: readonly PregnancyContextSource[] = [
  "route",
  "savedJourney",
  "page",
];

const PAGE_FAMILY_LABEL: Record<PregnancyPageFamily, string> = {
  "my-week": "My Week",
  "week-detail": "a pregnancy week guide",
  journey: "their pregnancy journey",
  toolkit: "the pregnancy toolkit",
  "due-date": "the due date tools",
  "pregnancy-guidance": "pregnancy guidance",
  ask: "the Ask page",
};

const TONE_SENTENCE: Record<PregnancyToneHint, string> = {
  calm: "Tone: calm and steady.",
  practical: "Tone: clear and practical.",
  reassuring: "Tone: warm and reassuring.",
};

/** Public page label only: single line, plain characters, short. Digits stripped
 * so a date, year or identifier can never survive as a "topic". */
const cleanTopic = (value: string): string =>
  value
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z ,'&-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60)
    .trim();

const safeWeek = (value: unknown): number | undefined => {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 42) return 42;
  return rounded;
};

const normalisePath = (pathname: string): string => {
  const path = (pathname || "/").split("?")[0].split("#")[0];
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return trimmed.toLowerCase();
};

/** Pure route mapper. Returns undefined for anything that is not a pregnancy route. */
export function resolvePregnancyPageFamily(
  pathname: string,
): PregnancyPageFamily | undefined {
  const path = normalisePath(pathname);
  if (path === "/ask" || path.startsWith("/ask/")) return "ask";
  if (path === "/my-week" || path.startsWith("/my-week/")) return "my-week";
  if (path === "/my-journey" || path.startsWith("/my-journey/")) return "journey";
  if (path === "/pregnancy-toolkit" || path.startsWith("/pregnancy-toolkit/"))
    return "toolkit";
  if (path.startsWith("/pregnancy/week/")) return "week-detail";
  if (path === "/due-date-calculator" || path === "/due-date-results")
    return "due-date";
  if (path === "/pregnancy" || path.startsWith("/pregnancy/"))
    return "pregnancy-guidance";
  return undefined;
}

/** Pull a week number out of the routes that already carry one publicly. */
export function resolvePregnancyRouteWeek(pathname: string): number | undefined {
  const path = normalisePath(pathname);
  const match =
    path.match(/^\/my-week\/(\d{1,2})$/) ??
    path.match(/^\/pregnancy\/week\/(\d{1,2})$/);
  if (!match) return undefined;
  return safeWeek(Number(match[1]));
}

/**
 * Build the allowlisted context object. Fields are picked one at a time and
 * validated; the input object is never spread, stringified or forwarded.
 */
export function pickPregnancyAiContext(
  input: PregnancyAiContextInput | null | undefined,
): PregnancyAiContext {
  const context: PregnancyAiContext = { journey: "pregnancy" };
  if (!input || typeof input !== "object") return context;

  const week = safeWeek(input.weekNumber ?? undefined);
  if (week !== undefined) {
    context.weekNumber = week;
    context.trimester = trimesterLabel(week);
  }

  const family = input.pageFamily;
  if (typeof family === "string" && PAGE_FAMILIES.includes(family)) {
    context.pageFamily = family;
  }

  if (typeof input.pageTopic === "string") {
    const topic = cleanTopic(input.pageTopic);
    if (topic) context.pageTopic = topic;
  }

  const tone = input.toneHint;
  if (typeof tone === "string" && TONE_HINTS.includes(tone)) {
    context.toneHint = tone;
  }

  const source = input.contextSource;
  if (typeof source === "string" && CONTEXT_SOURCES.includes(source)) {
    context.contextSource = source;
  }

  return context;
}

/** Render the allowlisted context object as the bounded context string. */
export function renderPregnancyAiContext(context: PregnancyAiContext): string {
  const parts: string[] = ["Journey: pregnancy."];

  if (context.weekNumber !== undefined) {
    parts.push(
      context.trimester
        ? `Current stage: week ${context.weekNumber}, ${context.trimester}.`
        : `Current stage: week ${context.weekNumber}.`,
    );
  }

  if (context.pageFamily) {
    parts.push(`Surface: ${PAGE_FAMILY_LABEL[context.pageFamily]}.`);
  }

  if (context.pageTopic) parts.push(`Page topic: ${context.pageTopic}.`);
  if (context.toneHint) parts.push(TONE_SENTENCE[context.toneHint]);

  parts.push("Answer the question that was asked; the page is background only.");

  const rendered = parts.join(" ");
  return rendered.length > PREGNANCY_CONTEXT_MAX_LENGTH
    ? rendered.slice(0, PREGNANCY_CONTEXT_MAX_LENGTH).trimEnd()
    : rendered;
}

/** Convenience: pick the approved fields, then render them. */
export function buildPregnancyAiContext(
  input?: PregnancyAiContextInput | null,
): string {
  return renderPregnancyAiContext(pickPregnancyAiContext(input));
}

/** Map the saved companion tone onto the allowlisted tone hint. */
export function pregnancyToneHint(
  tone: string | null | undefined,
): PregnancyToneHint | undefined {
  if (tone === "practical") return "practical";
  if (tone === "warm") return "reassuring";
  if (tone === "calm") return "calm";
  return undefined;
}
