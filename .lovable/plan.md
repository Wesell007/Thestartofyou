# Phase 9.5d — My TTC Journey Dashboard

Replace the `/my-ttc-journey` placeholder with a calm, useful first-version dashboard grounded in the saved TTC journey record. No logging, no handover automation, no changes to formulas, SEO, hubs, calculators, or pregnancy paths.

## Scope

- Rebuild `src/pages/MyTTCJourney.tsx` only (route stays protected via existing `ProtectedRoute`).
- Extract presentation into small components under `src/components/ttc/journey/` to keep the page readable.
- Add tiny display helpers to `src/lib/ttcDerived.ts` (stage label, cycle-day compute) — no formula changes.
- Optionally add `TTC_JOURNEY_DASHBOARD_VIEWED` to `src/lib/analyticsEvents.ts` (no properties).
- No DB changes. No new tables. No changes to `savedTTCJourney.ts` unless a small pregnancy-active read helper is needed (the file already exposes `getActiveTTCJourney` + a pregnancy pointer check pattern).

## Routing & guarding behaviour

- Signed-out → existing `ProtectedRoute` redirects through `/auth?intent=return_to_route&return_to=/my-ttc-journey`.
- Signed-in, no active TTC journey → calm empty state with CTA to `/setup/trying-to-conceive` (matches the placeholder's current `Navigate` pattern, upgraded to an empty state so users aren't bounced silently).
- Signed-in, active pregnancy journey (lifecycle = `pregnancy`) → calm message with link to `/my-journey`. Do not overwrite, switch, or create.
- Signed-in, active TTC journey → render dashboard.

## Page structure

```text
┌────────────────────────────────────────────────┐
│ Header: eyebrow, heading, subheading, note     │
├────────────────────────────────────────────────┤
│ Summary grid (6 cards)                         │
│  Cycle day │ Stage │ Fertile window            │
│  Ovulation │ Period │ Test day                 │
├────────────────────────────────────────────────┤
│ Cycle timeline (horizontal desktop, stacked m) │
├────────────────────────────────────────────────┤
│ Today's focus card (stage-specific)            │
├────────────────────────────────────────────────┤
│ Recommended guidance (3–4 cards)               │
├────────────────────────────────────────────────┤
│ Ask about this stage                           │
├────────────────────────────────────────────────┤
│ Update cycle details                           │
├────────────────────────────────────────────────┤
│ Positive test soft handover                    │
└────────────────────────────────────────────────┘
```

### Files

Create:
- `src/components/ttc/journey/TTCJourneySummary.tsx` — six-card grid over `ActiveTTCJourney` fields, "Not set yet" fallback.
- `src/components/ttc/journey/TTCJourneyTimeline.tsx` — six milestones (period start, fertile window, ovulation, two-week wait, test day, expected period), gentle progress marker for today.
- `src/components/ttc/journey/TTCJourneyFocusCard.tsx` — stage-driven heading/copy/primary link/ask link from a local `STAGE_COPY` map.
- `src/components/ttc/journey/TTCJourneyGuidance.tsx` — 3–4 guidance cards, quietly re-ordered by stage; adds fertility/IVF card only when `support_status`/`ivf_consideration` warrant.

Edit:
- `src/pages/MyTTCJourney.tsx` — load session + `getActiveTTCJourney`, branch (loading / signed-out handled by guard / pregnancy-active / empty / ready), compose the sections, recompute display stage via `computeTTCStage(new Date(), deriveTTCDates(...))` when the saved `stage` looks stale, fire optional view event once.
- `src/lib/ttcDerived.ts` — add `stageLabel(stage)` and `cycleDayFrom(lastPeriodDate, today)` display helpers (no formula changes).
- `src/lib/analyticsEvents.ts` — optional `TTC_JOURNEY_DASHBOARD_VIEWED` constant.
- `src/lib/savedTTCJourney.ts` — only if needed: small helper to read the pregnancy pointer without duplicating logic; otherwise inline in the page like `MyJourney.tsx` does.

## Data & display rules

- Read only `ttc_journeys` for the signed-in user via existing `getActiveTTCJourney`.
- Show: cycle day, stage, fertile window, ovulation, expected period, test day.
- Do not surface prominently: `ivf_consideration`, `support_status`, `uses_ovulation_tests`, `tracks_symptoms`, `cycle_regularity`. Use quietly for card selection only.
- Copy uses "may", "likely", "possible", "estimate". No "safe/unsafe days", no scores, no guarantees, no clinical claims.
- Missing dates → "Not set yet" with a soft nudge to `/setup/trying-to-conceive`.

## Ask/guidance link map (per stage)

| Stage | Focus primary link | Ask topic |
|---|---|---|
| before_ovulation | `/trying-to-conceive/cycle-tracking` | `cycle-tracking` |
| fertile_window | `/trying-to-conceive/ovulation` | `fertile-window` |
| likely_ovulation | `/articles/ovulation-signs` | `fertile-window` |
| two_week_wait | `/trying-to-conceive/two-week-wait` | `two-week-wait` |
| test_window | `/trying-to-conceive/pregnancy-tests` | `pregnancy-tests` |
| expected_period | `/trying-to-conceive/pregnancy-tests` | `when-to-ask-help` |

Guidance default set: ovulation, cycle-tracking, two-week-wait, pregnancy-tests. Reorder by stage; add `/trying-to-conceive/fertility` if `support_status` is `considering_help`/`in_treatment`; add `/ivf` if `ivf_consideration` is `considering`/`in_treatment`. Cap at four cards.

## Privacy / analytics

- No cycle dates, cycle length, stage, treatment status, or setup answers in analytics.
- Ask links carry `stage=ttc&topic=<slug>` only. Never dates or cycle values.
- Positive-test card links to `/due-date-calculator` and `/pregnancy` only — no journey mutation.

## Verification

- `bunx tsgo --noEmit` clean.
- Playwright: hit `/my-ttc-journey` signed-out → expect redirect to `/auth`; hit representative regression routes (`/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, `/my-journey`, `/my-week`, `/setup`, `/due-date-calculator`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`) for 200. Signed-in end-to-end dashboard rendering depends on injected browser auth availability; if unavailable, review code paths and report the limitation (same caveat as 9.5c).
- Confirm no changes to sitemap, robots, SEO components, calculator components, or article data.

## Deliverable notes for the closing summary

Will report: inspected/edited/created files, branch behaviour for each auth+journey state, stage strategy, timeline result, focus/guidance/ask/update/handover results, privacy result, analytics result, formula/SEO preservation, tsgo result, regression result, unverified auth flows, and readiness for Phase 9.5e.
