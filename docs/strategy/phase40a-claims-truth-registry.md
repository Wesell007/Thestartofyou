# Phase 40A — Claims truth registry

Controls future About and marketing copy. Two sets, two denominators; they are never merged.

Buckets: A TRUE NOW / B TRUE WITH QUALIFICATION / C FUTURE DIRECTION / D DO NOT CLAIM. Anything depending on an OFF flag, pending governance, privacy/legal approval or unverified production configuration cannot be A.

Evidence references use capability numbers from `phase40a-capability-map.md` (#).

## Set A — Current `/about` claims (verbatim, 36)

| # | Section | Claim | Evidence | Bucket | Qualification required | Reason | Dependency |
|---|---|---|---|---|---|---|---|
| 1 | Problem | "Every app, blog and forum adds more. The volume of information grows, but clarity does not always grow with it." | framing | A | none | opinion, hedged | none |
| 2 | Problem | "Advice often sits in separate places, even though real life does not separate pregnancy, recovery, baby, toddler and family life so neatly." | framing | A | none | hedged | none |
| 3 | Problem | "Conflicting guidance can make simple decisions feel heavier than they need to be." | framing | A | none | hedged | none |
| 4 | Problem heading | "Most guidance during this journey is noise" | framing | B | soften to "can feel like noise" | absolute generalisation | none |
| 5 | Problem heading | "The journey rarely feels guided" | framing | A | none | experiential | none |
| 6 | Approach | "Stage-by-stage guidance: Trying to conceive, pregnancy, first year, toddler and family support, each with its own structure and tone." | #1–5 | A | none | five live hubs | none |
| 7 | Approach | "Calculators and practical resources that support decisions without overwhelming the page." | #8, #9 | B | calculators give estimates | estimate wording rule | none |
| 8 | Approach | "AI support in context: Ask questions from the stage you are in, with support shaped around that part of the journey." | #11, #14, #16 | B | "uses the page area and, when signed in, your saved stage" | no memory, no article awareness | #20, #21 for more |
| 9 | Approach | "A journal for what matters: A physical place to keep thoughts, scan photos, memories and the moments you do not want to lose." | #10 | B | confirm the physical product supports photo scanning before repeating | feature not verifiable in repo | physical product spec |
| 10 | Approach heading | "So we built something connected" | #14, #37 | B | "linked", not "integrated" | tools do not feed AI | #43 |
| 11 | Ecosystem | TTC: "Cycle, ovulation and preconception clarity." | #1 | A | none | live | none |
| 12 | Ecosystem | Pregnancy: "Week-by-week support across the trimesters." | #2 | A | none | live | none |
| 13 | Ecosystem | First Year: "Feeding, sleep, development and recovery." | #3 | A | none | live | none |
| 14 | Ecosystem | Toddler: "Behaviour, speech, sleep and everyday life." | #4 | A | none | live | none |
| 15 | Ecosystem | Family: "Relationships, routines and growing families." | #5 | A | none | live | none |
| 16 | Ecosystem | Journal: "A guided pregnancy keepsake, offline." | #10 | A | none | physical product | none |
| 17 | Ecosystem | Tools: "Due dates, ovulation and quick answers." | #8, #9, #11 | A | none | live | none |
| 18 | Ecosystem | Companion: "Ask a question, get stage-aware support." | #14, #16 | B | "stage-aware when signed in or from the page you are on" | signed-out = route only | none |
| 19 | Ecosystem heading | "The connected system" | #14 | B | "connected guidance" | not a data system yet | #43, #21 |
| 20 | Adaptive heading | "One journey, connected across every stage" | #37 | B | saved continuity covers TTC, pregnancy and first year; toddler and family are guidance | three lifecycles only | #34, #45 |
| 21 | Adaptive heading | "Support that adapts to where you are" | #14, #15 | B | "when you save your journey" | signed-out adapts by page only | none |
| 22 | Adaptive | TTC line | #1 | A | none | live | none |
| 23 | Adaptive | Pregnancy line | #2 | A | none | live | none |
| 24 | Adaptive | First Year line | #3 | A | none | live | none |
| 25 | Adaptive | Toddler line | #4 | A | none | live | none |
| 26 | Adaptive | Family line | #5 | A | none | live | none |
| 27 | Adaptive | Journal: "A physical place to hold thoughts, scan photos, keepsakes and memories." | #10 | B | as #9 | as #9 | physical product spec |
| 28 | Journal heading | "Some moments need somewhere offline to live" | #10 | A | none | framing | none |
| 29 | Journal | "Stage-by-stage support, tools and answers when you need clarity." | #1–11 | A | none | live | none |
| 30 | Journal | "A guided pregnancy journal for reflection, keepsakes and memories you can return to later." | #10 | A | none | physical product | none |
| 31 | Journal heading | "Physical and digital" | #10, #32, #36 | D | none safe | implies a connected journal; bridge is ABSENT | #36 |
| 32 | Different heading | "Designed differently" | framing | A | none | weak but not false | none |
| 33 | Different | "Guidance, not overload: Each stage is structured to reduce noise..." | #1–5 | A | none | intent, hedged | none |
| 34 | Different | "Built around real experience..." | none measurable | B | avoid implying lived-experience review or clinical review | no provenance | #28 |
| 35 | Different | "Tools, articles and AI together: ...work as one system, not scattered pieces." | #14 | B | "linked together" | tools and AI share no data | #43 |
| 36 | Different | "A softer place to return to: The design is calm on purpose..." | design | A | none | true | none |

Tally: A 23 (1, 2, 3, 5, 6, 11–17, 22–26, 28, 29, 30, 32, 33, 36), B 12 (4, 7, 8, 9, 10, 18, 19, 20, 21, 27, 34, 35), C 0, D 1 (31). 23 + 12 + 0 + 1 = 36. **RECONCILED.**

## Set B — Strategic statements under test (16)

| # | Statement | Evidence | Bucket | Qualification | Reason | Dependency |
|---|---|---|---|---|---|---|
| 1 | "One connected system" | #14, #37 | C | — | tools, journal and AI do not share context | #43, #21, #26 |
| 2 | "Support across every stage" | #1–5 | B | "guidance from trying to conceive to family life" | saved journeys cover three stages | none |
| 3 | "AI that knows your journey" | #14, #15 | B | "uses your saved stage, week or baby's age when signed in" | no memory, no history | none |
| 4 | "AI that remembers you" | #21 OFF | C | future: "remembers only what you choose to save" | flag off | #21 release |
| 5 | "Trusted answers" | #12, #18 | D | — | unqualified trust; grounding 0 approved; reviews 0 | #27, #28 |
| 6 | "Grounded answers" | #27 blocked | D | — | no approved grounding | #27 |
| 7 | "Personalised guidance" | #14 | B | "shaped by the journey you save" | limited personalisation | none |
| 8 | "Your journal and Companion work together" | #26 blocked | C | — | legal/privacy block | #26 |
| 9 | "Physical and digital journal" | #10, #32, #33 | B | "a physical pregnancy journal, and private reflections and photos in your account" (two things, not one) | no bridge | #36 |
| 10 | "Tell us once" | #15, #37 | C | — | TTC → pregnancy re-entry; no memory | #21, handoff |
| 11 | "Your context follows you" | #34, #37 | C | — | only pregnancy → first year | handoff, #21 |
| 12 | "Proactive support" | none | D | — | conflicts with calm principle | anti-roadmap |
| 13 | "Parenthood without information overload" | design | B | express as intent ("designed to reduce") | cannot guarantee | none |
| 14 | "Built around NHS guidance" | #29 | B | "draws on UK sources such as the NHS"; never imply NHS endorsement | sources vary by article | none |
| 15 | "The first AI parenting companion" | market | D | — | false: Huckleberry Berry launched earlier (see moat map E1) | none |
| 16 | "Everything parents need in one place" | — | D | — | absolute, untrue | none |

Tally: A 0, B 6 (2, 3, 7, 9, 13, 14), C 5 (1, 4, 8, 10, 11), D 5 (5, 6, 12, 15, 16). 0 + 6 + 5 + 5 = 16. **RECONCILED.**
