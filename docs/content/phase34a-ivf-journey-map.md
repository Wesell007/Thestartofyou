# Phase 34A — UK IVF journey map

28 domains, each with exactly one status. Status totals must equal 28 and do. Audit only; nothing is created, edited or linked as a result of this document.

Statuses: COVERED, PARTIALLY_COVERED, UNCOVERED, NOT_REQUIRED_AS_STANDALONE_CONTENT, BETTER_SERVED_BY_PRODUCT_OR_JOURNEY.

| # | Domain | Status | Current primary owner | Existing supporting content | Actual gap | Recommended treatment |
| --- | --- | --- | --- | --- | --- | --- |
| A | Understanding IVF | PARTIALLY_COVERED | `/ivf` hub | Hub orientation sections, TTC `ivf-and-treatment` | No readable "what IVF is" guide; hub is orientation, not explanation | New foundational explainer |
| B | Fertility assessment and referral | COVERED | `/articles/what-happens-at-a-fertility-appointment` | `when-to-ask-for-fertility-help`, fertility tests articles | None | Keep; link into IVF hub |
| C | Eligibility, NHS funding, private treatment | UNCOVERED | None | One paragraph inside `moving-from-ttc-to-ivf` | No UK funding or eligibility destination | New article (NHS, NICE, HFEA led) |
| D | Preparing for treatment | PARTIALLY_COVERED | `/ivf/before-transfer` | Timeline article | Preparation is stage framing, not practical detail | Expand stage page |
| E | Medicines, injections, ovarian stimulation | PARTIALLY_COVERED | `/articles/ivf-timeline-what-to-expect` | Companion prompts on before-transfer | Thin section only | Expand the timeline article |
| F | Monitoring scans and blood tests | PARTIALLY_COVERED | `/ivf/before-transfer` | Companion prompts | Exists only as prompts | Expand the timeline article |
| G | Trigger injection | UNCOVERED | None | Implicit in the timeline | No mention of trigger timing or its effect on testing | Section inside the timeline article |
| H | Egg collection | PARTIALLY_COVERED | `/articles/ivf-timeline-what-to-expect` | Companion prompts | One paragraph | Expand the timeline article |
| I | Sperm collection and preparation | UNCOVERED | None | `male-fertility-when-trying-to-conceive` (pre-treatment only) | Treatment-day process absent | Section inside the timeline article |
| J | Fertilisation | PARTIALLY_COVERED | `/articles/ivf-timeline-what-to-expect` | — | One paragraph, no ICSI | Fold into a fertilisation and ICSI guide |
| K | IVF versus ICSI | UNCOVERED | None | — | No decision support | New guide, merged with J |
| L | Embryo development and grading | UNCOVERED | None | — | No lab-stage explanation | New guide, merged with M |
| M | Blastocysts | NOT_REQUIRED_AS_STANDALONE_CONTENT | None | — | Sub-intent of L | Section inside the embryo guide |
| N | Fresh embryo transfer | PARTIALLY_COVERED | `/ivf/before-transfer` | Timeline article, `/ivf-timeline` tool | Transfer day practicalities thin | Expand stage page |
| O | Frozen embryo transfer (FET) | UNCOVERED | None | Tool supports 3-day and 5-day transfer only | FET pathway absent | New fresh-versus-frozen guide |
| P | Embryo freezing and storage | UNCOVERED | None | — | HFEA-regulated detail absent | Internal link plus a section in the FET guide |
| Q | The two-week wait | COVERED | `/ivf/after-transfer` | `/articles/two-week-wait`, companion prompts | None | Keep |
| R | Pregnancy testing after IVF | PARTIALLY_COVERED | `/ivf/after-transfer` | `when-to-take-a-pregnancy-test`, `faint-positive-pregnancy-test` | Trigger-shot effect on testing missing | Expand the after-transfer stage page |
| S | Symptoms after transfer | PARTIALLY_COVERED | `/ivf/after-transfer` | `compare` block in the timeline article | Depth sits in prompts | Expand the after-transfer stage page |
| T | OHSS and other side effects | UNCOVERED | None | `seekSupport` lines only | No safety destination for the highest-risk IVF complication | New article, safety review required |
| U | When treatment does not work | UNCOVERED | None | Companion prompt only | No owner for the hardest moment in the journey | New guide, merged with AA |
| V | Miscarriage or loss after fertility treatment | PARTIALLY_COVERED | `/articles/chemical-pregnancy` | `pregnancy-after-loss` | No IVF framing | Internal link only |
| W | After a positive IVF test | COVERED | `/ivf/early-pregnancy` | Pregnancy hub handover | None | Keep |
| X | Multiple pregnancy considerations | UNCOVERED | None | — | Not addressed | Internal link to pregnancy content |
| Y | Donor eggs and sperm | NOT_REQUIRED_AS_STANDALONE_CONTENT | None | — | HFEA-regulated, outside current editorial scope | Do not create; signpost HFEA |
| Z | Emotional wellbeing and relationships | COVERED | `/articles/emotional-impact-of-ivf` | Every stage page support group | None | Keep |
| AA | Taking a break, deciding whether to try again | UNCOVERED | None | Emotional article touches it | No decision support | Merge into the U guide, or expand the emotional article |
| AB | Questions to ask a fertility clinic | BETTER_SERVED_BY_PRODUCT_OR_JOURNEY | None | Prompts across stage pages | Better as a checklist than prose | Checklist opportunity |

## Status arithmetic

| Status | Domains | Count |
| --- | --- | --- |
| COVERED | B, Q, W, Z | 4 |
| PARTIALLY_COVERED | A, D, E, F, H, J, N, R, S, V | 10 |
| UNCOVERED | C, G, I, K, L, O, P, T, U, X, AA | 11 |
| NOT_REQUIRED_AS_STANDALONE_CONTENT | M, Y | 2 |
| BETTER_SERVED_BY_PRODUCT_OR_JOURNEY | AB | 1 |
| **Total** | | **28** |

Eleven uncovered domains resolve to only four new articles, because several domains deliberately merge into one owner (J+K, L+M, O+P, U+AA) and others resolve to sections, links or product surfaces.
