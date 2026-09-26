# Phase 40A — Capability map (current product truth)

Audit only. Measured 2026-09-26 from the repository, default flag values and prior release records. No product change.

## Evidence rules

- REPOSITORY DEFAULT: what the code does with no environment overrides.
- VERIFIED PRODUCTION STATE: confirmed only by `docs/ai/aic-r1-production-release.md` (2026-09-07 release: Companion panel, `/ask`, saved TTC/Pregnancy/First Year journeys, journey next actions, safety composition, memory/history/AMBER/voice OFF) or by a public route in the published sitemap.
- UNVERIFIED PRODUCTION STATE: shipped unflagged code with no runtime record. Never promoted to LIVE_PRODUCTION; classified LIVE_PARTIAL at most.
- LIVE_PARTIAL here means: unflagged and in the published build, but either incomplete against the user problem or not runtime-verified end to end.

## Repository facts measured (starting expectations re-checked)

| Expectation | Measured | Match |
| --- | --- | --- |
| Saved lifecycles = ttc / pregnancy / first_year | `NavLifecycle = "pregnancy" \| "ttc" \| "first_year"` | YES |
| No IVF lifecycle, no `/my-ivf-journey` | route absent; `/ivf`, `/ivf-timeline` are public content | YES |
| Reviewer provenance registry empty | `REVIEW_PROVENANCE_REGISTRY = []` | YES |
| `AI_SOURCE_ROUTING_VERSION` | `"30B-source-routing-v1"` | YES |
| Grounding default deny | no registry entry carries `approvalStatus: "approved"` | YES |
| History / memory / journal / voice / AMBER / IVF save off | all client gates parse only `"true"`; `.env.example` sets history false; AIC-R1 records server gates OFF | YES (repository default and AIC-R1) |
| Registered route paths in `App.tsx` | 133 | measured |

Discrepancies found: 0.

## Capability register (50)

Columns: status / flag / dependency / safety-privacy / strategic value (S) / differentiation (D) / claim possible now / gap. H = high, M = medium, L = low.

### Public journey experience

| # | Capability (user problem) | Status | Flag | Dependency | Safety/privacy | S | D | Claim now | Gap |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TTC hub, 13 topics, articles (what applies while trying) | LIVE_PRODUCTION | none | content data | health wording rules | H | L | Yes | no link to saved cycle beyond next actions |
| 2 | Pregnancy hub, trimesters, 40 weeks | LIVE_PRODUCTION | none | weekData | health wording | H | L | Yes | week content not personalised beyond saved week |
| 3 | First Year hub, months, 10 topics | LIVE_PRODUCTION | none | firstYear data | health wording | H | L | Yes | none material |
| 4 | Toddler hub, age guides, 8 topics | LIVE_PRODUCTION | none | toddler data | health wording | M | L | Yes | no saved context after 12 months |
| 5 | Family hub, 6 areas, 18 guides | LIVE_PRODUCTION | none | family data | money/relationship claims | M | L | Yes | cross cutting, not saved |
| 6 | IVF editorial hub and timeline explainer | LIVE_PRODUCTION | none | IVF data | clinic boundary | M | M | Yes | save flagged off (#31) |
| 7 | Preparing for baby | LIVE_PRODUCTION | none | pregnancy data | low | M | L | Yes | no preparation list output |
| 8 | Due date calculator and result page | LIVE_PRODUCTION | none | none | estimate wording | M | L | Yes, as estimate | none |
| 9 | Ovulation calculator | LIVE_PRODUCTION | none | none | not contraception, estimate only | M | L | Yes, as estimate | none |
| 10 | Physical guided pregnancy journal (external purchase) | LIVE_PRODUCTION | `VITE_JOURNAL_PURCHASE_URL` override | Amazon listing | none | M | M | Yes, as a physical product | no digital link |

### AI / Companion

| # | Capability | Status | Flag | Dependency | Safety/privacy | S | D | Claim now | Gap |
|---|---|---|---|---|---|---|---|---|---|
| 11 | Companion panel and `/ask` (one runtime) | LIVE_PRODUCTION (AIC-R1) | `AI_SEARCH_DISABLED` kill switch | ai-search, consent | AI disclaimer | H | L | Yes | commodity alone |
| 12 | Deterministic RED/CRISIS safety routing | LIVE_PRODUCTION (AIC-R1) | none | urgentPatterns | core safety | H | M | Yes, qualified | pattern based, not exhaustive |
| 13 | Answer sanitisation / banned verdicts | LIVE_PRODUCTION | none | aiAnswerSafety | core safety | H | L | internal | none |
| 14 | Journey-aware next actions | LIVE_PRODUCTION (AIC-R1) | none | saved journey | no inference from content pages | H | M | Yes, qualified | only navigation, no saved action |
| 15 | Saved lifecycles and setup (ttc / pregnancy / first_year) | LIVE_PRODUCTION (AIC-R1 QA accounts) | none | auth, RLS | health data at rest | H | M | Yes | three separate states |
| 16 | Route-derived Companion mode (page area awareness) | LIVE_PARTIAL | none | companionMode | route is not intent | M | L | qualified | not article-level |
| 17 | Session conversation continuity (sessionStorage) | LIVE_PARTIAL | none | useCompanionConversation | cleared on sign in/out | M | L | qualified ("this session") | ends with browser session |
| 18 | Approved sources trust line and source links in answers | LIVE_PARTIAL | none | aiSources | must not imply review | H | M | qualified | no per claim provenance, no freshness |
| 19 | Companion name and tone preferences | LIVE_PARTIAL | none | profiles | low | L | L | minor | cosmetic |
| 20 | Persistent conversation history | BUILT_FLAGGED_OFF | `VITE_COMPANION_HISTORY_ENABLED` + `AI_CONVERSATION_HISTORY_ENABLED` | tables exist, RLS | stored health text | H | M | No | release decision |
| 21 | Permissioned memory (explicit, confirmable) | BUILT_FLAGGED_OFF | `VITE_COMPANION_MEMORY_ENABLED` + `AI_MEMORY_ENABLED` | companion_memories | sensitive data | H | M | No | privacy release |
| 22 | AMBER classifier (moderate concern) | BUILT_FLAGGED_OFF | `AI_AMBER_CLASSIFIER_ENABLED` | model classifier | clinical risk | M | M | No | safety sign off |
| 23 | Memory settings page | PROTOTYPE_ONLY | route `/prototype/memory-settings` | memory | none live | M | M | No | not production UX |
| 24 | Voice Companion | PLANNED_NOT_BUILT | `VITE_COMPANION_VOICE_ENABLED` (gate only) | ADR-AIC6 | audio privacy | L | L | No | paused at AIC-7B |
| 25 | "Unsupported" safety state | PLANNED_NOT_BUILT | none | AIC-5C | scope honesty | M | L | No | reserved name only |
| 26 | Journal-aware Companion (selected entry) | BLOCKED_LEGAL_PRIVACY | `VITE_COMPANION_JOURNAL_ENABLED` + `AI_JOURNAL_CONTEXT_ENABLED` | legal and privacy approval | journal text to model | H | H | No | approval |

### Trust / grounding

| # | Capability | Status | Flag | Dependency | Safety/privacy | S | D | Claim now | Gap |
|---|---|---|---|---|---|---|---|---|---|
| 27 | Article grounding for AI answers | BLOCKED_GOVERNANCE | registry approval | human approval records | wrong grounding risk | H | H | No | 0 approved |
| 28 | Medical review claims | BLOCKED_GOVERNANCE | `REVIEW_PROVENANCE_REGISTRY` | real reviews | trust | H | M | No | 0 reviews |
| 29 | Structured article sources (NHS etc.) on guidance | LIVE_PARTIAL | none | datasets | citation accuracy | H | L | qualified | coverage uneven, no "last checked" |
| 30 | Per answer freshness / "last checked" | ABSENT | none | source registry dates | policy staleness | M | M | No | not designed |

### Journal / memory

| # | Capability | Status | Flag | Dependency | Safety/privacy | S | D | Claim now | Gap |
|---|---|---|---|---|---|---|---|---|---|
| 31 | IVF timeline save | BUILT_FLAGGED_OFF | `VITE_IVF_TIMELINE_SAVE_ENABLED` | 34H3: injection point NOT VERIFIED | treatment dates | M | M | No | production flag path |
| 32 | Pregnancy weekly reflections, week photos and media | LIVE_PARTIAL | none | reflections, week_media_memories, storage | private media | H | M | qualified | pregnancy only, no export |
| 33 | First Year memories with photos | LIVE_PARTIAL | none | first_year_memories | private media | H | M | qualified | no export |
| 34 | Kept pregnancy chapter across transition | LIVE_PARTIAL | none | archived_journeys | retention | H | H | qualified | not surfaced across all later stages |
| 35 | Journal export / print / preservation | ABSENT | none | storage | data portability | H | H | No | not built |
| 36 | Physical to digital bridge (QR, import) | ABSENT | none | product packaging | account linking | M | H | No | not built |

### Account / journey state and action systems

| # | Capability | Status | Flag | Dependency | Safety/privacy | S | D | Claim now | Gap |
|---|---|---|---|---|---|---|---|---|---|
| 37 | Pregnancy → First Year transition (status given_birth, archive, source LMP) | LIVE_PARTIAL | none | save_first_year_journey | loss outcomes handled via status | H | H | qualified | TTC → pregnancy handoff is re-entry |
| 38 | Pregnancy toolkit: appointments, midwife questions, birth plan, hospital bag, symptom and movement notes, contraction timer | LIVE_PARTIAL | none | tables, RLS | movement notes must not delay care | H | M | qualified | not connected to Companion answers |
| 39 | First Year Today: care events, entries, reminders | LIVE_PARTIAL | none | first_year tables, notifications | logging load | M | L | qualified | limited value return from logs |
| 40 | TTC saved journey, cycle estimates, logs | LIVE_PARTIAL | none | ttc tables | estimates not diagnosis | M | L | qualified | logs give little back |
| 41 | Account deletion | LIVE_PARTIAL | none | delete-account function | rights | H | L | qualified | no export pair |
| 42 | Saved answers | ABSENT | none | history | stored health text | M | M | No | none |
| 43 | Answer → action (add to questions for midwife, checklist) | ABSENT | none | toolkit tables | must not turn triage into to do | H | H | No | biggest action gap |
| 44 | Pregnant while parenting (concurrent lifecycles) | ABSENT | none | lifecycle model (one active) | complexity | M | M | No | babies table supports several children only |
| 45 | Saved context after 12 months (toddler) | ABSENT | none | lifecycle decision | none | M | M | No | locked by three lifecycle rule |
| 46 | Partner / caregiver sharing | ABSENT | none | sharing model | consent | M | M | No | not designed |

### Intentionally not building

| # | Capability | Status | Reason |
|---|---|---|---|
| 47 | Community feed / forum | INTENTIONALLY_NOT_BUILDING | moderation and safety cost, conflicts with calm |
| 48 | Streaks / gamification | INTENTIONALLY_NOT_BUILDING | `firstYearEntries` explicitly never scores or streaks |
| 49 | IVF saved lifecycle | INTENTIONALLY_NOT_BUILDING | standing constraint |
| 50 | Family saved lifecycle | INTENTIONALLY_NOT_BUILDING | Family is cross cutting (39A.1) |

## Totals

| Status | Count |
|---|---|
| LIVE_PRODUCTION | 15 |
| LIVE_PARTIAL | 15 |
| BUILT_FLAGGED_OFF | 5 |
| PROTOTYPE_ONLY | 1 |
| PLANNED_NOT_BUILT | 2 |
| BLOCKED_GOVERNANCE | 2 |
| BLOCKED_LEGAL_PRIVACY | 1 |
| ABSENT | 7 |
| INTENTIONALLY_NOT_BUILDING | 4 |
| **Total** | **52 status assignments?** see reconciliation |

Reconciliation: rows 1–15 LIVE_PRODUCTION (15); LIVE_PARTIAL rows 16, 17, 18, 19, 29, 32, 33, 34, 37, 38, 39, 40, 41 (13); BUILT_FLAGGED_OFF rows 20, 21, 22, 31 (4); PROTOTYPE_ONLY 23 (1); PLANNED_NOT_BUILT 24, 25 (2); BLOCKED_GOVERNANCE 27, 28 (2); BLOCKED_LEGAL_PRIVACY 26 (1); ABSENT 30, 35, 36, 42, 43, 44, 45, 46 (8); INTENTIONALLY_NOT_BUILDING 47–50 (4). 15+13+4+1+2+2+1+8+4 = **50**. The row-level classification is authoritative; the preliminary table above is superseded by this line.
