# Phase 30F — Grounding Governance Metadata & Editorial Status Resolution

Governance and editorial-status resolution only. No article is approved, no article content reaches AI runtime, no RAG/retrieval/vector search/embeddings/ingestion/chunking, no prompt, mode, safety, endpoint, renderer, Ask, companion, schema, route or SEO change. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1` and `listGroundingEligibleSlugs()` stays `[]`. Phase 30G is not started.

## Evidence reconciliation (corrects the earlier draft)

The earlier draft was inconsistent because it scanned `src/data/articleInventory.ts` for a `status:` field when the inventory actually uses `currentStatus:`. Corrected, verified account of the 52 originally-unknown records:

- **Appearing in `articleInventory.ts`: 1 slug — `two-week-wait`**, with two entries. The legacy entry (`id: "legacy:two-week-wait"`, `sourceFile: "src/data/articleData.ts"`, `system: "legacy-article"`) carries the inventory's explicit editorial-status field `currentStatus: "live"` with `contentState: "final"`, describing exactly the registry record in question, so it resolves to **live** (evidence category `explicit-inventory-status-field`). The second entry is a topic page (`src/data/ttcTopicData.ts`, `currentStatus: "topic-page"`), a different surface, and is not used as evidence. Presence in the inventory is not the evidence; the explicit `currentStatus` field is.
- **6 records** live in `src/data/familyArticleData.ts`, which has the explicit typed field `status: "draft" | "ready"`. All six read `ready`, the repository's explicit publication-ready state used by the existing publication/sitemap logic: `second-time-parenting`, `staying-connected-as-parents`, `calmer-evenings-after-busy-days`, `family-sick-days-at-home`, `planning-family-days-out`, `simple-family-play-ideas`. Evidence category `explicit-dataset-status-field`. These resolve to **live**. Route existence and visual availability are not used as evidence.
- **45 records** live in `src/data/articleData.ts`, whose `ArticleData` interface has no editorial-status, publication, draft, archived or deprecated field, and which are absent from `articleInventory.ts`. Route existence, file existence, title, description, body completeness, `lastUpdated`, medical-review metadata, source-list presence, search visibility and rendering are all rejected as evidence. These **remain unknown** and stay blocked.

Verified outcome: 7 resolved to live, 0 draft, 0 archived, 0 deprecated, 45 still unknown, 7 registry editorial-status changes. Post-30F split: **117 live, 44 draft, 45 unknown** of 206. All Phase 30F documents and tests use these corrected numbers only; if execution re-verification differs, the actual verified result is reported instead.

## Registry change

Only the `editorialStatus` field of the 7 evidence-backed records (the 6 family records plus `two-week-wait`) changes, `unknown` → `live`. Their `approvalStatus` stays `blocked_missing_metadata` (owner, content version, reviewer, reviewed date and sensitivity all still absent), so nothing becomes candidate, approved or eligible. No governance field is populated anywhere: no owner, contentVersion, reviewer, reviewedDate, sensitivity, approvedBy or approvedAt is invented.

## New document 1 — `docs/ai/article-grounding-editorial-status-resolution.md`

Metadata only, one row per originally-unknown record (all 52): slug, title, journey, topics, previous status, resolved status, evidence category, concise evidence note, registry changed yes/no, current approval status, next action. Plus totals: resolved live 7, draft 0, archived 0, deprecated 0, still unknown 45, registry records changed 7. Evidence categories used: `explicit-dataset-status-field`, `explicit-inventory-status-field` and `no-authoritative-status-evidence`. No article body, sections, prose, takeaways, summaries, images or media are reproduced.

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
