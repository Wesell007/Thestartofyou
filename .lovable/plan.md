## Phase 5.4 — Family Article Imagery Upgrade

Presentation-only upgrade. No copy, data, routes, slugs, tokens, or Pregnancy Flagship changes.

### Approach

**Option A** — slug-based image map, no data-file edits. Add optional image props to the shared `HubArticleView`, and let `FamilyArticlePage` pass in a resolved hero + body images from a small stage-local map.

### Files to edit

1. `src/components/shared/HubArticleView.tsx`
   - Add optional props:
     - `heroImage?: { src: string; alt: string }`
     - `bodyImages?: { afterSectionIndex: number; src: string; alt: string; caption?: string }[]`
   - **Hero:** when `heroImage` is present, render a two-column editorial layout on `md+` (text left, image right, `rounded-2xl`, soft shadow + stage-tinted accent glow reusing `tokens.accent`). On mobile the image stacks below the metadata row. When absent, the current single-column hero renders unchanged — no regression for First Year / Toddler or unmapped drafts.
   - **Body images:** rendered as full-width editorial "breathing points", not small thumbnails:
     - Full container width (matches the `max-w-3xl` reading column, then breaks out slightly on `md+` to `max-w-4xl` for a calmer editorial pause).
     - `aspect-[16/10]` on desktop, `aspect-[4/3]` on mobile, `object-cover`, `rounded-2xl`, soft shadow, subtle accent border.
     - Generous vertical spacing: `my-16 md:my-20` so the image genuinely separates sections, matching the Pregnancy screenshots' rhythm.
     - Optional italic serif caption below, muted, centered.
     - Rendered after the matching section, before the next section's number/rule — preserving scroll anchors and `01/02/…` numbering.

2. `src/components/family/article/familyArticleImages.ts` *(new, tiny)*
   - Imports existing family assets: `family-hero-diverse-family`, `family-hero-everyday`, `family-hero-family-four`, `family-hero-parents`, plus topic images (`family-topic-growing-families`, `-relationships`, `-play-connection`, `-family-basics`).
   - Exports `familyArticleImageMap` keyed by slug returning `{ hero, body: [...] }`.
   - Initial mapping (existing assets — see gaps):
     - `building-family-routines` — hero: `family-hero-everyday`; body after §2: `family-topic-family-basics`
     - `building-family-traditions` — hero: `family-hero-family-four`; body after §2: `family-topic-play-connection`
     - `sharing-the-mental-load` — hero: `family-hero-parents`; body after §2: `family-topic-relationships`
     - `helping-your-child-adjust-to-a-new-sibling` — hero: `family-hero-diverse-family`; body after §2: `family-topic-growing-families`; if ≥6 sections, second body image after §4: `family-hero-family-four`
   - Draft slugs return `undefined` → text-only fallback.

3. `src/components/family/article/FamilyArticlePage.tsx`
   - Look up the map and pass `heroImage` / `bodyImages` to `HubArticleView`. Existing draft-filter on related cards stays.

### Not changed

- `src/data/familyArticleData.ts` — no new fields, no copy edits.
- All routes and slugs.
- `FirstYearArticlePage.tsx` and `ToddlerArticlePage.tsx` — they don't pass the new props, so rendering is identical (architecture ready for future imagery).
- Pregnancy Flagship (`ArticleHeroImage.tsx`, `flagship/*`, `articleData.ts`), design tokens, AI, saved-journey, SEO, product, about.

### Known image gaps (flagged, not blocking)

Existing assets are best-fit family lifestyle, not exact-topic. Ideal future assets to generate:

- `family-article-morning-routine.jpg` — kitchen/breakfast rhythm, warm light
- `family-article-tradition.jpg` — baking or reading ritual
- `family-article-mental-load.jpg` — calm shared planning at a table
- `family-article-new-sibling.jpg` — parent with older child and baby, gentle
- `family-article-sibling-together.jpg` — older sibling helping softly

### Verification

- `tsgo` typecheck.
- Load the four published Family routes and confirm: two-column hero on desktop / stacked on mobile; at least one full-width editorial body image with generous spacing; At a glance, In this article, key takeaways, section numbering intact; related section still hides drafts.
- Load `/family`, one First Year and one Toddler `HubArticleView` route (text-only fallback unchanged), and `/articles/complete-guide-morning-sickness` (Pregnancy Flagship unaffected).
- Mobile viewport: no horizontal overflow.

### Suggested next prompt

Phase 5.5 — Generate the five bespoke Family editorial images listed under "Image gaps" and swap them into `familyArticleImageMap`.
