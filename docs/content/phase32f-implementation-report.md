# Phase 32F — Implementation report

Link implementation (32F.2) and runtime-safe cannibalisation remediation
(32F.3). No new articles, URLs, routes or hubs. No deployment.

Revised by the Phase 32F reconciliation / correction pass: documentation only,
runtime source files changed by that pass = 0.

## Action model

An action is one remediation decision, not one affected URL. Three actions are
deliberately systematic and are counted once each:

- **A6** — six broken internal destinations, ONE systematic remediation action.
- **A7** — one redirect-source destination appearing across four surfaces, ONE
  systematic remediation action.
- **A8** — five orphaned legacy primary guides, ONE systematic orphan
  remediation action.

Affected URL counts are not action counts.

## Action register — one row per gross action

| Action ID | Source | Description | Guaranteed/New | Terminal status | Runtime change | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | C008 | `/pregnancy` week-by-week index entry point | Guaranteed | ALREADY_RESOLVED | None | `/pregnancy` already exposed a week index entry point reaching all 42 week routes; pre-change crawl shows the week-index edges present |
| A2 | C006 | Systematic architecture across `/pregnancy/week/1..42` | Guaranteed | ALREADY_RESOLVED | None | The 42 week routes already carried shared progression, hub linking and per-week support content; no week route was orphaned or broken pre-change |
| A3 | C066 | First Year phase → month discoverability and progression | Guaranteed | IMPLEMENTED | 4 phase surfaces | Month navigation added to the four First Year phase pages via `monthHref` mapping in `FirstYearPhasePage.tsx`; age labels only, no health or developmental claim |
| A4 | C082 | Physical postpartum recovery → `when-parenthood-feels-heavy` | Guaranteed | IMPLEMENTED | 2 article surfaces | `healing-after-birth` and `what-recovery-can-feel-like` each gained one neutral related link, title anchor only; no diagnosis, escalation or mental-health claim added |
| A5 | C046 | Pregnancy pelvic floor ↔ postnatal body and recovery | Guaranteed | IMPLEMENTED | 2 article surfaces | Reciprocal links: `/articles/pelvic-floor-exercises-in-pregnancy` → `body-changes-after-birth`, and the reverse. Routing only; no Phase 32E held health content inserted |
| A6 | New | Six broken internal destinations, one grouped remediation | New | IMPLEMENTED | 4 data files | Destinations repointed (labour/waters anchor, First Year development, three legacy postpartum stage paths); broken destinations 6 → 0 |
| A7 | New | Links to redirect source `/articles/signs-of-ovulation` across four surfaces | New | IMPLEMENTED | 2 data files | All occurrences repointed to the live canonical `/articles/how-to-know-when-you-are-ovulating`; redirect-source links 1 → 0 |
| A8 | New | Five orphaned legacy primary guides, one grouped remediation | New | IMPLEMENTED | 4 surfaces | One contextual inbound link added from the correct supporting surface for each guide; TRUE_ORPHAN 5 → 0 |
| A9 | New | Pregnancy topic groups truncated to four links | New | IMPLEMENTED | 2 files | Slice removed in `PregnancyTopicPage.tsx`; all configured links render, plus the configured `what-to-buy-for-a-new-baby` link |
| A10 | New | Milestones canonical ownership decision (CAN-04) | New | DEFER_SEO_ARCHITECTURE | None | Canonical architecture explicitly out of scope for 32F; see the milestone residual issue below |
| A11 | New | `/` and `/about` contextual thinness | New | NO_ACTION_REQUIRED | None | Both reached structurally from every page; manufactured editorial links would not serve readers |

## Action arithmetic

GUARANTEED 5 + NEWLY_DISCOVERED 6 = **GROSS 11**.

```text
IMPLEMENTED 7
+ ALREADY_RESOLVED 2
+ MERGED_WITH_ANOTHER_ACTION 0
+ BLOCKED_BY_UNPUBLISHED_TARGET 0
+ REVIEW_HOLD 0
+ DEFER_SEO_ARCHITECTURE 1
+ NO_ACTION_REQUIRED 1
= 11 = GROSS
```

Exact. The earlier summary sentence stating IMPLEMENTED = 8 was a transcription
error in the summary only; the A1–A11 register always held seven implemented
rows and was not altered to fit the arithmetic.

## Guaranteed action evidence

**A1 / C008.** Issue: ensure a clear week-by-week index entry point on
`/pregnancy`. Already present and reaching all 42 week routes.
ALREADY_RESOLVED, runtime changes in 32F = 0.

**A2 / C006.** Issue: assess the systematic architecture around the 42 week
pages. Shared progression, hub linking and per-week support content already
existed. ALREADY_RESOLVED, runtime changes in 32F = 0.

**A3 / C066.** Four First Year phase surfaces (0–3, 3–6, 6–9, 9–12 months) now
link to their published month routes using age labels. Neutral navigation only.

**A4 / C082.** Two physical recovery articles each carry one neutral contextual
link toward `when-parenthood-feels-heavy`. No diagnosis, no escalation wording,
no new mental-health claim.

**A5 / C046.** Reciprocal as implemented: the pregnancy pelvic-floor guide
links forward to postnatal body changes, and that article links back. Routing
only; none of the Phase 32E health-held expansions were inserted.

## Changed runtime surfaces

| Route / surface | Type | Previous state | Action | Destination | Anchor | Cannibalisation impact | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 4 First Year phase pages | Phase | No month links | Added month navigation | 13 month pages | Age labels | None | Low |
| `/first-year/postpartum-recovery/healing-after-birth` | Article | No mental-health route | Added related + primary link | `when-parenthood-feels-heavy`, `/articles/postpartum-recovery-timeline` | Titles | CAN-01 | Low |
| `/first-year/postpartum-recovery/what-recovery-can-feel-like` | Article | No mental-health route | Added related link | `when-parenthood-feels-heavy` | Title | CAN-01 | Low |
| `/first-year/body-and-hormones/body-changes-after-birth` | Article | No cross-stage route | Added 2 cross links | pelvic floor guide, `/articles/your-body-after-birth` | Titles | CAN-02, CAN-06 | Low |
| `/articles/pelvic-floor-exercises-in-pregnancy` | Article | No postpartum route | Added cross link | `body-changes-after-birth` | Title | CAN-06 | Low |
| `/first-year/sleep/newborn-sleep-expectations` | Article | Orphaned primary above it | Added cross link | `/articles/baby-sleep-first-year` | Title | CAN-03 | Low |
| `/first-year/development/baby-development-in-the-first-year` | Article | Orphaned primary above it | Added cross link | `/articles/baby-milestones-first-year` | Title | CAN-04 | Low |
| 6 pregnancy topic pages | Topic | Groups truncated to 4 links | Render all configured links | Various | Existing labels | None | Low |
| `/pregnancy/preparing-for-baby` | Topic | Missing 2 destinations | Added 2 links | `what-to-buy-for-a-new-baby`, `preparing-for-baby-complete-guide` | Titles | CAN-05 | Low |
| `/pregnancy/week/*` support content | Week | Broken "waters" link | Repointed | `/articles/signs-of-labour#waters-contractions-and-show` | Existing | None | Low |
| First Year stage data | Stage | Broken development link | Repointed | `/first-year/development` | Existing | None | Low |
| Postpartum legacy surfaces | Legacy | Linked to redirect sources | Repointed to final destinations | First Year recovery articles | Existing | None | Low |
| TTC/legacy related lists | Article | Linked to redirect source | Repointed | `/articles/how-to-know-when-you-are-ovulating` | n/a | None | Low |

## Milestone canonical residual issue (A10 / CAN-04)

- Routes involved: `/articles/baby-milestones-first-year` (route A) and
  `/first-year/development/baby-development-in-the-first-year` (route B).
- Intended primary owner: route A.
- Supporting owner: route B, with `when-milestones-feel-uneven`, the 13 month
  pages and 4 phase pages as structured context.
- Current canonical, route A: self-canonical, indexed, in the sitemap.
- Current canonical, route B: self-canonical, indexed, in the sitemap.
- Inventory role: `needs-decision`.
- Residual issue: both routes serve substantially the same milestone intent, so
  two indexable owners remain.
- Why untouched: canonical, slug, redirect and status architecture were out of
  scope for 32F. Only link direction was set (B → A).
- Final status: DEFER_SEO_ARCHITECTURE. Explicit future work.

## Files changed

Runtime and test files (32F.2 / 32F.3):

- `src/data/articleData.ts`
- `src/data/firstYearArticleData.ts`
- `src/data/firstYearStageData.ts`
- `src/data/pregnancyTopicData.ts`
- `src/data/postpartumStageData.ts`
- `src/data/weekSupportContent.ts`
- `src/data/ttcFlagshipOverrides.ts`
- `src/components/article/flagship/ArticleFlagshipTemplate.tsx`
- `src/components/firstyear/article/FirstYearArticlePage.tsx`
- `src/components/firstyear/phase/FirstYearPhasePage.tsx`
- `src/components/pregnancy/PregnancyTopicPage.tsx`
- `src/components/postpartum/PostpartumStages.tsx`
- `src/components/postpartum/PostpartumFinalCTA.tsx`
- `src/test/phase32fLinkIntegrity.test.ts` (new)

Reconciliation / correction pass (documentation only):

- `docs/content/phase32f-implementation-report.md`
- `docs/content/phase32f-cannibalisation-register.md`
- `docs/content/phase32f-intent-ownership-map.md`
- `docs/content/phase32f-link-graph-audit.md` — unchanged; no metric disproved

Runtime source files changed by the correction pass: **0**.

## Validation

Last validated runtime state (32F.2 / 32F.3), not re-manufactured by this
documentation-only pass:

- Tests: 117 files, 1,297 passing, 0 timeouts.
- Typecheck: clean, run twice.
- Lint: 1 existing error, 10 existing warnings, 0 new findings.
- Production build: pass.
- Post-change crawl: 331 routes, 0 errors, 0 orphans, 0 broken destinations,
  0 redirect-source links, 0 links to unpublished drafts.

Targeted verification during the correction pass: runtime source files
unchanged, public routes unchanged, internal-link runtime state unchanged, the
19 held drafts still unpublished, and no future-publication link migration
implemented.

## Architecture zero checks

New articles 0, new drafts 0, new URLs 0, new routes 0, new hubs 0, slug
changes 0, status changes 0, canonical changes 0, navigation architecture
changes 0, sitemap architecture changes 0, SEO architecture changes 0,
lifecycle changes 0 (`ttc | pregnancy | first_year`), AI 0, grounding 0,
journal 0, memory 0, voice 0, database 0, schema 0, RLS 0, deployments 0.
The 19 Phase 32A–32D drafts remain `PUBLICATION STATUS: NOT PUBLISHED`.
