# Phase 35A TTC hub and topic UX

## Scope

The canonical TTC hub and the Ovulation, Preconception Health and Fertility pillar pages were refined without adding guidance, routes, sitemap entries, lifecycle state or stored data.

## Shared template audit

- Shared TTC topic template consumers: 6
- In scope: Ovulation, Preconception Health, Fertility
- Out of scope: IVF and Treatment, Male Fertility, Age and Fertility
- The new editorial presentation option is enabled only by the three in-scope wrappers.
- Default presentation for all three out-of-scope consumers remains unchanged.

## Experience changes

- The hub order is hero and calculator, compact orientation, neutral journey, primary pathways, supporting library, IVF pathway, editorial questions, Companion, final journey action.
- The unsupported hero statistic strip and static current-stage presentation were removed.
- The journey uses the repository-backed three stages.
- Primary pathways are shown once. The supporting library contains the seven existing subtopics.
- Six editorial questions remain and no longer contain direct AI actions.
- One Companion module follows editorial discovery.
- The hub final action uses the existing read-only public account resolver. `TTCFinalCTA` is unchanged.

## Boundaries

No new content records, routes, sitemap entries, database changes, migrations, journey schema, analytics, AI runtime, prompts, grounding, memory or reviewer claims were added. Application deployment: NO.