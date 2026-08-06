# Phase 16.5A — Signed-in Navigation Lifecycle Polish (Plan)

## Audit findings

**Who renders "This week" and "My journey"**

1. `src/components/myweek/MyWeekHeader.tsx` — the shared signed-in top header. It hardcodes two desktop links: "This week" → `/my-week` and "My journey" → `/my-journey`, plus the logo linking to `/my-week`, plus an account menu (Account settings, Sign out). It knows nothing about lifecycle. It is mounted by 18 signed-in pages, including `MyFirstYear.tsx` and `MyPregnancyChapter.tsx` — that is the source of the reported problem.
2. `src/components/layout/JourneyBottomNav.tsx` — the mobile-only bottom bar. Its `Lifecycle` type is `"pregnancy" | "ttc"` only, its route lists cover `/my-week`, `/my-journey`, `/pregnancy-toolkit`, `/my-ttc-journey`, `/account`. On First Year routes `routeLifecycle` is `null` and the fetched lifecycle (`first_year`) is coerced to `null`, so **the bottom bar does not render at all on `/my-first-year` and `/my-pregnancy-chapter`** — First Year has no mobile nav today.
3. `src/components/layout/Navbar.tsx` — the public header. Its authed CTA resolves from `journeys.lifecycle`: `ttc` → "My TTC Journey", `pregnancy` → "My Week", anything else → **"Set up journey" → `/due-date-calculator`**. So a First Year user browsing public pages is pushed at a pregnancy due-date calculator. This is an existing issue worth fixing in the same phase.

**Lifecycle awareness**

- Neither `MyWeekHeader` nor `JourneyBottomNav` receives lifecycle from a context; there is no shared journey/lifecycle provider in the app. `JourneyBottomNav` and `Navbar` each fetch `journeys.lifecycle` themselves with their own auth listener.
- The nav does not need the journey pointer (due date, baby records) — only the lifecycle string. No new data access is needed beyond the same `journeys.lifecycle` select these components already run.
- Recommendation: keep the existing pattern (small self-fetch), but extract it once into a tiny shared hook (`useLifecycle`) used by all three components rather than adding a global provider. Lower risk, no App-level wiring.

**Scope answers**

- Labels/links can change **without touching route guards** — guards live in the page components and already handle every lifecycle correctly.
- TTC nav: no defect found. `TTC_TABS` and the Navbar TTC CTA are correct. No change.
- Public navigation (`navLinks`): unchanged. Only the authed CTA target changes.
- Account/profile menu: unchanged behaviour (Account settings + Sign out stay identical for all lifecycles).

## Recommended navigation by lifecycle

Top header (`MyWeekHeader`):

| Lifecycle | Logo → | Link 1 | Link 2 |
|---|---|---|---|
| pregnancy (default/unknown) | `/my-week` | This week → `/my-week` | My journey → `/my-journey` |
| first_year | `/my-first-year` | First Year → `/my-first-year` | Pregnancy chapter → `/my-pregnancy-chapter` (only when a kept chapter exists) |
| ttc | `/my-ttc-journey` | My journey → `/my-ttc-journey` | — |

Mobile bottom nav (`JourneyBottomNav`), new `FIRST_YEAR_TABS`:

- First Year → `/my-first-year`
- Pregnancy chapter → `/my-pregnancy-chapter` (conditional, same rule as header)
- Account → `/account`

Public navbar authed CTA: `first_year` → "My First Year" → `/my-first-year`.

**Pregnancy-chapter visibility rule:** rather than a per-nav database lookup, render the link whenever lifecycle is `first_year` and the existing `getKeptPregnancyChapter` helper resolves a chapter (fetched once inside the shared hook, cached per mount). If it resolves nothing, the link is omitted and `/my-pregnancy-chapter`'s own empty state remains the fallback. No dead links either way.

## Files that would change (Phase 16.5B)

- `src/lib/useLifecycle.ts` (new) — shared hook returning `{ authed, lifecycle, hasKeptChapter }`.
- `src/components/myweek/MyWeekHeader.tsx` — lifecycle-driven logo target and links.
- `src/components/layout/JourneyBottomNav.tsx` — add `first_year` to the lifecycle union, add `FIRST_YEAR_ROUTES` and `FIRST_YEAR_TABS`.
- `src/components/layout/Navbar.tsx` — `first_year` authed CTA.
- `src/lib/analyticsEvents.ts` — extend `JourneyNavTab` with `my_first_year` and `pregnancy_chapter`.
- `src/lib/navLifecycle.test.ts` (new) — unit tests for label/link resolution per lifecycle.

## Files that must not change

Route guards in `MyFirstYear.tsx`, `MyPregnancyChapter.tsx`, `MyWeek.tsx`, `MyJourney.tsx`, `KeptChapter.tsx`; `src/App.tsx`; `src/lib/authIntent.ts`; `src/lib/firstYearJourney.ts` (read-only consumption only); public page content; `scripts/generate-sitemap.ts`; `public/robots.txt`; any migration.

- Route guards: untouched.
- Auth intent: no change needed — `/my-first-year` and `/my-pregnancy-chapter` are already protected prefixes.
- Tests: yes, a small pure-logic test for the label/link resolver.

## QA plan

1. Type-check, full Vitest suite, production build.
2. Playwright with a disposable First Year account: `/my-first-year` and `/my-pregnancy-chapter` show "First Year" and "Pregnancy chapter", no `/my-week` or `/my-journey` links anywhere in the header or bottom bar, logo goes to `/my-first-year`, bottom bar visible at mobile width.
3. Disposable pregnancy account: header and bottom bar unchanged from today.
4. TTC account: unchanged.
5. Signed-out: public navbar unchanged.
6. First Year account with no kept chapter: "Pregnancy chapter" link absent, no dead links.

## Risks and open questions

- Brief label flicker while the lifecycle fetch resolves on non-journey routes; mitigated by inferring lifecycle from the current route first (the pattern the bottom nav already uses).
- Should `/pregnancy-toolkit` remain reachable for First Year users? Current recommendation: no toolkit tab in the First Year nav; the route keeps its own guard.
- Multiples wording is unaffected — nav labels stay generic ("First Year"), not baby-named.

Phase 16.5B build can proceed once this is approved.
