# Master Article and Keyword Inventory — Plan (v4)

Create a single planning file that catalogues every article, draft, topic page, tool page and the product page across the site, with keyword and duplicate-risk metadata. **No content, routes, templates, tokens or logic will change.**

## Correction to prior audit

- Direct read of `src/data/articleData.ts` shows **111 legacy article objects**, not 112. The prior audit's "112" counted the `slug` field inside the `ArticleData` interface declaration.
- The inventory will contain exactly one legacy row per real article object, so the total will reflect 111.

## Implementation notes

- Populated array, not a declaration:

  ```ts
  export const articleInventory: ArticleInventoryItem[] = [ /* … one object per row … */ ];
  ```
- Helpers filter that populated array:

  ```ts
  export function getInventoryByHub(hub: InventoryHub) {
    return articleInventory.filter((item) => item.hub === hub);
  }
  export function getInventoryByDuplicateRisk(risk: DuplicateRisk) {
    return articleInventory.filter((item) => item.duplicateRisk === risk);
  }
  ```

## Source-of-truth rule

- Legacy rows built by reading `src/data/articleData.ts` directly — one row per exported article object, using its actual `slug`, `title`, `metaDescription`.
- Then walk topic-card references in `pregnancyTopicData.ts`, `ttcTopicData.ts`, `ttcFlagshipOverrides.ts`, `ivfTopicData.ts`, `firstYearTopicData.ts`, `toddlerTopicData.ts`, `familyTopicData.ts`. Verify each referenced slug exists in the matching article file.
- Any missing slug → inventory row with `currentStatus: "needs-verification"`, `recommendedAction: "needs-review"`, note pointing to the referring file. Also collected into a **Missing or unresolved article references** list for the summary.

## File to create

- `src/data/articleInventory.ts` — planning-only. Not imported anywhere.

## Types exported

```ts
export type InventoryHub =
  | "pregnancy" | "trying-to-conceive" | "ivf"
  | "first-year" | "toddler" | "family"
  | "journal" | "tool" | "shared";

export type InventorySystem =
  | "legacy-article" | "hub-article" | "topic-page"
  | "tool-page" | "week-page" | "product-page";

export type InventoryStatus =
  | "live" | "draft" | "placeholder"
  | "topic-page" | "tool" | "needs-verification";

export type ContentState =
  | "final" | "draft" | "placeholder" | "hardcoded" | "partial";

export type CanonicalRole =
  | "primary" | "supporting" | "merge-into-another"
  | "redirect-or-noindex" | "needs-decision";

export type DuplicateRisk = "none" | "low" | "medium" | "high";
export type Priority = "high" | "medium" | "low";

export type RecommendedAction =
  | "keep" | "publish" | "expand" | "merge"
  | "rename" | "redirect" | "noindex" | "needs-review";

export interface ArticleInventoryItem {
  id: string;
  title: string;
  slug: string;
  hub: InventoryHub;
  topic?: string;
  route: string;
  sourceFile: string;
  system: InventorySystem;
  currentStatus: InventoryStatus;
  contentState: ContentState;
  currentPrimaryKeyword?: string;
  currentSecondaryKeywords?: string[];
  recommendedPrimaryKeyword?: string;
  recommendedSecondaryKeywords?: string[];
  canonicalRole: CanonicalRole;
  canonicalTarget?: string;
  duplicateRisk: DuplicateRisk;
  duplicateNotes?: string;
  semrushCluster?: string;
  priority: Priority;
  recommendedAction: RecommendedAction;
  notes?: string;
}
```

## Rows populated

1. **111 legacy rows** from `articleData.ts` → `legacy-article`, `live`, `final`, `/articles/:slug`.
2. **13 Family draft rows** → `hub-article`, `draft`, `placeholder`, `/family/{topic}/{slug}`.
3. **17 First Year draft rows** → same; overlap flags against legacy finals (`baby-sleep-first-year`, `baby-milestones-first-year`, `feeding-your-baby-complete-guide`, `postpartum-recovery-timeline`, `your-body-after-birth`).
4. **17 Toddler draft rows** → same; overlap flags where legacy intent collides.
5. **41 topic-page rows** (Pregnancy 6, TTC 10, IVF 3, First Year 8, Toddler 8, Family 6).
6. **5 tool-page rows**: `/due-date-calculator`, `/due-date-results` (`redirect-or-noindex`, `noindex`), `/ovulation-calculator` (canonical), `/trying-to-conceive/ovulation-calculator` (`redirect`), `/ivf-timeline`.
7. **1 product-page row** `/product`.
8. **N unresolved-reference rows** (only if topic cards point to non-existent slugs).

## High-risk duplicate rows explicitly flagged

- `/ovulation-calculator` vs `/trying-to-conceive/ovulation-calculator` — **high**, canonical `/ovulation-calculator`.
- `/articles/signs-of-ovulation` vs `/articles/ovulation-signs` — **high**, `needs-decision`, action `merge`.
- `/articles/baby-milestones-first-year` vs `/first-year/development/baby-development-in-the-first-year` — **high**, `needs-decision`.
- `/articles/baby-sleep-first-year` vs `/first-year/sleep/newborn-sleep-expectations` + `helping-your-baby-settle` — **medium**, `expand`.
- `/trying-to-conceive` vs `/articles/trying-to-conceive-explained` — **medium**.
- `/ivf-timeline` vs `/articles/ivf-timeline-what-to-expect` — **medium**.
- `/product` vs future pregnancy-journal articles — guardrail note.

## Keyword-mapping rules

- British English. Primary keyword = most natural user intent for slug/title. 2–4 secondary keywords per row. `semrushCluster` left `undefined`.

## Verification

- Run `tsgo` — new file must typecheck.
- Orphan-safe; no imports elsewhere.

## Out of scope (unchanged)

- `articleData.ts`, `familyArticleData.ts`, `firstYearArticleData.ts`, `toddlerArticleData.ts`
- Article templates, route files, topic pages, calculators, AI components, saved-journey logic, product page, about page, design tokens
- No publishing, rewriting, redirects, helmet, deletions.

## Return after build

- Path of new file
- Total items, and counts by hub / system / currentStatus / duplicateRisk
- List of all high-risk duplicate rows
- **Missing or unresolved article references**
- Confirmed legacy article count (expected 111)
- Immediate decisions needed before publishing
- Whether the first Family batch is still safe
- Suggested next Lovable prompt
