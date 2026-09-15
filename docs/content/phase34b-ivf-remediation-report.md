# Phase 34B — IVF source remediation and existing-content expansion

Status: CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT
Deployment: 0. GLOBAL PHASE 33 DEPLOYMENT BLOCK remains ACTIVE.
Authoritative inputs: the four Phase 34A documents (audit, journey map, gap register, existing-content actions). Phase 34A historical counts are unchanged by this phase.

## 1. Source remediation

Both unique IVF articles previously carried label-only sources. Both now carry structured provenance (label, publisher, URL retained in the underlying data). Every URL was fetched and confirmed to return HTTP 200 before being recorded. No publication years were recorded, because none could be confirmed from the live pages; no year was invented.

`ivf-timeline-what-to-expect` (6 sources, all primary):
- In vitro fertilisation (IVF) — HFEA
- IVF: what happens — NHS
- IVF: risks — NHS
- Risks of fertility treatment — HFEA
- Embryo freezing — HFEA
- Fertility problems: assessment and treatment (CG156) — NICE

`emotional-impact-of-ivf` (6 sources, 4 primary + 2 support-context):
- Getting emotional support — HFEA
- In vitro fertilisation (IVF) — HFEA
- IVF — NHS
- Fertility problems: assessment and treatment (CG156) — NICE
- Get support — Fertility Network UK (emotional/support context only)
- Find a fertility counsellor — British Infertility Counselling Association (emotional/support context only)

Phase 33.4 presentation is preserved: visitor-facing citations are visible, plain text, with no anchor, no external-link icon and no new-tab disclaimer. `ArticleSources.tsx` was not modified; it already renders structured sources as plain text.

## 2. Existing article expansion

`ivf-timeline-what-to-expect` remains the sole primary editorial owner of the generic IVF sequence. No second process/timeline record was created. Added, at orientation depth only:
- "What monitoring is actually checking" — scan and blood-test purpose, frequency, dose adjustment as routine.
- OHSS signpost callout at stimulation, at signpost depth, with same-day clinic contact wording. Detailed OHSS guidance remains held for a future dedicated record.
- "What egg collection day usually involves" — fasting, escort, procedure, recovery, common after-effects.
- "Sperm collection and preparation" — fresh or thawed sample, laboratory preparation, ICSI where indicated, surgical retrieval arranged separately.
- "Why home testing early can mislead" — trigger injection contains hCG; wait for the clinic's test date.
- `inThisArticle` updated to match the expanded structure.

Route, canonical, slug, topic ownership, hero imagery and article identity are unchanged. Image changes = 0.

## 3. Existing stage surface expansion

`/ivf/after-transfer` expanded in `src/data/ivfTopicData.ts` only. Route and canonical unchanged.
- `whatThisCovers` now names what happens after transfer, medication continuation as prescribed, rest and activity myths, testing timing and result reading, and when to contact the clinic.
- `startHere` populated (previously empty) with three existing destinations.
- New "What the wait after transfer often looks like" sequence card: transfer day, days 1 to 4, days 5 to 9, days 10 to 14, test day. Framed as a general shape; the clinic owns medication, test date and escalation.
- New group "Medication, rest & daily life" with four companion routes.
- No claim that symptoms confirm implantation or outcome; no individualised medication instructions; no separate symptom article created.

## 4. Deferred EXPAND_EXISTING record

`/ivf/before-transfer` (actions CSV record 2) is **DEFERRED FROM 34B SMALL BATCH**. It is not in the Phase 34A smallest next batch and was not expanded. The single approved change to that surface is the freezing/storage signpost link naming the HFEA as the authority.

## 5. Shadowed stage data

Before: 3 unreachable duplicate records in `src/data/ivfStageData.ts` (`before-transfer`, `after-transfer`, `early-pregnancy`).
Proof of authority: the explicit `/ivf/*` routes in `src/App.tsx` are registered above the generic `/:journey/:stage` route and render `IVFTopicPage` from `ivfTopicData.ts`; the sitemap generator lists only the explicit routes. Repository inspection confirmed the only importer of `ivfStageData.ts` was the `ivf` entry in the `StagePage.tsx` registry, with no non-IVF content, no test dependency and no other runtime consumer.
Resolution: the `ivf` registry entry and its import were removed from `src/pages/StagePage.tsx`, and `src/data/ivfStageData.ts` was deleted. `ivfTopicData.ts` is now the single authoritative owner of each IVF stage intent.
After: shadowed stage records = 0. Public IVF stage routes 3 -> 3. New stage routes = 0.

## 6. Links and discovery

### Internal contextual links

New internal contextual link occurrences implemented = 2.

| Source surface | Destination | Occurrences added |
| --- | --- | --- |
| `/ivf/after-transfer` | `/articles/chemical-pregnancy` | 1 |
| `/ivf/early-pregnancy` | `/articles/twins-and-multiples-in-pregnancy` | 1 |

### Pregnancy after loss

`/articles/pregnancy-after-loss` was already present on two IVF source surfaces and is unchanged:
- `/ivf/after-transfer` — pre-existing occurrence = 1
- `/ivf/early-pregnancy` — pre-existing occurrence = 1

Pre-existing pregnancy-after-loss occurrences = 2. New Phase 34B occurrences = 0. These are not counted as newly implemented Phase 34B links.

### Plain-text authoritative signpost

`/ivf/before-transfer` contains one plain-text authoritative HFEA signpost for embryo freezing and storage in the "Procedures & preparation" group. This is not an internal link, not a new article, not a normal-discovery destination, and not a clickable external citation. Plain-text external-authority signposts added = 1.

### Phase 34A rows 14–17 mapping

| Row | Intent | Implemented | Status | 34B occurrences |
| --- | --- | --- | --- | --- |
| 14 | Fertility tests for women | NO | DEFERRED | 0 |
| 15 | Fertility tests for men | NO | DEFERRED | 0 |
| 16 | Male fertility when trying to conceive | NO | DEFERRED | 0 |
| 17 | Chemical pregnancy | YES | COMPLETED | 1 |

Rows 14–16 are pre-treatment assessment subjects owned by the TTC journey and were outside the approved Phase 34B smallest implementation batch. Their historical Phase 34A classification is unchanged.

### Normal discovery

Normal-discovery additions = 1. `moving-from-ttc-to-ivf` is surfaced on the IVF hub once, as a "Before stage one" pill above the stage cards in `IVFStages.tsx`. IVF hub occurrences = 1. The article keeps its TTC journey ownership, route and canonical; no replacement article was created; no duplicate discovery exists.


## 7. Review governance

Phase 33.5 remains binding. The review-claim gate is unchanged and the production provenance registry remains empty.
- Human reviews completed: 0.
- Reviewer claims rendered: 0 (verified in the browser across all seven IVF surfaces at desktop and mobile).
- Unsupported JSON-LD `reviewedBy`: 0.
- Historical dataset reviewer fields are untouched and do not count as provenance.

Review classification carried forward from Phase 34A for the changed items:
- HEALTH_REVIEW_REQUIRED: 3 — `ivf-timeline-what-to-expect`, `emotional-impact-of-ivf`, `/ivf/after-transfer`.
- SAFETY_REVIEW_REQUIRED: 2 — the OHSS signpost callout in the timeline article, and the after-transfer escalation and testing guidance.

## 8. Tests

New: `src/test/phase34bIvfRemediation.test.ts` (16 tests) covering structured provenance on both IVF articles, primary-source dominance, no invented years, non-clickable visible citations, sole timeline ownership, the expanded timeline subsections, the after-transfer route and coverage, no symptom-confirms-outcome language, no duplicate contextual article links, removal of the shadowed stage registry, hub occurrence of `moving-from-ttc-to-ivf` = 1, and no new IVF stage routes, plus the review-claim gate returning null for both IVF articles.

## 9. Validation

- Focused suite: 16/16 pass.
- Full suite: 122 files, 1,346 tests, all pass.
- Typecheck: clean (run twice).
- Lint: unchanged against baseline — 1 pre-existing error in the generated `previewAuthStorage.ts` and 10 pre-existing fast-refresh warnings.
- Production build: passed.
- Frontend QA at 1280px and 390px across `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`, both IVF articles and `moving-from-ttc-to-ivf`: no horizontal overflow, no broken images, no external anchors in source citations, no reviewer claims, no "Jenny Joines". The only console warning is the pre-existing React `fetchPriority` casing warning.
- Tablet QA at 834px across `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`, the IVF timeline article, the emotional-impact-of-ivf article and `moving-from-ttc-to-ivf`: horizontal overflow = 0, broken images = 0, images loaded = 107, broken layout = 0, source citations visible = YES where applicable, clickable anchors inside source sections = 0, reviewer claims = 0, contextual link targets checked = 9, broken contextual link targets = 0, IVF hub occurrence of `moving-from-ttc-to-ivf` = 1. Console: one pre-existing React `fetchPriority` warning only; no new runtime error.
- Route and internal-link validation: all IVF link targets resolve; broken references = 0.


## 10. Completion counts

| Metric | Value |
| --- | --- |
| IVF articles source-remediated | 2 |
| Existing articles expanded | 1 |
| Existing stage surfaces expanded | 1 |
| Deferred EXPAND_EXISTING records | 1 (`/ivf/before-transfer`) |
| Shadowed stage records | 3 -> 0 |
| Public IVF stage routes | 3 -> 3 |
| New IVF article records | 0 |
| New routes | 0 |
| New internal contextual link occurrences | 2 |
| Pre-existing pregnancy-after-loss occurrences | 2 |
| Plain-text HFEA authoritative signposts added | 1 |
| Normal-discovery additions | 1 |

| IVF hub occurrences of `moving-from-ttc-to-ivf` | 1 |
| HEALTH_REVIEW_REQUIRED changed items | 3 |
| SAFETY_REVIEW_REQUIRED changed items | 2 |
| Human reviews completed | 0 |
| Reviewer claims rendered | 0 |
| Unsupported JSON-LD `reviewedBy` | 0 |
| Production deployed | 0 |
| GLOBAL PHASE 33 DEPLOYMENT BLOCK | ACTIVE |


Boundaries held at 0: new lifecycles, saved-lifecycle changes (still exactly `ttc`, `pregnancy`, `first_year`), AI runtime changes, grounding eligibility changes, journal changes, memory changes, voice changes, database/schema/RLS changes, imagery changes, sitemap changes, deployment.

## 11. Held backlog

NEW_ARTICLE, not created in this phase: What IVF is — UK guide; NHS IVF funding and eligibility; OHSS and treatment side effects; unsuccessful IVF cycle and trying again; IVF vs ICSI; embryo development; fresh vs frozen transfer.
DEFERRED PRODUCT OPPORTUNITY: clinic-questions checklist.
DO NOT CREATE (Phase 34A, preserved): donor-gamete content as a standalone expansion at this stage; additional standalone IVF stage pages.

## 12. Changed files

- `src/data/articleData.ts` — sources and editorial sections for the two IVF records.
- `src/data/ivfTopicData.ts` — after-transfer expansion, contextual links, link constants.
- `src/components/ivf/IVFStages.tsx` — one hub discovery addition.
- `src/pages/StagePage.tsx` — removed the shadowed IVF registry entry.
- `src/data/ivfStageData.ts` — deleted.
- `src/test/phase34bIvfRemediation.test.ts` — new.
- `docs/content/phase34b-ivf-remediation-report.md` — this report.
- `docs/content/phase34a-ivf-content-audit.md` — implementation-status note only.

---

PHASE 34B — IVF SOURCE REMEDIATION & EXISTING-CONTENT EXPANSION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT — CLOSURE RECONCILED

