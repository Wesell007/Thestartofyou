## Phase 10.2a — Diet and Exercise Article Gap Batch

Publish 5 flagship pregnancy articles into `/pregnancy/diet-and-exercise`, wire images and grouping. No routes, sitemap, TTC, IVF, or other hub changes.

### Step 1 — Duplicate check (must run before creation)
Grep `src/data/articleData.ts` for candidate slugs:
- `caffeine-in-pregnancy`
- `hydration-in-pregnancy`
- `cravings-and-aversions-in-pregnancy` (also check `cravings-in-pregnancy`, `food-aversions`)
- `pelvic-floor-exercises-in-pregnancy` (also `pelvic-floor`)
- `exercise-safety-by-trimester` (also `exercise-in-pregnancy`, `exercise-by-trimester`)

If any exact-match slug exists → stop and report before creating.

### Step 2 — Generate 5 hero images (premium tier)
Save to `src/assets/`:
- `article-hero-caffeine-pregnancy.jpg` — soft-lit warm mug, botanical accents, neutral tones
- `article-hero-hydration-pregnancy.jpg` — glass carafe of water, herbs, cream light
- `article-hero-cravings-aversions.jpg` — calm still life of fruit/bread, sage tones
- `article-hero-pelvic-floor.jpg` — soft-lit expectant figure seated calmly, botanicals, no clinical framing
- `article-hero-exercise-trimester.jpg` — gentle movement/walk in soft light, cream/sage palette

Style rules: soft light, sage/cream/warm, botanical detail, no brand names, no readable text, no clinical/fear imagery.

### Step 3 — Author 5 flagship articles in `src/data/articleData.ts`
Each follows the existing pregnancy flagship shape (matching e.g. `eating-well-in-pregnancy`) with:
- slug, title, metaDescription, quickAnswer, readTime
- `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`
- pregnancy journey/topic fields matching existing pregnancy articles
- 5–6 keyTakeaways, 5–7 editorialSections, 3 faq items
- relatedSlugs drawn only from live pregnancy slugs (`eating-well-in-pregnancy`, `foods-to-avoid-in-pregnancy`, `key-nutrients-in-pregnancy`, `moving-your-body-in-pregnancy`, `when-you-cant-face-food-in-pregnancy`, `complete-guide-to-morning-sickness`)
- 3–5 structured sources (NHS, NICE, RCOG, Tommy's, GOV.UK)
- hero image referencing the new asset

Content intent per article as specified in the brief (caffeine limits framed in UK guidance terms; hydration cues + nausea/heat/exercise; cravings/aversions with no shame; pelvic floor awareness + signpost to pelvic health physio; trimester-shift movement guidance + warning signs).

Editorial guardrails: UK English, no em dashes, calm hedged language ("may/might/can/often/usually"), signpost midwife/GP/pharmacist/clinician, no personalised advice.

### Step 4 — Update `src/data/pregnancyTopicData.ts` (diet-and-exercise topic)
Add new slugs to existing groups (preserve Phase 10.1 structure):
- **Eating well** — add `caffeine-in-pregnancy`, `hydration-in-pregnancy`
- **Movement and exercise** — add `pelvic-floor-exercises-in-pregnancy`, `exercise-safety-by-trimester`
- **When food feels hard** — add `cravings-and-aversions-in-pregnancy`

If group keys differ from these labels, match to the existing Phase 10.1 group ids and rename/create only the minimum needed to hold the new items in curated form.

### Step 5 — Update `src/components/pregnancy/PregnancyTopicPage.tsx`
Import the 5 new assets and add entries to `HREF_IMAGE_MAP` mapping each new article href to its own hero image. Preserve all Phase 10.1 mappings.

### Step 6 — Verify
- `bunx tsgo --noEmit` clean
- Spot-check `/pregnancy/diet-and-exercise` shows 5 new cards in the right groups with distinct images
- Confirm each new article route renders via the standard `/articles/:slug` flagship path
- Confirm Pregnancy Map, other pregnancy topics, TTC, IVF, sitemap, robots, routes, SEO files untouched

### Deliverable summary at end
Report files inspected/edited, assets created, duplicate check result, slugs/titles, reviewer + source status, image wiring, topic page result, preservation checks, dash-rule result, tsgo result, and readiness for Phase 10.2b.
