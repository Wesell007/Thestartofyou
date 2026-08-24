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

## Micro-fix 3: no external source links inside the companion panel

`CompanionMessageList` renders answers with the shared `EditorialAnswer`, which passes markdown straight to `ReactMarkdown`, so any `[NHS](https://...)` links or a trailing "Sources" list in the model output become clickable links inside the panel. `/ask` uses the same component, so the fix must be opt-in.

- Add `src/lib/companion/companionAnswerText.ts`: strips a trailing "Sources"/"References" section and converts markdown links and bare URLs to plain text, leaving all other wording (including urgent-care and professional-care guidance) untouched. Covered by unit tests.
- Add an optional `disableLinks` prop to `EditorialAnswer` that renders anchors as plain text. Default is `false`, so `/ask` and every existing Ask surface behave exactly as today.
- In `CompanionMessageList`, run answer text through the sanitiser and pass `disableLinks`. Append one small non-clickable trust line under completed answers: "Guidance is checked against approved UK health sources."
- The internal "Open full Ask page" action stays. No backend, prompt, mode, allowlist or grounding change.
