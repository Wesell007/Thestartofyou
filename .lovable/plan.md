## Phase 9.2b.1 — Family Imagery & Layout Polish

Family-only visual cleanup. No SEO, routes, article copy, or non-Family files touched.

### Problem
1. `familyArticleImageMap` reuses the same 4 hero photos (`heroDiverse`, `heroFour`, `heroEveryday`, `heroParents`) across all 18 ready articles, so hub + topic cards show repeated imagery.
2. Relationships topic page renders 3 grouped rows with 1 card each, producing thin isolated columns and empty space, unlike other topic pages which have full 3-column rows.

### 1. Generate 18 unique Family article hero images
Use `imagegen--generate_image` (fast tier, 1600×1000 landscape, `.jpg`) into `src/assets/`, then wrap each with `lovable-assets create` to produce `.asset.json` pointers.

Global style: premium editorial lifestyle, warm natural light, beige/cream/soft-brown palette, emotionally grounded, realistic, family-first, no text, no logos, no clinical or stock-posed feel. Vary composition, room, angle, family makeup across every image — no two scenes may repeat.

Per-slug scenes (18 total, keyed by actual data slugs):

Growing families
- `preparing-for-another-baby` — parents + older child gently arranging a nursery corner
- `helping-your-child-adjust-to-a-new-sibling` — parent softly speaking with older child, newborn in arms
- `second-time-parenting` — reflective parent holding second baby while first child plays nearby

Relationships
- `sharing-the-mental-load` — couple at kitchen table with a shared planner, calm discussion
- `setting-boundaries-with-grandparents` — multigenerational adults in warm living-room conversation
- `staying-connected-as-parents` — couple sharing coffee on a sofa in an unhurried morning moment

Family basics
- `building-family-routines` — parent guiding two children through a morning routine in a hallway
- `managing-childcare-costs` — parent with laptop, notebook and calendar on kitchen table
- `calmer-evenings-after-busy-days` — parent lighting a lamp as children settle into evening play

Health & safety
- `making-your-home-safer` — parent installing a soft childproof latch on a low cupboard
- `when-to-ask-for-help` — supportive friend-to-friend conversation over tea in home kitchen
- `family-sick-days-at-home` — parent tucking blanket around a resting child on sofa

Travel & days out
- `travelling-with-young-children` — parent and toddler at a train window, small suitcase beside
- `making-car-journeys-calmer` — child in car seat by window, warm afternoon light through glass
- `planning-family-days-out` — family lacing shoes at front door, small daypack ready

Play & connection
- `building-family-traditions` — family baking together at kitchen counter, seasonal feel
- `screen-time-as-a-family` — family watching a tablet together on sofa, warm evening light
- `simple-family-play-ideas` — parent and child on rug with simple wooden toys

Naming: `src/assets/family-article-{slug}.jpg` + `.jpg.asset.json`.

### 2. Rewire `familyArticleImages.ts`
- Import all 18 new `.asset.json` files.
- Replace every entry in `familyArticleImageMap` so each of the 18 ready slugs points to its own bespoke hero (`src`, article-specific `alt`).
- Preserve `body` image arrays (used inside article bodies) — no article-copy change.
- Leave `familyTopicFallbackImage` map and `getFamilyArticleCardImage` helper in place as a safety net for future drafts only; every ready article now resolves via `familyArticleImageMap`, so no ready card falls back.

### 3. Normalise Relationships topic layout (`FamilyTopicPage.tsx`)
Add a collapse rule in the grouped-guidance block:
- Compute `allSingle = articleGroups.every(g => g.articles.length === 1)`.
- When `allSingle && articleGroups.length > 1`, render one unified `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` of all articles (in their original group order) with no subgroup label headers.
- Otherwise render the existing grouped layout unchanged.
- Keeps the section shell ("Guidance" eyebrow + "Helpful reads for this part of family life" + standfirst).
- Fixes Relationships (3 groups × 1) into a clean 3-up row while preserving the richer layouts on the other topic pages.

### 4. `FamilyArticleImageCard.tsx`
No structural rewrite — already image-forward, warm, mobile-safe. Confirm:
- image `aspect-[16/10]` retained for consistent card heights
- title clamp not needed given short titles
No changes required unless verification surfaces an issue.

### 5. `FamilyToolsResources.tsx`
No component-code change — it already renders 4 real article cards. Once step 2 lands, the 4 hub cards (`preparing-for-another-baby`, `helping-your-child-adjust-to-a-new-sibling`, `staying-connected-as-parents`, `building-family-routines`) each resolve to their own bespoke image automatically.

### Files
Edit:
- `src/components/family/article/familyArticleImages.ts`
- `src/components/family/topic/FamilyTopicPage.tsx`

Create:
- 18 × `src/assets/family-article-{slug}.jpg` + matching `.asset.json`

Not touched: Pregnancy / TTC / IVF / First Year / Toddler, `familyArticleData.ts`, article routes, SEO files, `FamilyArticleImageCard.tsx` (unless verification requires it), `FamilyToolsResources.tsx`, `FamilyQuickNav.tsx`, `FamilyPathways.tsx`, `Family.tsx`.

### Verification
1. `bunx tsgo --noEmit`.
2. Playwright at 1280×1800 and 375×812:
   - `/family` — 4 "Helpful places to begin" cards each show a distinct image, no overflow.
   - All 6 topic pages — no duplicate images within page, Relationships renders as a single clean 3-up grid without one-card subgroup rows, cards clickable, images load.
3. Slug-to-image audit script: iterate `familyArticleImageMap`, assert 18 unique `hero.src` values and zero overlap with each other or with `familyTopicFallbackImage`.
4. Regression: `/family/growing-families/preparing-for-another-baby`, `/family/relationships/staying-connected-as-parents`, `/family/family-basics/building-family-routines`, `/pregnancy`, `/first-year`, `/toddler`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness`.
5. Confirm `SeoHead` unchanged on Family hub + topic pages.

### Deliverable
Summary with: files inspected, files edited, 18 new hero assets added, slug→image map (all unique), fallback-usage = zero for ready articles, hub duplicate check pass, per-topic duplicate check pass, Relationships layout normalised, desktop + mobile + image-load pass, `tsgo` clean, regression pass, SEO preserved, safe-to-proceed-to-Phase-9.3.
