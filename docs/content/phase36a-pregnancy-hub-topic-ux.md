# Phase 36A Pregnancy hub and topic UX

## Scope

The canonical Pregnancy hub and all six canonical Pregnancy topic pages were refined without adding articles, guidance, routes, week models, lifecycle states or stored data.

## Experience changes

- The hub order is hero and due-date calculator, compact orientation, six topic pathways, trimester discovery, week-by-week discovery, IVF crossover, editorial questions, Companion, final journey action.
- The hero statistic strip was removed; the calculator component and callbacks were not changed.
- The six topic pathways use six existing approved local images and retain their canonical destinations.
- Three trimester destinations and all 42 week destinations remain in the established architecture.
- The six editorial questions remain and no longer contain direct AI actions.
- The existing hub Companion follows editorial discovery.
- The final action uses the existing read-only public account resolver for all five user states.

## Shared topic template

- Shared template consumers: 6
- In-scope consumers: 6
- Out-of-scope consumers: 0
- Every topic retains its existing hero identity, coverage, Start Here records, grouped library and sibling navigation.
- One presentation-only `AskAboutThis` handoff follows each topic library and reuses the shared Companion runtime.
- Misleading per-group `View all` links were removed. Configured library destinations render once per group.

## Boundaries

New content records 0; routes 0; sitemap entries 0; calculator logic 0; week-model changes 0; database and lifecycle changes 0; analytics, AI runtime, prompts, grounding, memory and reviewer changes 0. Application deployment: NO.