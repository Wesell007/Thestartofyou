## Phase 9.20 — Final TTC Article Gap Batch

Add 6 flagship TTC articles closing the last gaps identified in Phase 9.18 and confirmed after 9.19 polish. No changes to Pregnancy, IVF, First Year, Toddler, Family, calculators, TTC Journey, routes, sitemap, robots, redirects or SEO infrastructure.

### Step 1 — Duplicate check (blocking)

Grep `src/data/articleData.ts` for exact and near-duplicate slugs. Stop and report if any exact match is found for:

- tracking-without-overthinking / cycle-tracking-without-overthinking / tracking-while-trying-to-conceive
- thyroid-and-fertility / thyroid-conditions-and-trying-to-conceive
- ttc-in-your-30s / trying-to-conceive-in-your-30s
- ttc-after-35 / trying-to-conceive-after-35
- emotional-pressure-of-age-when-ttc / age-pressure-when-trying-to-conceive
- partner-support-when-ttc / supporting-each-other-while-trying-to-conceive

Also validate every intended related slug exists live before wiring it.

### Step 2 — Generate 6 image assets

Create JPGs in `src/assets/` via imagegen (soft daylight, sage/cream/warm neutral, calm supportive, no text, no test lines, no clinical/distress imagery):

- ttc-tracking-without-overthinking.jpg
- ttc-thyroid-and-fertility.jpg
- ttc-in-your-30s.jpg
- ttc-after-35.jpg
- ttc-emotional-pressure-age.jpg
- ttc-partner-support.jpg

### Step 3 — Append 6 flagship articles to `src/data/articleData.ts`

Shape matches Phase 9.12–9.16 TTC flagship articles:
`topic: "ttc"`, `journey: ["trying-to-conceive"]`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, metaDescription, standfirst, quickAnswer, hero, 5–6 keyTakeaways, 5–7 editorialSections, normalCheck (where used by schema), 3 FAQ, 3–5 structured sources, relatedSlugs (live only).

Editorial rules: UK English; no em/en dashes; careful words (may, might, can, often, usually); signpost to GP / pharmacist / fertility clinic / clinician; no fear-based decline framing; no blame-based male-fertility framing; no certainty about pregnancy or ovulation.

Articles:

1. **tracking-without-overthinking** — Cycle tracking without overthinking. Tracking as tool not rule; picking one or two signals; when tests/mucus/BBT feel stressful; taking breaks; when to ask for support; protecting intimacy.
2. **thyroid-and-fertility** — Thyroid conditions and trying to conceive. Thyroid hormones in plain terms; why balance can matter for cycles and pregnancy planning; known conditions before TTC; symptoms worth discussing; medication review and bloods in general terms; when to speak to GP or specialist. Sources include British Thyroid Foundation, NHS, NICE.
3. **ttc-in-your-30s** — Trying to conceive in your 30s. Why many try in 30s; cycle awareness; preconception health; when to ask for support; comparison/pressure; partner factors. No cliff-edge language.
4. **ttc-after-35** — Trying to conceive after 35. Why age enters the conversation; careful timeframes for asking for help; cycle awareness; partner age/sperm health in careful terms; fertility appointment prep; emotional pressure. No guarantees, no fear.
5. **emotional-pressure-of-age-when-ttc** — The emotional side of age when trying to conceive. Feeling behind; family/social pressure; comparing timelines; decision fatigue; partner conversations; wellbeing plus seeking help when needed. Supportive, not medical-advice piece.
6. **partner-support-when-ttc** — Supporting each other while trying to conceive. Shared responsibility; talking about timing without blame; semen analysis/lifestyle conversations carefully; emotional differences; intimacy; asking for support together. Never frame fertility as one partner's fault.

### Step 4 — Topic placement in `src/data/ttcTopicData.ts`

Preserve all Phase 9.19 structure.

- **cycle-tracking**: Add `tracking-without-overthinking` into the existing **When cycles are unclear** group (avoid a single-item wellbeing group).
- **conditions**: Add `thyroid-and-fertility` into **Specific conditions** (fulfils prior curationNote).
- **age-and-fertility**: Restructure into three groups so the page no longer relies on the single existing age article:
  - Understanding age and timing → `age-and-trying-to-conceive`, `ttc-in-your-30s`, `ttc-after-35`
  - Planning and support → keep relevant existing support links
  - The emotional side of age → `emotional-pressure-of-age-when-ttc` (fold into support group if it reads better as a single-item group)
- **male-fertility**: Add `partner-support-when-ttc` next to the Phase 9.19 **Health and support before pregnancy** group (either extend that group or add a partnership grouping — no single-item groups).

### Step 5 — Image wiring in `src/components/ttc/TTCSubtopicPage.tsx`

Import the 6 new assets and add entries to `HREF_IMAGE_MAP` for each new slug. Preserve every Phase 9.12–9.19 mapping. Do not touch pregnancy image maps.

### Step 6 — Verify

- `bunx tsgo --noEmit` → clean.
- Grep confirms each new slug appears once as an article object.
- Grep confirms each new slug is surfaced from the intended topic config.
- Manual scan: no adjacent thumbnail collisions on updated pages; Phase 9.19 groups intact.
- All `relatedSlugs` resolve to live articles.
- No changes outside `articleData.ts`, `ttcTopicData.ts`, `TTCSubtopicPage.tsx`, and new asset files.

### Deliverable summary format

Files inspected; files edited; assets created; duplicate check result; articles created (slugs + titles); reviewer status; source status; image wiring result; per-topic results (cycle tracking, conditions, age and fertility, male fertility); Phase 9.19 preservation; image QA result; related link result; Pregnancy / IVF / TTC Journey preservation; SEO/sitemap/robots/redirects/route preservation; dash-rule result; `bunx tsgo --noEmit` result; whether TTC is ready for final sign off.
