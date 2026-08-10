# Phase 20B — Signed-in Visual QA via disposable test account

QA only. No schema, route, copy or spacing changes unless the QA exposes a real defect.
The live personal account is never read, signed into or changed.

## Disposable setup

1. Sign up a throwaway account (e.g. `qa-20b-<timestamp>@example.com`) through the app's own auth flow in Playwright, so all writes are owner-scoped by RLS.
2. Complete the minimum First Year setup through the UI: one baby, which creates the `babies` row, the active `first_year_journeys` row and the `journeys` lifecycle pointer.
3. For `/my-pregnancy-chapter`, add a kept pregnancy chapter for the disposable user only if the route needs one to render.

## QA steps

1. Capture screenshots at 390px and 1440px for:
   - `/my-first-year`
   - `/my-first-year/today`
   - `/my-first-year/memories`
   - `/my-pregnancy-chapter`
2. Per route confirm: title/hero clears the fixed header, no double padding, no horizontal overflow (`scrollWidth` vs `clientWidth`), clean heading order (h1/h2/h3 dump), visible focus rings when tabbing.
3. Phase 20B specifics: `/my-first-year` hero spacing correct, `/my-first-year/today` title spacing fixed, `/my-first-year/memories` unchanged, `/my-pregnancy-chapter` title spacing fixed, Today still primary, Memories still secondary, support lane copy balanced.
4. Collect console errors, page errors and failed app network requests across the run.

## Cleanup

Delete, for the disposable user only: first year entries, memories, babies, first year journey, journey row, pregnancy/archived chapter rows, profile, and the auth user where deletion is available.

## Report

Signed-in status, disposable account used, per-route results at both widths, overflow, focus, heading order, console/page/network, cleanup confirmation, whether any code change was needed, remaining blockers, and whether Phase 20B can close.

## If a defect appears

Report it first with evidence and a proposed minimal fix. Do not fix without approval. If a fix is approved, rerun `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`.
