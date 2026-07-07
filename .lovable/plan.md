## Phase 7.5 — First Year Batch 3 Publishing: Feeding

Publish the two Feeding articles by updating their existing draft objects in `src/data/firstYearArticleData.ts`. No other files change.

### Scope

Single-file edit: `src/data/firstYearArticleData.ts`.
No component, route, SEO wiring, image, or cross-hub changes.

### Articles to publish

For each existing article object, set `status: "ready"`, `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, and add `intro`, `sections` (7), `keyTakeaways` (5–6), `relatedSlugs` (3), `sources` (4–5), `seoTitle`, `seoDescription`. Keep existing `slug`, `topic`, `title`, `description`. Adjust `readTime` only if length requires.

1. **newborn-feeding-rhythms** (Feeding)
   - Sections: Why newborn feeding can feel irregular · Feeding often can be normal in the early weeks · Watching your baby, not just the clock · Breastfeeding, bottle feeding and mixed feeding can all have rhythms · Night feeds and tiredness · When to ask for advice · Practical ideas you can try
   - Related: `bottle-and-breastfeeding-questions`, `newborn-sleep-expectations`, `baby-care-basics`
   - SEO title: `Newborn feeding rhythms | The Start of You`
   - SEO description: `A calm guide to newborn feeding patterns, frequent feeds, night feeds and responsive feeding in the early months.`

2. **bottle-and-breastfeeding-questions** (Feeding)
   - Sections: Why feeding questions can feel emotional · Breastfeeding questions · Bottle feeding questions · Expressing and mixed feeding · Changing your feeding plan · When to ask for advice · Practical ideas you can try
   - Related: `newborn-feeding-rhythms`, `baby-care-basics`, `helping-your-baby-settle`
   - SEO title: `Bottle and breastfeeding questions | The Start of You`
   - SEO description: `Balanced guidance for breastfeeding, bottle feeding, expressing, mixed feeding and changing feeding plans.`

Related slugs may point to drafts; `FirstYearArticlePage` already filters to ready only.

### Content rules

- 2 short paragraphs per section. British English. No em dashes. Calm, practical, non-judgemental tone.
- No shame-based feeding language, no pressure toward breast or bottle, no moral hierarchy between feeding routes, no strict schedules.
- No diagnosis, treatment, medication, emergency thresholds, invented statistics, product claims, or unsafe formula-preparation steps.
- **Safety wording used once only**, placed naturally in "When to ask for advice": "If feeding feels painful, your baby seems unwell, nappies change suddenly, weight gain is worrying, or you are unsure what to do next, ask your midwife, health visitor, GP or the appropriate local service for advice." No emergency numbers, no clinical thresholds.

### Sources

4–5 per article using verified UK sources (NHS, UNICEF UK Baby Friendly Initiative, First Steps Nutrition Trust where relevant, NHS/GOV.UK formula preparation guidance where relevant).
**Every URL live-checked via web fetch before inclusion.** If a candidate source doesn't resolve to the correct live page, **omit it and flag the gap** rather than substituting a weaker source. Minimum acceptable is 3; if fewer than 3 verified sources exist, flag and leave at 3.
No forums, blogs, influencer content, or commercial baby-product pages.

### SEO fields

Use the exact `seoTitle` / `seoDescription` strings above.

### Verification

- `tsgo`
- Playwright at 1280×1800 and 375×812 on:
  - `/first-year/feeding/newborn-feeding-rhythms`
  - `/first-year/feeding/bottle-and-breastfeeding-questions`
  Confirm renders via `HubArticleView`, medical review line with Jenny Joines, sources with `target="_blank"` + `rel="noopener noreferrer nofollow"`, related guidance ready-only, no placeholder text, no horizontal overflow, safety phrase appears at most once per article.
- Topic hub `/first-year/feeding`: both cards clickable, remaining drafts show "Coming soon" and are not clickable.
- Draft gating: `/first-year/development/baby-development-in-the-first-year` → NotFound.
- Regression: `/first-year/sleep/newborn-sleep-expectations`, `/first-year/postpartum-recovery/healing-after-birth`, `/family`, `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.

### Out of scope

New articles, new topics, new slugs, route changes, component edits, SEO implementation, images, other hubs, other draft status changes, source additions to other drafts, `.lovable/plan.md`.

### Return summary

Files edited · two articles published · ready/draft count · section count per article · key takeaway count per article · sources per article with verified URLs · any source gaps flagged · medical review fields · related slugs · sensitive-content guardrail result · safety-phrase-once check · tsgo · route verification · topic page verification · draft route gating · cross-site regression · issues/follow-up · suggested next prompt.
