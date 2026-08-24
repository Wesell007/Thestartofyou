/**
 * Phase 29B — starter chips for the site-wide companion.
 *
 * Short, calm and non-diagnostic. No certainty, pressure, outcome or
 * diagnostic wording.
 */

import type { CompanionMode } from "./companionMode";

const STARTERS: Record<CompanionMode, string[]> = {
  general: [
    "What can I find here?",
    "Help me choose where to start",
    "What should I read next?",
  ],
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

export function companionStarters(mode: CompanionMode): string[] {
  return STARTERS[mode] ?? STARTERS.general;
}
