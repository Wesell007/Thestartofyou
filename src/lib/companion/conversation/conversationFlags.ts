/**
 * AIC-4 — client release gate for persistent conversation history.
 *
 * `VITE_COMPANION_HISTORY_ENABLED` controls whether the persistent-history
 * *experience* exists at all: the persistent request mode, the conversation
 * history affordance and the "delete conversation" action.
 *
 * It is NOT the authority. The server holds that in
 * `AI_CONVERSATION_HISTORY_ENABLED`, which decides whether anything is ever
 * written to, or read from, the database. The two are configured
 * independently and can disagree.
 *
 * Because the server also requires an explicit persistent-mode request, a
 * server flag left on while this one is off cannot silently store
 * conversations behind a disabled UI.
 *
 * Both default OFF. Session continuity does not depend on either flag.
 */
export const isCompanionHistoryUiEnabled = (): boolean =>
  String(import.meta.env.VITE_COMPANION_HISTORY_ENABLED ?? "").toLowerCase() === "true";
