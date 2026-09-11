# Phase 33 — Human Review Pack

> **Phase 33.3 update.** All 19 articles now exist as runtime records in the
> existing datasets (`src/data/articleData.ts` for the 9 Legacy articles,
> `src/data/firstYearArticleData.ts` for the 10 First Year articles) and can be
> read in the frontend preview at their live routes. Reviewers should review the
> runtime copy at those routes, which is authoritative. Governance is unchanged:
> 19 held for human review, 0 reviews completed, 0 deployment eligible.


**19 articles.** Human reviews completed: **0**. Nothing in this pack is
approved for production, and nothing may be deployed until a named human
reviewer completes the record below it.

Records 1–17 are documentation-only drafts: runtime record present **NO**,
publication status **NOT PUBLISHED**, images generated **0**.

Records 18–19 are the two Batch 1 articles. Their runtime records are
**present** and render in repository/build preview, but they were
reclassified in the Phase 33.2 governance correction and are **not**
production approved:

- `when-sleep-suddenly-changes` — `SAFETY_REVIEW_REQUIRED`
- `hair-dye-and-beauty-treatments-in-pregnancy` — `HEALTH_REVIEW_REQUIRED`

Both are `HOLD_HUMAN_REVIEW` for Phase 33 production purposes and
deployment eligible **NO**.

**Draft text.** Records 1–17 point to the verbatim draft in the source
document with an exact line range, so every reviewer decision is made
against the single authoritative text. Records 18–19 instead reproduce the
**current runtime copy**, because runtime conversion changed the wording
from the original documentation drafts.

Shared reviewer checkpoints, applied to every record below:

1. Every clinical claim is supported by the listed UK sources.
2. Escalation wording is correct, complete and in the right order of
   urgency (999 / A&E, 111, maternity unit, GP, midwife, health visitor,
   pharmacist).
3. No wording invites delay in seeking help.
4. Nothing reads as diagnosis, prognosis or personal medical advice.
5. Excluded claims have stayed excluded.
6. Tone is calm and non-alarmist without minimising risk.
7. British English, UK services and UK thresholds throughout.

---

## 1. Itching in pregnancy

- Slug: `itching-in-pregnancy` · Phase 32A · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32a-article-drafts.md`, lines 11–104
- Sources: NHS Itching in pregnancy; RCOG Green-top Guideline No. 43 (2022);
  RCOG patient information on ICP
- Supported claims: itching is common and usually caused by hormone change
  and skin stretching; it usually settles after birth; ICP is a liver
  condition needing treatment; severe itching, itching worse at night, or
  itchy palms and soles need urgent contact; ICP is diagnosed by the
  maternity team with blood tests; ICP care includes extra monitoring and
  medicine; small risks of early birth and, in severe ICP, stillbirth.
- Excluded claims: any probability that itching means ICP; self-diagnosis;
  named prescription regimens; reassurance that itching can be watched.
- Escalation wording to check: "Get urgent medical help now"; maternity unit
  first, 111 if unreachable; separate GP list for non-urgent itching.
- Specific checkpoints: the urgent list matches NHS wording exactly; the ICP
  risk paragraph is proportionate; the self-care list is safe in pregnancy.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 2. Caesarean birth

- Slug: `caesarean-birth` · Phase 32A · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32a-article-drafts.md`, lines 108–185
- Sources: NHS Caesarean section overview; NHS Caesarean section recovery
- Supported claims: what the operation involves; planned caesareans usually
  from 39 weeks; spinal or epidural is usual; typical duration; the right to
  request a caesarean and to be referred; recovery in hospital and at home;
  wound and stitch care; painkiller guidance while breastfeeding; signs of
  infection and clot; risks of surgery; VBAC is possible for most.
- Excluded claims: caesarean rates presented as a recommendation; individual
  suitability for VBAC; pain-relief dosing; recovery timelines as rules.
- Escalation wording to check: the "contact your midwife or a GP straight
  away" list, particularly breathlessness and leg swelling.
- Specific checkpoints: the 45% England figure and its currency; the request
  and referral paragraph against current NICE/NHS wording; the recovery
  section stays orienting so it does not compete with the postpartum
  recovery article.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 3. Gestational diabetes

- Slug: `gestational-diabetes` · Phase 32A · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32a-article-drafts.md`, lines 189–268
- Sources: NHS Gestational diabetes; NICE NG3
- Supported claims: definition and mechanism; usual second or third
  trimester onset; usually resolves after birth; the UK risk-factor list for
  screening; OGTT at 24–28 weeks, earlier with prior GDM; often no symptoms;
  possible complications; monitoring, diet and activity first, medicine if
  needed; birth before 41 weeks; postnatal testing at 6–13 weeks then
  annually; raised future type 2 risk.
- Excluded claims: blood glucose target numbers; diet plans; medicine
  selection; individual risk figures.
- Escalation wording to check: the "who to contact" section, and that
  reduced fetal movement routes to the maternity team at any hour.
- Specific checkpoints: risk-factor list matches NHS wording; no numeric
  targets have crept in; the boundary with the glucose tolerance test
  article holds.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 4. Teething

- Slug: `teething` · Phase 32B · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32b-article-drafts.md`, lines 9–94
- Sources: NHS Baby teething symptoms; NHS Tips for helping your teething
  baby
- Supported claims: typical onset around six months with a wide normal
  range; usual order of eruption; mild and short-lived signs; a temperature
  of 38C or above is not teething; no evidence teething causes diarrhoea;
  chilled never frozen teething rings; paracetamol from two months,
  ibuprofen from three months; no aspirin under sixteen; little evidence for
  teething gels; homeopathic products not recommended; dental registration
  and fluoride brushing from the first tooth.
- Excluded claims: teething as an explanation for illness; dosing figures;
  named products.
- Escalation wording to check: the instruction to seek GP or 111 advice
  rather than attributing symptoms to teeth.
- Specific checkpoints: the age thresholds for painkillers; the "what
  teething does not explain" section is unambiguous.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 5. Colic and evening crying

- Slug: `colic-and-evening-crying` · Phase 32B · SAFETY_REVIEW_REQUIRED
- Draft: `docs/content/phase32b-article-drafts.md`, lines 98–189
- Sources: NHS Colic; NHS Soothing a crying baby
- Supported claims: the UK colic definition (over three hours a day, more
  than three days a week, for at least a week, in an otherwise healthy
  baby); crying peaks around two weeks and eases by around three to four
  months; cause unknown; possible cows' milk allergy link; soothing measures;
  gripe water, anti-colic drops, herbal and probiotic remedies not
  recommended; cranial osteopathy and spinal manipulation advised against;
  Cry-sis helpline 0800 448 0737, 9am–10pm daily.
- Excluded claims: any remedy endorsement; dietary elimination advice for
  breastfeeding parents; controlled crying or sleep-training methods.
- Escalation wording to check: 999 or A&E for a weak, high-pitched or
  unusual cry; 111 or GP if worried, not coping, or growth is a concern;
  the safe "put the baby down somewhere safe and step away" wording.
- Specific checkpoints: the coping paragraph is safe and non-judgemental and
  does not imply an unsupervised absence; the helpline details are current.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 6. Introducing solid foods

- Slug: `introducing-solid-foods` · Phase 32B · SAFETY_REVIEW_REQUIRED
- Draft: `docs/content/phase32b-article-drafts.md`, lines 193–302
- Sources: NHS Your baby's first solid foods; NHS Food allergies in babies
  and young children
- Supported claims: start at around six months; the three readiness signs
  together; misread signs including night waking; solids do not improve
  sleep; texture progression; no added salt or sugar; introducing allergenic
  foods one at a time from around six months and keeping them in the diet;
  safe forms for nuts, eggs and shellfish; delay beyond 6–12 months may
  raise peanut and egg allergy risk; reaction signs and timings; anaphylaxis
  is a 999 emergency; never exclude a major food group without advice;
  always stay with a baby who is eating; gagging versus choking.
- Excluded claims: baby-led weaning versus purée advocacy; portion sizes;
  named products; first-aid instructions in place of training.
- Escalation wording to check: 999 for anaphylaxis; GP or health visitor
  first where there is existing allergy, eczema or family history;
  signposting to NHS choking guidance.
- Specific checkpoints: allergen list and safe-form wording; the premature
  baby line; the choking paragraph does not read as a first-aid procedure.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 7. Stitches, tears and perineal healing

- Slug: `stitches-tears-and-perineal-healing` · Phase 32C ·
  SAFETY_REVIEW_REQUIRED
- Draft: `docs/content/phase32c-article-drafts.md`, lines 11–102
- Sources: NHS Episiotomy and perineal tears; NHS Your body after the birth;
  NHS Your 6-week postnatal check
- Supported claims: up to nine in ten first vaginal births involve a tear,
  graze or episiotomy; dissolvable stitches, healing within about a month;
  plain warm water and gentle drying; warm water while peeing; a clean pad
  held against stitches while pooing; front-to-back wiping; avoiding
  constipation; paracetamol first line and safe while breastfeeding,
  ibuprofen to be checked, no aspirin while breastfeeding; wrapped cold
  pack; pelvic floor exercises support healing; painful sex is common and
  should be raised.
- Excluded claims: sitz baths, salt or herbal additions, witch hazel;
  self-grading of tear degree; wound-care procedures; exercise-return
  timelines.
- Escalation wording to check: the "when to ask for help" list, especially
  infection signs, difficulty peeing, and any loss of bowel or wind control.
- Specific checkpoints: the analgesia paragraph; that incontinence symptoms
  are framed as needing a professional conversation, not acceptance.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 8. Separated tummy muscles after birth

- Slug: `separated-tummy-muscles` · Phase 32C · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32c-article-drafts.md`, lines 106–168
- Sources: NHS Your post-pregnancy body; NHS Your body after the birth
- Supported claims: the mechanism of diastasis recti; a separation of around
  two finger widths is common; usually settles by around eight weeks;
  pelvic floor and deep abdominal exercises plus posture help; avoid
  sit-ups, planks, high-impact exercise, heavy lifting and straining; if
  still obvious at eight weeks, or with tummy pain, contact the GP for a
  physiotherapy referral.
- Excluded claims: finger-width self-grading as severity; prescribed
  repetitions or programmes; a promise that every gap closes; surgical
  framing; bounce-back language.
- Escalation wording to check: GP contact at eight weeks and for tummy pain,
  with the physiotherapy referral route named.
- Specific checkpoints: no exercise programme has crept in; the appearance
  paragraph stays function-focused.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 9. Sex and intimacy after birth

- Slug: `sex-and-intimacy-after-birth` · Phase 32C · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32c-article-drafts.md`, lines 172–243
- Sources: NHS Sex and contraception after birth; NHS Episiotomy and
  perineal tears; NHS Caesarean section recovery; NHS Your 6-week postnatal
  check
- Supported claims: no fixed date for resuming sex; dryness is common,
  particularly while breastfeeding; water-based lubricant, and oil-based
  can damage latex; pain during sex is common after a tear or episiotomy and
  should be raised with a GP; pregnancy is possible from three weeks, so
  contraception within 21 days; which methods can start immediately, the
  coil timings, combined method timings by breastfeeding status; lactational
  amenorrhoea only under narrow conditions.
- Excluded claims: a six-week rule as medical instruction; libido or
  frequency expectations; treatment advice for painful sex beyond seeking
  help; personalised contraception recommendations.
- Escalation wording to check: the routing of painful sex to the GP or
  postnatal check, and contraception to midwife, health visitor, GP or
  sexual health clinic.
- Specific checkpoints: every contraception timing against current NHS
  wording; the caesarean paragraph is consistent with the caesarean draft.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 10. Normal newborn quirks and reflexes

- Slug: `newborn-quirks-and-reflexes` · Phase 32D · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 74–144
- Sources: NHS Getting to know your newborn; NHS Rashes in babies and
  children; NHS High temperature (fever) in children
- Supported claims: newborn reflexes and their fading; irregular breathing,
  snuffles and hiccups; the fontanelles and their closure; newborn vision
  and occasional eye drift settling by around four months; birth swelling
  and bruising; umbilical stump care; sneezing and posseting.
- Excluded claims: developmental timelines beyond the sources; reflex
  testing by parents; reassurance that a specific symptom is harmless;
  anything that encourages delay.
- Escalation wording to check: the urgent list (under three months with 38C
  or above, work of breathing, colour change, floppiness, non-blanching
  rash), plus 111 and 999 routing.
- Specific checkpoints: sunken or bulging fontanelle wording; the fever
  threshold by age.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 11. Newborn skin: spots, marks and dry patches

- Slug: `newborn-skin-spots-and-marks` · Phase 32D · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 148–203
- Sources: NHS Getting to know your newborn; NHS Cradle cap; NHS Rashes in
  babies and children; NHS High temperature (fever) in children
- Supported claims: newborn skin barrier maturity and plain-water bathing
  for at least the first month; vernix left in place; peeling in post-term
  babies; common newborn spot patterns; cradle cap description across skin
  tones, harmlessness and self-resolution; common birthmarks and their
  fading; nappy rash care and when a pharmacist should see it.
- Excluded claims: diagnosis from description or photograph; eczema or
  infection treatment protocols; product recommendations; declaring any
  rash harmless without assessment.
- Escalation wording to check: the urgent rash list, the glass test, and
  the under-three-months fever threshold.
- Specific checkpoints: cradle cap description is inclusive of brown and
  black skin; no rash imagery is implied or required.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 12. Common illnesses in the first year

- Slug: `common-illnesses-in-the-first-year` · Phase 32D ·
  SAFETY_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 207–284
- Sources: NHS High temperature (fever) in children; NHS Diarrhoea and
  vomiting; NHS Rashes in babies and children; NHS Baby reviews
- Supported claims: the 999 and 111 lists and their thresholds by age;
  colds are common and cough and cold medicines are unsuitable for babies;
  38C defines a high temperature and usually settles in one to four days;
  paracetamol not under two months, ibuprofen not under three months or
  under 5kg, dehydrated, with chickenpox, or in asthma without advice; no
  aspirin under sixteen; do not undress or sponge to cool; do not alternate
  antipyretics unadvised; tummy bug durations and fluid-first management;
  hygiene measures; health visiting reviews.
- Excluded claims: diagnosis of specific infections; dosing figures beyond
  the source's age and weight cautions; antibiotic guidance; any suggestion
  the page replaces 111, a GP or emergency care.
- Escalation wording to check: this is the highest-risk escalation content in
  the set. The 999 list leads the article and must be verbatim-faithful to
  NHS thresholds, including the age-banded fever rules.
- Specific checkpoints: age-banded temperature thresholds; medicine
  cautions; the "not themselves" instinct line stays as an explicit reason
  to call.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 13. Diarrhoea and tummy bugs in pregnancy

- Slug: `diarrhoea-and-tummy-bugs-in-pregnancy` · Phase 32D ·
  HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 288–345
- Sources: NHS Diarrhoea and vomiting; NHS Common health problems in
  pregnancy
- Supported claims: digestion changes in pregnancy; typical durations
  (diarrhoea five to seven days, vomiting one to two); fluids first;
  avoiding juice and fizzy drinks; asking a pharmacist before anti-diarrhoea
  medicines; oral rehydration sachets; paracetamol for discomfort; hygiene
  measures; stricter food safety in pregnancy.
- Excluded claims: any named anti-diarrhoea medicine as safe in pregnancy;
  a link between diarrhoea and labour; dietary treatment protocols;
  reassurance that a stomach bug cannot affect a pregnancy.
- Escalation wording to check: the contact list, including dehydration
  signs, blood in stools, high temperature, recent travel, and any change in
  fetal movements or bleeding.
- Specific checkpoints: severe pregnancy sickness routing; that the fetal
  movement line is unmissable.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 14. Leg cramps in pregnancy

- Slug: `leg-cramps-in-pregnancy` · Phase 32D · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 349–402
- Sources: NHS Common health problems in pregnancy
- Supported claims: cramps are common, often nocturnal, and not a sign
  something is wrong; stretching the calf breaks the cramp; gentle regular
  exercise and ankle movements may help; hydration; weak evidence for
  remedies including magnesium; side-sleeping from the second half of
  pregnancy.
- Excluded claims: supplement recommendations; deficiency claims; any
  self-checklist that rules out a clot; stretching protocols as proven.
- Escalation wording to check: the clot boundary — persistent one-leg pain,
  swelling, warmth, redness or discolouration, calf tenderness, and 999 for
  breathlessness or chest pain.
- Specific checkpoints: the clot section is prominent and cannot be read as
  self-assessment; the sleep-position line matches current guidance.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 15. hCG levels explained

- Slug: `hcg-levels-explained` · Phase 32D · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 406–465
- Sources: Eastern Pathology Alliance (NHS) hCG; Saint Mary's, Manchester
  University NHS Foundation Trust hCG monitoring leaflet; NHS Ectopic
  pregnancy; NHS Miscarriage
- Supported claims: what hCG is and where it is measured; levels rise
  quickly and peak around ten weeks; the normal range is wide, so a single
  number tells you little; clinicians look at the pattern over roughly two
  days; why early pregnancy units repeat tests; slow, plateauing or falling
  levels prompt assessment; home tests answer yes or no and line-comparing
  is unreliable.
- Excluded claims: hCG value tables or ranges by week; doubling figures as a
  rule readers can apply; interpretation of an individual result; predicting
  outcome, twins or gestational age; quantitative home testing.
- Escalation wording to check: the ectopic emergency list, including
  shoulder-tip pain and collapse, with early pregnancy unit, GP, 111 and 999
  routing.
- Specific checkpoints: no numeric ranges have been introduced; the two NHS
  trust and pathology sources are acceptable as clinical references.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 16. Sex during pregnancy

- Slug: `sex-during-pregnancy` · Phase 32D · HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 471–527
- Sources: NHS Inform Sex and sexual health in pregnancy (Ready Steady
  Baby); NHS Common health problems in pregnancy
- Supported claims: sex is normally safe unless advised otherwise; the baby
  is protected by amniotic fluid, the womb and the mucus plug; the
  situations where a clinician may advise against it; desire varies;
  comfort and position guidance in general terms; mild cramping or spotting
  afterwards can happen; STIs can affect pregnancy and are treatable.
- Excluded claims: sex as a safe method of induction; explicit technique
  instruction; any position as medically recommended; reassurance that
  bleeding after sex never matters.
- Escalation wording to check: contacting the midwife or maternity unit for
  bleeding at any time, pain that does not settle, regular tightenings,
  suspected waters breaking, or possible infection.
- Specific checkpoints: the low-lying placenta and preterm history wording;
  that bleeding after sex always routes to a professional.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 17. Dizziness and feeling faint in pregnancy

- Slug: `dizziness-and-feeling-faint-in-pregnancy` · Phase 32D ·
  HEALTH_REVIEW_REQUIRED
- Draft: `docs/content/phase32d-article-drafts.md`, lines 531–587
- Sources: NHS Common health problems in pregnancy; NHS Ectopic pregnancy
- Supported claims: feeling faint is common and usually circulatory; common
  triggers; lying flat later in pregnancy can cause light-headedness;
  practical measures including standing slowly, sitting or lying with legs
  raised, rolling onto the side, eating regularly and keeping cool;
  side-sleeping from the second half of pregnancy; workplace risk
  assessment rights.
- Excluded claims: diagnosis of anaemia, low blood pressure or low blood
  sugar; supplement or iron recommendations; blood-pressure figures; any
  claim that dizziness is always harmless.
- Escalation wording to check: the pre-eclampsia cluster (headache, blurred
  vision, flashing lights, swelling), palpitations or chest pain, faintness
  with bleeding or pain in early pregnancy, changed fetal movements, and
  999 for chest pain, severe breathlessness or collapse.
- Specific checkpoints: the ectopic paragraph; that the pre-eclampsia
  symptoms are complete and correctly urgent.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 18. When your baby's sleep suddenly changes (Batch 1)

- Slug: `when-sleep-suddenly-changes` · Phase 32B · **SAFETY_REVIEW_REQUIRED**
  (corrected from `LOW_RISK_GENERAL` in the Phase 33.2 governance correction)
- Runtime record: PRESENT — `src/data/firstYearArticleData.ts`, First Year
  dataset, topic `sleep`, rendered by `FirstYearArticlePage` →
  `HubArticleView` at `/first-year/sleep/when-sleep-suddenly-changes`
- Runtime record state: `status: "ready"` — the existing dataset value that
  makes the record renderable. It does not mean human reviewed, safety
  approved, production approved or deployment eligible.
- Human review: REQUIRED / NOT COMPLETED
- Phase 33 production status: HOLD_HUMAN_REVIEW · Deployment eligible: NO
- Deployment blocker: HUMAN REVIEW REQUIRED · Safe non-public runtime draft
  state: NO · Accidental deployment risk: YES
- Sources (as held in the runtime record): NHS, Helping your baby to sleep —
  https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/ ·
  NHS, Your baby's first solid foods —
  https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/ ·
  NHS Start for Life, Baby development —
  https://www.nhs.uk/start-for-life/baby/baby-development/

### Current runtime copy

**Title:** When your baby's sleep suddenly changes

**Description:** Why a settled baby can start waking again, what tends to be
behind it, and what actually helps, without treating sleep regressions as
fixed stages.

**Intro:** Sleep can suddenly feel different, even when you thought you had
found a rhythm. A baby who was settling well starts waking again, naps
shorten, bedtime unravels. It is disorientating, and it is one of the most
searched-for things in the first year.

**About the phrase "sleep regression"**

You will see "four month sleep regression" and similar phrases everywhere.
It is a useful shorthand parents use for a patch of disrupted sleep, and if
it describes your week then it describes your week.

It is worth knowing that it is not a medical or developmental diagnosis, and
UK health guidance does not set out fixed regressions at particular ages or
say how long they last. So rather than working out which regression you are
in, it is usually more useful to look at what has actually changed.

**Sleep was always going to change**

Babies' sleep patterns vary from birth, just as adults' do. Some need more
sleep than others, and how much they need changes across the first year.

A settled few weeks is not a permanent state you can lose; it is one part of
a pattern that keeps moving.

**Things that commonly disturb a settled pattern**

New skills. Rolling, sitting, pulling up and other new abilities often bubble
up at night. Babies practise them at the least convenient hour.

Being unwell, or teething discomfort.

Changes in routine or surroundings, such as travel, a new room, or a return
to work.

Changing sleep needs, as naps drop or shift and daytime sleep rebalances.

Hunger or feeding changes. Worth saying clearly: starting solids will not
make your baby sleep through the night, and extra night waking is not a sign
your baby is ready for solids.

**What tends to help**

Keep day and night distinct. During the day, open the curtains, play and do
not worry too much about noise. At night, keep lights low, keep your voice
quiet, avoid playing, and settle them again without much stimulation.

Keep a simple bedtime routine. A bath, fresh nappy and night clothes, a
story, dimmed lights, a song, a goodnight cuddle. Familiar order does more
than any single step.

Wind down beforehand. Excitement close to bedtime can wake a baby up again.

Stay consistent for longer than feels natural. Patches of disrupted sleep
usually pass, and constant changes of approach make it harder to tell what
is working.

**Safe sleep stays the same**

Whatever is happening with sleep, the safe-sleep basics do not change. Your
baby should sleep in the same room as you for at least the first six months,
day and night, which reduces the risk of sudden infant death syndrome.

Follow the NHS safe-sleep advice and the Lullaby Trust guidance rather than
any settling suggestion that conflicts with it, and if you use a sling, use
it safely.

If your baby falls asleep in the car seat during a drive, take them out and
put them on a firm, flat surface as soon as you can.

**When to ask for advice**

Speak to your health visitor, GP or NHS 111 if your baby seems unwell, if
feeding or weight gain is a worry, if the change in sleep is accompanied by
anything that concerns you, or if broken nights are affecting how you are
coping.

Health visitors talk about sleep constantly; you do not need a serious reason
to ask.

**How this can feel for you**

Broken sleep after a settled stretch hits harder than broken sleep you were
braced for. It is normal to feel resentful, foggy and less patient than you
want to be.

Sharing nights where you can, lowering your standards for a while and telling
someone how tired you are all count as strategies.

**Key takeaways**

- Sleep patterns vary and keep changing through the first year.
- "Sleep regression" is a common parent term, not a fixed developmental
  stage, and there is no set age or duration.
- New skills, illness, teething, routine changes and shifting sleep needs are
  common reasons a pattern changes.
- Solids will not make your baby sleep through the night.
- Clear day and night cues plus a simple, consistent bedtime routine help
  most.
- Safe-sleep guidance, including room-sharing for at least six months, does
  not change.

### Supported claims

Sleep patterns vary and keep changing; "sleep regression" is a parent term
rather than a fixed developmental stage; the listed common causes of a
changed pattern; day/night cues and a consistent bedtime routine as general
help; solids do not improve night sleep and extra waking is not a readiness
sign; room-sharing for at least the first six months reduces SIDS risk;
deferring to NHS and Lullaby Trust safe-sleep guidance; safe sling use;
moving a baby who falls asleep in a car seat onto a firm, flat surface;
routing concerns to a health visitor, GP or NHS 111.

### Excluded claims

No age-specific regression stages or durations; no sleep-training method or
prescribed settling technique; no claim that any approach will make a baby
sleep through; no diagnosis of illness, reflux or teething from sleep
change; no co-sleeping instruction; no reassurance that a change in sleep is
always harmless.

### Reviewer checkpoints

1. Room-sharing wording — "same room as you for at least the first six
   months, day and night".
2. SIDS risk-reduction wording — that reducing risk is stated accurately and
   without overstating or understating it.
3. NHS alignment — the safe-sleep deferral matches current NHS guidance.
4. Lullaby Trust alignment — the reference is accurate and current.
5. Sleep-surface wording — "firm, flat surface" phrasing is correct and
   complete for the context in which it appears.
6. Car-seat transfer guidance — the instruction and its urgency are correct.
7. Sling wording — "if you use a sling, use it safely" is sufficient, or
   should route explicitly to safe-sling guidance.
8. Solids-and-sleep statement — the claim and the readiness statement are
   both supported.
9. Professional-advice routing — health visitor, GP and NHS 111 are the right
   routes, in the right order, with nothing that invites delay.
10. Hero and body imagery imply nothing beyond the guidance in the copy.

Reviewer:

Review date:

Outcome:

Reviewer notes:

---

## 19. Hair dye and beauty treatments in pregnancy (Batch 1)

- Slug: `hair-dye-and-beauty-treatments-in-pregnancy` · Phase 32D ·
  **HEALTH_REVIEW_REQUIRED** (corrected from `LOW_RISK_GENERAL` in the Phase
  33.2 governance correction)
- Runtime record: PRESENT — `src/data/articleData.ts`, legacy dataset, topic
  `health-and-safety`, rendered by the existing flagship dispatch at
  `/articles/hair-dye-and-beauty-treatments-in-pregnancy`
- Runtime record state: the legacy dataset has **no editorial status field**,
  and none was invented. The record is renderable because it exists in the
  dataset.
- Human review: REQUIRED / NOT COMPLETED
- Phase 33 production status: HOLD_HUMAN_REVIEW · Deployment eligible: NO
- Deployment blocker: HUMAN REVIEW REQUIRED · Safe non-public runtime draft
  state: NO · Accidental deployment risk: YES
- Source (as held in the runtime record): NHS Best Start in Life, Using hair
  dye in pregnancy: is it safe? —
  https://www.nhs.uk/best-start-in-life/pregnancy/using-hair-dye-in-pregnancy-is-it-safe/
- Classification note: not escalated to `SAFETY_REVIEW_REQUIRED`. The
  claim-level review found pregnancy-specific health claims and precautions
  throughout, and one urgent-escalation statement, but not the sustained
  emergency or high-consequence instruction pattern that meets this
  project's safety threshold. The urgent statement is checkpoint 12 below.

### Current runtime copy

**Title:** Hair dye and beauty treatments in pregnancy

**Standfirst:** Colour, nails, lashes, tan and treatments. What is generally
fine in pregnancy, what needs a little more care, and when to ask someone.

**Quick answer:** For most people, yes. Most research indicates that dyeing
or colouring your hair in pregnancy is safe. Hair dyes do contain chemicals,
but your scalp absorbs very little of them, so the amount that reaches you is
low. Concerns raised in research relate to very high doses, not to the
exposure of an ordinary salon appointment or a home colour. Some people still
prefer to wait until after the first twelve weeks, when they feel more
settled. That is a personal decision rather than a rule.

**What is happening — common:** Very little dye reaches you. Hair dyes do
contain chemicals, but your scalp absorbs very little of them, so the amount
that reaches you is low. Research concerns relate to very high doses, not to
the exposure of an ordinary salon appointment or a home colour.

**What is happening — less common:** Pregnancy hormones change hair texture,
thickness and how it takes colour, and skin can react differently than it
used to. Salons should be well ventilated because fumes from nail treatments
and spray tanning can make nausea worse.

**Why it varies:** Comfort levels differ. Some people carry on exactly as
before, and some prefer to wait until after the first twelve weeks. There is
nothing you need to undo if you have already coloured your hair.

**What this means:** Most everyday beauty treatments are generally considered
fine in pregnancy, with a little more attention to ventilation, patch testing
and temperature.

**Normally expected:** Colouring your hair at a salon or at home; highlights,
balayage or semi-permanent colour, which put less dye on the scalp;
manicures, gel and acrylic nails in a well-ventilated salon; fake tan lotions
and mousses, patch tested first; waiting until after twelve weeks if that
feels more comfortable.

**Seek support:** A nail bed or lash line that becomes sore, swollen or
infected; a reaction to a product, such as a spreading rash or swelling;
difficulty breathing after a reaction, which needs urgent medical help;
before starting any prescribed or strong skin treatment in pregnancy.

**Disclaimer:** This is general information, not medical advice. Ask your
midwife, GP or a pharmacist if you are unsure about a treatment, and seek
urgent help for a severe reaction.

**Can you dye your hair in pregnancy?**

For most people, yes.

Most research indicates that dyeing or colouring your hair in pregnancy is
safe. Hair dyes do contain chemicals, but your scalp absorbs very little of
them, so the amount that reaches you is low. Concerns raised in research
relate to very high doses, not to the exposure of an ordinary salon
appointment or a home colour.

Some people still prefer to wait until after the first twelve weeks, when
they feel more settled. That is a personal decision rather than a rule, and
there is nothing you need to undo if you have already coloured your hair.

**Ways to feel more comfortable about it**

Highlights, balayage or a semi-permanent colour put less dye on the scalp
than a full permanent head colour.

Colour in a well-ventilated room, and follow the timings on the packet rather
than leaving colour on longer. Wear gloves for home colour and rinse
thoroughly.

Do the patch test even if you have used the same product for years. Pregnancy
can change how your skin reacts.

**Your hair may behave differently anyway**

Pregnancy hormones change hair texture, thickness and how it takes colour. A
shade you have used for years can lift differently or fade faster.

Tell your colourist you are pregnant so they can adjust, and consider a
strand test before committing to a big change.

**Nails, lashes and brows**

Manicures, gel and acrylic nails are generally considered fine, though salons
should be well ventilated because the fumes can make nausea worse.

Lash and brow tints use the same patch-test logic as hair dye. If a nail bed
or lash line becomes sore, swollen or infected, see your GP or pharmacist
rather than treating it yourself.

**Fake tan and sunbeds**

Fake tan lotions and mousses sit on the surface of the skin and are generally
considered fine, although skin can be more sensitive in pregnancy, so patch
test first. Spray tan salons should be well ventilated because of the mist.

Sunbeds are not recommended in pregnancy, or at any other time, because of
the skin cancer risk, and pregnancy skin can burn and pigment more easily.

**Massage, facials and saunas**

Many spas ask you to wait until after twelve weeks and to use a therapist
trained in pregnancy massage, which is about positioning and comfort as much
as anything else.

Skip anything that raises your core temperature a lot, including saunas,
steam rooms and very hot baths. Strong facial peels and certain acne
treatments are best checked with your midwife or a pharmacist, because some
skin ingredients are avoided in pregnancy.

**When to ask someone**

Ask your midwife, GP or a pharmacist before starting any prescribed or strong
skin treatment in pregnancy.

If you have a reaction to a product, a spreading rash, swelling, or
difficulty breathing needs urgent medical help.

**Key takeaways**

- Most research indicates that dyeing or colouring your hair in pregnancy is
  safe, because the scalp absorbs very little dye.
- Waiting until after twelve weeks is a personal preference, not a rule.
- Patch test even familiar products, because pregnancy can change how your
  skin reacts.
- Manicures, lash and brow tints and fake tan are generally considered fine,
  with good ventilation and a patch test.
- Sunbeds are not recommended, and anything that raises your core temperature
  a lot is best skipped.
- Check prescribed or strong skin treatments with your midwife, GP or a
  pharmacist.

### Supported claims

Colouring hair in pregnancy is safe for most people; low scalp absorption;
research concerns relate to very high doses; waiting twelve weeks is
preference not rule; lower-scalp-contact colour options; ventilation, packet
timings, gloves and rinsing; patch testing familiar products; hormonal
changes to hair; manicures, gels, acrylics, lash and brow tints as generally
fine with ventilation and patch testing; fake tan as surface-level and
generally fine with a patch test; sunbeds not recommended; spa twelve-week
and trained-therapist convention; avoiding a large rise in core temperature;
checking prescribed or strong skin treatments; routing infections and
reactions to a GP or pharmacist; urgent help for a severe reaction.

### Excluded claims

No claim that any treatment is risk-free; no named product or brand
endorsement; no ingredient list presented as safe or unsafe; no trimester
rule presented as clinical guidance; no instruction to self-treat an
infection or reaction.

### Reviewer checkpoints

1. Hair-colouring claim — "most research indicates... is safe" is the correct
   strength for the source.
2. Absorption wording — "your scalp absorbs very little of them" is accurate
   and not over-reassuring.
3. Ventilation — the ventilation advice is correct for home colour, nail
   treatments and spray tan.
4. Patch testing — the instruction to patch test familiar products is
   supported and clearly stated.
5. Nails, lashes and brows — the "generally considered fine" framing and the
   patch-test parallel are appropriate.
6. Fake tan — the surface-absorption reasoning and sensitivity caveat.
7. Sunbeds — the "not recommended" wording and stated reasons.
8. Massage and positioning — the twelve-week and trained-therapist wording is
   presented as spa convention, not clinical guidance.
9. Sauna and heat exposure — the core-temperature caution is complete and
   correctly scoped to saunas, steam rooms and very hot baths.
10. Skin and acne treatments — the deferral to midwife or pharmacist is
    correct, without naming ingredients.
11. Reactions — the sore, swollen or infected nail bed and lash line routing
    to GP or pharmacist.
12. Urgent reaction and escalation wording — "a spreading rash, swelling, or
    difficulty breathing needs urgent medical help": whether this is
    sufficiently urgent and correctly routed, and whether the classification
    should be escalated to `SAFETY_REVIEW_REQUIRED`.
13. Hero and body imagery remain unbranded, non-instructional and imply no
    medical endorsement.

Reviewer:

Review date:

Outcome:

Reviewer notes:
