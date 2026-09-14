# Phase 33.3 — Remaining 17 Article Frontend Preview Report

Status: **CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**
Deployment: **NOT PERFORMED. Global Phase 33 deployment block remains ACTIVE.**

## 1. Inventory

```text
Phase 33 articles                    19
Batch 1 records (33.2)                2
Phase 33.3 records added             17  (Legacy 8, First Year 9)
Runtime records now present          19  (Legacy 9, First Year 10)
New routes                           17
Sitemap unique URLs                 350  (duplicates 0)
Phase 33.3 image assets              51  (17 heroes + 34 body)
Phase 33 approved assets total       57
Human reviews completed               0
Articles deployment eligible          0
```

## 2. Records, systems and routes

### Legacy (Pregnancy) — 8 added

| Slug | Route | Topic | Category discovery entries |
| --- | --- | --- | --- |
| `itching-in-pregnancy` | `/articles/itching-in-pregnancy` | body | 1 |
| `caesarean-birth` | `/articles/caesarean-birth` | preparing-for-baby | 1 (duplicate removed) |
| `gestational-diabetes` | `/articles/gestational-diabetes` | health-and-safety | 1 |
| `diarrhoea-and-tummy-bugs-in-pregnancy` | `/articles/diarrhoea-and-tummy-bugs-in-pregnancy` | safety-and-support | 1 |
| `leg-cramps-in-pregnancy` | `/articles/leg-cramps-in-pregnancy` | common-symptoms | 1 |
| `hcg-levels-explained` | `/articles/hcg-levels-explained` | safety-and-support | 1 |
| `sex-during-pregnancy` | `/articles/sex-during-pregnancy` | relationships-and-feelings | 1 |
| `dizziness-and-feeling-faint-in-pregnancy` | `/articles/dizziness-and-feeling-faint-in-pregnancy` | common-symptoms | 1 |

### First Year — 9 added

| Slug | Route | Topic | Category discovery |
| --- | --- | --- | --- |
| `teething` | `/first-year/care-and-safety/teething` | care-and-safety | topic listing ×1 |
| `colic-and-evening-crying` | `/first-year/care-and-safety/colic-and-evening-crying` | care-and-safety | topic listing ×1 |
| `introducing-solid-foods` | `/first-year/feeding/introducing-solid-foods` | feeding | topic listing ×1 |
| `stitches-tears-and-perineal-healing` | `/first-year/postpartum-recovery/stitches-tears-and-perineal-healing` | postpartum-recovery | topic listing ×1 |
| `separated-tummy-muscles` | `/first-year/body-and-hormones/separated-tummy-muscles` | body-and-hormones | topic listing ×1 |
| `sex-and-intimacy-after-birth` | `/first-year/body-and-hormones/sex-and-intimacy-after-birth` | body-and-hormones | topic listing ×1 |
| `newborn-quirks-and-reflexes` | `/first-year/care-and-safety/newborn-quirks-and-reflexes` | care-and-safety | topic listing ×1 |
| `newborn-skin-spots-and-marks` | `/first-year/care-and-safety/newborn-skin-spots-and-marks` | care-and-safety | topic listing ×1 |
| `common-illnesses-in-the-first-year` | `/first-year/care-and-safety/common-illnesses-in-the-first-year` | care-and-safety | topic listing ×1 |

No new route type, renderer, dataset, hub or lifecycle was created. Legacy
records render through `ArticleFlagshipTemplate`; First Year records render
through the existing First Year article page.

## 3. Phase 32F migration intents — exactly 5

Intents are ownership decisions, not hyperlink counts. Each was implemented
through an existing link mechanism on an existing record.

| # | Intent | Approved source surface(s) | Destination | Mechanism |
| --- | --- | --- | --- | --- |
| 1 | Caesarean birth | `signs-of-labour` (Legacy) | `/articles/caesarean-birth` | existing `crossLinks` |
| 2 | Teething | `4-months` and `5-months` month guides | `/first-year/care-and-safety/teething` | existing month `related` |
| 3 | Introducing solid foods | `feeding-your-baby-complete-guide` (Legacy) | `/first-year/feeding/introducing-solid-foods` | existing `crossLinks` |
| 4 | Perineal healing | `healing-after-birth` (First Year) | `/first-year/postpartum-recovery/stitches-tears-and-perineal-healing` | existing `crossLinks` |
| 5 | Separated tummy muscles | `your-body-after-birth` (Legacy) | `/first-year/body-and-hormones/separated-tummy-muscles` | existing `crossLinks` |

```text
Migration intents required                 5
Migration intents satisfied as approved    5
Implementation exceptions                  0
Unapproved migration intents               0
Actual contextual link occurrences         7
```

TEETHING MIGRATION = **SATISFIED_AS_APPROVED**, on the originally approved
`4-months` and `5-months` month-guide surfaces, using the existing `related`
mechanism already rendered by the month page. No `readMore` destination was
replaced and no new field, component, renderer or template was added.

The existing `when-sleep-suddenly-changes` to teething link remains and is
recorded as an ADDITIONAL EDITORIALLY RELEVANT CONTEXTUAL LINK only. It is not
an intent owner, is not category discovery, and does not replace the approved
month-page migration.

## 4. Discovery cleanup

`caesarean-birth` appeared twice as a normal Pregnancy category entry. The
duplicate was removed; the Birth planning entry remains. Every other Phase 33
Legacy slug appears exactly once.

```text
Normal category discovery      19/19
Duplicate normal discovery         0
```

Cross-links, editorial contextual links, Phase 32F migrations and month-guide
related links are not counted as normal category discovery.

## 5. Imagery

All 51 new assets were generated with Nano Banana inside Lovable and wired
through the existing image contracts: legacy `hero` + two `editorialSections`
images, First Year `firstYearArticleImageMap` hero + two body images placed
after named sections. Alt text is descriptive and factual; no alt text makes a
safety, risk or treatment claim. No stock, placeholder or reused unrelated
imagery. No defects were found, so nothing was regenerated.

```text
Heroes            19
Body images       38
Approved assets   57
Broken images      0
```

## 6. Review metadata safeguard

```text
False visitor-facing review claims    0
Fabricated affirmative metadata       0
Review badges without genuine review  0
```

New First Year records omit `medicallyReviewed` and `reviewedBy`; the review
badge therefore does not render. New Legacy records carry no review metadata.
`status: "ready"` is runtime renderability only.

## 7. Grounding registry coverage exception

**APPROVED PHASE 33.3 BOUNDARY EXCEPTION — REGISTRY COVERAGE / DEFAULT-DENY
METADATA ONLY.**

17 default-deny metadata rows were added to
`src/lib/grounding/articleGroundingRegistry.ts` because the existing drift
integrity guard requires a registry record for every runtime article slug. All
17 rows are `editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`,
`archived: false`, `deprecated: false`, with no approval metadata.

```text
GROUNDING REGISTRY METADATA CHANGES   17 default-deny coverage rows added
GROUNDING RUNTIME BEHAVIOUR CHANGES   0

Runtime grounding behaviour changed    NO
Grounding eligibility changed          NO
AI routing changed                     NO
Approved / candidate records added     NO

Registry records                      225
Grounding approvals                     0
Grounding candidates                    0
listGroundingEligibleSlugs()           []
AI_SOURCE_ROUTING_VERSION   30B-source-routing-v1
Drift guard                          PASS
```

## 8. Validation

```text
Focused Phase 33 + grounding tests   PASS (5 files / 79 tests)
Full test suite                      PASS — 119 files / 1309 tests, 0 timeouts
Typecheck                            PASS (x2, clean)
Lint                                 BASELINE UNCHANGED (1 error, 10 warnings)
Production build                     PASS
Sitemap                              350 unique, 0 duplicates
Responsive QA 1280x1800 / 768x1200 / 390x844   PASS across all 19 routes
  - exactly one H1 per route, 3+ images loaded, 0 broken images,
    0 horizontal overflow, 0 page-level console errors
```

## 9. Boundary reconciliation

```text
New hub                          0
Navigation architecture          0
Renderer                         0
Template                         0
Design tokens                    0
Database                         0
Schema                           0
RLS                              0
AI runtime                       0
Grounding registry metadata      17 default-deny coverage rows
Grounding runtime behaviour      0
Grounding approvals              0
Grounding eligibility changes    0
Routing changes                  0
Journal                          0
Memory                           0
Voice                            0
Saved lifecycle changes          0
Deployment                       0
```

Saved lifecycles remain exactly: `ttc`, `pregnancy`, `first_year`.

## 10. Closure

```text
Runtime records                 19/19  (Legacy 9, First Year 10)
Direct routes                   19/19
Normal discovery                19/19
Duplicate normal discovery          0
Human reviews completed             0
Deployment eligible                 0
Production deployed                 0
```

All 19 Phase 33 articles remain `HOLD_HUMAN_REVIEW`. Human-review governance is
unchanged.

**PHASE 33.3 — CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**
**GLOBAL PHASE 33 DEPLOYMENT BLOCK = ACTIVE**
