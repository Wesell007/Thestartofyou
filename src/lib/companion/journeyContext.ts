/**
 * AIC-2 — pure client-side construction of JourneyContextV1.
 *
 * No React, no Supabase, no network. The contract itself lives in the shared
 * runtime-neutral module so the edge function validates exactly the same
 * shape.
 *
 * Hard rule enforced structurally here: `page` and `entry` inputs can never
 * reach `personal`. The builder takes personal context as a separate argument
 * that only the authoritative personal source can supply.
 */

import {
  JOURNEY_CONTEXT_VERSION,
  sanitiseJourneyText,
  type ContentJourney,
  type EntryJourneyContextV1,
  type EntryStage,
  type JourneyContextV1,
  type PageJourneyContextV1,
  type PageType,
  type PersonalJourneyContextV1,
} from "../../../supabase/functions/_shared/journeyContextContract";
import { normaliseCompanionPath } from "./companionMode";
import { MAX_PREGNANCY_WEEK, MIN_PREGNANCY_WEEK } from "@/lib/pregnancyWeek";

export type {
  ContentJourney,
  EntryJourneyContextV1,
  JourneyContextV1,
  PageJourneyContextV1,
  PersonalJourneyContextV1,
};

/** Route prefix → content journey. Longest match wins. */
const CONTENT_ROUTES: Array<{ prefix: string; journey: ContentJourney; pageType?: PageType }> = [
  { prefix: "/trying-to-conceive", journey: "trying-to-conceive" },
  { prefix: "/my-ttc-journey", journey: "trying-to-conceive", pageType: "journey" },
  { prefix: "/ovulation-calculator", journey: "trying-to-conceive", pageType: "tool" },
  { prefix: "/ivf", journey: "ivf" },
  { prefix: "/pregnancy", journey: "pregnancy" },
  { prefix: "/pregnancy-toolkit", journey: "pregnancy", pageType: "tool" },
  { prefix: "/my-week", journey: "pregnancy", pageType: "journey" },
  { prefix: "/my-journey", journey: "pregnancy", pageType: "journey" },
  { prefix: "/due-date-calculator", journey: "pregnancy", pageType: "tool" },
  { prefix: "/due-date-results", journey: "pregnancy", pageType: "tool" },
  { prefix: "/preparing-for-baby", journey: "preparing-for-baby" },
  { prefix: "/first-year", journey: "first-year" },
  { prefix: "/my-first-year", journey: "first-year", pageType: "journey" },
  { prefix: "/postpartum", journey: "postpartum" },
  { prefix: "/toddler", journey: "toddler" },
  { prefix: "/family", journey: "family" },
  { prefix: "/support", journey: "support" },
];

const matches = (path: string, prefix: string): boolean =>
  path === prefix || path.startsWith(`${prefix}/`);

const routeWeek = (path: string): number | undefined => {
  const match = path.match(/\/pregnancy\/week\/(\d{1,2})(?:\/|$)/) ?? path.match(/\/my-week\/(\d{1,2})(?:\/|$)/);
  if (!match) return undefined;
  const week = Number(match[1]);
  return Number.isInteger(week) && week >= MIN_PREGNANCY_WEEK && week <= MAX_PREGNANCY_WEEK
    ? week
    : undefined;
};

const routePageType = (path: string): PageType | undefined => {
  if (/\/week\/\d/.test(path)) return "week";
  if (/\/month\/\d/.test(path)) return "month";
  if (path.startsWith("/articles/")) return "article";
  return undefined;
};

export interface PageContextInput {
  pathname: string;
  /** Public page topic. Never private text. */
  topic?: string | null;
  /** Public page or article title. Never private text. */
  title?: string | null;
}

/**
 * Build page context from the current route. This describes CONTENT only and
 * can never become a personal fact.
 */
export function buildPageContext({
  pathname,
  topic,
  title,
}: PageContextInput): PageJourneyContextV1 | undefined {
  const path = normaliseCompanionPath(pathname);
  let best: { prefix: string; journey: ContentJourney; pageType?: PageType } | null = null;
  for (const rule of CONTENT_ROUTES) {
    if (!matches(path, rule.prefix)) continue;
    if (!best || rule.prefix.length > best.prefix.length) best = rule;
  }

  const week = routeWeek(path);
  const pageType = routePageType(path) ?? best?.pageType;
  const cleanTopic = topic ? sanitiseJourneyText(topic) : "";
  const cleanTitle = title ? sanitiseJourneyText(title) : "";

  const page: PageJourneyContextV1 = {
    ...(best ? { journey: best.journey } : {}),
    ...(pageType ? { pageType } : {}),
    ...(cleanTopic ? { topic: cleanTopic } : {}),
    ...(cleanTitle ? { title: cleanTitle } : {}),
    ...(week !== undefined ? { week } : {}),
  };
  return Object.keys(page).length ? page : undefined;
}

const ENTRY_STAGE_JOURNEYS: Partial<Record<EntryStage, ContentJourney>> = {
  ttc: "trying-to-conceive",
  pregnancy: "pregnancy",
  "first-year": "first-year",
  toddler: "toddler",
  family: "family",
  support: "support",
  recovery: "postpartum",
  postpartum: "postpartum",
  preparing: "preparing-for-baby",
  ivf: "ivf",
};

const isEntryStage = (value: string | null | undefined): value is EntryStage =>
  !!value && value in ENTRY_STAGE_JOURNEYS;

export interface EntryContextInput {
  /** `?stage=` written by `askDestination`. */
  stage?: string | null;
  /** `?journey=` written by `askDestination`. */
  journey?: string | null;
  /** `?topic=` written by `askDestination`. */
  topic?: string | null;
  /** Optional semantic title carried in router state by `navigateToAsk`. */
  title?: string | null;
}

/**
 * Build entry context for `/ask` from the authoritative query parameters and
 * router state that already exist. Describes where the question came from,
 * never who the person is.
 */
export function buildEntryContext({
  stage,
  journey,
  topic,
  title,
}: EntryContextInput): EntryJourneyContextV1 | undefined {
  const stageKey = stage?.trim().toLowerCase();
  const entryStage = isEntryStage(stageKey) ? stageKey : undefined;
  const journeyKey = journey?.trim().toLowerCase();
  const entryJourney: ContentJourney | undefined =
    journeyKey === "ivf" ? "ivf" : entryStage ? ENTRY_STAGE_JOURNEYS[entryStage] : undefined;

  const cleanTopic = topic ? sanitiseJourneyText(topic) : "";
  const cleanTitle = title ? sanitiseJourneyText(title) : "";

  const entry: EntryJourneyContextV1 = {
    ...(entryJourney ? { journey: entryJourney } : {}),
    ...(entryStage ? { stage: entryStage } : {}),
    ...(cleanTopic ? { topic: cleanTopic } : {}),
    ...(cleanTitle ? { title: cleanTitle } : {}),
  };
  return Object.keys(entry).length ? entry : undefined;
}

/**
 * Combine the three provenance layers. Returns `undefined` when nothing
 * useful exists, so no empty envelope is ever sent.
 */
export function buildJourneyContext({
  personal,
  page,
  entry,
}: {
  personal?: PersonalJourneyContextV1 | null;
  page?: PageJourneyContextV1 | null;
  entry?: EntryJourneyContextV1 | null;
}): JourneyContextV1 | undefined {
  if (!personal && !page && !entry) return undefined;
  return {
    version: JOURNEY_CONTEXT_VERSION,
    ...(personal ? { personal } : {}),
    ...(page ? { page } : {}),
    ...(entry ? { entry } : {}),
  };
}
