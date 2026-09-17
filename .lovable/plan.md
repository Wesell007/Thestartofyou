# Phase 35A — TTC hub and topic UX, discovery and AI separation

## Goal

Refine `/trying-to-conceive`, `/trying-to-conceive/ovulation`, `/trying-to-conceive/preconception-health` and `/trying-to-conceive/fertility` using the selected **Premium editorial clarity** direction. Preserve the existing brand, photography, copy and live destinations while making the experience tighter, easier to scan and explicit about what is guidance, a topic, a tool, IVF, support, Companion or a saved journey.

No new guidance, routes, database work, AI runtime changes, grounding changes, memory changes, analytics changes or deployment.

## Verified starting point

- The canonical hub currently places Companion before the journey and editorial discovery.
- The hub presents the three pillar topics twice: as primary cards and again inside the wider topic grid.
- The hub shows four cycle moments but statically marks Ovulation as `You are here`; it is not connected to saved journey state.
- Repository journey truth contains three TTC stages: Understanding your cycle, Timing and tracking, Waiting and testing.
- The hub hero and unused legacy final action repeat `3 stages`, `5–6 days` and `~85%`. The stage count is supported by the stage model, while the medical figures are not given visible provenance on the hub.
- The shared topic template labels every Start Here destination `Read the guide`, including the ovulation calculator.
- Preconception Health places `/ask` beside editorial/tool Start Here cards, although each pillar already has one Companion module later on the page.
- Fertility silently truncates one configured library destination because each group is capped at five links.
- The existing final action component routes to a fixed editorial stage rather than resolving the visitor's active lifecycle.

## Build

### 1. Recompose the TTC hub

Keep the current split hero and calculator as the first screen, but remove the unsupported medical-statistic strip. Keep the calculator estimate wording and preserve its existing result behaviour.

Use this order:

1. Hero and ovulation calculator
2. Compact orientation
3. Neutral three-stage TTC journey
4. Three primary topic pathways
5. Consolidated intent-led library
6. IVF pathway
7. Compact editorial common questions
8. One Companion module
9. Lifecycle-aware journey action

Specific changes:

- Convert the broad coverage card into a compact editorial orientation band.
- Render the three repository-backed TTC stages without `You are here`, pulse styling or implied personal progress.
- Keep one primary card each for Ovulation, Preconception Health and Fertility.
- Remove those three duplicate pillar entries from the supporting library while retaining all seven supporting TTC topic destinations.
- Label destinations by real type rather than using `Read guide` universally.
- Keep the dedicated IVF pathway and its `/ivf` destination visually distinct from the TTC guide library.
- Keep the existing six-question editorial accordion, but remove its duplicate direct AI actions. Companion remains a separate later module.
- Move the existing Companion experience below editorial discovery and common questions. Do not alter its runtime, prompts, grounding, memory or full Ask fallback.
- Add one final action using the existing public account/lifecycle resolver: TTC goes to My TTC Journey, Pregnancy to My Week, First Year to My First Year, and no active lifecycle to Start your journey. The action performs no writes.

### 2. Refine the shared pillar topic template

Apply the same hierarchy to Ovulation, Preconception Health and Fertility without creating bespoke page variants:

The shared template has **six route consumers**. In scope: Ovulation, Preconception Health and Fertility. Out of scope: IVF and Treatment, Male Fertility and Age and Fertility. Add one narrow presentation option to the shared template and enable it only in the three in-scope wrappers. The default rendering for the three out-of-scope consumers remains unchanged. Do not duplicate the template.

1. Breadcrumb
2. Existing split hero
3. Compact topic coverage
4. Start Here
5. Dense grouped library
6. One Companion module
7. Quiet links to the other two pillar topics

Specific changes:

- Keep all existing page titles, introductions, coverage bullets, article destinations and images.
- Add narrow presentation metadata to existing destination records so Start Here actions say `Open calculator`, `Read guidance`, `Explore topic`, `Explore IVF` or `Ask Companion` only when that destination type is genuinely present. Existing hrefs remain authoritative. Do not create a URL registry or second routing source of truth.
- Remove the `/ask` card from Preconception Health Start Here. Its existing Companion module remains the sole AI entry on that page.
- Keep the Ovulation calculator as a clearly labelled tool and keep Fertility's intentional single editorial anchor.
- Replace image-heavy library rows with compact editorial rows so the page is denser and repeated thumbnails do not dominate.
- Remove the five-link display cap so every configured destination is represented, including the currently hidden AMH guidance.
- Preserve exactly one `AskAboutThis` Companion entry after editorial discovery.
- Apply the denser library and removed link cap only when the new in-scope presentation option is active. Out-of-scope consumers retain their current layout and behaviour.

### 3. Destination accounting and regression coverage

Create a focused destination/type registry for presentation logic rather than changing URLs. Add tests that verify:

- all three pillars appear once in the primary hub pathway area and not again in the supporting library
- all seven supporting TTC topic routes remain discoverable
- the three-stage journey has no static `You are here`
- IVF remains reachable at `/ivf`
- the final journey action resolves all four existing states correctly
- Preconception Start Here has no `/ask` destination
- tool and editorial Start Here actions receive correct labels
- every configured group destination renders, with no silent five-link truncation
- the shared topic pages retain exactly one contextual Companion entry and do not introduce an AI execution surface
- all three out-of-scope shared-template consumers retain their current presentation

The existing `TTCFinalCTA` has one consumer, the retained legacy TTC page. Do not modify it. Build the canonical hub's final action locally around `usePublicAccountLink` and its existing lifecycle resolver so unrelated surfaces remain unchanged.

Document exact before and after destination counts, destination types, retained URLs and intentional duplicate removals.

## Visual direction

Use the selected Premium editorial clarity direction inside the existing design system:

- preserve the current serif display type, sans interface type, near-white paper, sage and terracotta tokens
- use compact editorial bands, restrained borders, short underline/lift cues and clear destination labels
- keep cards only for primary pathways, tools and genuinely framed actions
- avoid repeated decorative imagery, nested cards, excessive rounded containers and oversized vertical gaps
- maintain keyboard focus, semantic headings, labelled controls, reduced-motion behaviour and readable 15px body text

## Documentation

Create:

- `docs/content/phase35a-ttc-hub-topic-ux.md`
- `docs/content/phase35a-ttc-destination-audit.md`
- `docs/content/phase35a-ttc-responsive-evidence.md`

Append Phase 35A to `roadmap.md` without rewriting the locked Phase 34H evidence.

## Validation

- Run focused TTC, Companion-boundary, route, breadcrumb and link-integrity tests.
- Run the full test suite and report exact file/test counts.
- Run typecheck twice, lint and production validation build. A validation build is not a deployment.
- Browser-check all four canonical surfaces at 1280, 834 and 390 pixels.
- Verify section order, destination labels, all intended links, no static progress claim, one Companion module per surface, lifecycle-aware final routing, keyboard behaviour, no overflow and no console errors.
- Confirm no new route, sitemap entry, content item, schema, migration, analytics event, AI/runtime/grounding/memory change or deployment.
- Record: shared template consumers 6; in-scope 3; out-of-scope 3; out-of-scope changes 0; duplicate route source of truth NO; hidden configured TTC library destinations 0; AMH rendered YES; final-action consumers audited YES; unintended final-action changes 0.
