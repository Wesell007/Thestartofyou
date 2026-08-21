# Phase 26L — First Year Launch Readiness QA and Polish

A QA and polish pass across the signed-in First Year experience. No new features, routes, tables, migrations, AI behaviour or redesigns.

## Step 1 — Discovery (no code changes)

Read the current implementation of the three primary routes and their supporting components:

- Home: hero panel and decor, note card, Ask Cindy card, Memories card, Today card, guidance sections
- Today: quick add tiles, feed/sleep/nappy/moment sheets, active timer, Today so far, Last logged, Gentle reminders, notification control, Cindy day recap, daily rhythm
- Memories: list, empty state, add/edit sheet, photo field, photo viewer, signed URL hook
- Shared: app shell, bottom navigation, signed-in desktop header, analytics banner

Then run a signed-in browser pass (minted preview session) at 390px and 1440px on each route, walking the required QA flows and capturing:

- console output during every flow
- horizontal overflow measurements
- bottom nav active state and clearance
- sheet, viewer and analytics banner layering
- focus rings and keyboard reachability
- copy guardrail scan and hardcoded colour scan on touched files

Findings are reported before any fix is made. No fix is assumed in advance.

## Step 2 — Narrow fixes only

Only issues that are clearly rough, broken or inconsistent get fixed, each kept minimal and explained:

- spacing, mobile overlap, bottom-nav clearance
- sheet or viewer layering above the bottom nav
- focus ring visibility, `aria-current`, button labels, decorative SVGs staying `aria-hidden`
- empty, loading and error state polish
- copy consistency and British English
- console warnings or errors caused by current First Year flows
- stale state cleanup and obvious broken interactions

Anything larger is reported as a remaining concern instead of being changed.

## Step 3 — Verification

- `npx tsgo --noEmit -p tsconfig.json`
- targeted vitest for any touched area, then `npx vitest run`
- `npm run build`
- Re-run the browser pass on all three routes at 390px and 1440px, with the analytics banner both present and dismissed
- Light smoke check that `/first-year` public routes, `/setup/first-year`, `/my-pregnancy-chapter` and public pregnancy routes are unaffected

## Step 4 — Report

Full report covering all 27 requested items, including whether Phase 26L can close. Work stops after the report.

## Technical notes

- Fixes stay in presentation and component code; no schema, RLS, storage or edge function changes.
- Colours come from existing HSL tokens and `firstYearStyles.ts`; no hex literals.
- Tests are added or updated only where a fix needs coverage.
