# Phase 18B — remaining signed-in visual QA

The preview session is still signed out (`LOVABLE_BROWSER_AUTH_STATUS=signed_out`, no session injected), so no authenticated route can be reached yet. Creating disposable accounts and seeding rows are state-changing actions, which plan mode does not allow. This plan covers exactly what runs once approved.

## Prerequisite

Either:
- you sign in to the preview once (the session injects on the next turn, and QA runs against that account), or
- I create disposable test accounts via the backend admin path and clean them up afterwards.

Nothing touches your live personal account either way.

## QA scenarios on /my-first-year

Each scenario is set up, screenshotted at 390px and 1440px, then torn down.

1. Single baby, no notes — page renders, Today card is the clear primary action, no recently saved preview, empty state copy reads warm, Today CTA points at `/my-first-year/today`, public guide link is a quiet text link.
2. Single baby, notes saved — preview appears, at most three short lines, links to `/my-first-year/today`, reads as a glance rather than a feed, tracker or timeline.
3. Twins — baby summary handles multiples, Today subject reads naturally for both names, layout not crowded, preview stays light.
4. Transition user with kept pregnancy chapter — card sits above the support lanes, its link works, Today card stays primary, pregnancy notes stay out of First Year notes.
5. Direct-start user — no kept chapter card, page still reads complete.

## Layout and accessibility checks

- 390px and 1440px: no horizontal overflow, hero does not push the Today card below the fold, support lanes side by side at `lg`, desktop balance.
- Tab order reaches the Today CTA before the support links; visible focus on every link and button; heading order clean (single h1, no skipped levels).
- Console errors, page errors and failed network requests captured per scenario.

## Cleanup

Delete every disposable row created (babies, first_year_journeys, journeys, first_year_entries) and the disposable auth users where deletion is available; confirm no rows belonging to the live personal account were read or changed.

## Code changes

None expected. If QA exposes a real presentation issue, I fix it within the approved Phase 18B scope only and rerun `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run` and `npm run build`.

## Report

Signed-in browser status, accounts used, one result per scenario, mobile, desktop, accessibility/tab order, console/page/network errors, cleanup, whether code changed (and command results if so), remaining blockers, and whether Phase 18B can close. I stop after that report.
