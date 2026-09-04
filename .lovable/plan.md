# AIC-7B — Provider Selection & Streaming STT Architecture Gate

Research is complete. This plan records the recommendation and the documentation-only work to close the gate. No provider integration, no microphone, no STT, no TTS, no production source changes.

## Evidence base

Comparison date: 4 September 2026. Eight candidates reviewed from current official documentation: Deepgram, AssemblyAI, Speechmatics, Google Speech-to-Text v2/Chirp, Azure AI Speech, AWS Transcribe (incl. Medical), OpenAI Realtime transcription, ElevenLabs Scribe v2 Realtime. Google is eliminated on transport alone (gRPC only, no browser path). Unresolved items are recorded as UNKNOWN, not inferred.

## Recommendation

**Transport: Option A — direct browser WebSocket to the provider using a short-lived, server-issued token.** Server relay through an edge runtime adds latency, bandwidth and audio-handling responsibility for no safety gain: safety lives in `ai-search`, which only ever sees the final transcript, never audio.

**Selected provider (technical recommendation): AssemblyAI Universal-Streaming.**
- Direct browser WebSocket with a temporary token (`GET /v3/token`, query-param auth), master key stays server-side.
- Clear `Turn` semantics: `end_of_turn:false` partial, `end_of_turn:true` final, plus `ForceEndpoint` — a clean match for our manual Done control.
- EU residency endpoint (`streaming.eu.assemblyai.com`); data stated not to leave the region.
- Documented Data Controls: training opt-out plus zero data retention for streaming production, and configurable TTL.
- Medical Mode for streaming (medications, procedures, dosages), plus keyterm prompting for pregnancy/TTC/postpartum vocabulary.
- Published P50 word latency 300 ms; $0.15/hour session-based.

**Runner-up: Speechmatics.** UK company, EU realtime endpoint, an explicit medical domain model, `additional_vocab` with `sounds_like`. It loses because temporary keys for browser use are enterprise-gated (no self-serve path to a no-browser-secret architecture), retention/training posture is undocumented publicly, and `max_delay` finalisation (0.7–4 s) is slower. Deepgram is third: EU endpoint GA and a 30 s–1 h scoped JWT, but no documented medical model and no published retention default.

**Stop conditions:** none triggered. Master browser secrets required: 0.

## Documentation to write (build mode)

1. **`docs/ai/companion-voice-provider-review.md`** (new) — full evidence table across all eight candidates over the 30 evaluation dimensions, with source URLs, per-provider retention/training/residency findings, and an explicit UNKNOWN register (AssemblyAI token TTL, VAD numeric thresholds, en-GB accent evidence, ISO 27001 status, iOS Safari vendor statements).
2. **`docs/ai/companion-voice-architecture.md`** (update) — add an AIC-7B section: selected transport and provider, ephemeral credential flow (voice UI → server checks `AI_COMPANION_VOICE_ENABLED` → server mints temporary token → browser connects directly), audio capture recommendation (AudioWorklet raw PCM 16 kHz mono, **not** MediaRecorder/WebM — iOS Safari produces MP4/AAC), partial→`PartialTranscript` and final→`FinalTranscript` mapping through `VoiceInputAdapter`, mandatory manual Done, confidence as diagnostics only, audio lifecycle (capture → stream → discard; durable audio storage 0), failure and single-reconnect behaviour (never replay captured speech, never auto-retry audio; fall back to "try again" or text), latency benchmark plan and the synthetic UK-English quality corpus (negation, severity, gestational weeks, dosages, BP/temperature, 999 / NHS 111 / A&E, household noise, self-corrections), and the recommended development metrics.
3. **Safety-critical transcription risk section** — explicitly states no provider removes mis-transcription risk; negation and severity errors are input-quality risks handled by UX (visible transcript, easy correction), never by tuning AIC-5.
4. **`roadmap.md`** — record AIC-7B gate outcome and the proposed AIC-7B build slice (transport + permission + capture + bootstrap endpoint + adapter + transcript-only dev UI, no `send()`).
5. **ADRs** — all six AIC-6 ADRs stay PROPOSED. ADR-AIC6-06 is noted as strengthened by evidence but not accepted until enforced in code.

## Explicitly not done

Provider SDK, credentials, bootstrap endpoint, microphone, STT, TTS, conversation integration, prompt changes, AIC-5 changes, UI, routes, migrations, analytics, deployment. Production source files changed: 0. Tests changed: 0.

## Release gating

Technical recommendation is separate from production privacy approval. Before general release: signed DPA, confirmed EU/UK processing scope, confirmed zero-retention and training opt-out in the contracted tier, and subprocessor review.

## Validation

Documentation only, so: `npm test` (expect 90 files / 1062 tests unchanged), `npm run typecheck`, `npm run lint` (baseline only), `npm run build`. Then the 95-point completion report. Stop before the AIC-7B build.
