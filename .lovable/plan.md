
# Phase 7.3 — First Year Batch 1 publishing

## Files edited
- `src/data/firstYearArticleData.ts` (only)

No component, route, SEO wiring, image, or cross-hub edits.

## Articles flipped to `status: "ready"`
1. `newborn-sleep-expectations` (sleep)
2. `helping-your-baby-settle` (sleep)
3. `safe-sleep-and-home-safety` (care-and-safety)
4. `baby-care-basics` (care-and-safety)

All other 13 articles remain `draft`. Post-batch count: 4 ready / 13 draft.

## Fields added to each of the four
- `status: "ready"`
- `medicallyReviewed: true`
- `reviewedBy: "Jenny Joines"`
- `lastUpdated: "July 2026"`
- `seoTitle`, `seoDescription` (exact strings from the spec)
- `intro` (2 short paragraphs, calm and orienting)
- `sections`: exactly 7, each with 2 short paragraphs, using the section headings listed in the spec verbatim per article
- `keyTakeaways`: 5 to 6 per article
- `relatedSlugs`: 3 per article, using existing First Year slugs from the spec (drafts allowed since `FirstYearArticlePage` filters related to `ready`)
- `sources`: 3 to 5 per article, structured `{ label, publisher, url, year? }`

Existing `slug`, `topic`, `title`, `description`, `readTime` preserved. `readTime` only adjusted if the finished length obviously demands it.

## Sources (verified live URLs only)
Sources are drawn from these trusted UK domains, and each URL is opened in a Playwright check before commit to confirm HTTP 200 and topical match. If any candidate URL fails to resolve or has moved, replace with the closest current page on the same site rather than invent a link.

- NHS: `nhs.uk` (baby sleep, soothing, bathing, cord care, spotting illness)
- The Lullaby Trust: `lullabytrust.org.uk` (safer sleep advice)
- UNICEF UK Baby Friendly Initiative: `unicef.org.uk/babyfriendly` (responsive care)
- RoSPA: `rospa.com` (home safety for under-fives)
- Child Accident Prevention Trust: `capt.org.uk` (baby safety)

Distribution:
- `newborn-sleep-expectations`: NHS baby sleep, Lullaby Trust safer sleep, UNICEF responsive care
- `helping-your-baby-settle`: NHS soothing / baby sleep, Lullaby Trust, UNICEF responsive care
- `safe-sleep-and-home-safety`: Lullaby Trust safer sleep, NHS baby safety, RoSPA, CAPT
- `baby-care-basics`: NHS washing and bathing, NHS umbilical cord care, NHS nappy care, NHS spotting signs of serious illness

No forums, blogs, or commercial product pages.

## Tone and safety guardrails applied to copy
- British English, no em dashes, calm and supportive, no shame language.
- No promise that any settling method works.
- No strict newborn schedules.
- No unsafe sleep suggestions; sleep articles include the broad line "For sleep, follow current safer sleep guidance from trusted sources such as the NHS and The Lullaby Trust."
- No medical diagnosis, treatment, medication, or emergency thresholds. No emergency numbers.
- Care articles include the broad line "If you are worried about your baby, or something feels urgent, ask for medical advice from the appropriate local service."
- No invented statistics. No exact temperature thresholds unless directly sourced and necessary (default: omit).
- No product claims.

## Verification
- `tsgo`.
- Playwright over the four ready routes: article renders through `HubArticleView`, medical review line with "Jenny Joines" visible, sources block renders, all `<a>` in sources have `target="_blank"` and `rel="noopener noreferrer nofollow"` (assert in DOM), related grid shows only ready siblings, no placeholder strings ("This section is a placeholder", "is being prepared") anywhere in the DOM.
- Playwright HEAD/GET on every source URL: expect 200.
- Playwright over `/first-year/sleep` and `/first-year/care-and-safety`: the four published cards are `<a>`/`<Link>`; the other 13 draft cards remain non-linked with "Coming soon".
- Playwright over `/first-year/feeding/newborn-feeding-rhythms`: NotFound renders, no article body.
- Regression: `/family`, `/family/health-safety/making-your-home-safer` (sources still render), `/articles/complete-guide-morning-sickness` (SEO head intact), `/toddler` (unchanged).
- Mobile (375×) check on each ready article and both topic pages: no horizontal overflow.

## Suggested next prompt
> Phase 7.4 — First Year Batch 2 publishing (Postpartum recovery + Checkups & warning signs): author `healing-after-birth`, `what-recovery-can-feel-like`, `postnatal-checks-and-appointments`, `when-to-ask-for-help-after-birth` with the same medically reviewed + structured sources pattern; NHS / RCOG / PANDAS / Mind sources; no SEO wiring, no images.
