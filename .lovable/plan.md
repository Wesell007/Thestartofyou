# AIC-J4 — Closure Remainder

AIC-J4 stays OPEN until this pass passes the full gate. No J5, no J6, voice stays paused.
Frozen: AIC-5, grounding, memory, persistent history, AMBER, `ai-search`, prompt assembly,
`JourneyContextV1` schema, backend, schema/RLS, voice, AssemblyAI decision. No deployment.

Starting baseline: 96 test files / 1126 tests / 1126 passing / 0 timeouts.

## Repository truth confirmed before planning

- TTC hub: `TTCAISupport` (full section) + a second inline `AISearchBar` in `TTCHub.tsx:511`.
- Pregnancy hub (`Pregnancy.tsx`): renders `PregnancyAIPanel` only. `GuidanceAndQuestions`
  and `HubAISupport` are used on other pregnancy surfaces, not stacked on the hub.
- First Year hub (`FirstYear.tsx`): renders `FYAISupport` + `FYCommonQuestions`.
  `FirstYearAISupport` (a `HubAISupport` wrapper) is a separate unused-on-hub component.
- `AISearchBar` input is placeholder-only, no programmatic label.
- `DaySummaryCard` calls `useAISearch` and renders an answer inline.
- `TTCSupportMomentCard:80` and `StagePage:454` use raw `/ask` links.
- `WeekAISupport`, `TrimesterAISupport`, `TTCTopicPage`, `TTCSubtopicPage`,
  `FirstYearTopicPage`, `FYAISupport` all use `AISearchBar`.

## Order of work

### 1. Roadmap first
Reopen `roadmap.md`: "AIC-J4 — contextual journey AI entry points — IN PROGRESS /
CLOSURE REMAINDER". Add the closure-remainder task list. Only mark closed after the gate.

### 2. Lint architecture
Move `useCompanionOptional` out of `CompanionProvider.tsx` into
`src/components/companion/useCompanionOptional.ts` (re-exporting the raw context), keeping
semantics identical. Provider is not redesigned. Target: 1 pre-existing error,
10 pre-existing warnings, 0 new findings, no rule suppression.

### 3. Accessibility on surviving search inputs
Add a visually hidden `<label>` (or `aria-label` where the design demands) to `AISearchBar`'s
input, driven by an optional `inputLabel` prop with a sensible default. This clears every
surviving J4-touched free-text input in one place. No unrelated site-wide remediation.
Preserve the existing 44px behaviour in `AskAboutThis`; check chip wrap on the consolidated
sections. No sticky UI, no launcher position change.

### 4. TTC
- Collapse to one primary hub AI section: keep `TTCAISupport` (stronger copy, botanical
  treatment, broad free-text `/ask` behaviour via `AISearchBar`); remove the duplicate inline
  bar at `TTCHub.tsx:511`, folding any unique copy/suggestions into `TTCAISupport`.
- Public wording: replace false personalisation ("your cycle", "where you are") with
  content-safe phrasing on public TTC surfaces. Keep warmth; only remove implied knowledge.
- `TTCTopicPage` / `TTCSubtopicPage`: contextual Ask becomes `AskAboutThis` → panel, carrying
  a bounded entry (`stage: "ttc"`, `topic`, content `title`) and their existing prompts as
  transient suggestions. Broad free-text stays on `/ask`.
- `TTCSupportMomentCard`: replace the raw `/ask?stage=ttc&topic=...` link with the shared
  hand-off; moment prompts stay CONTENT/MOMENT suggestions, never entering the J3 registry.
- `StagePage`: replace the bare `Link to="/ask"` with either `AskAboutThis` (contextual) or
  `askNavigation` (broad), whichever matches the actual intent; collapse the competing AI CTA
  where the section and the suggested-question list duplicate the same purpose. The suggested
  question list is navigation content and is retained.

### 5. Pregnancy
- Hub: `Pregnancy.tsx` renders one AI section already; confirm via render test and keep
  `PregnancyAIPanel` as the single primary hub affordance. Report before/after honestly (1 → 1)
  rather than inventing a consolidation.
- Public wording: correct "your pregnancy", "shaped to your stage", "tailored to you" on
  signed-out surfaces (including `WeekAISupport`) to "this stage" / "this week" /
  "general guidance about this stage". Saved My Pregnancy / My Week wording is untouched.
- `WeekAISupport`: convert to `AskAboutThis` → panel, entry
  `{ stage: "pregnancy", title: "Week N" }`, with `data.aiPrompts.slice(0, 3)` as transient
  suggestions. No `entry.week` schema change; the week travels in the existing bounded `title`.
- `TrimesterAISupport`: same conversion, entry `{ stage: "pregnancy", topic: <trimester> }`,
  existing trimester prompts reused, content-safe wording.
- `ArticleAISupport` and the due-date result Ask stay unchanged.

### 6. First Year
- Hub: consolidate `FYAISupport` + `FYCommonQuestions` down to one AI entry affordance —
  keep `FYAISupport` as the search/Ask surface and strip the duplicate Ask entry from
  `FYCommonQuestions`, retaining its questions as navigation content.
  `FirstYearAISupport` (the `HubAISupport` wrapper) is removed if nothing renders it.
- Public wording: content-safe "babies", "the first year", "this month", "recovery" where no
  personal state exists.
- `FirstYearTopicPage` and month/phase surfaces: `AskAboutThis` → panel with
  "Ask about this month", reusing existing month/stage prompt data. Route month never implies
  a baby age.
- `DaySummaryCard`: convert to the shared architecture. It stops calling `useAISearch`, stops
  rendering an answer, and stops holding conversation state. The button becomes a contextual
  hand-off into the panel carrying a bounded entry plus its existing day-recap prompt as a
  transient suggestion. No new Supabase query, no new age calculation, no personal resolver —
  it consumes only what J2 already publishes.

### 7. Repository-wide surface scan
Enumerate and classify every `useAISearch` caller. Post-pass, the only legitimate answer
execution paths are the shared runtime behind the global panel and `/ask`. Any remaining
journey-specific inline answer surface is converted or reported as a blocker, never exempted.

### 8. Entry lifecycle — no regressions
All existing semantics stay exactly as built: 0 model calls on open, 0 hidden turns, entry
consumed on the first accepted turn before the assistant outcome, no reactivation on failure /
abort / timeout, blank submissions do not consume, route change and close clear, launcher
reopen does not resurrect, unchanged `/ask` URL does not reactivate, a new material hand-off
can activate a new entry.

### 9. J2 / J3 authority
0 new personal resolvers, 0 new personal caches, 0 new starter registries, 0 route → personal
lifecycle inference.

### 10. Tests
Add focused coverage in new files alongside `companionEntryPoints.test.tsx`:
- TTC: one primary hub AI section; StagePage hand-off preserves bounded entry; moment card
  opens the panel; public wording needs no personal state.
- Pregnancy: hub AI entry count; `WeekAISupport` and `TrimesterAISupport` open the panel with
  their existing prompts; route → personal inference 0; signed-out wording content-safe.
- First Year: hub consolidated; month/phase hand-off opens the panel; route month inference 0;
  `DaySummaryCard` has 0 `useAISearch` calls and 0 inline answer renderers; wording content-safe.
- Architecture: journey inline answer surfaces 0; total answer surfaces 2.
- Lint architecture: `CompanionProvider.tsx` exports components only.
- Accessibility: surviving free-text inputs expose an accessible name.

Test arithmetic will be reported as new files, new tests, modified files, removed/replaced
tests, gross and net additions against 96 / 1126.

### 11. Validation gate
`npm test` (all pass, 0 timeouts) → typecheck twice with the verified no-build-info procedure →
`DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` →
`npm run lint` (1 error, 10 warnings, 0 new) → `npm run build`. No deployment.

### 12. Documentation and closure
Update `docs/ai/companion-journey-context.md` for the final route/surface architecture and
`roadmap.md` to closed only if every check passes. Then return the 78-point closure report.
Stop after the report.

## Risk notes

- Removing hub sections touches public layout; each removal keeps its useful copy by folding it
  into the surviving section rather than deleting it.
- Wording changes are the largest diff surface; they are limited to public/signed-out strings on
  J4 surfaces and will be enumerated in the report.
