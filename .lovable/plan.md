# AIC-7A — Voice Infrastructure & Release Foundation

Infrastructure only, behind two OFF gates. No microphone capture, no speech output, no provider selection, no visible UI, no backend changes.

## What gets built

**1. Two-sided release gate**
- `src/lib/companion/voice/voiceFlags.ts` — `isCompanionVoiceUiEnabled()` reading `VITE_COMPANION_VOICE_ENABLED`, default OFF, documented as having no security authority (mirrors the existing `conversationFlags.ts` pattern).
- Server flag `AI_COMPANION_VOICE_ENABLED` is documented as the sole authority for privileged voice capability. No server code is added in this slice because no provider exists to bootstrap.
- Both gates are independent of AMBER, memory, history and grounding flags.

**2. Voice runtime contracts** (`src/lib/companion/voice/voiceContracts.ts`)
- `PartialTranscript` (display-only) vs `FinalTranscript` (authoritative, the only shape allowed to reach the shared send path) — distinguished by type so a partial can never be passed where a final is required.
- `CanonicalAssistantText` branded type: only producible from the existing `sanitiseAnswerForDisplay` output, so raw SSE text cannot be typed as speakable.
- `SpeakableChunk`: a completed, canonicalised chunk. Raw SSE token → TTS is structurally impossible.
- `CommittedAssistantRecord`: only surfaced canonical text; no field exists for an unsurfaced tail.

**3. Provider adapter seam** (`src/lib/companion/voice/voiceAdapters.ts`)
- Minimal `VoiceInputAdapter` and `VoiceOutputAdapter` interfaces plus no-op default implementations used for tests. No SDK, no plugin registry, no service locator, no provider endpoints or credential schemas.

**4. State machine** (`src/lib/companion/voice/voiceState.ts`)
- Pure reducer over `idle, requesting_permission, listening, thinking, speaking, interrupted, permission_denied, no_speech, network_error, speech_output_error, ended`. Invalid transitions are ignored and return the current state unchanged (documented contract). Fully testable without a provider.

**5. Session controller** (`src/lib/companion/voice/voiceSessionController.ts`)
- Plain class/factory over injected resources: `start`, `end`, `transition`, `abort`, `stopOutput`, `stopCapture`, `handleVisibilityHidden`, `handleUnmount`. Cleanup is idempotent, runs exactly once, always lands in a safe terminal state. Tested with fakes; no real media streams.
- Holds runtime state only — nothing written to database, conversation metadata, memory, or localStorage.

**6. Integration seam (documented, not implemented)**
- Confirmed seam: a final transcript will be passed to the existing `send(question)` of `useCompanionConversation`. No `sendVoiceMessage`, no duplicated conversation logic. Documented only; AIC-7C implements it.

## Tests

New `src/test/companionVoiceInfrastructure.test.ts(x)` covering: client flag OFF → no voice capability; flag independence from AMBER/memory/history; valid and invalid transitions; end returns safe state; cleanup once and idempotent; abort idempotent; visibility/unmount contract; partial cannot be authoritative; final can; committed record has no hidden tail; no persistence, no analytics, no DB write, no secret exposure. No microphone permission required.

## Explicitly not done

Microphone/STT, TTS, turn-taking, interruption integration, UI controls, `/voice` route, provider selection or dependencies, voice bootstrap endpoint (recorded as `VOICE BOOTSTRAP ENDPOINT = DEFERRED TO PROVIDER SELECTION`), prompt changes, AIC-5 changes, `ai-search` changes, migrations, deployment.

## Documentation

- `docs/ai/companion-voice-architecture.md` — add the AIC-7A implemented boundary; correct the terminology to "no assistant audio before safety routing resolves".
- `roadmap.md` — record exact state.
- ADRs: accept only what this slice proves (candidates: 01 voice-is-transport, 05 one-conversation, 06 no-browser-master-secret). 02, 03, 04 stay PROPOSED pending functional validation. Exact statuses reported.

## Validation

`npm test` (baseline 89 files / 1036 tests, no weakened assertions), cache-defeated `npm run typecheck` twice, `deno check` on `ai-search`, `npm run lint` (baseline only), `npm run build`. Then the 64-point completion report. Stop before AIC-7B; stop and report if provider-specific work becomes necessary.
