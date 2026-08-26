# Phase 30F — Grounding Governance Metadata & Editorial Status Resolution

Governance and editorial-status resolution only. No article is approved, no article content reaches AI runtime, no RAG/retrieval/vector search/embeddings/ingestion/chunking, no prompt, mode, safety, endpoint, renderer, Ask, companion, schema, route or SEO change. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1` and `listGroundingEligibleSlugs()` stays `[]`. Phase 30G is not started.

## Pre-plan evidence screen (drives the resolution outcome)

All 52 `unknown` registry records were traced to their source dataset:

- **6 records** live in `src/data/familyArticleData.ts`, which carries an explicit typed field `status: "draft" | "ready"`. All six read `status: "ready"`: `second-time-parenting`, `staying-connected-as-parents`, `calmer-evenings-after-busy-days`, `family-sick-days-at-home`, `planning-family-days-out`, `simple-family-play-ideas`. Explicit dataset status field is authoritative evidence, and `ready` is the same signal that gates sitemap inclusion. These resolve to **live**.
- **46 records** live in `src/data/articleData.ts`. That dataset's `ArticleData` interface has **no** editorial status, draft, archived, deprecated or publication field of any kind, and none of the 46 appears in `src/data/articleInventory.ts` (51 of the 52 are absent from the inventory; the one present, `two-week-wait`, has no `status` entry that resolves it). Route existence, file existence, titles, `lastUpdated` and medical-review metadata are explicitly not accepted as evidence. These **remain unknown** and stay blocked.

Expected outcome: 6 resolved to live, 0 to draft, 0 to archived, 0 to deprecated, 46 still unknown, 6 registry records changed. Post-30F editorial split: **116 live, 44 draft, 46 unknown**.

## Registry change

Only the `editorialStatus` field of the 6 family records changes, `unknown` → `live`. Their `approvalStatus` stays `blocked_missing_metadata` (owner, content version, reviewer, reviewed date and sensitivity are all still absent), so nothing becomes candidate, approved or eligible. No governance field is populated anywhere: no owner, contentVersion, reviewer, reviewedDate, sensitivity, approvedBy or approvedAt is invented.

## New document 1 — `docs/ai/article-grounding-editorial-status-resolution.md`

Metadata only, one row per originally-unknown record (all 52): slug, title, journey, topics, previous status, resolved status, evidence category, concise evidence note, registry changed yes/no, current approval status, next action. Plus totals: resolved live 6, draft 0, archived 0, deprecated 0, still unknown 46, registry records changed 6. Evidence categories used: `explicit-dataset-status-field` and `no-authoritative-status-evidence`. No article body content is reproduced.

## New document 2 — `docs/ai/article-grounding-governance.md`

The governance contract for blocked → candidate → approved. Roles and requirements only, no invented people, no real names. Sections:

- **A. Content owner** — responsibility, who may hold it, how assignment is recorded, re-confirmation triggers, missing owner blocks. Author, git contributor, medical reviewer and last editor are explicitly not automatic owners.
- **B. Content version** — identifies the exact reviewed article state; format, when a new version is minted, which changes invalidate the reviewed version, how it links to approval, what happens after content changes. `lastUpdated` is not a substitute. None populated in 30F.
- **C. Grounding reviewer** — responsibility, independence and competence, when a specialist is required, how grounding review differs from ordinary editorial review and from existing `medicallyReviewed` metadata. A medical reviewer is never automatically the grounding reviewer.
- **D. Reviewed date** — the date the specific content version passed grounding review; not `lastUpdated`, publication date, file mtime or medical-review date. Staleness and renewal rules by sensitivity.
- **E. Source-list validation** — requirement by sensitivity, authority and reliability expectations, freshness, broken/unavailable sources, conflicting sources, UK relevance, stronger review for medical/safety-sensitive sources, sign-off, how validation is recorded. Presence alone never means approval. No sources added or rewritten in 30F.
- **F. Sensitivity governance** — decision rules for `low`, `wellbeing`, `health_reviewed`, `safety_sensitive`, `not_allowed`: supporting evidence, who proposes, who confirms, ambiguity defaults to the stricter level, `not_allowed` is terminal. No article is classified in 30F.
- **G. Candidate authority** — who may set `candidate`, and the minimum documented evidence required. Candidate is not approval and not runtime eligibility.
- **H. Approval authority** — who may set `approved`, never automatic, sign-off requirements escalating by sensitivity, how `approvedBy` and `approvedAt` are created. Nothing approved in 30F.
- **I. Review evidence package** — the minimum record set (slug, content version, editorial status, sensitivity, owner, reviewer, reviewed date, source-list result, review notes, specialist sign-off, eval examples, candidate decision, approval decision, approvedBy, approvedAt, rollback/replacement ref). No false evidence is created.
- **Decision matrix** — one concise table across the five sensitivity levels covering owner requirement, reviewer requirement, specialist/clinical review, source list, eval requirement, candidate authority, approval authority, and whether approval is theoretically possible. `not_allowed` can never become eligible.

## Tests

`src/test/articleGrounding.test.ts` and `src/test/articleGroundingDrift.test.ts` stay authoritative. Added/updated assertions pin: the new editorial-status counts (116 live / 44 draft / 46 unknown of 206), the exact six slugs whose status changed, zero candidate records, zero approved records, `listGroundingEligibleSlugs() === []`, unknown slug not approved. All existing guarantees stay: full slug coverage both ways, no duplicates, no dataset imports in runtime grounding modules, metadata-only helper output, unchanged source routing and version constant, unchanged answer hygiene. Dataset imports remain test-only.

## Documentation updates

`article-grounding-review-queue.md`, `content-grounding-readiness.md`, `release-gate.md`, `system-map.md`, `roadmap.md`, `README.md` each record: Phase 30F purpose, 52 unknown investigated, 6 resolved, 46 still unknown, the governance framework and each rule set created (owner, version, reviewer, reviewed date, source-list validation, sensitivity rules, candidate authority, approval authority, review evidence), zero candidates, zero approvals, AI runtime unchanged, grounding still blocked. No document claims grounding readiness. The locked roadmap 30F → 30G → 30H → 30I → 30J → 30K → 30L → 31A is preserved unchanged.

## Recommendation on 30G

30F closes with the governance contract defined but every article still missing owner, content version, reviewer, reviewed date and sensitivity, and 46 editorial statuses unresolved. The plan's recommendation will state whether Tier 2 can safely begin on that basis, with the unresolved-evidence gap named explicitly.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The known `src/integrations/supabase/previewAuthStorage.ts` lint issue is left untouched and reported as pre-existing and out of scope.

## Report

The exact 20 requested items, with the close verdict answering all eleven questions.
