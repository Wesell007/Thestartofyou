# Roadmap

## Completed
- WC-3a — Shared Breadcrumb Foundation — CLOSED PASS
- WC-3b — Existing Breadcrumb Migration — CLOSED PASS
- WC-3c — Canonical Breadcrumb Coverage & Hierarchy — CLOSED PASS (see debt below)
- WC-3d — BreadcrumbList Structured Data Integration — CLOSED PASS (resolved families only)
- WC-3e — Final Navigation / IA Corrections — CLOSED PASS. WC-3 — CLOSED PASS.
- WC-4 — Companion / Ask Experience Consolidation — CLOSED PASS. WEBSITE COMPLETION — CLOSED PASS.

## Carry-forward: dead components (do not delete without review)
- `src/components/week/WeekHero.tsx` — unreachable; live week experience is `Week1Page…Week42Page` via `PregnancyWeekRoute.tsx`
- `src/components/trimester/TrimesterHero.tsx` — unreachable; live trimester heroes are `FirstTriHero`/`SecondTriHero`/`ThirdTriHero`

## Debt
- Legacy article hierarchy: 156 articles in `/articles/:slug`, 87 with authoritative topic ownership, 69 unresolved (54 TTC, 4 pregnancy, 3 postpartum, 3 preparing-for-baby, 2 IVF, 2 first-year, 1 support).
  `ArticleHeader.tsx` and `FlagshipHero.tsx` remain WC-3c/WC-3d DEFERRED — AUTHORITATIVE ARTICLE TOPIC DATA REQUIRED, so `/articles/:slug` has no visible trail and no BreadcrumbList.
  Proposal recorded only: optional `journeyTopic: { journey; topicSlug }` field on `ArticleData`; nine non-Pregnancy/TTC/IVF journey articles need a product decision.

## Closed
- AIC-1 — CLOSED PASS. Authoritative architecture doc `docs/ai/companion-architecture.md` + minimum shared foundation: `src/lib/companion/companionRequest.ts` (single request boundary, shared mode resolution). `/ask` mode fork removed (previously always `general`). Backend, prompts, grounding, UI and privacy boundaries unchanged.

## Not started
- AIC-2 Journey Context (SAFE TO BEGIN), AIC-3 Permissioned Memory, AIC-4 Conversation Continuity, AIC-5 Safety/Emotional Intelligence, AIC-6/7 Voice — do not begin before AIC-1 closes.

- AIC-2 — Journey Context: CLOSED PASS (structured provenance-separated context, shared personal resolver, strict server validation, ai-search deployed and smoke-tested). AIC-3 not started.
- Debt: pregnancy-week formula still duplicated in MyWeek/MyJourney/KeptChapter (canonical helper now at src/lib/pregnancyWeek.ts, pages intentionally unrefactored).

- AIC-3 — Permissioned Memory: CLOSED PASS (implementation), RELEASE STILL GATED.
  Built: `companion_memories` table (DB-owned ownership, generated normalised value, owner-only RLS, 50-row cap, credential backstop, account-delete cascade); pure policy + intent layers, shared `useCompanionMemoryInteraction`, confirmation UI on both surfaces, `/account` management section, export inclusion; `ai-search` user-token retrieval behind authoritative `AI_MEMORY_ENABLED` with an escaped `<permissioned_memory>` block. Docs: `docs/ai/companion-memory.md`, `docs/ai/adr/ADR-AIC3.md`.
  Flags: `VITE_COMPANION_MEMORY_ENABLED` (client UX) and `AI_MEMORY_ENABLED` (server, authoritative) are both OFF. Release remains blocked by the outstanding legal/privacy review in `docs/ai/memory-mvp-readiness.md`.
  Deferred by design: `confirmed_suggestion` source, suggested memories, conversation history (AIC-4), emotional modelling (AIC-5), voice (AIC-6/7).

## In progress
- AIC-4 — CLOSED PASS (implementation; persistent history remains flag-gated OFF). Conversation Continuity: one shared conversation runtime across CompanionPanel and /ask; session continuity for anonymous and signed-in-with-persistence-off; flag-gated account-owned persistent history (`companion_conversations` / `companion_messages`, owner-only RLS with parent-conversation ownership enforcement); bounded escaped `<conversation_history>` prompt block; AskPage pseudo-continuity removal; New/Clear/Delete conversation UI; docs + ADR-AIC4-01…11.

- AIC-5 AUDIT — CLOSED PASS (audit/documentation only; no production safety or AI runtime code changed). Deliverables: `docs/ai/companion-safety-emotional-continuity.md`, `docs/ai/companion-architecture.md` safety section, `docs/ai/adr/ADR-AIC5-proposals.md` (ADR-AIC5-01…08, all PROPOSED).
  Carried forward: (1) rate limit before urgent routing — REACHABLE SAFETY GAP; (2) `first_year_day_recap` escalation suppression — CONDITIONALLY REACHABLE via crafted mode; (3) persistence before safety — retention observation, no current impact; (4) urgent before `AI_SEARCH_DISABLED` — positive property to preserve; (5) AMBER — principal missing state; (6) deterministic RED/CRISIS cannot be downgraded; (7) classifier dependency OPTIONAL; (8) emotional and safety-state persistence remain 0; (9) preview `useCompanion must be used inside CompanionProvider` — NOT REPRODUCIBLE, watch item; (10) grounding frozen at `30B-source-routing-v1` (0 candidates, 0 approvals) and all memory/history flags remain OFF.
  Next recommended build phase: AIC-5A — Deterministic Safety Foundation. AIC-6/7 NOT STARTED.
- AIC-5A DETERMINISTIC SAFETY FOUNDATION — CLOSED PASS. Shared `decideSafety` router (`_shared/safetyRouter.ts` + `_shared/safetyState.ts`) runs before rate limiting, persistence, mode behaviour and the kill switch; RED/CRISIS survive quota exhaustion, limiter failure, recap mode and a paused companion with zero model/grounding calls. Audit gaps 5.1 and 5.2 resolved; 5.4 preserved. No classifier, AMBER, UNSUPPORTED, emotional modelling, UI, grounding, memory or history changes; memory/history flags remain OFF. ADR-AIC5-01/02 ACCEPTED, 03…08 still PROPOSED.
  Next: AIC-5B Structured Output Probe. NOT STARTED.
- AIC-5B STRUCTURED OUTPUT FEASIBILITY — CLOSED PASS (controlled probe only; 0 production runtime changes, 0 deployments). Dev-only probe `scripts/probes/safetyStructuredOutputProbe.ts` + pure validator `src/lib/safety/safetyClassifierProbeSchema.ts` (0 production imports). Evidence on the production gateway path (`ai.gateway.lovable.dev/v1/chat/completions`, `google/gemini-2.5-flash`, temperature 0): strict `json_schema` accepted and enforced — 25/25 structurally valid including schema-conflict and injection cases, malformed schema rejected 400, plain `json_object` mode 0/8 valid. STRUCTURED OUTPUT — SUPPORTED; classifier FEASIBLE but dependency remains OPTIONAL (AIC-5D decides). ADR-AIC5-08 ACCEPTED, ADR-AIC5-06 resolved; 03…07 still PROPOSED. Frozen: source routing `30B-source-routing-v1`, grounding 0/0, eligible slugs [], memory/history flags OFF, safety and emotion persistence 0.
  Next: AIC-5C. NOT STARTED.

- AIC-5C UNSUPPORTED + CLARIFICATION CONSOLIDATION — CLOSED PASS. Shared server boundary (`_shared/clarificationRules.ts` + `_shared/companionBoundaryRules.ts`) owns clarification and a precision-first UNSUPPORTED capability boundary for every surface; runs GREEN-only after `decideSafety`, ordinary quota and the kill switch, before any grounding or model call. Structured transport via `X-Companion-Boundary` / `X-Companion-Clarification-Topic` headers — 0 prose markers. Client is display-only (`src/lib/companion/clarificationDisplay.ts`); `src/lib/askClarification.ts` DELETED, 0 remaining client decision authority. Bounded relevant-history referent rule reuses the AIC-4 turns already loaded (no second store, conservative: unrelated/empty/failed history clarifies). Validation: 84 files / 891 tests, typecheck + build pass, lint baseline unchanged (1 pre-existing generated-file error, 10 pre-existing warnings). Deployed: `ai-search` only; live smoke tests confirmed clarify, both unsupported categories and an unaffected ordinary answer. No classifier, AMBER, UNSUPPORTED-state expansion, migration, analytics, raw logging or UI redesign. ADR-AIC5-09/10 ACCEPTED; frozen systems (grounding `30B-source-routing-v1` 0/0, memory/history flags OFF, JourneyContext) unchanged.
  Next: AIC-5D AMBER / Reassurance / Uncertainty. NOT STARTED.

  Original scope: Move authoritative clarification decisions from `src/lib/askClarification.ts` into shared server modules consumed by `ai-search`; add a precision-first deterministic UNSUPPORTED capability boundary (diagnosis/prescribing action, unavailable external action); structured (non-prose) clarification metadata transport to the browser; client becomes display-only. No classifier, no AMBER, no UI redesign, no migration.

- AIC-5D — AMBER, uncertainty & reassurance: selective hybrid build (deterministic
  eligibility gate, release-gated structured GREEN→AMBER classifier, trusted AMBER and
  cautious-uncertainty guidance, global no-definitive-medical-verdict rule). Engineering
  slice; production classifier release stays gated behind AI_AMBER_CLASSIFIER_ENABLED=OFF.

- AIC-5D CLOSURE VALIDATION — CLOSED PASS. Route A direct isolated actual-module proof of
  `_shared/amberClassifier.ts` against the real gateway (`google/gemini-2.5-flash`, stream false,
  temperature 0, strict json_schema, max_tokens 512, 1500 ms AbortController, 0 retries):
  green 999 ms, amber 1200 ms, amber 1104 ms; production config untouched, flag OFF throughout.
  Closure tests added (12): first-year conflict + routine restraint + recap semantics, flag-OFF
  semantics, real AbortController timeout branch, no-substring-censorship, exact guidance
  injection counts. 86 files / 929 tests (from 86 / 917); 0 production source changes,
  0 deployments, 0 migrations, 0 client changes. ADR-AIC5-11 ACCEPTED (engineering only);
  PRODUCTION AMBER CLASSIFIER RELEASE — GATED, AI_AMBER_CLASSIFIER_ENABLED = OFF.
  Next: AIC-5E. NOT STARTED.

- TYPECHECK BASELINE RESTORATION — CLOSED PASS (validation tooling only; 0 production runtime
  changes, 0 deployments, 0 migrations). Audit trail, preserved intentionally: the original
  AIC-5D implementation report recorded `npm run typecheck` PASS; that result was invalid,
  produced by stale `tsconfig.app.tsbuildinfo` incremental state. A clean-cache run exposed 18
  errors, all in `supabase/functions/ai-search/index.ts` (1 x TS2307 remote Deno std import,
  14 x TS2304 `Deno` global, 3 x TS2339 discriminated-union narrowing). Root cause: the AIC-5D
  test `src/test/aiSearchAmberRouting.test.ts` used a static-literal dynamic import of the edge
  function, pulling Deno code into the browser TypeScript project (`tsconfig.app.json`,
  strict false), unlike the three existing endpoint tests which deliberately use a non-literal
  `endpointModule` specifier. Fix: restored that established non-literal convention in the one
  test; the real shipped `ai-search/index.ts` still executes under Vitest via the Deno `serve`
  stub, 0 assertions weakened, 0 tests removed. Cache cleared: `tsconfig.app.tsbuildinfo`,
  `tsconfig.node.tsbuildinfo`. Clean-cache typecheck PASS, repeat run PASS; 86 files / 929 tests
  PASS; lint at known baseline (1 generated-file prefer-const error, 10 react-refresh warnings,
  0 new); build PASS.
  Deno-specific check (read-only, `deno check --no-lock supabase/functions/ai-search/index.ts`,
  deno 2.6.10): the 3 TS2339 narrowing errors did NOT reproduce, confirming they were
  wrong-project-environment artifacts. It did surface one separate strict-mode finding not
  visible to the app project — TS2322 at index.ts:642, optional `X-Conversation-Id` header in an
  object literal widened to `string | undefined` against `HeadersInit`. Reported, NOT fixed:
  production source is out of scope for this slice. No runtime failure is implied (the deployed
  function runs under the Supabase Deno toolchain); carried forward as a type-only debt item.
  AIC-5D ENGINEERING — FORMALLY CLOSED PASS. PRODUCTION AMBER CLASSIFIER RELEASE — GATED.
  AI_AMBER_CLASSIFIER_ENABLED — OFF. AIC-5E — SAFE TO BEGIN. NOT STARTED.

- AIC-5D FINAL DENO TYPECHECK DEBT FIX — CLOSED PASS. Chronology preserved: (1) original AIC-5D
  typecheck reported PASS, (2) stale incremental cache made that unreliable, (3) fresh app
  typecheck exposed 18 cross-runtime errors, (4) the static-literal endpoint-test import was
  identified, (5) the non-literal import boundary was restored, (6) clean app typecheck passed,
  (7) Deno check then exposed one genuine `HeadersInit` TS2322 at ai-search/index.ts:642,
  (8) `conversationHeader` was given the correct `Record<string, string>` annotation (type-only;
  header still present with the same id when a conversation exists, absent otherwise; no empty or
  "undefined" value), (9) `DENO_DIR=/tmp/denodir deno check --no-lock
  supabase/functions/ai-search/index.ts` PASS / 0 errors, (10) clean-cache `npm run typecheck`
  PASS and repeat run PASS, (11) 86 files / 931 tests PASS (929 + 2 focused conditional-header
  assertions; 0 assertions weakened, 0 skips), lint baseline only (1 generated-file prefer-const
  error, 10 react-refresh warnings), build PASS, (12) `ai-search` redeployed; smoke: ordinary
  stream OK, clarify boundary headers unchanged, RED deterministic escalation unchanged.
  Frozen: source routing `30B-source-routing-v1`, grounding 0/0, eligible slugs [], memory and
  persistent-history flags OFF, telemetry/persistence/migrations/UI/quota changes 0.
  AIC-5D FORMALLY CLOSED PASS. PRODUCTION AMBER CLASSIFIER RELEASE — GATED.
  AI_AMBER_CLASSIFIER_ENABLED — OFF. AIC-5E — SAFE TO BEGIN. NOT STARTED.

- AIC-5E — EMOTIONAL CONTINUITY — CLOSED PASS.
  Option B shipped: `_shared/emotionalEvidence.ts` (deterministic, request-scoped, explicit
  user-authored emotion only, tight experiencer binding, max two ordered categories, generic/
  quoted/hypothetical/definitional exclusions, precision-first ellipses, narrow continuation
  signals, most-recent-user-turn history only, current-turn and directional override, fail-open)
  and `_shared/emotionalGuidance.ts` (fixed trusted guidance, zero raw user text, category tone
  rules, overwhelm-only structural simplification, nuanced anti-repetition, explicit statement
  that safety outranks tone). Wired into `ai-search` on the ordinary model path only, rendered
  before the global reassurance rule and any AMBER block.
  Unchanged: RED/CRISIS wording and routing, clarification and UNSUPPORTED answers and headers,
  quota, kill switch, grounding `30B-source-routing-v1`, memory and persistent-history flags,
  client contract. Added: 0 model calls, 0 migrations, 0 telemetry, 0 persistence, 0 UI changes.
  Validation: 88 files / 990 tests PASS (47 detector/guidance + 12 endpoint tests added), clean
  `npm run typecheck` PASS, `deno check` on ai-search PASS / 0 errors, lint baseline only
  (1 generated-file prefer-const error, 10 react-refresh warnings), build PASS.
  Deployed `ai-search` only; live smoke: emotional question answered with acknowledgement then
  substance, neutral question unchanged, RED escalation deterministic and unchanged, clarify
  headers unchanged. AI_AMBER_CLASSIFIER_ENABLED — OFF. AIC-5F and AIC-6 — NOT STARTED.

- AIC-5E — TEST HARNESS STABILISATION (closure blocker) — CLOSED PASS.
  History, retained in full: AIC-5E implementation added 59 passing tests (47
  `emotionalEvidence`, 12 `aiSearchEmotionalContinuity`). The first formal full-suite closure run
  exposed 3 timeouts across two pre-existing WC-era suites (`src/test/companionSurfaces.test.tsx`,
  `src/pages/MemorySettingsPrototype.test.tsx`); isolated re-runs of those files passed 19/19. A
  second default `npm test` run reproduced 1 timeout in the same harness family
  (companionSurfaces, "opens the panel only from the launcher"). Diagnosis: heavy in-test dynamic
  component imports (`CompanionProvider`, `CompanionLauncher`, `CompanionPanel`, `Navbar`) had
  their Vite transform/import cost charged to the individual 5000 ms test budget under worker
  contention (run aggregates: transform 99.6 s, import 218.8 s, environment 1416.9 s vs tests
  48.6 s). AIC-5E production code was never implicated; no AIC-5E test ever failed.
  Fix (test-only): the four dynamic imports in `companionSurfaces.test.tsx` were hoisted to
  module scope so transformation happens during collection. Import-order audit confirmed this was
  safe — the file's single `vi.mock("@/hooks/useCompanionIdentity")` is hoisted above imports by
  Vitest and there is no `vi.doMock`, `vi.resetModules`, `vi.unmock`, module-cache assumption or
  pre-import environment mutation. `MemorySettingsPrototype.test.tsx` was inspected and already
  uses module-scope imports only, so it was left unchanged (no avoidable in-test import work).
  No timeout increases, no worker/concurrency changes, no retries, no skips/todos, no assertion
  or behaviour changes. Production files changed: 0. Deployment: none.
  Validation: focused pair 2 files / 19 tests PASS in 7.11 s (companionSurfaces file 1060 ms);
  standard `npm test` 88 files / 990 tests / 990 PASS / 0 failed / 0 timed out in 105.2 s;
  `npm run typecheck` PASS / 0 errors; lint known baseline only (1 generated-file prefer-const
  error, 10 react-refresh warnings), 0 new findings.
  Frozen: AI_AMBER_CLASSIFIER_ENABLED OFF, AMBER production release GATED,
  AI_SOURCE_ROUTING_VERSION `30B-source-routing-v1`, grounding candidates 0, approvals 0,
  eligible slugs [], memory flags OFF, persistent-history flags OFF, emotion persistence 0,
  emotion analytics 0, emotion model calls 0.
  AIC-5E ENGINEERING — FORMALLY CLOSED PASS. AIC-5F — SAFE TO BEGIN, NOT STARTED. AIC-6 — NOT STARTED.

- AIC-5F — FINAL SAFETY VERIFICATION — CLOSED PASS.
  Verification only. Production source changes: 0. New safety architecture: 0. New headers: 0.
  New persistence: 0. Timeout/worker/concurrency changes: 0. Skips/todos: 0. Weakened assertions: 0.
  Source audit confirmed the shipped `ai-search` order: validation → `decideSafety` → deterministic
  RED/CRISIS/safeguarding terminal branch → GREEN rate limiting (one invocation, two fixed windows)
  → conversation setup → GREEN-only kill switch → one bounded history load → AIC-5C clarification /
  UNSUPPORTED → API key → AIC-5D eligibility + gated classifier → AIC-5E tone → grounding →
  journey context / memory / history → streamed model call. Trusted prompt order verified against
  the assembled prompt: mode → journey → memory → history → tone → GLOBAL_REASSURANCE_RULE →
  AMBER/cautious guidance last.
  New suite: `src/test/aiSearchSafetyComposition.test.ts`, 46 cross-phase tests (terminal routes,
  quota/kill-switch precedence, boundary precedence, AMBER call matrix and all four failure modes,
  tone-only emotion, evidence/trust boundaries, injection resistance, prompt precedence, header /
  answer / log leakage). Four initial failures were test-fixture assumptions, not product defects
  (two limiter windows per request; concern wording rather than emotion drives eligibility;
  clarification applies to bare topic terms only; journey context requires `version`). No genuine
  production safety invariant failed, so the CRITICAL DEFECT RULE was not triggered.
  Eval audit (`docs/ai/eval-dataset-v1.json`): 94 prompts — green 29, red 27, unsupported 14,
  amber 12, ambiguous 7, crisis 5; escalation expected 42; clarification expected 7. No additions
  were needed. ADR-01..11 reconciled honestly in `docs/ai/adr/ADR-AIC5-proposals.md`
  (03/04/05 remain PROPOSED; behaviour verified but never formally adopted).
  Documentation: `docs/ai/companion-safety-final-verification.md` added.
  Validation: `npm test` 89 files / 1036 tests / 1036 PASS / 0 failed / 0 timed out in 95.8 s;
  `npm run typecheck` PASS twice (0 errors); `deno check supabase/functions/ai-search/index.ts`
  PASS (0 errors); lint known baseline only (1 generated-file prefer-const error, 10 react-refresh
  warnings); build PASS (pre-existing chunk-size warning only).
  Production smoke (no deployment, no AMBER activation): ordinary streamed answer 200 with no
  boundary header; `sleep` → `x-companion-boundary: clarify`, topic `sleep`; booking request →
  `x-companion-boundary: unsupported` with the fixed answer; RED → deterministic urgent answer with
  no boundary header. Exposed headers exactly
  `X-Conversation-Id, X-Companion-Boundary, X-Companion-Clarification-Topic`.
  Frozen: AI_AMBER_CLASSIFIER_ENABLED OFF, AMBER release GATED, AI_SOURCE_ROUTING_VERSION
  `30B-source-routing-v1`, grounding candidates 0 / approvals 0 / eligible slugs [], memory flags
  OFF, persistent-history flags OFF, emotion persistence 0, emotion analytics 0, emotion model
  calls 0.
  AIC-5F — CLOSED PASS. AIC-5 SAFETY PROGRAMME — COMPLETE. AIC-6 — SAFE TO BEGIN, NOT STARTED.

- AIC-6 — VOICE UX & ARCHITECTURE GATE — CLOSED (architecture only).
  Documentation and architecture only. Production source changed 0, tests changed 0,
  DB migrations 0, production voice code 0, voice analytics 0, durable application
  raw-audio persistence 0.
  Audit: companion voice functionality 0; no audio/speech dependency in package.json; no
  companion microphone, STT, TTS, WebSocket, WebRTC or AudioContext code. Existing speech/audio
  code is journal-only and unrelated: `SlotVoiceMemory.tsx` (getUserMedia + MediaRecorder),
  `SlotReflection.tsx` / `SlotReflectionAssistant.tsx` (browser SpeechRecognition dictation),
  `weekMedia.ts` / `useWeekMedia.ts` (journal media, explicitly no transcription/AI).
  Canonical-text finding: the committed assistant message is the raw accumulated SSE text, while
  `sanitiseAnswerForDisplay` runs at render time (CompanionMessageList, AskPage,
  TTCAskCompanionCard, FirstYearAskCompanion). Therefore RAW SSE TOKENS → TTS: NO. Speech renders
  the canonical (sanitised, displayed) text; chunked speech canonicalises a completed sentence
  first and reconciles at stream end.
  Interrupted-turn rule: conversation context contains only canonical assistant text actually
  committed/surfaced; generated-but-unsurfaced text is discarded; no hidden tail. Today `stop()`
  discards all partial text — committing the surfaced portion is AIC-7E work, not done here.
  Decisions: interaction model B (explicit tap-to-enter voice session); primary architecture B
  (streaming STT → final transcript → ai-search → canonical streamed text → chunked TTS);
  Option D (realtime transport with server safety orchestration) is the future upgrade candidate;
  Option C rejected as response brain (cannot guarantee AIC-5 mediation before speech).
  Manual barge-in for v1; final transcript authoritative; partial transcript display only;
  no pre-safety audio; deterministic RED/CRISIS spoken verbatim with text always visible;
  presentation-only pronunciation layer recommended for AIC-7D; browser-native STT = prototype
  only, `speechSynthesis` = fallback only; two-sided gate `VITE_COMPANION_VOICE_ENABLED`
  (no security authority) + `AI_COMPANION_VOICE_ENABLED` (authority, gates ephemeral credentials).
  No voice biometrics, no prosody/emotion-from-tone, no diarisation, no background listening.
  Docs added: `docs/ai/companion-voice-architecture.md`; ADR-AIC6-01..06 under `docs/ai/adr/`
  (all PROPOSED). `docs/ai/companion-architecture.md` gained a proposed voice-transport section.
  Frozen: AI_AMBER_CLASSIFIER_ENABLED OFF, AMBER release GATED, AI_SOURCE_ROUTING_VERSION
  `30B-source-routing-v1`, grounding candidates 0 / approvals 0 / eligible slugs [], memory flags
  OFF, persistent-history flags OFF, safety-state persistence 0, emotion persistence 0,
  voice persistence 0.
  AIC-6 ARCHITECTURE GATE — CLOSED. AIC-7 — SAFE TO APPROVE, NOT STARTED.

- AIC-7A — VOICE INFRASTRUCTURE & RELEASE FOUNDATION — CLOSED PASS.
  Infrastructure only, behind OFF gates. No usable voice experience exists: microphone capture 0,
  STT 0, TTS 0, provider 0, provider dependency 0, provider secret 0, voice UI 0, `/voice` route 0,
  third AI surface 0, prompt changes 0, ai-search changes 0, AIC-5 source changes 0, DB changes 0,
  analytics 0, deployment (edge) NONE.
  Added: `src/lib/companion/voice/voiceFlags.ts` (client gate `VITE_COMPANION_VOICE_ENABLED`,
  default OFF, SECURITY AUTHORITY = NONE; server gate `AI_COMPANION_VOICE_ENABLED` named and
  documented), `voiceContracts.ts` (PartialTranscript display-only vs FinalTranscript
  authoritative; branded CanonicalAssistantText constructible only via `canonicaliseAssistantText`
  → `sanitiseAnswerForDisplay`; branded SpeakableChunk only from canonical text;
  CommittedAssistantRecord with no hidden-tail field), `voiceState.ts` (11 approved states, legal
  transition table, invalid transition returns current state, `ended` terminal),
  `voiceSessionController.ts` (start/transition/abort/stopCapture/stopOutput/end/visibility/unmount,
  injected resources, idempotent cleanup), `voiceAdapters.ts` (minimal input/output seam + no-ops),
  `src/test/companionVoiceInfrastructure.test.ts` (26 tests).
  SERVER VOICE FLAG CONTRACT: DEFINED / RESERVED. RUNTIME ENFORCEMENT: DEFERRED UNTIL FIRST
  PRIVILEGED SERVER VOICE CAPABILITY. PRIVILEGED SERVER VOICE CAPABILITY: 0.
  VOICE BOOTSTRAP ENDPOINT: DEFERRED TO PROVIDER SELECTION.
  Terminology corrected in docs to NO ASSISTANT AUDIO BEFORE SAFETY ROUTING RESOLVES.
  AIC-7C seam documented: FinalTranscript.text → existing `send(question)` in
  `useCompanionConversation`; no voice send path, thread or conversation id.
  ADR-AIC6-01..06 all remain PROPOSED (nothing functionally proven by this slice).
  Frozen: AI_AMBER_CLASSIFIER_ENABLED OFF, AMBER release GATED, AI_SOURCE_ROUTING_VERSION
  `30B-source-routing-v1`, grounding candidates 0 / approvals 0 / eligible slugs [], memory flags
  OFF, persistent-history flags OFF, voice UI flag OFF, voice persistence 0, raw-audio persistence 0,
  voice analytics 0.
  AIC-7B — SAFE TO BEGIN, NOT STARTED.

## AIC-7B — Provider selection & streaming STT architecture gate — CLOSED (documentation only)

- AIC-7B PROVIDER GATE: **CLOSED on AssemblyAI** (Streaming Speech-to-Text only).
- AssemblyAI managed Voice Agent API: REJECTED as the response brain. Intelligence
  authority remains `ai-search`; safety authority remains AIC-5.
- PRIMARY TRANSPORT: direct browser → provider Streaming WebSocket with a
  short-lived server-issued credential. Master provider secret in browser: 0.
- EXACT ASSEMBLYAI MODEL / CONFIGURATION: **BENCHMARK-GATED**.
- PRODUCTION PRIVACY / CONTRACTUAL APPROVAL: **GATED** (DPA, EU/UK processing
  scope, training opt-out, streaming ZDR on the contracted tier, metadata
  retention, subprocessors, deletion terms, security posture, regional feature
  availability).
- Runner-up Speechmatics; third Deepgram. Non-selections are requirement-specific.
- AIC-7B IMPLEMENTATION BUILD: **NOT STARTED**.
- Documents: `docs/ai/companion-voice-provider-review.md` (new, snapshot dated
  4–5 September 2026), `docs/ai/companion-voice-architecture.md` §19.
- ADR-AIC6-01..06 remain PROPOSED; ADR-AIC6-06 evidence strengthened, not accepted.
- Next proposed slice (requires separate approval): provider transport,
  microphone permission, audio capture, server bootstrap endpoint,
  `VoiceInputAdapter`, `PartialTranscript`, `FinalTranscript`, transcript-only
  development UI, lifecycle/cleanup, benchmark harness. Explicitly **NO `send()`**,
  **NO `ai-search` conversation integration**, **NO TTS**.
- Frozen: voice flags OFF/reserved, AMBER OFF/GATED, grounding
  `30B-source-routing-v1` (candidates 0, approvals 0, eligible []), memory OFF,
  persistent history OFF, microphone/STT/TTS/dependency/credentials/bootstrap/
  conversation-integration/voice-persistence/raw-audio/voice-analytics/DB/
  production-runtime changes all 0.

## AIC-J2 — journey context correctness and freshness (closed)

Journey-state freshness implemented for the three personal lifecycle journeys:
TTC, pregnancy and first year. Toddler, family, support, IVF and postpartum
remain content families, not personal journeys.

- new `src/lib/journeyStateSignal.ts`, payload-free in-memory invalidation;
- emits from the authoritative pregnancy, TTC and first-year write paths, once
  per logical mutation, zero on failure;
- epoch-guarded cache in `useCompanionPersonalJourney`: immediate invalidation,
  no stale value returned to an awaiting caller, no stale fallback on refresh
  failure, coalesced fresh reads, auth invalidation preserved;
- 30 focused tests added across three suites; no prompt, AIC-5, grounding,
  memory, history or voice change; no deployment.

## AIC-J3 — journey-aware suggestion registry (closed)

- new `src/lib/companion/journeySuggestions.ts`: the one canonical personal
  starter source for TTC, pregnancy and first year; pure, deterministic, max 4;
- personal starters require a real `JourneyContextV1.personal`; mode, page,
  route and content-entry inference counts are all 0;
- TTC by authoritative stage with `ivfInTreatment` as a non-lifecycle
  refinement; pregnancy by trimester or the one canonical `trimesterFromWeek`;
  first year by bands 0–2, 3–5, 6–8, 9–11 (month 12 unsupported);
- `companionStarters.ts` reduced to a content/mode delegate; AskPage inline
  generic starters removed; topic, week, article, hub and tool prompts kept as
  content prompts; intentional empty arrays in TTCHub, FYAISupport and
  SupportAISupport unchanged;
- J2 cache/freshness architecture unchanged and still authoritative; the
  published personal value is reactive, so stale personal chip exposure is 0
  and duplicate resolver queries across surfaces are 0;
- 41 focused tests added across `journeySuggestions.test.ts` and
  `journeySuggestionFreshness.test.tsx`;
- no prompt, AIC-5, grounding, memory, history, voice or `ai-search` change;
  no deployment.

## AIC-J4 — contextual journey AI entry points (CLOSED PASS — final gate met)

Delivered: shared `AskAboutThis` hand-off, transient `openWithEntry` on the one
panel, single-use entry consumption at the first accepted turn, and the three
originally named inline journey cards converted to entry points.

Closure remainder (must pass before this phase may be marked closed):

- lint architecture: `useCompanionOptional` moved out of `CompanionProvider.tsx`
  so the file exports components only;
- `AISearchBar` free-text input gains a programmatic accessible name;
- TTC: hub AI sections 2 -> 1, content-safe public copy, topic/subtopic and
  stage contextual Ask converted to the panel hand-off, `StagePage` bare
  `/ask` link and `TTCSupportMomentCard` raw ask link replaced;
- pregnancy: `WeekAISupport` and `TrimesterAISupport` converted to the panel
  hand-off, signed-out copy corrected (hub AI sections remain 1 -> 1);
- first year: hub AI entry consolidated, topic/month/phase hand-offs added with
  content-accurate labels, signed-out copy corrected;
- `DaySummaryCard` converted: 0 direct `useAISearch`, 0 inline answer renderer,
  0 independent conversation state;
- full answer-path scan proving exactly two AI answer surfaces.

Final closure fixes (complete): `FirstYearTopicPage` converted from the broad
`HubAISupport` / `AISearchBar` band to the shared `AskAboutThis` hand-off
("Ask about this topic", panel destination, `config.aiPrompts` as transient
chips, content-only entry, 0 personal lifecycle inference); `companionSurfaces`
test suite given the missing `cleanup()` + `localStorage` reset that was
retaining heavy trees and consent state across cases. No timeout override was
needed: global Vitest timeout unchanged. Full gate: 98 files / 1138 tests, all
pass, 0 timeouts; typecheck x2 PASS; Deno `ai-search` check PASS; lint at the
1 pre-existing error / 10 pre-existing warnings baseline with 0 new findings;
build PASS; no deployment. AIC-J5 not started; voice paused at AIC-7B.

Scope: TTC, pregnancy, first year. Next: AIC-J5. Voice remains paused at
AIC-7B.

## AIC-J5 — journey next-action layer (revised V1, engineering complete)

Delivered: an opaque `X-Companion-Next-Actions: allow | suppress` permission on
every `ai-search` response (suppress for deterministic RED/CRISIS, kill-switch
and controlled answers, clarify/unsupported boundaries and AMBER; allow only on
an ordinary generative response), fail-closed client reading, response-specific
eligibility exposed only after the same answer commits complete, the closed
deterministic registry and pure resolver in
`src/lib/companion/journeyNextActions.ts` (saved TTC / pregnancy / first year
only, max 2, exact-destination dedupe, navigation only), transient latest-answer
state cleared on send, retry, stop, error, new/cleared conversation, restore and
any J2 journey change, and the shared `CompanionNextActions` UI on both the
panel and `/ask` with identical IDs, labels and order.

No safety category, score, rule or reason reaches the browser. No content or
page actions, no J4 entry/action seed, no question or answer parsing, no
model-generated actions, no persistence, no message metadata, no analytics, no
schema/RLS, prompt, grounding, memory, history, J2/J3/J4 or voice change.

Validation: 15 new focused tests; full suite, typechecks, Deno `ai-search`
check, lint at the known baseline and build all recorded below. No deployment:
engineering completion is not production activation.

Voice remains paused at AIC-7B.

## AIC-J6 — full journey AI evaluation + remediation (closure pass)

Audit: J1–J5 engineering PASS, no P0/P1. Remediation delivered:

- R1 copy: `ArticleAISupport`, `IVFAISupport` and the `/ask` tail section no
  longer imply personal journey state on content surfaces.
- R2 boundary: the saved PERSONAL first-year journey is months 0–11. Month 12
  (and anything ambiguous) falls back to `Open My First Year`. The public
  `/first-year/12-months` content page is unchanged and still reachable.
- R3 tests: month-11/12 boundary cases, a real eligibility → runtime → UI
  composition suite (allow / suppress / missing / malformed / failed /
  streaming), sign-out mid-answer, journey transition during a stream, and
  mobile structural invariants.
- R4 runtime (local browser, 390px and 1440px, `ai-search` intercepted
  deterministically; PRODUCTION WRITE = NO, DEPLOYMENT = NO) found and fixed
  two real defects: first-resolution of an unknown journey wrongly invalidated
  the layer on the first answer, and `/ask` rendered the layer inside the
  optional "More on this" section so short answers never showed it.

R4 proves visual and runtime composition only. It is not production J5
end-to-end verification: the matching `ai-search` is still not deployed, and
release remains backend-first through the normal gate.

Voice remains paused at AIC-7B.

AIC-J6 — CLOSED PASS.

## AIC-R1 — Journey AI production activation (CLOSED PASS)

Journey AI — PRODUCTION RELEASED. AIC-J5 — PRODUCTION ACTIVATED.

Backend first: `supabase/functions/ai-search` deployed from validated revision
`e35d39a0` and verified live (ordinary `allow`; RED, CRISIS, clarify and
unsupported `suppress`; `X-Companion-Next-Actions` exposed through CORS; no
safety category, score, rule or reason exposed). Backend rollback target: the
previous `ai-search` deployment at commit `c2d4264b`.

Matching frontend published to `thestartofyou.com` on 2026-09-07 from HEAD
`3f2c272f` (a merge of validated `e35d39a0` into `c2d4264b`; the only delta
against the validated state is the archival rename of the release plan file).
Frontend rollback target: the previously published build (pre-`3f2c272f`).

Production smoke PASS — see `docs/ai/aic-r1-production-release.md` for the
recorded checks, evidence and NOT RUNTIME-VERIFIED items.

Unchanged: memory OFF/gated, persistent history OFF/gated, AMBER OFF/gated,
kill switch untouched, grounding parked at `30B-source-routing-v1`, voice OFF
and paused at AIC-7B. No schema, RLS, secrets, analytics or persistence added.

## AIC-JA-S1 — Journal & enrichment safety pre-flight (CLOSED PASS)

Trust-boundary hardening ahead of journal retrieval. Shipped two shared,
deliberately unwired modules: `enrichmentSafety.ts` (fail-closed
`assessEnrichmentText` / `filterBackgroundEntries` over the existing
`decideSafety` authority; background material is only ever used or dropped,
never escalated) and `enrichmentRendering.ts` (bounded, escaped
`JournalContextV1` renderer plus the trusted "observation, not instruction"
rules). 19 focused tests.

JA1's day-recap bypass finding did not reproduce: `buildDaySummaryQuery` puts
the digest inside `query`, so `decideSafety` already sees it, and the recap path
has had no production caller since AIC-J4. `ai-search`, the safety router, AIC-5
wording, precedence, J2–J5, memory, history, grounding, media, schema, RLS,
analytics and voice are all unchanged. No deployment. See
`docs/ai/companion-journal-enrichment-safety.md`. Voice remains paused at
AIC-7B.

## AIC-JA2 — Permissioned background journal awareness (ENGINEERING CLOSED PASS, NOT ACTIVE)

Text-only background journal awareness through the existing runtime and the same
two answer surfaces. Server resolver `aiJournalContext.ts` behind two gates —
`AI_JOURNAL_CONTEXT_ENABLED` plus the person's own
`profiles.companion_journal_context_enabled` opt-in — reading only under the
caller's verified token so RLS is the boundary. Server-authoritative lifecycle,
fail-closed episode isolation, allowlisted user-written text only (no ids, tags,
titles, tracker values or media), S1 filtering and the S1 bounded renderer.

Invariant: journal may be resolved on the ordinary GREEN model path only;
RED, CRISIS, rate limiting, kill switch, clarification, unsupported, recap and
AMBER all perform zero journal reads and report
`X-Companion-Journal-Context: none`. AIC-5 semantics unchanged. Transparency is
opaque header metadata plus one line on a completed answer, with no authority
over anything and nothing persisted.

Stated limitation: `reflections` carries no journey id, so a week row edited
across pregnancies cannot be proved to belong to the current episode and is
excluded. Recall is deliberately incomplete rather than possibly wrong.

AIC-JA2-M1: the additive `profiles.companion_journal_context_enabled` column is
applied in production (boolean, NOT NULL, default false, every existing row
false, zero policy/grant changes). Schema ready, feature inert — both flags OFF,
nothing deployed, legal/privacy activation gate OPEN. Canonical Supabase types
carry the column and the temporary local type workaround is removed. J2–J5,
AIC-5, grounding, memory, persistent history, media, analytics and voice all
unchanged. JA3 not started. See `docs/ai/aic-ja2-journal-context.md`.


## AIC-JA3 — Explicit "Ask about this entry" — ENGINEERING COMPLETE
Typed selected-entry reference (version/source/id only), server-authoritative
strict parser, RLS-scoped resolver with lifecycle/episode/baby isolation and
fail-closed pregnancy episode proof (immutable created_at vs saved journey
start), deterministic safety on the exact rendered string (no AMBER model
call), bounded transient prompt block, separate completed-only transparency
header/UI, one-request handoff with no persistence, analytics or logging.
Both journal flags remain OFF. Not deployed. Legal/privacy gate OPEN.
