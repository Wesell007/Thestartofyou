/**
 * Phase 29B — pure route-to-mode resolver for the site-wide companion.
 *
 * The site-wide companion may only select conversational modes. The
 * `first_year_day_recap` mode stays owned by the First Year Today recap flow
 * and is never returned from here.
 *
 * The route tells us which area of the site someone is reading. It is not a
 * statement of intent: the question they type always leads.
 */

import type { AiMode } from "../../../supabase/functions/_shared/aiModes";

export type CompanionMode = Extract<
  AiMode,
  "general" | "ttc_companion" | "pregnancy_week_companion" | "first_year_companion"
>;

type Rule = { prefix: string; mode: CompanionMode };

/** Longest matching prefix wins, so the order here is for readability only. */
const RULES: Rule[] = [
  { prefix: "/trying-to-conceive", mode: "ttc_companion" },
  { prefix: "/my-ttc-journey", mode: "ttc_companion" },
  { prefix: "/ovulation-calculator", mode: "ttc_companion" },
  { prefix: "/pregnancy", mode: "pregnancy_week_companion" },
  { prefix: "/pregnancy-toolkit", mode: "pregnancy_week_companion" },
  { prefix: "/my-week", mode: "pregnancy_week_companion" },
  { prefix: "/my-journey", mode: "pregnancy_week_companion" },
  { prefix: "/due-date-calculator", mode: "pregnancy_week_companion" },
  { prefix: "/due-date-results", mode: "pregnancy_week_companion" },
  { prefix: "/first-year", mode: "first_year_companion" },
  { prefix: "/my-first-year", mode: "first_year_companion" },
];

export const normaliseCompanionPath = (pathname: string): string => {
  const path = (pathname || "/").split("?")[0].split("#")[0];
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return trimmed.toLowerCase();
};

const matches = (path: string, prefix: string): boolean =>
  path === prefix || path.startsWith(`${prefix}/`);

/** Resolve the companion mode for a route. Unknown routes fall back to general. */
export function resolveCompanionMode(pathname: string): CompanionMode {
  const path = normaliseCompanionPath(pathname);
  let best: Rule | null = null;
  for (const rule of RULES) {
    if (!matches(path, rule.prefix)) continue;
    if (!best || rule.prefix.length > best.prefix.length) best = rule;
  }
  return best ? best.mode : "general";
}

/** Coarse route family label. Safe to include in AI context. */
export function companionRouteFamily(pathname: string): string {
  const mode = resolveCompanionMode(pathname);
  if (mode === "ttc_companion") return "trying to conceive";
  if (mode === "pregnancy_week_companion") return "pregnancy";
  if (mode === "first_year_companion") return "first year";
  return "general site";
}

/** Stage key used for the /ask handoff query string. Safe, non-identifying. */
export function companionAskStage(mode: CompanionMode): string | undefined {
  if (mode === "ttc_companion") return "ttc";
  if (mode === "pregnancy_week_companion") return "pregnancy";
  if (mode === "first_year_companion") return "first-year";
  return undefined;
}
