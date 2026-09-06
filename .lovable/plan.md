# AIC-J3 — Journey-Aware Suggestion Registry

Scope: TTC, Pregnancy, First Year only. No J4/J5/J6. Voice paused. No AIC-5, grounding, memory/history, prompt or `ai-search` changes.

## Audit findings (pre-build)

Personal-journey starter sources (fragmented, to consolidate):
- `src/lib/companion/companionStarters.ts` — mode-based chips (`general`, `ttc_companion`, `pregnancy_week_companion`, `first_year_companion`), consumed by `CompanionProvider` (`starters: companionStarters(mode)`).
- `src/pages/AskPage.tsx` — inline `welcomeSuggestions` array plus five large inline topic maps (`FIRST_YEAR_/FAMILY_/TODDLER_/TTC_/PREGNANCY_TOPIC_SUGGESTIONS`).
- Hub components passing generic starter strings inline: `TTCAISupport`, `FirstYearAISupport`, `FYAISupport`, `TrimesterAISupport`, `WeekAISupport`, plus non-personal families (`PostpartumAISupport`, `PreparingAISupport`, `ToddlerAISupport`, `FamilyAISupport`, `SupportAISupport`).

Content-specific prompt data (KEEP as content context, not globalised):
- `src/data/weekData.ts`, `articleData.ts`, `stageData.ts`, `ttcTopicData.ts`, `pregnancyTopicData.ts`, `firstYearTopicData.ts`, `firstYearStageData.ts`, and the non-personal families (`ivf*`, `postpartum*`, `toddler*`, `family*`).

Authoritative context fields available (`journeyContextContract.ts`):
- pregnancy: `week` (1–42), `trimester`
- trying-to-conceive: `ttcStage` (`trying_naturally | preparing_to_try | considering_help | in_treatment`), `ivfInTreatment`
- first-year: `ageMonths` (0–11)

Empty-array surfaces to classify: `src/pages/TTCHub.tsx`, `src/components/firstyear/new/FYAISupport.tsx`, `src/components/support/SupportAISupport.tsx`.

## What will be built

1. `src/lib/companion/journeySuggestions.ts` — the single canonical registry.
   - `resolveJourneySuggestions({ personal, entry, page, surface })` returning up to 4 deterministic strings.
   - Surfaces: `companion | ask | hub`.
   - Journey-level sets for the three personal journeys, plus bounded stage-aware variants: pregnancy by trimester (derived from an already-known week/trimester only, never inferred), TTC by `ttcStage` (with an `ivfInTreatment` variant only where it adds relevance without medical assumption), First Year by month band (0–3, 3–6, 6–9, 9–12).
   - Unknown stage → journey-level set. No personal journey → existing neutral/general set (migrated from `companionStarters.general`).
   - Pure data + pure function: no dates, no identifiers, no randomness, no model call, no analytics, no persistence.

2. Precedence, per surface (documented and tested):
   - Global companion: personal journey (+ stage when known) → general fallback. Page/entry never assign a journey.
   - `/ask` with explicit content entry (topic/week/article): content-specific prompts lead; otherwise personal journey → general.
   - Hub surfaces: editorial/content prompts stay where they add value; generic duplicated journey strings switch to the registry.

3. Consumers updated:
   - `CompanionProvider` resolves starters from the registry using the same `JourneyContextV1` it already builds (so J2 invalidation refreshes them; memoisation keyed on personal context).
   - `AskPage` — remove the inline `welcomeSuggestions` and the TTC/pregnancy/first-year journey-level duplication; keep content/topic maps that carry genuine specificity (and non-personal families untouched).
   - `companionStarters.ts` becomes a thin re-export/delegate so mode-based callers and existing tests keep working.
   - Empty-array surfaces: fill only where it clearly helps TTC/Pregnancy/First Year; otherwise record as intentional empty.

4. Copy audit: every registry line reviewed for medical assertion, false reassurance, deterministic milestone claims, fertility promises, alarm, duplication, chip length.

5. Tests (`src/test/journeySuggestionRegistry.test.ts`, plus a small cross-surface/freshness spec):
   journey→starter mapping, stage variants, unknown-stage fallback, no-personal fallback, determinism, no page-context inference (pregnancy/IVF/postpartum/family pages), cross-surface parity, content-entry precedence, and TTC→Pregnancy freshness after the J2 signal with zero stale TTC chips.

6. Docs: `docs/ai/companion-journey-context.md` (or a companion-suggestions section) + `roadmap.md`.

## Validation

Reconcile baseline (93 files / 1092 tests), focused J3 tests, `npm test`, two cache-defeated typechecks, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, lint (known baseline only), build. No redeployment. Then the 65-point completion report, and stop.
