# Phase 32F — Intent ownership map

Records the primary owner, supporting surfaces, structured context and the
future owner after any publication decision, for each named intent family.
No ownership was changed by redirect, canonical or slug work in this phase;
ownership is expressed only through link direction and existing architecture.

| Intent family | Primary owner | Supporting surfaces | Structured context | After future publication |
| --- | --- | --- | --- | --- |
| Pregnancy dating | `/due-date-calculator` → `/due-date-results` | `/articles/dating-scan`, `/pregnancy` week index | 42 week pages | unchanged |
| Bleeding / discharge in pregnancy | `/articles/bleeding-in-early-pregnancy` | `/articles/spotting-in-pregnancy`, `/articles/discharge-in-pregnancy`, `/articles/watery-discharge-in-pregnancy` | `/pregnancy/body` | unchanged |
| Pelvic pain | `/articles/pelvic-pain-in-pregnancy` | `/articles/round-ligament-pain`, `/articles/back-pain-in-pregnancy` | `/pregnancy/body` | unchanged |
| Pelvic floor | `/articles/pelvic-floor-exercises-in-pregnancy` | `/first-year/body-and-hormones/body-changes-after-birth` | `/pregnancy/diet-and-exercise` | unchanged |
| Body changes after birth | `/articles/your-body-after-birth` | `/first-year/body-and-hormones/body-changes-after-birth`, `/first-year/body-and-hormones/hormones-sweat-and-hair-loss` | `/first-year/body-and-hormones` | First Year article may become primary; migration documented, not performed |
| Postpartum recovery (physical) | `/articles/postpartum-recovery-timeline` | `/first-year/postpartum-recovery/healing-after-birth`, `/first-year/postpartum-recovery/what-recovery-can-feel-like` | `/first-year/postpartum-recovery` | as above |
| Postnatal mental health | `/first-year/emotional-wellbeing/when-parenthood-feels-heavy` | `/first-year/emotional-wellbeing/feeling-like-yourself-again`, `/articles/perinatal-anxiety` | `/first-year/emotional-wellbeing` | unchanged |
| Milestones / development | `/articles/baby-milestones-first-year` | `/first-year/development/baby-development-in-the-first-year`, `/first-year/development/when-milestones-feel-uneven` | 13 month pages, 4 phase pages | canonical decision still open (`needs-decision`); deferred |
| Baby sleep | `/articles/baby-sleep-first-year` | `/first-year/sleep/newborn-sleep-expectations`, `/first-year/sleep/helping-your-baby-settle` | `/first-year/sleep` | unchanged |
| Feeding | `/articles/feeding-your-baby-complete-guide` | `/first-year/feeding/newborn-feeding-rhythms`, `/first-year/feeding/bottle-and-breastfeeding-questions` | `/first-year/feeding` | unchanged |

## Ownership signals added in this phase

Each supporting First Year article now carries one neutral contextual link up
to its primary owner, making the hierarchy legible to both readers and
crawlers. No positioning copy was rewritten, and no health, safety,
developmental or escalation wording was introduced.

## Future-publication link migration — all 19 held drafts

Planning record only. **No link below has been added.** All 19 drafts remain
`PUBLICATION STATUS: NOT PUBLISHED`, and no live page links to any of them.

Source counts: 32A = 3, 32B = 4, 32C = 3, 32D = 9. Total 19.

Migration classification is one of `CHANGES_LINK_OR_INTENT_OWNERSHIP` (a live
surface currently holds the intent and links would need retargeting) or
`NO_LINK_MIGRATION_REQUIRED` (genuine gap; publication only adds inbound links).

### 32A (3)

| # | Title | Proposed slug | Current live owner | Future owner | Links to add on publication | Links to retarget | Coverage to preserve until launch | Launch-time cannibalisation check | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Itching in pregnancy | `itching-in-pregnancy` | None (topic-level mention on `/pregnancy/body`) | The new article | From `/pregnancy/body`, third-trimester surfaces, related lists on skin/liver-adjacent guides | None | `/pregnancy/body` general skin coverage | Confirm no existing skin article absorbs the intent | NO_LINK_MIGRATION_REQUIRED |
| 2 | Caesarean birth | `caesarean-birth` | `/articles/signs-of-labour` and postpartum recovery guides carry caesarean asides | The new article | From birth-preparation, third-trimester and recovery surfaces | Caesarean asides in `/articles/postpartum-recovery-timeline` and labour guides point to the new owner | Existing caesarean asides stay live until launch | Verify the recovery timeline does not remain a competing caesarean owner | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 3 | Gestational diabetes | `gestational-diabetes` | None (glucose-test mention in appointment content) | The new article | From `/pregnancy/health-and-safety`, second-trimester and appointment surfaces | None | Existing appointment/test mentions | Confirm diet-and-exercise pages do not compete | NO_LINK_MIGRATION_REQUIRED |

### 32B (4)

| # | Title | Proposed slug | Current live owner | Future owner | Links to add on publication | Links to retarget | Coverage to preserve until launch | Launch-time cannibalisation check | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 4 | Teething | `teething` | Month pages carry teething age context | The new article | From the relevant month pages, `/first-year/care-and-safety` | Month-page teething context becomes supporting and links up | Month-page context stays live until launch | Ensure month pages do not remain parallel owners | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 5 | Colic and evening crying | `colic-and-evening-crying` | None | The new article | From `/first-year/care-and-safety`, 0–3 month phase, early month pages | None | Existing crying references in phase content | Confirm sleep articles do not absorb the intent | NO_LINK_MIGRATION_REQUIRED |
| 6 | Introducing solid foods | `introducing-solid-foods` | `/articles/feeding-your-baby-complete-guide` (weaning section) | The new article for weaning specifically | From `/first-year/feeding`, 6-month onwards month pages | Weaning section of the feeding guide links down to the new owner | Feeding guide weaning coverage | Feeding guide must be repositioned as the broad parent, not a weaning competitor | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 7 | When your baby's sleep suddenly changes | `when-sleep-suddenly-changes` | `/articles/baby-sleep-first-year` (regression coverage) | The new article for the regression sub-intent | From `/first-year/sleep`, month pages with sleep-change context | Regression references in the sleep primary and month pages | Sleep primary regression coverage | Re-check CAN-03: primary keeps the broad intent, draft takes the sub-intent | CHANGES_LINK_OR_INTENT_OWNERSHIP |

### 32C (3)

| # | Title | Proposed slug | Current live owner | Future owner | Links to add on publication | Links to retarget | Coverage to preserve until launch | Launch-time cannibalisation check | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | Stitches, tears and perineal healing | `stitches-tears-and-perineal-healing` | `/articles/postpartum-recovery-timeline` and `healing-after-birth` | The new article for perineal healing | From `/first-year/postpartum-recovery`, both recovery articles | Perineal passages in `healing-after-birth` link down to the new owner | Existing perineal coverage | Re-check CAN-01 ownership direction | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 9 | Separated tummy muscles after birth | `separated-tummy-muscles` | `/articles/your-body-after-birth` (brief mention) | The new article | From `/first-year/body-and-hormones`, `body-changes-after-birth` | The tummy-muscle mention links down to the new owner | Existing mention | Re-check CAN-02 direction | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 10 | Sex and intimacy after birth | `sex-and-intimacy-after-birth` | None | The new article | From `/first-year/body-and-hormones`, recovery articles, relationships content | None | Brief intimacy references | Confirm no relationships article competes | NO_LINK_MIGRATION_REQUIRED |

### 32D (9)

| # | Title | Proposed slug | Current live owner | Future owner | Links to add on publication | Links to retarget | Coverage to preserve until launch | Launch-time cannibalisation check | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11 | Hair dye and beauty treatments in pregnancy | `hair-dye-and-beauty-treatments-in-pregnancy` | None | The new article | From `/pregnancy/health-and-safety` | None | Generic safety coverage | Confirm no safety article absorbs it | NO_LINK_MIGRATION_REQUIRED |
| 12 | Normal newborn quirks and reflexes | `newborn-quirks-and-reflexes` | None | The new article | From `/first-year/care-and-safety`, 0–3 month phase | None | Phase-level newborn content | Confirm development primary stays distinct | NO_LINK_MIGRATION_REQUIRED |
| 13 | Newborn skin: spots, marks and dry patches | `newborn-skin-spots-and-marks` | None | The new article | From `/first-year/care-and-safety`, early month pages | None | Existing care coverage | Confirm illness draft stays distinct | NO_LINK_MIGRATION_REQUIRED |
| 14 | Common illnesses in the first year | `common-illnesses-in-the-first-year` | None | The new article | From `/first-year/checkups-and-warning-signs` | None | Warning-signs coverage | Warning-signs page must remain the escalation owner | NO_LINK_MIGRATION_REQUIRED |
| 15 | Diarrhoea and tummy bugs in pregnancy | `diarrhoea-and-tummy-bugs-in-pregnancy` | None | The new article | From `/pregnancy/health-and-safety` | None | Generic illness coverage | Confirm cold-and-flu article stays distinct | NO_LINK_MIGRATION_REQUIRED |
| 16 | Leg cramps in pregnancy | `leg-cramps-in-pregnancy` | None | The new article | From `/pregnancy/body`, second and third trimester | None | Body-topic coverage | Confirm back-pain and swelling articles stay distinct | NO_LINK_MIGRATION_REQUIRED |
| 17 | hCG levels: what the pregnancy hormone tells you | `hcg-levels-explained` | Pregnancy-test and two-week-wait articles carry hCG explanation | The new article | From TTC test surfaces, early pregnancy content | hCG passages in test/two-week-wait articles link to the new owner | Existing hCG explanation | Test-timing articles must stay the testing owner | CHANGES_LINK_OR_INTENT_OWNERSHIP |
| 18 | Sex during pregnancy | `sex-during-pregnancy` | None | The new article | From `/pregnancy/feelings`, `/pregnancy/body` | None | Existing brief references | Must stay distinct from the 32C postnatal intimacy draft | NO_LINK_MIGRATION_REQUIRED |
| 19 | Dizziness and feeling faint in pregnancy | `dizziness-and-feeling-faint-in-pregnancy` | None | The new article | From `/pregnancy/body`, first trimester | None | Body-topic coverage | Confirm no symptom article competes | NO_LINK_MIGRATION_REQUIRED |

### Draft reconciliation

```text
CHANGES_LINK_OR_INTENT_OWNERSHIP  7   (#2, #4, #6, #7, #8, #9, #17)
NO_LINK_MIGRATION_REQUIRED       12
= 19
```

Assessed 19/19. Affected intent families for re-check at launch: CAN-01,
CAN-02, CAN-03, plus feeding and hCG/testing ownership.
