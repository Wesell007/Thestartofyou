# Phase 7.3b — First Year Article Image System

Bring First Year article pages up to the site's premium editorial standard by adding a hero image and at least one body image, using a mapping file that mirrors the Family pattern.

## Scope

Two files only:

1. **New:** `src/components/firstyear/article/firstYearArticleImages.ts`
2. **Edit:** `src/components/firstyear/article/FirstYearArticlePage.tsx`

No changes to article copy, statuses, `HubArticleView`, Family/Pregnancy/TTC/IVF/Toddler files, tokens, routes, SEO, or new assets.

## New file: firstYearArticleImages.ts

Mirror `familyArticleImages.ts` shape, adapted to raw JPG imports (First Year assets live as `.jpg` files in `src/assets/`, not `.asset.json`, so `import x from "@/assets/foo.jpg"` returns the URL string directly).

```ts
export interface HubBodyImage {
  afterSectionIndex: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface FirstYearArticleImages {
  hero: { src: string; alt: string };
  body: HubBodyImage[];
}

export const firstYearArticleImageMap: Record<string, FirstYearArticleImages> = { ... };
export const getFirstYearArticleImages = (slug: string) =>
  firstYearArticleImageMap[slug];
```

### Mappings for the 4 ready articles

Preferred existing First Year / baby-care assets in `src/assets/`:

| Slug | Hero | Body (afterSectionIndex: 1) |
| --- | --- | --- |
| `newborn-sleep-expectations` | `firstyear-stage-0-3.jpg` | `article-hero-third-sleep.jpg` — caption: "Newborn sleep rarely follows a schedule, and that is normal." |
| `helping-your-baby-settle` | `firstyear-scene.jpg` | `guidance-card-comfort.jpg` — caption: "Settling is a slow rhythm you build together, not a single technique." |
| `safe-sleep-and-home-safety` | `guidance-card-nursery.jpg` | `guidance-card-safety.jpg` — caption: "Small, consistent habits protect a baby more than any single product." |
| `baby-care-basics` | `firstyear-journey.jpg` | `guidance-card-bonding.jpg` — caption: "The basics become intuitive faster than most new parents expect." |

Every image gets a descriptive alt. Inline comments mark future bespoke needs (e.g. `// bespoke future: parent settling baby in warm evening light`).

**Fallback rule:** If any listed import fails because the filename differs in the repo, inspect `src/assets/` and swap to the closest existing First Year or baby-care asset (e.g. `firstyear-stage-3-6.jpg`, `guidance-firstyear.jpg`, `guidance-postpartum.jpg`, `guidance-card-rest.jpg`, `topic-baby-hero.jpg`). Do not use Family assets unless no appropriate First Year or baby-care asset exists.

Body image placement uses `afterSectionIndex: 1` so the figure renders between section 2 and section 3 (renderer treats the index as the zero-based section it appears *after*). Draft slugs are intentionally not mapped — they are gated by NotFound.

## Edit: FirstYearArticlePage.tsx

Import the helper and pass images into `HubArticleView`, mirroring Family:

```tsx
import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";
...
const images = getFirstYearArticleImages(article.slug);
...
<HubArticleView
  ...
  heroImage={images?.hero}
  bodyImages={images?.body}
  relatedSlot={...}
/>
```

Nothing else changes — related-guidance filtering, tone tokens, hub/topic labels stay identical.

## Verification

1. `tsgo` clean.
2. Playwright at 1280×1800 and 375×812 for each ready route:
   - `/first-year/sleep/newborn-sleep-expectations`
   - `/first-year/sleep/helping-your-baby-settle`
   - `/first-year/care-and-safety/safe-sleep-and-home-safety`
   - `/first-year/care-and-safety/baby-care-basics`
   Confirm: hero image visible in hero grid, one body figure between section 2 and section 3, medical review + sources + related guidance still render, no placeholder text, no horizontal overflow on mobile.
3. Topic hubs `/first-year/sleep` and `/first-year/care-and-safety` still render.
4. Regression: `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler` unaffected.

## Out of scope

New assets, article copy, statuses, SEO, routes, tokens, other hubs, draft mappings.

After this ships, it is safe to proceed with Phase 7.4 (Batch 2 publishing).
