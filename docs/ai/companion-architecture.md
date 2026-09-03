# Companion Architecture (AIC-1)

Authoritative technical architecture document for the AI Companion programme.
Everything below is verified against source at AIC-1. Future work is labelled
as future; nothing aspirational is presented as current behaviour.

Principle: **one brain, multiple surfaces. Context before cleverness.**

---

## Current surface model

| Surface | Entry | Files | Purpose |
| --- | --- | --- | --- |
| Companion panel | `CompanionLauncher` only | `src/components/companion/*` | Quick interaction without leaving the page |
| `/ask` | `src/lib/askNavigation.ts` (`askDestination` / `navigateToAsk` / `AskLink`) | `src/pages/AskPage.tsx` | Full-page interaction |

No third user-facing chat surface exists. The launcher and panel are hidden on
`/ask`, `/auth`, `/setup`, `/prototype`, `/not-found`, `/404`
(`companionSurface.ts`), and suppressed by 404 pages via `useSuppressCompanion`.

`supabase/functions/ai-reflect` is a separate non-conversational function and is
not part of the companion runtime.

---

## Companion panel request flow

1. **Input component** — `CompanionComposer` (textarea + Send/Stop).
2. **Submit event** — form submit or Enter without Shift → `useCompanion().send`.
3. **Hook** — `CompanionProvider` holds all state; `useAISearch` executes.
4. **Request construction** — `buildCompanionRequest` in
   `src/lib/companion/companionRequest.ts` (AIC-1).
5. **Mode resolution** — `resolvePanelMode` → `resolveCompanionMode(pathname)`,
   longest-prefix route rules, fallback `general`.
6. **Context construction** — `buildCompanionPanelContext` (allowlist-only:
   route family, coarse stage, page topic, tone hint; 500-char cap). Pregnancy
   routes use `buildPregnancyAiContext`.
7. **Local clarification** — `resolveAskClarification` may answer a short broad
   term with a clarifying question and skip the model entirely. Concern wording
   is never clarified.
8. **HTTP request** — `useAISearch` → `POST ${VITE_SUPABASE_URL}/functions/v1/ai-search`.
9. **Auth/key** — anon publishable key as `Authorization: Bearer`. No user JWT,
   no user id, no profile data.
10. **Validation** — `_shared/validation.ts` (`parseAiSearchBody`).
11. **Rate limiting** — 12/minute and 100/hour per hashed IP+UA fingerprint via
    `consume_ai_rate_limit` RPC; 429 with `Retry-After`.
12. **Kill switch** — `AI_SEARCH_DISABLED`, checked after urgent routing.
13. **Urgent/safety routing** — `matchUrgent(query)` → `urgentAnswer` returned as
    SSE before any model call.
14. **Mode config** — `getAiModeConfig(mode)` (`_shared/aiModes.ts`).
15. **Grounding/sources** — `selectSources(query, context)` (`_shared/aiSources.ts`)
    when `modeConfig.useGrounding`.
16. **Provider request** — Lovable AI Gateway `/v1/chat/completions`,
    `AI_MODEL_ID = google/gemini-2.5-flash`, `stream: true`, `max_tokens: 700`,
    `temperature: 0.2`.
17. **SSE response** — provider body streamed straight through.
18. **Frontend parsing** — `useAISearch` line-buffered SSE reader accumulating
    `choices[0].delta.content`.
19. **Sanitisation** — `sanitiseAnswerForDisplay` in `CompanionMessageList`.
20. **State update / render** — streaming answer rendered live; on completion the
    provider commits an assistant `CompanionTurn` into React state.

## `/ask` request flow

1. **Input component** — the follow-up input on `AskPage`, or any inline Ask CTA
   elsewhere on the site.
2. **Submit event** — `goToQuestion` navigates to `/ask` with the question in
   router state (never in the URL).
3. **Hook** — `AskPage` local state; `useAISearch` executes.
4. **Request construction** — `buildCompanionRequest` (AIC-1, same helper as the panel).
5. **Mode resolution** — `resolveAskMode({ stage, journey })` (AIC-1) using only
   the authoritative `?stage=` / `?journey=` parameters written by
   `askNavigation`. Before AIC-1 no mode was sent at all.
6. **Context construction** — surface-specific: whatever `context` the caller put
   in router state or `?ctx=`, plus the interim `Previous question:` /
   `Previous answer:` continuity strings appended by `goToQuestion`.
7-17. **Identical to the panel** (same hook, endpoint, validation, rate limiting,
   kill switch, urgent routing, mode config, source routing, provider, SSE).
18. **Sanitisation** — `sanitiseAnswerForDisplay(answer, { isStreaming })`.
19. **State update** — single question/answer view driven by `useAISearch` state;
   a follow-up is a navigation, not an appended message.
20. **Rendering** — full-page answer layout with stage styling, related links and
   suggestion chips.

**Shared:** hook, endpoint, request contract, mode resolution source of truth,
safety, grounding, provider, SSE parsing, sanitisation, identity.
**Surface-specific:** layout, starters/suggestions, context construction,
message-state model, the `/ask` pseudo-continuity strings, IVF stage chip.

---

## Request contract

```
POST /functions/v1/ai-search
{ query: string, context?: string, mode?: AiMode }
```

Unchanged by AIC-1. No history, no conversation id, no profile, no surface
identifier, no auth-derived fields are sent by either surface.

## Response / SSE contract

OpenAI-style SSE: `data: {"choices":[{"delta":{"content":"…"}}]}` … `data: [DONE]`.
Synthetic single-chunk SSE is used for urgent answers and the paused answer.
Errors are JSON (`{ error }`) with status 400/429/499/502/503.
No source metadata, citations or URLs are returned to the browser.

## Model / provider

`AI_MODEL_ID = google/gemini-2.5-flash` via Lovable AI Gateway, `LOVABLE_API_KEY`
server-side only. Versions logged once per cold start from `AI_VERSION_SUMMARY`.

## Mode system

`AI_MODES`: `general`, `first_year_day_recap`, `first_year_companion`,
`pregnancy_week_companion`, `ttc_companion`. `first_year_day_recap` is owned by
the First Year recap flow and is never selectable by a conversational surface.
Unknown/absent mode → `general`. Prompts are composed from named blocks by
`buildSystemPrompt`.

## Prompt-layer matrix

| Layer | State | Where |
| --- | --- | --- |
| Core identity | IMPLEMENTED | per-mode identity line, `_shared/aiModes.ts` |
| Safety | IMPLEMENTED | `SAFETY_BLOCKS` + `_shared/urgentPatterns.ts` (pre-model) |
| Journey | PARTIAL / COUPLED to mode | only expressed through mode choice and the free-text context string |
| Mode | IMPLEMENTED | `getAiModeConfig` |
| Preferences | PARTIAL / COUPLED to context | tone hint only, embedded in the context string |
| Context | PARTIAL | single unstructured `context` string; no schema server-side |
| Knowledge | PARTIAL | NHS allowlist grounding only; article grounding gated at 0 |
| Tools | ABSENT | no tool/function calling |

Prompt contents were not modified in AIC-1.

---

## Current context inventory

Sent today = present in the `context` string or the `mode` field.

| Field | Source | Client? | Sent? | Used by prompt? | Persisted? | User-controlled? | Authority | Sensitivity | Future owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Journey/route family | route | yes | yes (coarse) | yes | no | no | high | low | AIC-2 |
| Stage label | route helpers | yes | panel only | yes | no | no | medium | low | AIC-2 |
| Mode | route / `?stage=` | yes | yes | yes | no | no | high | low | AIC-1 (done) |
| Pregnancy week | route + saved journey | yes | route week only (panel) | yes | DB (journey) | yes | high | medium | AIC-2 |
| Trimester | derived | yes | via label | yes | no | yes | high | low | AIC-2 |
| Due date | saved journey | yes | no | no | DB | yes | high | high | AIC-2/AIC-3 |
| TTC state / cycle logs | saved TTC journey | yes | no | no | DB | yes | medium | high | AIC-3 |
| IVF stage | `sessionStorage ivf:lastStage` | yes | no (display chip only) | no | session | yes | medium | high | AIC-2 |
| Baby birth date / age | first-year journey | yes | no | no | DB | yes | high | high | AIC-2/AIC-3 |
| First Year phase/month | derived | yes | no | no | DB | yes | high | medium | AIC-2 |
| Toddler age | route only | partial | no | no | no | n/a | low | medium | AIC-2 |
| Article / topic | page data | yes | panel: page topic when supplied | yes | no | no | high | low | AIC-2 |
| Account / profile | `profiles` | yes | no | no | DB | yes | high | high | AIC-3 |
| Companion name / tone | `profiles` | yes | tone hint only; name never sent | tone only | DB | yes | high | medium | AIC-3 |
| Current question | user input | yes | yes | yes | no | yes | high | high | current |
| Previous question / answer | `/ask` router state | yes | yes, inside `context` (interim) | yes | no | no | low | high | AIC-4 |
| Authentication state | Supabase session | yes | no | no | n/a | n/a | high | high | AIC-3 |
| Surface identifier | n/a | n/a | no | no | no | n/a | n/a | n/a | AIC-6 if ever needed |

No new fields were added in AIC-1.

## Existing user / journey data inventory

`profiles` (companion name, tone), saved pregnancy journey (due date, week),
saved TTC journey and logs, First Year entries/memories/reminders/care events,
pregnancy toolkit tables (appointments, birth plan, hospital bag, symptom notes,
movements, midwife questions), IVF last stage in `sessionStorage`, and `MyWeek` /
`MyJourney` derived state. **None of it is sent to the AI today** beyond the
coarse, allowlisted route facts above.

---

## Message state ownership and persistence

| Question | Panel | `/ask` |
| --- | --- | --- |
| Where messages live | `CompanionProvider` React state (`CompanionTurn[]`) | `useAISearch` state + router state; no message list |
| Close/reopen | survives (provider stays mounted) | n/a |
| Route change | survives (provider is above the router outlet); hidden routes close the panel | new navigation = new request |
| Refresh | destroyed | destroyed |
| Anonymous vs authenticated | identical | identical |
| localStorage / sessionStorage | none | only `ivf:lastStage` (display chip) |
| Database persistence | none | none |
| Conversation IDs | none | none |
| Server-side history | none | none |
| Panel ↔ `/ask` sharing | none; "Open full Ask page" hands over the last question plus the bounded context only | same |

`/ask` continuity today is the interim `Previous question:` / `Previous answer:`
strings inside the single `context` field. This is an **INTERIM / COUPLED
CONTINUITY MECHANISM**, explicitly owned by **AIC-4**, and must not become the
memory architecture. It was left unchanged in AIC-1.

## Identity

`useCompanionIdentity` reads `companion_name` and `companion_tone` from
`profiles` for the signed-in user; anonymous users get `null`/`null`. Both
surfaces use it. The name is display-only and never sent to the backend; only a
coarse tone hint reaches the context string. No hard-coded personal names exist.

## Authentication

`ai-search` is called with the anon publishable key on both surfaces. Behaviour
is identical for anonymous and authenticated users; rate limiting is by hashed
IP+UA, not by user.

---

## Safety

Current, verified:

- Pre-model hard escalation: `matchUrgent` → `urgentAnswer` (never reaches the model).
- Recap-only modes receive `DAY_RECAP_UNAVAILABLE_ANSWER` instead of escalation text.
- Kill switch `AI_SEARCH_DISABLED` → `AI_PAUSED_ANSWER`.
- Per-mode safety blocks in the system prompt (no diagnosis, no prescribing, no
  pregnancy/ovulation verdicts, no reviewer claims).
- Client-side `sanitiseAiAnswer` and a dev-only banned-verdict warning.
- Local clarification for short broad questions, which refuses to clarify
  anything with concern wording.

Against the future Green/Amber/Red/Crisis/Unsupported model: **Red/Crisis =
PARTIAL** (hard patterns only, no classifier); **Unsupported = PARTIAL**
(`SAFE_FALLBACK_ANSWER`); **Green/Amber = ABSENT** (no graded classification, no
emotional state signal). These gaps belong to **AIC-5**. Nothing was weakened.

## Grounding

Frozen and unchanged: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`,
grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`,
Phase 30K parked at Stage 2. Grounding governance is an independent gate and does
not block AIC-2/3/4/6.

## NHS / external-source fallback (Phase 29B.1)

`selectSources(query, context)` performs static keyword routing over a fixed NHS
allowlist. The function fetches each page, extracts `<main>`, strips scripts,
styles and tags, caps at 10,000 characters and wraps it as `<background>`. **URLs
are never given to the model.** If every source fails, the request returns 503
with a neutral message rather than an ungrounded answer. Nothing about sources
reaches the browser; the client additionally strips external links and raw URLs
via `stripExternalSourceLinks`. Identical on both surfaces.

## Sanitisation

Single shared path: `sanitiseAnswerForDisplay` (`src/lib/aiAnswerSafety.ts`),
used by `CompanionMessageList`, `AskPage` and every inline AI surface. Streaming
mode preserves partial text; completed answers get full clean-up and the approved
fallback line. Unchanged in AIC-1.

## Error handling

| Case | Behaviour |
| --- | --- |
| Empty query | ignored client-side on both surfaces |
| Validation failure | 400 with a specific message |
| Network failure | `useAISearch` shows the neutral connection message |
| Aborted request | `AbortError` swallowed; no error shown; Stop uses it |
| Backend failure | 502/503 neutral messages |
| Rate limit | 429 + `Retry-After`; panel exposes `isRateLimited` |
| `AI_SEARCH_DISABLED` | `AI_PAUSED_ANSWER` as SSE |
| Urgent question | escalation answer as SSE, model not called |
| Malformed stream | partial-line buffering; a bad line is re-buffered and the stream continues |
| Concurrent submits | previous request aborted, `requestRef` guards stale updates; panel also blocks send while loading |

## Streaming

Both surfaces consume the same SSE stream through `useAISearch`. Presentation
differs only: the panel renders a live streaming bubble then commits a turn; the
`/ask` page renders progressively into its answer layout. No new streaming
architecture was added.

## Rate limiting and kill switch

12/minute, 100/hour per hashed IP+UA via `consume_ai_rate_limit`; limiter failure
returns 503 rather than an unlimited path. `AI_SEARCH_DISABLED` checked after
urgent routing so crisis questions still receive escalation while paused.

---

## Current architectural coupling (known debt)

1. Context is one unstructured string, so journey, preferences and continuity are
   all COUPLED. Separating them is AIC-2/AIC-3/AIC-4 work.
2. `/ask` continuity is string concatenation in that same field (interim, AIC-4).
3. `/ask` and the panel build context differently; only mode resolution was
   unified in AIC-1.
4. Message models differ: the panel has `CompanionTurn[]`, `/ask` has none. A
   shared message type was **not** created — it is not needed until AIC-4.
5. No surface identifier is sent. Deliberate: intelligence must not fork by UI.

## The three data layers (binding)

`CURRENT-TURN / JOURNEY CONTEXT` · `SESSION CONVERSATION HISTORY` ·
`PERMISSIONED LONG-TERM MEMORY` remain conceptually and technically separate.
They must never be flattened into one context string.

## Future insertion points

- **AIC-2 Journey Context** — a central context builder feeding
  `buildCompanionRequest` in `src/lib/companion/companionRequest.ts`. Both
  surfaces already call it, so context stops being surface-specific there.
- **AIC-3 Permissioned Memory** — a distinct field alongside (never merged into)
  journey context at the same boundary, gated by explicit user permission, with
  the `profiles`/settings surface as its control plane.
- **AIC-4 Conversation Continuity** — a session/history layer owned above the
  surfaces (provider-level or a shared session store) and passed as its own
  field, replacing the `/ask` `Previous question/answer` strings.
- **AIC-5 Safety / Emotional Intelligence** — classification stays server-side in
  `_shared/urgentPatterns.ts` + `_shared/aiModes.ts`, before the provider call,
  so every surface and future transport inherits it.
- **AIC-6/7 Voice** — a voice transport becomes another caller of the same
  request boundary and the same backend. Current blockers: state lives in React
  (`CompanionProvider`) rather than a transport-agnostic store, and there is no
  session/history layer yet — both resolved by AIC-4.

## Voice readiness

Identity, safety, knowledge, mode/prompt architecture and sanitisation are
already transport-agnostic (pure modules or server-side). Context and
conversation state are not yet. No separate voice brain is permitted.

---

## Architecture decision record

- **ADR-AIC1-01 — ACCEPTED.** One brain, multiple surfaces. Both surfaces use
  `useAISearch` → `ai-search` → one model, one safety path, one sanitisation path.
- **ADR-AIC1-02 — ACCEPTED.** Journey context will be constructed centrally at the
  shared companion request boundary, not independently in `/ask` and the panel.
- **ADR-AIC1-03 — ACCEPTED.** Current-turn context, session history and long-term
  permissioned memory remain separate layers.
- **ADR-AIC1-04 — ACCEPTED.** Grounding governance is independently gated and does
  not block context, memory or continuity architecture.
- **ADR-AIC1-05 — ACCEPTED.** Voice will reuse the same companion intelligence
  layer rather than create a separate voice brain.
- **ADR-AIC1-06 — ACCEPTED.** `/ask` and the panel must use the same authoritative
  mode-resolution path. `/ask` previously sent no mode and always ran `general`;
  corrected in AIC-1 via `resolveAskMode`, using only authoritative `?stage=` /
  `?journey=` parameters, with `general` as the honest fallback.

## AIC-2 readiness

Classification before AIC-1: **B — mostly shared, small foundation cleanup
needed.** After AIC-1: mode resolution and request construction are shared;
`src/lib/companion/companionRequest.ts` is the single extension point AIC-2 can
build on. AIC-2 Journey Context is safe to begin.

## Permissioned memory (AIC-3)

Both surfaces share one memory path: `useCompanionMemoryInteraction`, over the pure policy
layer in `src/lib/companion/memory/`. Explicit "remember"/"forget" commands are recognised by
the application, confirmed by the person, and written by the browser under row-level security.
Ordinary conversation never writes, and the model neither proposes nor performs a write.

In `ai-search`, memory is optional enrichment for a request that is already going to the
model: it runs after validation, rate limiting, the urgent path and the kill switch, is gated
by the authoritative `AI_MEMORY_ENABLED` flag, is read under the caller's verified token, and
is rendered as an escaped `<permissioned_memory>` DATA block separate from the AIC-2
`<structured_journey_context>` block. It fails open.

Full detail: `docs/ai/companion-memory.md`. Decisions: `docs/ai/adr/ADR-AIC3.md`.

## Safety intelligence and emotional continuity (AIC-5 audit)

The complete verified safety path, mechanism-by-mechanism classification
(deterministic / trusted prompt / grounding / display sanitisation / model
judgement), the GREEN–AMBER–RED–CRISIS–UNSUPPORTED gap matrix, the safety
evidence rules and the recommended build sequence live in
`docs/ai/companion-safety-emotional-continuity.md`. Proposed decisions are
recorded in `docs/ai/adr/ADR-AIC5-proposals.md` (ADR-AIC5-01 … 08, all
PROPOSED).

Summary of the audited runtime: safety decisions occur at four points only —
deterministic urgent routing (`_shared/urgentPatterns.ts` `matchUrgent`), the
`AI_SEARCH_DISABLED` kill switch, trusted mode prompt rules
(`_shared/aiModes.ts`) and display sanitisation (`src/lib/aiAnswerSafety.ts`).
Only the first two bypass the model. Both surfaces share one runtime and one
endpoint, so safety parity is structural.

Carried forward from the audit, unimplemented:

- Rate limiting runs before urgent routing — a REACHABLE gap where deterministic
  escalation is unavailable to a rate-limited caller.
- `first_year_day_recap` suppresses escalation answers — CONDITIONALLY
  REACHABLE only via a crafted client-supplied mode; standard product usage is
  safe by construction.
- With persistent history enabled, the user turn is stored before the safety
  match — a retention observation with no current impact (both flags OFF).
- Urgent routing runs before the kill switch — a positive property that must be
  preserved.
- AMBER is the principal missing state; deterministic RED and CRISIS may never
  be downgraded; any classifier stays optional; emotional and safety-state
  persistence stay at 0.

### AIC-5A — deterministic safety foundation (implemented)

`decideSafety(query)` in `supabase/functions/_shared/safetyRouter.ts` is the one
server-side safety decision point for every transport. It runs immediately after
body validation and before rate limiting, conversation persistence, the
`AI_SEARCH_DISABLED` kill switch and any mode behaviour.

RED (clinical) and CRISIS (self-harm / safeguarding) terminate the request with
fixed, unchanged escalation wording and make zero model, grounding, memory,
history and rate-limiter calls, so neither exhausted quota, a failing limiter,
recap mode nor a paused companion can suppress them. GREEN keeps the previous
path exactly, including 12/min and 100/hour limits. Safety state is
request-runtime only: never persisted, never logged, never shown as a label.
`amber` and `unsupported` are reserved names with no implementation.
