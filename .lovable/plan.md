# Phase 40A — Final evidence reconciliation (no product changes)

## 1. Regression reconciliation
Previously executed: `phase40aProductThesisAudit` (5/5), `reviewerClaimGovernance`, `aiVersions`, `phase39cFamilyClosure` (23/23). Companion, safety and lifecycle groups were NOT RUN.

Run the existing groups now (read-only, no code changes) and report exact file lists and counts:
- Companion: all `src/test/companion*.test.ts(x)`, `aiSearchCallerModes`
- Safety: `safetyRouter`, `urgentPatterns`, `amberSafety`, `aiSearchSafetyRouting`, `aiSearchSafetyComposition`, `aiSearchBoundaryRouting`, `enrichmentSafety`, `src/lib/safety/*.test.ts`
- Lifecycle: `journey*` tests, `startYourJourney`, `homepageJourneyEvolution`, `pregnancySetupRoute`, `firstYearPendingSetup`
- Reviewer: `reviewerClaimGovernance`, `phase39cFamilyClosure`

Output: `X / X PASS` or failure details per group. Any failure blocks closure (no fixes in this phase).

## 2–4. Documentation wording (strategy docs only)
- `phase40a-product-thesis-audit.md` verdict line 192: replace "five stages" sentence with the required wording; add note distinguishing PUBLIC SUPPORT AREAS (5) from SAVED JOURNEYS (3).
- `phase40a-market-moat-map.md`: relabel "POTENTIAL_SYSTEM_MOAT" / "moat" headings as "potential system advantage / defensibility hypothesis, not market-validated".
- `phase40a-priority-roadmap.md`: rename Priority 1 to "VISIBLE ANSWER PROVENANCE & TRUST"; add rule that only runtime-established provenance may be shown (no implied article/NHS grounding, reviewer approval, source or context use unless that answer used it); grounding stays default-deny.
- Add a short reconciliation appendix to the thesis audit recording the regression results.
- Update `phase40aProductThesisAudit.test.ts` assertions only where they pin the replaced wording.

## 5. Closure
If all four groups pass, close with the exact required wording and the "candidate capabilities, not proven moat" interpretation. No deployment, feature work, About changes, or next phase.
