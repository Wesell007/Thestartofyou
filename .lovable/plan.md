# Phase 35B — TTC content coverage and journey audit

Audit only. No new articles, no route changes, no UX changes, no AI or grounding changes, no deployment. The only files written are three audit documents plus a roadmap entry.

## What this produces

1. `docs/content/phase35b-ttc-content-inventory.md` — every TTC surface and article record with status, route, discoverability and per-record classification.
2. `docs/content/phase35b-ttc-journey-gap-register.md` — the journey-moment matrix and the final gap register with P1/P2/P3 priorities.
3. `docs/content/phase35b-ttc-content-coverage-audit.md` — the narrative audit, all required counts, the closure decision and the completion report.
4. `roadmap.md` — a new Phase 35B entry. Phase 35A and 35A.1 history left untouched.

## How the audit is done

Every number and status claim comes from reading the repository, not from assumption. Work proceeds in these passes, each one producing evidence before anything is written up:

**Pass 1 — routes.** Read the route table and every TTC page file to establish the real hub, pillar, subtopic, tool, legacy and redirect routes, plus what the sitemap generator actually emits. Any route that resolves to nothing is recorded as broken.

**Pass 2 — article records.** Enumerate TTC-specific and TTC-crossover records across the article datasets, capturing slug, title, topic, editorial status, route, image fields and source fields. Records whose status cannot be determined from the data are reported as unknown rather than guessed.

**Pass 3 — discoverability.** For each record, trace the inbound links from the hub, pillar pages, supporting cards, related-guidance blocks and article bodies. Anything with no inbound path is orphaned; a single weak path is weak discovery. Every outbound internal link is resolved against the route table to find broken and wrong-destination links.

**Pass 4 — journey coverage.** Map the covered journey moments across preparation, cycle understanding, timing, the two-week wait, testing, fertility basics, investigations, conditions, taking longer, loss crossover and treatment transition. Each moment gets exactly one classification and a recommended treatment, with `NEW_ARTICLE` used only where no existing article, topic page, tool or handoff can serve the need.

**Pass 5 — transitions and boundaries.** Trace TTC to IVF and TTC to Pregnancy end to end, counting broken routes, ambiguous destinations and duplicated guidance. Separately check that no important TTC need is reachable only through the Companion.

**Pass 6 — claims, images and sources.** Flag every numerical or medical claim in TTC surfaces that lacks visible or documented sourcing, and count articles missing hero or expected body imagery. Nothing is rewritten. Grounding data is read only; any drift found is reported, not repaired.

**Pass 7 — shortlists and closure.** Produce the new-article shortlist, expansion shortlist and merge/reposition/archive shortlist, then separate current blockers from future enhancements and select Outcome A, B or C from what the evidence supports.

## Validation

Focused TTC content and link-integrity tests, the full test suite, typecheck twice, and lint against the existing baseline. Source behaviour changes are expected to be zero, so results should match the current baseline exactly. Nothing is deployed.

## Constraints held

Saved lifecycles stay ttc, pregnancy, first_year. No `ivf` lifecycle and no `/my-ivf-journey`. Reviewer claims added = 0. Grounding changes = 0. AI runtime changes = 0. Application deployed = NO.

## Closure

If no current blockers are found, the phase closes as TTC content sufficient for current strategy and the TTC workstream is locked closed, with no further TTC phase recommended. Otherwise it closes as audit complete with the single smallest justified follow-up phase named but not started.
