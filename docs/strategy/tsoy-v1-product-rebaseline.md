# TSOY V1 programme rebaseline

**Status: Gate 0 (this rebaseline) recorded 23 October 2026. AUTHORITATIVE PROGRAMME LEVEL.** This sits above `roadmap.md`. It does not renumber, reopen or rewrite any historical phase: every phase, status and piece of evidence in `roadmap.md`, `docs/ai/roadmap.md` and `docs/strategy/evidence/` stands as recorded. Environments: `docs/strategy/tsoy-environment-strategy.md`.

## 1. Why a rebaseline

The phase roadmap grew phase by phase (content 31–39, product thesis 40A, family entity 41B, account deletion N10). It no longer describes the whole product. TSOY V1 is now defined as a premium, journal-led platform: web plus a native app on one shared backend. The product will be visually redesigned from the physical journal before major frontend expansion. There is no approved production environment.

## 2. V1 scope

**Public / content platform**
- TTC, IVF, Pregnancy, First Year, Toddler and Family;
- trusted editorial guidance;
- calculators and tools;
- the Journal product and commerce;
- SEO/AEO/GEO discovery.

Existing work: content phases 31–39 and grounding governance (`docs/ai/README.md`).

**Personalised platform**
- the family entity architecture (41B; `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md`);
- journey continuity TTC → Pregnancy → First Year → Toddler;
- a future pregnancy or child #2;
- IVF journey support;
- loss-aware state handling;
- corrections and historical journeys.

**AI Companion** (`docs/ai/companion-v1-expanded-roadmap.md`)
- a high-quality grounded text Companion;
- journey-aware context;
- permissioned memory;
- emotional continuity;
- trusted provenance;
- proactive intelligence;
- real-time voice;
- family/co-parent modes;
- multimodal understanding where appropriate;
- safe agentic actions.

**Digital journal**
- text, photos, video and voice notes;
- milestones and memories;
- scan-related keepsakes where appropriate;
- reflections and letters;
- private versus shared content;
- AI-assisted continuity with permission.

**Family / co-parent**
- the family entity, with multiple adults where appropriate and child/baby entities;
- explicit sharing permissions;
- shared checklists, events and milestones.

Private Companion conversations and private journal content **stay private unless explicitly shared**.

**Agentic actions** (architecture designed now; activation later). Examples:
- save a memory;
- create a journal entry;
- add to a checklist;
- schedule a reminder;
- prepare appointment questions;
- update a plan;
- share an approved item with a partner;
- retrieve prior user-authorised context.

Every action is user-scoped, logged and reversible where possible. External or high-impact actions (anything that leaves the account, reaches another person or is irreversible) require **explicit confirmation**. RED/CRISIS turns offer no action, as Phase 40A priority 2 already requires.

## 3. Gates

| Gate | Content | Status |
|---|---|---|
| **0** | Infrastructure / product rebaseline (this document set) | **THIS PHASE** |
| **1** | Create permanent `tsoy-staging`; explicit fail-closed backend selection (no committed fallback); staging guard; replay migrations | **PASS (23 October 2026)**: `aeeprivmakalcbnefwwm`, evidence `docs/strategy/evidence/gate1-permanent-staging/` |
| **2** | Journal-to-Digital visual design foundation: physical journal audit, Taste reference system, visual directions, flagship screens, shared design system, web and app design principles (`docs/design/`) | PLANNED / **NEXT MAJOR PRODUCT WORKSTREAM** |
| **3** | Resume platform architecture: **41B.1B → 41B.1C → 41B.1D** (numbers unchanged; first on staging) | 41B.1B NOT STARTED / NOT AUTHORISED |
| **4** | **42A** provenance/trust · **42B** answer → action · **43** continuity · **44** permissioned memory · **45** journal continuity | PLANNED |
| **5** | Expanded capabilities: proactive intelligence, multimodal journal, family/co-parent, real-time voice, safe agentic actions | PLANNED (architecture may start earlier) |
| **6** | Native app full implementation (`docs/mobile/tsoy-native-app-roadmap.md`) | PLANNED |
| **7** | Create clean permanent `tsoy-production` | PLANNED / NOT CREATED |
| **8** | D14 human privacy/legal approval + final production-specific decisions (including D) | D14 OPEN |
| **9** | Controlled production activation: migrations, N10, PostHog live erasure proof, e-mail alert proof, cron/workers, monitoring, secrets, security/advisor checks (`docs/strategy/n10-production-activation-checklist.md`) | DEFERRED |
| **10** | Premium web launch (`thestartofyou.com` republished) | PLANNED |
| **11** | Native app launch once the shared production platform is proven | PLANNED |

**Phase numbers 42A–45** are new numbers for the four Phase 40A priorities (`docs/strategy/phase40a-priority-roadmap.md`). Priority 2/3 continuity and memory are split into 43 (continuity) and 44 (permissioned memory). No existing phase used these numbers; none was renumbered.

## 4. Dependencies and parallel tracks (not a waterfall)

| Track | Can run in parallel with | Hard dependency before activation |
|---|---|---|
| Gate 1 staging | Gate 2 design | owner approval and cost of a permanent project |
| Gate 2 design (journal audit, Taste, directions, tokens) | Gate 1; Gate 3 backend work on staging | the physical journal and packaging available for audit; founder sign-off of a direction before any major frontend build |
| Gate 3 41B.1B–1D | Gate 2 | staging (Gate 1); 41B.0-R evidence ladder; owner authorisation of 41B.1B |
| Gate 4 42A–45 | late Gate 3; Gate 2 implementation | 41B pointer and context contract for 43/45; memory needs privacy/legal approval before release (`docs/ai/memory-mvp-readiness.md`) |
| Gate 5 capabilities | architecture during Gates 3–4 | voice: `docs/ai/companion-voice-architecture.md` gates; multimodal media: N10-compatible owner-prefixed paths; agentic actions: confirmation and audit model; family sharing: 41B family entity |
| App design | Gate 2 | — |
| App architecture | Gates 3–5 once web V1 ≈ 60–70 % stable | shared backend contracts stable |
| Gate 6 app build | Gate 5 once web V1 ≈ 80–90 % stable | staging backend proven |
| Gate 7 production | — | platform stable, launch near |
| Gate 8 D14 | can be prepared any time; signed before Gate 9 | legal review; D re-checked on `tsoy-production` |
| Gate 9 activation | — | Gates 7 and 8 |
| Gates 10, 11 | — | Gate 9; app after the web platform is proven |

**Rule:** no further *major* frontend expansion before the Gate 2 design foundation. Bug fixes, safety and privacy work, and backend work on staging are not blocked.

## 5. Status board (23 October 2026)

| Item | Status |
|---|---|
| D14.2 | **CLOSED / PASS / RETIRED** |
| N10 engineering | substantially proven / production activation deferred |
| N10 production | **NOT ACTIVATED** |
| D14 | **OPEN** |
| D | **OPEN** (resolve before final production activation) |
| Active production Supabase target | **NONE APPROVED** (`wogepxfipdipogyogced` = historical / no longer verified) |
| Permanent staging | **ACTIVE** (`tsoy-staging`, `aeeprivmakalcbnefwwm`; Gate 1 PASS) |
| Permanent production | PLANNED / NOT CREATED |
| Lovable | **INTENTIONALLY UNPUBLISHED** |
| Redesign | **PLANNED / NEXT MAJOR PRODUCT WORKSTREAM** |
| 41B.1B | **NOT STARTED / NOT AUTHORISED** |
| Native app | **OFFICIAL ROADMAP / DESIGN NOT STARTED / IMPLEMENTATION NOT STARTED** |

## 6. Document map

- Environments: `docs/strategy/tsoy-environment-strategy.md`
- Design: `docs/design/journal-to-digital-design-system.md`, `docs/design/tsoy-visual-direction.md`
- Companion: `docs/ai/companion-v1-expanded-roadmap.md` (existing AI control layer: `docs/ai/README.md`)
- App: `docs/mobile/tsoy-native-app-roadmap.md`
- Family entity: `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md`
- Account deletion: `docs/strategy/n10-candidate-e-account-first-deletion-architecture.md`, `docs/strategy/n10-d14-privacy-legal-release-gate.md`, `docs/strategy/n10-production-activation-checklist.md`
- Product thesis: `docs/strategy/phase40a-*.md`
