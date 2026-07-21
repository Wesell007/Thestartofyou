## Phase 11.8c — First Year Month Guides, 9 to 12 Months

Publish the final four deep month guide pages using the existing shared system from Phases 11.8a/a.1/a.2/b. No system rebuild.

### Routes to add
- `/first-year/9-months`
- `/first-year/10-months`
- `/first-year/11-months`
- `/first-year/12-months`

Registered in `src/App.tsx` above the dynamic First Year article route, alongside the existing Newborn–8m routes.

### Files to edit
- `src/data/firstYearMonthData.ts` — append 4 new `MonthGuide` entries; extend `firstYearMonthImages` with 4 new image sets; extend `MonthSlug` union and `MONTH_ORDER` so prev/next chains Newborn → 12 months (12m has no next).
- `src/App.tsx` — register the 4 new `MonthPage` routes.
- `src/components/firstyear/new/FYPhaseNav.tsx` — repoint the 9/10/11/12 month pills from phase hubs to the new deep month routes.
- `scripts/generate-sitemap.ts` — add the 4 new routes to `firstYearStatic`; regenerate `public/sitemap.xml` via the standard build hook.
- `src/components/firstyear/month/FirstYearMonthPage.tsx` — untouched unless a tiny reusable tweak is required.
- `src/pages/firstyear/MonthPage.tsx` — untouched (already generic).

### Assets to create (12 JPGs)
Under `src/assets/first-year/months/`, following the 11.8a.2/11.8b CDN pattern (`imagegen` → `lovable-assets create` → `.asset.json` pointers):

- 9m: hero, baby, parent
- 10m: hero, baby, parent
- 11m: hero, baby, parent
- 12m: hero, baby, parent

Visual style: soft natural light, warm cream / sage / muted rose / gentle blue, age-appropriate baby moment (hero), a development detail (baby), a calm parent moment (parent). No text, brands, clinical scenes, unsafe sleep/feeding, distressed baby, milestone pressure.

### Content per month
Each guide uses the approved article-led shape: hero, short version, baby editorial (5–7 subsections), feeding section, sleep section, you section, 4 feels-hard, 4 what-helps, 3–4 support signposts, 4–6 common questions, related guidance, 3–5 UK references, prev/next rail.

Focus areas per brief:
- **9m** — crawling / own-way movement, standing attempts, stronger communication, separation anxiety, sleep changes, food exploration, parent fatigue, comparison pressure.
- **10m** — pulling up, early cruising, finger foods, strong preferences, routines under pressure, return to work / childcare, home safety, parent mental load.
- **11m** — independence, communication, frustration, walking readiness, sleep and nap transitions, first-birthday planning, parent emotion, not comparing timelines.
- **12m** — first birthday, walking variation, feeding transition, sleep and routines, communication, safety and independence, parent identity shift, looking back at the first year.

### Links and CTAs
- **Related guidance:** only verified live slugs from `firstYearArticleData.ts`. No invented slugs, no `href="#"`.
- **Read links** on questions: only when a real First Year article exists.
- **Ask CTAs:** `/ask?stage=first-year&month=<slug>&topic=<topic>`.
- **References:** 3–5 trusted UK sources per page (NHS, Start for Life, UNICEF Baby Friendly, Lullaby Trust, Tommy's, NCT, NICE). Hub URLs where deep links aren't safe.

### SEO
Each route gets a unique title and description via the existing `MonthPage` SeoHead; canonical `https://thestartofyou.com/first-year/<slug>`; indexable.

### Content rules
UK English, calm hedged language (may / might / often), no em/en dashes in new copy, no milestone pressure, no fear/diagnosis language, no personalised medical advice.

### Preservation
No changes to TTC, Pregnancy, IVF, Toddler, Family, calculators, journey, auth, DB/RLS, existing First Year articles or phase pages, robots, redirects, SEO infra, or Newborn–8m content (except the shared month order and nav pill wiring).

### Verification
- `bunx tsgo --noEmit` passes.
- Load `/first-year/{9,10,11,12}-months`: hero + story band render, ≥3 distinct images each, feeding/sleep panels, questions, resolving Read links, correct Ask CTAs, rendered references.
- Prev/next chains from Newborn through 12 months; 12m has no next.
- Quick-nav pills for 9–12m point at the new routes; all pills now deep-link.
- Sitemap gains exactly 4 new entries.

### Deliverable
Report files inspected/edited, assets created, routes and pages created, per-month results, quick nav, prev/next, SEO, sitemap, article links, Ask CTAs, references, visual result, content safety, preservation checks, typecheck result, and recommended next step (First Year sign-off QA pass).
