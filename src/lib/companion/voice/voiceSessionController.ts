/**
 * AIC-7A — provider-neutral voice session controller.
 *
 * It owns the lifecycle of one voice session: state, cleanup and safe
 * termination. It does not capture audio, call a provider, speak, or send
 * anything to the companion. Resources are injected, so cleanup is fully
 * testable with fakes.
 *
 * Cleanup semantics: every stop is idempotent. Visibility-hidden, unmount and
 * an explicit end may all arrive; capture stops at most once, output stops at
 * most once, the active operation aborts at most once, and the session
 * converges on the terminal `ended` state without throwing or restarting.
 */

import { noopVoiceInputAdapter, noopVoiceOutputAdapter, type VoiceInputAdapter, type VoiceOutputAdapter } from "./voiceAdapters";
import { voiceTransition, type VoiceState } from "./voiceState";

export interface VoiceSessionControllerOptions {
  input?: VoiceInputAdapter;
  output?: VoiceOutputAdapter;
  /** Aborts any in-flight generation owned by this session. */
  abortActiveOperation?: () => void;
  onStateChange?: (state: VoiceState) => void;
}

export interface VoiceSessionController {
  getState(): VoiceState;
  start(): void;
  transition(to: VoiceState): VoiceState;
  abort(): void;
  stopCapture(): void;
  stopOutput(): void;
  end(): void;
  handleVisibilityHidden(): void;
  handleUnmount(): void;
}

export const createVoiceSessionController = (
  options: VoiceSessionControllerOptions = {},
): VoiceSessionController => {
  const input = options.input ?? noopVoiceInputAdapter();
  const output = options.output ?? noopVoiceOutputAdapter();

  let state: VoiceState = "idle";
  let captureStopped = false;
  let outputStopped = false;
  let aborted = false;
  let ended = false;

  const setState = (next: VoiceState) => {
    if (next === state) return state;
    state = next;
    options.onStateChange?.(state);
    return state;
  };

  const stopCapture = () => {
    if (captureStopped) return;
    captureStopped = true;
    void input.stop();
  };

  const stopOutput = () => {
    if (outputStopped) return;
    outputStopped = true;
    void output.stop();
  };

  const abort = () => {
    if (aborted) return;
    aborted = true;
    options.abortActiveOperation?.();
  };

  const end = () => {
    if (ended) return;
    ended = true;
    stopCapture();
    stopOutput();
    abort();
    // `ended` is terminal for this controller. A later voice session creates
    // a new controller rather than reviving this one.
    setState("ended");
  };

  return {
    getState: () => state,
    start: () => {
      if (ended) return;
      setState(voiceTransition(state, "requesting_permission"));
    },
    transition: (to) => {
      if (ended) return state;
      return setState(voiceTransition(state, to));
    },
    abort,
    stopCapture,
    stopOutput,
    end,
    handleVisibilityHidden: end,
    handleUnmount: end,
  };
};
