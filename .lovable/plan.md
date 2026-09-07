# AIC-J5 — Journey Next-Action Layer: audit and architecture

Audit only. No code changed. Scope: TTC, Pregnancy, First Year saved journeys only.

## A. Existing saved-journey destinations (repository truth)

All below are real routes in `src/App.tsx`. Every `/my-*`, `/journey-support`, `/pregnancy-toolkit/*` and `/account*` route is wrapped in `ProtectedRoute` (auth required). Public content routes need no auth.

### TTC
| Action | Route | Auth | Needs saved journey | Type | J5 candidate |
| --- | --- | --- | --- | --- | --- |
| Back to My TTC Journey | `/my-ttc-journey` | yes | yes | navigate | YES |
| Ovulation calculator | `/ovulation-calculator` | no | no | navigate (tool, user submits) | YES |
| Trying to conceive hub | `/trying-to-conceive` | no | no | navigate | YES (content) |
| Cycle tracking / ovulation / two-week-wait / tests / fertility / conditions / IVF-and-treatment topics | `/trying-to-conceive/<topic>` | no | no | navigate | YES (content only) |
| Journey support | `/journey-support` | yes | yes | navigate | YES |
| Setup TTC | `/setup/trying-to-conceive` | no | n/a | write-initiating | NO (setup, not a next step after an answer) |

### Pregnancy
| Action | Route | Auth | Needs saved journey | Type | J5 candidate |
| --- | --- | --- | --- | --- | --- |
| View My Week | `/my-week` | yes | yes | navigate | YES |
| A kept week chapter | `/my-week/:week` | yes | yes + week | navigate | NO for V1 (needs kept-state check) |
| My Journey | `/my-journey` | yes | yes | navigate | YES |
| My pregnancy chapter | `/my-pregnancy-chapter` | yes | yes | navigate | secondary |
| Pregnancy toolkit | `/pregnancy-toolkit` | yes | yes | navigate (tools inside are write flows) | YES |
| Toolkit items: birth plan, hospital bag, appointments, baby movements, contraction timer, symptom notes, questions for midwife | `/pregnancy-toolkit/<tool>` | yes | yes | navigate to a write flow | secondary, not V1 default |
| Week guidance | `/pregnancy/week/:week` | no | no | navigate | YES (content) |
| Trimester pages, pregnancy topic pages | `/pregnancy/...` | no | no | navigate | YES (content) |
| Due date calculator | `/due-date-calculator` | no | no | navigate | YES (content) |
| Journal | `/journal`, `/journal-start` | no | no | navigate | secondary |

### First Year
| Action | Route | Auth | Needs saved journey | Type | J5 candidate |
| --- | --- | --- | --- | --- | --- |
| Open Today | `/my-first-year/today` | yes | yes | navigate | YES |
| My First Year | `/my-first-year` | yes | yes | navigate | YES |
| Memories | `/my-first-year/memories` | yes | yes | navigate | YES |
| Month page | `/first-year/<n>-months` | no | no | navigate | YES (only when age band is unambiguous) |
| Phase page | `/first-year/0-3-months` etc. | no | no | navigate | YES |
| Topic pages (feeding, sleep, development, care and safety, recovery, emotional wellbeing, checkups) | `/first-year/<topic>` | no | no | navigate | YES (content) |
| First Year setup | `/setup/first-year` | yes | n/a | write-initiating | NO |

Not personal journeys, content only: IVF, postpartum (redirects into First Year), toddler, family, support, preparing for baby.

Future opportunity, do not build in J5: no route exists for "add a reflection" as a direct deep link; reflections live inside `/my-week` and First Year Today surfaces. So J5 offers the containing page, never a reflection write.

## B. Post-answer runtime

- One shared runtime: `useCompanionConversation` (panel and `/ask`). Completion is committed once in a single effect (`!isLoading && answer.trim() && !committedRef.current`) into `messages` with `status: "complete"`.
- Aborted (`stop`) and failed requests never commit a message; `error` is separate state. So "completed canonical assistant message" is already an available, shared, unambiguous signal.
- The panel renders turns via `CompanionMessageList`; `/ask` renders its own layout from the same runtime messages. A shared resolver is therefore feasible with no runtime change.

## C. Safety disposition — the one blocker

`ai-search` returns structured metadata in headers only: `X-Conversation-Id`, `X-Companion-Boundary` (`clarify` | `unsupported`), `X-Companion-Clarification-Topic`. The deterministic RED/CRISIS branch returns fixed text with **no header**. AMBER is model-side guidance only and is deliberately invisible to the client.

Consequence: the client can identify clarification and unsupported, but **cannot** identify RED/CRISIS without parsing text, which is forbidden.

Recommended smallest safe change (proposed, not part of this audit): add one response header `X-Companion-Disposition: urgent | boundary | standard` set on the existing deterministic branch. It exposes no score, no category, no reasoning, no AMBER classification, and no private safety text. That is an `ai-search` contract addition and must be approved as its own slice before J5 UI can ship the safety rule. AMBER stays invisible; ordinary navigation after an AMBER answer is safe because the answer itself carries the escalation wording.

Blocker count: 1 (RED/CRISIS disposition).

## D. Recommended architecture

- Fully client-side and deterministic. No model call, no answer parsing, no question parsing.
- Registry `src/lib/companion/journeyNextActions.ts` — fixed IDs, fixed destinations from a closed route union. Correct approach: yes.
- Resolver `resolveJourneyNextActions({ personal, seed, page, signedIn, disposition })` in the same module. Nothing else is passed: no conversation, no answer, no records.
- Contract: `{ id, label, to, source: "personal" | "entry" | "page" | "generic" }`. `kind` is dropped for V1 because every action is navigation. No arbitrary URLs: `to` comes from the registry only.
- Precedence: 1) safety disposition gate, 2) authoritative personal journey action, 3) explicit entry/content action, 4) page context action, 5) nothing. Personal outranks content because personal is authoritative; content still contributes at most one action.
- Deduplication: by destination path first, then by `source` rank (personal wins), then stable registry order.
- Maximum 3 on desktop, 2 on mobile; prefer 1–2.
- Applies to the latest completed assistant answer only. No per-turn metadata, no persistence.

## E. Transient action seed

Needed: YES, small. J4 consumes entry context on the first accepted turn, so J5 needs the origin of the current answer. Recommendation: a `useRef` inside `CompanionProvider` capturing the bounded entry descriptor at submit time and mirrored into provider state for the latest answer only. Replaced on the next send, cleared on route change, close, clear/new conversation, and on a J2 journey-state change. Never sessionStorage, never history, never memory, never database.

## F. Behaviour rules

- Signed out or unknown personal state: zero personal actions; at most one content action from page/entry; otherwise none.
- Multiple babies or unresolvable age: generic First Year action only, never a month-specific one.
- RED/CRISIS: all J5 actions suppressed. Clarification: suppressed until resolved. Unsupported: suppressed. Failure/abort/timeout: no actions.
- TTC → Pregnancy transition: the resolver reads the live J2 personal snapshot through the existing reactive cache, so stale TTC actions disappear immediately with no reload.
- No writes, no auto-navigation, no analytics, no schema/RLS change, no changes to JourneyContextV1, J2, J3, J4, AIC-5, memory, history, or voice.

## G. UI

A compact row directly beneath the latest completed assistant answer, above the composer, using existing chip/button tokens from `companionStyles`. Visually secondary, labelled as next steps, distinct from J3 starter questions. Keyboard operable links, 44px targets, accessible group label.

## H. Implementation slices (after approval)

1. Safety disposition header in `ai-search` + client plumbing through `useAISearch` → runtime (needs explicit approval).
2. `journeyNextActions.ts` registry + resolver + unit tests.
3. Transient action seed in `CompanionProvider`.
4. Shared `CompanionNextActions` component consumed by panel and `/ask`.
5. Focused tests: authority, freshness, surface parity, zero model calls, zero mutations, safety suppression, unknown/ambiguous state, limits and dedup, accessibility.

Files likely to change: `src/lib/companion/journeyNextActions.ts` (new), `CompanionProvider.tsx`, `companionContext.ts`, `CompanionMessageList.tsx`, `src/pages/AskPage.tsx`, a new component and tests, plus slice 1 files if approved.

Must remain untouched: `journeySuggestions.ts`, `journeyContext.ts`, `useCompanionPersonalJourney.ts`, `AskAboutThis.tsx`, safety modules, memory, history, voice, schema.

## Verdict

AIC-J5 is SAFE TO BUILD for everything except the RED/CRISIS suppression rule, which depends on slice 1. Recommend approving slice 1 alongside J5, or shipping J5 with actions suppressed for all non-standard responses that the client can already detect and deferring RED-specific handling.
