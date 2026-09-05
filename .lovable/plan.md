# AIC-7B — Provider Selection & Streaming STT Architecture Gate

Documentation only. No provider integration, no dependency, no credential, no bootstrap endpoint, no microphone, no STT, no TTS, no `send()` integration, no UI, no routes, no prompt or AIC-5 changes, no migrations, no analytics, no deployment, no build.

I need build mode to write these files. This plan is unchanged in substance from the approved card; approving it releases the documentation work.

## Decisions to record

- **Selected provider: AssemblyAI — Streaming Speech-to-Text only.** The managed AssemblyAI Voice Agent API is REJECTED as the response brain; `ai-search` is the intelligence authority and the AIC-5 stack the safety authority. No provider voice-agent brain may bypass `ai-search`.
- **Exact model/config: BENCHMARK-GATED.** Universal-Streaming, Universal-3.5 Pro Realtime, Medical Mode OFF/ON, and bounded keyterm prompting must be measured on our own synthetic corpus against the models actually available at build time. Nothing written as though Universal-Streaming is the permanent production model.
- **Primary transport: A — direct browser → provider Streaming WebSocket** with a short-lived server-issued token. Server audio relay not selected (latency, bandwidth, edge-runtime fit, audio-handling responsibility) and moves no safety decision, since AIC-5 acts on the final transcript.
- **Runner-up Speechmatics, third Deepgram.**
- Every "not selected" is phrased as *not selected for the approved Start of You direct-browser streaming architecture and our requirements* — never as an absolute judgement on the provider.

## Files to write

**1. `docs/ai/companion-voice-provider-review.md` (new)**
- Comparison date 4–5 September 2026, stated as a snapshot; all time-sensitive facts tied to official source, date and the exact product/model; explicitly not permanent or contractual; re-verification required at build time.
- Eight providers reviewed; per-provider non-selection rationale phrased against our requirements (Google transport/client model, ElevenLabs unresolved retention/schema evidence, OpenAI residency and vocabulary, AWS credentialing and medical-model regional availability, Azure domain fit and SDK capture ownership).
- Full 30-dimension comparison for AssemblyAI / Speechmatics / Deepgram; official source list.
- Pricing per exact configuration: Universal-Streaming $0.15/hr, Universal-3.5 Pro Realtime $0.45/hr, Medical Mode add-on $0.15/hr, Pro + Medical $0.60/hr labelled **DERIVED FROM CURRENT DOCUMENTED COMPONENT PRICES**, Universal-Streaming + Medical Mode left UNKNOWN pending current pricing at build time. Session-based billing (idle connection charged) recorded as a lifecycle constraint.
- Temporary token contract: `GET /v3/token`, `expires_in_seconds` 1–600, server-minted, query-parameter auth; no invented scope or revocation properties.
- EU host `wss://streaming.eu.assemblyai.com/v3/ws`, with EU endpoint / model / Medical Mode feature compatibility marked MUST BE RECONFIRMED DURING BUILD.
- Retention kept conditional: streaming ZDR depends on account/data-control configuration and the model-training opt-out; free/test behaviour does not establish production posture; billing/logging metadata may persist; async artifact TTL kept separate.
- Safety-critical transcription section stating NO STT PROVIDER ELIMINATES MIS-TRANSCRIPTION RISK, listing the hazards (negation, severity, medications, dosages, weeks, dates, temperature, blood pressure, 999 / NHS 111 / A&E), with mitigation by UX and benchmarks and an explicit ban on tuning AIC-5.
- Confidence metadata as development diagnostics only, never deciding GREEN/AMBER/RED/CRISIS, severity, diagnosis or safety.
- Privacy/legal release gate checklist and the UNKNOWN / REQUIRES VALIDATION register.

**2. `docs/ai/companion-voice-architecture.md` (update — AIC-7B section)**
- Provider selected at provider level; model benchmark-gated; Voice Agent API rejected as response brain.
- Bootstrap flow: browser voice bootstrap request → server checks `AI_COMPANION_VOICE_ENABLED` → server holds master credential → server mints temporary streaming token → browser receives only the token → browser connects directly. Client flag security authority NONE; server flag authoritative for bootstrap/token issuance; master provider secret in browser 0. No endpoint built.
- EU-pinned transport as the production requirement rather than default edge routing.
- Transcript mapping: `Turn end_of_turn:false` → `PartialTranscript` (display only; never `send()`, never `ai-search`, never AIC-5); `Turn end_of_turn:true` → `FinalTranscript` (authoritative, future AIC-7C input); `ForceEndpoint` → future manual **Done**, which stays mandatory regardless of provider endpointing.
- Capture architecture: `getUserMedia` + Web Audio / AudioWorklet-style PCM pipeline, PCM16 mono 16 kHz, binary WebSocket frames; explicitly not coupled to the journal MediaRecorder/WebM architecture; real-device verification mandatory across iOS Safari, Android Chrome, desktop Chrome/Safari/Edge covering permission, capture, AudioWorklet behaviour, WebSocket lifecycle, tab/background behaviour, token bootstrap, partial/final events, manual endpoint and cleanup — support never claimed from API availability alone.
- Keyterm prompting bounded and optional: domain vocabulary only; permissioned memory, full conversation history, personal medical profile and emotional state are forbidden inputs; it must not become another context or memory channel.
- Audio lifecycle: durable application raw-audio storage 0, Supabase raw-audio storage 0, voice audio archive 0; capture → transient in-memory processing → active provider stream → discard; no hidden replay, no journal-storage coupling, no persistent microphone buffers.
- Failure and reconnect: no automatic microphone-audio retry; at most one automatic session reconnect may be considered; captured speech never silently replayed; if the turn is lost, ask the user to repeat or switch to text.
- Mandatory build benchmark and metrics: WER, critical-term error rate, negation error rate, medical/entity accuracy, number accuracy, date/week accuracy, first-partial latency, final-transcript latency, endpointing delay, partial stability, bootstrap latency, connection failure rate, Medical Mode effect, keyterm effect, cost per configuration — development metrics only, no production voice analytics; synthetic UK corpus only, no real user audio, ground-truth transcripts recorded.
- Provider adapter mapping through `VoiceInputAdapter` so no provider event shape leaks into conversation logic.

**3. `roadmap.md` (update)** — AIC-7B provider gate closed on AssemblyAI; primary transport direct browser with temporary credential; exact model benchmark-gated; production privacy approval gated; build not started; proposed next slice (transport, microphone permission, capture, server bootstrap, `VoiceInputAdapter`, partial/final, transcript-only development UI, cleanup/lifecycle, benchmark harness) with explicit NO `send()`, NO ai-search conversation integration, NO TTS.

**4. ADRs** — ADR-AIC6-01 through 06 all remain PROPOSED. ADR-AIC6-06 recorded as EVIDENCE STRENGTHENED but NOT ACCEPTED until token bootstrap and browser integration prove master provider secret in browser = 0.

## Frozen state to reconfirm

`VITE_COMPANION_VOICE_ENABLED` OFF; `AI_COMPANION_VOICE_ENABLED` OFF/reserved; `AI_AMBER_CLASSIFIER_ENABLED` OFF with production AMBER release GATED; grounding `30B-source-routing-v1` / 0 candidates / 0 approvals / []; memory OFF; persistent history OFF; microphone capture, STT, TTS, provider dependency, provider credentials, bootstrap endpoint, conversation integration, voice persistence, raw-audio persistence, voice analytics, DB changes and production source changes all 0.

## Validation

`npm test` (expect 90 files / 1062 tests, all pass, 0 timeouts), `npm run typecheck` PASS, `npm run lint` known baseline only, `npm run build` PASS. No provider or voice deployment. Then the 95-point provider-gate report, and stop — the build is not started.
