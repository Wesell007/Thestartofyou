# Phase 35C — TTC source normalisation and claim resolution evidence

## Starting state (Phase 35B)

- Label-only TTC source articles: **20**
- Of those, articles containing flagged unsupported claims: **7**
- Flagged unsupported numerical or medical claims: **8**

These are separate governance states. A label-only source record is not by
itself an unsupported claim.

## Normalisation rule applied

A label-only string was converted to the structured source shape only where the
repository already contains the **same underlying document** in structured form
(matching title, publisher and URL). No URL was inferred from a publisher
homepage, no source was substituted for a different document by the same
publisher, no publication year was invented, and no provenance was inferred
from topic similarity.

### Normalised records (exact repository provenance)

| Label-only string | Structured record used | Occurrences |
| --- | --- | --- |
| NICE — Fertility problems: assessment and treatment (CG156) | Fertility problems: assessment and treatment (CG156), NICE, https://www.nice.org.uk/guidance/cg156 | 14 |
| NHS — Infertility | Infertility, NHS, https://www.nhs.uk/conditions/infertility/ | 2 |
| NHS — Irregular periods | Irregular periods, NHS, https://www.nhs.uk/conditions/irregular-periods/ | 1 |
| NHS — Miscarriage | Miscarriage, NHS, https://www.nhs.uk/conditions/miscarriage/ | 2 |
| NHS — Vaginal bleeding in pregnancy | Vaginal bleeding in pregnancy, NHS | 2 |
| Tommy's — Bleeding in early pregnancy | Bleeding in early pregnancy, Tommy's | 2 |

Total individual source records converted: **23**.

### Left label-only (exact provenance not establishable)

Organisations named without a matching structured record in the repository:
NHS Endometriosis, NICE NG73, NICE NG126, RCOG Endometriosis, Endometriosis UK,
NHS Pregnancy tests, HFEA topic pages, WHO laboratory manual, ESHRE guidance
and similar. These remain label-only and are reported honestly rather than
matched to an approximate source.

## Counts after normalisation

| Measure | Value |
| --- | --- |
| Label-only TTC source articles before | 20 |
| Normalised from exact repository evidence (now carry at least one structured, URL-bearing source) | 17 |
| Still entirely label-only | 3 |
| Total | 20 |

Still label-only: `endometriosis-and-trying-to-conceive`,
`how-long-implantation-takes`, `faint-positive-pregnancy-test`. None of these
now carries an unsupported numerical or medical claim (see below), so none is a
TTC release blocker.

## Resolution of the 8 flagged claims

| # | Article | Claim before | Resolution | After |
| --- | --- | --- | --- | --- |
| 1 | implantation-bleeding | implantation "around 6–12 days after ovulation" | SAFELY_REWORDED | "in the days after ovulation, before a period would be due" |
| 2 | how-long-implantation-takes | "around 6 to 12 days after ovulation, most often around days 8 to 10" | SAFELY_REWORDED | "in the days after ovulation" |
| 3 | trying-to-conceive-explained | egg survives "about 12 to 24 hours" | SAFELY_REWORDED | "for only a short time" |
| 4 | fertile-window | egg fertilisable "about 12–24 hours"; ovulation "about 12 to 16 days before the next period" | SAFELY_REWORDED | "for only a short time"; "in the second half of the cycle rather than always on day 14" |
| 5 | irregular-periods-and-trying-to-conceive | luteal phase "fairly fixed at around 12–14 days" | SAFELY_REWORDED | "tends to be fairly consistent in length" |
| 6 | faint-positive-pregnancy-test | "about 48 hours"; hCG "doubles every 48 hours" | SAFELY_REWORDED | "leaving a day or two between tests"; "hCG rises steadily" |
| 7 | how-long-to-try-before-getting-help | "About 80–85% of couples conceive within a year" | SAFELY_REMOVED | "Most couples conceive within a year of trying" |
| 8 | fertility-tests-for-men | sperm take "roughly 10–12 weeks to develop" | SAFELY_REWORDED | "develop over a period of weeks" |

Arithmetic: SUPPORTED_WITH_VERIFIED_SOURCE 0 + SAFELY_REMOVED 1 +
SAFELY_REWORDED 7 + UNRESOLVED 0 = **8**.

Every repetition of the same figure inside those eight articles was resolved in
the same way, so no flagged figure survives anywhere in those records. Instances
of similar figures in other TTC articles that carry structured sources were not
flagged by Phase 35B and were left untouched. No reworded sentence introduces a
new medical claim, and the NICE 12-month / 6-month benchmark, which is
attributed and now structurally sourced to CG156, was preserved.

UNRESOLVED UNSUPPORTED CLAIMS AFTER = 0.

## Boundaries preserved

- Source rendering behaviour unchanged: `ArticleSources` still renders label-only
  and structured records the same way, and JSON-LD citation behaviour in
  `ArticlePage` is untouched. Data only.
- Grounding changes 0; approvals 0; candidates 0; eligible-slug changes 0;
  routing-version changes 0.
- Reviewer claims added 0; medical reviewers invented 0; no review dates added.
