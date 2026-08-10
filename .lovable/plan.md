# Phase 18B — remaining signed-in visual QA

Approved approach: disposable test accounts, seeded with the minimum rows per scenario, QA on `/my-first-year`, then full cleanup. The live personal account is never signed into, read or changed.

Note: the session is still in plan mode, which blocks account creation, row seeding and Playwright runs. Approving this plan (or switching to build mode) lets the QA run.

## Setup

Five disposable accounts created through the public sign-up endpoint (`qa18b-*@example.com`), each seeded with only the rows its scenario needs:

1. single baby, no notes — journeys, first_year_journeys, one baby
2. single baby, notes saved — as above plus two or three first_year_entries for today
3. twins — two babies, one note
4. transition user — archived pregnancy journey linked as the kept chapter
5. direct-start user — no archived chapter

## QA per scenario, at 390px and 1440px

Page renders; Today card is the clear primary action; Today CTA points at `/my-first-year/today`; public guide link is a quiet text link; recently saved preview appears only when notes exist and stays light (max three short lines, not a feed, tracker, timeline or dashboard); kept chapter card sits above the support lanes for transition users and its link works; no kept chapter card for direct-start; twins copy reads naturally and the layout is not crowded; support lanes side by side at `lg`; no horizontal overflow; hero does not push the Today card down.

## Accessibility and errors

Tab order reaches the Today CTA before the support links; visible focus on every link and button; clean heading order; console errors, page errors and failed network requests captured per scenario.

## Cleanup

Delete all disposable first_year_entries, babies, first_year_journeys, journeys, archived/pregnancy and reflection rows created for transition testing, profiles, and the disposable auth users where deletion is available. Confirm the live personal account was untouched.

## Code changes

None expected. Any real presentation issue is fixed within approved Phase 18B scope only, followed by `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run` and `npm run build`.

## Report

Signed-in browser status, accounts used, one result per scenario, mobile, desktop, accessibility/tab order, console/page/network errors, cleanup, whether code changed (with command results if so), remaining blockers, and whether Phase 18B can close. I stop after that report.
