# AIC-7B BUILD — Streaming STT (transcript-only slice)

Build the first working voice-input path: explicit tap → microphone permission → PCM16 capture → AssemblyAI streaming WebSocket (EU) → visible partial and final transcript. It stops there. A final transcript never becomes a companion message in this slice.

## Scope boundary

- No `send()`, no `useAISearch`, no `ai-search` call, no assistant response, no TTS, no persistence, no analytics, no prompt or AIC-5 change.
- Voice stays a mode of the existing companion composer. No `/voice` route, no third surface.
- Both production flags stay OFF. With `VITE_COMPANION_VOICE_ENABLED` off, the companion is byte-for-byte unchanged: no mic control, no bootstrap request, no permission prompt.

## Server bootstrap

New edge function `supabase/functions/voice-bootstrap/index.ts`:

- Repository CORS conventions, `POST` + `OPTIONS` only, empty/minimal JSON body; malformed bodies rejected 400.
- `AI_COMPANION_VOICE_ENABLED` is the security authority: when not enabled, refuse before any provider call (403), and never touch the AssemblyAI endpoint.
- `ASSEMBLYAI_API_KEY` stored as an edge secret only, never returned, never logged, never in any `VITE_*`.
- Separate voice-bootstrap rate-limit bucket reusing the existing `consume_ai_rate_limit` primitive with a distinct key so STT bootstrap never spends the answer quota. Existing anonymous/authenticated posture preserved.
- Mints a short-lived AssemblyAI temporary streaming token (shortest practical lifetime, value + rationale documented). Response carries only the token, its expiry, and the EU WebSocket host. No audio, no transcript, no journey/memory/history data in either direction.
- No audio relay of any kind.

## Client provider adapter

`src/lib/companion/voice/providers/assemblyai/` — a `VoiceInputAdapter` implementation plus a thin socket/frame module:

- `getUserMedia` only after explicit user action; Web Audio/AudioWorklet path producing PCM16 mono 16 kHz binary frames. No MediaRecorder, no journal audio coupling, no DSP beyond resampling.
- Provider `Turn` events mapped at the adapter boundary: `end_of_turn:false` → `PartialTranscript`, `end_of_turn:true` → `FinalTranscript`, provider errors → neutral adapter errors, session events → neutral status. No provider payload escapes the adapter.
- Manual **Done** uses the provider's endpoint-finalisation message and waits for the authoritative final turn; it never fabricates final text from a partial.
- Automatic endpointing left at documented defaults (AIC-7E owns calibration).
- Development/benchmark default model, clearly named as such; EU host pinned with no silent region fallback.
- At most one reconnect; never replays audio; a lost turn asks the person to repeat.

## Session lifecycle and UI

- Reuse the AIC-7A `VoiceSessionController` as the only lifecycle authority; extend minimally (permission, capture start, finalising) without a second state machine. `speaking` is never entered.
- Capture stops and resources release on explicit end, cancel, panel close, unmount, visibility hidden and provider fatal failure — idempotently.
- Composer gains a mic entry control behind the client flag: listening state, live partial, final transcript, Done, cancel, retry, back to text, concise permission/error copy. No waveform polish.
- Zero raw-audio persistence anywhere (no storage, DB, localStorage, sessionStorage, IndexedDB).

## Benchmark harness (development only)

- Dev-only harness plus ground-truth corpus manifest and fixture contract covering UK conversational English, pregnancy/TTC/postpartum/first-year terms, medications, dosages, gestational weeks, dates, temperature, blood pressure, 999/NHS 111/A&E, negation, severity, pauses, self-corrections, noise.
- Compares base vs Medical Mode vs bounded static keyterms; no memory/history/journey/personal data ever feeds keyterms.
- Synthetic/developer audio only. If fixtures are unavailable, the harness ships with the manifest and the report says BENCHMARK EXECUTION BLOCKED ON AUDIO FIXTURES. Results are never faked; the exact model stays benchmark-gated unless evidence closes it.

## Tests

Focused suites, no skips, no timeout or worker changes:

- Bootstrap: flag OFF denies and never calls the provider; flag ON returns the credential path; master secret absent from every payload; malformed request rejected; rate-limit contract; token not persisted or logged.
- Adapter: mocked provider events for partial/final/error mapping, no `Turn` leakage.
- Capture: mocked `getUserMedia`/tracks/socket — permission only after user action, tracks stop once on cleanup, no permission request with the flag OFF.
- Boundary: partial and final transcripts cause zero `send()`, zero `ai-search` calls, zero DB writes; visibility hidden and provider failure stop capture; no replay.
- Client flag OFF renders no voice UI.

## Validation and reporting

`npm test` (default config, arithmetic reconciled from 90 files / 1062 tests), `npm run typecheck` twice with a cleared incremental cache, `deno check` on both `ai-search` and the new bootstrap function, `npm run lint` (known baseline only), `npm run build`.

Before coding, re-verify the current AssemblyAI streaming docs (token endpoint and lifetime, WebSocket URL and query params, EU host, model ids, Turn/ForceEndpoint schema, PCM requirements, Medical Mode and keyterm params). Minor syntax updates are applied and documented; a material contract change stops the build with a report.

Docs updated: `docs/ai/companion-voice-architecture.md` (actual implementation), `docs/ai/companion-voice-provider-review.md` (re-verification findings only), `roadmap.md`. ADR statuses: AIC6-04 and AIC6-06 may gain implementation evidence but stay PROPOSED unless clearly earned; AIC6-01/02/03/05 remain PROPOSED. AMBER OFF, grounding `30B-source-routing-v1` / 0 / 0 / [], memory and persistent history OFF, production voice unavailable.

Closes with the 95-point completion report. AIC-7C is not started.

## Needed from you

An AssemblyAI API key to store as a server-side secret. Without it the code and tests land, but the live EU socket, device matrix and any benchmark execution stay blocked and will be reported as such.
