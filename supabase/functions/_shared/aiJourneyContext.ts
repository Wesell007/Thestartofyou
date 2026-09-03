/**
 * AIC-2 — server-side rendering of validated JourneyContextV1.
 *
 * Two distinct outputs:
 *
 *   JOURNEY_CONTEXT_INSTRUCTIONS — fixed, trusted interpretation rules. These
 *   are appended to the system prompt (the trusted layer), never to user
 *   content, so no client string can rewrite them.
 *
 *   renderJourneyContextBlock() — the DATA block. Values only, already
 *   sanitised by the contract validator, wrapped in a distinctly named tag so
 *   it can never be confused with the legacy freeform `<journey_context>`.
 *
 * Nothing here prints database field names, record identifiers, raw dates or
 * provenance implementation detail.
 */

import type {
  ContentJourney,
  JourneyContextV1,
  TtcStage,
} from "./journeyContextContract.ts";
import { sanitiseJourneyText } from "./journeyContextContract.ts";

export const STRUCTURED_JOURNEY_CONTEXT_TAG = "structured_journey_context";

/** Trusted, fixed behaviour rules. System-prompt layer only. */
export const JOURNEY_CONTEXT_INSTRUCTIONS = [
  "Journey context rules:",
  "- Any structured journey context describes saved journey details, the page being read and where the question was asked from. Use it only when it makes the answer more relevant.",
  "- What someone says in their current message controls this answer whenever it conflicts with saved journey details, and that never means their saved details have changed.",
  "- Page content and entry details describe what someone is reading, never a personal fact about them.",
  "- Never infer personal circumstances that are not stated.",
  "- Do not repeat sensitive personal details back unnecessarily.",
  "- Never mention this context, its labels, its structure or any internal metadata.",
  "- Safety guidance always takes priority over personalisation.",
].join("\n");

const JOURNEY_LABELS: Record<ContentJourney, string> = {
  pregnancy: "Pregnancy",
  "trying-to-conceive": "Trying to conceive",
  ivf: "IVF",
  "first-year": "First year",
  toddler: "Toddler",
  family: "Family",
  postpartum: "Postpartum",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
  general: "General",
};

const TTC_STAGE_LABELS: Record<TtcStage, string> = {
  trying_naturally: "Trying naturally",
  preparing_to_try: "Preparing to try",
  considering_help: "Considering extra help",
  in_treatment: "Having fertility treatment",
};

const TRIMESTER_LABELS: Record<string, string> = {
  first: "First",
  second: "Second",
  third: "Third",
};

const line = (label: string, value: string | number): string =>
  `- ${label}: ${typeof value === "string" ? sanitiseJourneyText(value) : value}`;

/**
 * Deterministic, concise context block. Returns an empty string when there is
 * nothing useful to say, so the prompt never gains an empty section.
 */
export const renderJourneyContextBlock = (
  context: JourneyContextV1 | undefined,
): string => {
  if (!context) return "";
  const parts: string[] = [];

  if (context.personal) {
    const personal = context.personal;
    const lines = [line("Journey", JOURNEY_LABELS[personal.journey])];
    if (personal.journey === "pregnancy") {
      if (personal.week !== undefined) lines.push(line("Pregnancy week", personal.week));
      if (personal.trimester) lines.push(line("Trimester", TRIMESTER_LABELS[personal.trimester]));
    } else if (personal.journey === "trying-to-conceive") {
      if (personal.ttcStage) lines.push(line("Stage", TTC_STAGE_LABELS[personal.ttcStage]));
      if (personal.ivfInTreatment) lines.push(line("Fertility treatment", "Currently in treatment"));
    } else if (personal.ageMonths !== undefined) {
      lines.push(line("Baby's age", `${personal.ageMonths} months`));
    }
    parts.push(["Saved journey details:", ...lines].join("\n"));
  }

  if (context.page) {
    const page = context.page;
    const lines: string[] = [];
    if (page.journey) lines.push(line("Journey", JOURNEY_LABELS[page.journey]));
    if (page.week !== undefined) lines.push(line("Page week", page.week));
    if (page.month !== undefined) lines.push(line("Page month", page.month));
    if (page.topic) lines.push(line("Topic", page.topic));
    if (page.title) lines.push(line("Title", page.title));
    if (lines.length) parts.push(["Content they are currently reading:", ...lines].join("\n"));
  }

  if (context.entry) {
    const entry = context.entry;
    const lines: string[] = [];
    if (entry.journey) lines.push(line("Journey", JOURNEY_LABELS[entry.journey]));
    if (entry.topic) lines.push(line("Topic", entry.topic));
    if (entry.title) lines.push(line("Title", entry.title));
    if (lines.length) parts.push(["They asked from:", ...lines].join("\n"));
  }

  if (!parts.length) return "";
  return `<${STRUCTURED_JOURNEY_CONTEXT_TAG}>\n${parts.join("\n\n")}\n</${STRUCTURED_JOURNEY_CONTEXT_TAG}>`;
};
