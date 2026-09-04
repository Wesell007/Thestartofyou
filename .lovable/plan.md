# AIC-6 — Voice UX & Architecture Gate

Architecture only. No production voice code, no database changes, no prompt changes, no flag changes. Deliverables are documentation plus the completion report.

## What the audit already shows

- Companion voice functionality today: **none**. No voice mode, no TTS, no STT, no realtime transport, no audio dependency in `package.json`, no WebSocket/WebRTC/AudioContext use anywhere in the companion.
- Audio code that does exist is unrelated to the companion and stays untouched:
  - `src/components/myweek/SlotVoiceMemory.tsx` — journal voice notes via `MediaRecorder` + `getUserMedia` (production).
  - `src/components/myweek/SlotReflection.tsx` and `SlotReflectionAssistant.tsx` — optional browser dictation via `SpeechRecognition`/`webkitSpeechRecognition` (production).
  - `src/lib/weekMedia.ts` / `src/hooks/useWeekMedia.ts` — journal media capture and storage helpers; explicitly "no transcription, no AI".
- Companion runtime is already single-brain and shared: both surfaces (panel and `/ask`) run `useCompanionConversation` → `useAISearch` → `ai-search`, with SSE streaming, `AbortController` cancellation, session-only transcript in `sessionStorage`, and server-owned `X-Conversation-Id` / boundary headers.
- Flag convention exists and is two-sided: `VITE_*` client gate plus a server-authoritative edge secret (as with history and memory).

## Decisions this gate will record

- **Voice is a transport and interaction mode, not a brain.** Every spoken assistant answer is a rendering of text produced by `ai-search`, after the AIC-5 safety path.
- **Primary architecture: Option B** — streaming speech-to-text → finalised transcript → existing `ai-search` → streamed answer text → sentence-chunked text-to-speech. Option D (realtime transport with server safety orchestration) is recorded as a later upgrade; Option C (speech-to-speech as the brain) is rejected as a response brain because it cannot guarantee AIC-5 mediation before speech.
- **Interaction model: Option B tap-to-enter session** — one explicit tap enters voice mode, then listen → end-of-turn → transcript → safety/AI → speak → listen, until the user ends it. No wake word, no background listening, microphone tracks stopped on exit, tab hide, navigation or panel close.
- **Barge-in v1: manual** (tap to interrupt) — stops audio immediately and aborts the in-flight response stream; automatic voice-activity barge-in deferred.
- **Only a finalised transcript is an authoritative request.** Partial transcript is display-only. Transcript correction: auto-send with easy correction afterwards, plus a visible transcript at all times.
- **One conversation.** Spoken turns become ordinary visible user messages in the same thread with the same conversation ID semantics; no voice-only hidden turns, no second history, no voice-specific memory, grounding or journey context.
- **RED/CRISIS** speak the canonical deterministic text verbatim and always keep it visible; TTS failure never suppresses safety text; a deterministic, tested, presentation-only pronunciation layer (999, A&E, NHS 111, URLs) is recommended for AIC-7 and not built here.
- **No voice biometrics, no prosody or emotion-from-tone.** AIC-5E continues to read explicit user-authored language only.
- **Audio is ephemeral**: memory/stream only, no app persistence, no uploads. External-provider retention, DPA, residency and training policy become AIC-7 release gates.
- **Provider secrets never in the browser**; any direct provider session would need a server-issued ephemeral credential from a new edge function (designed, not built).
- Feature gate: `VITE_COMPANION_VOICE_ENABLED` + server `AI_COMPANION_VOICE_ENABLED`, independent of every AIC-5 flag.

## Files this gate touches

- Create `docs/ai/companion-voice-architecture.md` — UX objective, interaction model, state machine, options A–D assessment and choice, safety mediation, text/voice continuity, audio lifecycle, provider boundaries, failure and retry behaviour, interruption, accessibility, device matrix, latency and cost model, privacy/legal gates, proposed ADRs, AIC-7 slices (7A infrastructure/flag, 7B mic+STT, 7C shared-conversation integration, 7D streaming TTS, 7E turn-taking and interruption, 7F safety/failure validation, 7G device QA and release gate).
- Append a short voice-transport section to `docs/ai/companion-architecture.md`.
- Add six PROPOSED ADRs under `docs/ai/adr/` (voice is transport; text is canonical; no audio before safety; audio ephemeral; one shared conversation; no master provider secret in the browser).
- Record the AIC-6 gate state in `roadmap.md`.
- Production source changed: 0. Tests changed: 0. Migrations: 0. AMBER, grounding, memory, history flags unchanged.

## Output

The 96-point completion report, then stop. AIC-7 is not started.
