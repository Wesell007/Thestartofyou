## Phase 9.2b — Family Hub & Topic UX Polish

Scope: Family only. No SEO, route, article-copy, or non-Family edits.

### 1. `FamilyQuickNav.tsx` — fix "Where would you like to start?" buttons
- Replace all hash anchors with real `<Link to="/family/{slug}">` routes.
- Final six links: Growing families, Relationships, Family basics, Health & safety, Travel & days out, Play & connection.
- Remove "Community & support" entirely.
- Swap `<a href>` for `react-router-dom` `Link` while keeping current pill styling.

### 2. Replace `FamilyToolsResources.tsx` — "A few useful places to start"
- Rename section to **"Helpful places to begin"** with subheading **"Start with the family guidance parents often need first."**
- Render **4 real ready Family article cards** (2×2 grid) via `FamilyArticleCard` (already premium and image-agnostic) OR a new small card variant with image. Chosen slugs (all confirmed `status: "ready"`):
  - `preparing-for-another-baby` (growing-families)
  - `helping-your-child-adjust-to-a-new-sibling` (growing-families)
  - `staying-connected-as-parents` (relationships)
  - `building-family-routines` (family-basics)
- Cards link to `/family/{topic}/{slug}` using real `title`, `description`, `readTime` from `familyArticleData`.
- Use `familyArticleImageMap[slug].hero` when present; else fall back to per-topic image (`family-topic-{topic}.jpg`). New card uses image at top, title, short description, read time, chevron; full card clickable; premium warm styling matching existing FamilyArticleCard tokens.
- Reuse styling tokens (`--stage-family-*`); no hard-coded colours.

### 3. `FamilyPathways.tsx` — improve "Where to next"
- Drop "Explore Family topics" (redundant on the hub itself).
- Replace 3 cards with logical onward journeys:
  - Back to Toddler → `/toddler`
  - First Year guidance → `/first-year`
  - Pregnancy guidance → `/pregnancy`
- Keep Journal link inline in copy or as 4th card only if grid still balances; final decision: 3-card grid for cleaner layout, plus a small text link "Or open your Journal →" under the grid pointing to `/product` (existing journal entry).
- Preserve existing card visual (eyebrow / label / sub / Continue →).

### 4. `Family.tsx` — remove `FamilyFinalCTA`
- Section "When family life feels full, you can ask" contains two hash-anchor buttons (`#family-ai`, `#family-topics`) that don't reliably resolve and duplicate the AI panel already at top. Remove `<FamilyFinalCTA />` import + render from `Family.tsx`. Leave the component file in place (unused) to avoid touching unrelated exports.

### 5. `FamilyTopicPage.tsx` — remove "Begin with these" + upgrade cards
- Delete the whole `START HERE` section block (~lines 416–454) and the `startHereSlugs` / `startHereArticles` computations.
- Upgrade the grouped guidance rows: replace the text-only `CompactArticleRow` with an image-forward card matching the new `FamilyArticleCard` visual (image top, title, description, read time, full-card link, warm premium styling, rounded corners, mobile responsive). Image resolution order:
  1. `familyArticleImageMap[slug].hero.src` if present
  2. Topic image for `article.topic` (`family-topic-{topic}.jpg` via new small lookup helper in `familyArticleImages.ts`)
- Grid becomes `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` per group.

### 6. Shared helper
- Add `familyTopicFallbackImage: Record<FamilyArticleTopic, {src; alt}>` to `familyArticleImages.ts` mapping each topic to its existing `family-topic-*.jpg` asset (already imported). Export a `getFamilyArticleCardImage(article)` helper used by the new card component.

### 7. New component
- `src/components/family/article/FamilyArticleImageCard.tsx` — image-forward premium card used by (2) and (5). Same token palette as existing `FamilyArticleCard`.

### Files to edit
- `src/pages/Family.tsx` (remove FinalCTA)
- `src/components/family/FamilyQuickNav.tsx`
- `src/components/family/FamilyToolsResources.tsx` (replace body)
- `src/components/family/FamilyPathways.tsx`
- `src/components/family/topic/FamilyTopicPage.tsx`
- `src/components/family/article/familyArticleImages.ts` (add fallback map + helper)
- `src/components/family/article/FamilyArticleImageCard.tsx` (new)

### Files NOT touched
- Any Pregnancy / TTC / IVF / First Year / Toddler file
- `familyArticleData.ts`, article routes, SEO files, `FamilyArticlePage.tsx`, `FamilyArticleCard.tsx` (legacy, still used internally by article related-slot)
- `FamilyFinalCTA.tsx` (kept on disk, just unimported)

### No new images
All required imagery already exists in `src/assets/family-*.jpg` (6 topic images + 4 hero images). No image generation.

### Verification
1. `bunx tsgo --noEmit`
2. Playwright at 1280×1800 and 375×812:
   - `/family` — 6 QuickNav buttons route to `/family/{slug}`, no Community & support, 4 article cards route to real article URLs, Pathways has no "Explore Family topics", FinalCTA absent, no dead hash buttons, no overflow, images load.
   - Each of the 6 topic pages — 200, no "Begin with these", guidance cards render with images, all card links resolve.
   - Regression: `/family/growing-families/preparing-for-another-baby`, `/family/relationships/staying-connected-as-parents`, `/family/family-basics/building-family-routines`, `/pregnancy`, `/first-year`, `/toddler`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness`.
3. Confirm `SeoHead` still mounted on Family hub + all topic pages (no SEO regressions).

Deliverables: summary matching the requested report shape, ending with a safe-to-resume-9.3 statement.
