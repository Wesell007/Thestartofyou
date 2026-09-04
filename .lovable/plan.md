# AIC-7B — Provider Selection & Streaming STT Architecture Gate

Documentation only. No provider integration, no dependency, no credential, no microphone, no STT, no TTS, no build, no production runtime changes.

## Decisions being recorded

- **Selected provider: AssemblyAI — Streaming Speech-to-Text only.** The managed AssemblyAI Voice Agent API (STT + LLM + TTS) is explicitly rejected: `ai-search` and AIC-5 remain the sole response and safety authority.
- **Exact speech model: BENCHMARK-GATED.** Universal-Streaming vs Universal-3.5 Pro Realtime is not locked; the price gap must be justified by measured accuracy on our own corpus.
- **Primary transport: A — direct browser to provider Streaming WebSocket** using a short-lived, server-issued token. Server audio relay rejected (adds latency, bandwidth and audio-handling responsibility with no safety gain, since AIC-5 acts on the final transcript, never on audio).
- **Runner-up: Speechmatics** (UK company, EU realtime endpoint, medical domain model), lost on enterprise-gated browser temporary keys, undocumented retention/training posture, and slower `max_delay` finalisation. Deepgram third.
- Comparison date 4–5 September 2026, eight providers reviewed. Google eliminated on gRPC-only transport; ElevenLabs on default retention with enterprise-only ZDR; OpenAI Realtime on residency and vocabulary; AWS and Azure on domain fit and credential/SDK weight.

## Files to write

**1. `docs/ai/companion-voice-provider-review.md` (new)**
- All eight providers, elimination reasons, 30-dimension shortlist comparison table (AssemblyAI / Speechmatics / Deepgram), source list, comparison date.
- Pricing recorded per model: Universal-Streaming $0.15/hr, Universal-3.5 Pro Realtime $0.45/hr, Medical Mode add-on $0.15/hr, Pro + Medical $0.60/hr combined; Universal-Streaming + Medical Mode to be derived from current official pricing at build time. Session-based billing including idle connection time noted as a lifecycle constraint.
- Temporary token contract recorded as KNOWN: `GET /v3/token`, `expires_in_seconds` 1–600, server-minted, passed as a query parameter; no invented scope or revocation properties.
- EU-pinned endpoint `wss://streaming.eu.assemblyai.com/v3/ws`, to be re-confirmed for the selected model and Medical Mode at build time.
- Retention stated conditionally: zero data retention for streaming **is conditional on the model-training opt-out**, with billing/logging metadata retained regardless. Free tier cannot opt out, so free/test behaviour does not establish production posture. Async artifact TTL kept explicitly separate from streaming ZDR.
- Privacy/legal release gate checklist (DPA, EU/UK scope, training opt-out CONFIRMED, streaming ZDR CONFIRMED on contracted tier, metadata scope, subprocessors, deletion, security posture, tier terms).
- UNKNOWN / REQUIRES VALIDATION register (iOS Safari vendor statements, UK-accent performance, real-device latency, household-noise accuracy, behaviour on our corpus, combined Universal-Streaming + Medical rate, EU-endpoint feature availability, contractual terms, subprocessors, ISO 27001, numeric VAD thresholds, en-GB number/date formatting).
- Explicit statement that no provider eliminates transcription risk; negation and severity errors are input-quality risks handled by UX, never by tuning AIC-5.

**2. `docs/ai/companion-voice-architecture.md` (update — new AIC-7B section)**
- Provider selected at provider level; model benchmark-gated; Voice Agent API rejected as response brain.
- Bootstrap flow: browser requests voice bootstrap → server checks `AI_COMPANION_VOICE_ENABLED` → server holds the master key → server mints a short-lived streaming token → browser receives only the token → browser connects directly. Client flag security authority NONE; master key in browser 0.
- EU streaming endpoint as the production requirement, not default edge routing.
- Transcript protocol mapping: `Turn end_of_turn:false` → `PartialTranscript` (display only, never `send(question)`, never `ai-search`, never AIC-5); `Turn end_of_turn:true` → `FinalTranscript` (authoritative, AIC-7C input); client `ForceEndpoint` → future manual **Done**, which remains mandatory regardless of provider endpointing.
- Audio transport: PCM16 mono 16 kHz over binary WebSocket frames; capture via `getUserMedia` + Web Audio / AudioWorklet-style PCM pipeline, explicitly not MediaRecorder/WebM reuse from journal; platform verification required across iOS Safari, Android Chrome, desktop Chrome/Safari/Edge before locking capture.
- Provider confidence is diagnostics only — never decides GREEN/AMBER/RED/CRISIS, severity, or user safety.
- Keyterm prompting bounded: domain vocabulary only, no personal medical information, no memory, no conversation history injection.
- Audio lifecycle: durable application raw-audio storage 0, Supabase audio storage 0, voice audio archive 0; capture → transient processing → active WebSocket → discard; no replay, no journal storage coupling.
- Failure and reconnect behaviour: no automatic microphone-audio retry, at most one automatic session reconnect, never silently replay captured speech, no hidden buffering; fallback is "try voice again" or switch to text.
- Mandatory AIC-7B BUILD benchmark (models, Medical Mode on/off, keyterm impact), synthetic UK corpus, and development metrics (WER, critical-term, medical/entity, negation, numbers, first-partial latency, final latency, endpointing delay, partial stability, bootstrap latency, connection failure rate) — development only, no production voice analytics.
- Provider adapter mapping through `VoiceInputAdapter` so no provider event shape leaks into conversation logic.

**3. `roadmap.md` (update)** — AIC-7B provider gate outcome, frozen state, and the proposed AIC-7B build slice (transport, permission, capture, token bootstrap endpoint, adapter, transcript-only development UI, cleanup, no `send()`).

**4. ADRs** — all six AIC-6 ADRs remain PROPOSED. ADR-AIC6-06 noted as evidence-strengthened but NOT ACCEPTED until server token issuance and browser integration actually prove it.

## Not done

Provider integration or dependency, credentials, bootstrap endpoint, microphone, STT, TTS, conversation integration, prompt changes, AIC-5 changes, UI, routes, migrations, analytics, deployment. Production source files changed 0, tests changed 0, DB changes 0.

## Frozen state to reconfirm

`VITE_COMPANION_VOICE_ENABLED` OFF; `AI_COMPANION_VOICE_ENABLED` OFF/reserved; `AI_AMBER_CLASSIFIER_ENABLED` OFF with production AMBER release GATED; grounding `30B-source-routing-v1` / 0 / 0 / []; memory OFF; persistent history OFF; microphone, STT, TTS, voice persistence, raw-audio persistence and voice analytics all 0.

## Validation

Documentation only: `npm test` (expect 90 files / 1062 tests unchanged), `npm run typecheck`, `npm run lint` (baseline only), `npm run build`. Then the 95-point provider-gate report. Stop after the report; do not start the build.
