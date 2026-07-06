# Phase 4.7 — Remove legacy Explore and Guidance pages

Audit complete. Two live standalone pages need removal:

- `/explore` → `src/pages/Explore.tsx` (registered in `src/App.tsx` line 201)
- `/guidance` → `src/pages/GuidanceLibrary.tsx` (registered in `src/App.tsx` line 333)

Both are separate from the current article system, trimester landings, hubs, and topic pages, which stay untouched.

Scope note: this phase only removes live route registrations, page files, page-exclusive components, and `<Link>` / `<Navigate>` targets that point at `/explore` or `/guidance`. Ordinary copy that uses the word "guidance" (headings, "Related guidance", "Pregnancy guidance", body text, labels) is left exactly as-is.

## Files to delete

- `src/pages/Explore.tsx`
- `src/pages/GuidanceLibrary.tsx`
- `src/components/explore/` — entire folder, only used by `Explore.tsx`: `ExploreHero`, `StageNavSection`, `ContinueJourneySection`, `QuickActionsSection`, `GuidanceSection`, `AIReassuranceSection`, `BrandPositioningSection`
- Guidance components used only by `GuidanceLibrary.tsx`: `src/components/guidance/GuidanceHero.tsx`, `GuidanceAIBridge.tsx`, `GuidanceBrowseAll.tsx`, `GuidanceCompareGuides.tsx`, `GuidanceEditorialBreak.tsx`, `GuidanceFeaturedGuides.tsx`, `GuidanceJourneyPathways.tsx`, `GuidancePopularQuestions.tsx`, `GuidanceStageCarousels.tsx`, `GuidanceTopicSections.tsx` — each re-verified with `rg` before deletion; any component still imported elsewhere is kept

Image assets under `src/assets/guidance-*` are left in place (reused by `src/data/ttcFlagshipOverrides.ts` and other hub content).

## Files to edit

Route + import removal:
- `src/App.tsx` — remove `import Explore` (line 7), `import GuidanceLibrary` (line 129), `<Route path="/explore" …>` (line 201), `<Route path="/guidance" …>` (line 333)

Link target replacements only (no copy, label, layout, or class changes). Replace `to="/explore"` and `to="/guidance"` with a valid current destination — default `/pregnancy`; for week pages use the matching trimester hub (weeks 1–12 → `/pregnancy/first-trimester`, 13–27 → `/pregnancy/second-trimester`, 28+ → `/pregnancy/third-trimester`):

- `src/components/layout/Footer.tsx` line 65 — Resources list `/explore` entry: swap target to `/pregnancy` and label to "Pregnancy" (label change only because "Explore" is the link target name, not body copy)
- `src/components/home/CTASection.tsx` line 31 — `to="/explore"` → `to="/pregnancy"`
- `src/pages/NotFound.tsx` line 39 — `to="/explore"` → `to="/"`
- `src/pages/AskPage.tsx` lines 22, 179, 308 — `/explore` targets → `/pregnancy` (IVF branch on line 308 keeps `/ivf`). Visible labels ("Explore guidance", "Explore") stay unchanged
- `src/pages/ArticlePage.tsx` line 15 — `<Navigate to="/explore" replace />` → `<Navigate to="/" replace />`
- Week pages with `<Link to="/guidance" …>` (target only, visible label untouched): `Week1Page`, `Week2Page`, `Week3Page`, `Week4Page`, `Week5Page`, `Week6Page`, `Week7Page`, `Week8Page`, `Week9Page`, `Week10Page`, `Week11Page`, `Week12Page`, `Week13Page`, `Week14Page`, `Week15Page`, `Week16Page`, `Week17Page`, `Week18Page`, `Week19Page`, `Week20Page`, `Week21Page`, `Week22Page`, `Week23Page`, `Week24Page`, `Week25Page`, `Week26Page`, `Week27Page`, `Week28Page`, `Week29Page`, `Week31Page`, `Week33Page`, `Week34Page`, `Week35Page`, `Week36Page`, `Week39Page`, `Week40Page`, `Week41Page`, `Week42Page`, plus generic `WeekPage.tsx`

No other files touched. Comments that reference `/guidance` historically (e.g. `pregnancyTopicData.ts` line 573) are left alone — they are not live links.

## Not touched

Article system, `articleData.ts`, `familyArticleData.ts`, `firstYearArticleData.ts`, `toddlerArticleData.ts`, `pregnancyTopicData.ts`, all trimester landings, TTC / IVF / First Year / Toddler / Family / Product / About / Support / Ask internals beyond the three link swaps above, calculators, saved journey, AI logic, design tokens, `.lovable/plan.md`, SEO config, redirects, canonicals. All ordinary "guidance" wording in headings and body copy stays.

## Route behaviour after deletion

- `/explore` and `/guidance` fall through to `NotFound` via the existing `path="*"` route. No redirects added, no `noindex`, no canonical changes.

## Verification

- `tsgo` typecheck.
- Load `/explore` and `/guidance` → both render NotFound.
- Load `/pregnancy`, `/pregnancy/first-trimester`, `/pregnancy/second-trimester`, `/pregnancy/third-trimester`, `/articles/first-trimester-complete-guide`, `/articles/emotional-wellbeing-pregnancy` → all still render.
- `rg 'to="/explore"|to="/guidance"|path="/explore"|path="/guidance"|Navigate to="/explore"|Navigate to="/guidance"'` returns no matches. Plain-text uses of the word "guidance" remain and are expected.
