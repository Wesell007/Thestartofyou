# Phase 35B — TTC Content Coverage and Journey Audit

Audit-only. Source behaviour changes = 0. No content, route, UX, AI, grounding, analytics, schema or deployment change was made. Phases 35A and 35A.1 remain closed and were not reopened.

Companion documents: `phase35b-ttc-content-inventory.md` (surfaces, records, discoverability, links, imagery, sources) and `phase35b-ttc-journey-gap-register.md` (journey matrix, gap register, shortlists).

## 1. What the audit found

The TTC ecosystem is structurally and editorially complete. Fifty-six article records sit behind one hub, three pillar pages, seven subtopic pages and one calculator, with 87 internal links across 47 TTC surface files all resolving, no broken routes, and no orphaned articles. Every stage of the journey from preparation through to the IVF handoff has owned editorial guidance, and every overlapping pair of articles resolves to a deliberate short-answer / deep-guide split rather than cannibalisation.

The findings that remain are cleanup rather than coverage. Three legacy stage routes stayed indexable and sitemap-listed after the Phase 35A rebuild but lost their in-site navigation, because their only links live in the unmounted `src/pages/TTC.tsx`. The same dead code still contains unsourced `~85%` statistics that render on no live route. Eight fertility and investigation articles fall back to a generic hero image. Twenty articles carry named authorities without resolvable URLs, and eight specific figures inside seven of those cannot be tied to an exact source from repository evidence. Two articles are reachable but thinly placed, and there is no editorial bridge from pregnancy testing into the Pregnancy experience beyond the product's lifecycle routing.

## 2. Domain verdicts

- MALE FERTILITY COVERAGE = SUFFICIENT — a dedicated subtopic page plus `male-fertility-when-trying-to-conceive`, `sperm-health-basics`, `fertility-tests-for-men`, `partner-health-before-pregnancy`, `partner-support-when-ttc` and `lifestyle-before-pregnancy`, covering factors, testing, lifestyle, timing of male investigation and shared responsibility.
- AGE & FERTILITY COVERAGE = SUFFICIENT — a dedicated subtopic page plus `age-and-trying-to-conceive`, `ttc-in-your-30s`, `ttc-after-35` and `emotional-pressure-of-age-when-ttc`; all four carry structured sources, are non-alarmist and are distinct from the broader Fertility pillar.
- CONDITIONS — `/trying-to-conceive/conditions` orients rather than diagnoses, links PCOS, endometriosis, thyroid and irregular periods, and routes onward to "when to ask for fertility help". No further condition-specific articles are justified.
- TTC → IVF HANDOFF = COMPLETE — hub `TTCIVFPathway` → `/ivf`; Fertility pillar → IVF and treatment; the IVF subtopic → `/ivf`, `/ivf-timeline` and `ivf-timeline-what-to-expect`; `moving-from-ttc-to-ivf` carries the editorial transition. Broken routing = 0; ambiguous TTC-vs-IVF destinations = 0; duplicated IVF guidance inside TTC = 0. No `ivf` lifecycle and no `/my-ivf-journey` exist.
- TTC → PREGNANCY CONTENT HANDOFF = PARTIAL — lifecycle routing is correct (`TTCHubJourneyAction` sends a pregnancy lifecycle to `/my-week`) and `pregnancy-after-loss` is linked, but no editorial destination answers "the test was positive, where does Pregnancy guidance start". Lifecycle transition logic was not changed.

## 3. Required counts

| Count | Value |
| --- | --- |
| TTC public hub routes | 1 |
| TTC topic / subtopic routes | 10 (3 pillars + 7 subtopics) + 3 legacy stage routes = 13 |
| TTC tool routes | 1 canonical (`/ovulation-calculator`) + 1 treatment-context tool (`/ivf-timeline`) |
| TTC redirects | 3 |
| TTC-specific article records | 49 |
| TTC crossover article records | 7 (plus 8 adjacent IVF records) |
| Live TTC articles | 55 |
| Draft TTC articles | 0 |
| Unknown-status TTC articles | 0 |
| Duplicate / shadow records | 1 (`signs-of-ovulation`, redirected, excluded from sitemap) |
| Broken TTC routes | 0 |
| Orphaned TTC articles | 0 |
| Orphaned TTC surfaces (non-article) | 3 legacy stage routes |
| TTC articles with weak discovery | 2 |
| Broken TTC internal links | 0 (87 distinct links checked across 47 files) |
| Wrong destination links | 0 |
| Articles missing an explicit hero image | 8 (all render a fallback) |
| Articles without body imagery | 43 (flagship text template — expected) |
| Journey moments audited | 62 |
| — COVERED | 53 |
| — PARTIALLY_COVERED | 1 |
| — UNCOVERED | 0 |
| — NOT_REQUIRED_STANDALONE | 2 |
| — BETTER_SERVED elsewhere (tool / topic page / IVF / Pregnancy) | 5 |
| KEEP | 51 |
| EXPAND_EXISTING | 0 |
| MERGE | 0 |
| REPOSITION | 0 |
| INTERNAL_LINK_ONLY | 4 |
| ARCHIVE_CANDIDATE | 1 |
| New article candidates | 0 |
| Tool / checklist opportunities | 2 (both P3, both optional) |
| Unsupported numerical / medical claims | 8 (7 articles, all with named authorities but no resolvable URL) |
| Material TTC needs covered only by AI | 0 |
| Current TTC release blockers | 0 |

## 4. Blockers versus future enhancements

CURRENT TTC RELEASE BLOCKERS = 0. No important public route is broken, no journey moment is uncovered, no misleading claim renders on a live surface, no major guidance is orphaned, and neither the IVF nor the Pregnancy product transition is broken.

Future enhancements, in priority order: G1 legacy stage-route and dead-code disposition (P2), G2 positive-test editorial handoff into Pregnancy (P2), G6 structured-source normalisation for the 20 label-only articles (P2), then G3 hero imagery, G4 and G5 internal links, G7 dead-code statistics and G8 shadow-record retirement (all P3).

## 5. Closure decision

OUTCOME B — TTC CONTENT COVERAGE = MOSTLY SUFFICIENT / SMALL GAPS.

No architectural or coverage problem exists and no new article is required. What remains is a limited set of P2 hygiene items that are genuine but not blocking. The smallest evidence-justified follow-up would be a single small phase covering G1, G2 and G6 only. It is not started automatically.

## 6. Completion report

- TTC CONTENT COVERAGE = MOSTLY SUFFICIENT / SMALL GAPS
- MALE FERTILITY COVERAGE = SUFFICIENT
- AGE & FERTILITY COVERAGE = SUFFICIENT
- TTC → IVF HANDOFF = COMPLETE
- TTC → PREGNANCY CONTENT HANDOFF = PARTIAL
- NEW TTC CONTENT REQUIRED BEFORE CLOSURE = NO
- Grounding changes = 0
- AI runtime changes = 0
- Reviewer claims added = 0
- Source behaviour changes = 0
- Current TTC release blockers = 0
- Application deployed = NO
- Validation results are recorded in `roadmap.md` under Phase 35B.
