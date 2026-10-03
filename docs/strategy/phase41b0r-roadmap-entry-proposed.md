# Proposed update to `roadmap.md`

Not applied. This session can read the repository and cannot write to it. Paste under the Phase 41B section once a write path exists. Nothing above this entry in `roadmap.md` is edited; the 41B.0 closure text stays as it is.

---

## Operating model (2 October 2026)

- CLAUDE CODE is the implementation owner for architecture, database work, frontend, interface design and testing.
- The GitHub repository is the single source of truth.
- Lovable remains the hosting and managed-backend platform. It is not the builder.
- Phase gates are unchanged. Being the builder does not authorise building ahead of an approved phase.

## Product phases

Numbers are unchanged: 41A, 41B.0, 41B.1A–1D, 42A provenance, 42B answer to action, 43 continuity, 44 memory release, 45 journal continuity.

### Phase 41B.0 — Family entity model design

CLOSED PASS on its recorded date. Historical closure preserved.

### Phase 41B.0-R — Family entity architecture reconciliation (corrective)

Documentation and design only. No database change, no customer rows read, no product code change, no migration applied, no deployment.

- Status: CLOSED PASS / READY TO AMEND 41B.1A, subject to owner review of six decisions.
- Architecture drift D1–D10 reconciled. SQL deviations S1–S8 reconciled; five further amendments recorded (S9–S13).
- Implementation readiness recorded at 41B.0 is suspended until the 41B.1A SQL is amended and rehearsed.
- Counts corrected: legacy constraints changed 5 → 11; new constraints 26 → 37; functions 5 → 18; write paths 17 → 74.
- Detail: `docs/strategy/phase41b0r-family-entity-architecture-reconciliation.md`, `docs/strategy/phase41b0r-write-path-inventory.md`.

### Phase 41B.1 — corrected subphases

| Subphase | Scope | Status |
|---|---|---|
| 41B.1A | Foundation schema | PREPARED; SQL NEEDS AMENDMENT; not applied |
| 41B.1A-C1 | Isolated rehearsal in a new hosted project in the owner's organisation; synthetic data only | NOT STARTED; cost to be confirmed with the owner first |
| 41B.1B | Backfill, audit log, one-way sync | NOT STARTED |
| 41B.1C | Readers, singleton writers, enabling constraints, journey functions, context readers | NOT STARTED |
| 41B.1D | Final tightening, validation, release gate | NOT STARTED |

- Recovery precondition changed: point-in-time recovery is not required. Every 41B migration is reversible by SQL; the evidence required before each production step is listed in the reconciliation document.
- A passing rehearsal does not authorise production. Production application still needs explicit approval.

## Separate tracks

| Track | What | Status |
|---|---|---|
| SG-1 | Saved-lifecycle CHECK still permits `ivf` and `postpartum` (D11) | Not blocking 41B; scheduled alongside 41B.1D |
| Local development safety | A local build with no `.env` connects to production | Documented; fix proposed; awaiting approval. `docs/strategy/stabilisation-local-dev-production-safety.md` |
| IVF-SAVE-R | IVF timeline save release reconciliation. Phase 34 engineering preserved; feature off; not a saved lifecycle; not coupled to pregnancy episodes | PARKED. Resumes with an audit of the existing work and a privacy and legal decision. Not activated automatically. |
| Schema drift | Repository and live schema differ in ten recorded areas | Recorded; no production action; classified at rehearsal |

## Interface programme — PX-A to PX-J

Separate from the product phases. Never numbered as a product phase.

- PX-A / PX-B input drafted: `docs/design/physical-journal-visual-dna.md`.
- PX-B covers journey logic and visual design together and produces ten concepts: TTC home; My Week; First Year Today; historical pregnancy chapter; multiple-pregnancy selector; multiple-child selector; TTC to pregnancy; pregnancy to First Year; later pregnancy with existing children; loss-aware state.
- Fourteen interface requirements come from the 41B architecture (reconciliation §21). They are designed in PX-B before 41B.1C so each is built once.
- Large signed-in changes wait for 41B.1C. PX-F is implemented by CLAUDE CODE in the repository.
- Date mathematics, safety routing, loss-aware behaviour, ownership and lifecycle rules are audited first and change only in approved engineering phases.

## Website audit (1–2 October 2026)

- 48 findings reconciled: 28 confirmed in code, 4 confirmed at runtime, 1 needs a signed-in check, 2 strategic, 2 deferred, 3 unsupported, 8 do-not-touch. 33 new findings recorded. Detail: `docs/strategy/claude-site-audit-reconciliation.md`.
- Production availability: apex domain live. `www` host not serving.
- No product code changed.

---

## Recovery addendum (3 October 2026)

Provenance. Sections above are the original 41B.0-R text, authored on 2 October 2026 in a Claude session that had read access to the repository but no write path to it. The files were staged in that session's handover folder and never committed. On 3 October 2026 the text was restored into this repository by replaying the session's recorded Write and Edit operations in order; the restored content is byte-identical to the final staged version. Nothing above this addendum has been rewritten.

This file is the historical draft. The approved 41B.0-R entry now lives in `roadmap.md` under "Phase 41B.0-R". Two rows above are superseded by later repository facts: the "Local development safety" track landed as commit `b487c7aa` (LOCAL-0), and the "Detail" paths now exist in the repository. The six owner decisions and their effect on this draft are recorded in section 27 of `phase41b0r-family-entity-architecture-reconciliation.md`.
