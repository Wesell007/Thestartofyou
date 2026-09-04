/**
 * AIC-7A — voice infrastructure contracts.
 *
 * No microphone permission, no provider, no audio. These tests prove the
 * release gate, the state machine, cleanup idempotence and the transcript /
 * canonical-text boundaries.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CLIENT_VOICE_FLAG,
  SERVER_VOICE_FLAG,
  isCompanionVoiceUiEnabled,
} from "@/lib/companion/voice/voiceFlags";
import {
  canonicaliseAssistantText,
  committedAssistantRecord,
  finalTranscript,
  isFinalTranscript,
  partialTranscript,
  toSpeakableChunk,
  type FinalTranscript,
} from "@/lib/companion/voice/voiceContracts";
import {
  PRIVILEGED_VOICE_STATES,
  VOICE_STATES,
  VOICE_TRANSITIONS,
  canTransition,
  isTerminalVoiceState,
  voiceTransition,
  type VoiceState,
} from "@/lib/companion/voice/voiceState";
import { createVoiceSessionController } from "@/lib/companion/voice/voiceSessionController";
import { noopVoiceInputAdapter, noopVoiceOutputAdapter } from "@/lib/companion/voice/voiceAdapters";

const setEnv = (value: unknown) => {
  vi.stubEnv("VITE_COMPANION_VOICE_ENABLED", value as string);
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("AIC-7A — client voice release gate", () => {
  it("is OFF when the flag is absent", () => {
    setEnv(undefined);
    expect(isCompanionVoiceUiEnabled()).toBe(false);
  });

  it("is OFF when the flag is false", () => {
    setEnv("false");
    expect(isCompanionVoiceUiEnabled()).toBe(false);
  });

  it("is OFF for any other value", () => {
    setEnv("1");
    expect(isCompanionVoiceUiEnabled()).toBe(false);
    setEnv("yes");
    expect(isCompanionVoiceUiEnabled()).toBe(false);
  });

  it("is ON only when explicitly true", () => {
    setEnv("true");
    expect(isCompanionVoiceUiEnabled()).toBe(true);
    setEnv("TRUE");
    expect(isCompanionVoiceUiEnabled()).toBe(true);
  });

  it("names the server gate without reading or enforcing it in the browser", () => {
    expect(SERVER_VOICE_FLAG).toBe("AI_COMPANION_VOICE_ENABLED");
    expect(CLIENT_VOICE_FLAG).toBe("VITE_COMPANION_VOICE_ENABLED");
  });

  it("is independent of the AMBER, memory and history gates", () => {
    vi.stubEnv("VITE_COMPANION_HISTORY_ENABLED", "true");
    vi.stubEnv("VITE_COMPANION_MEMORY_ENABLED", "true");
    vi.stubEnv("VITE_AI_AMBER_CLASSIFIER_ENABLED", "true");
    setEnv(undefined);
    expect(isCompanionVoiceUiEnabled()).toBe(false);

    setEnv("true");
    vi.stubEnv("VITE_COMPANION_HISTORY_ENABLED", "false");
    vi.stubEnv("VITE_COMPANION_MEMORY_ENABLED", "false");
    expect(isCompanionVoiceUiEnabled()).toBe(true);
  });
});

describe("AIC-7A — voice state machine", () => {
  it("declares exactly the approved states", () => {
    expect([...VOICE_STATES].sort()).toEqual(
      [
        "ended",
        "idle",
        "interrupted",
        "listening",
        "network_error",
        "no_speech",
        "permission_denied",
        "requesting_permission",
        "speaking",
        "speech_output_error",
      ].sort(),
    );
  });

  it("allows the ordinary happy path", () => {
    let state: VoiceState = "idle";
    state = voiceTransition(state, "requesting_permission");
    state = voiceTransition(state, "listening");
    state = voiceTransition(state, "thinking");
    state = voiceTransition(state, "speaking");
    state = voiceTransition(state, "idle");
    expect(state).toBe("idle");
  });

  it("returns the current state unchanged for an invalid transition", () => {
    expect(voiceTransition("idle", "speaking")).toBe("idle");
    expect(voiceTransition("permission_denied", "listening")).toBe("permission_denied");
    expect(voiceTransition("thinking", "listening")).toBe("thinking");
  });

  it("never lets a single invalid transition reach a privileged state", () => {
    for (const from of VOICE_STATES) {
      for (const privileged of PRIVILEGED_VOICE_STATES) {
        if (canTransition(from, privileged)) continue;
        expect(voiceTransition(from, privileged)).toBe(from);
      }
    }
  });

  it("treats ended as terminal", () => {
    expect(VOICE_TRANSITIONS.ended).toHaveLength(0);
    expect(isTerminalVoiceState("ended")).toBe(true);
    for (const to of VOICE_STATES) {
      expect(voiceTransition("ended", to)).toBe("ended");
    }
  });

  it("lets every non-terminal state end", () => {
    for (const from of VOICE_STATES) {
      if (from === "ended") continue;
      expect(canTransition(from, "ended")).toBe(true);
    }
  });
});

describe("AIC-7A — session controller lifecycle", () => {
  const harness = () => {
    const stopCapture = vi.fn();
    const stopOutput = vi.fn();
    const abortActiveOperation = vi.fn();
    const controller = createVoiceSessionController({
      input: { ...noopVoiceInputAdapter(), stop: stopCapture },
      output: { ...noopVoiceOutputAdapter(), stop: stopOutput },
      abortActiveOperation,
    });
    return { controller, stopCapture, stopOutput, abortActiveOperation };
  };

  it("starts idle and asks for permission first", () => {
    const { controller } = harness();
    expect(controller.getState()).toBe("idle");
    controller.start();
    expect(controller.getState()).toBe("requesting_permission");
  });

  it("ends in the safe terminal state and cleans up once", () => {
    const { controller, stopCapture, stopOutput, abortActiveOperation } = harness();
    controller.start();
    controller.transition("listening");
    controller.end();
    expect(controller.getState()).toBe("ended");
    expect(stopCapture).toHaveBeenCalledTimes(1);
    expect(stopOutput).toHaveBeenCalledTimes(1);
    expect(abortActiveOperation).toHaveBeenCalledTimes(1);
  });

  it("is idempotent across visibility, unmount and explicit end", () => {
    const { controller, stopCapture, stopOutput, abortActiveOperation } = harness();
    controller.start();
    controller.handleVisibilityHidden();
    controller.handleUnmount();
    controller.end();
    controller.end();
    expect(stopCapture).toHaveBeenCalledTimes(1);
    expect(stopOutput).toHaveBeenCalledTimes(1);
    expect(abortActiveOperation).toHaveBeenCalledTimes(1);
    expect(controller.getState()).toBe("ended");
  });

  it("keeps abort, stopCapture and stopOutput individually idempotent", () => {
    const { controller, stopCapture, stopOutput, abortActiveOperation } = harness();
    controller.abort();
    controller.abort();
    controller.stopCapture();
    controller.stopCapture();
    controller.stopOutput();
    controller.stopOutput();
    expect(abortActiveOperation).toHaveBeenCalledTimes(1);
    expect(stopCapture).toHaveBeenCalledTimes(1);
    expect(stopOutput).toHaveBeenCalledTimes(1);
  });

  it("cannot be restarted or moved after ending", () => {
    const { controller } = harness();
    controller.end();
    controller.start();
    controller.transition("listening");
    expect(controller.getState()).toBe("ended");
  });

  it("reports state changes without persisting anything", () => {
    const seen: VoiceState[] = [];
    const controller = createVoiceSessionController({ onStateChange: (s) => seen.push(s) });
    controller.start();
    controller.transition("listening");
    controller.end();
    expect(seen).toEqual(["requesting_permission", "listening", "ended"]);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });
});

describe("AIC-7A — transcript authority", () => {
  it("marks a partial transcript as display only", () => {
    const partial = partialTranscript("i think my");
    expect(partial.kind).toBe("partial");
    expect(isFinalTranscript(partial)).toBe(false);
  });

  it("marks a final transcript as the authoritative turn", () => {
    const final = finalTranscript("  is it normal to feel dizzy?  ");
    expect(final.kind).toBe("final");
    expect(final.text).toBe("is it normal to feel dizzy?");
    expect(isFinalTranscript(final)).toBe(true);
    const authoritative: FinalTranscript = final;
    expect(authoritative.text.length).toBeGreaterThan(0);
  });

  it("does not let a partial masquerade as a final at the API boundary", () => {
    const partial = partialTranscript("is it normal");
    // @ts-expect-error a PartialTranscript is not a FinalTranscript
    const wrong: FinalTranscript = partial;
    expect(wrong.kind).toBe("partial");
  });
});

describe("AIC-7A — canonical assistant text", () => {
  it("produces canonical text only through the display sanitisation boundary", () => {
    const canonical = canonicaliseAssistantText(
      "Based on the provided evidence, rest helps. Drinking water helps too.",
    );
    expect(String(canonical)).not.toMatch(/provided evidence/i);
    expect(String(canonical)).toMatch(/water/i);
  });

  it("offers no escape hatch from a raw string to canonical text", () => {
    const raw = "raw SSE delta";
    // @ts-expect-error raw strings are not canonical assistant text
    const canonical: CanonicalAssistantText = raw;
    expect(canonical).toBe(raw);
  });

  it("only makes canonicalised text speakable", () => {
    const canonical = canonicaliseAssistantText("Rest when you can.");
    expect(toSpeakableChunk(canonical)).toBe("Rest when you can.");
    expect(toSpeakableChunk(canonicaliseAssistantText("   "))).toBeNull();
  });

  it("has no direct raw-token path into a speakable chunk", () => {
    // @ts-expect-error a raw string cannot be spoken without canonicalisation
    const attempt = toSpeakableChunk("half a sentenc");
    expect(typeof attempt).toBe("string");
  });
});

describe("AIC-7A — committed assistant record", () => {
  it("stores only surfaced canonical content", () => {
    const record = committedAssistantRecord(
      "msg-1",
      canonicaliseAssistantText("Rest when you can."),
      true,
    );
    expect(Object.keys(record).sort()).toEqual(["canonicalText", "interrupted", "messageId"]);
    expect(record).not.toHaveProperty("fullGeneratedAnswer");
    expect(record).not.toHaveProperty("unsurfacedTail");
    expect(record).not.toHaveProperty("hiddenCompletion");
    expect(record).not.toHaveProperty("remainingModelText");
  });
});
