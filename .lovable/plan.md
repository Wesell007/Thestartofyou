# AIC-J4 — Final Two Closure Fixes

Scope: FirstYearTopicPage contextual entry point + full-suite test stability. No J5, no J6, voice stays paused. No product behaviour changes beyond item 1.

## 1. FirstYearTopicPage → contextual entry point

Current state (verified): `src/components/firstyear/topic/FirstYearTopicPage.tsx` renders `HubAISupport` (which embeds `AISearchBar`, a broad `/ask` hand-off) with `suggestions={config.aiPrompts}` and `context={config.title}`.

Change:
- Replace the `HubAISupport` block with the same section shell used by the already-converted month and phase templates, rendering `AskAboutThis`.
- Visible label: `Ask about this topic` (both baby and recovery sides; recovery keeps its own supporting copy but not a different label).
- Entry descriptor (bounded, content-only, no schema change):
  `{ stage: "first-year", journey: "first_year", topic: config.slug, title: config.title }`
- `suggestions={config.aiPrompts}` — reused verbatim as transient, presentation-only chips.
- `destination` stays the default `panel`.
- Keep the existing heading/description copy and the stage tint tokens (`theme.aiBg` / `theme.aiAccent`) so the section still reads as the current AI support band.
- Remove the now-unused `HubAISupport` import. `HubAISupport` itself is left untouched (other families still use it).

Guarantees preserved by reusing `AskAboutThis` unchanged: zero personal First Year inference, zero hidden user turns, zero model calls on open, zero new conversation runtime, J2 remains sole personal journey authority, J3 remains sole personal starter authority.

## 2. Test timeouts — inspect before adjusting

Three suites time out only in the full run: `companionEntryPoints`, `companionSurfaces`, `sharedTemplateSeo`. Vitest currently sets no `testTimeout`, so each test gets the 5s default.

Inspection order (repository evidence, before any timeout change):
- `companionSurfaces.test.tsx`: no `afterEach(cleanup)` and it writes `localStorage` consent without resetting — check for cross-test leakage and duplicated mounted trees.
- `companionEntryPoints.test.tsx`: check provider async work (session lookups, conversation checks) settling after unmount, and that `sessionStorage`/mock resets cover every path.
- `sharedTemplateSeo.test.tsx`: `it.each` renders nine full page templates with Helmet `waitFor`; check for retained DOM between cases and repeated expensive setup that can be hoisted.
- Shared infra `src/test/setup.ts`: confirm a global `afterEach` cleanup / unhandled-work guard is appropriate.

Fix real defects found (missing cleanup, leaked storage/state, unawaited work, duplicated renders). Only if the suites are then behaviourally clean and still exceed 5s purely from legitimate load, apply a narrowly scoped timeout — per affected file/suite (e.g. `describe(..., { timeout: 10000 })` or a file-level `vi.setConfig({ testTimeout: 10000 })`) — never the global Vitest default, and never above 10s.

No production files are touched for test stability. If verification exposes a genuine product defect, stop and report before expanding scope.

## 3. Tests for the topic hand-off

Add focused coverage (extending `src/test/companionEntryRemainder.test.ts` or a small companion test file) proving:
- FirstYearTopicPage exposes `Ask about this topic` and never uses `Ask about this month` as its contextual CTA.
- Clicking it opens the companion panel and publishes the topic's `aiPrompts` as transient starters.
- No model call (`useAISearch.ask`) and no hidden user turn on open.
- Personal-inference invariant (not a "no resolution" invariant): the topic route/content contributes zero personal lifecycle inference — with no saved journey the personal context stays unknown/null, and with a genuine J2-resolved saved First Year journey that personal context is still available and is neither manufactured nor erased by the content entry. No new resolver, cache, Supabase lookup or duplicate personal query.
- Month page keeps `Ask about this month`; phase page keeps `Ask about this stage`.


## 4. Answer-surface invariant re-scan

Re-run the full scan (`useAISearch`, `useCompanionConversation`, `ai-search` string, `supabase.functions.invoke`, `/functions/v1/ai-search`, independent answer state/renderers). Required: exactly two answer surfaces (global panel, `/ask`), zero TTC/Pregnancy/First-Year inline answer surfaces, zero DaySummaryCard AI execution, no third runtime/endpoint/renderer.

## 5. Roadmap

Set `roadmap.md` back to `AIC-J4 — IN PROGRESS / FINAL CLOSURE`. Mark `CLOSED PASS` only after the whole gate passes.

## 6. Validation

`npm test` (all pass, 0 timeouts) → typecheck twice (cache-defeated) → `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` → `npm run lint` (must be exactly the 1 pre-existing error / 10 pre-existing warnings baseline, 0 new J4 findings) → `npm run build`. No deployment.

Then return the full 43-point delta report (topic hand-off evidence, timeout diagnosis and override scope, test arithmetic, two typechecks, Deno check, lint baseline, build, two-surface invariant, DaySummaryCard status, personal-inference count, contextual labels, unresolved debt, roadmap status, J4/J5 gate) and stop.
