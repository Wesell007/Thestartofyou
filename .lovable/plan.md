# Phase 17D Micro-Copy Correction

Two final copy changes in `src/pages/firstyear/FirstYearToday.tsx`, then quick verification.

## Changes

1. **Nappies placeholder** — line 71
   - From: `"Much like yesterday…"`
   - To: `"Two changes this morning…"`

2. **Recent days intro** — line 619
   - From: `"The last few days you wrote something. Days with nothing written are just as fine."`
   - To: `"The last few days you wrote something. Gaps are part of it."`

## Verification

- `npx tsgo --noEmit -p tsconfig.json`
- Run targeted tests if any copy/snapshot tests are affected.
- `npm run build`
- Grep for the old banned wording to confirm removal.

## What is untouched

Logic, routes, schema, RLS, migrations, data layer, auth, export structure, tests (except any copy/snapshot updates if needed).
