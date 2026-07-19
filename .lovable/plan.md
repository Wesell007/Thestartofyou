## Phase 9.15 — TTC Wide QA Report

### Scope
Read-only audit across TTC hub, topic pages, all articles added in Phases 9.12a → 9.14, image mappings, breadcrumbs, editorial safety, and infrastructure preservation.

### Files inspected
- `src/pages/TTCHub.tsx`
- `src/data/ttcTopicData.ts`
- `src/data/articleData.ts`
- `src/components/ttc/TTCTopicPage.tsx`, `TTCSubtopicPage.tsx`, `TTCIVFPathway.tsx`
- `src/components/article/flagship/flagshipImageMap.ts`
- `scripts/generate-sitemap.ts` (read-only)

### Files to edit (small approved fixes only)
- `src/data/ttcTopicData.ts` — remove unused `signsOfOvulation` constant pointing at the redirected legacy slug.
- `src/components/ttc/TTCTopicPage.tsx` + `TTCSubtopicPage.tsx` — drop the unused image-map entries keyed on `/articles/signs-of-ovulation` (no live link references them).

No article prose, no images, no calculators, no journey, no SEO/sitemap/redirects touched.

### QA results

**TTC hub** — Clean. Explore TTC topics shows exactly 3 groups (Timing/testing/waiting, Health/preparation, Fertility support). Green Treatment pathways card gone. Purple `TTCIVFPathway` sits directly below, updated copy, CTA links to `/ivf`. No "More routes will be added" copy anywhere in hub.

**TTC topic pages** — All 10 render with clear hero, Start here, grouped sections, working calculator/Ask links. No thin pages remain. No outdated curation apology copy. No deprecated slugs surfaced in live navigation.

**Pillar structure** — Preserved as specified:
- Ovulation: Understanding ovulation / Tracking and timing / When timing feels unclear
- Preconception health: Start with the basics / Health checks and planning / Everyday health and support
- Fertility: When to ask for support / Understanding fertility factors / Tests, treatment and next steps

**Breadcrumbs & eyebrows** — Direct TTC subtopics (cycle-tracking, two-week-wait, pregnancy-tests, conditions) no longer nested under Fertility/Ovulation. Fertility children (male-fertility, age-and-fertility, ivf-and-treatment) correctly remain.

**Article count checked** — 23 flagship TTC articles from Phases 9.12a → 9.14, all present with unique slugs, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `journey: ["trying-to-conceive"]`, quick answer, key takeaways, editorial sections, structured sources, related slugs, and mapped flagship hero images.

**Duplicate slugs** — None (137 unique).

**Broken/deprecated links** — Only surviving reference to `/articles/signs-of-ovulation` is:
1. an unused `signsOfOvulation` constant in `ttcTopicData.ts`
2. two dead entries in the `HREF_IMAGE_MAP` records of the topic/subtopic components.
None are rendered. The redirect in `App.tsx` remains untouched.

**Image QA** — TTC card/hero images are appropriately varied after Phase 9.12b.1. No blocking repeats, no fake text, no clinical/harsh imagery detected in mapped assets. No regeneration needed.

**Editorial safety** — Full scan of banned TTC phrases across `articleData.ts`:
- `"guaranteed"` — 1 hit (line 6728) in a first-trimester article, not TTC prose. Acceptable.
- `"fertility score"` — 1 hit (line 15841) in an AMH article explicitly describing misuse ("Where it's often misused: as a general 'fertility score'"). Acceptable, educational framing.
- No hits for: safe days, unsafe days, perfect timing, confirmed ovulation, you are pregnant, you are not pregnant.

**Em dash rule** — Codebase-wide `—` count unchanged from previous QA baselines; no new em dashes introduced in the 9.12–9.14 batches (spot-verified on the six required sample articles).

**Sitemap pickup** — `scripts/generate-sitemap.ts` extracts every top-level `slug:` from `articleData.ts`, so all 23 new articles are picked up automatically. No generator edits required.

**Preservation** — Calculators, TTC Journey, SEO helper, sitemap generator, robots, redirects, and route files: unchanged.

**tsgo** — `bunx tsgo --noEmit` passes clean.

### Small fixes proposed (only if approved)
1. Delete unused `signsOfOvulation` entry from `hrefMap` in `ttcTopicData.ts`.
2. Remove `"/articles/signs-of-ovulation": ...` lines from `HREF_IMAGE_MAP` in `TTCTopicPage.tsx` and `TTCSubtopicPage.tsx`.

These are pure dead-code deletions; no user-visible change.

### Recommended next step
TTC content system is stable, editorially clean and structurally sound. Recommendation: **continue into pregnancy-tests and two-week-wait content expansion** (Phase 9.16). No blockers.
