## Phase 5.8 — Family Topic Page Layout Upgrade

Restructure `FamilyTopicPage` so each of the six Family topic pages feels like a proper article discovery page in the spirit of `PregnancyTopicPage`, using existing Family stage tokens only. No data, route, article, or Pregnancy changes.

### Files edited

- `src/components/family/topic/FamilyTopicPage.tsx` — restructure sections, remove placeholder copy, add Start Here + grouped articles container.
- `src/data/familyTopicData.ts` — add optional `startHere` slugs and `articleGroups` (display-only group labels + article slug lists) per topic. `areasInside` and `related` remain untouched to keep other pages safe; `areasInside` simply stops rendering.

No other files touched. Existing article data, routes, FamilyArticleCard, HubAISupport, Pregnancy files, First Year, and Toddler all stay as-is.

### New topic page structure (in order)

1. **Hero** — unchanged (breadcrumb, image, standfirst, Ask/Back CTAs).
2. **What this covers** — unchanged.
3. **Start Here** — new. Renders 2–3 ready articles from `config.startHere` (fallback: first 2 ready articles for the topic). Uses `FamilyArticleCard` in a 2–3 col grid, preceded by a `SectionLabel` ("Start here") and a short serif heading e.g. "Begin with these". Only ready articles; drafts filtered out.
4. **Grouped guidance container** — new. Replaces the old "Areas inside this topic" grid AND the separate "Related guidance" block with a single premium rounded container: soft parchment gradient, `accentBorderStrong`, inner shadow. Inside:
   - `SectionLabel` "Guidance"
   - Serif heading "Helpful reads for this part of family life"
   - One or more groups, each with a small uppercase group label + short description, then a stack of article rows via `FamilyArticleCard`. Group labels per topic:
     - growing-families → "New siblings and family change"
     - relationships → "Sharing family life", "Wider family boundaries"
     - family-basics → "Routines and practical planning"
     - health-safety → "Feeling safer and knowing when to ask"
     - travel-days-out → "Journeys and days out"
     - play-connection → "Play, connection and screens"
   - **Start Here slugs are excluded from this list** so no article appears twice on the same page.
   - Draft articles are hidden (currently none; render is null-safe).
5. **Common questions** — unchanged.
6. **AI support** — kept, moved to after Common questions so article discovery reads first.
7. **More Family topics** — kept (topic-to-topic, not duplicate article cards).
8. **Back to Hub CTA** — unchanged.

### Removed / rewritten copy

- Delete "Deeper pages for each area can arrive later — for now, use the AI panel above for anything specific."
- Replace generic "Related guidance / Helpful reads connected to this part of family life." with the grouped container heading and per-group one-liners.
- Old "Areas inside" section fully removed from render (field kept in type for backwards safety).

### Data additions (`familyTopicData.ts`)

Add two optional fields to `FamilyTopicConfig`:

```ts
startHere?: string[];        // ready article slugs, max 3
articleGroups?: {
  label: string;
  description?: string;
  slugs: string[];           // ready article slugs, order preserved
}[];
```

Populate per topic using existing ready slugs from `familyArticleData.ts`. No new articles, no new topics, no `/family/community-support`.

### Guardrails honoured

- No changes to Pregnancy files, article data, routes, SEO, product, About, AI logic, saved journey, design tokens, `.lovable/plan.md`, or article bodies/slugs/status.
- No new shared component in this phase — First Year / Toddler unaffected. Extraction can happen in a later phase.
- Only Family stage tokens used: `--stage-family`, `--stage-family-soft`, `--stage-family-accent`, `--stage-family-deep`.

### Verification

- `tsgo`.
- Load each Family topic page and confirm hero present, Start Here row shows ready articles, single grouped guidance container, no "Areas inside" placeholder, no duplicate cards, no placeholder copy:
  - `/family/growing-families`
  - `/family/relationships`
  - `/family/family-basics`
  - `/family/health-safety`
  - `/family/travel-days-out`
  - `/family/play-connection`
- Load `/family`, one Family article page, `/pregnancy/body`, `/pregnancy/health-and-safety` — all unaffected.
- Mobile check for horizontal overflow at 375px.

### Return summary (post-build)

Files edited, ready-only confirmation, per-topic Start Here slugs and grouped article slugs, placeholder-copy removal confirmation, duplicate-check confirmation, Pregnancy-unaffected confirmation, mobile result, `tsgo` result, follow-ups, suggested next prompt (Phase 5.9 — Bespoke Family imagery pass, or shared TopicPage extraction for First Year / Toddler).