# Article Grounding — Editorial Status Resolution (Phase 30F)

Governance record. Metadata only. No article body, section, prose, takeaway, summary, image or media is reproduced here. No article is approved, no article is a grounding candidate, and nothing in this document connects article content to the AI.

Scope: the 52 registry records that carried `editorialStatus: "unknown"` at the close of Phase 30E.

## 1. Evidence rules used

Only explicit repository status evidence was accepted:

- `explicit-dataset-status-field` — the article's own dataset carries a typed editorial/publication status field.
- `explicit-inventory-status-field` — `src/data/articleInventory.ts` carries an explicit `currentStatus` value for an entry that describes exactly this record (matching slug **and** `sourceFile`/`system`).
- `no-authoritative-status-evidence` — no such field exists anywhere; the record stays `unknown`.

Explicitly rejected as evidence: route existence, file existence, title, description, body completeness, `lastUpdated`, medical-review metadata, source-list presence, search visibility, rendering behaviour, and mere presence in the inventory without an applicable explicit status field.

## 2. articleInventory.ts evidence reconciliation

An earlier draft of this work scanned the inventory for a `status:` field. The inventory actually uses `currentStatus:`, which produced an inconsistent account. Corrected and verified:

- Of the 52 originally-unknown records, **1 slug appears in `src/data/articleInventory.ts`: `two-week-wait`**, with two entries.
- Entry 1 — `id: "legacy:two-week-wait"`, `sourceFile: "src/data/articleData.ts"`, `system: "legacy-article"`, `currentStatus: "live"`, `contentState: "final"`. This entry describes exactly the registry record in question (the legacy article in `articleData.ts`), and `currentStatus` is an explicit editorial-status field. It resolves the record to **live**.
- Entry 2 — `id: "topic:trying-to-conceive:two-week-wait"`, `sourceFile: "src/data/ttcTopicData.ts"`, `system: "topic-page"`, `currentStatus: "topic-page"`. This describes a different surface (a hub topic page, not the article record) and is **not** used as evidence.
- The other **51** originally-unknown slugs do not appear in the inventory at all.

The dataset each resolved slug belongs to is recorded per row in section 4.

## 3. Totals (verified)

| Outcome | Count |
| --- | --- |
| Resolved to live | 7 |
| Resolved to draft | 0 |
| Resolved to archived | 0 |
| Resolved to deprecated | 0 |
| Still unknown | 45 |
| Registry records changed | 7 |

Registry editorial-status split after Phase 30F: **117 live, 44 draft, 45 unknown**, of 206 records. Candidate records: 0. Approved records: 0.

Only the `editorialStatus` field changed on those 7 records. No owner, content version, reviewer, reviewed date, sensitivity, `approvedBy` or `approvedAt` was populated anywhere. All 7 remain `blocked_missing_metadata`.

## 4. Resolved records (7)

| Slug | Title | Journey | Topics | Previous | Resolved | Evidence category | Evidence note | Registry changed | Approval status | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| two-week-wait | The two-week wait: what happens after ovulation and how to cope | trying-to-conceive | — | unknown | live | explicit-inventory-status-field | Inventory legacy entry for `src/data/articleData.ts` records `currentStatus: "live"`, `contentState: "final"`. | yes | blocked_missing_metadata | Governance metadata still missing; remains blocked. Sensitivity review in a later tier. |
| second-time-parenting | Second-time parenting: what can feel different | family | growing-families | unknown | live | explicit-dataset-status-field | `familyArticleData.ts` typed `status: "draft" \| "ready"` reads `ready`, the repository's explicit publication-ready state used by the existing publication/sitemap logic. | yes | blocked_missing_metadata | Remains blocked pending governance metadata and sensitivity review. |
| staying-connected-as-parents | Staying connected as parents | family | relationships | unknown | live | explicit-dataset-status-field | Same typed `status: "ready"` field in `familyArticleData.ts`. | yes | blocked_missing_metadata | Remains blocked pending governance metadata and sensitivity review. |
| calmer-evenings-after-busy-days | Calmer evenings after busy days | family | family-basics | unknown | live | explicit-dataset-status-field | Same typed `status: "ready"` field in `familyArticleData.ts`. | yes | blocked_missing_metadata | Remains blocked pending governance metadata and sensitivity review. |
| family-sick-days-at-home | Getting through family sick days at home | family | health-safety | unknown | live | explicit-dataset-status-field | Same typed `status: "ready"` field in `familyArticleData.ts`. | yes | blocked_missing_metadata | Remains blocked; health-safety topic implies a stricter later sensitivity review. |
| planning-family-days-out | Planning family days out without overdoing it | family | travel-days-out | unknown | live | explicit-dataset-status-field | Same typed `status: "ready"` field in `familyArticleData.ts`. | yes | blocked_missing_metadata | Remains blocked pending governance metadata and sensitivity review. |
| simple-family-play-ideas | Simple family play ideas for everyday connection | family | play-connection | unknown | live | explicit-dataset-status-field | Same typed `status: "ready"` field in `familyArticleData.ts`. | yes | blocked_missing_metadata | Remains blocked pending governance metadata and sensitivity review. |

## 5. Still unknown (45)

All 45 records below are defined in `src/data/articleData.ts`. That dataset's `ArticleData` interface has no editorial-status, publication, draft, archived or deprecated field, and none of these slugs appears in `src/data/articleInventory.ts`. Evidence category for every row: `no-authoritative-status-evidence`. Evidence note for every row: "No explicit editorial, publication, draft, archived or deprecated status exists in any repository source for this slug." Registry changed: **no** for all. Approval status: `blocked_missing_metadata` for all. Next action for all: resolve editorial status from an authoritative editorial decision before any review tier may consider the record; the record stays blocked meanwhile.

| Slug | Title | Journey | Topics |
| --- | --- | --- | --- |
| how-to-know-when-you-are-ovulating | How to know when you are ovulating | trying-to-conceive | — |
| understanding-your-fertile-window | Understanding your fertile window | trying-to-conceive | — |
| using-ovulation-tests | How to use ovulation tests | trying-to-conceive | — |
| cervical-mucus-and-fertility | Cervical mucus and fertility | trying-to-conceive | — |
| late-ovulation-and-ttc | Late ovulation and trying to conceive | trying-to-conceive | — |
| when-ovulation-is-hard-to-predict | When ovulation is hard to predict | trying-to-conceive | — |
| timing-sex-when-trying-to-conceive | Timing sex when trying to conceive | trying-to-conceive | — |
| basal-body-temperature-tracking | Basal body temperature tracking | trying-to-conceive | — |
| what-to-do-before-trying-to-conceive | What to do before trying to conceive | trying-to-conceive | — |
| folic-acid-before-pregnancy | Folic acid before pregnancy | trying-to-conceive | — |
| preconception-vitamins | Vitamins before pregnancy | trying-to-conceive | — |
| preconception-gp-appointment | Preconception GP appointment | trying-to-conceive | — |
| stopping-contraception-when-ttc | Stopping contraception when trying to conceive | trying-to-conceive | — |
| medication-review-before-pregnancy | Medication review before pregnancy | trying-to-conceive | — |
| lifestyle-before-pregnancy | Lifestyle before pregnancy | trying-to-conceive | — |
| mental-wellbeing-before-pregnancy | Mental wellbeing before pregnancy | trying-to-conceive | — |
| partner-health-before-pregnancy | Partner health before pregnancy | trying-to-conceive | — |
| sperm-health-basics | Sperm health basics | trying-to-conceive | — |
| when-to-ask-for-fertility-help | When to ask for fertility help | trying-to-conceive | — |
| unexplained-fertility-concerns | When fertility feels unexplained | trying-to-conceive | — |
| age-and-trying-to-conceive | Age and trying to conceive | trying-to-conceive | — |
| male-fertility-when-trying-to-conceive | Male fertility when trying to conceive | trying-to-conceive | — |
| moving-from-ttc-to-ivf | Moving from TTC to IVF | trying-to-conceive | — |
| caffeine-in-pregnancy | Caffeine in pregnancy: how much is safe, and where it hides | pregnancy | diet-and-exercise |
| hydration-in-pregnancy | Hydration in pregnancy: why fluids matter and how much to aim for | pregnancy | diet-and-exercise |
| cravings-and-aversions-in-pregnancy | Cravings and aversions in pregnancy: why they happen and how to cope | pregnancy | diet-and-exercise |
| pelvic-floor-exercises-in-pregnancy | Pelvic floor exercises in pregnancy: a gentle, useful guide | pregnancy | diet-and-exercise |
| exercise-safety-by-trimester | Exercise safety by trimester: what to adapt and when | pregnancy | diet-and-exercise |
| safe-sleep-basics | Safe sleep basics: how to set up baby sleep at home | pregnancy | preparing-for-baby |
| car-seat-basics | Car seat basics: what to know before your baby's first journey | pregnancy | preparing-for-baby |
| baby-clothes-and-newborn-essentials | Baby clothes and newborn essentials: a calm UK list | pregnancy | preparing-for-baby |
| preparing-siblings-for-a-new-baby | Preparing siblings for a new baby: gentle ways to make room | pregnancy | preparing-for-baby |
| maternity-leave-planning | Maternity leave planning: a calm UK overview | pregnancy | preparing-for-baby |
| testing-too-early | Testing too early | trying-to-conceive | — |
| negative-test-but-no-period | Negative test but no period | trying-to-conceive | — |
| evaporation-line-or-faint-positive | Evaporation line or faint positive | trying-to-conceive | — |
| two-week-wait-symptoms | Two week wait symptoms | trying-to-conceive | — |
| spotting-during-the-two-week-wait | Spotting during the two week wait | trying-to-conceive | — |
| coping-with-the-two-week-wait | Coping with the two week wait | trying-to-conceive, support | — |
| tracking-without-overthinking | Cycle tracking without overthinking | trying-to-conceive | — |
| thyroid-and-fertility | Thyroid conditions and trying to conceive | trying-to-conceive | — |
| ttc-in-your-30s | Trying to conceive in your 30s | trying-to-conceive | — |
| ttc-after-35 | Trying to conceive after 35 | trying-to-conceive | — |
| emotional-pressure-of-age-when-ttc | The emotional side of age when trying to conceive | trying-to-conceive, support | — |
| partner-support-when-ttc | Supporting each other while trying to conceive | trying-to-conceive, support | — |

## 6. Standing gaps after Phase 30F

- 45 editorial statuses remain unresolved and blocked. They require an authoritative editorial decision, not an inference.
- Content owner, content version, grounding reviewer, reviewed date and sensitivity remain **Missing** for all 206 records.
- 31 records still have no source list. That gap is unchanged; no sources were added or rewritten.
- `listGroundingEligibleSlugs()` returns `[]`. Start of You article grounding remains blocked.
