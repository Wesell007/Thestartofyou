# Phase 28A — TTC Journey Audit and Strategy

Audit only. No code changed.

## 1. Current TTC route map

Public
- `/trying-to-conceive` (TTCHub, 1105 lines)
- `/trying-to-conceive/legacy` (older TTC page, still mounted)
- `/ovulation-calculator` (canonical tool)
- `/trying-to-conceive/ovulation-calculator` (query-preserving redirect to canonical)
- Topic pages: `/ovulation`, `/preconception-health`, `/fertility`, `/ivf-and-treatment`, `/male-fertility`, `/age-and-fertility`, `/cycle-tracking`, `/pregnancy-tests`, `/two-week-wait`, `/conditions`
- Related articles under `/articles/...` (ovulation signs, when ovulation is hard to predict, and others)

Signed in
- `/my-ttc-journey` (protected)
- `/setup/trying-to-conceive` (not protected; save requires a session)
- `/ask?stage=ttc&topic=...` (shared Ask surface)
- `/due-date-results` and `/due-date-calculator` (handover targets)

Observation: TTC has one signed-in screen. Pregnancy has three (`/my-week`, `/my-journey`, `/pregnancy-toolkit`) and First Year has three. TTC bottom nav already renders three tabs (My journey, Ask, Account) so the shell is ready for more surfaces.

## 2. What exists today

- Data: `ttc_journeys` (cycle settings plus derived dates and stage) and `ttc_logs` (eight log types, user scoped by RLS). Helpers in `savedTTCJourney.ts`, `ttcLogs.ts`, `ttcDerived.ts`, `ttcInsights.ts`.
- `/my-ttc-journey` renders, in order: summary grid of six cards, milestone timeline, month calendar plus logging, gentle insights, focus card, guidance, Ask link, update setup, pregnancy handover, remove journey.
- Setup at `/setup/trying-to-conceive` collects last period, cycle length, period length, regularity, actively trying, ovulation tests, symptom tracking, support status and IVF consideration.
- Ovulation calculator with results-first behaviour when query params are present, plus a save-this-cycle route into setup.
- Handover: a user-triggered dialog that routes into the due date flow with the saved cycle start. It never writes a pregnancy journey itself.
- Own header (`TTCJourneyHeader`) plus the shared `JourneyBottomNav` TTC tabs.

## 3. What works well

- Data model and privacy: logs are user scoped, setup answers (treatment status, IVF consideration) are deliberately not surfaced in the summary, and log values are kept out of analytics.
- Estimate framing is already careful: "may", "possible", "likely", "not guarantees".
- Handover is user controlled and does not silently switch lifecycle.
- Insights engine is pure, deterministic and capped at four cards.
- Public TTC hub and topic pages are strong editorial content with sensible internal links.
- Sweep at 390px across nine TTC routes: no console errors, no horizontal overflow, one H1 per page, protected route redirects correctly, calculator renders results directly from query params.

## 4. What feels like a calculator or dashboard rather than a companion

- The six-card summary grid (cycle day, stage, fertile window, ovulation, expected period, test day) is the first thing on the page. It reads as a data readout, not as "today".
- Two overlapping time visualisations stacked: the milestone timeline and the month calendar. Neither is a cycle path.
- Section headings are utility labels: "Cycle calendar & logging", "Recent notes", "Keep it accurate".
- Logging is a select-driven sheet (type, then value, then notes) rather than tap-to-note chips.
- Ask is a link out to `/ask`, not an inline companion in context.
- "Remove my TTC journey" sits as a bare destructive link at the bottom of the main page.
- Visually the page uses parchment plus keepsake surfaces but has not had the Nano treatment that Pregnancy and First Year received. No watercolour, no botanical, no paper cards, no stage-coloured hero.

## 5. Missing against the Nano direction

- No "Today in your TTC journey" surface as a distinct, single-focus screen. The heading exists but the page beneath it is a dashboard.
- No cycle path. The calendar is a plain month grid, not a journey line you move along.
- No two-week wait companion. There is a stage label, one focus card and a public article. Nothing that changes the screen for those days.
- No negative test support flow. There is one insight after two or more negative or unclear tests in fourteen days, and that is all.
- Positive test handover exists but is buried at the very bottom, below "update setup".
- Ask Cindy is not present inside the TTC journey. It is a link with a topic query param.
- Cycle notes exist but are not framed as private notes and have no per-cycle history view.
- No cycle-to-cycle continuity. Starting a new cycle means editing setup manually; nothing is archived or carried over.
- No mobile app shell parity: no `TTCAppShell`, no in-shell header, no reserved nav inset styling equivalent to the pregnancy shell.

## 6. Copy flags

Against the guardrail list:
- `TTCAISupport.tsx` suggestion "Is this symptom normal?" — reframe away from normal or abnormal.
- `TTCWhatToExpect.tsx` "What feels normal one cycle may shift the next" — soften to "what you notice one cycle".
- `ttcTopicData.ts` questions "Is late ovulation normal?" and "What's a normal cycle length?" — reframe to "What can affect ovulation timing" and "How much can cycle length vary".
- `TTCWhatToExpect.tsx` "Ovulation prediction methods have real limitations" — the word is used to limit rather than promise, but it should be reworded to "ovulation tracking methods".
- `OvulationCalculator.tsx` "It cannot confirm ovulation or predict pregnancy" — negated, safe to keep.
- No occurrences of: guaranteed pregnancy, fertility score, score, risk, safe or unsafe days, abnormal, optimal, ideal, unlock, upgrade.

Tone flags outside the list:
- "Find your window" in the TTC hero reads as a promise.
- "Possible test day" as a summary card can push early testing; better as guidance inside a wait companion.
- "Remove your TTC journey and all of its logs? This cannot be undone." uses a raw `window.confirm`, which is blunt for a loss-sensitive product.

## 7. Does the ovulation calculator work

Yes. Verified live: `/ovulation-calculator` renders the form, the query-param route renders the result experience directly, the duplicate mount redirects while preserving the query string, and no console errors were seen. Derived dates come from `deriveTTCDates` and are consistent with the dashboard.

## 8. Does TTC connect into pregnancy

Partly. `TTCPregnancyHandover` routes to `/due-date-results?lmp=...&from=ttc-positive` after a confirmation dialog, and `/my-ttc-journey` correctly detects an active pregnancy pointer and shows a paused state. Gaps: the handover sits last on a long page, the TTC journey is not archived or referenced afterwards, and nothing brings the TTC story into the pregnancy chapter the way First Year keeps the pregnancy chapter.

## 9. Negative test support

Effectively no. Only the `repeated_negative_tests` insight, which needs two or more negative or unclear tests within fourteen days. There is no gentle screen state after a single negative, no "your period arrived" acknowledgement path, and no route into a new cycle.

## 10. Two-week wait support

Weak. `computeTTCStage` returns `two_week_wait` and the focus card shows one paragraph. There is no distinct wait surface, no day counter framed gently, no reduced-testing support and no daily reflection.

## 11. Is Ask Cindy strong enough

No. Inside `/my-ttc-journey` it is a static card with a link to `/ask` with a topic guessed from stage. Pregnancy has inline `SectionAskAI` with context. TTC has no inline ask, no cycle context passed to the model and no TTC-specific companion mode in `supabase/functions/_shared/aiModes.ts`.

## 12. Cycle notes: useful and private

Private, yes: RLS scoped, session checked on write, values kept out of analytics, and the page states "Only you can see this". Useful, only partly: the entry flow is a three-field form, only the eight most recent notes are shown, there is no per-cycle grouping, no quick chips and no way to look back over a previous cycle.

## 13. Premium on mobile

Not yet. No overflow and no console errors at 390px, and calendar controls are 36px, close to but under the 44px target. But the screen is long, flat and grid-heavy, uses the older parchment plus keepsake styling rather than the Nano paper and watercolour system now used in Pregnancy and First Year, and has no shell header. It reads as a functional dashboard rather than a premium companion.

## 14. Defects found

- Calendar month controls and "Add log" are 36px high, under the 44px tap target used elsewhere.
- `window.confirm` used for journey deletion instead of the app's alert dialog.
- `/trying-to-conceive/legacy` is still mounted and duplicates hub content.
- `/setup/trying-to-conceive` is not behind `ProtectedRoute`, so a signed-out user can complete the whole form before discovering they must sign in.
- No broken links, 404s, overflow or console errors found in the nine-route sweep.

## 15. Keep

- The data model: `ttc_journeys`, `ttc_logs`, RLS, RPCs, derived date helpers, stage computation.
- The insights engine and its tone.
- The ovulation calculator and its results experience.
- The handover mechanism (route into due date, never auto-create).
- The pregnancy-active paused state.
- The public hub, topic pages and article set.

## 16. Rebuild

- `/my-ttc-journey` as a Today-first companion screen, with the six-card grid replaced by one focus surface plus a cycle path.
- Calendar and logging: cycle path visual, quick chips, per-cycle notes view.
- Visual system: a Nano TTC token set and shared style module mirroring `pregnancyStyles.ts`, plus a TTC app shell and header.
- Ask: inline TTC companion with cycle context and a TTC mode in the shared AI modes file.
- Handover: raise the positive path and add a negative or period-arrived path.

## 17. Defer

- Partner sharing, IVF cycle tracking inside the journey, BBT charting, symptom trend analysis, notifications and reminders, TTC memories or keepsake media, TTC Memories route, and any TTC print or journal insert work.

## 18. Recommended Phase 28B scope

Phase 28B — TTC visual system and app shell (presentation only).
- Add TTC Nano tokens to `src/index.css` and a `ttcStyles.ts` module mirroring the pregnancy one.
- Add a TTC app shell and header with the same nav inset behaviour as the pregnancy shell.
- Restyle `/my-ttc-journey` surfaces onto the paper, watercolour and botanical system without changing logic, schema or logging behaviour.
- Fix the 44px tap targets and replace `window.confirm` with the alert dialog.
- Apply the copy fixes listed in section 6.

No new routes, no new tables, no AI changes in 28B.

## 19. TTC phase roadmap

- 28B — TTC visual system and app shell.
- 28C — Today in your TTC journey: single-focus Today surface and cycle path replacing the summary grid.
- 28D — Cycle notes rebuild: quick chips, per-cycle history, private notes framing.
- 28E — Two-week wait companion and negative test support, including period-arrived and new-cycle flows.
- 28F — Ask Cindy as a TTC companion: inline ask with cycle context and a TTC AI mode.
- 28G — Pregnancy handover upgrade: raised positive path plus carrying the TTC story into pregnancy.
- 28H — TTC launch readiness QA and polish.

## Technical notes

Files reviewed: `src/App.tsx`, `src/pages/MyTTCJourney.tsx`, `src/pages/SetupTTC.tsx`, `src/pages/OvulationCalculator.tsx`, `src/pages/TTCHub.tsx`, `src/components/ttc/journey/*`, `src/components/ttc/*`, `src/lib/ttcDerived.ts`, `src/lib/ttcLogs.ts`, `src/lib/ttcInsights.ts`, `src/lib/savedTTCJourney.ts`, `src/lib/navLifecycle.ts`, `src/components/layout/JourneyBottomNav.tsx`, `src/data/ttcTopicData.ts`.

Live sweep: headless Chromium at 390px across nine TTC routes, checking final URL, H1 count, horizontal overflow and console errors.
