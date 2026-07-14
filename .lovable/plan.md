# Phase 9.5g — TTC Journey QA and Polish

Focused QA, bug-fix and copy-polish pass. No new features, no schema, no SEO/sitemap/hub edits, no calculator formula changes.

## Findings from initial sweep

Banned-language grep against user-facing TTC files (`src/pages/SetupTTC.tsx`, `src/pages/MyTTCJourney.tsx`, `src/components/ttc/journey/*`, `src/lib/ttc*`): **no** hits for "safe days / unsafe days / guaranteed / perfect timing / confirmed ovulation / you are pregnant / you are not pregnant / fertility score". Clean.

Dash sweep against user-facing TTC files: two hits that violate the "strictly no dashes" core rule.

1. `src/pages/SetupTTC.tsx:189` — CTA label `"Continue — sign in to save"` uses an em dash.
2. `src/components/ttc/journey/TTCJourneySummary.tsx:31` — fertile-window range uses en dash `"d MMM – d MMM"`.

All other dash matches are inside code comments (not user-facing) and are left alone.

## Fixes to apply

### 1. `src/pages/SetupTTC.tsx`
- Replace `"Continue — sign in to save"` with `"Continue, sign in to save"`.

### 2. `src/components/ttc/journey/TTCJourneySummary.tsx`
- Replace fertile-window separator `" – "` with `" to "` (British-English natural phrasing, no dash).

No other code, layout, analytics, DB or route changes.

## QA verification (read-only, reported back in summary)

1. Static: `bunx tsgo --noEmit`.
2. Banned-language regrep across TTC user-facing files after the two edits.
3. Dash regrep across TTC user-facing files to confirm zero remaining.
4. HTTP smoke on the 16 routes in the request (`/setup/trying-to-conceive`, `/my-ttc-journey`, `/ovulation-calculator`, `/trying-to-conceive`, `/my-journey`, `/my-week`, `/setup`, `/due-date-calculator`, `/due-date-results`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`, `/sitemap.xml`, `/robots.txt`).
5. Playwright at 375px on `/my-ttc-journey` (session injected if available) to screenshot dashboard, calendar, insights, handover dialog; confirm no overflow and clickable-day affordance.
6. `psql` checks on `public.ttc_journeys` and `public.ttc_logs`: RLS enabled, owner-scoped policies present, grants correct, no `anon` access, `set_updated_at` triggers in place.
7. Grep audit of analytics call sites in TTC files to confirm envelope-only payloads (no cycle dates, log values, notes, test results, treatment/support/IVF status).
8. Grep audit to confirm `/my-ttc-journey` never writes to `pregnancy_journeys`, never mutates `journeys.lifecycle`, never touches `ttc_journeys.positive_test_status`, and handover routes only into `/due-date-calculator` or `/due-date-results` with the documented query shape (fallback to `/due-date-calculator` if results route flag proves unreliable during smoke).

## Explicitly out of scope
New features, tables, routes, SEO/sitemap/robots edits, calculator formula changes, pregnancy-journey creation from TTC dashboard, TTC archive automation, lifecycle switching, medical interpretation, reminders/notifications, hub/pregnancy/IVF/family/first-year/toddler content edits.

## Deliverable
QA summary covering every checklist item from the request: files inspected, files edited (the two above only unless smoke uncovers a real bug), end-to-end save flow, setup form, dashboard states, calendar/logging, insights, handover, privacy/analytics, banned-language sweep, mobile QA, a11y polish, DB/RLS, calculator/SEO/sitemap/robots preservation, `tsgo` result, route regression, any unverified auth flows, and a go/no-go for Phase 9.10.
