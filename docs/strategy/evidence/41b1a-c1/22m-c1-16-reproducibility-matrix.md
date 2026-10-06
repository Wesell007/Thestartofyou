# 41B.1A-C1 — 22m C1.16 reproducibility matrix (Project 1)

| Area | First application reference | Second application | Identical |
|---|---|---|---|
| columns | C1.5 (`11-c1-5-post-forward-catalogue.md`), 315 lines | C1.16 post-forward, 315 lines | YES |
| enums/types | C1.5 (`11-c1-5-post-forward-catalogue.md`), 5 lines | C1.16 post-forward, 5 lines | YES |
| functions (prosrc + functiondef) | C1.5 (`11-c1-5-post-forward-catalogue.md`), 25 lines | C1.16 post-forward, 25 lines | YES |
| triggers | C1.5 (`11-c1-5-post-forward-catalogue.md`), 36 lines | C1.16 post-forward, 36 lines | YES |
| RLS/table state | C1.5 (`11-c1-5-post-forward-catalogue.md`), 35 lines | C1.16 post-forward, 35 lines | YES |
| policies | C1.5 (`11-c1-5-post-forward-catalogue.md`), 118 lines | C1.16 post-forward, 118 lines | YES |
| constraints | C1.5 (`11-c1-5-post-forward-catalogue.md`), 161 lines | C1.16 post-forward, 161 lines | YES |
| indexes | C1.5 (`11-c1-5-post-forward-catalogue.md`), 104 lines | C1.16 post-forward, 104 lines | YES |
| grants/ACL | C1.5 (`11-c1-5-post-forward-catalogue.md`), 35 lines | C1.16 post-forward, 35 lines | YES |
| validated structure (all nine sections) | first validated state (C1.7 → C1.13 `r1_pre` / C1.14 `pre_c1_15`) | C1.16 post-validate | YES |

## Starred behavioural rows re-run after re-application

| Section | Rows | Result |
|---|---|---|
| I ★ (same-user accepted, cross-user rejected 23503 naming the relationship FK) | 26 cases over 13 relationships | 13/13 accepted, 13/13 rejected; unexpected 0 |
| J ★ (one active; second active 23505; active+paused 23505; removal then new active; removed row retained unchanged) | 7 cases | 7/7 as expected; unexpected 0 |
| H ★ (H-1..H-5, genuine A JWT through PostgREST; psql dual-GUC corroboration) | 6 PostgREST cases + 5 psql cases | PostgREST 6/6; psql: H-1 only E-A1, H-2 zero rows, H-3/H-4/H-5 SQLSTATE 42501 |
