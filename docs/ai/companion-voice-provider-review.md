# Companion Voice — Streaming STT Provider Review (AIC-7B provider gate)

**Status:** provider/architecture gate, documentation only. No provider
integration, no dependency, no credential, no bootstrap endpoint, no microphone,
no STT, no TTS, no implementation build.

**Comparison snapshot: 4–5 September 2026.** Every provider fact below is a
snapshot *on that date*, of the *named product or model*, from the *named
official source*. Provider pricing, model line-ups, token contracts, retention
controls, regional endpoints and feature availability change frequently.

> **This provider review is a decision record, not permanent truth.** Every
> time-sensitive fact must be re-verified against current official documentation
> at implementation time and again before release.

**Evidence quality.** Primary evidence is current official vendor documentation.
Third-party aggregator figures are secondary and are not used for any decision.
Vendor marketing accuracy and latency claims are recorded as claims, never as
release evidence. Anything not resolved by primary evidence is recorded as
`UNKNOWN / REQUIRES VALIDATION`. Evidence gaps are never closed by inference.

**Scope of "not selected".** Every non-selection below means *not selected for
the approved Start of You direct-browser streaming architecture and our stated
requirements*. It is not a judgement on a provider's general quality, nor on its
suitability for other architectures.

---

## 1. Our requirements

1. Streaming STT with live partial transcripts and an explicit, reliable final
   transcript event.
2. A browser transport viable on iOS Safari, Android Chrome and desktop Chrome /
   Safari / Edge.
3. A documented short-lived, server-issued client credential, so the master
   provider secret never reaches the browser. **Master provider secret in
   browser = 0** is non-negotiable.
4. Endpointing that improves the experience without becoming the only way to
   finish a turn — a manual **Done** control is mandatory in v1.
5. Clean session cancellation/termination mapping onto the AIC-7A
   `VoiceSessionController`.
6. Event shapes that map onto the fixed AIC-7A contracts `PartialTranscript`
   (display only) and `FinalTranscript` (authoritative) without redesigning our
   contracts around a provider SDK.
7. An acceptable retention and training posture with an EU/UK processing option.
8. **STT only.** The provider must not become a response brain: `ai-search` is
   the intelligence authority, and the AIC-5 stack is the safety authority.

---

## 2. Landscape reviewed — eight providers

| Category | Candidates |
| --- | --- |
| Specialist streaming STT | Deepgram, AssemblyAI, Speechmatics |
| Major cloud speech | Google Cloud Speech-to-Text v2 / Chirp, Microsoft Azure AI Speech, AWS Transcribe (incl. Transcribe Medical) |
| AI platform realtime | OpenAI Realtime transcription (`gpt-realtime-whisper` / `gpt-4o-transcribe`), ElevenLabs Scribe v2 Realtime |

### 2.1 Not selected for our architecture — requirement-specific rationale

| Provider (product) | Snapshot finding, 4–5 Sep 2026 | Why not selected for the Start of You direct-browser architecture |
| --- | --- | --- |
| Google Cloud STT v2 / Chirp | v2 `StreamingRecognize` is a gRPC bidirectional stream; documentation and samples target server callers. No STT-specific browser-safe short-lived credential found. (`cloud.google.com/speech-to-text/v2/docs/streaming-recognize`) | Its documented client/transport model does not support our browser-direct requirements 2 and 3 without a full server audio relay, which we did not select. This says nothing about Google STT as a server-side product. |
| ElevenLabs Scribe v2 Realtime | WebSocket with a client-side streaming guide; Zero Retention Mode documented as an enterprise add-on rather than a default. Partial/final event schema, VAD controls, audio formats, en-GB handling, custom vocabulary, regional processing and realtime pricing were not resolvable from primary docs. (`elevenlabs.io/docs/eleven-api/resources/zero-retention-mode`) | Too many requirement-critical items remained UNKNOWN for a health product, and retention control appears to depend on a contracted add-on. Not selected on unresolved evidence against requirement 7, not on quality. |
| OpenAI Realtime transcription | WebRTC from the browser with a server-minted ephemeral `client_secret`; no confirmed UK/EU regional processing guarantee for the plain OpenAI Realtime endpoint; no formal phrase-boost API (prompt steering only); whether Zero Data Retention covers the Realtime/transcription path is UNKNOWN. (`developers.openai.com/api/docs/guides/realtime-webrtc`, `/guides/realtime-transcription`, `/guides/your-data`) | Satisfies requirement 3 well; not selected because regional processing (requirement 7) and bounded domain vocabulary are unresolved for our UK health context. |
| AWS Transcribe / Transcribe Medical | Streaming over WebSocket using a SigV4 presigned URL; London `eu-west-2` available for standard streaming; a genuine Transcribe Medical streaming model with named specialties. Transcribe Medical availability in `eu-west-2` UNKNOWN; obstetrics not among the named specialties. (`docs.aws.amazon.com/transcribe/latest/dg/getting-started-http-websocket.html`, `/streaming-medical-conversation.html`) | Presigned-SigV4 credentialing is heavier than a token bootstrap for our seam (requirement 3), and the medical model's regional availability and domain coverage are unresolved for our content. |
| Microsoft Azure AI Speech | JS SDK connects the browser over WebSocket using a 10-minute STS authorization token; UK South / UK West residency; Custom Speech phrase lists; real-time logging opt-in only. (`learn.microsoft.com/azure/ai-services/authentication`, `/azure/ai-services/speech-service/logging-audio-transcription`, `/azure/ai-services/speech-service/regions`) | Strongest of the clouds for our architecture and it meets requirements 2, 3 and 7. Not selected because there is no medical model, domain vocabulary requires managing a Custom Speech project, and the SDK owns capture in ways that would push provider concepts into our runtime (requirement 6). |

### 2.2 Shortlist carried to the full comparison

**AssemblyAI**, **Speechmatics**, **Deepgram** — each documents a
browser-capable WebSocket plus a short-lived credential concept.

---

## 3. Thirty-dimension comparison — shortlist (snapshot 4–5 September 2026)

| # | Dimension | AssemblyAI (Streaming STT v3) | Speechmatics (Realtime v2) | Deepgram (`/v1/listen` streaming) |
| --- | --- | --- | --- | --- |
| 1 | Streaming partial transcripts | `Turn` with `end_of_turn:false` | `AddPartialTranscript` | `Results` with `is_final:false` (`interim_results`) |
| 2 | Reliable final transcript event | `Turn` with `end_of_turn:true`; `turn_is_formatted` distinguishes raw vs formatted | `AddTranscript`, timing governed by `max_delay` | `Results` `is_final:true`; `speech_final:true` at a natural pause; separate `UtteranceEnd` |
| 3 | Endpointing / VAD | Intelligent turn detection; client `ForceEndpoint`; `UpdateConfiguration` mid-session | `max_delay` 0.7–4 s, `max_delay_mode` flexible/fixed | `endpointing` (ms), `utterance_end_ms`, `vad_events` / `SpeechStarted` |
| 4 | Low-latency browser streaming | WebSocket, binary audio frames | WebSocket | WebSocket |
| 5 | iOS Safari viability | No vendor statement found — UNKNOWN / REQUIRES VALIDATION | Same | Same |
| 6 | Android Chrome viability | No vendor statement found — UNKNOWN / REQUIRES VALIDATION | Same | Same |
| 7 | Desktop Chrome / Safari / Edge | Plausible; REQUIRES VALIDATION | Plausible; REQUIRES VALIDATION | Plausible; REQUIRES VALIDATION |
| 8 | Transport architecture | `wss://streaming.assemblyai.com/v3/ws`, plus `streaming.us.` and `streaming.eu.` hosts. No WebRTC | `wss://global.rt.` / `eu.rt.` / `us.rt.speechmatics.com/v2/`. No WebRTC | `wss://api.deepgram.com/v1/listen`, plus `api.eu.deepgram.com`. No WebRTC |
| 9 | Ephemeral client authentication | `GET /v3/token` temporary token, `expires_in_seconds` **1–600**, passed as a `?token=` query parameter (browsers cannot set WebSocket headers) | Temporary JWT via `POST mp.speechmatics.com/v1/api_keys?type=rt`, passed as `?jwt=`; documented as an **enterprise-gated** feature | `POST /v1/auth/grant` short-lived JWT; default 30 s, `ttl_seconds` up to 3600 |
| 10 | Master secret stays server-side | Yes — token minted server-side | Yes, but only under an enterprise arrangement | Yes |
| 11 | Cancellation / session termination | Terminate message + WebSocket close; `ForceEndpoint` flushes the current turn | WebSocket close / end-of-stream | WebSocket close / finalize |
| 12 | English UK | English variants supported; no published en-GB accent evidence — UNKNOWN | UK-headquartered (Cantab Research Ltd); `language` / `output_locale` en-GB; strong accent claim | English variants incl. en-GB in the Nova model matrix |
| 13 | Medical terminology capability | **Medical Mode** add-on for streaming, targeting medication names, procedures, conditions and dosages | **Medical domain model** (`domain: medical`), 2026 launch with vendor accuracy claims | No dedicated streaming medical model found — UNKNOWN |
| 14 | Numbers / dates / dosages | Formatted turns via `turn_is_formatted`; en-GB behaviour on our corpus UNKNOWN | Smart formatting by output locale | `smart_format`, `numerals` (documented as language-limited; en-GB coverage UNKNOWN) |
| 15 | Custom vocabulary / phrase boosting | Keyterm prompting for streaming, plus a contextual `prompt` | `additional_vocab` custom dictionary with `sounds_like`; large lists add initialisation latency | `keyterm` prompting (≤100 terms), legacy `keywords` |
| 16 | Privacy policy / data controls | Documented Data Controls surface including model-training opt-out and BAA availability | Public privacy policy; specifics not extractable from primary docs — UNKNOWN | Trust/compliance pages; specifics via account executive |
| 17 | Audio retention | Zero data retention for Streaming Production documented as **conditional on the model-training opt-out**; billing/logging metadata retained regardless | UNKNOWN | UNKNOWN default period |
| 18 | Transcript retention | Same conditional basis. The configurable artifact TTL documented for **asynchronous** transcription is a separate mechanism and does not describe streaming | UNKNOWN | UNKNOWN |
| 19 | Provider training / data use | Opt-out documented via Data Controls; **the free tier is documented as unable to opt out** | UNKNOWN | Training only under the opt-in Model Improvement Partnership Program |
| 20 | DPA availability | Available; BAA available for HIPAA covered entities | Available (UK entity) | Available via account executive |
| 21 | EU / UK processing and residency | **`wss://streaming.eu.assemblyai.com/v3/ws`** documented EU residency host; docs state data does not leave the region | `eu.rt.speechmatics.com`; UK-headquartered company | EU endpoint `api.eu.deepgram.com`, GA since December 2025 |
| 22 | Deletion controls | Streaming: conditional ZDR (nothing durable to delete). Asynchronous: artifact TTL | UNKNOWN | UNKNOWN |
| 23 | Subprocessors | Contracted list not verified in this pass — UNKNOWN / REQUIRES VALIDATION | UNKNOWN / REQUIRES VALIDATION | UNKNOWN / REQUIRES VALIDATION |
| 24 | Security / compliance posture | SOC 2 referenced; ISO 27001 status UNKNOWN | Security page not text-extractable; certifications UNKNOWN | HIPAA / SOC 2 / GDPR referenced; exact current certificate list UNKNOWN |
| 25 | Pricing model | See §4: per-model rates plus a Medical Mode add-on. **Session-based billing charges the whole WebSocket connection, including idle time** | Free tier with credit and 2 concurrent realtime sessions; official realtime PAYG rate UNKNOWN from primary docs | Per-second billing; streaming rate cited only by secondary sources — treated as UNKNOWN |
| 26 | Developer complexity | Low: plain WebSocket, JSON turn messages, one token call | Medium: browser tokens need an enterprise arrangement | Low: plain WebSocket, token grant |
| 27 | Provider lock-in | Low; isolated behind `VoiceInputAdapter` | Low | Low |
| 28 | Fit with `VoiceInputAdapter` | Excellent: turn semantics map 1:1 onto partial/final, and `ForceEndpoint` maps onto manual Done | Good: partial/final map cleanly; `max_delay` needs tuning | Good: requires reconciling `is_final` vs `speech_final` vs `UtteranceEnd` |
| 29 | Observable latency | Claimed 300 ms P50 word emission for Universal-Streaming. Real-device figures UNKNOWN | Claimed sub-second; `max_delay` floor 0.7 s | No official numeric figure found — UNKNOWN |
| 30 | Operational reliability for us | UNKNOWN / REQUIRES VALIDATION | UNKNOWN / REQUIRES VALIDATION | UNKNOWN / REQUIRES VALIDATION |

---

## 4. AssemblyAI pricing — by exact product/configuration

Snapshot of documented base rates on **4–5 September 2026**. Sources:
`assemblyai.com/products/streaming-speech-to-text`,
`assemblyai.com/docs/getting-started/models`,
`assemblyai.com/docs/streaming/medical-mode`, and the current official pricing
page. **Not contractual, not a quote, and to be re-confirmed at build time.**

| Configuration | Documented base rate | Basis |
| --- | --- | --- |
| Universal-Streaming | $0.15 / hour | Official product page, 4–5 Sep 2026 |
| Universal-3.5 Pro Realtime | $0.45 / hour | Official model/pricing documentation, 4–5 Sep 2026 |
| Medical Mode (add-on) | $0.15 / hour | Official streaming Medical Mode documentation, 4–5 Sep 2026 |
| Universal-3.5 Pro Realtime + Medical Mode | $0.60 / hour — **DERIVED FROM CURRENT DOCUMENTED COMPONENT PRICES** | Arithmetic on the two rows above; not a quoted combined rate |
| Universal-Streaming + Medical Mode | **UNKNOWN / REVERIFY AT BUILD TIME** | Not asserted here; derive only from current official pricing at implementation time |

Billing is documented as session-based: the full WebSocket connection duration
is charged, including idle time. That is a session-lifecycle design constraint,
not just a finance note — sessions must be closed promptly, which the AIC-7A
`VoiceSessionController` cleanup contract already enforces.

---

## 5. Transport options assessed

### 5.1 Direct browser → provider (Option A) — selected

Browser microphone → provider Streaming WebSocket, authenticated with a
short-lived, server-issued token.

- Lowest latency; no audio traverses our infrastructure.
- Smallest application raw-audio handling surface: we never buffer, relay or
  store audio.
- No loss of safety authority: AIC-5 acts on the **final transcript**, after
  transcription, never on audio. Relaying audio would move no safety decision.
- Requires a documented ephemeral credential. AssemblyAI, Deepgram, Azure, AWS
  and OpenAI each document one; Speechmatics documents one behind an enterprise
  arrangement; Google does not document a browser-safe one for STT.
- Risks to manage in the build: the token bootstrap must be gated server-side;
  per-platform browser behaviour must be proven; session cleanup must be
  reliable, especially on tab hide and unmount.

### 5.2 Browser → Start of You relay → provider (Option B) — not selected

- Benefits: the provider is hidden behind our own API, a single egress point, and
  server-side sight of every byte.
- Costs: added latency on every audio frame; continuous bandwidth through the
  edge runtime; long-lived streaming connections in a runtime not designed for
  them; we become an audio processor with retention, scaling and cost
  responsibility.
- Not selected — and explicitly not rejected on feel. It moves no safety
  decision, because safety already happens after finalisation.

### 5.3 Decision

**PRIMARY TRANSPORT: A — direct browser to provider using a short-lived,
server-issued token.** A server audio relay must not be introduced without new
evidence.

---

## 6. Selection

**SELECTED PROVIDER: AssemblyAI — Streaming Speech-to-Text only.**

Reasons, measured against our requirements: a documented browser
temporary-token contract with an explicit 1–600 s lifetime; turn semantics that
map exactly onto `PartialTranscript` / `FinalTranscript`, with a client-driven
`ForceEndpoint` that matches our mandatory manual Done; a documented EU-pinned
streaming host; a documented model-training opt-out with conditional streaming
zero data retention; a streaming Medical Mode relevant to medication, dosage and
condition terms; and keyterm prompting available for bounded domain vocabulary.

```text
ASSEMBLYAI PROVIDER:          SELECTED
ASSEMBLYAI STREAMING MODEL:   BENCHMARK-GATED
```

The provider decision is closed. The model/configuration decision is **not**.
Nothing in this document makes Universal-Streaming the production model. The
future build benchmark must compare the production-relevant model/configurations
actually available at that time, including where applicable Universal-Streaming,
Universal-3.5 Pro Realtime, Medical Mode OFF, Medical Mode ON, and bounded
keyterm prompting where justified — measured on our own synthetic corpus for
accuracy, critical-term accuracy, latency and cost.

### 6.1 AssemblyAI managed Voice Agent API — REJECTED as the response brain

The AssemblyAI managed Voice Agent API bundles STT + LLM + TTS. It is **not** the
approved Start of You response architecture.

Approved:

```text
microphone → AssemblyAI Streaming STT → FinalTranscript
           → existing ai-search → AIC-5 → canonical assistant text
           → future independent TTS
```

Rejected:

```text
provider STT → provider-managed LLM → provider response brain
             → provider-managed spoken answer
```

**No external voice-agent brain may bypass `ai-search`.** The approved AssemblyAI
product family for AIC-7 is Streaming Speech-to-Text only. STT and TTS need not
come from the same company; output voice belongs to AIC-7D.

### 6.2 Runner-up and third place

**RUNNER-UP: Speechmatics.** A UK company with an EU realtime host, an explicit
medical domain model and a strong custom dictionary with `sounds_like`
pronunciations. Not selected because browser temporary keys are documented as an
enterprise-gated feature, so there is no documented self-serve route to our
no-master-secret requirement; because audio and transcript retention and the
training posture are not resolvable from public primary documentation; and
because `max_delay` finalisation (0.7 s floor, up to 4 s) is structurally slower
than turn-based finalisation for a conversational companion.

**THIRD: Deepgram.** EU endpoint GA and a clean short-lived token grant, but no
documented streaming medical model, no published retention default and no
published latency figure — three requirement-relevant evidence gaps rather than
any quality judgement.

**Stop conditions:** none triggered. Master provider secret in browser: 0.

---

## 7. Safety-critical transcription risk

> **NO STT PROVIDER ELIMINATES MIS-TRANSCRIPTION RISK.**

The companion may receive language about pregnancy, postpartum, fertility,
babies, symptoms, medications and emergency services. Every candidate can
mis-transcribe:

- negation — "I am bleeding" versus "I am not bleeding"
- severity wording — "severe" versus "mild"
- medical terms, condition names, medication names
- dosages, gestational weeks, dates, temperatures, blood pressure
- 999, NHS 111, A&E

These are **input-quality hazards**, not safety-model problems. Mitigation is:
high-quality STT, an always-visible transcript, easy correction, a low-friction
way to repeat a turn, the synthetic provider benchmark corpus, and later voice
safety validation in AIC-7F.

**AIC-5 must not be modified because of anticipated STT errors.** No safety
regex, threshold, category or taxonomy may be tuned around transcription
mistakes. Input-quality mitigation and safety architecture remain separate. Any
later safety change requires independent review.

### 7.1 Provider confidence metadata

Where transcript confidence exists, it is **development diagnostics only**. It
must never determine GREEN, AMBER, RED or CRISIS, clinical severity, diagnosis,
or whether a person is safe. No confidence threshold may become hidden medical
logic.

---

## 8. Privacy and legal release gates — separate from the technical decision

**TECHNICAL PROVIDER RECOMMENDATION: APPROVED.**
**PRODUCTION PROVIDER RELEASE / PRIVACY APPROVAL: GATED.**

Retention wording stays conditional. It is **not** correct to state that
AssemblyAI streaming always has zero data retention. The documented position on
4–5 September 2026:

- Streaming audio and transcript zero data retention depends on the relevant
  account and data-control configuration.
- The model-training opt-out must be confirmed on the contracted account.
- Free/test tier behaviour does not prove production posture — documentation
  states the free tier cannot opt out of model training.
- Billing and logging metadata may still exist regardless.
- **Streaming ZDR and the asynchronous artifact TTL are separate mechanisms** and
  must not be merged or described interchangeably.

Before any controlled or general release, resolve on the actual contracted
account and tier — not from marketing pages:

- [ ] Signed DPA where required
- [ ] Contracted regional processing, and EU/UK processing scope
- [ ] EU streaming endpoint in use, with the selected model and Medical Mode
      confirmed operational and equivalent on it
- [ ] **AssemblyAI model-training opt-out: CONFIRMED**
- [ ] **Streaming zero-data-retention status: CONFIRMED on the contracted account/tier**
- [ ] Metadata retention scope
- [ ] Subprocessor list reviewed
- [ ] Deletion terms
- [ ] Security posture (SOC 2, ISO 27001 status)
- [ ] Terms applicable to our actual account tier
- [ ] Regional feature availability

AIC-7B does not claim production privacy approval.

---

## 9. UNKNOWN / REQUIRES VALIDATION register

1. iOS Safari — no vendor support statement from any shortlisted provider.
2. Start of You UK-accent performance across a reasonable range of UK accents
   and ordinary conversational speech. No demographic voice profiling.
3. Real-device first-partial and final-transcript latency.
4. Accuracy under ordinary household background noise.
5. Provider behaviour on the Start of You synthetic benchmark corpus.
6. Universal-Streaming + Medical Mode combined current rate.
7. Whether the selected model and Medical Mode are available and equivalent on
   the EU streaming endpoint.
8. Commercial and contractual conditions that are not public.
9. Contracted subprocessor and residency commitments.
10. ISO 27001 certification status (AssemblyAI, Speechmatics, Deepgram).
11. Numeric silence-threshold tuning parameters beyond `ForceEndpoint`.
12. Number, date, week and dosage formatting behaviour in en-GB streaming turns.
13. Official realtime PAYG rate for Speechmatics; official current streaming rate
    for Deepgram from primary sources.
14. Speechmatics and Deepgram audio and transcript retention defaults.

---

## 10. Official sources consulted (4–5 September 2026)

AssemblyAI: `assemblyai.com/docs/streaming/api-spec/streaming-websocket`,
`/docs/streaming/authenticate-with-a-temporary-token`,
`/docs/api-reference/streaming-api/generate-streaming-token`,
`/docs/streaming/message-sequence`, `/docs/streaming/medical-mode`,
`/docs/streaming/prompting-and-keyterms`, `/docs/data-controls`,
`/docs/data-retention-and-model-training`, `/docs/getting-started/models`,
`assemblyai.com/products/streaming-speech-to-text`.

Speechmatics: `docs.speechmatics.com/api-ref/realtime-transcription-websocket`,
`/get-started/authentication`, `/speech-to-text/realtime/output`,
`/speech-to-text/features/custom-dictionary`.

Deepgram: `developers.deepgram.com/reference/speech-to-text/listen-streaming`,
`/guides/fundamentals/token-based-authentication`, `/docs/interim-results`,
`/docs/utterance-end`, `/docs/endpointing`, `/docs/encoding`.

Google: `cloud.google.com/speech-to-text/v2/docs/streaming-recognize`,
`/speech-to-text/docs/data-logging-terms`.

Azure: `learn.microsoft.com/azure/ai-services/authentication`,
`/azure/ai-services/speech-service/logging-audio-transcription`,
`/azure/ai-services/speech-service/regions`.

AWS: `docs.aws.amazon.com/transcribe/latest/dg/getting-started-http-websocket.html`,
`/transcribe/latest/dg/streaming-medical-conversation.html`.

OpenAI: `developers.openai.com/api/docs/guides/realtime-webrtc`,
`/api/docs/guides/realtime-transcription`, `/api/docs/guides/your-data`.

ElevenLabs: `elevenlabs.io/docs/eleven-api/resources/zero-retention-mode`,
`elevenlabs.io/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming`.
