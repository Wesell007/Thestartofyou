## Phase 11.8b — First Year Month Guides, 4 to 8 Months

Publish five new deep month guide pages using the shared system from 11.8a / 11.8a.2. No system rebuild, no 9–12 month pages.

### Routes to add
- `/first-year/4-months`
- `/first-year/5-months`
- `/first-year/6-months`
- `/first-year/7-months`
- `/first-year/8-months`

Registered in `src/App.tsx` above the dynamic First Year article route.

### Files to edit
- `src/data/firstYearMonthData.ts` — append 5 new `MonthGuide` entries; extend `firstYearMonthImages` map with 5 new image sets; update published month order (Newborn → 8 months) so prev/next runs through the new pages.
- `src/App.tsx` — register the 5 new `MonthPage` routes.
- `src/components/firstyear/new/FYPhaseNav.tsx` — repoint the 4, 5, 6, 7, 8 month pills to the new deep routes; leave 9–12 pointing at phase hubs.
- `scripts/generate-sitemap.ts` — add the 5 new routes; regenerate `public/sitemap.xml`.
- No changes planned to `FirstYearMonthPage.tsx` (shared layout already meets the standard). Touch it only if a tiny reusable tweak is needed.

### Assets to create (15 JPGs)
Under `src/assets/first-year/months/`, following the 11.8a.2 CDN asset pattern (`lovable-assets create` → `.asset.json` pointers):

- 4m: `first-year-4-month-hero.jpg`, `-baby.jpg`, `-parent.jpg`
- 5m: `first-year-5-month-hero.jpg`, `-baby.jpg`, `-parent.jpg`
- 6m: `first-year-6-month-hero.jpg`, `-baby.jpg`, `-parent.jpg`
- 7m: `first-year-7-month-hero.jpg`, `-baby.jpg`, `-parent.jpg`
- 8m: `first-year-8-month-hero.jpg`, `-baby.jpg`, `-parent.jpg`

Visual style: soft natural light, warm cream / sage / muted rose / gentle blue, age-appropriate baby moment (hero), a development detail (baby), a calm parent moment (parent). No text, brands, clinical scenes, unsafe sleep/feeding, distressed baby, or milestone pressure.

### Content per month
Each guide uses the approved article-led shape: hero, short version, baby editorial (5–7 subsections), feeding section, sleep section, you section, 4 feels-hard, 4 what-helps, 3–4 support signposts, 4–6 common questions, related guidance, 3–5 UK references, prev/next rail.

Focus areas per plan brief:
- **4m** — social interaction, head control, reach/roll, 4-month sleep change, feeding distraction, solids not yet, parent tiredness and pelvic floor, comparison pressure.
- **5m** — reaching/grabbing, supported sitting, awake windows, preparing for first foods, feeding questions, sleep still changing, parent confidence.
- **6m** — first foods, sitting/movement, milk still central, sleep shifts, teething, routines, weaning pressure, parent identity.
- **7m** — rolling/crawling attempts, separation anxiety, food exploration, milk/solids balance, sleep disruption, baby-proofing, parent mental load.
- **8m** — mobility and curiosity, object permanence, vocalisation, solids/milk balance, clinginess, sleep changes, safety, parent fatigue.

### Links and CTAs
- **Related guidance:** only verified live slugs from `firstYearArticleData.ts`. No invented slugs, no `href="#"`.
- **Read links** on questions: only when a real First Year article exists for that answer; otherwise omit.
- **Ask CTAs:** `/ask?stage=first-year&month=<slug>&topic=<topic>`.
- **References:** 3–5 trusted UK sources per page (NHS, Start for Life, UNICEF Baby Friendly, Lullaby Trust, Tommy's, NCT, NICE). Hub URLs where deep links aren't safe.

### SEO
Each new route gets a unique title and description via the existing `MonthPage` SeoHead; canonical `https://thestartofyou.com/first-year/<slug>`; indexable.

### Content rules
UK English, calm hedged language (may / might / often), no em/en dashes in new copy, no milestone pressure, no fear/diagnosis language.

### Preservation
No changes to TTC, Pregnancy, IVF, Toddler, Family, calculators, journey, auth, DB/RLS, existing First Year articles or phase pages, robots, redirects, SEO infra, or Newborn–3m content (except shared month order and nav wiring).

### Verification
- `bunx tsgo --noEmit` passes.
- Load `/first-year/{4,5,6,7,8}-months`: hero + story band render, ≥3 distinct images each, feeding/sleep panels, questions, resolving Read links, correct Ask CTAs, rendered references.
- Prev/next chains from Newborn through 8 months (8m has no next until 11.8c).
- Quick-nav pills for 4–8m point at the new routes; 9–12m unchanged.
- Sitemap gains exactly 5 new entries.

### Deliverable
Report files inspected/edited, assets created, routes and pages created, per-month results, quick nav, prev/next, SEO, sitemap, article links, Ask CTAs, references, visual result, content safety, preservation checks, typecheck result, and recommended next step (Phase 11.8c: 9–12 months).