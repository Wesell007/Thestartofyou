# Phase 33.2 — Batch 1 publication report

## Closure

**PHASE 33.2 — BATCH 1 VISUAL IMPLEMENTATION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**

Batch 1 runtime records present: **2**. Production-deployed articles: **0**.
Batch 2 did not begin.

The Phase 33.2 governance correction reclassified both Batch 1 articles.
Neither is low risk, and neither is deployment eligible:

| Article | Review classification | Human review | Phase 33 production status |
| --- | --- | --- | --- |
| `when-sleep-suddenly-changes` | SAFETY_REVIEW_REQUIRED | REQUIRED / NOT COMPLETED | HOLD_HUMAN_REVIEW |
| `hair-dye-and-beauty-treatments-in-pregnancy` | HEALTH_REVIEW_REQUIRED | REQUIRED / NOT COMPLETED | HOLD_HUMAN_REVIEW |

Hair dye was not escalated to safety review: the claim-level review found
pregnancy-specific health claims and one urgent-escalation statement, but not
the sustained emergency instruction pattern that meets this project's safety
threshold. That statement is an explicit reviewer checkpoint.

Both records are now in the human review pack with current runtime copy and
blank reviewer fields, so **19** Phase 33 articles are human-review held and
human reviews completed remain **0**. The other 17 have no runtime record and
remain **PUBLICATION STATUS: NOT PUBLISHED** with **0** images generated.

### Deployment control

Neither article system has a safe non-public runtime draft state.

| Article | Deployment blocker | Safe non-public runtime draft state | Accidental-deployment risk |
| --- | --- | --- | --- |
| `when-sleep-suddenly-changes` | HUMAN REVIEW REQUIRED | NO | YES |
| `hair-dye-and-beauty-treatments-in-pregnancy` | HUMAN REVIEW REQUIRED | NO | YES |

No feature flag, draft renderer, route guard or publication architecture was
created. Runtime values were left as they are: the First Year record keeps
its existing `status: "ready"`, which means renderable, not reviewed or
approved; the legacy record has no editorial status field and none was
invented.

## 1. Controlled Batch 1 scope

| Article | Dataset and existing template | Route | Review gate | Result |
| --- | --- | --- | --- | --- |
| `when-sleep-suddenly-changes` | First Year dataset → `FirstYearArticlePage` → `HubArticleView` | `/first-year/sleep/when-sleep-suddenly-changes` | SAFETY_REVIEW_REQUIRED — human review outstanding | Runtime record present, repository/build preview only, not deployed |
| `hair-dye-and-beauty-treatments-in-pregnancy` | Legacy `articleData` → existing flagship dispatch | `/articles/hair-dye-and-beauty-treatments-in-pregnancy` | HEALTH_REVIEW_REQUIRED — human review outstanding | Runtime record present, repository/build preview only, not deployed |

No renderer, template, layout component, article design or shared style was
added or changed.

## 2. Corrected visual standard

The Phase 33 minimum is **one hero plus two meaningful body images per
article**, or **three approved images per article**. Across all 19 programme
articles, the minimum is therefore:

```text
19 heroes + 38 body images = 57 minimum approved assets
```

Batch 1 now has **2 heroes + 4 body images = 6 approved article images**.
The remaining 17 have **0 generated images** and remain `NOT YET GENERATED`
and `NOT PUBLISHED`.

## 3. Batch 1 asset inventory

All new imagery was generated with Nano Banana inside Lovable.

Body-image production (visual standard correction): approved **3**, rejected
**1**. The rejected first sleep body attempt showed an unnecessary second
adult and legible book text; it was deleted and is not referenced or retained.

Sleep hero replacement (Phase 33.2 governance correction): generation
attempts **1**, rejected **0**, accepted **1**. The previous sleep hero was
visually ambiguous, because the lower cot area could read as thick loose
bedding. The replacement, `src/assets/firstyear-hero-sleep-changes-safe.jpg`,
shows a baby clearly on their back in a fitted sleeveless sleep bag, in a
clear cot with a fitted sheet, face and head unobstructed, no loose bedding
or cot accessories. The superseded asset
`src/assets/firstyear-hero-sleep-changes.jpg` was deleted.

Its alt text is a factual visual description and carries no safe-sleep
guidance: "Baby lying on their back in a fitted sleep bag, in a clear wooden
cot with a fitted sheet".

The other five Batch 1 images were re-inspected individually and preserved;
none was independently defective. Batch 1 therefore holds **6** approved
images.

### Sleep

Prior: hero **1**, body **1**, total **2**. New approved: body **1**. Final:
hero **1**, body **2**, total **3**.

| Role | Asset | Placement | Alt text | Caption | Ratio and crop intent | QA |
| --- | --- | --- | --- | --- | --- | --- |
| Hero, replaced | `src/assets/firstyear-hero-sleep-changes-safe.jpg` | Hero | Baby lying on their back in a fitted sleep bag, in a clear wooden cot with a fitted sheet | Existing support | Portrait-led, central cot and baby | PASS |
| Body 1, existing | `src/assets/firstyear-body-night-waking.jpg` | After `Things that commonly disturb a settled pattern` | A parent holding an awake baby calmly at home in low evening light | A settled pattern can change for a while without anything being wrong. | 1200 × 896 source; centred subject survives 4:3 mobile and 16:10 desktop | PASS |
| Body 2, new | `src/assets/firstyear-body-bedtime-wind-down-approved.jpg` | After `What tends to help` | A parent sharing a quiet picture book with an awake baby before bedtime | A calm, familiar wind-down can help mark the move from daytime to night. | 1200 × 896 source; parent and baby remain central across responsive crops | PASS |

The new scene is calm, contextual and non-diagnostic. The visible cot has a
firm flat mattress and no loose bedding, pillow, toy, bumper or sleep
positioner. It does not imply that reading makes a baby sleep.

### Hair dye and beauty treatments

Prior: hero **1**, body **0**, total **1**. New approved: body **2**. Final:
hero **1**, body **2**, total **3**.

| Role | Asset | Placement | Alt text | Caption | Ratio and crop intent | QA |
| --- | --- | --- | --- | --- | --- | --- |
| Hero, existing | `src/assets/article-hero-hair-dye-beauty-pregnancy.jpg` | Existing hero | Existing article alt | Not supported by this legacy field | 1376 × 768 source; central subject | PASS |
| Body 1, new | `src/assets/article-body-hair-dye-comfort.jpg` | `Ways to feel more comfortable about it` | A pregnant woman preparing unbranded hair-colouring items beside an open window at home | Not supported by `EditorialSection.image` | 928 × 1152 source; hands, bowl and open window remain meaningful in the alternating crop | PASS |
| Body 2, new | `src/assets/article-body-pregnancy-nail-care.jpg` | `Nails, lashes and brows` | A pregnant woman having a quiet manicure in a bright, unbranded nail studio | Not supported by `EditorialSection.image` | 928 × 1152 source; hands remain the focal point on mobile and desktop | PASS |

`Nails, lashes and brows` was chosen over the later massage section because
it gives the strongest subject variety and article pacing without clustering
similar salon imagery. Both scenes are understated, unbranded, non-clinical
and do not imply medical endorsement.

## 4. Responsive editorial QA

Both complete articles were inspected from hero to footer at **1280 × 1800**,
**768 × 1200** and **390 × 844**, using the Cervical mucus article as the
practical quality and rhythm benchmark.

| Check | Sleep | Hair dye |
| --- | --- | --- |
| Title and hero relationship | PASS | PASS |
| Early and later image distribution | PASS | PASS |
| Whitespace and text density | PASS | PASS |
| Section transitions | PASS | PASS |
| Existing alternating composition | Not applicable to First Year renderer; existing full-width rhythm preserved | PASS |
| Body image scale and focal crop | PASS | PASS |
| Mobile stacking and paragraph measure | PASS | PASS |
| Sources and review presentation | PASS | PASS |
| Related guidance | PASS | PASS |
| Image loading | PASS, 0 broken images | PASS, 0 broken images |
| Horizontal overflow | None at all three sizes | None at all three sizes |

The browser reported the existing React `fetchPriority` development warning
on these articles and the benchmark. It is unrelated to this correction and
was not changed under the architecture-zero boundary.

## 5. Publication, routes and migration

- Both routes returned their intended articles with one H1, correct document
  titles and self-canonical URLs.
- The sitemap contains **333 unique URLs**, with each Batch 1 URL exactly
  once.
- Sleep’s Phase 32F migration remains implemented through the existing
  pregnancy article cross-link, First Year month link and First Year phase
  link.
- Hair dye has **0 publication-link migrations**, as required.
- The focused Phase 32F link-integrity guard passed with no unpublished draft
  target.
- No links or image records were introduced for the other 17 articles.

## 6. Technical validation

| Validation | Result |
| --- | --- |
| Focused image and publication tests | PASS, 2 files / 6 tests; final image guard re-run PASS, 2 tests |
| Full test suite | PASS, **118 files / 1,299 tests / 0 timeouts** |
| Typecheck run 1 | PASS |
| Typecheck run 2 | PASS |
| Lint | Baseline preserved: **1 existing error / 10 existing warnings**. The error remains `prefer-const` in generated `previewAuthStorage.ts:38`; no new lint finding remains. |
| Production build | PASS |
| Responsive browser QA | PASS at desktop, tablet and mobile |
| Sitemap | PASS, **333** URLs |

## 7. Files changed for the visual correction

- `src/assets/firstyear-hero-sleep-changes-safe.jpg` (new, accepted)
- `src/assets/firstyear-hero-sleep-changes.jpg` (deleted, superseded)
- `src/assets/firstyear-body-bedtime-wind-down-approved.jpg`
- `src/assets/article-body-hair-dye-comfort.jpg`
- `src/assets/article-body-pregnancy-nail-care.jpg`
- `src/components/firstyear/article/firstYearArticleImages.ts`
- `src/data/articleData.ts`
- `src/test/phase33Batch1ImageIntegrity.test.ts`
- `docs/content/phase33-human-review-pack.md`
- `docs/content/phase33-publication-register.md`
- `docs/content/phase33-batch1-publication-report.md`

## 8. Architecture-zero checks

New article records in this correction **0**; new URLs **0**; slug changes
**0**; status changes **0**; lifecycle changes **0**; route architecture
**0**; navigation architecture **0**; sitemap architecture **0**; SEO
architecture **0**; renderer/template architecture **0**; design-system
changes **0**; AI runtime **0**; grounding behaviour **0**; journal **0**;
memory **0**; voice **0**; database **0**; schema **0**; RLS **0**;
deployments **0**.

No deployment was performed and Batch 2 did not begin.

**PHASE 33.2 — BATCH 1 VISUAL IMPLEMENTATION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**