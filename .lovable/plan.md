
# Full article-library rollout — flagship system

The 3 flagship pages (`tests-and-scans-in-pregnancy`, `heartburn-in-pregnancy`, `anterior-placenta`) are now the locked reference. Every other article in the library will adopt the same template, with no changes to the template itself and no content reduction.

## 1. Routing change (one file)

`src/pages/ArticlePage.tsx`

- Remove the `isFlagshipSlug(...)` gate. Promote `ArticleFlagshipTemplate` to the **default** render path for any article that has the minimum flagship shape:
  - `quickAnswer` present
  - `editorialSections` present and non-empty
  - `keyTakeaways` present and non-empty
- Articles missing any of those fields keep their current template (`ArticleDeepTemplate` → `ArticleLegacyPage`). No content is rewritten.
- Result: ~42 of 63 articles immediately move onto the flagship layout. The remaining ~21 (which lack editorialSections) continue on the current deep template, untouched.

`flagshipImageMap.ts` — `isFlagshipSlug` and `FLAGSHIP_SLUGS` are kept (the locked reference set) but are no longer used as a gate; they remain as documentation of the visual anchors.

## 2. Template — no changes

The flagship components stay byte-identical. No edits to:
- `ArticleFlagshipTemplate.tsx`
- `FlagshipHero.tsx`
- `FlagshipSummaryRow.tsx`
- `FlagshipKeyTakeawaysStrip.tsx`
- `FlagshipEditorialSections.tsx` (already gracefully omits the image side when no mapping exists)
- `FlagshipNormalCheckPanel.tsx`
- `FlagshipFAQ.tsx`

The 3 reference pages render byte-identically after the rollout.

## 3. Content — preserved verbatim

`src/data/articleData.ts` is **not edited** as part of this rollout. No section is removed, summarised, merged, or reworded. All `quickAnswer`, `keyTakeaways`, `editorialSections`, `inThisArticle`, `compare`, `faq`, `sources`, `relatedArticles`, and `metaDescription` fields stay exactly as they are. The flagship template already renders all of this depth — no content has to be cut to fit.

## 4. Image specificity — the core of the rollout

Every flagship article needs:
- one **hero image** tied to the article keyword
- one **section image** per editorial section, tied to that section's heading

Rule (locked from the reference set): no decorative flower fallback, no generic lifestyle filler. If you hid the heading, the image must still feel obviously about the topic.

### 4a. Asset inventory (already in `src/assets/`)

The library already contains ~30 topic-specific assets that fit the rollout cleanly, e.g.:

```text
article-hero-nausea / fatigue / implantation / symptoms-stopping
article-hero-tests-scans
article-hero-second-anatomy-scan / -anxiety / -body / -eating /
                  -movement / -movement-exercise / -sleep
article-hero-third-emotional / -hospital-bag / -movement /
                 -nursery / -signs-of-labour / -sleep
article-hero-emotional-first-tri / -food-aversions / -lifestyle
guidance-card-body / -bonding / -comfort / -development /
              -emotional / -fresh / -journey / -milestones /
              -morning / -nourish / -nursery / -planning /
              -practical / -quiet / -reflection / -rest /
              -safety / -symptoms / -textiles / -timelines /
              -wellness
flagship-heartburn-* / flagship-anterior-* (4 each)
```

That set is already strong enough to cover the majority of slugs and section topics specifically.

### 4b. New per-article hero assignments

Extend `flagshipHeroMap` in `flagshipImageMap.ts` so every article that will now render through the flagship template has an explicit hero entry. Mapping is by article subject, examples:

```text
nausea-in-early-pregnancy           → article-hero-nausea
complete-guide-morning-sickness     → article-hero-nausea
fatigue-in-early-pregnancy          → article-hero-fatigue
implantation-bleeding               → article-hero-implantation
symptoms-stopping-early-pregnancy   → article-hero-symptoms-stopping
foods-to-avoid-in-pregnancy         → article-hero-second-eating
eating-well-in-pregnancy            → article-hero-second-eating
key-nutrients-in-pregnancy          → guidance-card-nourish
when-you-cant-face-food-in-pregnancy→ article-hero-food-aversions
moving-your-body-in-pregnancy       → article-hero-second-movement-exercise
sleep-in-pregnancy                  → article-hero-second-sleep
weight-changes-in-pregnancy         → article-hero-second-body
how-your-baby-develops-in-pregnancy → guidance-card-development
twins-and-multiples-in-pregnancy    → article-hero-second-anatomy-scan
the-space-your-baby-will-come-home-to → guidance-card-nursery
hospital-bag-and-what-to-pack       → article-hero-third-hospital-bag
signs-of-labour                     → article-hero-third-signs-of-labour
stages-of-labour                    → article-hero-third-signs-of-labour
when-to-go-in-for-labour            → article-hero-third-signs-of-labour
preparing-emotionally-for-birth     → article-hero-third-emotional
anxiety-in-pregnancy                → article-hero-second-anxiety
emotional-wellbeing-pregnancy       → article-hero-emotional-first-tri
the-first-trimester-emotionally     → article-hero-emotional-first-tri
when-the-joy-doesnt-arrive-yet      → guidance-card-quiet
pregnancy-after-loss                → guidance-card-quiet
perinatal-anxiety                   → article-hero-second-anxiety
baby-movement-in-pregnancy          → article-hero-third-movement
reduced-movements-in-pregnancy      → article-hero-third-movement
baby-hiccups-in-the-womb            → article-hero-second-movement
braxton-hicks-contractions          → article-hero-third-signs-of-labour
round-ligament-pain / pelvic-pain / back-pain → article-hero-second-body
shortness-of-breath / swelling      → article-hero-second-body
constipation-in-pregnancy           → article-hero-second-eating
low-lying-placenta-in-pregnancy     → flagship-anterior-positions
breech-baby                         → article-hero-second-anatomy-scan
measuring-big-or-small-in-pregnancy → article-hero-second-anatomy-scan
growth-scans-in-pregnancy           → article-hero-tests-scans
cord-around-the-neck-in-pregnancy   → article-hero-tests-scans
vaccinations-in-pregnancy           → guidance-card-safety
medicines-in-pregnancy              → guidance-card-safety
writing-a-birth-plan                → guidance-card-planning
... (full table written into the file for every flagship-eligible slug)
```

Every assignment is justified by topic — none is decorative.

### 4c. Per-section image mapping — keyword resolver

Hand-coding ~250 individual section images is unrealistic in one pass and isn't necessary because the section IDs in `articleData.ts` are already strong topic keywords (e.g., `why-it-happens`, `when-it-starts-and-ends`, `what-may-help`, `when-to-call`, `how-it-feels`, `movement`, `sleep`, `nutrition`, `safety`, `scan`, `birth-plan`, …).

Add to `flagshipImageMap.ts`:

1. The existing explicit `flagshipSectionImageMap` (3 reference articles, untouched).
2. A new **per-article section table** for every newly-promoted article, where each entry pairs `${slug}::${sectionId}` with the most topic-specific asset available. Built by reading each article's `editorialSections` once and assigning by heading keyword. Example for `eating-well-in-pregnancy`:

```text
::what-matters-most       → guidance-card-nourish
::what-to-include          → article-hero-second-eating
::what-to-limit-or-avoid   → guidance-card-safety
::eating-when-its-hard     → article-hero-food-aversions
::supplements              → guidance-card-wellness
::common-questions         → guidance-card-quiet
```

3. A `resolveSectionImage(slug, sectionId, heading)` helper used by `FlagshipEditorialSections` as a **last-resort** lookup only when no explicit pair exists. It matches against a small keyword → asset table:

```text
movement / kick / hiccup     → article-hero-third-movement
sleep / rest / night         → article-hero-second-sleep
eat / food / nutrition / diet → guidance-card-nourish
nausea / sick / vomit        → article-hero-nausea
tired / fatigue / energy     → article-hero-fatigue
scan / ultrasound / test     → article-hero-tests-scans
labour / contraction / birth → article-hero-third-signs-of-labour
hospital / bag / pack        → article-hero-third-hospital-bag
nursery / cot / space        → guidance-card-nursery
emotion / feel / mood / anxiety → article-hero-second-anxiety
safety / medicine / vaccine  → guidance-card-safety
plan / prepare / checklist   → guidance-card-planning
body / pain / ache / pelvic  → article-hero-second-body
loss / quiet / grief         → guidance-card-quiet
twin / multiple              → article-hero-second-anatomy-scan
placenta / position          → flagship-anterior-positions
when-to-call / midwife / GP  → guidance-card-practical
```

If neither explicit nor keyword resolves, the section renders **without** an image — the component already supports a text-only column. This honours the no-decorative-fallback rule.

`FlagshipEditorialSections.tsx` gets a 3-line change: replace the direct map lookup with the resolver. No layout change.

### 4d. Bespoke images

This rollout uses the existing asset library (already topic-specific). It does not generate new AI images for every section, because:
- generating ~250 bespoke images in one pass would slow the rollout and risk inconsistent quality
- the existing assets cover the dominant section topics specifically
- the resolver guarantees no decorative-flower or generic-pregnancy filler ever appears

Bespoke generation can be queued as a follow-up pass, slug by slug, against the same map without any further code change.

## 5. Files changed

```text
src/pages/ArticlePage.tsx                                  (small)
src/components/article/flagship/flagshipImageMap.ts        (large — full hero + section map for every promoted article)
src/components/article/flagship/FlagshipEditorialSections.tsx (3-line resolver swap)
```

No other files touched. No edits to:
- week pages, trimester pages, pregnancy hub, homepage, navbar
- `articleData.ts`
- legacy/deep templates
- the 3 locked reference pages' rendered output

## 6. Breakpoints (unchanged from reference)

- `< 768px`: hero stacks (image above text), section image stacks above its text, summary row stacks, takeaways one-up, FAQ stacks
- `768–1024px`: hero 7/5 split, alternating section images, takeaways 2-up, FAQ split
- `≥ 1024px`: full reference layout, sticky section images, takeaways 3-up

## 7. Final return

After implementation, the response will include:

A. Changed files (exactly the 3 above)
B. Confirmation the flagship template now drives the whole article library
C. Count of articles now on the flagship system (expected ~42 of 63; the rest stay on the current template because they lack editorialSections, not because they were skipped)
D. How image specificity was achieved (explicit per-article hero map + explicit per-article section map + keyword resolver + no decorative-flower fallback)
E. Confirmation no content was reduced — `articleData.ts` untouched
F. Breakpoint notes
G. Confirmation this is a true full-library rollout under the locked reference

Approve and I'll implement.
