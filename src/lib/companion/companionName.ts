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

/**
 * Subject at the start of a sentence: the chosen name, or the neutral
 * fallback with a capital. Never a hardcoded name.
 */
export function companionSentenceSubject(raw: string | null | undefined): string {
  return companionDisplayName(raw) ?? "Your companion";
}

/** Button, chip and kicker label: "Ask <name>" or "Ask your companion". */
export function companionAskLabel(raw: string | null | undefined): string {
  const name = companionDisplayName(raw);
  return name ? `Ask ${name}` : "Ask your companion";
}


/**
 * AI disclosure plus safety and privacy line shown in the panel.
 *
 * AIC-JA4 — the privacy clause must match what the product actually does. With
 * journal awareness switched off, the companion never reads a person's own
 * writing, and the line says so plainly. Once journal awareness is available,
 * that promise would be untrue, so the line instead states the two ways their
 * writing can be used: only with permission, or only when they pick an entry.
 */
export function companionSafetyLine(
  raw: string | null | undefined,
  journalAware = false,
): string {
  const name = companionDisplayName(raw);
  const subject = name ?? "Your companion";
  const privacy = journalAware
    ? "it only uses your own journal writing when you allow it or choose an entry to ask about"
    : "it does not read your private notes";
  return `${subject} is AI. It can share general guidance and help you find the right support, and ${privacy}. It does not replace your midwife, GP, health visitor or urgent care.`;
}

