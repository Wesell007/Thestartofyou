# Phase 40A — Product Thesis Alignment & Future Capability Audit (plan)

Strategic audit only. No product code, UI, AI, prompt, grounding, memory, journal, voice, database, auth, analytics, lifecycle or content changes. No deployment. No About-page rewrite.

## Allowed outputs
- `docs/strategy/phase40a-product-thesis-audit.md` — sections 4, 5, 9, 10, 11, 12, 13, 14, 16, 19, 20, final verdict
- `docs/strategy/phase40a-capability-map.md` — sections 2–3: every capability with the nine-status model and all required fields
- `docs/strategy/phase40a-market-moat-map.md` — sections 6, 7, 8 (commodity test, moat map, anti-roadmap)
- `docs/strategy/phase40a-claims-truth-registry.md` — section 15, four buckets, every listed statement
- `docs/strategy/phase40a-priority-roadmap.md` — sections 17–18, max five system priorities, in order
- `src/test/phase40aProductThesisAudit.test.ts` — read-only objective facts only
- `roadmap.md` — append a Phase 40A entry only

## Step 1 — Measure repository truth (read-only, before judging)
Evidence gathered from source, not assumed:
- Lifecycle model: saved lifecycle values, journey routes, protected routes, setup/switching flows, transition handling.
- Route table in `src/App.tsx`: public hubs (TTC, Pregnancy, First Year, Toddler, Family, IVF, Preparing for Baby), Journal, calculators and result pages, `/ask`.
- Companion: panel and `/ask` mounts, mode resolver, request builder fields, journey context builder, page context, sanitisation, safety router states, AMBER modules.
- Feature flags: every `VITE_*` and server flag (conversation history, memory, journal awareness/entry refs, voice, IVF timeline save, AI kill switch) with default values; production state recorded as "default in repo" unless production evidence exists in prior phase docs (e.g. 34H3 flag verification, AIC-R1 release doc).
- Trust: source routing version, grounding registry default-deny counts, approved corpus docs, reviewer registry (expected empty), visible source/trust UI.
- Journal: digital journal routes and storage, media/photos, prompts, export/print, any physical-product link.
- Action systems: checklists, birth plan, appointments, reminders/notifications, symptom/movement notes, contraction timer, saved answers.
- About page: current sections and claims, read verbatim.

Rule: a capability is LIVE_PRODUCTION only if reachable in production without a flag; code behind an off-by-default flag is BUILT_FLAGGED_OFF; blocked by the 33.5 reviewer rule or grounding hold is BLOCKED_GOVERNANCE; blocked by privacy/legal gates is BLOCKED_LEGAL_PRIVACY. Anything uncertain is marked "unverified" rather than promoted.

## Step 2 — Analysis
- Six-layer audit (journey continuity, context/memory, trust, action, journal continuity, Companion as system layer), each with current strength / gap / future opportunity and a STRONG/PARTIAL/WEAK rating.
- Calm technology inventory of every tracker, notification, dashboard and data-entry surface, classified USEFUL_SIGNAL / OPTIONAL / MENTAL_LOAD_RISK / REMOVE_FROM_VISION.
- Commodity test, eight-moat map, anti-roadmap (all eleven items plus any found).
- Problem map (10+), continuity moments (15), trust moments (9), action candidates (max 10), journal/physical opportunity split into brand/product/commercial/technical/privacy.
- Commercial role per capability; claims registry; five statement tests; principles that each change a concrete decision.
- The five candidate priorities are tested as hypotheses and may be merged, reordered or rejected.

## Step 3 — Read-only test
Asserts only objective facts: lifecycle set is exactly ttc | pregnancy | first_year; no IVF lifecycle or `/my-ivf-journey`; key routes registered; Companion mount points; each gated flag defaults off; reviewer registry empty; `AI_SOURCE_ROUTING_VERSION` is "30B-source-routing-v1"; grounding default deny; calculators present. No strategic conclusions encoded.

## Step 4 — Validation
- Run the focused 40A test, then the Companion/safety/lifecycle/reviewer regression files; typecheck (the test is TypeScript). No build changes.
- Reconcile all counts: capability status totals equal the inventory size; claim buckets equal statements audited; About section counts equal sections read.

## Step 5 — Report and close
Return the section 23 report with every number filled from the documents, the five-part strategic verdict and one recommended next smallest phase (not started). Close with the exact section 24 wording only if all accounting reconciles; otherwise report BLOCKED naming the failed gate.

## Evidence safeguards (approved addendum)
1. Expected facts are not assertions yet. The lifecycle set, empty reviewer registry, routing version, default-deny grounding and off-by-default flags are checked fresh first. If the repository differs, product code and history stay as they are: the difference is reported, the capability is classified from what was measured, and the test encodes the truthful current state. BLOCKED only if a difference prevents reliable completion.
2. Market evidence boundary. The moat map labels every competitive claim as VERIFIED_CURRENT_MARKET_EVIDENCE, SUPPORTED_STRATEGIC_INFERENCE or STRATEGIC_HYPOTHESIS_NOT_MARKET_VERIFIED, and keeps repository evidence, external market evidence and inference separate. Web search may be used for current competitor evidence, with source URLs cited. If none is available, the claim stays a hypothesis. Each potential moat answers the six questions: what compounds, what accumulated asset, why copying the visible feature is not enough, what is easy to reproduce, what stays hard, and what evidence supports this.
3. Production truth. Each capability records REPOSITORY DEFAULT, VERIFIED PRODUCTION STATE (only from prior release/verification docs) or UNVERIFIED PRODUCTION STATE. UNVERIFIED is never promoted to LIVE_PRODUCTION.
4. Strict claims registry. Each statement records its evidence, bucket, the qualification it needs, the reason and any future dependency. Anything that depends on an off flag, pending governance or privacy/legal approval, or unverified production config cannot be TRUE NOW.
5. Priorities come out of the audit. The five hypotheses can be merged, narrowed, reordered or rejected. Fewer, deeper system capabilities are preferred.
6. `roadmap.md` records the addendum as part of the 40A entry.
