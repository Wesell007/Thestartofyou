## Phase 7.4 — First Year Batch 2 Publishing

Publish four parent-focused First Year articles across Postpartum Recovery and Body & Hormones by updating existing draft objects in `src/data/firstYearArticleData.ts` only.

### Scope

Single file edit: `src/data/firstYearArticleData.ts`.
No component, route, SEO wiring, image, or cross-hub changes.

### Articles to publish

For each existing article object below, set `status: "ready"`, `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, and add `intro`, `sections` (7), `keyTakeaways` (5–6), `relatedSlugs` (3), `sources` (3–5), `seoTitle`, `seoDescription`. Keep existing `slug`, `topic`, `title`, `description`. Adjust `readTime` only if length requires.

1. **healing-after-birth** (Postpartum Recovery)
   - Sections: Why healing can take time · Rest matters, even when rest is difficult · Bleeding, soreness and tenderness · Stitches, wounds and scars · Pelvic floor and core awareness · When to ask for advice · Practical ideas you can try
   - Related: `what-recovery-can-feel-like`, `body-changes-after-birth`, `postnatal-checks-and-appointments`

2. **what-recovery-can-feel-like** (Postpartum Recovery)
   - Sections: Recovery is not always a straight line · Your body may feel unfamiliar · Tiredness can shape everything · Emotions and recovery often overlap · Support can make recovery easier · When recovery feels harder than expected · Practical ideas you can try
   - Related: `healing-after-birth`, `feeling-like-yourself-again`, `body-changes-after-birth`

3. **body-changes-after-birth** (Body & Hormones)
   - Sections: Why body changes can feel surprising · Bleeding, breasts and hormones · Your abdomen, posture and strength · Pelvic floor changes · Scars, stitches and skin · Body image after birth · Practical ideas you can try
   - Related: `healing-after-birth`, `hormones-sweat-and-hair-loss`, `what-recovery-can-feel-like`

4. **hormones-sweat-and-hair-loss** (Body & Hormones)
   - Sections: Why hormones can feel intense after birth · Sweating and temperature changes · Hair shedding after birth · Breast changes and feeding shifts · Mood, tiredness and hormones · When to ask for advice · Practical ideas you can try
   - Related: `body-changes-after-birth`, `what-recovery-can-feel-like`, `feeling-like-yourself-again`

Related slugs may point to drafts; `FirstYearArticlePage` already filters related guidance to ready articles.

### Content rules

- 2 short paragraphs per section. British English. No em dashes. Calm, supportive tone.
- No diagnosis, treatment instructions, medication advice, emergency thresholds, invented stats, universal-recovery claims, weight-loss framing, or "bounce back" language.
- **Safety wording used once only**, placed naturally in the "When to ask for advice" section (or near the end where that section is absent). Do not repeat the phrase across multiple sections. Broad form: "If bleeding, pain, mood, temperature, wounds or any other symptoms worry you, ask for advice from your midwife, GP or the appropriate local service." No emergency numbers, no red-flag thresholds.

### Sources

3–5 per article using verified UK sources (NHS, RCOG, Tommy's).
**Every URL live-checked before inclusion** via web fetch. If a candidate source does not resolve to the correct live page, **omit it and flag the gap in the return summary** rather than substituting a weaker source. Minimum acceptable count is 3; if fewer than 3 verified sources exist, flag and leave the article at 3 with the gap noted.
No forums, blogs, influencer, or commercial pages. Broad NHS hair-loss page only if a specific postpartum page isn't available and copy stays general.

### SEO fields

Use the exact `seoTitle` / `seoDescription` strings supplied in the request for each article.

### Verification

- `tsgo`
- Playwright at 1280×1800 and 375×812 on the four article routes: renders via `HubArticleView`, medical review line with Jenny Joines, sources render with `target="_blank"` + `rel="noopener noreferrer nofollow"`, related guidance ready-only, no placeholder text, no horizontal overflow, safety phrase appears at most once per article.
- Topic hubs `/first-year/postpartum-recovery` and `/first-year/body-and-hormones`: four new cards clickable, remaining drafts show "Coming soon" and are not clickable.
- Draft gating: `/first-year/emotional-wellbeing/feeling-like-yourself-again` → NotFound.
- Regression: `/first-year/sleep/newborn-sleep-expectations`, `/first-year/care-and-safety/safe-sleep-and-home-safety`, `/family`, `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.

### Out of scope

New articles, new topics, new slugs, route changes, component edits, SEO implementation, images, other hubs, other draft status changes, source additions to other drafts, `.lovable/plan.md`.

### Return summary

Files edited · four articles published · ready/draft count · section count per article · key takeaway count per article · sources per article with verified URLs · any source gaps flagged · medical review fields · related slugs · sensitive-content guardrail result · safety-phrase-once check · tsgo · route verification · topic page verification · draft route gating · cross-site regression · issues/follow-up · suggested next prompt.
