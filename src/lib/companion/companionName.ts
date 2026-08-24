/**
 * Phase 29B — neutral companion naming for the site-wide shell.
 *
 * A companion name is only shown when the person chose it themselves. When
 * nothing is set, the shell uses neutral copy. No default name literal is
 * introduced here.
 */

export const COMPANION_NEUTRAL_SUBJECT = "your companion";
export const COMPANION_NEUTRAL_TITLE = "Ask about this";

/** The chosen name, or null when nothing usable was set. */
export function companionDisplayName(raw: string | null | undefined): string | null {
  const trimmed = (raw ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Panel heading: the chosen name when present, otherwise neutral copy. */
export function companionPanelTitle(raw: string | null | undefined): string {
  const name = companionDisplayName(raw);
  return name ? `Ask ${name}` : COMPANION_NEUTRAL_TITLE;
}

/** Launcher accessible label. */
export function companionLauncherLabel(raw: string | null | undefined): string {
  const name = companionDisplayName(raw);
  return name ? `Ask ${name}` : "Ask your companion";
}

/** Subject used inside sentences. */
export function companionSubject(raw: string | null | undefined): string {
  return companionDisplayName(raw) ?? COMPANION_NEUTRAL_SUBJECT;
}

/** AI disclosure plus safety and privacy line shown in the panel. */
export function companionSafetyLine(raw: string | null | undefined): string {
  const name = companionDisplayName(raw);
  const subject = name ?? "Your companion";
  return `${subject} is AI. It can share general guidance and help you find the right support, and it does not read your private notes. It does not replace your midwife, GP, health visitor or urgent care.`;
}
