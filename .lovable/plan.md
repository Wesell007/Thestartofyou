# Phase 30K — Human Approval and Initial Approved Corpus (plan only)

Governance-execution phase. No runtime connection, no retrieval, no article content reaching the AI. Phase 30L is not started. Nothing below is implemented yet.

## 1. Exact five-record initial batch

`second-time-parenting`, `staying-connected-as-parents`, `calmer-evenings-after-busy-days`, `planning-family-days-out`, `simple-family-play-ideas`. No expansion, no substitution. Every other live, draft, unknown, reconciliation, accepted-future health-reviewed, accepted-future safety-sensitive, supported not_allowed and safety-review-hold record stays outside this phase.

## 2. Current pre-verification findings (read now, re-verified in Gate A at execution)

All five, verified against `src/lib/grounding/articleGroundingRegistry.ts` and `src/data/familyArticleData.ts`:

| Slug | editorialStatus | archived | deprecated | approvalStatus | sensitivity | hasSourceList | owner / contentVersion / reviewer / reviewedDate | dataset status | lastUpdated | reviewedBy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `second-time-parenting` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `staying-connected-as-parents` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `calmer-evenings-after-busy-days` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `planning-family-days-out` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |
| `simple-family-play-ideas` | live | false | false | blocked_missing_metadata | absent | false | all absent | ready | July 2026 | undefined |

Journeys: all `family`. Topics: `growing-families`, `relationships`, `family-basics`, `travel-days-out`, `play-connection`. Each article has 7 sections and 5 key takeaways. The family dataset record shape carries no `sources`, `references` or `medicallyReviewed` field at all, so no source metadata exists to validate and none can be attached without a data-model change.

## 3. Source-list findings

`hasSourceList` is `false` for all five, and this is re-checked in Gate C rather than inherited from Phase 30G. Under the Phase 30F contract a source list is **optional** at `low` sensitivity, but every factual claim must be attributable. Consequences:

- Source presence is not the gate; **claim attributability** is. Gate C requires a human to read each article and record either "no factual claim requiring attribution" or "claims present, sources required".
- If any article is found to carry an attributable factual claim, it needs a source-remediation action before candidate status, handled as a separate approval item inside Phase 30K. Lovable researches or supplies no sources and adds none from memory.
- A record whose required source list is missing stays blocked. Zero of five reaching approval is an acceptable outcome.

## 4. Governance gaps (all five, all blocking today)

Missing: content owner, `contentVersion` and digest, grounding reviewer, `reviewedDate`, confirmed sensitivity, source-validation result, candidate decision, approval decision, `approvedBy`, `approvedAt`, rollback/replacement reference, eval examples (recommended at `low`, not required). That is 12 of the 16 evidence-package items unsatisfied; only slug, editorial status evidence, archived/deprecated verification and topic metadata exist mechanically.

## 5. Content-version and digest design

Uses the existing model, no new registry field unless the review below forces one.

- `contentVersion` = `<slug>@1` for a first grounding review, minted **by the content owner**, never by Lovable.
- Digest = SHA-256, hex, first 16 characters, over a canonical JSON serialisation of the reviewed article state.
- Digest input fields (family dataset): `slug`, `title`, `description`, `intro`, ordered `sections` (heading and body), ordered `keyTakeaways`, `lastUpdated`, `status`, `reviewedBy` when present. Excluded: SEO fields, `readTime`, `relatedSlugs`, imagery and any presentational metadata.
- Computation: a repo script, `scripts/grounding-content-digest.ts`, run on demand. It prints slug and digest only, never article text, and is not imported by any runtime module.
- Storage: the digest lives in the per-article evidence document under `docs/ai/grounding-approvals/`, plus a machine-readable manifest `docs/ai/grounding-approvals/content-digests.json`. The registry keeps only `contentVersion`.
- Invalidation: any change to claims, guidance, numbers, thresholds, safety wording, scope, sources, or added/removed sections mints a new version and lapses approval. Presentational-only edits do not, and the owner records them as such.
- Drift enforcement: a new test recomputes the digest for every article that carries a `contentVersion` and fails if it differs from the manifest. That test failing is the mechanism that forces re-review.

**Schema question for approval:** no new registry field is proposed. If review at execution time shows the digest must live in the registry rather than the manifest, that is a `ArticleGroundingRecord` type change and Phase 30K stops for explicit approval before touching the type.

## 6. Human roles required

- **Content owner** — a named editorial accountable person for the family journey, who explicitly accepts the assignment, mints `contentVersion`, and confirms currency.
- **Grounding reviewer** — a named person competent in both the subject and generative failure modes, not the sole author. Confirms `low` sensitivity, signs source validation, and co-decides candidate and approval.
- No clinical reviewer or product-safety owner is required at `low`, and none may be invented to appear thorough.

Lovable computes and assembles only: registry state, dataset state, digests, checklists, gap lists and manifests. Lovable decides none of: owner, reviewer, sensitivity confirmation, source validation, candidate decision, approval decision, `approvedBy`, `approvedAt`, `reviewedDate`.

## 7. Sensitivity-confirmation authority (Gate D)

`low` is confirmed by the **grounding reviewer**. The Phase 30G outcome is a proposal, never registry authority. Evidence presented: slug, title, journey, topic, the Phase 30G rationale, the digest and content version, the claim-attributability finding from Gate C, and the confirmation that no clinical, urgency or red-flag passage exists. The decision, date and decider are recorded in the article's evidence document; only then may `sensitivity: "low"` be written. If the reviewer disagrees and proposes a stricter level, the article leaves the initial batch immediately, no registry sensitivity is written in this phase, and it is routed to the appropriate stricter path. Ambiguity resolves stricter, never to `low`.

## 8. Source-validation process (Gate C)

Per article: the grounding reviewer records (a) whether any factual claim requiring attribution exists, (b) whether existing sources — currently none — are sufficient, (c) which claims are unsupported, (d) whether any source is stale, broken, non-UK-authoritative or inappropriate, and (e) the validation decision with date and signatory. Presence never equals validation. Where remediation is needed, that becomes a named human action item and the record stays blocked until it completes and is re-validated.

## 9. Candidate transition process (Gate F)

Per article, independently, never as a batch operation. Candidate requires all of: editorial status `live` re-verified at execution; confirmed `low` sensitivity recorded; accepted content owner; minted `contentVersion` plus matching digest; a completed review record from `article-grounding-review-template.md`; source validation passed or formally recorded as not required; and grounding reviewer plus content owner agreement.

Registry fields written at candidate transition, and only these: `sensitivity: "low"`, `contentVersion`, `owner`, `reviewer`, `reviewedDate`, `approvalStatus: "candidate"`, and `approvalNotes` pointing at the evidence document. `hasSourceList` changes only if a source list genuinely exists. `approvedBy` and `approvedAt` stay absent. Candidate confers no eligibility — the eligibility helper already rejects any status other than `approved`, and a test must prove every candidate returns `eligible: false` with `approval_status_not_approved`.

## 10. Approval transition process (Gate G)

A separate decision, taken after candidate status exists, never in the same operation. Authority at `low`: grounding reviewer plus content owner. Only once a real human decision is supplied does the implementation write `approvalStatus: "approved"`, `approvedBy` (the human's identity as given), `approvedAt` (the ISO timestamp of the actual decision, never generated in advance), and a rollback or replacement reference. Passing candidate requirements is not grounds for approval. Any article without a supplied human decision remains `candidate` or `blocked`.

## 11. Exact proposed registry changes

Confined to at most five records in `src/lib/grounding/articleGroundingRegistry.ts`. No other record, field, type or module changes.

- Gate F (per article, on evidence): `sensitivity`, `contentVersion`, `owner`, `reviewer`, `reviewedDate`, `approvalStatus` → `candidate`, `approvalNotes`.
- Gate G (per article, on human decision): `approvalStatus` → `approved`, `approvedBy`, `approvedAt`, `rollbackRef`.
- Registry totals stay 206 / 117 live / 44 draft / 45 unknown throughout.
- If human evidence is absent, the correct implementation outcome is **zero registry edits**.

## 12. Tests to add or update

New `src/test/articleGroundingApproval.test.ts`, plus additions to the existing grounding tests:

- only the five authorised slugs differ from the Phase 30J baseline; all 201 others are byte-identical in governance fields;
- candidate requires complete candidate evidence (sensitivity, owner, contentVersion, reviewer, reviewedDate present);
- approved requires complete approval evidence; an approved record missing `approvedBy` or `approvedAt` fails;
- `sensitivity` present and confirmed wherever a record is beyond blocked; `contentVersion` present and matching `<slug>@<n>`;
- digest traceability: every record with a `contentVersion` matches the manifest digest recomputed from the dataset;
- never eligible: draft, unknown, archived, deprecated, `not_allowed`, the 7 safety-review-hold slugs, the 15 reconciliation slugs, and any unapproved record;
- `listGroundingEligibleSlugs()` contains only genuinely approved records with a complete package, and is a subset of the five;
- default-deny holds for unknown slugs and for records with defaulted or missing metadata;
- existing boundary tests still pass: runtime grounding modules import no article dataset and no AI runtime module;
- `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`; source-routing and answer-hygiene suites unchanged.

## 13. Documentation to create or update

Create under `docs/ai/grounding-approvals/`: `README.md` (batch scope and rules), five per-article evidence documents named by slug, `source-validation.md`, `human-decisions.md` (owner, reviewer, sensitivity, candidate, approval decisions with dates), `content-digests.json`, `initial-approved-corpus.md` (the manifest, including a legitimate empty state), and `rollback-and-re-review.md`. Create `docs/ai/article-grounding-safety-hold.md` for the seven unresolved records. Update `docs/ai/article-grounding-review-queue.md`, `content-grounding-readiness.md`, `release-gate.md`, `roadmap.md`, `README.md`. None of these are created in this planning step.

## 14. Handling incomplete or rejected records

Incomplete evidence keeps a record at its current status; nothing is part-filled to make a template look complete. A reviewer rejection is recorded with reason and date, the record returns to or stays at `blocked_missing_metadata`, and it is removed from the batch. Articles progress one by one, so a rejection of one never blocks or drags along another. An initial corpus of four, one or zero approved articles is a valid Phase 30K result.

## 15. The seven safety-review-hold records

`emotional-impact-of-ivf`, `the-first-trimester-emotionally`, `postpartum-recovery-timeline`, `your-body-after-birth`, `preparing-for-baby-complete-guide`, `what-to-buy-for-a-new-baby`, `the-space-your-baby-will-come-home-to`. Treated as **human safety review required**, distinct from the 28 supported proposed not_allowed records and never merged back into them. They do not enter the batch, cannot become candidate, approved or eligible, are not treated as settled not_allowed for any Phase 30K decision, and are not resolved automatically. Phase 30K only documents the hold and the evidence a human reviewer would need; resolution is a separate later step.

## 16. Cumulative corpus accounting

Live corpus, post-30J: 5 accepted-future Tier 2 low-risk + 21 accepted-future health-reviewed + 41 accepted-future safety-sensitive + 15 reconciliation-required (2 wellbeing, 9 health-reviewed, 4 low) + 28 supported proposed not_allowed + 7 safety-review hold = **117**, matching the registry live count exactly. Registry totals: 206 = 117 live + 44 draft + 45 unknown.

Phase 30K touches only the 5. The 21 health-reviewed will later need independent grounding review plus named clinical reviewer sign-off on the exact content version, validated per-claim sources, 12-month renewal and required eval coverage. The 41 safety-sensitive will later need the strictest route: independent grounding reviewer, named clinical reviewer and product-safety owner both signing the exact version, clinically co-signed source validation, 6-month renewal and mandatory eval coverage. Neither bar is weakened or shortcut by anything in Phase 30K. The 15 reconciliation records stay outside and are never silently converted; resolving them is a separate explicit human reconciliation step.

## 17. Confirmation no runtime grounding occurs

Phase 30K adds no RAG, retrieval, embeddings, vector search, ingestion, chunking, article-content runtime import or runtime article summary. No prompt, mode, safety-rule, endpoint, source-routing, Ask, companion, schema, route or SEO change. `AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`. Approval eligibility and runtime retrieval remain separate concerns: Phase 30L is the retrieval-readiness gate and Phase 31A the first controlled grounded implementation. Even a fully approved, eligible record stays disconnected from the AI at the end of Phase 30K.

## 18. Validation commands

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Known pre-existing lint error `src/integrations/supabase/previewAuthStorage.ts:38 prefer-const` is left untouched and reported as out of scope, along with the 10 pre-existing react-refresh warnings.

## 19. Implementation risks

- Fabrication pressure: the strongest risk is filling a governance field to complete a package. Mitigation: zero-edit is the default outcome, and tests fail any approved record with missing evidence.
- Digest brittleness: choosing digest inputs badly makes trivial edits lapse approvals, or worse, lets substantive edits pass. Mitigation: the field list in section 5 is fixed and documented before any digest is minted.
- Candidate-to-approved collapse: convenience pressure to write both in one edit. Mitigation: two separate gated operations, each requiring its own recorded human decision.
- Source ambiguity at `low`: "optional" being misread as "no attributability check". Mitigation: Gate C requires an explicit claim-attributability finding per article.
- Batch creep: pressure to add a sixth article. Mitigation: the test asserts exactly which slugs may differ.
- Stale pre-verification: dataset or registry state may change between this plan and execution, so Gate A re-verifies rather than trusting section 2.

## 20. Explicit human decisions required from you before execution

1. Named content owner for the family journey, with their explicit acceptance.
2. Named grounding reviewer, with a competence and independence note.
3. Confirmation, per article, of `low` sensitivity, or a stricter reclassification.
4. Per-article claim-attributability and source-validation decision, with date and signatory.
5. Whether any article needs source remediation before candidacy.
6. `contentVersion` numbers minted by the owner (`<slug>@1` expected).
7. `reviewedDate` per article, tied to the reviewed digest.
8. Per-article candidate decision (reviewer plus owner agreement), with date.
9. Per-article approval decision, with `approvedBy` identity and the real `approvedAt` timestamp.
10. Rollback or replacement reference per approved article.
11. Approval to proceed if a registry type change turns out to be required for digest storage.

Until items 1 to 4 exist, Phase 30K execution can only produce Gate A to C evidence documents and zero registry changes.
