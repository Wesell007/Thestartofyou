## Phase 5.8b — Fix Family topic pages to match Pregnancy pattern

### Problem
Every Family topic currently has only 2 ready articles. Both are surfaced in Start Here, and the grouped guidance container excludes Start Here slugs, so `articleGroups` ends up empty and the container hides via `hasGuidance`. Topic pages read as a bare two-card row instead of the premium grouped panel seen on Pregnancy topic pages.

### Fix strategy
- **Never hide the grouped guidance container** when the topic has any ready articles.
- **Allow the same article to appear in Start Here and in the grouped panel**, because the visual treatment is intentionally different (large feature card vs. compact row).
- **Add a new compact row renderer** used exclusively inside the grouped guidance panel (do NOT reuse `FamilyArticleCard`, which is the large card style).

### Files to edit
- `src/data/familyTopicData.ts`
- `src/components/family/topic/FamilyTopicPage.tsx`

No other files touched. No article data, routes, SEO, tokens, HubArticleView, Pregnancy/First Year/Toddler, product, About, AI or saved-journey changes.

### Data changes — `src/data/familyTopicData.ts`
Populate `articleGroups` on all six topics with the exact labels and slugs from the brief:

- `growing-families` → `[{ label: "New siblings and family change", slugs: ["preparing-for-another-baby", "helping-your-child-adjust-to-a-new-sibling"] }]`
- `relationships` → `[{ label: "Sharing family life", slugs: ["sharing-the-mental-load"] }, { label: "Wider family boundaries", slugs: ["setting-boundaries-with-grandparents"] }]`
- `family-basics` → `[{ label: "Routines and practical planning", slugs: ["building-family-routines", "managing-childcare-costs"] }]`
- `health-safety` → `[{ label: "Feeling safer and knowing when to ask", slugs: ["making-your-home-safer", "when-to-ask-for-help"] }]`
- `travel-days-out` → `[{ label: "Journeys and days out", slugs: ["travelling-with-young-children", "making-car-journeys-calmer"] }]`
- `play-connection` → `[{ label: "Play, connection and screens", slugs: ["building-family-traditions", "screen-time-as-a-family"] }]`

`startHere` values remain unchanged.

### Component changes — `FamilyTopicPage.tsx`

1. **Grouping logic (lines ~54-81)** — rewrite so the grouped guidance container is always populated when ready articles exist:
   - Do NOT exclude Start Here slugs from groups.
   - Still filter out drafts (only keep `readyBySlug.has(s)`).
   - De-duplicate within the grouped panel itself (a slug cannot appear twice inside grouped guidance).
   - Fallback: any ready article not covered by `articleGroups` appends to a final "More on this topic" group (kept for safety, will not fire for current data).
   - `hasGuidance` remains true when any group has articles.

2. **New compact row renderer** (local component inside file, `CompactArticleRow`):
   - Renders as a `Link` (or non-interactive div for drafts, though drafts are filtered here) with: small circular thumbnail placeholder using stage tokens (no new image assets), article title (`font-serif`, ~15px), one-line description (`font-sans`, light, ~13px, truncated), read time, subtle chevron arrow.
   - Uses only existing Family tokens: `--stage-family`, `--stage-family-soft`, `--stage-family-accent`, `--stage-family-deep`.
   - Layout: horizontal flex, ~14–16px vertical padding, subtle divider between rows within a group.

3. **Grouped guidance panel (lines ~397-462)** — keep the outer premium rounded container styling; inside:
   - Section label "Guidance" (already present).
   - Heading: `Helpful reads for this part of family life` (already present).
   - Add intro paragraph: `Choose the guide that best matches what you need today.`
   - For each group: uppercase label, optional description, then a stacked list of `CompactArticleRow`s (single column on mobile; on md+ a two-column grid when a group has 2+ rows, single column when only 1).
   - Replace the current `FamilyArticleCard` render inside grouped guidance with `CompactArticleRow`.

4. **Start Here section** — unchanged (still uses `FamilyArticleCard` as larger feature cards).

5. **Other sections** — Common questions, AI support, More Family topics, Back to Hub CTA all remain as-is. No "Areas inside this topic" and no "Related guidance" block exists to remove (already gone).

### Verification
- `tsgo`
- Load each Family topic page:
  - `/family/growing-families`
  - `/family/relationships`
  - `/family/family-basics`
  - `/family/health-safety`
  - `/family/travel-days-out`
  - `/family/play-connection`
- Confirm each shows Start Here (large cards) and a visible grouped guidance premium panel (compact rows) underneath; no empty container, no placeholder copy, no duplicates within the grouped panel, correct group labels, working links.
- Regression: `/family`, one Family article page, `/pregnancy/body`, `/pregnancy/health-and-safety`.
- Mobile check at 375px for horizontal overflow.
