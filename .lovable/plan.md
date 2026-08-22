# Phase 28G - TTC to Pregnancy Handover Upgrade

Presentation and placement only. No schema, RLS, auth, AI, routes, cycle maths or logging changes.

## Discovery findings

1. `TTCPregnancyHandover` is a static section rendered last on `/my-ttc-journey`, above the "Remove my TTC journey" block. It shows one heading, body, a primary button that opens a dialog, plus two quiet links (due date calculator, pregnancy hub).
2. On confirm it navigates to `/due-date-results?lmp=<timestamp>&from=ttc-positive` when a saved cycle start exists, otherwise `/due-date-calculator?from=ttc-positive`. No journey is created there.
3. Dialog: title "Move into pregnancy guidance?", body mentioning the saved cycle start, actions "Not yet" and "Continue to due date calculator". Uses `AlertDialog`, not browser confirm.
4. Positive tests are rows in `ttc_logs` with `log_type: "pregnancy_test"` and `value: "positive"`.
5. A helper already exists: `hasPositivePregnancyTest(logs)` in `src/lib/ttcSupportMoment.ts`. It is not date scoped to the current cycle.
6. Pregnancy state is read in `MyTTCJourney.tsx` from the `journeys` pointer row (`lifecycle === "pregnancy"`), which sets page status `pregnancy_active`.
7. That state renders a full-page paused screen with a link to `/my-journey`; the dashboard is not shown.
8. With no positive test, the handover still renders in the same low position with the same copy.
9. With a positive test, support moments are suppressed (`computeTTCSupportMoment` returns null) but the handover placement does not change.
10. Handover passes state via query params only (`lmp` timestamp, `from`). No router state.
11. No note text or log rows are passed forward. Only the saved cycle start date is used.
12. Improvable without schema or route changes: state-aware placement and copy, current-cycle scoping of the positive test, dialog wording, Today card acknowledgement, and Ask chip ordering.

## What will change

### New pure helper `src/lib/ttcHandoverState.ts`
- `computeTTCHandoverState({ hasActivePregnancy, logs, cycleStart, today })` returning `"neutral" | "positive_test_logged" | "active_pregnancy_exists"`.
- Positive test counts only when the `pregnancy_test` / `positive` log date is on or after the saved cycle start (current cycle).
- Takes only booleans, log type/value/date, and the already saved cycle start. No note text, no ids, no raw rows leave the helper.
- Also exports the copy sets so a guardrail test can scan every new string.

### `TTCPregnancyHandover.tsx`
- Accepts a `state` prop and renders the matching copy set (raised or neutral), with a `Stay with TTC for now` quiet link in the raised state.
- Raised state gains a warmer surface: existing TTC paper card with sage wash plus a light peach transition accent drawn from existing tokens, botanical accent, 44px targets, visible focus rings.
- Dialog copy softened to the approved wording, with actions "Not yet" and "Continue". Confirm behaviour and route unchanged.

### `src/pages/MyTTCJourney.tsx`
- Compute the handover state from data already on the page.
- When `positive_test_logged`, render the handover directly after the Today card and support moment; otherwise keep it in its current low position. Only one instance renders.
- Polish the existing `pregnancy_active` screen copy to the approved wording, keeping the same link to `/my-journey` and the same lifecycle logic.

### `TTCTodayCard.tsx`
- When the handover state is raised, replace the headline and support line with the gentle "You may be ready for a new step" wording. No new actions.

### Ask companion
- Order-only tweak so the Ask card does not compete when the handover is raised. No mode, backend or topic changes; companion name stays sourced from existing companion identity.

## Tests
New `src/lib/ttcHandoverState.test.ts` covering: neutral with no positive test, neutral when the positive test predates the current cycle start, raised for a current-cycle positive test, active pregnancy precedence, no note text in the helper output, and a copy guardrail scan over all new strings (British English, no banned words, no em dashes).

## Verification
`npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, plus a Playwright pass at 390px and 1440px across the TTC surfaces and one signed-in pregnancy and First Year route, checking overflow, console, tap targets and nav.

Nano Banana will be used inside Lovable to refine the handover surface before implementation.
