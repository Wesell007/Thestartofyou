/**
 * Phase 29B — allowlist-only context builder for the site-wide companion panel.
 *
 * Everything here is derived from the route and from coarse, already-public
 * page facts. Nothing is read from journals, notes, logs, media or database
 * rows, so private text cannot reach the AI request by construction.
 *
 * Deliberately excluded: names, emails, user IDs, child IDs, pregnancy IDs,
 * reflection or note text, journal or memory content, media URLs, exact
 * private dates and chat history.
 */

import type { CompanionMode } from "./companionMode";
import { companionRouteFamily } from "./companionMode";
import type { CompanionTone } from "@/lib/companion";

/** Matches the existing shared cap used by the other context builders. */
export const COMPANION_PANEL_CONTEXT_MAX_LENGTH = 500;

export interface CompanionPanelContextInput {
  /** Resolved companion mode. */
  mode: CompanionMode;
  /** Current route path, used only for its coarse family label. */
  pathname: string;
  /**
   * Coarse, non-identifying stage label where a safe helper already provides
   * one (for example "second trimester" or "around three to six months old").
   */
  stageLabel?: string | null;
  /** Public page topic or article title. Never private text. */
  pageTopic?: string | null;
  /** Short hint about what the person is reading. */
  pageHint?: string | null;
  /** Saved companion tone, if the person set one. */
  tone?: CompanionTone | null;
}

const MODE_HINT: Record<CompanionMode, string> = {
  general: "The person is browsing general guidance on the site.",
  ttc_companion: "The person is reading trying to conceive guidance.",
  pregnancy_week_companion: "The person is reading pregnancy guidance.",
  first_year_companion: "The person is reading first year guidance.",
};

const toneHint = (tone: CompanionTone): string => {
  if (tone === "practical") return "Prefers clear, practical wording.";
  if (tone === "warm") return "Prefers warm, gentle wording.";
  return "Prefers calm, steady wording.";
};

/** Keep short, single-line, plain values only. */
const clean = (value: string): string =>
  value.replace(/\s+/g, " ").trim().slice(0, 90);

export function buildCompanionPanelContext({
  mode,
  pathname,
  stageLabel,
  pageTopic,
  pageHint,
  tone,
}: CompanionPanelContextInput): string {
  const parts: string[] = [`Journey area: ${companionRouteFamily(pathname)}.`];

  const stage = stageLabel ? clean(stageLabel) : "";
  if (stage) parts.push(`Stage: ${stage}.`);

  const topic = pageTopic ? clean(pageTopic) : "";
  if (topic) parts.push(`Page topic: ${topic}.`);

  if (tone) parts.push(toneHint(tone));

  const hint = pageHint ? clean(pageHint) : "";
  parts.push(hint || MODE_HINT[mode]);

  parts.push("Answer the question that was asked; the page is background only.");

  const context = parts.join(" ");
  return context.length > COMPANION_PANEL_CONTEXT_MAX_LENGTH
    ? context.slice(0, COMPANION_PANEL_CONTEXT_MAX_LENGTH).trimEnd()
    : context;
}
