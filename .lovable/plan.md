## Phase 9.5g.1 — TTC Dashboard Stage Deduplication

### Problem
`TTCJourneyInsights` and `TTCJourneyFocusCard` both key off the derived `stage`, so a user in `two_week_wait` sees "The wait can feel emotionally loud" in Insights and "You may be in the two-week wait" in Today's focus. Same theme, back-to-back.

### Rule
Today's focus owns generic stage guidance. Insights only surface a stage-based card when it adds something the focus card does not (a genuine lead-in, or a personalised trigger). Personalised, log-driven insights are always allowed.

### Fix (single file: `src/lib/ttcInsights.ts`)

Change the "4. Stage-based card" block so it no longer emits generic stage cards that duplicate Today's focus:

- **`two_week_wait`** → remove entirely. Today's focus already covers it.
- **`fertile_window` / `likely_ovulation`** (`in_fertile_window` insight) → remove. Today's focus already covers it.
- **`test_window` / `expected_period`** (`testing_soon` insight) → remove. Today's focus already covers it.
- **`before_ovulation` + fertile window within 3 days** (`fertile_window_approaching`) → **keep**. This is genuinely anticipatory (user is not yet in the fertile window), so it complements rather than duplicates Today's focus.

All log-driven insights remain untouched:
- `positive_pregnancy_test`
- `period_started`
- `repeated_negative_tests`
- `no_logs_yet`

The `TTCInsightId` union will lose `in_fertile_window`, `two_week_wait`, and `testing_soon`. No other files need changes — `TTCJourneyInsights.tsx`, `TTCJourneyFocusCard.tsx`, and `MyTTCJourney.tsx` render whatever the helper returns.

### Files
- Inspect: `src/lib/ttcInsights.ts`, `src/components/ttc/journey/TTCJourneyInsights.tsx`, `src/components/ttc/journey/TTCJourneyFocusCard.tsx`, `src/pages/MyTTCJourney.tsx`
- Edit: `src/lib/ttcInsights.ts` only

### Verification
- `bunx tsgo --noEmit`
- Walk through mental test cases:
  1. Two-week wait, no logs → Insights empty of stage card; Today's focus shows two-week wait.
  2. Positive test logged → positive-test insight present; no generic stage duplicate.
  3. Period started near expected date → period-start insight present.
  4. No logs, before ovulation with fertile window >3 days away → no-logs insight only.
  5. Before ovulation with fertile window in 2 days → anticipatory "fertile window may be coming up" insight remains (Today's focus shows current before-ovulation state, not the upcoming window, so no duplication).
  6. In fertile window → no fertile-window insight; Today's focus owns it.

### Not touching
Data model, logs, RLS, analytics events, SEO, sitemap, robots, calculator formulas, layout, or copy in any other component.
