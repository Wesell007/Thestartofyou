# C. Calm health / wellness references

Looking for: medical trust without hospital aesthetics, supportive health information, calm interaction, safe hierarchy for sensitive content, accessibility. Evaluated against P9 (warm and gentle, accurate where it matters) and the health-content rules in AGENTS.md.

## C1. NHS.UK design system and service manual (adapted from GOV.UK)

- **Source:** NHS service manual ([link](https://service-manual.nhs.uk/)); GDS guest post on adapting GOV.UK for the NHS ([link](https://gds.blog.gov.uk/2019/06/04/guest-post-adapting-the-gov-uk-design-system-for-the-nhs/)); GOV.UK typography-scale accessibility note ([link](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible)).
- **Exact patterns:** health-information page: one column, large body type, "care cards" that grade urgency (non-urgent / urgent / emergency) by colour and wording; no body text at 14 px or below; review-each-release adoption rather than inheriting everything.
- **Works:** the **graded urgency pattern** is the safest model for TSOY's "when to seek help" content: it is explicit, consistent and never alarmist by default. Typography floors are measurable.
- **Does not work:** the visual register is institutional (NHS blue, bold sans, boxes). Copying it would make TSOY look like a hospital portal, which the owner explicitly rejects.
- **Translates:** the *semantics* of urgency grading, rendered in TSOY's own language: a ruled block with the display-serif label, cream ground, and the accent reserved for urgent; the size floor; one-column reading.
- **Must not copy:** NHS colours, the boxed care-card look, the Frutiger-style sans.
- **Principles:** supports P9, P1; must be re-skinned to respect P3/P5.
- **Direction relevance:** B (editorial surfaces); constraint for all.

## C2. Clue (period tracker: deliberately non-pink)

- **Source:** Creative Review on Clue's inclusive design ([link](https://www.creativereview.co.uk/design-clue-inclusive-period-tracking-app/)); tech.eu profile quoting Ida Tin on "a lot of pink and butterflies" ([link](https://tech.eu/features/2607/clue-app-profile-ida-tin)); Clue's relaunch article ([link](https://helloclue.com/articles/how-to-use-clue/clue-period-tracking-relaunched-and-newly-designed)).
- **Exact decision:** refused to "design for stereotypes"; neutral palette, geometric data display, doctor-reviewed content as a differentiator.
- **Works:** proof that a women's-health product gains trust by **not** using pink/floral cliché; content credibility as a design feature.
- **Does not work:** the data-centric cycle wheel is a dashboard idiom; too clinical-geometric for TSOY's keepsake warmth.
- **Translates:** restraint in palette (TSOY's blush is a *paper tone*, not a pink brand colour, and must stay that way); reviewed-content signalling near health copy.
- **Must not copy:** the wheel UI, the geometric illustration style.
- **Principles:** supports P4, P9.
- **Direction relevance:** B; a guard-rail for C (butterflies and pink drift).

## C3. Gentler Streak (Apple Design Award 2024, Social Impact)

- **Source:** Apple Design Awards 2024 ([link](https://developer.apple.com/design/awards/2024)); Sketch interview ([link](https://sketch.com/blog/gentler-streak)); 9to5Mac on the 2025 "For You" update ([link](https://9to5mac.com/2025/03/18/gentler-streak-update-health/)).
- **Exact pattern:** a calm, consistent language with an encouraging tone; suggests **rest days**; a customisable "For You" home. (Note: it still has a streak concept; the "no gamification" framing is not supported by the sources.)
- **Works:** demonstrates that a health product can nudge without pressure, and that Apple rewards that; "readiness" framing is adaptable to pregnancy energy levels.
- **Does not work:** the activity-ring/stat visual language is fitness-specific.
- **Translates:** TSOY's Today/My Week tone: suggest, never scold; "it's fine to skip this week's prompt".
- **Must not copy:** streak mechanics (contradict P9 and loss sensitivity).
- **Principles:** supports P9, P10.
- **Direction relevance:** B and app.

## C4. How We Feel (Yale / Marc Brackett emotion journal)

- **Source:** Yale School of Medicine ([link](https://medicine.yale.edu/news-article/the-how-we-feel-app-helping-emotions-work-for-us-not-against-us/)); App Store ([link](https://apps.apple.com/app/how-we-feel/id1562706384)); screensdesign showcase ([link](https://screensdesign.com/showcase/how-we-feel)).
- **Exact interaction:** a two-step guided path (high/low energy → pleasant/unpleasant → a specific word from a 144-word vocabulary), then optional context tags and a short journal field; regulation content delivered by licensed professionals; weekly review.
- **Works:** the **guided, vocabulary-led check-in** is the best model found for TSOY's "How I am feeling" pages (the journal's "5 things I am excited about / nervous about"); evidence-based tone; the journal field is optional and small.
- **Does not work:** the four-quadrant colour system is a strong brand device that would fight TSOY's palette (P4).
- **Translates:** a feelings check-in that names emotions with words, not emoji, and feeds the Companion only with permission.
- **Must not copy:** the quadrant colours.
- **Principles:** supports P8, P9.
- **Direction relevance:** A (reflection surfaces), B.

## C5. Research on pregnancy apps and loss (Andalibi; Bagelman; Miscarriage Australia)

- **Source:** Andalibi's feature analysis of 166 pregnancy apps (72 % do not account for loss) via SSRC/UMSI ([SSRC](https://just-tech.ssrc.org/citation/symbolic-annihilation-through-design-pregnancy-loss-in-pregnancy-related-mobile-apps/), [UMSI](https://www.si.umich.edu/about-umsi/news/pregnancy-apps-and-online-spaces-fail-support-individuals-grieving-pregnancy-loss)); Bagelman & Bagelman on linear framing ([link](https://hira.hope.ac.uk/4661/2/Bagelman%20and%20Bagelman%20RGS%20Blog%20text.docx)); Miscarriage Australia human-centred design ([Monash](https://research.monash.edu/en/publications/miscarriage-australia-the-use-of-a-human-centered-design-approach/)).
- **Exact findings:** apps frame pregnancy as a linear progression to birth; users could not stop weekly "baby size" updates after a loss; a co-designed loss resource was praised as a blueprint.
- **Works (as requirements):** design the **non-linear state** in from the start; every recurring content stream (weekly updates, "size of" fruit, prompts, memory resurfacing, notifications) needs an immediate, respectful stop; loss surfaces co-designed with people who have experienced loss.
- **Translates:** TSOY's "loss-aware state handling" (rebaseline scope) gets concrete UI rules: one action to pause all pregnancy-linked content; the journal chapter stays (memories are not deleted); the Companion's tone shifts; no "size of" imagery after a loss. *Note: the physical journal's "Your baby is the size of" pill is exactly the pattern that hurts after loss; digitally it must be opt-out and state-aware.*
- **Must not copy:** nothing visual; this is a requirements source.
- **Principles:** supports P9; defines a hard constraint for P7 (chapters) and for direction C (characters at milestones).
- **Direction relevance:** all; strongest constraint on C.

## C6. Tommy's (UK pregnancy charity; Fat Beehive rebuild, Nice and Serious refresh)

- **Source:** Fat Beehive project page ([link](https://www.fatbeehive.com/project/tommys/)); Nice and Serious brand refresh ([link](https://niceandserious.com/work/tommys-brand-refresh)).
- **Exact pattern:** fundraising and pregnancy-information areas deliberately **separated** (credibility of health content), mobile-first (72 %+ mobile), softer "layered curves" brand language, dedicated loss support.
- **Works:** separation of commerce/fundraising from health information is a trust rule TSOY should adopt: the Journal product and commerce surfaces must never interleave with health guidance.
- **Does not work:** charity visual language (curves, bright accents) is not TSOY's.
- **Translates:** an information-architecture rule: product/commerce and health guidance are distinct zones with distinct composition, same palette.
- **Must not copy:** the curves and colours.
- **Principles:** supports P9, P1.
- **Direction relevance:** B (structure).

## Category conclusion

Health references give TSOY three non-negotiables that no visual direction may weaken: **graded urgency semantics** (C1), **non-pink, reviewed-content trust** (C2) and **loss-aware, pausable content streams** (C5). They also confirm that calm tone (C3, C4) is achieved by restraint and language, not by illustration density.
