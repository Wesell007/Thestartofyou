
# Phase 11.3 — SEO Small Fixes (revised)

Applying the user's correction: pipe separators, no dashes, in new protected route SEO titles.

## Fix 1 — Replace `/product` with `/journal` in internal links

Pure `to="/product"` → `to="/journal"` swap. No copy, styling, or logic changes.

**Components (9 files):**
- `src/components/about/AboutCTA.tsx`
- `src/components/about/AboutEcosystem.tsx`
- `src/components/about/AboutJournalConnection.tsx`
- `src/components/family/FamilyPathways.tsx`
- `src/components/home/JournalMoment.tsx`
- `src/components/home/JournalSection.tsx`
- `src/components/ivf/IVFTimelineResult.tsx`
- `src/components/pregnancy/KeepYourJourney.tsx`
- `src/components/shared/JournalPromotion.tsx`

**Pregnancy week pages (43 files):** `src/pages/Week1Page.tsx` … `Week42Page.tsx` and `src/pages/WeekPage.tsx`.

**`src/data/articleInventory.ts`:** update the single row for `product:the-start-of-you-journal` — change `route: "/product"` → `route: "/journal"`. Leave slug, keywords, notes, strategy metadata untouched.

`/product` route in `src/App.tsx` stays as `<Navigate to="/journal" replace />`.

## Fix 2 — Defensive `noindex` on protected/non-public routes

Add `SeoHead` with `noindex` and pipe-separated titles (no dashes).

- `src/pages/Auth.tsx` → `Sign in | The Start of You`
- `src/pages/Setup.tsx` → `Setup | The Start of You`
- `src/pages/SetupTTC.tsx` → `TTC setup | The Start of You`
- `src/pages/MyWeek.tsx` → `My week | The Start of You`
- `src/pages/KeptChapter.tsx` (`/my-week/:week`) → `My week | The Start of You`
- `src/pages/MyJourney.tsx` → `My journey | The Start of You`
- `src/pages/MyTTCJourney.tsx` → `My TTC journey | The Start of You`

Each edit: add `import SeoHead from "@/components/seo/SeoHead";` and render `<SeoHead title="…" description="…" canonical="https://thestartofyou.com/<path>" noindex />` at the top of the returned JSX. No structural or logic changes.

`/ttc-journey-calendar` has no matching page file in `src/pages/` — report as "no matching page found" and skip.

## Preserved

Content, article/topic/hub copy, calculators, Journey logic, auth, setup, ProtectedRoute, routes, redirects, sitemap generator, robots, RLS, database.

## Verification

- `bunx tsgo --noEmit`
- `rg 'to="/product"' src` returns zero hits.
- Confirm `/product` still redirects, sitemap still contains `/journal` and excludes `/product`.

## Deliverable

Report per phase brief: files inspected/edited, link cleanup result, week-page cleanup, inventory result, protected route noindex result, `/ttc-journey-calendar` note, preservation confirmations, typecheck result, Launch Readiness QA verdict.
