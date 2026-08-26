# AI content grounding readiness

Phase 30A. Audit and readiness planning only.

Nothing in this document changes runtime behaviour. No RAG, vector search, embedding, article ingestion, prompt, mode, safety, endpoint, source-routing, rendering or UI change was made in this phase. Memory is out of scope throughout.

**This document may recommend future options. It authorises none of them.** Widening external routing, an article metadata model, curated Start of You grounding, retrieval, vector search, embeddings and RAG all remain unstarted and gated.

Every statement below was confirmed by reading the referenced file at the time of writing.

---

## 1. Current source-routing system

Grounding today is static keyword routing over a fixed allowlist. `supabase/functions/_shared/aiSources.ts` holds 17 approved NHS URLs in `APPROVED_SOURCES` and eleven ordered topic rules. Each rule is a regular expression, a family (`pregnancy`, `baby`, `ttc`, `safety`) and a small URL list.

How a request resolves:

1. `selectSources(query, context)` lowercases the question plus the bounded context string and joins them into one text.
2. The rules are tested in order and **the first match wins**. There is no scoring, ranking or multi-rule merge.
3. A `safety` match returns its URLs alone.
4. Any other match appends the family hub page if it is not already present, then caps the result at three URLs.
5. No match returns two broad default pages: common pregnancy symptoms and the pregnancy hub.

`supabase/functions/ai-search/index.ts` then does the fetching, and only when the mode allows it:

- `getAiModeConfig(mode).useGrounding` gates the whole step. Four modes are grounded (`general`, `pregnancy_week_companion`, `first_year_companion`, `ttc_companion`); `first_year_day_recap` is not and never calls out.
- Selected pages are fetched live per request with `Promise.allSettled`, so a slow or broken page does not fail the others.
- Each page is reduced to text: the `<main>` element where present, scripts and styles removed, tags stripped, entities decoded, whitespace collapsed, then **capped at 10,000 characters**.
- A page yielding under 200 characters is discarded as insufficient.
- Each surviving document is wrapped as `<background>…</background>` and the set is passed to the model inside `<background_material>`.
- **The URL itself is never passed to the model.** Nothing in an answer can reference a source address because the address never enters the prompt.
- If every fetch fails, the endpoint returns 503 with a "verified guidance sources are temporarily unavailable" message rather than answering ungrounded.

There is no caching, no snapshotting, no index, no embedding store and no persistence of fetched content. Nothing is stored between requests.

## 2. Current approved external source approach

The allowlist is NHS-only and hand-curated. Every URL was checked as reachable and topically relevant before it was added, and the module documents that fact.

Why an allowlist rather than a search:

- The set of pages behind any answer is knowable and reviewable in advance. A live web search is not.
- It removes the entire class of failure where the model is handed a commercial, unmoderated or non-UK page.
- It keeps clinical framing aligned with UK maternity, fertility and infant guidance, which is what the product's escalation wording assumes.

How background material is allowed to be used is stated once, in `GROUNDING_USE_RULE` in `supabase/functions/_shared/aiModes.ts`: prefer the supplied material where it covers the topic, and where it does not, still answer from routine, well established UK guidance, kept general and non-diagnostic. That rule exists because the earlier behaviour was to refuse with wording like "not covered in the provided NHS evidence", which was both unhelpful and a hygiene breach.

Grounding is therefore **supporting evidence, not a gate on answering**. This is deliberate and should be preserved: a thin fetch must degrade to a general, calm, non-diagnostic answer, never to a refusal and never to a source complaint.

## 3. Current limits of static keyword routing

Confirmed limits, all inherent to the present design:

1. **First-match ordering collisions.** One question can satisfy several rules and only the earliest applies. "I'm anxious about my baby's movements" matches the safety rule first and is routed to urgent mental health pages, not the movements page. "Cramping while breastfeeding" matches feeding before the bleeding and symptoms rule. Ordering is a fixed editorial judgement, not a per-question relevance decision.
2. **No relevance ranking.** Every matched URL is treated as equally relevant. There is no notion of a better or worse page for a given phrasing.
3. **Whole-page evidence, no section targeting.** A page is flattened and truncated at 10,000 characters. On long pages the section that actually answers the question can fall outside the cap, so the model receives topically related but non-answering text.
4. **No freshness or change detection.** Pages are fetched live, which is good for currency and bad for stability: if NHS restructures a page, the routing keeps pointing at it and the only signal is the under-200-character discard or a 503. Nothing alerts anyone that an allowlisted page changed shape.
5. **Coverage gaps are silent.** An unmatched question falls back to two generic pregnancy pages, which is actively wrong for postpartum recovery, toddler and family questions. The answer still looks confident because the model falls back to general UK guidance by design.
6. **Context can steer routing.** `selectSources` matches against the question *and* the context string. A coarse page label can therefore tip a question into a different family than the words alone would.
7. **No brand or product coverage at all.** Nothing in the allowlist can answer "what does this app do", "where do I find my journey", "what is in the toolkit". Those answers come entirely from the model's general knowledge, which is the weakest surface in the whole system.
8. **Latency and failure surface.** Up to three live external fetches sit on the critical path of every grounded answer.

## 4. What questions are well covered today

Well covered means a specific, topically correct allowlisted page exists and the routing reliably reaches it:

- Baby movements and reduced movement (dedicated page plus keeping-well, and a hard escalation pattern in front of it).
- Bleeding, spotting, cramping and pain in pregnancy.
- Antenatal appointments, scans, booking and midwife contact.
- Signs that labour has begun, contractions, waters, induction.
- Infant feeding: breastfeeding, bottle feeding, latch, cluster feeding, colic and winding.
- Infant sleep, night waking, naps and settling.
- Pregnancy testing, test day and the two-week wait.
- Fertility, ovulation, cycles and infertility.
- IVF, embryo transfer and fertility treatment.
- Mental health, panic, low mood and self-harm wording, which routes to urgent mental health help ahead of everything else.
- Urgent infant illness, temperature and "unwell under 5".

## 5. What questions are weakly covered today

Weakly covered means no specific allowlisted page exists, or routing sends the question somewhere generic:

- **Postpartum maternal recovery.** Perineal healing, caesarean recovery, bleeding after birth, pelvic floor, postnatal check. No page in the allowlist and no rule; most of it falls through to the generic pregnancy default.
- **Toddler and family stages.** The word "toddler" matches the baby rule and lands on the baby hub and urgent-help-under-5 pages. There is no toddler or family source.
- **Weaning and solid food** beyond the single keyword match into the baby hub.
- **Perinatal mental health specifically** as distinct from urgent crisis help; today both share one urgent page.
- **Loss, miscarriage and pregnancy after loss.** Extremely sensitive and with no dedicated approved source.
- **Multi-topic questions.** "Bleeding and I have a scan tomorrow" gets one family only.
- **Brand, product and navigation questions.** No grounding of any kind.
- **Start of You specific guidance.** By design, nothing.
- **Anything where the answer lives deep inside a long page** and is lost to the 10,000-character cap.

## 6. Why The Start of You articles are not yet approved for grounding

The articles are not approved, and the blocker is governance, not quality. Reading `src/data/articleData.ts` and `src/data/articleInventory.ts`:

- Article records carry `journey`, `topics`, `sources`, `lastUpdated` and `reviewedBy`, and some carry a medical review signal. That is genuinely useful metadata, but it is optional on the type and inconsistently populated across the dataset.
- There is **no sensitivity level** on an article, so nothing distinguishes a gentle reflective piece from safety-critical clinical material.
- There is **no content version**, so an answer could never be attributed to a specific revision of an article.
- There is **no owner record** separate from a reviewer name.
- There is **no archived or deprecated state** on the article data itself. Editorial status lives in a parallel inventory file (`currentStatus`, `contentState`), which is not the same record the AI would read.
- There is **no per-article grounding approval flag**. Approval for publication is not approval to be the evidence behind a health answer.
- Maturity is mixed. The inventory exists precisely because canonical roles, duplicate risk and recommended actions are still being worked through.

The concrete risk: without a version, a sensitivity level, an archive state and an explicit approval flag, a draft, superseded or duplicated article could silently become the authority behind a clinical answer, and there would be no way to prove afterwards which text produced it or to roll it back. That is why the answer is not yet, and why it stays not yet until section 7 is satisfied.

Two boundaries are permanent regardless of any of this: **no user-authored content is ever grounding material** (journal, reflections, notes, logs, memories, media), and grounding never replaces the escalation layer.

## 7. Requirements before Start of You content can be used

Every criterion below must be true of an individual article before it is eligible. Eligibility is per article, never per hub, per journey or per dataset.

1. **Original content.** Written for this product, not paraphrased from a source page.
2. **Medically reviewed where needed**, by a named qualified reviewer, at the sensitivity level the article carries.
3. **Reviewed date present**, and within an agreed freshness window for its sensitivity level.
4. **Source list present**, with real structured source records, not bare labels.
5. **Topic tags present**, from a closed vocabulary.
6. **Journey tags present**, from a closed vocabulary.
7. **Sensitivity level present** — routine, health-relevant, or safety-critical.
8. **Owner and reviewer recorded** separately, so accountability is unambiguous.
9. **Version recorded**, bumped on every content or metadata change.
10. **Archived and deprecated status supported** in the same record the AI reads, and honoured by exclusion.
11. **Evaluation examples added** to the eval dataset for that article's topic, including a stale-content case.
12. **Rollback process defined**, achievable without a migration.

Plus three system-level rules:

- **Explicit approval flag.** An article is invisible to the AI unless a dedicated grounding-approval field says otherwise. Default off, for every article, forever.
- **Exclusion is structural.** Archived, deprecated, unapproved and above-threshold-sensitivity articles are filtered out by the data model, not by a prompt instruction.
- **Never for safety-critical answers.** Even a fully approved article does not become the evidence for an urgent or safety-critical question. Those stay with approved external health sources and the escalation layer.

## 8. Source hierarchy for future grounding

Assessed, not implemented. If grounding is ever widened, this is the order it should follow:

```text
1. Urgent safety rules            hard patterns, before any source is consulted
2. Approved UK health sources     medical and safety-sensitive content
3. Reviewed Start of You content  brand-specific and product guidance only, later
4. Neutral fallback               calm, general, non-diagnostic answer when evidence is thin
5. Never                          unsupported diagnosis, certainty or verdict language
```

Reading of that hierarchy:

- Level 1 is not a source. It is a pre-source gate and it already exists exactly this way in `ai-search/index.ts`, ahead of both grounding and the model call.
- Level 2 stays the primary evidence for anything clinical. Start of You content never outranks it.
- Level 3 is deliberately narrow: what this product offers, how a journey or tool works, how to think about a stage in this product's voice. Not clinical thresholds, not red flags, not "should I call someone".
- Level 4 is the crucial one and it already works: thin evidence degrades to a general, calm answer, never to a refusal and never to a source complaint.
- Level 5 is enforced today by prompt rules plus `BANNED_VERDICT_PATTERNS` in `src/lib/aiAnswerSafety.ts`, and no grounding change may weaken it.

## 9. Content tagging and versioning requirements

If article grounding is ever built, the metadata must be part of the same record the AI reads, and it must be required rather than optional:

| Field | Requirement |
| --- | --- |
| `groundingApproved` | Required boolean, default false. The only gate that makes an article eligible. |
| `sensitivity` | Required enum: routine, health-relevant, safety-critical. |
| `contentVersion` | Required. Bumped on every content or metadata change. |
| `reviewedAt` / `reviewedBy` | Required for health-relevant and safety-critical. |
| `owner` | Required, distinct from reviewer. |
| `lifecycle` | Required enum: live, archived, deprecated. Non-live excluded structurally. |
| `journeyTags` / `topicTags` | Required, closed vocabulary. |
| `sources` | Required structured records for health-relevant and above. |

Versioning rules that would follow from the existing scheme in `versioning.md`:

- A change to the eligible article set, the tagging vocabulary or the selection logic bumps `AI_SOURCE_ROUTING_VERSION`.
- A change to the external allowlist or the routing table also bumps `AI_SOURCE_ROUTING_VERSION`.
- A change to how background material may be used bumps `AI_PROMPT_VERSION`, because that rule lives in a prompt block.
- An article's own edit bumps its `contentVersion`; the routing version stays put.
- No version constant may ever appear in a user-facing answer.

This phase bumps nothing. No behaviour changed.

## 10. Review requirements for health-sensitive content

- **Routine** content: editorial review is sufficient for eligibility.
- **Health-relevant** content: named clinical reviewer, reviewed date, structured sources, and a freshness window after which eligibility lapses automatically rather than by someone remembering.
- **Safety-critical** content (red flags, when to call, urgent thresholds, loss, mental health crisis, infant illness escalation): **never eligible as grounding material at any review level.** These answers stay with approved external health sources and the escalation layer, because the escalation wording is fixed, tested and must not be paraphrased by a model working from a prose article.
- Lapsed review makes an article ineligible automatically. Ineligible means excluded from selection, not merely deprioritised.
- Nothing user-authored is ever reviewable into eligibility. Journal, reflection, note, log, memory and media content is excluded by category, permanently.

## 11. Answer rendering rules

Unchanged by this phase, and stated here so a future grounding change cannot quietly relax them.

- **No raw URLs.** Not in any form: bare, angle-bracketed or markdown.
- **No source blocks.** No "Sources", "References" or "Further reading" section, and no inline "Source:" line.
- **No citation lists**, numbered markers or footnotes.
- **No retrieval wording.** Nothing about evidence, sources, references, retrieval, snippets, documents, pages, context, or anything "provided", "supplied" or "included". The person cannot see any of that.
- **One fixed trust line**, `APPROVED_SOURCES_TRUST_LINE`, is the only place the existence of approved sources is acknowledged.
- **One fixed fallback line** for a genuine inability to answer.

Enforcement points, all already in place and all left alone: `OUTPUT_HYGIENE_RULES` in the prompt registry; the URL never entering the prompt at all in `fetchGrounding`; `sanitiseAnswerForDisplay` in `src/lib/aiAnswerSafety.ts` as the single render-time helper; `stripSourceBlocks` and `stripExternalSourceLinks` in `src/lib/answerSourceLinks.ts`; `disableLinks` on the answer renderer.

If article grounding is ever built, the same rule applies with no exception: an approved article may inform an answer, and may be linked from surrounding page furniture, but it must not appear inside the answer as a citation, a URL or a named source.

## 12. Safety escalation boundary

The boundary as it stands, verified in `supabase/functions/ai-search/index.ts`:

```text
parse -> rate limit -> HARD ESCALATION -> kill switch -> grounding -> model
```

Escalation is decided before any source is selected or fetched, and before the model is called at all. Grounding cannot influence it.

Rules that no future grounding work may touch:

- Escalation stays ahead of source selection, source fetching and the model call.
- No source, internal or external, may soften, replace, delay or paraphrase an escalation answer.
- Grounding failure returns 503; it never falls back to answering a red-flag question ungrounded.
- `first_year_day_recap` stays ungrounded and keeps its suppressed escalation answer with the controlled recap-unavailable line.
- The kill switch stays behind hard escalation, so a crisis question is still answered while the companion is paused.
- Hard-pattern coverage and wording are governed by `safety-taxonomy.md` and `escalation-matrix.md`, not by grounding scope.

## 13. Evaluation requirements

Before **any** grounding change ships, the following must exist in `eval-dataset-v1.json` and pass in the deterministic harness:

1. **Per-source routing assertions.** For each new or reordered rule, prompts asserting the expected URL set, including collision cases that prove ordering is intentional.
2. **False-positive checks.** Routine phrasings that must *not* reach a safety or urgent-only page.
3. **Thin-evidence fallback prompts.** Questions where the fetch is unhelpful, asserting a calm general answer and never a refusal or a source complaint.
4. **Brand-question prompts.** Product and navigation questions, asserting no clinical framing and no invented feature.
5. **Stale and archived content prompts.** If article grounding is ever built, cases proving an archived, deprecated, unapproved or review-lapsed article cannot reach an answer.
6. **Hygiene assertions.** No URL, source block, citation or retrieval wording in any output path.
7. **Safety no-regression run.** Every Red and Crisis row still escalating, escalation-first, unchanged.
8. **Coverage record.** The routing version and the dataset version recorded together in the phase report.

The existing harness already covers routing, sanitisation, banned phrases and escalation, so this is an extension rather than a new framework.

## 14. Future implementation options

Assessed with trade-offs. **None is chosen or authorised here.**

**Option A — keep static routing, widen the external allowlist.**
Add approved sources for postpartum recovery, perinatal mental health, weaning, toddler and family, and split perinatal mental health from urgent crisis help. Reorder rules to fix known collisions.
*For:* smallest change, no new architecture, directly fixes the real coverage gaps, fully reviewable in advance.
*Against:* still first-match routing, still whole-page evidence, does nothing for brand questions.
*Gate:* routing version bump, new eval rows per source, safety no-regression run.

**Option B — hand-curated article-to-topic map, approved articles only.**
A small explicit mapping from a closed topic vocabulary to a handful of explicitly approved, versioned articles, used for brand and product guidance only.
*For:* no retrieval machinery, fully auditable, small enough to review by hand, answers the brand gap that nothing else can.
*Against:* needs the whole metadata and approval model first, and the map goes stale unless ownership is real.
*Gate:* section 7 satisfied for each mapped article, section 9 metadata in place, stale-content evals passing.

**Option C — retrieval over an approved, versioned subset.**
Chunk and index only articles that pass section 7, with lifecycle exclusion at index time and at query time.
*For:* handles phrasing variation and section targeting, which fixes the 10,000-character truncation problem.
*Against:* the largest change by far. New storage, new index freshness and deletion-propagation problems, much harder to prove what produced an answer, and it makes archived-content leakage a real risk rather than a theoretical one.
*Gate:* Options A and B settled first, plus a full privacy and safety review of the index itself.

**Option D — no change.**
Keep grounding exactly as it is and improve answers through prompt and coverage work only.
*For:* zero new risk.
*Against:* leaves postpartum, toddler and brand questions weak indefinitely.

Assessment: the gap that hurts users most is coverage (Option A), not retrieval sophistication (Option C). Option C should not be considered until A and B have shipped and been measured.

## 15. Recommended next phases

Gated sequence. Each phase begins only when its entry criteria are met. **This phase authorises none of them.**

**Phase 30B — widen external source routing.** Add approved sources and rules for postpartum recovery, perinatal mental health, weaning, toddler and family; fix known ordering collisions.
*Entry:* 30A closed; every candidate URL checked reachable and relevant; eval rows drafted.
*Exit:* new rules covered by routing evals, no Red or Crisis regression, `AI_SOURCE_ROUTING_VERSION` bumped, hygiene unchanged.

**Phase 30C — article metadata and approval model.** Design first, then a data-layer change: sensitivity, version, owner, lifecycle, closed tag vocabularies and the default-off grounding approval flag. No AI reads anything.
*Entry:* 30B closed; editorial ownership agreed; reviewer capacity confirmed.
*Exit:* metadata present and required on eligible articles, lifecycle exclusion provable in tests, still zero AI usage.

**Phase 30D — curated brand-answer grounding, feature-flagged.** Option B, limited to product and navigation guidance, never clinical.
*Entry:* 30C closed; section 7 satisfied per mapped article; stale-content evals in place.
*Exit:* brand questions answered from approved content behind a flag, kill switch and rollback proven, no clinical use.

**Phase 30E — retrieval readiness review.** Option C assessed on evidence from 30D. Review only; may conclude retrieval is unnecessary.
*Entry:* 30D closed with production history.
*Exit:* a recorded decision either way.

Not started and not authorised by this phase: widening external routing, the article metadata model, curated Start of You grounding, retrieval, vector search, embeddings, RAG.

Also still on the separate audit track and unaffected here: voice readiness, and the companion UI redesign. Memory remains blocked at its own gate in `memory-mvp-readiness.md`.
