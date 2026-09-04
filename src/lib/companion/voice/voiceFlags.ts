/**
 * AIC-7A — client release gate for companion voice.
 *
 * `VITE_COMPANION_VOICE_ENABLED` controls whether the voice *experience*
 * (future microphone entry point, voice runtime, spoken answers) is offered
 * in the browser at all. It defaults OFF.
 *
 * CLIENT VOICE FLAG SECURITY AUTHORITY = NONE.
 *
 * Anyone can flip a browser flag. It therefore grants no privileged
 * capability of any kind: no provider session, no credential, no server
 * permission. The authority for privileged voice capability is the
 * server-side `AI_COMPANION_VOICE_ENABLED` gate, documented in
 * `SERVER_VOICE_FLAG` below. No privileged server voice capability exists
 * yet, so there is nothing to enforce at runtime today.
 *
 * This gate is deliberately independent of every other release gate
 * (AMBER classifier, permissioned memory, persistent history, grounding
 * routing). Voice can ship, or stay off, without touching any AIC-5 gate.
 */

/** The server-side gate name. Reserved and documented; not read here. */
export const SERVER_VOICE_FLAG = "AI_COMPANION_VOICE_ENABLED" as const;

/** The client-side gate name. */
export const CLIENT_VOICE_FLAG = "VITE_COMPANION_VOICE_ENABLED" as const;

/**
 * True only when the client voice experience is explicitly switched on.
 * Absent, empty or any non-"true" value means OFF.
 */
export const isCompanionVoiceUiEnabled = (): boolean =>
  String(import.meta.env.VITE_COMPANION_VOICE_ENABLED ?? "").toLowerCase() === "true";
