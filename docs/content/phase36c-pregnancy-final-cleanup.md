# Phase 36C — Pregnancy final cleanup

Status: CLOSED PASS. Evidence-backed remediation only. No new articles, no new routes beyond one canonical redirect, no UX redesign, no week-model change, no AI/grounding/database/lifecycle/analytics change, not deployed.

Starting evidence locked from Phase 36B (not reopened): 104 Pregnancy records (live 85, draft 0, unknown 19); actions KEEP 97, EXPAND_EXISTING 4, MERGE 2, REPOSITION 0, INTERNAL_LINK_ONLY 1, ARCHIVE_CANDIDATE 0; 64 journey moments (covered 45, partially covered 8, uncovered 1, not required standalone 2, better served elsewhere 8); 0 new article candidates; 0 release blockers.

## 1. Stale related-article references (4 → 0)

| # | Parent article | Stale slug | Resolution | Evidence |
|---|---|---|---|---|
| 1 | nausea-in-early-pregnancy | first-trimester-symptoms | Replaced with `early-pregnancy-symptoms-explained` | No `first-trimester-symptoms` record exists; `early-pregnancy-symptoms-explained` is the unified early-symptom owner in the 36B inventory |
| 2 | fatigue-in-early-pregnancy | first-trimester-symptoms | Replaced with `early-pregnancy-symptoms-explained` | As above |
| 3 | symptoms-stopping-early-pregnancy | first-trimester-symptoms | Replaced with `early-pregnancy-symptoms-explained` | As above |
| 4 | paracetamol-in-pregnancy | headaches-in-pregnancy | Replaced with `medicines-in-pregnancy` | No `headaches-in-pregnancy` record exists and no article owns headache guidance; the medicines article is the defensible destination for the parent's medication-in-pregnancy intent |

One replacement per occurrence; no relation fanned out into multiple links. After: stale references 0, rendered broken internal links 0, wrong-destination links 0 (verified by dataset sweep and the Phase 36C regression test).

## 2. Orphaned articles (2 → 0)

| Article | Inbound path added | Why it is honest |
|---|---|---|
| symptoms-stopping-early-pregnancy | One related-stage link from `early-pregnancy-symptoms-explained` ("For the days symptoms quieten and the worry starts.") | Symptoms easing is a direct sub-question of the early-symptoms article |
| low-lying-placenta-in-pregnancy | One related-stage link from `anterior-placenta` ("The other placental position question scans often raise.") | Same visitor question — placental position found at a scan |

No padding, no duplication across surfaces, no new routes, no navigation redesign.

## 3. Pregnancy → Loss support handoff (PARTIAL → COMPLETE)

Added one related-stage link from `bleeding-in-early-pregnancy` to the existing `pregnancy-after-loss` article, with context for people who have been through loss before or need somewhere gentler afterwards. Bleeding/uncertainty is the strongest existing early-Pregnancy surface for this moment. No new loss content, no loss lifecycle, no repeated loss CTAs (one placement only).

## 4. Pregnancy → First Year editorial handoff (PARTIAL → COMPLETE)

Added one group, "Looking ahead to the first weeks", at the end of the `preparing-for-baby` topic page (the late-pregnancy surface; week modules carry no link fields). It points at existing content only: `your-body-after-birth`, `feeding-your-baby-complete-guide`, and the `/first-year` hub. Lifecycle routing untouched and still COMPLETE.

## 5. Birth-plan consolidation

Canonical owner: `birth-preferences` — richer editorial sections, three structured sources, five FAQs, larger inbound-link footprint, broader visitor intent. Secondary: `writing-a-birth-plan` — no sources, two FAQs, thin structure.

Actions:
- Folded the one non-duplicative practical step from the secondary into the canonical owner ("Bring a copy with your notes").
- Repointed every internal reference (9 related-slug lists, 2 related-stage links, 2 weekly suggestion entries at weeks 30–31 and 34) to `/articles/birth-preferences`.
- Retired `/articles/writing-a-birth-plan` using the established pattern: a `Navigate ... replace` route mounted above the generic `/articles/:slug` route in `src/App.tsx`, plus the slug added to `legacyArticleRedirects` in `scripts/generate-sitemap.ts`.
- Marked the inventory record `canonicalRole: merge-into-another`, `recommendedAction: merge`.

After: 1 canonical owner, 0 internal references to the retired route, 0 broken links, 0 redirect loops, 0 technical duplicates introduced, no third birth-plan article. Sitemap URLs 353 → 352.

Known carry-forward: the grounding registry still lists the retired slug. The registry is locked in this phase, so this is recorded as governance debt, not repaired here.

## 6. EXPAND_EXISTING items (4 valid mappings / 4 verified / 4 addressed / 0 remaining mismatches)

| Gap | 36B owner | Verified | Outcome |
|---|---|---|---|
| Hyperemesis gravidarum | complete-guide-morning-sickness | Yes | New section "Hyperemesis gravidarum" — what it is, treatment, emotional weight, escalation callout |
| Labour pain relief | stages-of-labour | Yes | New section "Pain relief through the stages" — early/established options, epidural, choice framing |
| Pre-eclampsia | swelling-in-pregnancy | Yes | New section "Pre-eclampsia, in a little more detail" — what it is, risk factors, monitoring, urgent-signs callout |
| Antenatal classes | preparing-for-baby-complete-guide | Yes | Added one practical step and one FAQ covering NHS and paid classes |
| Travel and flying | eating-well-in-pregnancy | **No — mapping invalid, reconciled** | The mapping was withdrawn in the Phase 36C final evidence reconciliation. `eating-well-in-pregnancy` contains no travel or flying guidance and is restored to KEEP; "flying", "air travel" and "airline" appear zero times across the audited article, week and topic datasets, so the original PARTIALLY_COVERED evidence was a false-positive keyword match on the verb "travel". Moment 46 is now recorded as UNCOVERED / P3 / FUTURE EDITORIAL DECISION — NO CURRENT VALID OWNER. No content was forced into an unrelated article, no new article created, and the valid expansion programme was 4 / 4 completed |

Each expansion preserves the canonical route, the established voice, existing verified sources and safe escalation wording, and adds no new numerical precision.

## 7. Files changed

- `src/data/articleData.ts` — stale references, orphan links, loss handoff, three new editorial sections, antenatal-classes additions, birth-plan link consolidation, claim rewording
- `src/data/pregnancyTopicData.ts` — First Year handoff group
- `src/data/weeklyArticleSuggestions.ts` — birth-plan entries repointed
- `src/data/articleInventory.ts` — retired record reclassified
- `src/components/pregnancy/PregnancyTopicPage.tsx` — removed the image map entry for the retired route
- `src/App.tsx` — canonical redirect
- `scripts/generate-sitemap.ts` — retired slug de-indexed
- `src/test/phase36cPregnancyClosure.test.ts` — new regression coverage (8 tests)

## 8. Carried-forward governance debt (unchanged by design)

126 label-only source records; 5 articles with no source records; 311 week statements at UNRESOLVED_PROVENANCE (real trimester-level source context, statement-level provenance unresolved); 19 unknown-status records; grounding registry entry for the retired slug. None is a release blocker.
