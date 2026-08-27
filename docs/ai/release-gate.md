# Release gate for AI changes

Every future AI change — prompt edit, mode addition, source-routing change, model change, new AI surface, context change — must pass this gate before it ships. Record the completed checklist in the phase report. A failed item blocks release; it is never waived silently.

## A. Scope and intent

- [ ] The change is inside the supported scope in `purpose-and-scope.md`
- [ ] The change does not add an unsupported behaviour, directly or as a side effect
- [ ] The safety categories affected are named explicitly
- [ ] If a new surface is added, its mode, context builder and visibility rules are documented

## B. Data and privacy

- [ ] The exact data sent to the model is listed, field by field
- [ ] Data minimisation confirmed: nothing beyond the coarse allowlist reaches the request
- [ ] No journal, note, reflection, memory, media or log content is sent
- [ ] Context stays inside the 500-character cap
- [ ] Privacy impact considered and written down, including anything newly persisted
- [ ] No real user data accessed during QA; all QA used synthetic input
- [ ] No personal or health data added to logs, analytics or error messages

## C. Safety

- [ ] Source routing reviewed: the change cannot send a question to an irrelevant or emergency-only page
- [ ] Urgent escalation reviewed: every Red and Crisis path in `escalation-matrix.md` for the affected journeys still escalates, escalation-first
- [ ] Any new hard pattern checked for false positives on routine questions
- [ ] Banned-phrase tests pass
- [ ] Ambiguity handling checked: broad terms still clarify, urgent wording still bypasses clarification
- [ ] Recap-only surfaces still carry no clinical or escalation wording
- [ ] Prompt-injection spot check: an instruction embedded in the question or context does not change behaviour

## D. Output hygiene

- [ ] No external links, markdown links or raw URLs survive in any answer
- [ ] No "Sources", "References" or "Further reading" section appears
- [ ] No retrieval wording is exposed
- [ ] The approved trust line is present and unchanged, and no superseded trust copy has returned
- [ ] The single approved fallback line is used for a genuine inability to answer

## E. Experience QA

- [ ] `/ask` regression: empty, clarification, answer, follow-up and urgent states
- [ ] Companion panel regression: launcher visibility, route-to-mode, session-only turns, "Start again", 404 suppression, stop and retry
- [ ] Mobile QA at 390px: no horizontal overflow, readable measure, 44px tap targets
- [ ] Desktop QA at 1440px: answer column contained, hierarchy intact
- [ ] Loading, empty, error, cancelled and rate-limited states all render sensibly
- [ ] Keyboard and screen-reader behaviour preserved: labelled controls, visible focus, semantic headings

## F. Engineering checks

- [ ] `npx tsgo --noEmit -p tsconfig.json` passes
- [ ] `npx vitest run` passes in full
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] New behaviour has focused tests, and the evaluation dataset was extended if a new risk was introduced
- [ ] No schema, RLS, auth, route, SEO or sitemap change was made unintentionally

## G. Rollback

- [ ] Rollback plan written: which prompt, model, source list or flag returns to which previous value
- [ ] Rollback is possible without a database migration
- [ ] Model and prompt version recorded in the phase report so a regression can be attributed
- [ ] The kill-switch route is known and tested (see `observability-and-incidents.md`)

## H. Memory gate

Applies only to a change that introduces, widens or reads companion memory. No memory exists today; the design is in `memory-design.md`, the schema and RLS review is in `memory-schema-rls-design.md`, and the only built artefact is the front-end prototype described in `memory-settings-prototype.md`, which stores nothing. The Phase 29J pre-build gate outcome is recorded in `memory-mvp-readiness.md`.

**Status as of Phase 29J:** this gate is **not yet satisfiable**. Several mandatory items remain outstanding. No migration, table, RLS policy, edge function, application code or AI behaviour change may be made until the gate is closed.

Every item below must be complete before any memory implementation ships. A failed item blocks release outright.

- [ ] Legal and privacy review of memory as special category data, recorded in writing
- [ ] Consent copy approved from the Phase 29I prototype wording, and the consent version recorded against stored items
- [ ] Sensitivity taxonomy approved, including the exclusion of category F (symptoms, loss, fertility treatment, mental health, abuse, baby health, medication)
- [ ] Memory is off by default, and each level is opted into separately from account creation and analytics consent
- [ ] Journal, reflection and media content stays behind its own separate toggle, default off
- [ ] Deletion behaviour specified and wired into `supabase/functions/delete-account/index.ts` in the same change that creates persistence
- [ ] Export behaviour specified alongside the person's other data
- [ ] Schema and RLS design reviewed against `memory-schema-rls-design.md`: owner-scoped policies, grants in the same migration, no anon grant, no client `DELETE` grant, no cross-journey read path
- [ ] Service-role access reviewed: memory is read only through one named access module, never a direct table read from an edge function, because service-role bypasses RLS
- [ ] Deleted, disabled, paused and expired memory confirmed excluded from every read path that reaches the model
- [ ] Category F and journal content confirmed blocked structurally, by the enum and source set, not only by a consent flag
- [ ] The migration that creates memory tables reviewed separately, as its own change, after every item above passes
- [ ] Audit logging approach reviewed: no question, answer, journal or health content in logs
- [ ] No real user data used in testing; every memory case synthetic
- [ ] Memory evaluation prompts added and passing (see `eval-dataset-v1.md`)
- [ ] Rollback plan defined and possible without a migration
- [ ] Memory-off kill switch defined and tested, able to disable memory reads globally without a deploy
- [ ] Incident process in `observability-and-incidents.md` updated with memory-specific severities
- [ ] Confirmed the companion cannot write memory from a conversation without an explicit user action

## I. Grounding gate

Applies to any change to source routing, the approved source allowlist, how background material is fetched or used, or any proposal to ground answers in this product's own content. The full assessment is in `content-grounding-readiness.md`.

**Status (Phase 30B, closed).** The external-routing checklist below was satisfied for the postpartum recovery, weaning and toddler routes: URLs verified reachable, HTML and non-thin; ordering collisions reviewed and recorded; `AI_SOURCE_ROUTING_VERSION` bumped to `30B-source-routing-v1`; routing tests added with false-positive checks; hygiene, escalation order and recap ungroundedness unchanged. The Start of You content block below is unchanged and still blocked.

For a change to external source routing:

- [ ] Every added URL checked reachable, UK, non-commercial and topically relevant before it is added
- [ ] Rule ordering reviewed for collisions, and any intentional collision recorded
- [ ] `AI_SOURCE_ROUTING_VERSION` bumped in `aiVersions.ts`
- [ ] Routing evaluation rows added for each new or reordered rule, including false-positive checks that routine phrasing does not reach a safety or urgent-only page
- [ ] Thin-evidence behaviour confirmed: a poor fetch degrades to a calm general answer, never a refusal and never a source complaint
- [ ] Safety no-regression run: every Red and Crisis row still escalates, escalation-first
- [ ] Output hygiene unchanged: no URL, source block, citation list or retrieval wording in any answer
- [ ] Escalation still decided before source selection, fetching and the model call
- [ ] `first_year_day_recap` still ungrounded

**Start of You content grounding: blocked.** (Phase 30C note: the metadata model, approval registry and default-deny eligibility helpers now exist in `src/lib/grounding/`, but no article satisfies them — `listGroundingEligibleSlugs()` returns empty, and nothing in the AI path reads them. Phase 30D note: registry drift is now guarded by `src/test/articleGroundingDrift.test.ts` — full 206-article coverage, no orphans, no duplicates, zero approved — and the review queue and per-article template are in `article-grounding-review-queue.md` and `article-grounding-review-template.md`. Still zero articles approved. Phase 30E note: Tier 1 per-article review is complete — 206 records screened (110 live, 44 draft, 52 unknown), the 12 support-journey records that Phase 30D placed in Tier 1 corrected out of it and requeued for Phase 30H, six practical live articles body-reviewed and all excluded, 0 accepted Tier 1 candidates, 0 registry changes, 0 candidates, 0 approved. Owner, content version, grounding reviewer and reviewed date remain Missing for all 206, and the 52 unknown editorial statuses carry to Phase 30F.) This product's own articles are not approved as grounding material. No article may be read by the AI until every item below is recorded per article, plus an explicit default-off grounding-approval flag.

- [ ] Original content, medically reviewed where needed by a named reviewer
- [ ] Reviewed date present and inside the freshness window for its sensitivity level
- [ ] Structured source list present
- [ ] Topic tags and journey tags present, from a closed vocabulary
- [ ] Sensitivity level present: routine, health-relevant or safety-critical
- [ ] Owner and reviewer recorded separately
- [ ] Content version recorded
- [ ] Archived and deprecated lifecycle supported in the record the AI reads, and excluded structurally
- [ ] Grounding-approval flag present and default off, per article
- [ ] Safety-critical content confirmed never eligible, at any review level
- [ ] Evaluation examples added, including archived, deprecated and review-lapsed cases
- [ ] Rollback defined and possible without a migration
- [ ] Confirmed no user-authored content (journal, reflection, note, log, memory, media) is in the eligible set
- [x] Registry drift guard in place: every article has a record, every record has an article, no duplicates (Phase 30D)
- [x] Tier 1 per-article review batch completed with zero accepted candidates and zero registry changes (Phase 30E)
- [x] Review queue and per-article review template published (Phase 30D)

**Phase 30F note.** Governance and editorial-status resolution only. 52 unknown editorial statuses investigated on explicit repository evidence: 7 resolved to `live` (six `familyArticleData.ts` records with typed `status: "ready"`, plus `two-week-wait` on the inventory's explicit `currentStatus: "live"`), 0 draft, 0 archived, 0 deprecated, 45 still unknown and blocked. Registry split now 117 live / 44 draft / 45 unknown of 206. The governance contract is published in `article-grounding-governance.md` (content owner, content version, grounding reviewer, reviewed date, source-list validation, sensitivity decision rules, candidate authority, approval authority, review evidence package, decision matrix) and the per-record log in `article-grounding-editorial-status-resolution.md`. No governance metadata was invented, no sensitivity assigned, no sources added; 31 records still have no source list. 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged. Article grounding remains blocked and the library is not grounding-ready.

- [x] Governance contract for blocked → candidate → approved published, with candidate and approval authority defined (Phase 30F)
- [x] Editorial statuses resolved where explicit repository evidence exists; 45 unresolved records remain blocked (Phase 30F)

**Phase 30G note.** Tier 2 review and classification only. Funnel: 206 total; 44 draft and 45 unknown status-ineligible; 117 verified-live; minus 9 verified-live support records reserved for Phase 30H and 6 Phase 30E practical exclusions = 102 screened; 92 metadata-routed exclusions (30I 49, 30J 30, later health/safety review required 12, 30H 1) and a 10-record body-review shortlist producing 5 body-reviewed exclusions and 5 accepted future Tier 2 candidates. No registry record changed, no governance metadata invented, no sensitivity written to the registry. 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged. Article grounding remains blocked and the library is not grounding-ready.

- [x] Tier 2 low-risk general education review completed with 5 accepted future candidates, 0 registry changes and 0 approvals (Phase 30G)

**Phase 30H note.** Wellbeing and sensitive support review, classification only. 11 verified-live records body-reviewed; the 3 unknown support records stayed status-blocked and outside the pool. 0 accepted future wellbeing candidates, 4 routed to Phase 30I, 7 routed to Phase 30J, 0 later health/safety review required. Source list absent for `two-week-wait`, `chemical-pregnancy` and `trying-again-after-miscarriage`; owner, content version, grounding reviewer, reviewed date, `approvedBy` and `approvedAt` Missing for all 11. No governance metadata invented, no sensitivity written to the registry. 0 registry changes, 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged. Article grounding remains blocked and the library is not grounding-ready.

- [x] Wellbeing and sensitive support review completed with 0 accepted candidates, 0 registry changes and 0 approvals (Phase 30H)

**Phase 30I note.** Health-reviewed article review, classification only. 57 unique verified-live records body-reviewed (53 from Phase 30G, 4 from Phase 30H, no overlap). 21 accepted future health-reviewed candidates — routine test, scan, appointment, cycle-physiology and service-pathway education with non-urgent signposting only — recorded in documentation while registry candidate records remain 0. 33 routed to Phase 30J, 2 returned to the wellbeing stream, 1 recorded as later safety adjudication required; `pregnancy-after-loss` escalated from the Phase 30H 30I routing to 30J. 11 of 57 have no source list; owner, content version, grounding reviewer, reviewed date, `approvedBy` and `approvedAt` Missing for all 57. Existing editorial medical-review metadata was captured as context only and not treated as grounding-review evidence. 0 registry changes, 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged. Article grounding remains blocked and the library is not grounding-ready.

**Phase 30J note.** Safety-sensitive and not-allowed classification, review only. 89 unique verified-live records adjudicated across six provenance groups with no overlap; every record received dedicated body review. Documentation-only proposed sensitivities: 35 `not_allowed` (crisis and mental health 8, pregnancy loss and adverse findings 4, medication and dosing 8, time-critical triage 11, infant safe sleep 4), 41 `safety_sensitive`, 9 `health_reviewed` reconciliation required, 4 `low` reconciliation required. `not_allowed` was applied only on affirmative evidence that ordinary safety-sensitive governance would be insufficient; uncertainty produced `safety_sensitive`. Live-corpus reconciliation: 5 + 21 + 2 + 89 = 117 verified-live records, matching the registry exactly. 11 records have no source list and 11 have no `lastUpdated`, blocking staleness evaluation. No sensitivity was written to the registry and no governance metadata was invented. 0 registry changes, 0 candidates, 0 approved, `listGroundingEligibleSlugs()` returns `[]`, `AI_SOURCE_ROUTING_VERSION` unchanged. Article grounding remains blocked and the library is not grounding-ready.

- [x] Health-reviewed article review completed with 21 documentation-only accepted candidates, 0 registry candidate records, 0 registry changes and 0 approvals (Phase 30I)
- [x] Safety-sensitive and not-allowed classification completed for all 89 remaining verified-live records, with 0 registry changes and 0 approvals (Phase 30J)

