## Phase 9.14.1 — TTC Topic Navigation and Support Library Alignment

IA + navigation only. No new articles, no new images, no route/SEO/sitemap/redirect changes, no calculator or Journey changes.

### Files to edit

- `src/pages/TTCHub.tsx` — support library section (lines ~930-1042): retitle, restructure clusters, drop outdated closing line.
- `src/data/ttcTopicData.ts` — subtopic `parent` fields, subtopic `startHere`, `groups`, `curationNote`, and eyebrow tidy.
- No component structural changes (`TTCTopicPage`, `TTCSubtopicPage`, image maps, hero component) unless a link is genuinely broken during verification.

### Part 1 — TTC hub "support library" (TTCHub.tsx lines 930-1042)

Rename section:
- Eyebrow: `Explore` (keep short) — swap current "Supporting guides"
- Title: `Explore TTC topics` (drop italic "support library" variant)
- Intro: `Choose the area that matches what you are trying to understand next.`
- Delete the trailing italic line: `More routes will be added as the guide grows.`

Restructure the `clusters` array into 4 groups instead of 2, linking to subtopic routes (all currently in `ttcTopics`):

```
Timing, testing and waiting  → ovulation, cycle-tracking, two-week-wait, pregnancy-tests
Health and preparation       → preconception-health, conditions
Fertility support            → fertility, age-and-fertility, male-fertility
Treatment pathways           → ivf-and-treatment  (still routed to /ivf)
```

Notes:
- `ovulation`, `preconception-health`, `fertility` are pillars (not in current `subs` filter). Extend the source array so the library can include pillars: switch `subsBySlug` to a map over `ttcTopics` (both pillars + subtopics). No visual card component change; the existing card renderer works for both.
- Update `clusterTags` to match the new grouping (`TIMING` / `TESTING` / `HEALTH` / `FERTILITY` / `TREATMENT`) or drop tags per group and use the group label alone. Prefer: keep a single tag per card derived from its cluster label to avoid stale strings.
- Preserve the existing card visual styling exactly.

### Part 2 — Fix breadcrumb / category mismatches (ttcTopicData.ts)

Root cause: several subtopics carry `parent: "fertility"` (or `parent: "ovulation"`) so breadcrumbs render `The TTC Guide › Fertility › Two-week wait` and the eyebrow shows `TTC · Fertility`.

Fix by removing `parent` on these subtopics so breadcrumbs render `The TTC Guide › [Subtopic]`:
- `cycle-tracking` — remove `parent: "ovulation"`
- `two-week-wait` — remove `parent: "fertility"`
- `pregnancy-tests` — remove `parent: "fertility"`
- `conditions` — remove `parent: "fertility"`

Keep parent chain where it is factually correct and useful:
- `male-fertility`, `age-and-fertility`, `ivf-and-treatment` — keep `parent: "fertility"` (these genuinely sit under fertility support; breadcrumb reads `The TTC Guide › Fertility › Male fertility`, which is accurate).

Also normalise eyebrows to match the hub labels (drop `&`):
- `age-and-fertility`: `Age and fertility`
- `ivf-and-treatment`: `IVF and fertility treatment`

### Part 3 — Start here alignment (ttcTopicData.ts)

Use existing live slugs only. Do not introduce `/articles/signs-of-ovulation` (deprecated; redirect stays).

`cycle-tracking` — startHere becomes:
1. Calculate your fertile window → `LIVE.calculator`
2. How to know when you are ovulating → `LIVE.howToKnowOvulating`
3. Understanding your fertile window → `LIVE.understandingFertileWindow`

Also remove the "Signs of ovulation (quick reference)" link in its groups (uses `LIVE.signsOfOvulation`); replace with `Cervical mucus and fertility` (`LIVE.cervicalMucus`). Rename "Going a little deeper" → "Common questions".

`two-week-wait` — startHere becomes:
1. The two-week wait → `LIVE.twoWeekWaitArticle`
2. Pregnancy testing in TTC → `LIVE.pregnancyTests`
3. Implantation bleeding → `LIVE.implantationBleeding`

`pregnancy-tests` — startHere becomes:
1. When to take a pregnancy test → `LIVE.whenToTest`
2. Implantation bleeding → `LIVE.implantationBleeding`
3. Faint positive pregnancy test → `LIVE.faintPositive`

Also populate the empty "Timing your test" group with `When to take a pregnancy test` (`LIVE.whenToTest`).

`age-and-fertility` — startHere becomes:
1. Age and trying to conceive → `LIVE.ageAndTryingToConceive`
2. When to ask for fertility help → `LIVE.whenToAskFertilityHelp`
3. Preconception GP appointment → `LIVE.preconceptionGPAppointment`

IVF-related link stays in the group section, not startHere. Rename "Reading to start with" → "Common questions".

`male-fertility` — startHere becomes:
1. Male fertility when trying to conceive → `LIVE.maleFertilityWhenTTC`
2. Sperm health basics → `LIVE.spermHealthBasics`
3. Fertility tests for men → `LIVE.fertilityTestsMen`

Keep `Ask` and `Conditions that can affect TTC` inside groups lower on the page. Rename "Where to begin" → "Tests and next steps".

`conditions` — startHere becomes:
1. PCOS and trying to conceive → `LIVE.pcosTTC`
2. Irregular periods and trying to conceive → `LIVE.irregularPeriodsTTC`
3. When to ask for fertility help → `LIVE.whenToAskFertilityHelp`

Replace the existing `How long to try before getting help` startHere card (moved to a group).

### Part 4 — Curation-note cleanup

Remove outdated / apologetic notes on subtopics that now feel populated:
- `male-fertility.curationNote` ("More male-fertility lifestyle guidance is on the way…") — delete.
- `age-and-fertility.curationNote` ("Your situation matters more than the average…") — delete.
- `ivf-and-treatment.curationNote` — keep (short and intentional).

### Part 5 — Section language standardisation

Only rename where inconsistent. Do not touch ovulation, preconception-health, or fertility pillar group labels (strong completed work). Renames covered under Part 3.

### Part 6 — Preservation

Do not touch:
- Ovulation / preconception-health / fertility pillar `groups`, `startHere`, imagery.
- 9.14 fertility 3-group structure and new article slugs.
- `HREF_IMAGE_MAP`, `flagshipHeroMap`.
- Calculator files, TTC Journey files, App.tsx routes, sitemap, robots, SEO infra.

### Verification

- `bunx tsgo --noEmit` clean.
- Grep for the removed string `More routes will be added` — 0 hits.
- Manually walk each `/trying-to-conceive/*` route and confirm breadcrumb reads as expected in Part 2.
- Confirm no link points to `/articles/signs-of-ovulation`.
- Confirm every startHere `href` resolves against `LIVE`.

### Deliverable summary (to be reported after build)

Will report: files inspected, files edited, new hub section title/copy, 4-cluster grouping, subtopic parent/breadcrumb fixes, startHere updates per topic, curation notes removed, deprecated-link status, preservation of ovulation/preconception/fertility/calculators/Journey/SEO, `bunx tsgo --noEmit` result, and readiness for TTC-wide QA.
