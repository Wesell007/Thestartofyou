## Phase 7.6 — First Year Batch 4 Publishing: Development

Publish the two draft Development articles in `src/data/firstYearArticleData.ts` (lines 448-465). No other files change.

### Scope
- Edit only `src/data/firstYearArticleData.ts`.
- Replace the two draft objects with full ready articles.
- Keep `slug`, `topic`, `title`, `description`. Adjust `readTime` only if length demands it.
- No component, route, SEO wiring, image, or other-hub changes.

### Article 1 — baby-development-in-the-first-year
- `status: "ready"`, `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`.
- `seoTitle`: "Baby development in the first year | The Start of You"
- `seoDescription`: "A calm guide to baby development in the first year, including movement, communication, play and milestones."
- `intro`: calm framing that development is a slow unfolding, not a checklist.
- `sections` (7, 2 short paragraphs each):
  1. Development is more than milestones
  2. Movement and strength build gradually
  3. Senses, play and curiosity
  4. Communication starts before words
  5. Feeding, sleep and development can overlap
  6. Connection supports learning
  7. Practical ideas you can try
- `keyTakeaways`: 6 short lines.
- `relatedSlugs`: `["when-milestones-feel-uneven", "baby-care-basics", "newborn-sleep-expectations"]`

### Article 2 — when-milestones-feel-uneven
- Same medical/status/date fields.
- `seoTitle`: "When baby milestones feel uneven | The Start of You"
- `seoDescription`: "Supportive guidance for parents when baby milestones feel uneven, delayed or different from what they expected."
- `intro`: reassures without dismissing worry; balanced tone.
- `sections` (7, 2 short paragraphs each):
  1. Why milestones can feel emotional
  2. Development does not always move evenly
  3. One area can move faster than another
  4. Try not to compare babies too closely
  5. What to notice over time
  6. When to ask for advice
  7. Practical ideas you can try
- `keyTakeaways`: 5-6 short lines.
- `relatedSlugs`: `["baby-development-in-the-first-year", "baby-care-basics", "when-to-ask-for-help-after-birth"]`

### Sources (user-approved URL set)
Live-verify each URL with `curl -I` (200 OK) before writing it into the file. If any NHS URL 404s, substitute the closest verified NHS/Start for Life page and flag the swap in the return summary.

Approved candidate URLs:
- `https://www.nhs.uk/start-for-life/baby/baby-development/` (Start for Life)
- `https://www.nhs.uk/conditions/baby/babys-development/` (NHS)
- `https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/` (NHS baby reviews)
- `https://www.rcpch.ac.uk/` — use ONLY a specific RCPCH page clearly about child development, child health reviews, or parent-facing child health guidance. Do not cite the RCPCH homepage unless no suitable specific page exists; if only the homepage is usable, flag it in the return summary.

Distribute 4-5 verified sources per article across the above. Both articles may share NHS/Start for Life sources; do not invent URLs; do not use forums, blogs, or commercial pages.

### Content rules
British English. No em dashes. Calm, practical, non-judgmental tone. No rigid deadlines, diagnosis, treatment steps, invented stats, blame wording, or emergency thresholds. Include the balanced safety line exactly once per article: "If you are worried about your baby's development, or something feels different from what you expected, ask your health visitor, GP or the appropriate local service for advice." No "wait and see".

### Verification
- `tsgo`
- Playwright 1280×1800 and 375×812:
  - `/first-year/development/baby-development-in-the-first-year`
  - `/first-year/development/when-milestones-feel-uneven`
  - `/first-year/development` (both cards clickable, no draft placeholders)
- Draft gating: `/first-year/emotional-wellbeing/feeling-like-yourself-again` still NotFound.
- Regression: `/first-year/feeding/newborn-feeding-rhythms`, `/first-year/body-and-hormones/body-changes-after-birth`, `/family`, `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.
- Confirm medical review line, external source links with `target="_blank"` + `rel="noopener noreferrer nofollow"`, related guidance only ready articles, safety wording appears once, no horizontal overflow.

### Out of scope
Components, routes, images, SEO wiring, other hubs, `.lovable/plan.md`, other article statuses.

### Return summary
Files edited · articles published · ready/draft count · sections + takeaways per article · verified sources per article (with any RCPCH-homepage or substitution flags) · medical review fields · related slugs · guardrail + safety-wording checks · tsgo · route + topic + draft-gating + cross-site regression results · issues · suggested next prompt.
