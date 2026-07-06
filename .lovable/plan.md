# Phase 4.9 — Relink Pregnancy cornerstones into topic groups

Minimal data-only edit to `src/data/pregnancyTopicData.ts`.

## File edited

- `src/data/pregnancyTopicData.ts` — only file touched.

## Edit 1 — topic `body`, group "Across the trimesters" (lines 113–118)

Replace the empty `links: []` with:

```ts
links: [
  { label: "The first trimester: a complete guide", href: "/articles/first-trimester-complete-guide" },
  { label: "The second trimester: a complete guide", href: "/articles/second-trimester-complete-guide" },
  { label: "The third trimester: a complete guide", href: "/articles/third-trimester-complete-guide" },
],
```

Group `label` and `description` stay unchanged.

## Edit 2 — topic `feelings`, group "Emotional wellbeing" (lines 284–290)

Prepend one link so the group becomes:

```ts
links: [
  { label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy" },
  { label: "The first trimester emotionally", href: "/articles/the-first-trimester-emotionally" },
],
```

Group `label` and `description` stay unchanged. Existing entry preserved as the second item.

## Untouched

`startHere`, `whatThisCovers`, intros, descriptions, every other group, every other topic, every other file. No article data, no templates, no routes, no SEO, no `.lovable/plan.md`.

## Slugs avoided

`writing-a-birth-plan`, `nausea-in-early-pregnancy`, `ovulation-signs`, any legacy emotional wellbeing slug.

## Verification

- `tsgo`
- `rg` before/after diff on the two blocks
- Load `/pregnancy/body` → new three cards render inside "Across the trimesters" group, each links to the correct `/articles/…-complete-guide`
- Load `/pregnancy/feelings` → "Emotional wellbeing in pregnancy" card first in the group, "The first trimester emotionally" second, both linking correctly
- Load the four article routes → all still render via ArticleFlagshipTemplate
- Spot-check other groups untouched
