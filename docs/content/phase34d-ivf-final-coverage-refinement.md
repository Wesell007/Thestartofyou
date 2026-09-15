# Phase 34D — IVF Final Coverage Refinement

Status: **CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**
Scope: two new IVF guides plus one existing stage expansion. Preview only.
Global Phase 33 deployment block: **ACTIVE**. Production deployed = 0.

## 1. Phase 34A rows implemented

| 34A row | Subject | 34A classification | 34D outcome |
| --- | --- | --- | --- |
| 8 | Fertilisation and IVF versus ICSI | NEW_ARTICLE, HEALTH_REVIEW_REQUIRED | IMPLEMENTED as `/articles/ivf-vs-icsi` |
| 9 | Embryo development, grading and blastocysts | NEW_ARTICLE, HEALTH_REVIEW_REQUIRED | DEFERRED — REASSESS AFTER BEFORE-TRANSFER EXPANSION. Historical classification unchanged. Intent now served at orientation depth by `/ivf/before-transfer`. |
| 10 | Fresh versus frozen embryo transfer | NEW_ARTICLE, HEALTH_REVIEW_REQUIRED | IMPLEMENTED as `/articles/fresh-vs-frozen-embryo-transfer` |
| 11 | Embryo freezing and storage | INTERNAL_LINK, LOW_RISK_GENERAL | Covered as supporting coverage inside row 10 with an HFEA signpost. No new route, no standalone article. |

Historical Phase 34A counts are not rewritten. Only outcome annotations were added.

## 2. Articles created

### A. IVF versus ICSI
- Slug: `ivf-vs-icsi` → `/articles/ivf-vs-icsi`
- Title: "IVF versus ICSI: what the difference actually is"
- Owns: the comparison and decision understanding between the two fertilisation methods.
- Covers: what IVF means, what ICSI means, where the single practical difference sits (before, at and after fertilisation), why a clinic may discuss ICSI, what ICSI is not, questions to ask the clinic.
- Explicitly avoids: success-rate promises, premium/upgrade framing, telling the reader which treatment to choose, personal recommendation.

### B. Fresh versus frozen embryo transfer
- Slug: `fresh-vs-frozen-embryo-transfer` → `/articles/fresh-vs-frozen-embryo-transfer`
- Title: "Fresh versus frozen embryo transfer: understanding the two routes"
- Owns: the transfer-route comparison and decision understanding.
- Covers: fresh transfer, frozen embryo transfer, why either route may be used, how the timing differs, embryo freezing and storage context (HFEA signpost, row 11), clinic decision factors, questions for the clinic.
- Explicitly avoids: universal recommendation, "sooner is better", "more controlled is better", invented or unsourced success-rate comparisons.

No aliases, no redirects, no new renderer, no new hub, no new stage page. Slug collisions = 0. Route collisions = 0.

## 3. Before-transfer expansion

Surface: existing `/ivf/before-transfer` (`src/data/ivfTopicData.ts`). No new route or page type; existing config fields only.

Added:
- A "Fertilisation & embryo development" group with orientation-depth prose covering fertilisation, why not every egg fertilises or every embryo develops the same way, what grading language does and does not describe, blastocyst orientation, and that the embryology team is the authority on an individual's own updates.
- Links within the group to the fresh-versus-frozen guide, the IVF versus ICSI guide, and companion prompts for grading, blastocysts and questions for the embryology team.
- Two additional "what this covers" bullets for embryo development and the fresh/frozen routes.

Deliberately not added: embryology detail, a grading reference table, any substitute for clinic or embryologist advice.

## 4. Discovery and contextual links

Normal discovery placements = 2 (both guides in the existing "Understanding the treatment" IVF hub section). Duplicate normal discovery = 0. No new discovery section.

Contextual links added (not counted as discovery):

| Source | Destination | Occurrences |
| --- | --- | --- |
| `what-ivf-is-uk-guide` | `ivf-vs-icsi` | 1 |
| `ivf-timeline-what-to-expect` | `ivf-vs-icsi` | 1 |
| `/ivf/before-transfer` | `fresh-vs-frozen-embryo-transfer` | 1 |
| `/ivf/before-transfer` | `ivf-vs-icsi` | 1 |
| `ivf-vs-icsi` | `what-ivf-is-uk-guide` | 1 |
| `ivf-vs-icsi` | `ivf-timeline-what-to-expect` | 1 |
| `fresh-vs-frozen-embryo-transfer` | `/ivf/before-transfer` | 1 |
| `fresh-vs-frozen-embryo-transfer` | `ivf-timeline-what-to-expect` | 1 |

Contextual-link occurrences added = 8. All resolve to real routes.

## 5. Sources

Hierarchy applied: HFEA > NHS > NICE. No competitor site is used as factual authority. No invented dates.
Phase 33.4 preserved: sources visible = YES, plain text = YES, clickable source anchors = 0, external-link icons = 0, new-tab disclaimer = 0, underlying URLs stored.

Verified live URLs are listed in `phase34d-ivf-evidence-pack.md`.

## 6. Review and reviewer governance

| Item | Classification |
| --- | --- |
| `ivf-vs-icsi` | HEALTH_REVIEW_REQUIRED |
| `fresh-vs-frozen-embryo-transfer` | HEALTH_REVIEW_REQUIRED |
| `/ivf/before-transfer` expansion | HEALTH_REVIEW_REQUIRED |

HEALTH_REVIEW_REQUIRED = 3, SAFETY_REVIEW_REQUIRED = 0, LOW_RISK_GENERAL = 0. No classification downgraded.
Phase 33.5 preserved: reviewer claims rendered = 0, named reviewers = 0, medically-reviewed badges = 0, unsupported JSON-LD `reviewedBy` = 0, review provenance registry remains empty.
Human reviews completed = 0. Deployment eligible = 0.

## 7. Grounding registry

- Before: 229. After: 231. Delta: +2 (one default-deny row per new runtime slug, required by the drift guard).
- Each new row: `editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`, `archived: false`, `deprecated: false`, no approval metadata.
- Approved = 0, candidates = 0, eligible slugs = [].
- `AI_SOURCE_ROUTING_VERSION` = `30B-source-routing-v1` (unchanged).
- Metadata changes = 2. Runtime behaviour changes = 0.

## 8. Sitemap

Before 354 → after 356. Delta +2. New article URLs = 2. Duplicates = 0. Aliases = 0. Redirects = 0.

## 9. Imagery

Hero images = 2, body images = 4, total new assets = 6. Broken = 0.
`article-hero-ivf-vs-icsi.jpg`, `article-body-icsi-comparison.jpg`, `article-body-icsi-clinic-talk.jpg`, `article-hero-fresh-vs-frozen.jpg`, `article-body-fresh-frozen-routes.jpg`, `article-body-fresh-frozen-questions.jpg`.
Editorial, warm, calm, realistic, UK appropriate. No text, no branding, no graphic clinical imagery, no superiority cues for ICSI, no literal ice metaphors for frozen transfer.

## 10. Validation

- Focused Phase 34D tests: 34 passed.
- Grounding drift and approval tests: pass (pinned count updated 229 → 231, draft split 66 → 68).
- Full suite: 124 files / 1,418 tests passed.
- Typecheck ×2: clean both runs.
- Lint: at baseline (1 pre-existing error, 10 warnings). No new findings.
- Production build: passed. Sitemap validation: 356 URLs, 0 duplicates.
- Route and internal-link validation: pass.
- Frontend QA at desktop, tablet and mobile: see `phase34d-ivf-frontend-report.md`.

## 11. Changed files

- `src/data/articleData.ts` — two new records, two contextual links added to existing IVF articles.
- `src/data/ivfTopicData.ts` — before-transfer expansion, two new link constants.
- `src/data/articleInventory.ts` — two `legacy:` draft rows.
- `src/lib/grounding/articleGroundingRegistry.ts` — two default-deny rows.
- `src/components/ivf/IVFGuides.tsx` — two guide entries, section intro copy.
- `src/assets/` — six new images.
- `src/test/phase34dIvfRefinement.test.ts` — new focused suite.
- `src/test/articleGrounding.test.ts`, `src/test/articleGroundingApproval.test.ts`, `src/test/phase34cIvfNewArticles.test.ts` — pinned counts updated.
- `docs/content/phase34a-ivf-gap-register.csv` — outcome annotations only.

## 12. Final counts

| Metric | Value |
| --- | --- |
| New IVF articles | 2 |
| New routes | 2 |
| Existing stage surfaces expanded | 1 |
| Standalone embryo-development article created | 0 |
| Clinic-questions checklist created | 0 |
| Normal-discovery placements | 2 |
| Duplicate normal discovery | 0 |
| Contextual-link occurrences added | 8 |
| Structured-source articles | 2 |
| Clickable source citations | 0 |
| Hero images | 2 |
| Body images | 4 |
| Total new article assets | 6 |
| HEALTH / SAFETY / LOW_RISK changed items | 3 / 0 / 0 |
| Human reviews completed | 0 |
| Reviewer claims rendered | 0 |
| Unsupported JSON-LD reviewedBy | 0 |
| Grounding registry | 229 → 231, delta +2, approvals 0, candidates 0, eligible slugs [] |
| AI_SOURCE_ROUTING_VERSION unchanged | YES |
| Sitemap | 354 → 356, delta +2, duplicates 0 |
| Production deployed | 0 |
| Global Phase 33 deployment block | ACTIVE |

## 13. Held backlog

- Standalone embryo-development article — DEFERRED. Reassessed after this expansion: `/ivf/before-transfer` now serves the orientation intent.
- Clinic-questions checklist — DEFERRED as a future product opportunity, not an article gap.

## 14. Final IVF coverage verdict

**A. IVF ARTICLE COVERAGE IS SUFFICIENT FOR CURRENT STRATEGY.**
