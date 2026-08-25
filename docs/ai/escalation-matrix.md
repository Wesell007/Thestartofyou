# Journey-specific escalation matrix

Coverage key: **hard** = short-circuited in code before the model runs (`URGENT_PATTERN` in `supabase/functions/ai-search/index.ts`); **prompt** = relies on the mode prompt only; **gap** = neither.

## Pregnancy

| Concern | Category | Route required | Wording required | Coverage |
| --- | --- | --- | --- | --- |
| Reduced or changed baby movements | Red | Maternity unit immediately | Contact your maternity unit now, day or night, do not wait until the next day | hard |
| Baby not moving at all | Red | Maternity unit / 999 if unwell | As above, and 999 if she is unwell herself | hard |
| Bleeding, any amount | Red | Maternity triage now | Contact maternity triage now; 999 or A&E for heavy bleeding | hard for "heavy"/"soaking", **gap** for plain "bleeding" |
| Severe or sudden pain | Red | Maternity triage now | Prompt assessment, do not wait | prompt |
| Severe headache | Red | Maternity triage now | Especially with vision changes or swelling; same-day assessment | prompt |
| Vision changes, flashing lights, blurring | Red | Maternity triage now | Contact triage now | **gap** |
| Waters breaking | Red | Maternity unit now | Contact your maternity unit now even without contractions | **gap** |
| Signs of labour | Amber to Red | Maternity unit | Call your maternity unit to be advised; sooner if under 37 weeks, bleeding or reduced movements | prompt |
| Fever | Red | Maternity triage or NHS 111 same day | Contact today, do not wait | prompt |
| Itching, especially hands and feet | Amber | Midwife or triage | Ask for it to be checked | **gap** |
| Persistent vomiting, unable to keep fluids down | Amber to Red | Midwife or NHS 111 | Same-day contact | **gap** |
| Mental health crisis | Crisis | 999 / A&E, NHS 111 mental health option | Crisis wording verbatim | hard |
| Routine week questions, appointments, common symptoms | Green | Optional midwife mention | Light | prompt |

## Postpartum

| Concern | Category | Route required | Wording required | Coverage |
| --- | --- | --- | --- | --- |
| Heavy bleeding, soaking a pad, clots | Red | 999 or A&E | Call 999 or go to A&E now | hard |
| Infection concerns: fever, offensive discharge, hot painful wound or breast | Red | GP or NHS 111 today, 999 if very unwell | Same-day contact | **gap** |
| Severe pain | Red | GP, midwife or NHS 111 today | Prompt assessment | prompt |
| Calf pain, swelling, breathlessness, chest pain | Red | 999 | Call 999 now | hard for chest pain / breathing, **gap** for calf swelling |
| Mood crisis | Crisis | 999 / A&E, NHS 111 mental health | Crisis wording verbatim | hard |
| Intrusive thoughts about harming self or baby | Crisis | 999 / A&E, NHS 111 mental health, plus health visitor or GP | Crisis wording, with an explicit statement that this can be told to a professional safely | **gap** |
| Feeling unable to stay safe | Crisis | 999 now | Crisis wording verbatim | **gap** |
| Low mood, tearfulness, anxiety persisting | Amber | GP or health visitor | Encourage contact plainly | prompt |
| Recovery questions, feeding adjustment, sleep | Green | Optional | Light | prompt |

## Newborn and first year

| Concern | Category | Route required | Wording required | Coverage |
| --- | --- | --- | --- | --- |
| Fever in a baby under 3 months | Red | 111 or A&E now | Urgent same-hour assessment | **gap** |
| Fever with rash, or rash that does not fade | Red | 999 | Call 999 now | **gap** |
| Breathing difficulty, grunting, pauses, indrawing | Red | 999 | Call 999 now | hard |
| Blue, grey or very pale lips or skin | Red | 999 | Call 999 now | **gap** |
| Seizure or fit | Red | 999 | Call 999 now | hard |
| Reduced responsiveness, floppy, very hard to wake | Red | 999 | Call 999 now | hard for "unconscious", **gap** for floppy / hard to wake |
| Unusual drowsiness | Red | 111 now | Urgent assessment today | **gap** |
| Poor feeding, refusing feeds | Amber to Red | Health visitor or GP today, 111 if under 3 months or unwell | Same-day contact | **gap** |
| Dehydration: fewer wet nappies, dry mouth, sunken soft spot | Red | 111 or A&E now | Urgent assessment | **gap** |
| Persistent inconsolable crying, high pitched cry | Amber to Red | 111 | Urgent advice | **gap** |
| Growth or weight worries | Amber | Health visitor | Arrange a weigh-in and review | prompt |
| Routine age patterns, reviews, milestones | Green | Optional | Light | prompt |

## Baby feeding

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Painful feeding, damaged nipples, suspected tongue tie | Amber | Midwife, health visitor or infant feeding specialist | prompt |
| Mastitis signs: hot painful breast with fever | Red | GP or 111 today | **gap** |
| Baby not gaining weight, few wet nappies | Red | Health visitor or GP today, 111 if unwell | **gap** |
| Choking or gagging episode with colour change | Red | 999 | **gap** |
| Reflux, wind, cluster feeding, bottle transitions | Green to Amber | Health visitor if persistent | prompt |
| Allergy suspicion: blood in stool, swelling, hives | Red | 999 for swelling or breathing, GP otherwise | **gap** |

## Baby sleep

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Safer sleep questions | Green | Signpost safer-sleep guidance, never improvise it | prompt |
| Sleeping much more than usual, hard to rouse | Red | 999 or 111 | partly hard |
| Breathing pauses in sleep | Red | 999 | hard |
| Parent so exhausted they cannot care safely | Amber to Crisis | GP or health visitor, 999 if unsafe now | **gap** |
| Regressions, naps, night waking, settling | Green | Optional | prompt |

## Emotional wellbeing

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Suicidal thoughts, self-harm | Crisis | 999 / A&E, NHS 111 mental health | hard |
| Intrusive or frightening thoughts | Crisis | As above plus GP, health visitor or midwife | **gap** |
| Panic attacks, severe anxiety | Amber | GP, and urgent mental health route if unbearable | routed to mental health source, prompt only for wording |
| Persistent low mood | Amber | GP or health visitor | prompt |
| Domestic abuse or feeling unsafe with someone | Crisis | 999 if in danger, plus specialist support routes | **gap** |
| Loneliness, overwhelm, identity change | Green | Reflective support, optional GP mention | prompt |

## Trying to conceive

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Pregnancy testing questions | Green | General only; never confirm, rule out or interpret a result | prompt (explicit ban in TTC prompt) |
| Period arrived after a hopeful cycle | Green to Amber | Kind, no blame, no false hope; GP if periods stop or change markedly | prompt |
| Fertility concerns after trying for a while | Amber | GP referral conversation | prompt |
| IVF questions | Amber | Fertility clinic is the decision-maker; never advise on protocol or medication | prompt, routed to IVF sources |
| Bleeding with severe pain, shoulder-tip pain, faintness after a positive test | Red | 999 or A&E now | **gap** |
| Miscarriage-sensitive wording | Amber | Never imply cause or blame; early pregnancy unit or GP | prompt |
| Cycle dates and fertile windows | Green | Estimates only, never confirmation of ovulation | prompt (explicit ban) |

## General parenting

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Routines, adjustment, siblings, returning to work | Green | Optional | prompt |
| Safeguarding disclosure about a child | Crisis | 999 or local safeguarding, never handled conversationally | **gap** |
| Medication questions for a child | Unsupported | Pharmacist, GP or 111 | prompt |

## Future toddler phase (not built)

| Concern | Category | Route required | Coverage |
| --- | --- | --- | --- |
| Fever, rash, breathing, dehydration, seizure | Red | Same paediatric urgent routes as first year | to be defined before the toddler journey ships |
| Developmental and speech concerns | Amber | Health visitor or GP review | not yet in scope |
| Behaviour, sleep, feeding, potty training | Green | Optional | not yet in scope |

## Consolidated hard-pattern gaps

Highest-priority additions to consider in Phase 29D/29E, in order:

1. Baby red flags: blue or grey lips, floppy or very hard to wake, rash that does not fade, fever under 3 months, breathing pauses.
2. Pregnancy red flags: bleeding without an intensity word, waters breaking, severe headache with vision changes.
3. Crisis wording: intrusive thoughts about harming the baby, "cannot keep myself safe", domestic abuse and feeling unsafe with someone.
4. Postpartum: signs of infection, calf pain with swelling.
5. TTC: severe pain with a positive test (ectopic-pattern wording).

Each addition must ship with an evaluation prompt and a test, and must be checked against false-positive risk on routine questions.
