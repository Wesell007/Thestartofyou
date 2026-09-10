# Phase 33.1 — Publication readiness audit (audit only, nothing published)

No runtime source changes, no article records, no links, no images, no
deployment. Output is documentation plus the 33.1 report.

## What the draft documents already show

Confirmed by reading the four draft files:

- 32A = 3 drafts (`itching-in-pregnancy`, `caesarean-birth`,
  `gestational-diabetes`), all held awaiting human health/safety review.
- 32B = 4 drafts (`teething` HEALTH, `colic-and-evening-crying` SAFETY,
  `introducing-solid-foods` SAFETY, `when-sleep-suddenly-changes`
  LOW_RISK_GENERAL).
- 32C = 3 drafts (SAFETY, HEALTH, HEALTH).
- 32D = 9 drafts (`hair-dye-and-beauty-treatments-in-pregnancy`
  LOW_RISK_GENERAL; the other eight HEALTH or SAFETY).

3 + 4 + 3 + 9 = 19. The two LOW_RISK_GENERAL articles are sleep regressions
(`when-sleep-suddenly-changes`) and hair dye, exactly as expected. Human
reviews completed remain 0 in every source document, so no article can carry
a genuine health/safety approval yet.

## Work in 33.1

### 1. Verify the baseline first
Run tests, typecheck twice, lint and build, and count public URLs from the
generated sitemap. Compare against the recorded post-32F state (117 files /
1,297 tests, lint 1 error + 10 warnings, 331 public URLs). Report drift
rather than forcing the numbers; stop before any later stage if drift is
material.

### 2. Read every draft in full and record verbatim metadata
For all 19: title, proposed slug, source phase, domain, review status,
sources, excluded claims, image metadata and suggested links, taken from the
documents rather than memory.

### 3. Decide the target dataset per article from repository truth
Inspect the legacy dataset (`src/data/articleData.ts`, `/articles/:slug`),
the First Year dataset (`src/data/firstYearArticleData.ts`,
`/first-year/:topic/:slug`), and the Toddler/Family datasets, including which
fields exist (`status`, `medicallyReviewed`, `reviewedBy`, `sources`,
`crossLinks`, section shapes) and how each renderer selects a template. Record
the correct owning dataset and topic for all 19 before any publication is
proposed. No new framework.

### 4. Per-article readiness checks
Slug collision check against every existing dataset and the sitemap; SEO
readiness (title, description, canonical shape, indexability rule); image
readiness against what the target template needs and whether a suitable
existing asset exists; cannibalisation check against the closest live page
using the 32F register and ownership map; and whether a 32F publication link
migration is attached.

### 5. Build the publication register
`docs/content/phase33-publication-register.md` with one row per article and
all the required columns, using only the allowed final statuses. Expected
shape given zero completed human reviews: 17 `HOLD_HUMAN_REVIEW`, and the two
low-risk articles resolved to `READY_TO_PUBLISH` or a specific hold
(`HOLD_IMAGE`, `HOLD_CANNIBALISATION`, `HOLD_EDITORIAL_QA`,
`HOLD_TECHNICAL`) based on the checks, not assumed ready.

### 6. Editorial QA on the two low-risk candidates
Full QA pass on sleep regressions and hair dye: opening answer, heading
structure, no placeholder or editor text, UK terminology, no unsupported
statistics, no fear framing, no duplication of a live page, source integrity.
Record the outcome; QA failure means a hold, not a rewrite of clinical
content.

### 7. Human review pack for the other 17
`docs/content/phase33-human-review-pack.md`: per article the title, phase,
classification, full draft copy, authoritative sources, supported claims,
deliberately excluded claims, escalation wording, the specific points the
reviewer must approve, and an empty reviewer outcome section. No pre-filled
approval, reviewer name or date.

### 8. Report and stop
Return the 20-point 33.1 output, including the files publication would touch,
the expected new public URLs, blockers, and recommended batches. Stop there.

## Milestones canonical

The 32F `DEFERRED_SEO_ARCHITECTURE` residual stays untouched.

## Boundaries held

Lifecycles remain `ttc | pregnancy | first_year`. No new hub, redesign, AI,
grounding, journal, memory, voice, database, schema or RLS change. No
deployment. If a publication dependency requires a schema change, stop and
report it.

## Files created by 33.1

- `docs/content/phase33-publication-register.md`
- `docs/content/phase33-human-review-pack.md`

No runtime files change during 33.1.
