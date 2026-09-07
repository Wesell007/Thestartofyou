/**
 * AIC-JA2 — client feature gate.
 *
 * `VITE_COMPANION_JOURNAL_ENABLED` decides only whether the journal permission
 * UI is exposed. It is NOT the authoritative switch: the server holds that in
 * `AI_JOURNAL_CONTEXT_ENABLED`, which decides whether any journal text can
 * ever reach the model. The two are configured independently, and production
 * enablement is the deliberate act of turning both on after legal and privacy
 * approval.
 */
export const isCompanionJournalUiEnabled = (): boolean =>
  String(import.meta.env.VITE_COMPANION_JOURNAL_ENABLED ?? "").toLowerCase() === "true";
