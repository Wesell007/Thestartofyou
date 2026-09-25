# Phase 39B — Family Content Coverage & Journey Audit (audit only)

## Confirmed starting point
- 18 ready Family guides, 25 Family URLs in the site map (1 hub, 6 areas, 18 guides).
- The editorial inventory still lists Family guides as draft or placeholder. This is recorded as governance drift and will not be repaired.

## Steps
1. Measure the Family setup from the repository: routes, areas, guide records and statuses, site map, duplicates, broken or legacy routes, internal links (hub, area pages, related guidance, questions), which area owns each guide, Companion surfaces, places where guides can be found, and image placements.
2. Audit all 18 guides: area, route, dataset status versus inventory status, where they can be found, main and secondary intents, editorial role, sources, related guidance, overlap, and one recommendation each (KEEP, EXPAND_EXISTING, MERGE, REPOSITION, INTERNAL_LINK_ONLY, ARCHIVE_CANDIDATE). The totals must add up to 18.
3. Governance ledger, kept as four separate records: inventory drift (status, contentState, recommendedAction), reviewer provenance (metadata versus rendered claims), grounding registry state (default deny, candidate, approved, eligible), and the source of truth for public availability.
4. Situation-based coverage matrix across the 7 groups (Growing family, Relationships, Practical, Health/safety/wellbeing, Travel, Play, Shared). Each moment gets one classification, an owner, discovery strength, an issue category, a treatment and a priority. The moment totals and priority totals must both reconcile.
5. Hub audit (39A and 39A.1 as built) and an audit of all six area pages. No UX changes.
6. Specialist checks:
   - relationship safety boundaries, where conflict content appears
   - money and childcare-cost claims, including time-sensitive policy content
   - health and safety claims
   - duplication and shadowing
   - ownership overlap with TTC, Pregnancy, First Year and Toddler
   - discovery and orphan status
   - claim risk per guide
   - source record quality
   - needs that only the AI currently answers
   - tool and checklist opportunities
   - handoffs in both directions, including Journal (editorial discovery kept separate from lifecycle routing; Family saved lifecycle is NO)
   - reflection needs
   - new-guide candidates under the strict five-part test
   - grounding invariants
7. Documents: three new phase39b documents (coverage audit, journey gap register, content inventory), plus an appended entry in roadmap.md. Historical records stay untouched.
8. Validation: a read-only test (src/test/phase39bFamilyAudit.test.ts) covering routes, inventory, sources, links, site map, arithmetic, drift and grounding. Then the Family regression tests, the full suite, typecheck twice, lint against the known baseline, and a production build. Any flaky test is reported with its first run and rerun.
9. Completion report in the required format, then one Outcome (A to D) and the closure line. Phase 39C does not start automatically.

## Locked
No changes to content, sources, inventory, reviewer fields, links, routes, site map, UX, imagery, Companion, AI, grounding, database, lifecycle or analytics. No deployment. The only files touched are the three new documents, the roadmap entry and the one test.
