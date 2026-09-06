/**
 * Phase 29B — starter chips for the site-wide companion.
 *
 * AIC-J3: this file is now a thin compatibility delegate. It carries no copy
 * of its own; the strings live once in `journeySuggestions.ts`.
 *
 * Classification: CONTENT / MODE STARTER BEHAVIOUR. A companion mode reflects
 * the area of the site someone is reading, not their saved journey, so these
 * chips are never personal journey starters. Personal starters come only from
 * `resolveJourneySuggestions` with an authoritative `JourneyContextV1.personal`
 * object.
 */

import type { CompanionMode } from "./companionMode";
import { contentModeStarters } from "./journeySuggestions";

export function companionStarters(mode: CompanionMode): string[] {
  return contentModeStarters(mode);
}
