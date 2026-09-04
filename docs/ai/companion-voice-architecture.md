# Companion Voice Architecture (AIC-6 — architecture gate)

**Status:** architecture gate only. No production voice code exists, none is
introduced by this document, and AIC-7 is not started.

Core invariant:

> **Voice is a new transport and interaction experience. Voice is not a new AI
> brain.** `ai-search` remains the single intelligence and safety authority for
> every companion answer, typed or spoken.

---

## 1. Audit of the current implementation

Verified against source at the time of writing.

### 1.1 Companion voice functionality today

**Zero.** No voice mode, no speech input, no speech output, no realtime
transport, no audio dependency in `package.json`, no WebSocket/WebRTC/AudioContext
usage anywhere in the companion runtime.

### 1.2 Audio/speech code that does exist (all unrelated to the companion)

| File | Classification | What it is |
| --- | --- | --- |
| `src/components/myweek/SlotVoiceMemory.tsx` | A — production | Journal voice notes: `getUserMedia` + `MediaRecorder`, user-initiated, stored as journal media |
| `src/lib/weekMedia.ts`, `src/hooks/useWeekMedia.ts` | A — production | Journal media capture/upload helpers. Explicit comment: "No AI. No MediaRecorder-driven transcription. No analytics." |
| `src/components/myweek/SlotReflection.tsx` | A — production | Optional dictation into a journal text field via browser `SpeechRecognition` / `webkitSpeechRecognition` |
| `src/components/myweek/SlotReflectionAssistant.tsx` | A — production | Same dictation pattern in the reflection assistant |
| `docs/ai/roadmap.md`, `docs/ai/memory-*.md` | D — copy only | Prior mentions of a future voice readiness audit |
| `src/test/amberSafety.test.ts` | E — test only | Incidental wording match |

No STT service integration, no TTS integration, no microphone code in the
companion. Expectation of "0 production companion voice functionality" is
correct. The journal's use of browser speech APIs is **not** evidence that those
APIs should power the companion (see §8).

### 1.3 Companion runtime (already single-brain)

- Two surfaces only: global panel (`src/components/companion/*`) and `/ask`
  (`src/pages/AskPage.tsx`). Both run the same runtime
  `src/lib/companion/conversation/useCompanionConversation.ts`.
- Transport: `src/hooks/useAISearch.ts` → `POST /functions/v1/ai-search`,
  SSE, line-buffered reader accumulating `choices[0].delta.content`.
- Cancellation: one `AbortController` per request in `useAISearch`
  (`abortRef`), plus a monotonic `requestRef` guard so a superseded response can
  never write state. `stop()` in the runtime calls `reset()` and sets
  `committedRef.current = true`, which discards the in-flight partial answer —
  **an interrupted answer is currently not committed to the thread at all.**
- Conversation state: session-scoped `sessionStorage` transcript
  (`sessionConversationStore.ts`), bounded history (`buildSessionHistory`),
  server-owned `X-Conversation-Id`, server-owned boundary headers.
- Flags: two-sided convention already established —
  `VITE_COMPANION_HISTORY_ENABLED` (client experience) plus a server edge secret
  (`AI_CONVERSATION_HISTORY_ENABLED`) as the authority.

### 1.4 Answer post-processing (critical for voice)

The committed assistant message content is the **raw accumulated SSE text**.
Sanitisation happens at **render time only**:

- `sanitiseAnswerForDisplay` (`src/lib/aiAnswerSafety.ts`) is applied in
  `CompanionMessageList`, `AskPage`, `TTCAskCompanionCard`,
  `FirstYearAskCompanion`.
- It strips retrieval wording sentences, removes markdown links, angle URLs and
  bare URLs (`src/lib/answerSourceLinks.ts`), strips trailing "Sources"
  sections, and substitutes `SAFE_FALLBACK_ANSWER` when nothing of substance
  survives.
- `isStreaming: true` uses a partial-safe variant that never flashes the
  fallback line.

Consequence for voice: **raw SSE tokens may contain text that is later removed
or replaced before the user sees it.** Speaking raw tokens would break
text/voice parity and could speak a URL or a retrieval refusal the reader never
sees.

---

## 2. Canonical assistant text boundary (binding recommendation)

**Definition.** The *canonical assistant text* is the output of
`sanitiseAnswerForDisplay(accumulatedAnswer, { isStreaming })` — the exact text
the companion displays. Speech is a presentation of canonical text and nothing
else.

**Raw SSE tokens directly to TTS: NO.**

**Recommended AIC-7 mechanism — canonicalise per completed chunk:**

1. Accumulate SSE deltas as today.
2. On each delta, compute the streaming-safe canonical text
   (`sanitiseAnswerForDisplay(..., { isStreaming: true })`).
3. Maintain a *speech watermark*: only the portion of canonical text that ends
   at a completed sentence boundary **and** is followed by further canonical
   text (i.e. is no longer subject to change by later sanitisation) may be
   handed to TTS.
4. On stream completion, canonicalise finally (`isStreaming: false`) and speak
   only the remaining unspoken tail of that final canonical text.
5. If the final canonicalisation replaces the answer with
   `SAFE_FALLBACK_ANSWER`, stop speech immediately and speak/display only the
   fallback. This is a rare tail case and must be tested in AIC-7F.

This preserves the invariant: **what is spoken never materially diverges from
what is displayed and committed.** The cost is one sentence of added latency,
which is acceptable and far cheaper than a parity defect.

AIC-7 should also consider promoting canonicalisation from render-time to
commit-time in the conversation runtime, so the committed message equals the
displayed message equals the spoken message. That is a small, testable change
and is recommended as part of AIC-7D — but it is a production change and is not
made here.

---

## 3. Interaction model and experience

**Chosen interaction model: Option B — explicit tap-to-enter voice session.**

Accepted working hypothesis:

```text
tap voice  → permission (first time) → LISTENING
LISTENING  → user speaks → end of turn → final transcript
final transcript → ai-search (AIC-5 authority) → canonical text
canonical text → displayed → spoken (SPEAKING)
SPEAKING   → ends or is interrupted → LISTENING
… until the user ends the session
```

Rejected: A (push-to-talk — safe but not conversational enough for a companion
people use hands-busy), C (fully open duplex — unjustified privacy, echo and
barge-in complexity for v1).

This is not background listening: the session is explicitly entered, visibly
active, and ends on an explicit action or on any of the stop conditions in §7.

Feel: calm, warm, unhurried, private, premium. No cartoon assistant, no pulsing
theatrics, no spoken filler, no claims of feeling, no fake intimacy.

### 3.1 Entry point and surfaces

- Entry point: a microphone control **inside the existing companion composer**.
  The same control appears on both surfaces (panel and `/ask`).
- Voice is a **mode of the existing companion**, not a route and not a third
  chat surface. No dedicated URL.
- Mobile: voice mode expands the existing bottom sheet to a near-full-screen
  state within the same runtime (safe-area aware, keyboard dismissed).
- Desktop: the existing right-side drawer stays in place and switches to a voice
  layout; no modal, no separate desktop product.

### 3.2 Permission UX

- Never request the microphone on page load. Permission follows the explicit
  tap only.
- First use: one short inline line explaining why the microphone is needed, then
  the browser prompt. No long modal.
- Denied / blocked / unavailable: an inline calm message plus "continue by
  text". The text companion always remains fully usable.

---

## 4. State machine (final recommendation)

Eight states. `finalising_turn` is merged into `listening` (visual sub-state),
and the three error states are kept distinct because their escape routes differ.

| State | User meaning | Mic | Audio out | Transitions | Escape / fallback |
| --- | --- | --- | --- | --- | --- |
| `idle` | Voice off, text available | off | off | → `requesting_permission` | n/a |
| `requesting_permission` | "Allow the microphone" | off | off | → `listening`, `permission_denied` | cancel → `idle` |
| `listening` | "Listening" (incl. finalising the turn) | **on** | off | → `thinking`, `no_speech`, `ended`, `network_error` | tap done, tap end |
| `thinking` | "Thinking" — visual only, never spoken | off | off | → `speaking`, `network_error` | tap end (aborts request) |
| `speaking` | "Speaking" + visible text | off | on | → `listening`, `interrupted`, `speech_output_error` | tap interrupt |
| `interrupted` | Transient: audio stopped, generation aborted | off | off | → `listening` | auto |
| `permission_denied` | "Microphone unavailable" | off | off | → `idle` | switch to text |
| `no_speech` / `network_error` / `speech_output_error` | Recoverable failure with a named cause | off | off | → `listening`, `idle` | retry or type instead |
| `ended` | Session closed, thread intact | off | off | → `idle` | n/a |

Rules: the microphone is on **only** in `listening`; the "Listening" indicator
is visible whenever it is; leaving voice mode stops every track immediately.

---

## 5. Safety mediation

Target flow (Architecture Option B):

```text
microphone → streaming STT → FINAL transcript
           → ai-search (validation → decideSafety → AIC-5C → AIC-5D → AIC-5E → model)
           → canonical assistant text → displayed
           → chunked TTS → audio
```

- **Only the finalised transcript** is an authoritative request. Partial
  transcript is display-only and never produces an assistant answer.
- **No pre-safety audio.** Nothing is spoken before the server has resolved the
  route. Waiting feedback is visual and non-semantic — never "don't worry",
  never "that sounds fine".
- **RED / CRISIS / safeguarding:** the deterministic AIC-5A text is displayed
  verbatim and spoken verbatim (after presentation-only normalisation, §5.1).
  No model paraphrase of urgent wording, ever. TTS failure can never suppress
  the safety text.
- **Clarification (AIC-5C):** the server's clarifying question is displayed and
  spoken, then the session returns to `listening` for the answer.
- **Unsupported (AIC-5C):** the fixed unsupported answer is displayed and
  spoken; no alternative spoken wording.
- **AMBER (AIC-5D):** unchanged and still gated OFF; when released it changes
  the canonical text only, and voice speaks whatever that text is.
- **Emotional continuity (AIC-5E):** operates on the final transcript exactly as
  on typed text. No prosody, tone, stress or crying analysis. How someone
  sounded never establishes emotional state.
- **JourneyContext, grounding, memory, history:** unchanged and shared. No
  voice-specific context, no voice RAG, no voice memory authority, no voice
  transcript persistence to compensate for persistent history being OFF.

### 5.1 Deterministic pronunciation layer (recommended, not built)

Recommended for AIC-7D as a small, pure, fully tested, presentation-only
function applied to canonical text *before* TTS only:

- `999` → "nine nine nine", `111` → "one one one", `A&E` → "A and E",
  `NHS 111` → "NHS one one one"
- markdown list markers → spoken connectives ("Three things matter here.
  First, …"), headings and emphasis markers dropped
- URLs (rare, since links are already stripped) → the source name, never a
  character-by-character URL

Constraints: deterministic, meaning-preserving, never model-generated, unit
tested per rule, and it must not alter the visible canonical text. No source or
trust information may be silently dropped — the trust line is spoken in plain
language or summarised as "based on NHS and approved UK health sources".

---

## 6. Continuity, interruption and history

### 6.1 One conversation

The final transcript becomes an ordinary visible **user** message; the canonical
answer becomes an ordinary visible **assistant** message. No hidden voice-only
turns, no second thread, no second history, no second identity, no voice-specific
conversation ID. `X-Conversation-Id` semantics from AIC-4 are reused unchanged,
and persistent history remains OFF.

### 6.2 Barge-in — manual for v1

Interrupt is a visible control (and the microphone control). On interrupt:

1. stop TTS immediately,
2. abort the in-flight `ai-search` stream via the existing `AbortController`,
3. stop committing any further response content,
4. return to `listening`,
5. keep everything already surfaced.

Automatic VAD barge-in is deferred beyond first release.

### 6.3 Interrupted assistant turn — exact rule (binding for AIC-7)

> **Conversation context contains only canonical assistant text that was
> actually committed to the visible thread at the moment of interruption. There
> is no hidden tail.**

Concretely:

- **A. Text visibly surfaced** — commit exactly that canonical text as the
  assistant message, marked as interrupted for display purposes.
- **B. Text generated but not surfaced** — discarded. Never committed, never
  sent as history.
- **C. Text spoken before interruption** — a subset of A; it does not get its
  own representation. Spoken-vs-displayed divergence is avoided by §2 rather
  than recorded after the fact.
- **D. Generation aborted before any canonical text existed** — no assistant
  message is committed at all (this is today's behaviour: `stop()` discards the
  partial).

Change required in AIC-7E: today `stop()` discards *all* partial text, including
text the reader has already seen. For voice, the visibly surfaced canonical text
should instead be committed. That is a production change and belongs to AIC-7E,
not to this gate.

---

## 7. Microphone lifecycle, privacy and audio data

### 7.1 No background listening

Microphone capture is zero until an explicit tap. Tracks are stopped
immediately when: voice mode ends, the panel closes, the user navigates away,
the component unmounts, the tab becomes hidden, or the device locks
(`visibilitychange` / `pagehide`). Assistant playback pauses on tab hide and
does not resume automatically. No wake word, no ambient monitoring, no
background conversation.

### 7.2 Audio data lifecycle — precise terminology

- **Durable application raw-audio storage: 0**
- **Supabase raw-audio storage: 0**
- **Voice history audio archive: 0**
- **Active-session audio transmission for STT: permitted**, only through the
  approved AIC-7 provider/transport architecture, only while a session is
  active.

Application default: capture in memory / stream → process during the active
voice session → discard. "We do not store audio" is *not* a claim that no
external processor receives or retains audio; that is a separate release gate
(§9).

### 7.3 No voice-derived profiling

Voice biometrics 0, speaker identification 0, voiceprint 0, prosody emotion 0,
stress-from-tone 0, crying detection 0, health/gender/age inference 0. Voice
*content* may be transcribed; voice *characteristics* are never user-profile
evidence.

### 7.4 Session timeout and multiple tabs

An inactivity timeout is needed (session ends, text conversation remains); the
actual duration is calibration for AIC-7E, not an invented number here. For
multiple tabs, the simplest safe behaviour: each tab owns its own session,
entering voice mode is a local action, and no distributed locking is built. The
persistent "Listening" indicator makes concurrent capture visible.

---

## 8. Providers and transport

### 8.1 Browser-native speech APIs

`SpeechRecognition` / `webkitSpeechRecognition`: **not recommended as production
primary** — absent or inconsistent across browsers, weak and opaque on mobile
Safari, opaque provider routing (audio leaves the device to an undisclosed
processor on Chrome), no streaming/endpointing control, poor accuracy on
medication names and numbers. Acceptable only as a *development prototype*.

`speechSynthesis`: **fallback only** — universally present and useful as a
degraded path when the chosen TTS provider fails, but robotic on many devices
and inconsistent in voice selection; not the production voice.

The journal's existing use of these APIs is a different, lower-stakes feature
and carries no architectural weight here.

### 8.2 Adapters

Three small boundaries, functions rather than frameworks:

- `VoiceInputAdapter` — start/stop capture, emit partial and final transcripts.
- `VoiceOutputAdapter` — speak a canonical chunk, stop immediately, report
  failure.
- `VoiceSessionController` — owns the state machine and wires the adapters to
  the existing conversation runtime.

`ai-search` remains the intelligence authority. Swapping any provider must not
touch AIC-5, conversation logic, JourneyContext, grounding or memory governance.

### 8.3 Secrets and feature gates

- No master provider key ever reaches the browser.
- If a direct browser connection to an audio provider is chosen, it must use a
  **server-issued short-lived ephemeral credential** from a new edge function
  (designed in AIC-7A, not built here).
- **Client flag `VITE_COMPANION_VOICE_ENABLED`: security authority NONE.** It
  only decides whether voice UI is offered.
- **Server flag `AI_COMPANION_VOICE_ENABLED`: the authority.** It gates
  issuance of ephemeral credentials and any privileged server voice capability.
  Off means no credential can be minted regardless of client state.
- Voice release must never require changing any AIC-5 safety flag.

---

## 9. Failure behaviour, retries and latency

| Failure | Behaviour |
| --- | --- |
| STT cannot produce a final transcript | Never guess, never submit partial/fabricated text. Offer "try again" or "type instead". No safety routing without an authoritative user turn. |
| `ai-search` fails | Existing error handling; visible message; text fallback; no audio. |
| TTS fails | Keep canonical text displayed. **Never regenerate the answer.** Unobtrusive audio-failure notice; offer replay or continue by text. For RED/CRISIS the safety text stays fully visible. |
| Network loss mid-answer | Commit what was canonically surfaced (§6.3); allow retry of the request, never silent replay of audio. |

Retry boundaries (finite, no infinite loops, no hidden re-sending of microphone
audio): ephemeral credential issuance — 1 retry; STT session establishment — 1
retry then fall back to text; single transcription request — 0 automatic
retries, user-initiated repeat instead; `ai-search` — existing user-initiated
retry only; TTS — 1 retry then fall back to native `speechSynthesis`, then text.

Latency: AIC-7 must measure four segments separately — speech end → final
transcript; final transcript → first `ai-search` token; first canonical
speakable chunk → first playable audio; speech end → first assistant audio —
plus interrupt-to-silence latency. Qualitative targets only until measured:
*responsive* (feels conversational), *acceptable* (noticeable but calm),
*degraded* (offer text). Perceived latency is managed visually; deterministic
non-semantic cues are permitted, generated spoken filler is not.

---

## 10. Accessibility, controls and output style

- Voice is optional; every piece of information remains available as text.
- Always-visible transcript (partial while listening, final once settled),
  keyboard-operable controls, screen-reader state labels, non-colour state
  indication (label + icon + motion), reduced-motion support, an always-present
  stop-audio control.
- v1 controls: end voice, stop listening / mute, interrupt, switch to text,
  replay current answer. Deferred: playback speed, voice selection, pause.
- Output style: warm, calm, natural, concise, steady; no filler, no theatrics,
  no whispering. Spoken answers lead with the answer, use short sentences and
  two or three points, then offer more detail — **without reducing medical
  completeness**. The prompt hint that encourages this is proposed for AIC-7D
  and is deliberately not written during this gate.
- Voice selection: launch with **one** carefully chosen UK-appropriate voice
  (trustworthy, warm, clear, unhurried). No celebrity or cloned voice. A small
  selectable set can follow validation. The companion's existing name and
  identity carry across text and voice; voice invents no new persona.

---

## 11. Mis-transcription risk

This risk cannot be eliminated and must not be presented as solved. Higher-risk
categories: negation ("no bleeding" vs "bleeding"), medication names, dosages,
gestational weeks, dates, temperatures, blood-pressure numbers, phone numbers,
and safety-critical phrasing.

Mandatory mitigations: the visible transcript, effortless correction, and a
low-friction repeat. Transcript correction recommendation: **Option B —
auto-send with easy correction afterwards**, because per-turn confirmation
destroys conversational flow. Any confidence-triggered confirmation stays
provider- and evidence-dependent; no clinical confidence threshold is invented
here.

AIC-7F must build a synthetic safety-critical transcription corpus and measure
actual provider behaviour on it, plus test spoken RED, CRISIS, safeguarding,
clarification, unsupported, an AMBER test-only fixture, emotional wording,
interruption during an urgent answer, TTS failure during an urgent answer and
network failure during an urgent answer.

Background noise (children, TV, traffic, other adults): manual session controls
plus the visible transcript are sufficient for first release. No diarisation, no
speaker identification. Users may be around other people; the product makes no
privacy claim about the room and offers a visible speaker/mute control and a
text fallback.

---

## 12. Cost and device matrix

Costs to capture in controlled AIC-7 development testing (no invented prices):
STT seconds per session and per turn, TTS characters per answer, existing model
tokens per turn, realtime session minutes if Option D is later adopted, and
average turns per voice session. Production analytics remain separately governed
— voice analytics stay at 0 in this gate.

Minimum production test matrix: iOS Safari, Android Chrome, desktop Chrome,
desktop Safari, desktop Edge — each for microphone permission, audio playback,
autoplay/gesture restrictions, Bluetooth and wired headsets, and background/lock
behaviour. No support is claimed before it is tested.

---

## 13. Architecture options assessed

**Option A — turn-based STT + current endpoint + TTS.** Safety: excellent.
Complexity: lowest. Mobile support: best. Interruptibility: adequate. Latency:
worst (whole utterance uploaded, whole answer generated, then whole answer
synthesised). Provider dependence: low. Continuity: perfect. Verdict: safe but
noticeably slow; a reasonable fallback path, not the target.

**Option B — streaming STT + current endpoint + chunked TTS.** Safety:
identical to A (`ai-search` sits between user speech and assistant speech).
Latency: materially better; speech starts on the first canonical sentence.
Transcript: available live for display. Interruption: clean, using the existing
`AbortController`. Provider dependence: contained behind adapters. Complexity:
moderate — the real work is the canonical chunk boundary (§2) and endpointing.
Verdict: **selected.**

**Option C — native end-to-end realtime speech model.** Best naturalness and
latency, but the model produces speech directly, so deterministic RED/CRISIS
wording, AIC-5C boundaries, AMBER, emotional continuity, grounding governance
and prompt control cannot be guaranteed *before* audio reaches the user.
Transcript visibility and auditability weaken; provider lock-in is high.
Answer to the critical question — *can every assistant response still be subject
to the authoritative AIC-5 architecture before speech is presented?* — **No.**
Therefore Option C must not be the response brain.

**Option D — realtime transport with server safety orchestration.** Uses a
realtime session for audio transport, VAD, transcription and audio rendering
while `ai-search` remains the response brain. Plausibly combines naturalness
with the existing safety authority, but requires ephemeral credentials, a new
edge function, and provider-specific control over "do not let the realtime model
answer". Verdict: **future upgrade candidate**, evaluated after Option B ships
and after provider due diligence.

**Primary architecture for AIC-7: B.** Deferred to a later realtime upgrade:
automatic VAD barge-in, duplex overlap, and Option D transport.

**Future speech-to-speech invariant.** Any future speech-to-speech
implementation may replace the mediated architecture only if it can prove that
every assistant utterance passes the authoritative AIC-5 decision *before* audio
is presented, that deterministic RED/CRISIS wording is rendered verbatim, and
that a canonical text transcript exists for every spoken answer. Absent that
proof, speech-to-speech remains transport and presentation only.

---

## 14. Proposed ADRs

Six ADRs are proposed under `docs/ai/adr/`, all **PROPOSED** — none may be
marked ACCEPTED until implementation proves them:

1. ADR-AIC6-01 — Voice is transport, not a separate brain.
2. ADR-AIC6-02 — Canonical text is the assistant response; speech renders it.
3. ADR-AIC6-03 — No assistant audio before safety routing.
4. ADR-AIC6-04 — Raw audio is ephemeral by default.
5. ADR-AIC6-05 — Voice and text share one conversation.
6. ADR-AIC6-06 — Provider master secrets never live in the browser.

---

## 15. Privacy and legal release gates (unanswered — must be resolved in AIC-7G)

No provider is selected in this gate, and no answers are invented. Before
production voice:

- provider audio retention policy and configurable retention period
- transcript retention policy
- training / data-use policy (must be opt-out or contractually excluded)
- regional processing and data residency (UK/EU expectation)
- DPA availability and sub-processor list
- deletion guarantees and deletion request mechanics
- ephemeral credential model and provider security posture
- alignment with the site's existing privacy notice and consent model

No provider may be approved on voice quality or latency alone.

---

## 16. AIC-7 build sequence (proposed, not started)

| Slice | Content |
| --- | --- |
| AIC-7A | Voice infrastructure: two-sided feature gate, `VoiceSessionController`, state machine, contracts, provider seam (CLOSED — see §18; bootstrap endpoint deferred to provider selection) |
| AIC-7B | Microphone capture, streaming STT adapter, partial/final transcript UI, permission and no-speech handling |
| AIC-7C | Shared-conversation integration: final transcript → existing runtime → `ai-search`, one thread, no new IDs |
| AIC-7D | Canonical chunk processing (§2), deterministic pronunciation layer, streaming TTS adapter, spoken-length prompt hint |
| AIC-7E | Turn-taking calibration, manual interruption, abort/history alignment rule (§6.3), session timeout |
| AIC-7F | Voice safety, failure and mis-transcription validation, including the safety-critical transcription corpus |
| AIC-7G | Browser/device QA, latency and cost measurement, privacy/provider release gate |

---

## 17. Frozen state at the close of AIC-6

`AI_AMBER_CLASSIFIER_ENABLED` OFF; production AMBER release GATED;
`AI_SOURCE_ROUTING_VERSION` `30B-source-routing-v1`; grounding candidates 0,
approvals 0, eligible slugs []; memory flags OFF; persistent-history flags OFF;
safety-state persistence 0; emotion persistence 0; voice persistence 0; durable
application raw-audio persistence 0; voice analytics 0; DB migrations 0;
production voice code 0.

---

## 18. AIC-7A — implemented infrastructure foundation

AIC-7A added the controlled foundation only. **No usable voice experience
exists.** There is no microphone capture, no STT, no TTS, no provider, no
transport, no voice UI, no `/voice` route, no prompt change, no `ai-search`
change, no database change and no analytics.

### 18.1 Terminology correction (documentation only)

The invariant is **NO ASSISTANT AUDIO BEFORE SAFETY ROUTING RESOLVES**, not the
ambiguous "no audio before safety routing resolves". User microphone audio must
necessarily be captured and transmitted for STT before a final transcript
exists. What must be zero is *assistant speech* until an authoritative
transcript has passed through the shared AI/safety route and produced canonical
assistant text. AIC-6 is not reopened by this clarification.

### 18.2 Release gates

| Gate | Value | Authority |
| --- | --- | --- |
| `VITE_COMPANION_VOICE_ENABLED` | OFF (default) | **NONE.** Controls whether voice UI/runtime is offered. Not a security boundary. |
| `AI_COMPANION_VOICE_ENABLED` | Reserved, OFF | The authority for privileged voice capability. |

- SERVER VOICE FLAG CONTRACT: DEFINED / RESERVED
- SERVER VOICE FLAG RUNTIME ENFORCEMENT: DEFERRED UNTIL FIRST PRIVILEGED SERVER VOICE CAPABILITY
- CURRENT PRIVILEGED SERVER VOICE CAPABILITY: 0
- VOICE BOOTSTRAP ENDPOINT: DEFERRED TO PROVIDER SELECTION

No backend code was written merely to read a variable that gates nothing yet.
When the first privileged capability exists (ephemeral credential issuance,
provider session creation, voice bootstrap), the server gate must enforce it;
the browser flag may never substitute for it.

Both gates are independent of `AI_AMBER_CLASSIFIER_ENABLED`, the memory flags,
the persistent-history flags and grounding routing.

### 18.3 Files

| File | Role |
| --- | --- |
| `src/lib/companion/voice/voiceFlags.ts` | Client gate, server gate name, authority documentation |
| `src/lib/companion/voice/voiceContracts.ts` | Transcript, canonical-text, speakable-chunk and committed-record contracts |
| `src/lib/companion/voice/voiceState.ts` | Pure state machine and legal transition table |
| `src/lib/companion/voice/voiceSessionController.ts` | Provider-neutral session lifecycle and cleanup |
| `src/lib/companion/voice/voiceAdapters.ts` | Minimal input/output adapter seam plus no-op defaults |
| `src/test/companionVoiceInfrastructure.test.ts` | 26 focused infrastructure tests |

### 18.4 State machine

States: `idle`, `requesting_permission`, `listening`, `thinking`, `speaking`,
`interrupted`, `permission_denied`, `no_speech`, `network_error`,
`speech_output_error`, `ended`. All eleven approved states are implemented; none
were merged or added.

An illegal transition returns the current state unchanged (no throw), and a test
proves no single illegal transition can reach the privileged states `listening`
or `speaking`. `ended` is terminal for a controller instance: a later voice
session creates a new controller rather than reviving a finished one.

### 18.5 Session controller and cleanup

Responsibilities: `start`, `transition`, `abort`, `stopCapture`, `stopOutput`,
`end`, `handleVisibilityHidden`, `handleUnmount`. Resources are injected, so
cleanup is tested with fakes and no real `MediaStream` is ever created.

Cleanup is idempotent: across visibility-hidden, unmount and repeated explicit
end calls, capture stops at most once, output stops at most once, the active
operation aborts at most once, nothing throws, nothing restarts, and the session
converges on `ended`. No visibility listener is wired into the application yet —
that arrives with the functional slice that needs it. No background listening,
no wake word.

### 18.6 Contracts

- `PartialTranscript` — display only, structurally distinct, cannot be passed
  where a `FinalTranscript` is required (proved with a `@ts-expect-error` test).
- `FinalTranscript` — the authoritative user turn.
- `CanonicalAssistantText` — a branded type constructible **only** through
  `canonicaliseAssistantText`, which runs the existing `sanitiseAnswerForDisplay`
  boundary. There is no `text as CanonicalAssistantText` helper.
  CANONICAL ASSISTANT TEXT CONSTRUCTION ESCAPE HATCHES: 0.
- `SpeakableChunk` — only obtainable from canonical text via
  `toSpeakableChunk`. RAW SSE → SPEAKABLE CHUNK DIRECT PATH: 0.
- `CommittedAssistantRecord` — `messageId`, `canonicalText`, `interrupted`
  only. No `fullGeneratedAnswer`, `unsurfacedTail`, `hiddenCompletion` or
  `remainingModelText`. HIDDEN UNSURFACED ASSISTANT TAIL REPRESENTABLE: NO.
  The behavioural interruption integration remains AIC-7E.

### 18.7 Conversation seam (documented, not wired)

AIC-7C will pass `FinalTranscript.text` to the existing `send(question)` of
`useCompanionConversation` — the same path typed input uses. No
`sendVoiceMessage`, no `voiceConversation`, no `voiceHistory`, no
`voiceThread`, no voice-specific conversation id, no duplicated conversation
logic. Nothing in `useCompanionConversation` was changed in AIC-7A.

### 18.8 Boundaries held

Voice persistence 0 (no database, conversation metadata, memory or
localStorage). Durable application raw-audio storage 0; Supabase raw-audio
storage 0; voice audio archive 0. Voice analytics 0. No coupling to
`SlotVoiceMemory`, `weekMedia` or `useWeekMedia` — journal voice notes and
companion voice remain separate products. No `getUserMedia`, `MediaRecorder`,
`SpeechRecognition`, `speechSynthesis`, WebRTC, WebSocket or provider SDK. No
browser provider master secret. No voice biometrics, speaker identification,
voiceprint, prosody emotion analysis, or health, age or gender inference from
audio.
