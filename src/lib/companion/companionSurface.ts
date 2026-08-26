/**
 * Phase 29B — where the floating companion launcher may appear.
 *
 * Hidden on the full Ask page (that page is the fallback surface itself), on
 * auth and setup flows, and on the not-found route.
 */

import { normaliseCompanionPath } from "./companionMode";

/**
 * Frontend kill switch. Set to false to remove the floating launcher and the
 * panel from every route in one edit. No backend flag, no analytics, no schema.
 */
export const COMPANION_ENABLED = true;

export const COMPANION_HIDDEN_PREFIXES = [
  "/ask",
  "/auth",
  "/setup",
  // Phase 29I — design prototypes are never allowed to imply a live companion
  // connection, so the launcher and panel stay off every /prototype route.
  "/prototype",
  "/not-found",
  "/404",
] as const;

/** True when the floating launcher should render on this route. */
export function shouldShowCompanionLauncher(pathname: string): boolean {
  if (!COMPANION_ENABLED) return false;
  const path = normaliseCompanionPath(pathname);
  return !COMPANION_HIDDEN_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
