# Phase 16.5B — Signed-in Navigation Lifecycle Polish (Build)

Navigation polish only. No route guards, schema, migrations, RLS, RPCs, AI, tracking features, memories or public page content change.

## Audit (confirmed)

- `src/components/myweek/MyWeekHeader.tsx` is the shared signed-in header used by 18 pages including `MyFirstYear.tsx` and `MyPregnancyChapter.tsx`. It hardcodes logo → `/my-week`, "This week" → `/my-week`, "My journey" → `/my-journey`.
- `src/components/layout/JourneyBottomNav.tsx` types lifecycle as `"pregnancy" | "ttc"` only and matches no First Year route, so the mobile bar does not render on `/my-first-year` or `/my-pregnancy-chapter`.
- `src/components/layout/Navbar.tsx` authed CTA falls through to "Set up journey" → `/due-date-calculator` for `first_year`.
- No lifecycle context exists; each nav component self-fetches `journeys.lifecycle`.

## Build

1. **`src/lib/navLifecycle.ts` (new)** — pure resolvers: `resolveHomeHref`, `resolveHeaderLinks(lifecycle, hasKeptChapter)`, `resolvePublicAccountLink`. First Year returns "First Year" → `/my-first-year` and, only when a chapter exists, "Pregnancy chapter" → `/my-pregnancy-chapter`. Pregnancy, TTC and unknown fall back exactly as today.
2. **`src/lib/useLifecycle.ts` (new)** — `{ authed, lifecycle, hasKeptChapter, loading }`. Reads `journeys.lifecycle`; for `first_year` only, one boolean check: `first_year_journeys.archived_pregnancy_journey_id`, falling back to a single-row `archived_journeys` existence query. No reflections, photos, media memories or signed URLs.
3. **`MyWeekHeader.tsx`** — logo target and desktop links come from the resolvers. Account menu unchanged.
4. **`JourneyBottomNav.tsx`** — add `first_year` to the lifecycle union, `FIRST_YEAR_ROUTES` (`/my-first-year`, `/my-pregnancy-chapter`), and `FIRST_YEAR_TABS` (First Year, Pregnancy chapter when kept, Account). Pregnancy and TTC tabs untouched.
5. **`Navbar.tsx`** — authed CTA via `resolvePublicAccountLink`; public links untouched.
6. **`src/lib/analyticsEvents.ts`** — extend `JourneyNavTab` with `my_first_year` and `pregnancy_chapter`. No existing event names change.
7. **`src/lib/navLifecycle.test.ts` (new)** — pregnancy, First Year with and without a kept chapter, TTC, unknown fallback, and an assertion that First Year never links to `/my-week` or `/my-journey`.

## Not changed

`src/App.tsx`, `src/lib/authIntent.ts`, all route guards and journey pages, schema, migrations, RPCs, RLS, generated types, sitemap script, robots, public content, AI companion context.

## QA

Playwright with disposable accounts: First Year with a kept chapter, First Year without one, pregnancy regression, TTC regression, signed-out public nav. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, reporting sitemap and dist results.
