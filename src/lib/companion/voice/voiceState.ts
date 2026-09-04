/**
 * AIC-7A — the pure companion voice state machine.
 *
 * Deterministic, provider-neutral, testable without a microphone. It only
 * describes where a voice session is; it never captures, sends or speaks.
 *
 * `ended` is terminal for a given session: a new voice session starts a new
 * controller state rather than resurrecting a finished one, so cleanup can
 * never be ambiguous about which session it belongs to.
 */

export type VoiceState =
  | "idle"
  | "requesting_permission"
  | "listening"
  | "thinking"
  | "speaking"
  | "interrupted"
  | "permission_denied"
  | "no_speech"
  | "network_error"
  | "speech_output_error"
  | "ended";

export const VOICE_STATES: readonly VoiceState[] = [
  "idle",
  "requesting_permission",
  "listening",
  "thinking",
  "speaking",
  "interrupted",
  "permission_denied",
  "no_speech",
  "network_error",
  "speech_output_error",
  "ended",
];

/** States that must never be entered except through an explicit legal path. */
export const PRIVILEGED_VOICE_STATES: readonly VoiceState[] = ["listening", "speaking"];

/**
 * The legal transition table. Anything absent is invalid and ignored.
 * Every non-terminal state may end, so a session can always be closed safely.
 */
export const VOICE_TRANSITIONS: Readonly<Record<VoiceState, readonly VoiceState[]>> = {
  idle: ["requesting_permission", "ended"],
  requesting_permission: ["listening", "permission_denied", "network_error", "ended"],
  listening: ["thinking", "no_speech", "network_error", "interrupted", "idle", "ended"],
  thinking: ["speaking", "interrupted", "network_error", "idle", "ended"],
  speaking: ["idle", "interrupted", "speech_output_error", "listening", "ended"],
  interrupted: ["idle", "listening", "ended"],
  permission_denied: ["idle", "requesting_permission", "ended"],
  no_speech: ["idle", "listening", "ended"],
  network_error: ["idle", "listening", "ended"],
  speech_output_error: ["idle", "listening", "ended"],
  ended: [],
};

export const canTransition = (from: VoiceState, to: VoiceState): boolean =>
  VOICE_TRANSITIONS[from].includes(to);

/**
 * Apply a transition. An illegal transition returns the current state
 * unchanged — ordinary UI races must not throw, and must never jump into a
 * privileged state such as `listening` or `speaking`.
 */
export const voiceTransition = (from: VoiceState, to: VoiceState): VoiceState =>
  canTransition(from, to) ? to : from;

export const isTerminalVoiceState = (state: VoiceState): boolean => state === "ended";
