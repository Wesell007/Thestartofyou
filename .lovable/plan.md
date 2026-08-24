# Phase 29B close-out: NotFound companion suppression + footer tap targets

## What I confirmed (read-only)

- The catch-all route `path="*"` in `src/App.tsx` renders `NotFound`, but launcher visibility in `src/lib/companion/companionSurface.ts` is decided by pathname prefixes only (`/ask`, `/auth`, `/setup`, `/not-found`, `/404`). So on arbitrary unknown paths such as `/random-page-that-does-not-exist` or `/pregnancy/random-page` the launcher will still render. This needs the micro-fix.
- The panel footer buttons ("Start again", "Open full Ask page") use a small quiet-button style with `px-0` and no minimum height, so their clickable area is smaller than 44px.

## Micro-fix 1: hide the companion on any NotFound render

- Add a session-only suppression flag to `CompanionProvider` (a counter/boolean in context, no storage, no analytics) plus a small hook, e.g. `useSuppressCompanion()`, that sets it while mounted and clears it on unmount.
- Call that hook once inside `src/pages/NotFound.tsx`. No route, SEO, sitemap or copy changes on that page.
- `visible` becomes `shouldShowCompanionLauncher(pathname) && !suppressed`; the existing effect already closes the panel when `visible` turns false, so the panel cannot be opened on a 404.

## Micro-fix 2: 44px footer targets

- In `CompanionPanel.tsx`, give both footer buttons `min-h-[44px]` and horizontal padding while keeping the visible text size and the current left/right alignment (negative-margin or `-mx-2` compensation so the layout does not shift).

## Verification

- Playwright sweep at 390px and 1440px over `/random-page-that-does-not-exist`, `/trying-to-conceive/random-page`, `/pregnancy/random-page`, `/first-year/random-page`: assert the NotFound H1 renders, no launcher in the DOM, no unexpected console errors (the existing intentional `console.error("404 Error: ...")` log stays).
- Measure the two footer buttons' bounding boxes on a route where the panel opens, confirming height >= 44.
- Then run `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`.

## Out of scope (unchanged)

Backend, prompts, schema, RLS, storage, auth, AI modes, RAG, grounding, voice, persisted chat, old Ask surfaces, routes, sitemap, SEO.
