# Phase 29I QA Fix — Prototype Route Isolation

The analytics consent modal currently renders over the memory settings prototype. Fix it the same way the companion was suppressed: a single shared route predicate, checked before any storage, network or Supabase work.

## What changes

1. **Shared predicate** — new `src/lib/prototypeRoutes.ts` exporting `PROTOTYPE_ROUTE_PREFIX = "/prototype"` and `isPrototypeRoute(pathname)` (exact match or `/prototype/...`, trailing slash tolerated). One source of truth, mirroring `companionSurface.ts`.

2. **Consent banner** — `src/components/consent/ConsentBanner.tsx` reads the current pathname via `useLocation()` and returns `null` immediately when `isPrototypeRoute` is true. The consent-state effect (which calls `getAnalyticsConsent()` → `localStorage.getItem`) gets the same guard as its first statement, so no read, write or subscription happens on prototype routes. Hook order stays stable (guard inside the effect, early `return null` after hooks).

3. **Pageview tracking** — `src/components/analytics/RouteTracker.tsx` skips prototype paths, so no `page_viewed` is queued or forwarded there.

4. **Analytics identity bridge** — the bridge in `src/App.tsx` calls `supabase.auth.getSession()` and subscribes to auth changes on every route. It becomes route-aware: on a prototype path it does no Supabase work and fires no identify/auth events.

Nothing else changes: consent, analytics and the banner behave exactly as today on every non-prototype route, and no global disabling is introduced. The prototype's own design is untouched.

## Tests

Extend `src/pages/MemorySettingsPrototype.test.tsx` and add a small companion test file for the shared predicate:

- rendering the app shell at `/prototype/memory-settings` shows no consent banner ("Accept analytics" / "Reject analytics" absent) while the prototype page still renders
- no `localStorage`/`sessionStorage` read or write, and no `fetch`, on the prototype route (existing spies extended to cover the banner render path)
- `isPrototypeRoute` unit cases: `/prototype`, `/prototype/memory-settings`, trailing slash true; `/`, `/my-week`, `/prototypes` false
- consent banner still renders on a normal route (e.g. `/`) with consent unknown — proves no global disabling
- `RouteTracker` fires no pageview on a prototype path but still does on a normal path
- existing 29I guards re-asserted unchanged: companion suppressed, noindex present, synthetic items only

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, plus a Playwright smoke at 390 / 768 / 1440 on `/prototype/memory-settings` (no consent overlay, no horizontal overflow, no console errors, no network calls) and a re-check that the pregnancy, TTC and First Year companion routes still render. The known generated-file lint issue in `src/integrations/supabase/previewAuthStorage.ts` is reported as pre-existing and not touched.

Ends with the twelve-point Phase 29I QA report. Phase 29J is not started.
