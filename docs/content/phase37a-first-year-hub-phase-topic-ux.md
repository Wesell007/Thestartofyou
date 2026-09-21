# Phase 37A First Year hub, phase and topic UX

## Hub

The canonical `/first-year` hub now follows the locked order:

1. Hero
2. Compact orientation
3. Baby and Postpartum pathways
4. Four phase chapters
5. Separate 13-destination month map
6. Four Baby and four Postpartum topics
7. Six editorial common questions
8. One embedded Companion
9. Quiet Toddler continuation
10. One lifecycle-aware final action

The hero keeps “Their first year, and your postpartum recovery.” The competing hero journey action, duplicate month navigation, repeated ending actions and mobile sticky track navigation were removed from this hub composition.

The final action uses the shared read-only account resolver. Five states resolve to four destinations: signed out and signed in without a lifecycle to `/start-your-journey`; TTC to `/my-ttc-journey`; Pregnancy to `/my-week`; First Year to `/my-first-year`. Incorrect routes: 0. Writes: 0.

## Topic pages

The shared topic template still has exactly 8 consumers: 4 Baby and 4 Postpartum.

- original Start Here cards: 24
- mapped to existing editorial destinations: 21
- removed with no valid unique destination: 3
- reconciliation: 21 + 3 = 24
- duplicate destinations within a topic: 0
- AI fallback, `/ask` or hidden model destination: 0
- empty Start Here sections: 0
- placeholder cards: 0
- AI-filled slots: 0
- artificial destinations for symmetry: 0

Card counts are allowed to vary. The complete Start Here block suppresses itself when there are no mapped items.

Each topic retains grouped guidance, then exactly one contextual Companion and quiet sibling navigation. Existing article records remain the only content owners.

## Phase pages

The shared phase template still has exactly 4 consumers.

- original faux-guidance cards: 12
- converted to existing editorial destinations: 11
- removed with no valid unique destination: 1
- reconciliation: 11 + 1 = 12
- duplicate guidance destinations within a phase: 0
- faux AI cards after: 0
- empty guidance sections: 0
- placeholder cards: 0
- AI-filled slots: 0
- artificial destinations for symmetry: 0

All 20 common questions and answers remain. Per-question AI actions changed from 20 to 0. All 15 genuine `readMore` links remain. One contextual Companion follows real guidance on every phase page, before related topics and sources.

## AI and editorial separation

- Hub editorial-question AI actions: 6 to 0
- Phase question AI actions: 20 to 0
- Topic card AI fallbacks: 24 to 0
- Phase faux-guidance AI fallbacks: 12 to 0
- Embedded Companion surfaces after: hub 1, topics 8 of 8, phases 4 of 4
- Duplicate AI execution runtimes: 0
- AI runtime, prompt, grounding, memory or history changes: 0

The six hub questions and their answers remain editorial. Companion stays below editorial discovery.

## Preserved boundaries

- First Year articles added: 0
- article copy changes: 0
- article source-record changes: 0
- article reviewer or grounding changes: 0
- lifecycle additions: 0
- database or schema changes: 0
- TTC or Pregnancy changes: 0
- deployment: NO