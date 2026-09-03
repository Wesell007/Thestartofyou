/**
 * AIC-3 — client feature gate.
 *
 * `VITE_COMPANION_MEMORY_ENABLED` controls whether memory UX is exposed at
 * all: the account settings section and the conversational capture flow.
 *
 * It is NOT the authoritative kill switch. The server holds that in
 * `AI_MEMORY_ENABLED`, which decides whether stored memories can reach the
 * model. The two are configured independently and can disagree; production
 * enablement is the deliberate act of turning both on.
 */
export const isCompanionMemoryUiEnabled = (): boolean =>
  String(import.meta.env.VITE_COMPANION_MEMORY_ENABLED ?? "").toLowerCase() === "true";
