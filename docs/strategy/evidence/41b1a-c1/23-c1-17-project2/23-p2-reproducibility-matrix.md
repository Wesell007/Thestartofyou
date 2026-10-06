# 41B.1A-C1 — 23 C1.17 fresh-project reproducibility matrix (Project 1 versus Project 2)

Project 2 `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, eu-west-2, PostgreSQL 17.11.0.002, created independently 2026-10-03T21:31:18Z, never cloned or restored from Project 1) was taken through C1.0, C1.1, C1.2, C1.4, C1.5, C1.7, the starred rows of sections I, J and H, one refusal (R1), C1.14 and C1.15 on 2026-10-06 with its own credentials, its own Auth users and its own scratch clone, through wrappers that target only Project 2 and denylist production and Project 1. User/Auth UUIDs are project-local and differ by design; every structural and behavioural result is compared.

| Checkpoint | Project 1 reference | Project 2 result | Identical |
|---|---|---|---|
| baseline after 47 migrations | C1.1 `02-baseline-catalogue.md` | `01f` + `01g`: nine sections, 289/5/25/35/34/114/141/86/34 lines | YES |
| 21-row legacy fixture shape | C1.2 `07-c1-2-fixture-manifest.md` | `02b`/`02c`: same 16-table distribution, same deterministic row ids, 3 synthetic users (fresh ids), 0 non-synthetic, structure diff EMPTY | YES |
| post-forward catalogue | C1.5 `11-c1-5-post-forward-catalogue.md` | `05a` + `05b`: 315/5/25/36/35/118/161/104/35 lines, 13 NOT VALID RESTRICT links, ACL `authenticated=r`, anon/PUBLIC false | YES |
| validated foundation | C1.7 / C1.14 `20c-c1-14-pre-c1-15-catalogue.md` | `07c` + `07d`: 13/13 validated, RESTRICT, 2 pre-existing NOT VALID account FKs | YES |
| ★ I behaviour | C1.8 / C1.16 (same-user accepted, cross-user 23503 naming the relationship FK) | `09a`/`09b`: 13/13 accepted, 13/13 rejected over 13 relationships | YES |
| ★ J behaviour | C1.9 / C1.16 (one active; second active and active+paused 23505 on the one-open index; removal frees the slot; removed row retained unchanged) | `10a`/`10b`: 7/7 as expected | YES |
| ★ H PostgREST/JWT behaviour | C1.11 / C1.12 / C1.16 (H-1 only own row, H-2 empty, H-3/4/5 403 code 42501; psql dual-GUC agrees) | `11a`/`11b`: genuine Project 2 User A JWT (user id verified), 6/6 PostgREST cases, psql: only E-A1, B filter 0, three 42501 | YES |
| R1 rollback refusal | C1.13 R1 (`holds 2 row(s)`, exit 3, empty POST-vs-PRE) | `13a`–`13f`: `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.`, exit 3, POST-vs-PRE EMPTY | YES |
| successful rollback baseline | C1.15 (exit 0, catalogue equals C1.1) | `15a`–`15e`: exit 0, 0 errors, post-rollback equals Project 2 own baseline (EMPTY) and Project 1 C1.1 (EMPTY); legacy 21, users 3, history 47 | YES |

Overall: **IDENTICAL**.
