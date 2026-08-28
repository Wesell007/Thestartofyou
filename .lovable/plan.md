# Phase 30K — Human Approval and Initial Approved Corpus (revised plan, not implemented)

Governance-execution phase, split into staged gates. The first execution makes **zero registry changes**. No article becomes candidate or approved in that pass. No runtime connection at any point. Phase 30L is not started.

## 1. Exact five-article batch

`second-time-parenting`, `staying-connected-as-parents`, `calmer-evenings-after-busy-days`, `planning-family-days-out`, `simple-family-play-ideas`. No sixth article, no health-reviewed, safety-sensitive, reconciliation, not_allowed or safety-hold record.

## 2. Pre-verification findings (re-verified in Gate A at execution)

All five, read from `articleGroundingRegistry.ts` and `familyArticleData.ts`:

| Slug | editorial | archived | deprecated | approvalStatus | sensitivity | hasSourceList | owner/contentVersion/reviewer/reviewedDate | dataset status | lastUpdated | reviewedBy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `second-time-parenting` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `staying-connected-as-parents` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `calmer-evenings-after-busy-days` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `planning-family-days-out` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `simple-family-play-ideas` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |

Journeys all `family`; topics `growing-families`, `relationships`, `family-basics`, `travel-days-out`, `play-connection`; 7 sections and 5 key takeaways each. The family record shape has no `sources`, `references` or `medicallyReviewed` field.

## 3. Corrected content-digest design

- Algorithm: SHA-256. The **authoritative stored value is the full 64-character hex digest**. Documentation may additionally show a short prefix for readability, clearly labelled as display-only.
- Digest covers **substantive user-facing content only**: `slug`, `title`, `description`, `intro`, ordered section headings and bodies, ordered `keyTakeaways`, plus any further substantive user-facing content field discovered during implementation (each addition recorded in the digest specification before use).
- Explicitly **excluded**: `lastUpdated`, `status`, `reviewedBy`, `owner`, `reviewer`, `reviewedDate`, any approval metadata, and presentational fields (`seoTitle`, `seoDescription`, `readTime`, `relatedSlugs`, imagery). A metadata-only edit therefore leaves the fingerprint unchanged.
- Canonicalisation: stable field order, arrays in source order, JSON serialisation with normalised whitespace, documented once so the digest is reproducible.
- Script: `scripts/grounding-content-digest.ts`, run on demand, printing slug plus full digest only. Never imported by any runtime module, never printing article text.
- Storage: `docs/ai/grounding-approvals/content-digests.json` holds the full digest per slug and the digest-specification version. The registry stores only `contentVersion`.
- Versioning: `<slug>@<n>`, first authorised version `<slug>@1`. A new version is minted when the substantive content changes; approvals attach to one version and lapse when it changes.

## 4. Binding source evidence to the approved version

The evidence package binds four things together as one unit: `contentVersion`, the full content digest, the source-validation state, and the exact source evidence used where sources are required.

- If the human reviewer concludes "no factual claim requiring source attribution", that explicit decision is recorded **against the exact full digest**, with reviewer identity and the timestamp of the decision.
- If sources are required, the package references an exact source-evidence manifest entry (each source URL, the claim it supports, the check date and the signatory), also bound to that digest.
- Any later change to sources, or a source becoming stale or broken, invalidates the source-validation state and requires re-validation before approval remains valid, even when the content digest is unchanged.
- `hasSourceList` is a coarse boolean and is never treated as source validation. The binding above is the authority.

## 5. Source remediation stays governance-only where possible

Two distinct things: **A. editorial article sources** that belong in the article dataset and are part of the published page, and **B. grounding-governance source evidence** that exists purely to justify approval. Phase 30K prefers B: a grounding-only source manifest at `docs/ai/grounding-approvals/source-evidence.json`, satisfying the Phase 30F contract without touching the public article model. No article dataset, type or schema is extended. If implementation shows the governance contract genuinely cannot be satisfied without a data-model change, execution stops and requests explicit approval; nothing is extended silently.

## 6. Confirmed registry contract

Verified in `src/lib/grounding/articleGroundingTypes.ts` and `ALLOWED_GROUNDING_FIELDS`. Existing fields: `slug`, `journey`, `topics`, `sensitivity`, `contentVersion`, `owner`, `reviewer`, `reviewedDate`, `hasSourceList`, `editorialStatus`, `archived`, `deprecated`, `approvalStatus`, `approvedBy`, `approvedAt`, `approvalNotes`, `replacementSlug`, `rollbackRef`.

- `approvalNotes` — **exists**, optional string.
- `rollbackRef` — **exists**, optional string.

No new registry field or type change is proposed. Note the metadata-only guard: every registry string must stay under 120 characters, so `approvalNotes` may hold only a short pointer to the evidence document, never a rationale. Everything else — digests, source evidence, rationales, decision logs, rollback detail — stays in `docs/ai/grounding-approvals/`.

## 7. Mechanical values Lovable may compute vs human decisions it may never invent

Lovable may compute, once the corresponding human decision exists: the full content digest; the version label `<slug>@1` for a first authorised version; the ISO timestamp captured at the moment an explicit review sign-off is applied (`reviewedDate`); the ISO timestamp captured at the moment an explicit approval is applied (`approvedAt`); gap lists, checklists, manifests and counts.

Lovable may never invent or infer: content owner, grounding reviewer, `approvedBy` identity, approval or review authority, sensitivity confirmation, claim-attributability or source-validation conclusions, clinical or product-safety sign-off, or any source. Ownership is never inferred from authorship, git history or editing activity. No timestamp is generated before its decision occurs.

## 8. Content-owner scope

Either one accepted owner for all five, or a different accepted owner per article. Both are valid; what is required is that every article has an explicitly accepted accountable owner before candidate progression. The same flexibility and the same explicitness apply to grounding-review evidence.

## 9. Staged execution

### Stage 1 — evidence preparation (first execution, registry changes = 0)

Re-verify the five (editorial status, archived, deprecated, approvalStatus, sensitivity, `hasSourceList`, existing article metadata, governance fields), and stop any article that is no longer live from progressing. Build the digest script, compute the five full SHA-256 fingerprints, and write the digest manifest. Create the evidence-document structure with blank human-decision fields. Create the source-validation and source-evidence manifest structures. Record current governance gaps per article. Confirm the claim-attributability question is reviewable and prepare the reviewer's checklist. Add drift and audit tests. Document the seven-record safety hold. Update governance documentation.

No candidate, no approval, no sensitivity written, no owner or reviewer value invented, no registry file touched.

### Stage 2 — human decision checkpoint (stop)

The five evidence packages are returned. You supply or arrange: content owner acceptance, grounding reviewer, `low` sensitivity confirmation, claim-attributability and source-validation result. No further implementation happens until then.

### Stage 3 — candidate transition

Article by article, never as a batch. Requires: `live` re-verified; confirmed `low` sensitivity; accepted owner; minted `contentVersion` with matching full digest; completed review record; source validation passed or formally recorded as not required; grounding reviewer plus owner agreement. Registry fields written at this gate only: `sensitivity`, `contentVersion`, `owner`, `reviewer`, `reviewedDate`, `approvalStatus: "candidate"`, and a short `approvalNotes` pointer. `approvedBy` and `approvedAt` stay absent. Candidate confers no eligibility.

### Stage 4 — approval

A separate later operation, never combined with Stage 3. Authority at `low`: grounding reviewer plus content owner. On the human decision, writes `approvalStatus: "approved"`, `approvedBy` as given, `approvedAt` captured at that moment, and `rollbackRef` pointing at the evidence document. Incomplete evidence means the record stays candidate or blocked. Zero approvals is a valid outcome.

## 10. Exact proposed registry changes

Stage 1: none. Stage 3 and Stage 4: at most five records, fields as listed above, all already part of the existing contract. Registry totals stay 206 / 117 live / 44 draft / 45 unknown throughout.

## 11. Files, scripts and tests proposed

Scripts: `scripts/grounding-content-digest.ts`.

Docs under `docs/ai/grounding-approvals/`: `README.md`, `digest-specification.md`, `content-digests.json`, `source-evidence.json`, `source-validation.md`, `human-decisions.md`, five per-article evidence documents named by slug, `initial-approved-corpus.md` (valid when empty), `rollback-and-re-review.md`. Plus `docs/ai/article-grounding-safety-hold.md`, and updates to `article-grounding-review-queue.md`, `content-grounding-readiness.md`, `release-gate.md`, `roadmap.md`, `README.md`.

Tests, new `src/test/articleGroundingApproval.test.ts` plus additions to existing suites:

- Stage 1 proves the registry is byte-identical to the Phase 30J baseline for all 206 records;
- later stages allow changes only in the five authorised slugs;
- digest determinism, full 64-hex length, and manifest match recomputed from the dataset;
- digest ignores `lastUpdated`, `status` and `reviewedBy` changes but changes when a section, takeaway, title, description or intro changes;
- candidate requires complete candidate evidence; approved requires complete approval evidence; approved without `approvedBy` or `approvedAt` fails;
- `sensitivity` present where required; `contentVersion` present and matching `<slug>@<n>`;
- never eligible: draft, unknown, archived, deprecated, `not_allowed`, the 7 safety-hold slugs, the 15 reconciliation slugs, candidates, and any record with defaulted or missing metadata;
- `listGroundingEligibleSlugs()` is always a subset of the five and only genuinely approved records;
- runtime grounding modules still import no article dataset and no AI runtime module; the digest script is imported by no runtime module;
- `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`; source-routing and answer-hygiene suites unchanged.

## 12. Corpus accounting, unchanged

5 accepted-future Tier 2 + 21 accepted-future health-reviewed + 41 accepted-future safety-sensitive + 15 reconciliation required (2 wellbeing, 9 health-reviewed, 4 low) + 28 supported proposed not_allowed + 7 human-safety-review hold = **117 live**; registry 206 total.

Phase 30K touches only the five and alters the classification of none of the other 112. The 21 health-reviewed will later require independent grounding review plus named clinical sign-off on the exact version, per-claim validated sources, 12-month renewal and eval coverage. The 41 safety-sensitive will later require the strictest route: independent reviewer, named clinical reviewer and product-safety owner both signing the exact version, clinically co-signed sources, 6-month renewal and mandatory eval coverage. Neither bar is weakened. The 15 reconciliation records are never silently converted; a separate explicit human reconciliation step handles them. The 7 held records stay distinct from the 28 supported not_allowed records, cannot become candidate, approved or eligible, are not treated as settled, and are not resolved automatically.

## 13. Runtime boundary

No RAG, retrieval, embeddings, vector search, ingestion, chunking, runtime article import or runtime article summary. No prompt, mode, safety-rule, endpoint, source-routing, Ask, companion, schema, route or SEO change. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`. Even a fully approved, eligible record remains disconnected from the AI. Phase 30L is retrieval readiness; Phase 31A is the first controlled grounded implementation.

## 14. Handling incomplete or rejected records

Nothing is part-filled to complete a template. A rejection is recorded with reason and date and the record returns to or stays at `blocked_missing_metadata`. Articles progress independently, so one rejection never drags another. A stricter sensitivity proposal removes the article from the batch immediately.

## 15. Validation commands

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. The pre-existing `src/integrations/supabase/previewAuthStorage.ts:38 prefer-const` error and the 10 pre-existing react-refresh warnings are left untouched and reported as out of scope.

## 16. Implementation risks

Fabrication pressure on governance fields (mitigated by a zero-write first stage and failing tests); digest input drift (mitigated by a written digest specification pinned before first use); candidate-and-approval collapse (mitigated by separate stages); "optional sources" misread as "no attributability check" (mitigated by an explicit per-article finding bound to the digest); batch creep (mitigated by an authorised-slug test); stale pre-verification (mitigated by Gate A re-verification).

## 17. Stop point

Execution stops after Stage 1 with registry changes = 0, and the five evidence packages are returned for human decisions. No candidate transition, no approval, no Phase 30L work follows without a further explicit go-ahead.
