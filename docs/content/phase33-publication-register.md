# Phase 33 — Publication Register

Phase 33.1 completed the audit. Phase 33.2 Batch 1 has now repository-published exactly two low-risk articles. Production deployments: 0. Human reviews completed: 0.

The source draft documents remain historical records. Exactly two Batch 1 articles are now repository-published; the other 17 remain **PUBLICATION STATUS: NOT PUBLISHED** and `HOLD_HUMAN_REVIEW`.

## Inventory confirmation

| Source phase | Drafts | Verified in |
| --- | --- | --- |
| 32A | 3 | `docs/content/phase32a-article-drafts.md` |
| 32B | 4 | `docs/content/phase32b-article-drafts.md` |
| 32C | 3 | `docs/content/phase32c-article-drafts.md` |
| 32D | 9 | `docs/content/phase32d-article-drafts.md` |
| **Total** | **19** | — |

Review classification, read from the draft documents rather than memory:

- `LOW_RISK_GENERAL` = 2 (`when-sleep-suddenly-changes`,
  `hair-dye-and-beauty-treatments-in-pregnancy`)
- `HEALTH_REVIEW_REQUIRED` or `SAFETY_REVIEW_REQUIRED` = 17
- Human reviews completed = 0

## Repository truth used for ownership decisions

- Legacy system: `src/data/articleData.ts` → route `/articles/:slug` →
  `src/pages/ArticlePage.tsx`, which dispatches to
  `ArticleFlagshipTemplate` (needs `quickAnswer` + `editorialSections` +
  `keyTakeaways`), `ArticleDeepTemplate` (needs `quickAnswer`) or
  `ArticleLegacyPage`. Optional `topic` must be one of `body`, `baby`,
  `feelings`, `health-and-safety`, `diet-and-exercise`,
  `preparing-for-baby` (`src/data/pregnancyTopicData.ts`).
- First Year system: `src/data/firstYearArticleData.ts` → route
  `/first-year/:topic/:slug` → `src/pages/firstyear/FirstYearArticle.tsx` →
  `FirstYearArticlePage` → shared `HubArticleView`. `topic` must be one of
  `feeding`, `sleep`, `development`, `care-and-safety`,
  `postpartum-recovery`, `emotional-wellbeing`, `body-and-hormones`,
  `checkups-and-warning-signs`. Records carry `status` and
  `medicallyReviewed`.

No new renderer, design, one-off page or parallel architecture is proposed.
All 19 fit an existing system: **template compatibility = 19/19**.

### Two structural notes carried into 33.2 (not blockers)

1. **Legacy field mapping.** `ArticleData` has required fields the drafts do
   not yet express (`howThisFeels`, `whatHappening`, `timing`,
   `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`,
   `disclaimer`). Publication is a mapping exercise into the existing
   interface, not a template change. Recorded per row as
   `FIELD_MAPPING_REQUIRED`.
2. **Topic reassignment.** Four 32D drafts name hub homes that do not exist
   as repository topics ("Common symptoms", "Wellbeing and relationships",
   "TTC → Testing and results", "First Year → Newborn basics"). Each is
   reassigned below to a real topic slug.

## Register — 19 rows

| # | Phase | Title | Slug | Domain | Dataset | Template | Topic | Expected route | Template compatible | Review class | Human review | Technical | Evidence | Editorial QA | Slug collision | SEO/indexability | Hero image | Body image | Nano Banana required | Image state | Current live owner | Future owner | Cannibalisation | 32F migration | Blockers | Final status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 32A | Itching in pregnancy | `itching-in-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `body` | `/articles/itching-in-pregnancy` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS, RCOG ×2) | Not run (held) | None | Standard `/articles` SEO + JSON-LD, indexable | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 2 | 32A | Caesarean birth | `caesarean-birth` | Pregnancy | Legacy | Flagship/Deep | `preparing-for-baby` | `/articles/caesarean-birth` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS ×2) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | Caesarean asides in labour/recovery guides | New article | LOW (boundary with 32C recovery) | CHANGES_LINK_OR_INTENT_OWNERSHIP | Human review | HOLD_HUMAN_REVIEW |
| 3 | 32A | Gestational diabetes | `gestational-diabetes` | Pregnancy | Legacy | Flagship/Deep | `health-and-safety` | `/articles/gestational-diabetes` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS, NICE NG3) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | `glucose-tolerance-test`, `tests-and-scans-in-pregnancy` | New article | MEDIUM, boundary defined | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 4 | 32B | Teething | `teething` | First Year | First Year | HubArticleView | `care-and-safety` | `/first-year/care-and-safety/teething` | YES | HEALTH | NOT DONE | READY | Complete (NHS ×2) | Not run (held) | None | Canonical + JSON-LD via `FirstYearArticle`, indexable when `status: "ready"` | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | Month-page teething context | New article | LOW | CHANGES_LINK_OR_INTENT_OWNERSHIP | Human review | HOLD_HUMAN_REVIEW |
| 5 | 32B | Colic and evening crying | `colic-and-evening-crying` | First Year | First Year | HubArticleView | `care-and-safety` | `/first-year/care-and-safety/colic-and-evening-crying` | YES | SAFETY | NOT DONE | READY | Complete (NHS ×2) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Safety review | HOLD_HUMAN_REVIEW |
| 6 | 32B | Introducing solid foods | `introducing-solid-foods` | First Year | First Year | HubArticleView | `feeding` | `/first-year/feeding/introducing-solid-foods` | YES | SAFETY | NOT DONE | READY | Complete (NHS ×2) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | `feeding-your-baby-complete-guide` weaning section | New article | MEDIUM, parent/child split defined | CHANGES_LINK_OR_INTENT_OWNERSHIP | Safety review | HOLD_HUMAN_REVIEW |
| 7 | 32B | When your baby's sleep suddenly changes | `when-sleep-suddenly-changes` | First Year | First Year | HubArticleView | `sleep` | `/first-year/sleep/when-sleep-suddenly-changes` | YES | LOW_RISK_GENERAL | Not required | READY | Complete (NHS ×3) | PASS | None | Same | YES | YES (2 actual) | YES (hero + 2 body, 3 actual) | COMPLETE — Nano Banana, QA PASS | `baby-sleep-first-year` regression coverage | New article | MEDIUM, sub-intent only (CAN-03) | CHANGES_LINK_OR_INTENT_OWNERSHIP | None | REPOSITORY_PUBLISHED |
| 8 | 32C | Stitches, tears and perineal healing | `stitches-tears-and-perineal-healing` | Postpartum (First Year) | First Year | HubArticleView | `postpartum-recovery` | `/first-year/postpartum-recovery/stitches-tears-and-perineal-healing` | YES | SAFETY | NOT DONE | READY | Complete (NHS ×3) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | `healing-after-birth`, `postpartum-recovery-timeline` | New article | MEDIUM (CAN-01) | CHANGES_LINK_OR_INTENT_OWNERSHIP | Safety review | HOLD_HUMAN_REVIEW |
| 9 | 32C | Separated tummy muscles after birth | `separated-tummy-muscles` | Postpartum (First Year) | First Year | HubArticleView | `body-and-hormones` | `/first-year/body-and-hormones/separated-tummy-muscles` | YES | HEALTH | NOT DONE | READY | Complete (NHS ×2) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | `your-body-after-birth` mention | New article | LOW (CAN-02) | CHANGES_LINK_OR_INTENT_OWNERSHIP | Human review | HOLD_HUMAN_REVIEW |
| 10 | 32C | Sex and intimacy after birth | `sex-and-intimacy-after-birth` | Postpartum (First Year) | First Year | HubArticleView | `body-and-hormones` | `/first-year/body-and-hormones/sex-and-intimacy-after-birth` | YES | HEALTH | NOT DONE | READY | Complete (NHS ×4) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW, distinct from row 18 | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 11 | 32D | Hair dye and beauty treatments in pregnancy | `hair-dye-and-beauty-treatments-in-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `health-and-safety` | `/articles/hair-dye-and-beauty-treatments-in-pregnancy` | YES | LOW_RISK_GENERAL | Not required | FIELD_MAPPING_REQUIRED | Complete (NHS Best Start in Life) | PASS | None | Standard `/articles` SEO, indexable | YES | YES (2 actual) | YES (hero + 2 body, 3 actual) | COMPLETE — Nano Banana, QA PASS | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | None | REPOSITORY_PUBLISHED |
| 12 | 32D | Normal newborn quirks and reflexes | `newborn-quirks-and-reflexes` | First Year | First Year | HubArticleView | `care-and-safety` (reassigned from "Newborn basics") | `/first-year/care-and-safety/newborn-quirks-and-reflexes` | YES | HEALTH | NOT DONE | READY | Complete (NHS ×3) | Not run (held) | None | Same as First Year rows | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 13 | 32D | Newborn skin: spots, marks and dry patches | `newborn-skin-spots-and-marks` | First Year | First Year | HubArticleView | `care-and-safety` (reassigned) | `/first-year/care-and-safety/newborn-skin-spots-and-marks` | YES | HEALTH | NOT DONE | READY | Complete (NHS ×4) | Not run (held) | None | Same | YES | YES (2 minimum, no rash depiction) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 14 | 32D | Common illnesses in the first year | `common-illnesses-in-the-first-year` | First Year | First Year | HubArticleView | `checkups-and-warning-signs` | `/first-year/checkups-and-warning-signs/common-illnesses-in-the-first-year` | YES | SAFETY | NOT DONE | READY | Complete (NHS ×4) | Not run (held) | None | Same | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | Warning-signs topic page | New article | LOW, escalation stays with warning-signs page | NO_LINK_MIGRATION_REQUIRED | Safety review | HOLD_HUMAN_REVIEW |
| 15 | 32D | Diarrhoea and tummy bugs in pregnancy | `diarrhoea-and-tummy-bugs-in-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `health-and-safety` | `/articles/diarrhoea-and-tummy-bugs-in-pregnancy` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS ×2) | Not run (held) | None | Standard `/articles` SEO | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 16 | 32D | Leg cramps in pregnancy | `leg-cramps-in-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `body` (reassigned from "Common symptoms") | `/articles/leg-cramps-in-pregnancy` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS) | Not run (held) | None | Standard `/articles` SEO | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 17 | 32D | hCG levels: what the pregnancy hormone tells you | `hcg-levels-explained` | TTC / early pregnancy | Legacy | Flagship/Deep | `health-and-safety` (reassigned; no TTC topic slug exists) | `/articles/hcg-levels-explained` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (2 NHS trust/lab sources + NHS ×2) | Not run (held) | None | Standard `/articles` SEO | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | Test and two-week-wait articles carry hCG explanation | New article | MEDIUM, testing intent stays with test articles | CHANGES_LINK_OR_INTENT_OWNERSHIP | Human review | HOLD_HUMAN_REVIEW |
| 18 | 32D | Sex during pregnancy | `sex-during-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `feelings` (reassigned from "Wellbeing and relationships") | `/articles/sex-during-pregnancy` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS Inform, NHS) | Not run (held) | None | Standard `/articles` SEO | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW, distinct from row 10 | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |
| 19 | 32D | Dizziness and feeling faint in pregnancy | `dizziness-and-feeling-faint-in-pregnancy` | Pregnancy | Legacy | Flagship/Deep | `body` (reassigned) | `/articles/dizziness-and-feeling-faint-in-pregnancy` | YES | HEALTH | NOT DONE | FIELD_MAPPING_REQUIRED | Complete (NHS ×2) | Not run (held) | None | Standard `/articles` SEO | YES | YES (2 minimum) | YES (hero + 2 body) | IMAGE PREPARATION REQUIRED | None | New article | LOW | NO_LINK_MIGRATION_REQUIRED | Human review | HOLD_HUMAN_REVIEW |

### Status equation

```text
REPOSITORY_PUBLISHED    2
HOLD_HUMAN_REVIEW      17
HOLD_EDITORIAL_QA       0
HOLD_EVIDENCE           0
HOLD_CANNIBALISATION    0
HOLD_IMAGE              0
HOLD_TECHNICAL          0
= 19
```

For all 17 held rows, human review is the **only** gate that cannot be
cleared by production work: evidence is complete, slugs are free, templates
exist, SEO behaviour is inherited, cannibalisation is resolved or bounded,
and image work is ordinary 33.2 preparation.

The two `REPOSITORY_PUBLISHED` rows completed Batch 1 production and now meet the corrected visual standard. They are not deployed. The other 17 remain unpublished and retain their human-review gate.

## Image production register

Template-derived facts, read from the components:

- Legacy hero (`ArticleHeroImage`): contained figure, `aspect-[4/3]` on
  mobile, `aspect-[16/9]` from `md`, `object-cover`. Focal subject must sit
  centrally and survive a 4:3 crop.
- Legacy fallback chain (`src/lib/articleHeroImage.ts`): explicit `hero` →
  slug map → topic fallback → journey image. A legacy article therefore
  always renders something, but a generic topic fallback is not an approved
  bespoke asset for a new article.
- First Year hero (`HubArticleView`): portrait-leaning,
  `aspect-[4/5]` mobile, `4/3` at `sm`, `5/6` at `md`, `4/5` at `lg`,
  `object-cover`. Portrait framing with headroom is required.
- First Year body images are placed by `afterSectionIndex` in `firstYearArticleImages.ts`. The Phase 33 standard is at least two meaningful body images per article.

| # | Slug | Hero required | Body required | Body count | Existing approved asset suitable | New Nano Banana asset required | Visual purpose | Aspect ratio | Mobile crop / focal | Alt-text intent | Generation status | Approval status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `itching-in-pregnancy` | YES | YES | 2 minimum | NO | YES (3 minimum) | Calm evening domestic moment, hands resting | 4:3 → 16:9 | Central subject, safe 4:3 crop | Describe the scene, never the symptom | NOT YET GENERATED | NOT YET REVIEWED |
| 2 | `caesarean-birth` | YES | YES | 2 minimum | NO | YES (3 minimum) | Quiet hospital-adjacent calm, no surgical imagery | 4:3 → 16:9 | Central | Parent and baby together, non-clinical | NOT YET GENERATED | NOT YET REVIEWED |
| 3 | `gestational-diabetes` | YES | YES | 2 minimum | NO | YES (3 minimum) | Everyday kitchen light, unforced | 4:3 → 16:9 | Central | Ordinary daily life in pregnancy | NOT YET GENERATED | NOT YET REVIEWED |
| 4 | `teething` | YES | YES | 2 minimum | NO | YES (3 minimum) | Baby held close; body image of a calm play moment | 4:5 / 5:6 portrait | Headroom, face upper third | Comfort, not mouth or gum detail | NOT YET GENERATED | NOT YET REVIEWED |
| 5 | `colic-and-evening-crying` | YES | YES | 2 minimum | NO | YES (3 minimum) | Evening low light, parent holding baby | 4:5 / 5:6 | Portrait, subject centred | Soothing, never distressed-face framing | NOT YET GENERATED | NOT YET REVIEWED |
| 6 | `introducing-solid-foods` | YES | YES | 2 minimum | NO | YES (3 minimum) | High chair, soft daylight, real food | 4:5 / 5:6 | Portrait | Baby exploring food, mess allowed | NOT YET GENERATED | NOT YET REVIEWED |
| 7 | `when-sleep-suddenly-changes` | YES | YES | 2 minimum | YES — 3 approved actual | COMPLETE (3 total) | Night-lit bedroom, cot, calm | 4:5 / 5:6 | Portrait | Safe-sleep compliant: firm flat cot, no loose bedding | GENERATED — Nano Banana | APPROVED / QA PASS |
| 8 | `stitches-tears-and-perineal-healing` | YES | YES | 2 minimum | NO | YES (3 minimum) | Rest and recovery at home, fully clothed | 4:5 / 5:6 | Portrait | Recovery scene, no body-part depiction | NOT YET GENERATED | NOT YET REVIEWED |
| 9 | `separated-tummy-muscles` | YES | YES | 2 minimum | NO | YES (3 minimum) | Gentle movement, posture, natural light | 4:5 / 5:6 | Portrait | Function, never a flat-tummy aesthetic | NOT YET GENERATED | NOT YET REVIEWED |
| 10 | `sex-and-intimacy-after-birth` | YES | YES | 2 minimum | NO | YES (3 minimum) | Couple close, clothed, domestic warmth | 4:5 / 5:6 | Portrait | Closeness and connection, non-explicit | NOT YET GENERATED | NOT YET REVIEWED |
| 11 | `hair-dye-and-beauty-treatments-in-pregnancy` | YES | YES | 2 minimum | YES — 3 approved actual | COMPLETE (3 total) | Bright unbranded salon or bathroom | 4:3 → 16:9 | Central | Everyday self-care in pregnancy | GENERATED — Nano Banana | APPROVED / QA PASS |
| 12 | `newborn-quirks-and-reflexes` | YES | YES | 2 minimum | NO | YES (3 minimum) | Newborn held close, calm | 4:5 / 5:6 | Portrait | Newborn at rest, non-clinical | NOT YET GENERATED | NOT YET REVIEWED |
| 13 | `newborn-skin-spots-and-marks` | YES | YES | 2 minimum | NO | YES (3 minimum) | Soft skin-to-skin warmth, no visible condition | 4:5 / 5:6 | Portrait | Gentle newborn care, never a rash close-up | NOT YET GENERATED | NOT YET REVIEWED |
| 14 | `common-illnesses-in-the-first-year` | YES | YES | 2 minimum | NO | YES (3 minimum) | Parent comforting a baby at home | 4:5 / 5:6 | Portrait | Care at home, never distress or equipment | NOT YET GENERATED | NOT YET REVIEWED |
| 15 | `diarrhoea-and-tummy-bugs-in-pregnancy` | YES | YES | 2 minimum | NO | YES (3 minimum) | Quiet rest, water glass, daylight | 4:3 → 16:9 | Central | Resting at home | NOT YET GENERATED | NOT YET REVIEWED |
| 16 | `leg-cramps-in-pregnancy` | YES | YES | 2 minimum | NO | YES (3 minimum) | Restful bedroom, night calm | 4:3 → 16:9 | Central | Rest and sleep in late pregnancy | NOT YET GENERATED | NOT YET REVIEWED |
| 17 | `hcg-levels-explained` | YES | YES | 2 minimum | NO | YES (3 minimum) | Still, waiting moment; no test close-up | 4:3 → 16:9 | Central | Quiet waiting, no result depiction | NOT YET GENERATED | NOT YET REVIEWED |
| 18 | `sex-during-pregnancy` | YES | YES | 2 minimum | NO | YES (3 minimum) | Couple at home, clothed, warm | 4:3 → 16:9 | Central | Closeness in pregnancy, non-explicit | NOT YET GENERATED | NOT YET REVIEWED |
| 19 | `dizziness-and-feeling-faint-in-pregnancy` | YES | YES | 2 minimum | NO | YES (3 minimum) | Seated pause by a window, natural light | 4:3 → 16:9 | Central | Sitting down for a moment | NOT YET GENERATED | NOT YET REVIEWED |

Programme minimum: hero images **19** + body images **38 minimum** = **57 minimum approved article assets**. This is a planning floor, not a maximum. Batch 1 actual: **2 heroes + 4 body images = 6 approved assets**. Remaining 17 actual generated: **0**.
Unresolved template blockers **0**. Unresolved image blockers **0** —
every gap is `IMAGE PREPARATION REQUIRED`, and no `HOLD_IMAGE` applies.

## Nano Banana visual direction (for 33.2 production)

One coherent system across the minimum 57 assets: premium, warm, calm, editorial,
natural, contemporary, UK-appropriate, emotionally intelligent, supportive
rather than clinical. Soft natural light, real domestic interiors, muted
warm neutrals matching the parchment palette, unforced posture, generous
negative space for the portrait First Year crops.

Never: graphic or medical imagery, symptom or rash depiction, fear-led
framing, exaggerated stock-photo posing, embedded text or logos, generic
stock aesthetics, inconsistent art direction. Sensitive health and safety
articles get calm lifestyle imagery only. Sleep imagery must comply with
safe-sleep guidance in what it shows.

## Phase 32F migration reconfirmation

Recounted from `docs/content/phase32f-intent-ownership-map.md` against the
same 19 drafts:

- `CHANGES_LINK_OR_INTENT_OWNERSHIP` = 7 (rows 2, 4, 6, 7, 8, 9, 17)
- `NO_LINK_MIGRATION_REQUIRED` = 12
- Total = 19

No discrepancy. No migration is implemented in 33.1.

## Baseline verification

| Check | Recorded post-32F | Measured in 33.1 | Result |
| --- | --- | --- | --- |
| Test files | 117 | 117 | MATCH |
| Tests | 1,297 passing | 1,297 passing, 0 timeouts | MATCH |
| Typecheck ×2 | PASS | PASS, PASS | MATCH |
| Lint | 1 error, 10 warnings | 1 error, 10 warnings (`prefer-const`, `previewAuthStorage.ts:38`) | MATCH |
| Build | PASS | PASS | MATCH |
| Public URLs | 331 | 331 (`public/sitemap.xml`) | MATCH |

No drift. Milestone canonical residual remains
`DEFERRED_SEO_ARCHITECTURE`, unchanged.

## Controlled publication batches

1. **Batch 1 — repository-published, not deployed.** `when-sleep-suddenly-changes`, `hair-dye-and-beauty-treatments-in-pregnancy`.
2. **Batch 2 — First Year health, after review.** Teething, newborn quirks,
   newborn skin, separated tummy muscles, sex and intimacy after birth.
3. **Batch 3 — safety-critical, after review.** Colic, introducing solid
   foods, common illnesses, perineal healing.
4. **Batch 4 — pregnancy and TTC, after review.** Itching, caesarean birth,
   gestational diabetes, diarrhoea, leg cramps, hCG, sex during pregnancy,
   dizziness.
