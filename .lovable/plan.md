# Phase 26C Final Microcopy Fix

Copy-only pass on the Today page and log sheets. No rebuild, no logic, schema, validation, RLS, routes, sitemap or AI changes.

## Fix 1: Hero copy

`src/pages/firstyear/FirstYearToday.tsx` — intro paragraph under "Today's rhythm".

- Current: "A private place to log how the day has gone for {babies}. Log as much or as little as you like. Nothing is scored, compared or turned into advice."
- New: "A private place to log how the day has gone for {babies}. Log as much or as little as you like. This is just here to help you remember the day."

Heading stays "Today's rhythm".

## Fix 2: Sheet helper copy

`src/components/firstyear/today/LogSheet.tsx` — the single shared `DialogDescription` becomes per-type.

- Feed: "Choose breast or bottle, then add anything useful. The rest is optional and stays private to you."
- Sleep: "Start a timer or add the times you remember. The rest is optional and stays private to you."
- Nappy: "Choose what was in the nappy, then add anything useful. The rest is optional and stays private to you."
- Moment: "Add a few words for something you want to remember from today."


Implemented as a small description map keyed by event type, matching the existing `TITLES` / `EDIT_TITLES` pattern. No behaviour change.

## Fix 3: Copy guardrail check

Search the changed copy for: score, scored, tracker, prediction, predicts, ideal, optimal, risk, diagnosis, symptom checker, safe, unsafe, normal, abnormal, em dashes. No medical advice, sleep advice or recommendation language introduced.

## Fix 4: Screenshots

Playwright pass with the analytics banner rejected first: 390px Today, 390px Moment sheet, 1440px Today.

## Report returned

Files changed, copy changes, the three screenshots, guardrail result, typecheck, targeted tests, build, and whether Phase 26C can close.
