# Phase 37D — First Year workstream closure

Post-remediation state. Phase 37C is historical and unchanged.
All counts below are measured from the repository and the generated sitemap.

## 1. Measured content counts

| Measure | Expected | Measured | Match |
| --- | --- | --- | --- |
| Existing First Year articles | 26 | 26 | YES |
| New First Year articles | 2 | 2 | YES |
| Final First Year articles (all `ready`) | 28 | 28 | YES |
| Baby pathway articles | 16 | 16 | YES |
| Postpartum pathway articles | 12 | 12 | YES |
| First Year public article URLs | 28 | 28 | YES |
| Concrete canonical First Year public URLs | 56 | 56 | YES |
| Overall sitemap unique URLs | 356 | 356 | YES |

The 56 First Year URLs are: 1 hub, 2 pathways, 8 topics, 4 phases, 13 months,
28 articles.

## 2. Closure-level accounting

| Item | Required | Achieved |
| --- | --- | --- |
| P1 findings resolved | 3 / 3 | 3 / 3 |
| P2 findings resolved | 13 / 13 | 13 / 13 |
| EXPAND_EXISTING implemented | 6 / 6 | 6 / 6 |
| INTERNAL_LINK_ONLY implemented | 4 / 4 | 4 / 4 |
| Material AI-only editorial needs now editorially owned | 2 / 2 | 2 / 2 |
| NC-1 | complete | complete |
| NC-2 | complete | complete |
| Weak-discovery First Year articles | 0 | 0 |
| Orphaned First Year articles | 0 | 0 |
| Toddler content handoff | COMPLETE | COMPLETE |
| Family handoff | non-blocking | PARTIAL, P3, non-blocking, documented |
| Milestone canonical decision | RESOLVED | RESOLVED |
| Known inventory staleness | corrected | corrected |

P1 mapping: P1-1 and P1-3 → NC-1; P1-2 → `when-to-ask-for-help-after-birth`
expansion (intrusive thoughts). P2 mapping: P2-1, P2-4, P2-5, P2-7, P2-8, P2-9,
P2-10 → expansions; P2-11 and P2-12 → NC-2; P2-13 → NC-1; P2-2, P2-3, P2-6 →
discovery / internal-link pass. Each finding is accounted for individually even
where one article resolves several intents.

## 3. Governance

| Change type | Count |
| --- | --- |
| Redesigns | 0 |
| Route architecture changes | 0 |
| Lifecycle definition changes | 0 |
| Journey-routing logic changes | 0 |
| Database / RLS / auth changes | 0 |
| Analytics changes | 0 |
| AI runtime / prompt / context-builder changes | 0 |
| Grounding eligibility / approval / candidate changes | 0 |
| Reviewer-governance changes | 0 |
| `AI_SOURCE_ROUTING_VERSION` changes | 0 |
| TTC changes | 0 |
| Pregnancy changes | 0 |
| Deployment | NO |

No medical-review claim is rendered for the new content; neither new record
carries reviewer provenance.

## 4. Validation

| Gate | Result |
| --- | --- |
| Focused Phase 37D suite (`phase37dFirstYearRemediation`) | 13 / 13 PASS |
| Locked First Year regressions (37A, 37A.1, 37B, 37B.1) | PASS (count assertions updated from 26 to 28 to record the new state) |
| Full test suite | 137 files / 1,576 tests PASS |
| Typecheck run 1 | PASS |
| Typecheck run 2 | PASS |
| Lint | 11 problems (1 error, 10 warnings) = baseline, unchanged |
| Production build | PASS |
| Sitemap | 356 entries, 356 unique |
| Flaky tests | none (no FIRST RUN / RERUN divergence) |

Responsive and visual QA at 1280, 834 and 390 px across the hub, both pathways,
feeding / postpartum-recovery / care-and-safety topics, the 9–12 month phase,
two month pages and both new articles: all HTTP 200, no horizontal overflow, no
console errors. The month-page hero and baby images do not load through the
sandbox asset proxy; this is a pre-existing local-preview asset-serving
behaviour on untouched month imagery, not a Phase 37D regression.

## 5. Residual, non-blocking

- First Year → Family remains PARTIAL: only a contextual link exists; deeper
  Family content is a separate, non-blocking P3 item.
- Phase 37C P3 and P4 findings (19 and 4 respectively) remain open by design and
  were deliberately excluded from this closure phase.

## 6. Closure

PHASE 37D — CLOSED PASS. First Year workstream closed at the post-remediation
state above. No further phase started.
