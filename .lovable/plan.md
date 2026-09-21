# Phase 36C — Pregnancy final cleanup and workstream closure

Evidence-backed remediation only. No new articles, no new topic pages, no week-model changes, no UX redesign, no AI, grounding, database, lifecycle or analytics changes, no deployment.

Phase 36B counts are locked as the starting evidence: 104 Pregnancy records, 64 journey moments, 0 new article candidates, 0 release blockers.

## Scope of work

### 1. Four stale related-article references
The four references live in article `relatedSlugs` and are dropped silently before render. Repair each only where repository evidence establishes the intended canonical destination:
- `first-trimester-symptoms` → the live owners (`early-pregnancy-symptoms-explained`, `nausea-in-early-pregnancy`, `fatigue-in-early-pregnancy`, `symptoms-stopping-early-pregnancy`) as the evidence supports, three references.
- `headaches-in-pregnancy` referenced from `paracetamol-in-pregnancy` → its live canonical owner.
If no defensible replacement exists for a given reference, remove it rather than guess. Target after: stale references 0, broken rendered links 0, wrong-destination links 0.

### 2. Two orphaned articles
- `symptoms-stopping-early-pregnancy` — one honest inbound path from the early-pregnancy context that already discusses symptom change.
- `low-lying-placenta-in-pregnancy` — one honest inbound path from the placenta/body context that already owns that intent.
One placement each. No artificial padding, no navigation redesign. Target after: orphans 0, new routes 0.

### 3. Pregnancy → Loss support handoff
Add the smallest editorial handoff from the strongest existing Pregnancy surface (bleeding/uncertainty guidance in early pregnancy) to the existing loss support records. Existing content only; no loss article, no loss lifecycle, no repeated CTAs. Target: COMPLETE, new loss content 0.

### 4. Pregnancy → First Year editorial handoff
Add one clear editorial transition at the appropriate late-Pregnancy point (end of the week journey / late third trimester) into existing First Year and after-birth guidance. No postpartum lifecycle, no new First Year content, no routes, no change to lifecycle resolution. Target: content handoff COMPLETE, lifecycle routing unchanged and COMPLETE.

### 5. Birth-plan consolidation
`writing-a-birth-plan` and `birth-preferences` share one visitor intent. Choose the canonical owner on content completeness, inbound links, discovery, source quality and route history; fold the useful guidance from the secondary record into it and apply the repository's established safe disposition to the secondary route, using the existing canonical-redirect pattern if its public route retires. No third record. Target: 1 canonical owner, 0 technical duplicates introduced, 0 broken inbound links.

### 6. Five EXPAND_EXISTING records (from 36B, no guessing)
- `complete-guide-morning-sickness` — hyperemesis
- `stages-of-labour` — pain relief options
- `swelling-in-pregnancy` — pre-eclampsia
- `eating-well-in-pregnancy` — travel and flying
- `preparing-for-baby-complete-guide` — antenatal classes

Each keeps its canonical route, adds only the audited missing guidance, keeps the established voice and safe escalation wording, uses existing verified sources, and introduces no new medical precision.

### 7. Fourteen unsupported claims
Re-identify the exact 14 article claims (12 in the six label-only-source articles named in 36B, 2 in no-source articles). For each choose exactly one: supported with verified existing source, safely removed, safely reworded, or unresolved. No invented URLs, thresholds or timings; no source substitution. Also address the two "completely normal" certainty phrasings about implantation bleeding where they fall inside these claims. Arithmetic must total 14 with unresolved = 0.

### 8. Boundaries held
No mass source normalisation; label-only (126), no-source (5) and the 311 week statements with unresolved statement-level provenance are recorded as governance debt, not remediated. The 42-week system stays locked unless a 36C link fix touches it. Unknown editorial status (19) untouched. Tool and checklist opportunities not built. Weak discovery reassessed and documented honestly, not padded. Companion, grounding and reviewer registries unchanged.

## Documentation
Create `docs/content/phase36c-pregnancy-final-cleanup.md`, `docs/content/phase36c-pregnancy-claim-resolution-evidence.md`, `docs/content/phase36c-pregnancy-final-closure.md`. Update `roadmap.md` with the Phase 36C entry only; Phase 36A, 36A.1, 36B and Phase 35 records are preserved except for exact cross-references to the new evidence.

## Validation
Pregnancy content, route, article-route, related-guidance, loss-handoff, First Year handoff, birth-plan canonicalisation/redirect, source/claim, week-route, trimester-route, link-integrity and sitemap tests; new focused regressions for each change; full suite; typecheck twice; lint against the established baseline (1 pre-existing generated-file error, 10 warnings); production validation build; browser sanity QA at the changed public surfaces. Flaky failures reported with first-failure and rerun evidence. No deployment.

## Closure
If every gate passes (stale references 0, orphans 0, both handoffs COMPLETE, birth-plan overlap resolved, five expansions done, unsupported claims 0, broken routes/links 0, AI-only needs 0, blockers 0), close Phase 36C PASS and lock the Pregnancy workstream as closed for the current strategy, with First Year named as the next workstream. No further Pregnancy phase recommended.
