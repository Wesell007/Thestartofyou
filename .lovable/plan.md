## Phase 11.8a — First Year Month Guide System (Newborn to 3 Months)

Build the shared month-guide system and publish only the first four deep month guides. No live routes or sitemap entries for 4–12m.

### Route pattern

Confirmed from `src/App.tsx`: existing First Year routes are lowercase hyphenated (`/first-year/0-3-months`). New routes use the same style, registered above the dynamic `/first-year/:topic/:slug` fallback (line 341):

- `/first-year/newborn`
- `/first-year/1-month`
- `/first-year/2-months`
- `/first-year/3-months`

### Files created

- **`src/data/firstYearMonthData.ts`** — types + data for the four published months.
  - Exports `MONTH_ORDER: MonthSlug[]` (only the four published slugs, so prev/next chain is closed without dead links).
  - Exports `firstYearMonths: Record<MonthSlug, MonthGuide>`.
  - Exports `getMonthGuide(slug)` and `getAdjacentMonths(slug)` helpers.
  - `MonthGuide` shape: `slug`, `label` (e.g. "Newborn", "1 month"), `title`, `standfirst`, `phase` (label + href to matching phase page), `atAGlance` (baby/feeding/sleep/parent/support strings), `baby[]`, `you[]`, `feelsHard[]`, `whatHelps[]`, `support[]` (each: label, when, body), `questions[]` (question, answer, optional `readMore: { label, href }` validated against `firstYearArticleData.ts`, `askTopic` slug), `related[]` (verified `/first-year/<topic>/<slug>` links), `sources[]` (label, publisher, url).
  - All four months only. 4–12m intentionally omitted (not even as commented stubs to avoid leakage).

- **`src/components/firstyear/month/FirstYearMonthPage.tsx`** — shared premium page component consuming a `MonthGuide`. Reuses the visual language established by `FirstYearPhasePage.tsx` and Pregnancy week pages.
  - **Hero**: age overline chip, serif title, standfirst, phase context row with link to the parent phase page and back to `/first-year`. Prev/next month rail (disabled state when adjacent month not yet published).
  - **At a glance**: single premium summary card, five labelled rows (baby / feeding / sleep / you / when to ask).
  - **Your baby this month**: PairedSection-style card with `firstyear-soft` gradient, left accent stripe, numbered rows.
  - **You this month**: matching PairedSection-style card with `recovery-soft` gradient.
  - **What often feels hard / What can help**: two-column premium companion cards, hairline dividers between items.
  - **When to ask for support**: bordered parchment panel, accent dot markers, pill-styled "when" chips.
  - **Common questions**: card list with hover-lift, each card showing question (serif), calm answer, optional "Read" pill to a verified article, and "Ask about this" pill to `/ask?stage=first-year&month=<slug>&topic=<askTopic>`. If no article fits, only Ask renders.
  - **Related guidance**: up to 3 verified First Year article links (validated at data-build time against slugs in `firstYearArticleData.ts`).
  - **References**: subtle `parchment-dark` panel matching the phase page pattern, numbered tabular markers, publisher + label + link.

- **`src/pages/firstyear/MonthPage.tsx`** — thin route component. Reads the current path (or accepts an explicit `slug` prop), looks up the config via `getMonthGuide`, mounts `SeoHead` with per-month title/description/canonical, then renders `FirstYearMonthPage`. Redirects to `/first-year` if slug missing.

### Files edited

- **`src/App.tsx`** — import `MonthPage` and register four `<Route>` entries immediately after the existing four phase routes (lines 298–301) and before the `:topic/:slug` fallback (line 341). Each route passes its slug via a wrapper or reads it from the pathname.
- **`src/components/firstyear/new/FYPhaseNav.tsx`** — update `ageItems` entries for Newborn, 1 month, 2 months, 3 months to point at the four new routes. Leave 4–12 months pointing at existing phase pages (as they do today) so no dead links appear.
- **`scripts/generate-sitemap.ts`** — append only the four new paths to the `firstYearStatic` array. Regenerate `public/sitemap.xml` via the existing predev/prebuild hook.

### Content plan

Depth per page: rich hero standfirst, 5–7 at-a-glance points, 4–6 baby points, 4–6 parent points, 4 feelsHard, 4 whatHelps, 3–4 support signposts, 4–6 common questions, 3–5 sources.

- **Newborn** — first days and weeks, sleepy newborns, feeding starting, nappies, crying, safe sleep, healing after birth, asking for help early. Phase: 0–3 months.
- **1 month** — feeding rhythms, unsettled evenings, weight checks, still-irregular sleep, parent exhaustion, recovery and confidence. Phase: 0–3 months.
- **2 months** — more alert periods, early smiles, feeding changes, sleep fragments, postnatal check, emotional adjustment. Phase: 0–3 months.
- **3 months** — stronger interaction, head control, first routines, sleep changes, confidence building, feeding questions. Phase: 0–3 months (upcoming 3–6m signposted in "You this month" where useful).

All copy in UK English, gentle wording (may, might, can, often), no milestone pressure, no fear language, no personalised medical advice. No em/en dashes.

### Common Questions — link verification

Verified live First Year article routes usable in `readMore` and `related` (from `firstYearArticleData.ts`):

- `/first-year/feeding/newborn-feeding-rhythms`
- `/first-year/feeding/bottle-and-breastfeeding-questions`
- `/first-year/sleep/newborn-sleep-expectations`
- `/first-year/sleep/helping-your-baby-settle`
- `/first-year/development/baby-development-in-the-first-year`
- `/first-year/development/when-milestones-feel-uneven`
- `/first-year/care-and-safety/baby-care-basics`
- `/first-year/care-and-safety/safe-sleep-and-home-safety`
- `/first-year/postpartum-recovery/healing-after-birth`
- `/first-year/postpartum-recovery/what-recovery-can-feel-like`
- `/first-year/emotional-wellbeing/feeling-like-yourself-again`
- `/first-year/emotional-wellbeing/when-parenthood-feels-heavy`
- `/first-year/body-and-hormones/body-changes-after-birth`
- `/first-year/body-and-hormones/hormones-sweat-and-hair-loss`
- `/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments`
- `/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth`

Only these slugs will be referenced. Ask CTAs use `/ask?stage=first-year&month=<slug>&topic=<topic>`.

### References

3–5 trusted UK sources per month, drawn from: NHS Baby & Toddler, NHS Postnatal, NHS Start for Life, UNICEF Baby Friendly, Lullaby Trust, Tommy's, NCT, NICE. Hub URLs preferred over guessed deep links.

### SEO

Per-route `SeoHead` with unique title, meta description, canonical `https://thestartofyou.com/first-year/<slug>`. Indexable. No noindex. No JSON-LD changes.

### Preservation

No changes to TTC, Pregnancy, IVF, Toddler, Family, calculators, journey, auth, DB, RLS, existing article content, existing phase page content, unrelated routes, robots, redirects, SEO infrastructure. No `href="#"`. Only Newborn to 3m pills updated in FYPhaseNav.

### Verification

- `bunx tsgo --noEmit` passes.
- Four routes render; prev/next chains Newborn → 1m → 2m → 3m (Newborn has no prev, 3m has no next in this phase).
- Back-to-hub and back-to-phase links work.
- Quick-nav pills for Newborn to 3m resolve to new routes; 4–12m pills unchanged.
- All referenced article links exist in `firstYearArticleData.ts`.
- Ask CTAs point at `/ask?stage=first-year&month=…&topic=…`.
- Sitemap gains exactly four entries.
- First Year hub and phase pages unchanged.
