# Phase 41A — Implementation Handoff

Nothing below has been started. Phase 41B requires explicit approval.

| # | Task | Classification |
|---|---|---|
| 1 | Reset status/outcome (or archive) when a new pregnancy is saved over an ended one | CLAUDE-CODE-SUITABLE |
| 2 | Introduce a pregnancy identity (id) and key reflections, week media and toolkit records to it | CLAUDE-CODE-SUITABLE |
| 3 | Backfill existing records to their current pregnancy without data loss | CLAUDE-CODE-SUITABLE |
| 4 | Stop First Year setup deleting earlier babies; add births/cohorts | CLAUDE-CODE-SUITABLE |
| 5 | Archive First Year when a new pregnancy starts, or allow concurrent contexts | CLAUDE-CODE-SUITABLE |
| 6 | Pregnancy plurality field with RLS and RPC validation | CLAUDE-CODE-SUITABLE |
| 7 | Link babies to the pregnancy they came from | CLAUDE-CODE-SUITABLE |
| 8 | Companion context disambiguation across pregnancies and children, with tests | CLAUDE-CODE-SUITABLE |
| 9 | Multiples selector and labels in pregnancy setup | LOVABLE-SUITABLE |
| 10 | Plural-aware copy on week and hub screens | LOVABLE-SUITABLE |
| 11 | Clear "start a new pregnancy" and "past chapters" screens | EITHER |
| 12 | Retire legacy `journeys` CHECK values `ivf`, `postpartum` | CLAUDE-CODE-SUITABLE |

Totals: CLAUDE-CODE-SUITABLE 9, LOVABLE-SUITABLE 2, EITHER 1 = 12.

Recommended order: 1, 5, then 2 and 3 together, then 4 and 7, then 6, 8, 9 to 12.
