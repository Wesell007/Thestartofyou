## Phase 4.1 Fix — Remove duplicate "Medically reviewed by" line

### Finding
The line renders **twice visually** on `/articles/first-trimester-complete-guide` (and every flagship article):

1. `src/components/article/flagship/FlagshipHero.tsx` (line 87) — inside the hero trust bar, next to "Updated May 2026".
2. `src/components/article/flagship/FlagshipSummaryRow.tsx` (lines 25–32) — footer of the "At a glance" card, directly under the hero.

Both are sage-tinted, both use the Shield icon, and they sit within ~150px of each other on the rendered page. This is a real duplicate, not a false positive.

(A third "reviewed by" mention exists inside `ArticleSources.tsx` at the very bottom of the article, but it's a full sentence in the sources block, not the trust badge, and belongs there. Out of scope.)

### Cause
When `FlagshipSummaryRow` was built, the reviewer badge was added to the "At a glance" card as a trust signal without accounting for the identical badge already living in `FlagshipHero`.

### Fix (smallest possible)
Remove the reviewer block from **`FlagshipSummaryRow.tsx`** only. Keep the hero badge (it's paired with `lastUpdated` and reads as the canonical article metadata/trust area). No data changes, no template restructuring, no article-content edits.

Specifically, delete lines 25–32 of `src/components/article/flagship/FlagshipSummaryRow.tsx` (the `{data.reviewedBy && ( ... )}` block and its wrapping divider `div`). The `Shield` import becomes unused and will be removed too.

### Files edited
- `src/components/article/flagship/FlagshipSummaryRow.tsx` (only)

### Guardrails
- No changes to `articleData.ts`, `ArticlePage.tsx`, `ArticleFlagshipTemplate.tsx`, `FlagshipHero.tsx`, `ArticleSources.tsx`, topic data, routes, or SEO.
- No article body rewrites. No slug change. No topic-card relinking.
- Applies globally to flagship articles (correct — every flagship page currently has the same duplicate); no per-article branching.

### Verification
1. `tsgo` — must be clean.
2. Playwright load `/articles/first-trimester-complete-guide`:
   - Count occurrences of "Medically reviewed by" in the rendered DOM. Expect **exactly 1** in the hero region and 1 sentence inside the sources block (which reads "This article has been reviewed for accuracy by…"), i.e. one trust-badge instance.
   - Confirm `FlagshipHero`, `FlagshipEditorialSections`, `FlagshipFAQ`, and `ArticleSources` still render (flagship template intact).
   - Confirm the "At a glance" card still shows the `quickAnswer` copy.
3. Spot-check one other flagship article (e.g. any existing flagship) to confirm the fix is consistent and nothing else regressed.

### Return summary will include
- Duplicate confirmed: yes/no + which two components.
- Cause.
- File edited (single file).
- Post-fix DOM count of the trust-badge line.
- `tsgo` result.
