/**
 * AIC-7A — the minimal provider seam.
 *
 * No provider has been selected. These interfaces exist only so the session
 * controller can be written and tested without one, and so provider work
 * later plugs in at exactly one place. Deliberately not a registry, plugin
 * framework or service locator, and no SDK, endpoint or credential schema.
 */

import type { FinalTranscript, PartialTranscript, SpeakableChunk } from "./voiceContracts";

export interface VoiceInputAdapter {
  /** Begin capture. AIC-7B implements a real one. */
  start(handlers: {
    onPartial?: (transcript: PartialTranscript) => void;
    onFinal?: (transcript: FinalTranscript) => void;
    onError?: (error: Error) => void;
  }): Promise<void> | void;
  /** Stop capture and release any microphone tracks. Must be idempotent. */
  stop(): Promise<void> | void;
}

export interface VoiceOutputAdapter {
  /** Speak one completed, canonicalised chunk. AIC-7D implements a real one. */
  speak(chunk: SpeakableChunk): Promise<void> | void;
  /** Stop playback immediately. Must be idempotent. */
  stop(): Promise<void> | void;
}

/** Default adapters: they do nothing. Voice is not implemented yet. */
export const noopVoiceInputAdapter = (): VoiceInputAdapter => ({
  start: () => undefined,
  stop: () => undefined,
});

export const noopVoiceOutputAdapter = (): VoiceOutputAdapter => ({
  speak: () => undefined,
  stop: () => undefined,
});
