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
