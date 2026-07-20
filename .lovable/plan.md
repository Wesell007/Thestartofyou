# Phase 9.17 — Final TTC Topic QA

Read-only investigation is complete. All checks pass. No code changes are needed. On approval, I will re-run the verification and return the full QA deliverable summary.

## Findings from investigation

**Typecheck:** `bunx tsgo --noEmit` exit 0.

**Phase 9.16 articles (6/6 clean):**
- Each slug declared exactly once in `articleData.ts`.
- Each wired into `ttcTopicData.ts` and `TTCSubtopicPage.tsx` `HREF_IMAGE_MAP`.
- All 6 carry `reviewedBy: "Jenny Joines"` and `lastUpdated: "July 2026"`.
- All 6 have `editorialSections`, `keyTakeaways`, `faq`, `sources`, distinct `hero`.
- Zero em/en dashes in the Phase 9.16 range.
- All `relatedSlugs` resolve to existing article slugs (`when-to-take-a-pregnancy-test`, `faint-positive-pregnancy-test`, `implantation-bleeding`, `two-week-wait`, `chemical-pregnancy`, `late-ovulation-and-ttc`, `irregular-periods-and-trying-to-conceive`, `when-to-ask-for-fertility-help`).

**Dead-code preservation:** No `/articles/signs-of-ovulation` entry has returned to `TTCSubtopicPage.tsx`. Pre-existing references in `articleInventory.ts`, `ttcFlagshipOverrides.ts`, `flagshipImageMap.ts`, `ArticleHeroImage.tsx`, and the redirect route in `App.tsx` are unchanged from prior phases and out of scope for this QA (touching them would breach the "no strategic changes" rule).

**Preservation scope:** No edits to Pregnancy, IVF, First Year, Toddler, Family, calculators, Journey, routes, sitemap, robots, redirects, or SEO infrastructure.

## Plan on approval

1. Re-run `bunx tsgo --noEmit` and confirm exit 0.
2. Re-grep the Phase 9.16 article range for em/en dashes and reviewer/date fields.
3. Enumerate every Start Here and grouped article link in the 9 TTC topic configs and confirm each target slug exists in `articleData.ts`.
4. Walk `HREF_IMAGE_MAP` against each topic's ordered article list to detect any adjacent duplicate thumbnails on the currently rendered groupings.
5. Confirm TTC hub still shows the three-cluster directory (Timing/testing/waiting, Health and preparation, Fertility support), the purple IVF pathway panel is present, and the green Treatment pathways card has not returned.
6. Confirm parent fields remain removed from `cycle-tracking`, `two-week-wait`, `pregnancy-tests`, `conditions`; verify current nesting for `male-fertility`, `age-and-fertility`, `ivf-and-treatment`.
7. Return the full QA deliverable in the exact section order requested, including a safe-to-proceed statement.

**Small fixes clause:** If steps 3–6 surface any broken link, missing image mapping, adjacent duplicate thumbnail, or accidental dash, I will apply the minimum fix in place (allowed by the phase brief) and note it in the deliverable. Anything strategic or structural will be reported without editing.

No new articles, no new images, no route or SEO changes.
