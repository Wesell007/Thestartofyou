# Phase 32E — Existing-content action reconciliation and risk gate

Documentation-only stage. No new articles, no new URLs, no publication, no deployment.
Every status below is terminal and mutually exclusive.

## 1. Source records (verified against the repository)

| Source | Distinct records | Verification |
| --- | --- | --- |
| `docs/content/phase31-existing-content-actions.csv` | 52 | 53 lines, header + 52 rows |
| `docs/content/phase32b-existing-content-expansions.md` | 4 | milestone timing, uneven-milestone escalation, month teething context, month sleep-change context |
| `docs/content/phase32c-existing-content-expansions.md` | 4 | 2 expansions (`healing-after-birth`, `body-changes-after-birth`) + 2 internal-link actions |
| `docs/content/phase32d-converted-expansions.md` | 5 | C074, C063, C028, C016, C029 |
| **GROSS** | **65** | matches the approved expectation |

C065 contributes **0** additional records: its milestone work is already carried by the 32B package and is recorded as provenance only.

Phase 31 distribution: EXPAND_EXISTING 28, NO_ACTION 16, IMPROVE_INTERNAL_LINKING 5, IMPROVE_TOOL_CONTENT 2, RESOLVE_CANONICAL 1. Priorities P0 4, P1 12, P2 13, P3 23.

## 2. Merged records (4)

| Record | Merged into | Reason |
| --- | --- | --- |
| C024 breast changes (`/pregnancy/body`) | C020 bump and skin changes | Same page, same "body changes" section; one edit satisfies both |
| 32C-E1 lochia (`healing-after-birth`) | C080 | Identical page and identical section |
| 32C-L1 pelvic-floor cross-linking | C046 | Same link action, same source page |
| 32C-L2 postnatal mental-health linking | C082 | Same link action, same destination |

Tested and **not** merged: C071 vs C073 (same page, different sections: feeding amounts vs expressing and storage); C061 vs the 32B milestone work (same page, different sections); C074 tummy time vs 32B milestone timing (same page, different sections).

## 3. No longer required (18)

All 16 Phase 31 `NO_ACTION` rows, re-checked against current content and retained in the register:
C010, C051, C085, C031, C013, C053, C038, C014, C011, C009, C042, C032, C034, C040, C023, C026.

Plus:

- **C052 (RESOLVE_CANONICAL, `/articles/ovulation-signs`)** — inspected. `src/App.tsx:243` redirects `/articles/signs-of-ovulation` to `/articles/ovulation-signs`, and `scripts/generate-sitemap.ts:148` excludes the legacy slug via `legacyArticleRedirects`. The canonical owner is unambiguous and the duplicate is out of the sitemap. Issue already resolved → `NO_LONGER_REQUIRED`. No canonical architecture was altered.
- **C017 (SPD and pelvic girdle pain, P0)** — inspected `pelvic-pain-in-pregnancy`. The article already owns PGP throughout, names SPD as a synonym in the causes section, carries a dedicated "What is PGP or SPD?" FAQ with the full "symphysis pubis dysfunction" term, and cites NHS, RCOG and Tommy's. The UK-terminology gap is closed → `NO_LONGER_REQUIRED`.

## 4. Deferrals

**DEFER_TO_32F_INTERNAL_LINKING (5)** — pure systematic linking, after merges: C008, C006, C066, C082, C046.

**DEFER_SEO_ARCHITECTURE (0)** — C052 resolved, so nothing remains.

**DEFER_TOOL_WORK (3)**

| ID | Surface | Reason |
| --- | --- | --- |
| C001 | `/due-date-calculator` | The calculator route is deliberately input-only; explanation lives on `/due-date-results`. Adding supporting copy here is a tool/results architecture decision, not copy-only. |
| C002 | `/ovulation-calculator` | Same decoupled-calculator architecture. |
| C003 | IVF due date after transfer | Would require an explanatory surface that does not exist; new-surface work is outside 32E. |

C004 remains outside Phase 32E entirely (Phase 32D tool opportunity).

## 5. Lane A — implemented (1)

| ID | Surface | Risk test | Change |
| --- | --- | --- | --- |
| C007 | 42 pregnancy week pages via the shared week question builder | No health, safety, development or clinical claim: calendar arithmetic only | One generated "How many months is N weeks pregnant?" answer per week |

## 6. Lane B — documentation only (34)

By review type:

- **HOLD_HEALTH_REVIEW (17)**: C027, C018, C020, C070, C073, C071, C021, C056, C055, C005, C054, C025, C044, 32B teething age context, 32C-E2 pelvic floor / bladder / bowel, C016 rhinitis, C029 subchorionic haematoma.
- **HOLD_SAFETY_REVIEW (9)**: C080, C030, C033, C064, C069, C075, C076, C063, C028.
- **HOLD_DEVELOPMENT_REVIEW (6)**: C061, C083, 32B milestone timing, 32B uneven-milestone escalation, 32B month sleep-change context, C074 tummy time.
- **HOLD_EDITORIAL_REVIEW (2)**: C087 (UK passport and travel administration), C035 (nesting — the third-trimester "what to expect" cards render a maximum of five points, so any addition requires an editorial decision about what it displaces).

Human reviews completed in Phase 32E: **0**.

## 7. Reconciliation equations

```text
GROSS 65 - MERGED 4                      = UNIQUE_RECONCILED_ACTIONS 61
UNIQUE 61 - NO_LONGER_REQUIRED 18        = ACTIVE_DECISION_SET 43
LANE_A 1 + LANE_B 34 + DEFER_TO_32F 5
  + DEFER_SEO 0 + DEFER_TOOL 3 + OTHER 0 = ACTIVE_DECISION_SET 43
```

All three equations reconcile.

## 8. Phase 32F workload handed over

Five systematic linking actions (C008, C006, C066, C082, C046) covering: the `/pregnancy` week index entry point, the 42 week pages, the 13 First Year month pages, postnatal mental-health routing into First Year emotional wellbeing, and pelvic-floor routing between pregnancy and postnatal recovery. Plus the full link-graph and cannibalisation review, which was deliberately not started here.
