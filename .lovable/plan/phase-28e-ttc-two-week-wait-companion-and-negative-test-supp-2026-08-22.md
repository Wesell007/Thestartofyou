# Phase 28E — TTC Two-week Wait Companion and Negative Test Support

Presentation and UX only, inside `/my-ttc-journey`. No schema, RLS, storage, auth, AI, cycle maths, calculator, handover, SEO, sitemap or route changes.

## Discovery findings (verified)

1. `derivedStage` in `MyTTCJourney.tsx` calls `computeTTCStage` from `src/lib/ttcDerived.ts`. Stages: `before_ovulation`, `fertile_window`, `likely_ovulation`, `two_week_wait` (after fertile window end), `test_window` (from `possible_test_date`, ovulation + 15), `expected_period` (from `expected_period_date`).
2 to 5. Logs live in `ttc_logs` (`log_date`, `log_type`, `value`, `notes`) via `src/lib/ttcLogs.ts`. Pregnancy test values: `negative`, `positive`, `unclear`. Period values: `started`, `continued`, `ended`. Mood values: `steady`, `emotional`, `anxious`, `hopeful`, `low`.
6. `src/lib/ttcInsights.ts` already detects two or more `negative`/`unclear` pregnancy tests within 14 days, a positive test, and a period `started` log near the expected period date.
7. Existing guidance routes confirmed: `/trying-to-conceive/two-week-wait`, `/trying-to-conceive/pregnancy-tests`, `/trying-to-conceive/cycle-tracking`, `/trying-to-conceive/ovulation`, plus `/articles/ovulation-signs`.
8. `TTCTodayCard` picks copy from a `STAGE_COPY` record keyed by stage only; primary action is either "note" (calls `onAddNote`) or a link.
9. `TTCJourneyFocusCard` also keys purely off stage, with a primary link plus an Ask link.
10. Yes. `openPanelForQuickAdd(type, value)` already exists in `MyTTCJourney.tsx` and `TTCLogEntryPanel` accepts `initialType` / `initialValue` (added in 28D).
11. Only `src/lib/ttcLogsGrouping.test.ts` covers TTC logs. No tests for insights or stage copy.
12. Everything in this phase can be done with a new pure helper plus presentation components, using existing state, handlers and routes.

Ask topics the app already accepts for `stage=ttc`: `two-week-wait`, `pregnancy-tests`, `cycle-tracking`, `fertile-window`, `when-to-ask-help`. Only these will be used.

## What will be built

**New pure helper `src/lib/ttcSupportMoment.ts`**
- Reads existing stage plus existing logs, returns at most one support moment descriptor: `period_arrived`, `after_test_result` (recent negative or unclear pregnancy test, no positive), `possible_test_day` (`test_window`), `two_week_wait`.
- Priority order: period arrived, after test result, possible test day, two-week wait. Suppressed entirely if a positive pregnancy test exists so the existing handover keeps priority.
- Recency windows use existing log dates only, no new values, no cycle maths.
- Descriptor carries heading, body, support line and actions typed as `note` (preselected log type and value), `link` (guidance route) or `ask` (existing `/ask?stage=ttc&topic=...`).

**New component `src/components/ttc/journey/TTCSupportMomentCard.tsx`**
- Renders one descriptor using existing `ttcStyles.ts` tokens, `ttc-paper-warm`, sage watercolour wash and botanical accents. No hex values. All actions at least 44px.
- Placed directly after the Today card, before the cycle path.

**Today card**
- `TTCTodayCard` gains an optional support-aware headline and support line for the four moments, keeping one primary action and the existing quiet details. No structural change.

**What may be useful today**
- `TTCJourneyFocusCard` accepts the same moment and swaps to the emotionally relevant copy and existing route when a moment is active, otherwise unchanged stage copy.

**Notes and Ask integration**
- "Add a note", "Add how you feel" (mood preselected), "Add a pregnancy test note" and "Period started" all route through the existing `openPanelForQuickAdd`.
- Period wording states that logging does not change the saved cycle start, with a separate "Update this cycle" link to `/setup/trying-to-conceive`.
- Ask stays a plain route link.

**Nano Banana**
Before implementation, generate a composition board inside Lovable for the three support surfaces (two-week wait, after a test result, period arrived), continuing the 28B/28B.1/28C/28D direction.

## Tests
New `src/lib/ttcSupportMoment.test.ts` covering: recent negative or unclear detection, recent period-started detection, priority ordering, suppression on positive test, and a banned-copy scan over the generated strings. No existing tests rewritten.

## Verification
Playwright at 390px and 1440px across `/my-ttc-journey`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route and one signed-in First Year route. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`. Report the 30 requested items and stop.
