# AIC-J3 — Journey-Aware Suggestion Registry

Scope: TTC, Pregnancy, First Year only. No J4/J5/J6. Voice paused. No AIC-5, grounding, memory/history, prompt or `ai-search` changes.

## Audit findings (pre-build)

Personal-journey starter sources (fragmented):
- `src/lib/companion/companionStarters.ts` — mode chips (`general`, `ttc_companion`, `pregnancy_week_companion`, `first_year_companion`), consumed by `CompanionProvider`. Classified CONTENT/MODE, not personal.
- `src/pages/AskPage.tsx` — inline `welcomeSuggestions` (generic) plus five topic maps (first-year, family, toddler, TTC, pregnancy). Topic maps are genuine CONTENT prompts and stay.
- Hub components with inline strings: `TTCAISupport`, `FirstYearAISupport`, `TrimesterAISupport`, `WeekAISupport` (week data), plus non-personal families. Classified CONTENT/HUB prompts for signed-out and non-personal readers — kept, not migrated, since a hub knowing its own family is not personal context.

Content prompt data kept untouched: `weekData.ts`, `articleData.ts`, `stageData.ts`, `ttcTopicData.ts`, `pregnancyTopicData.ts`, `firstYearTopicData.ts`, `firstYearStageData.ts`, and non-personal families.

Empty arrays audited: `TTCHub.tsx` (own `ttcAIChips` row), `FYAISupport.tsx` (own baby/recovery chip row), `SupportAISupport.tsx` (outside scope) — all INTENTIONAL EMPTY, fill count 0.

Authoritative bounded fields: pregnancy `week`/`trimester`; TTC `ttcStage`, `ivfInTreatment`; first year `ageMonths` 0–11.

## What will be built

1. `src/lib/companion/journeySuggestions.ts` — canonical registry.
   - `resolveJourneySuggestions({ personal, entry, page, surface })`, surfaces `companion | ask | hub`, max 4 deterministic strings.
   - **No journey-family shortcut**: personal starters are unreachable without a real `JourneyContextV1.personal` object. `page` is accepted and never consulted.
   - Stage variants: TTC by `ttcStage` (`ivfInTreatment` only selects existing in-treatment wording when no saved stage says otherwise); pregnancy by `trimester`, or `week` via the single canonical `trimesterFromWeek` helper (derivation implementations stay at 1); first year by non-overlapping bands **0–2, 3–5, 6–8, 9–11** (month 12 unsupported).
   - Unknown stage → journey-level. No personal → neutral general.
   - Also holds the content/mode chips so that copy lives in one file; clearly labelled as content, never personal.
   - Pure data + pure function: no model calls, randomness, analytics, persistence, dates, identifiers.

2. Reactive personal value in `useCompanionPersonalJourney`, reusing the existing module cache, epoch and single signal owner — no second resolver, no extra query per mounted surface. Invalidation immediately publishes `null`, so stale personal chips are never visible while a fresh read is pending.

3. Consumers:
   - `CompanionProvider` — starters from the registry when personal context exists, else the existing content/mode chips.
   - `AskPage` — inline `welcomeSuggestions` removed and resolved from the registry; topic/content maps untouched.
   - `companionStarters.ts` — thin delegate over the registry's content/mode chips; no second copy of journey strings.

4. Copy audit of every registry line: medical assertion, false reassurance, diagnosis, fertility promise, treatment assumption, alarm, deterministic milestone claims, duplication, chip length, tone.

5. Tests (new focused suites): journey mapping, TTC stages, `ivfInTreatment`, trimester variants, first-year boundaries 0/2/3/5/6/8/9/11, unknown-stage fallback, no-personal fallback, determinism, max count, mode/page/route inference = 0, no-personal page cases (pregnancy, TTC, IVF, first year, postpartum), conflict cases (pregnancy+family, TTC+IVF, first year+postpartum), cross-surface parity, content-entry precedence, TTC → Pregnancy J2 freshness with zero stale visible chips, no duplicate resolver work from two mounted surfaces, legacy `companionStarters` compatibility.

6. Docs + `roadmap.md`.

## Validation

Reconcile baseline (93 files / 1092 tests), focused suites, `npm test` (0 timeouts), two cache-defeated typechecks, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, lint (known baseline only), build. No deployment. Then the full 78-point report, and stop.
