## Phase 9.16 — TTC Pregnancy Tests and Two Week Wait Expansion

### Duplicate check (verified)
Grepped `src/data/articleData.ts` for all 6 target slugs and the near-duplicate list. Result:
- None of the 6 target slugs exist. Safe to create.
- Existing related-slug matches available: `implantation-bleeding` (L432), `two-week-wait` (L3018), `when-to-take-a-pregnancy-test` (L14920), `faint-positive-pregnancy-test` (L14967). These are the live slugs to use for related links.
- Near-duplicates `testing-too-early`, `evaporation-line`, `two-week-wait-symptoms`, `spotting-after-ovulation`, `two-week-wait-anxiety` etc. do not exist.

### Articles to create (6, appended to `src/data/articleData.ts`)
All use the existing TTC flagship schema (matching Phase 9.12–9.14 objects): `slug`, `title`, `topic` (ttc), `journey: ["trying-to-conceive"]`, `metaDescription`, `standfirst`, `quickAnswer`, `hero {src, alt}`, `keyTakeaways` (5–6), `editorialSections` (5–7 with lead/paragraphs/optional callout), `normalCheck` two-column, `faq` (3), `sources` (3–5 structured), `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `related` slugs.

1. `testing-too-early` — Testing too early
2. `negative-test-but-no-period` — Negative test but no period
3. `evaporation-line-or-faint-positive` — Evaporation line or faint positive
4. `two-week-wait-symptoms` — Two week wait symptoms
5. `spotting-during-the-two-week-wait` — Spotting during the two week wait
6. `coping-with-the-two-week-wait` — Coping with the two week wait

Editorial guardrails: UK English, no em/en dashes, no certainty language, careful (may/might/often), signpost to GP/pharmacist/clinic. No pregnancy handover from these article pages.

Related links pool (verified live): `when-to-take-a-pregnancy-test`, `faint-positive-pregnancy-test`, `implantation-bleeding`, `two-week-wait`, plus each other. Will confirm any additional slug (e.g. `understanding-your-fertile-window`, `timing-sex-when-trying-to-conceive`, `when-to-ask-for-fertility-help`) with a re-grep before including.

Sources: NHS, NICE, Tommy's, HFEA where relevant.

### Assets to create (6 new JPGs in `src/assets/`)
Generated via imagegen (fast tier), soft-light TTC visual system, sage/cream/neutral, no brand names, no visible test lines, no distress imagery:
- `ttc-testing-too-early.jpg`
- `ttc-negative-test-no-period.jpg`
- `ttc-evaporation-line.jpg`
- `ttc-two-week-wait-symptoms.jpg`
- `ttc-spotting-two-week-wait.jpg`
- `ttc-coping-two-week-wait.jpg`

### Image wiring
- Each new article's `hero.src` points to its own dedicated asset (imported into `articleData.ts` at the top with existing TTC assets).
- Add corresponding entries in whichever TTC topic-page `HREF_IMAGE_MAP` covers pregnancy-tests / two-week-wait subtopic cards (likely `TTCSubtopicPage` or its shared image map), preserving all Phase 9.12–9.15 mappings.

### Topic config updates (`src/data/ttcTopicData.ts`)
Edit only the two configs at L592 (`pregnancy-tests`) and L655 (`two-week-wait`). Insert the 3 new links each into the most relevant existing groups (or a new tightly-scoped group if none fits) without restructuring other TTC topics.

- pregnancy-tests: add Testing too early, Negative test but no period, Evaporation line or faint positive.
- two-week-wait: add Two week wait symptoms, Spotting during the two week wait, Coping with the two week wait.

### Files touched
- `src/data/articleData.ts` — append 6 article objects + 6 asset imports.
- `src/data/ttcTopicData.ts` — 2 config blocks updated.
- TTC topic image-map file (identified after re-reading `TTCSubtopicPage`) — add 6 entries.
- `src/assets/*.jpg` — 6 new files.

### Explicitly not touched
Pregnancy, IVF, First Year, Toddler, Family, routes, sitemap generator, robots, redirects, SEO infrastructure, calculators, TTC Journey, other TTC topic configs, existing image mappings.

### Verification
- `bunx tsgo --noEmit` clean.
- Grep confirms each new slug appears exactly once as a declaration.
- Grep confirms zero `—` / `–` in new article ranges.
- Manual QA of `/trying-to-conceive/pregnancy-tests` and `/trying-to-conceive/two-week-wait`: 3 new cards each, distinct thumbnails, no adjacent collisions, all related links resolve.
- Deliverable summary returned in the requested format.
