# Phase 31 — Master Content Coverage Audit (audit only)

Research and documentation only. No articles, routes, sitemap, SEO, AI, grounding, database or deployment changes.

## Source file verified

The attached export reconciles exactly with your expected figures:

- 10,000 rows
- 8,485 unique keywords
- 911 unique URLs
- 8,914 unique keyword + URL pairs
- 1,086 duplicate rows beyond the unique pair set

No discrepancy, so the audit proceeds.

## Current site counts (recomputed from the live datasets, not the stale inventory file)

- Legacy Pregnancy / TTC / IVF articles: 157
- Family: 19
- First Year: 17
- Toddler: 17
- Total articles: 210

Structured surfaces to be inventoried alongside these: pregnancy week pages, trimester pages, TTC/IVF/First Year/Toddler/Family topic and stage pages, First Year month and phase pages, Toddler age pages, postpartum stage content, and the three calculators/timeline.

## What I will do

1. Normalise the competitor export into two clean views: one record per keyword (best position, then newest date, then highest traffic wins) and one record per keyword + URL pair.
2. Build a full inventory of every Start of You search-owning surface directly from the datasets and route table, classified by page type, journey, status and indexability. Compare `articleInventory.ts` afterwards and report drift only.
3. Cluster competitor demand by URL first, then split clusters where the underlying questions genuinely differ. Filter obvious query contamination (for example pet potty-training terms).
4. Match every relevant cluster to its strongest current owner using the fixed classification list, judging intent rather than title similarity. Week, month and age searches map to the existing structured pages, not to new articles.
5. Apply the special handling rules per domain: Trying to Conceive, Pregnancy, IVF, First Year, Postpartum/Recovery (editorial domain only, no new hub), Toddler, Family, plus Preparing for Baby as supporting intent only.
6. Test every previously suggested gap against this data and confirm, revise or reject it. Run a cannibalisation check before proposing any new page.
7. Prioritise P0–P3 or SKIP on editorial judgement, never on raw volume. Cluster volumes are labelled directional, never market size.
8. Score each of the seven domains and give a plain yes/no answer on whether coverage is sufficient.

## Files produced

- `docs/content/phase31-master-content-audit.md` — executive audit, in the exact section order specified
- `docs/content/phase31-hub-scorecard.md` — per-domain completeness verdicts
- `docs/content/phase31-opportunity-clusters.csv` — one row per consolidated intent cluster
- `docs/content/phase31-new-content-backlog.csv` — genuinely new pages only, with full evidence fields
- `docs/content/phase31-existing-content-actions.csv` — expand, retarget, merge, internal-link and tool actions
- `docs/content/phase31-skip-register.csv` — deliberate rejections with reasons
- `docs/content/phase31-source-normalisation.md` — counts, dedupe rules, methodology, limitations

Analysis scripts run in a scratch directory; the raw competitor export never enters application code.

## Validation before handover

Confirm zero changes to application source, article records, routes, sitemap, AI, grounding and database; zero deployments. Validate every CSV for column consistency, unique cluster IDs, unique proposed slugs, an evidence reference and gap reason on each proposal, a reason on each skip, and a cannibalisation check on each P0/P1. Report the 30 required numbers with reconciling arithmetic, then stop.

## Added rule: repository existence is not live search coverage

Every surface gets a real status taken from the data and routes, never invented: live and indexable, live but noindex, draft or preview, redirect or legacy, not public, or unknown. Initial check: the three hub datasets carry explicit statuses (Family 18 ready / 1 draft, First Year 16 ready / 1 draft, Toddler 16 ready / 1 draft) while the 157 legacy records carry no status field, so their live state is resolved from routing and sitemap behaviour rather than assumed.

Consequences carried through the whole audit:

- A draft, preview-only or unknown-status page never counts as strong or structured coverage for organic search.
- Non-indexed setup, personalised journey and private result surfaces may be noted as product support, never as a search owner.
- Where good content exists but is not publicly usable, the recommended action is to publish or resolve its status, not to propose a duplicate page. Nothing is published in this phase.
- The executive report states both total article records and live public article coverage, with the actual status breakdown of the current 210 records, and repeats the split for structured surfaces where it matters.
- The completeness verdict is never argued from the article count. Each domain answers separately: what exists, how much is live, whether the important intents are covered, what must be created, what should be improved, what needs publishing or status resolution, and what is deliberately skipped.
