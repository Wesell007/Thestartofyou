# The Start of You — Website Completion Audit (audit only)

Grounding workstream untouched: registry, evidence, digests and `AI_SOURCE_ROUTING_VERSION` (`30B-source-routing-v1`) were read-only. 0 candidates, 0 approvals, `listGroundingEligibleSlugs() = []`.

## 1. Route inventory (authoritative, from `src/App.tsx`)

Public content: `/`, `/pregnancy` + 6 topics + 3 trimesters + `/pregnancy/week/:week` (42 week pages resolved by glob in `PregnancyWeekRoute.tsx`), `/articles/:slug` (156 legacy articles), `/due-date-calculator`, `/due-date-results`, `/trying-to-conceive` (TTCHub) + 10 subtopics, `/ovulation-calculator`, `/ivf` + 3 + `/ivf-timeline`, `/first-year` + 4 phases + 13 months + 8 topics + `/first-year/:topic/:slug`, `/toddler` + 8 topics + 5 ages + `:topic/:slug`, `/family` + 6 topics + `:topic/:slug`, `/preparing-for-baby`, `/support`, `/about`, `/journal`, `/journal-start`, `/privacy`, `/terms`, `/ask`, `/auth`, `/setup`, `/setup/trying-to-conceive`, `/:journey/:stage` (StagePage catch), `*`.

Protected: `/my-week`, `/my-week/:week`, `/my-journey`, `/my-ttc-journey`, `/my-first-year` (+`/today`, `/memories`), `/my-pregnancy-chapter`, `/journey-support`, `/pregnancy-toolkit` + 9 sub-tools, `/account`, `/account-settings`, `/setup/first-year`.

Redirect/legacy/hidden: `/product`→`/journal`, `/postpartum`→`/first-year#recovery-topics` (+3 sub-redirects), `/articles/signs-of-ovulation`→`/articles/ovulation-signs`, `/trying-to-conceive/ovulation-calculator`→canonical, `/trying-to-conceive/legacy` (legacy, orphaned), `/postpartum/legacy` (legacy, orphaned), `/prototype/memory-settings` (intentionally hidden, noindex).

Classification: ~200 routes complete or functional-needs-polish; **incomplete/needs decision**: `/journal-start` (orphan, no inbound link, absent from sitemap), `/trying-to-conceive/legacy` + `/postpartum/legacy` (legacy, no expiry), `/trying-to-conceive/{understanding-your-cycle,timing-and-tracking,waiting-and-testing}` (in sitemap, served only by the `/:journey/:stage` catch-all), `/ask` (live but not in sitemap). No "coming soon" stubs exist.

## 2. Broken functionality

- **Dead link:** `src/components/ttc/TTCFinalCTA.tsx:65` → `/trying-to-conceive/understanding-your-cycle` has no explicit route (falls through to StagePage). Rendered on `/trying-to-conceive/legacy`.
- **Orphan routes:** `/journal-start`, `/trying-to-conceive/legacy`, `/postpartum/legacy` — zero inbound links.
- **Missing breadcrumbs on every hub landing page** (TTC, TTCHub, Pregnancy, FirstYear, Toddler, Family, IVF, Journal/Product, About, Support, Privacy, Terms); breadcrumbs only start at topic/article depth.
- No unwired buttons found; all 14 footer links resolve; the single external link (`ProductFinalCTA.tsx:64`) is correctly `rel="noopener noreferrer"`; signed-out Navbar branching degrades safely.
- Runtime pass at 1440/834/390: **no horizontal overflow, zero console errors** on `/`, `/pregnancy`, `/trying-to-conceive`, `/first-year`, `/toddler`, `/family`, `/ask`, `/journal`, `/about`, `/ovulation-calculator`.
- Externalised assets (`/__l5e/assets-v1/...`, 49 `.asset.json` descriptors) did not decode within the capture window on `/family` and `/toddler`; local `src/assets` equivalents serve 200. Needs a production verification pass before launch.

## 3. Content completeness

| System | Total | Ready | Gaps |
|---|---|---|---|
| Legacy `articleData.ts` (Pregnancy/TTC/IVF) | 156 | all live (no status field) | 116 with no hero, 22 with no `editorialSections`, 17 no `sources`, 17 no `lastUpdated`, 0 body images anywhere (`EditorialSection.image` unused) |
| Family | 18 | 18 | no hero/body image field in the interface at all; 4 missing `sources`; only 1/18 `reviewedBy` |
| First Year | 16 | 16 | no image fields; `reviewedBy` complete |
| Toddler | 16 | 16 | no image fields; **0/16 `seoDescription`**; only 4/16 `reviewedBy` |

- `articleInventory.ts` is stale: tracks 111 legacy articles vs 156 actual (**45 untracked**), and marks all 44 hub articles `draft` while the data files say `ready`.
- `signs-of-ovulation` still exists as a full article and is still referenced in three `relatedSlugs` arrays alongside its canonical replacement.

## 4. Visual / responsive

Benchmark quality (use as the reference): homepage hero + `NewHeroSection`, the flagship article template (`ArticleFlagshipTemplate`), the pregnancy week pages, and the First Year signed-in "Nano Banana" surfaces.

Gaps: Toddler hub desktop hero is ~50% empty (no hero art) vs the homepage/Family treatment — inconsistent hero treatment across hubs; hub landing pages lack breadcrumb/orientation chrome; Family mobile hero relies on a slow externalised asset; consent banner overlays first-viewport CTAs on mobile.

## 5. Companion UX

- Single provider mounted once (`App.tsx:207`), correct hidden prefixes, mobile bottom-sheet vs desktop drawer, ≥44px footer targets, Radix-backed ESC/focus trap.
- Naming clean: no user-visible "Cindy"; only a suggested-name option in `src/lib/companion.ts:7`.
- **Duplicate AI entry points:** the floating companion coexists on hub pages with the older inline `HubAISupport`/`AISearchBar` (Family, FirstYear, Toddler, Postpartum, Preparing, TTC), which navigates to `/ask` instead of answering inline. Three distinct ask patterns and inconsistent CTA copy ("Ask", "Ask now", "Open full Ask page").
- Dead end: panel → `/ask` is a one-way handoff; prior turns disappear.
- No `aria-live` on the streaming answer region.

## 6. Tools

Public and complete: ovulation calculator (+ redirect mount), due-date calculator, due-date results (with invalid-param guard). Protected and wired to Supabase hooks: birth plan, hospital bag, appointments (+editor), baby movements, contraction timer, symptom notes, TTC calendar/logging, First Year today/rhythm/reminders/memories. Unverified persistence: `PregnancyToolkitQuestionsForMidwife`, `FirstYearMemories`. Public calculators have no "save" path for signed-out users beyond URL state.

## 7. Navigation / IA

Orphans and duplicate pathways as listed in §2; TTC has two hubs (canonical + legacy); `/account` and `/account-settings` are intentional duplicates; hub-level breadcrumbs absent; homepage does not surface `/journal-start`, `/ask` or the toolkit.

## 8. SEO

- **No `SeoHead` at all:** `TTC.tsx` (legacy hub, still in sitemap), `NotFound.tsx` (inherits the previous route's title), `AccountSettings.tsx`, `Postpartum.tsx`.
- **0 `BreadcrumbList` JSON-LD** site-wide despite visible breadcrumbs; only 2 of 22 FAQ components emit `FAQPage` (misses all 42 week pages).
- `/ask` and `/journal-start` absent from the sitemap; three TTC sitemap URLs have no explicit route.
- Assets: `video/journal-hero.mp4` 35MB, `logo.png`/`logo-dark.png` 2.1MB each, ~40 JPGs at 1.3–2.2MB, 56 `loading="eager"` sites including large week heroes — the main LCP risk.

## 9. Accessibility

Good: every `<img>` has alt or `alt="" aria-hidden`, `<main>` present on sampled pages, no inaccessible custom modals, 44px week-nav targets. Gaps: no global `:focus-visible` style in `index.css` (34 files handle it ad hoc), a single `prefers-reduced-motion` block of unverified coverage, no `aria-live` for streaming AI answers, no h1 lint guard (h1 lives in shared hero templates), no `noindex` on authenticated pages.

## 10. Technical status

`npm run typecheck` clean. `npm test` **673 passed / 66 files**. `npm run lint` 1 error + 10 warnings — all pre-existing (`previewAuthStorage.ts:38` prefer-const, react-refresh warnings), left untouched. `npm run build` not run in plan mode (it rewrites `public/sitemap.xml`); it should run as the first step of the first implementation phase.

## 11. Prioritised backlog

**P0 — launch blockers:** dead TTC CTA; `TTC.tsx` + `NotFound.tsx` missing `SeoHead`/canonical/noindex; authenticated pages indexable; sitemap ↔ route mismatches (`/ask`, `/journal-start`, three TTC stage URLs); confirm externalised images render in production; 35MB hero video + 2.1MB logos on the critical path.

**P1 — completion required:** hub-level breadcrumbs + `BreadcrumbList` JSON-LD; resolve duplicate AI entry points; Toddler `seoDescription` (16); hero imagery for Family/FirstYear/Toddler articles (schema change + art); reconcile `articleInventory.ts`; decide the fate of `/journal-start`, `/trying-to-conceive/legacy`, `/postpartum/legacy`; retire `signs-of-ovulation` from `relatedSlugs`.

**P2 — premium polish:** Toddler hub hero and cross-hub hero consistency; `FAQPage` JSON-LD on week/hub FAQs; global `:focus-visible`; reduced-motion coverage; `aria-live` on streaming answers; image compression + lazy strategy; `reviewedBy` backfill on Family/Toddler; body imagery for long legacy articles.

**P3 — deferred:** article grounding (parked at 30K Stage 2), memory, voice, proactive AI, native app shell, prototype route promotion.

## 12. Proposed sequence (track prefix `WC` — website completion, cannot collide with 30K/30L/31A)

1. **WC-1 Launch-blocker sweep** — dead CTA, missing `SeoHead`/noindex, sitemap ↔ route reconciliation, production image verification. Touches `TTCFinalCTA.tsx`, `TTC.tsx`, `NotFound.tsx`, `AccountSettings.tsx`, `Postpartum.tsx`, `scripts/generate-sitemap.ts`, `robots.txt`. Excludes design changes. Validation: tests, typecheck, build, route crawl. No design work needed.
2. **WC-2 Asset weight and LCP** — compress/replace logos, hero video strategy, eager/lazy audit. No design work needed.
3. **WC-3 Navigation and IA** — hub breadcrumbs + `BreadcrumbList`, orphan-route decisions, homepage discovery of `/ask` and tools. Light design reference only.
4. **WC-4 Companion entry-point consolidation** — one ask pattern per page, unified CTA copy, `aria-live`. No prompt/endpoint/version changes. **Nano Banana direction required first.**
5. **WC-5 Editorial metadata completion** — Toddler `seoDescription`, `reviewedBy` backfill, `articleInventory.ts` reconciliation, `signs-of-ovulation` cleanup. No grounding files touched.
6. **WC-6 Hub hero and imagery system** — hero fields for Family/FirstYear/Toddler articles, Toddler hub hero, cross-hub consistency. **Nano Banana direction required first.**
7. **WC-7 Accessibility and structured-data polish** — focus-visible, reduced motion, FAQ JSON-LD. No design work needed.

## 13. Do not touch

`src/lib/grounding/*`, `docs/ai/grounding-approvals/*`, Phase 30K evidence and digests, `AI_SOURCE_ROUTING_VERSION`, AI prompts/modes/endpoints, `supabase/functions/_shared/ai*`, `previewAuthStorage.ts`, `src/integrations/supabase/client.ts`, `/prototype/*` isolation.

**Recommended immediate next phase: WC-1.**
