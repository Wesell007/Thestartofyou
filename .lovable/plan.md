# AIC-J4 — Contextual Journey AI Entry Points (build plan)

Scope: TTC, Pregnancy, First Year. Baseline 95 test files / 1119 tests. No backend, schema, prompt, ai-search, AIC-5, grounding, memory/history or voice changes. No J5/J6 work.

## Binding outcomes

- Exactly two AI answer surfaces remain: the global companion panel and `/ask`.
- The three inline journey cards (TTC journey, My Week, My First Year) become contextual entry points; they stop calling `useAISearch`, stop rendering answers, and drop their duplicated "Continue in Ask" truncation logic.
- No third chat, no new runtime, no new endpoint, no new answer renderer.
- No hidden user turns; opening an entry never calls the model.

## 1. Panel entry contract

`CompanionProvider` gains a transient `openWithEntry({ entry, suggestions? })`:
- `entry` is the existing bounded `EntryJourneyContextV1` (`journey`, `stage`, `topic`, `title`) — no schema change, no `entry.week` in J4 (a week travels as `title`/`topic`, content data stays authoritative).
- `suggestions` are transient presentation-only content prompts (max 4), never written into `JourneyContextV1`, memory, history or the J3 registry.
- State lives in provider memory only: no localStorage, sessionStorage, database or analytics.

Lifetime:
- Activated on click; may lead the panel's starters and the first request. Opening never sends a message and never calls the model.
- Consumed the moment the shared conversation runtime accepts and commits the first user turn — not when the assistant replies. A later assistant failure, abort or timeout does not reactivate it. If submission is rejected before the runtime accepts the turn, the entry stays active.
- After consumption, later requests use the current message, live page context, J2 personal context and conversation history only.
- Cleared on route change while unconsumed, and on closing/abandoning the hand-off; reopening via the normal launcher does not resurrect it. A materially new contextual hand-off may activate a new entry.
- On `/ask`, unchanged URL parameters never reactivate a consumed entry on rerender or later requests; only a fresh page load or a new hand-off initialises one. No history rewriting.
- Historical turns are never rewritten.

`/ask` keeps its current URL/state compatibility (including the legacy `q`/`ctx` redirect) and gains the same runtime consumption rule: entry applies to the first successful submission, then stops dominating. A fresh page load reinitialises it.

## 2. Shared affordance

New `src/components/companion/AskAboutThis.tsx`: a small button/chip affordance taking a bounded entry descriptor, a visible content-safe label, optional existing content prompts, and an accessible name. It never queries the backend, never calls `ai-search`, and never asserts personal identity.

Routing rule, applied consistently:
- Contextual "Ask about this week / trimester / month / topic / stage" → opens the companion panel.
- Broad "Ask anything" search bars and free-text submissions → navigate to `/ask` with the visible question.

## 3. Journey work

**TTC**: collapse duplicate hub AI sections to one hub-level search section; fix public "your cycle" wording; contextual panel hand-off on topic/subtopic/stage pages; repair the `StagePage` bare link so bounded entry survives; replace `TTCSupportMomentCard`'s raw link with the shared affordance and its existing moment prompts; convert `TTCAskCompanionCard` into an entry point (its `ttcAskChipsFor` stays a content/moment prompt source). Ovulation and IVF surfaces stay content-only.

**Pregnancy**: merge duplicated hub AI presentation; fix "your pregnancy" / "shaped to your stage" for signed-out users; week pages use "Ask about this week" with week content prompts; trimester and topic pages use the shared hand-off; articles and due-date tools unchanged; `SectionAskAI` becomes an entry point, with personal wording only when J2 confirms personal pregnancy state.

**First Year**: consolidate the overlapping `FYAISupport`, `FirstYearCommonQuestions` and `FirstYearAISupport` roles into one coherent public experience; fix "your baby" wording without personal state; month/phase pages use "Ask about this month" content wording; `FirstYearAskCompanion` becomes an entry point. Postpartum stays content-only.

## 4. Copy, accessibility and mobile

Content wording from route alone; personal wording only with authoritative J2 personal state. Within touched components: programmatic labels on inputs, keyboard reachability, visible focus, accessible names on icon-only controls, ~44px targets, chips that wrap, one primary AI entry per viewport, launcher/bottom-nav clearance respected. No unrelated site-wide cleanup.

## 5. Tests (focused)

Entry hand-off (panel opens, bounded entry reaches the entry layer, no hidden message, no model call on open); lifetime (active → consumed on first submission → not reapplied later; cleared on route change and on abandon); content-vs-personal (week 20, TTC topic, First Year month each give zero personal inference); personal wording with each authoritative lifecycle and none when signed out; routing parity; inline-surface removal (zero direct `useAISearch` in the three cards, zero inline answer renderers); J2 freshness on TTC→Pregnancy; J3 authority and resumption after consumption; accessibility assertions.

## 6. Validation

Reconcile baseline, run focused tests, `npm test` (all pass, 0 timeouts), two cache-defeated `npm run typecheck` runs, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, `npm run lint` (known baseline only), `npm run build`. No deployments. Update `docs/ai/companion-journey-context.md` and `roadmap.md`, then return the full 76-point completion report and stop.
