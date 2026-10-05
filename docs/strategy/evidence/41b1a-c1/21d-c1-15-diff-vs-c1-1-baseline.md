# C1.15 post-rollback catalogue versus the C1.1 baseline (`02-baseline-catalogue.md`)

Set difference per section on identical line formats. Functions are compared twice: `md5(prosrc)` lines against the baseline file's functions section, and `md5(pg_get_functiondef)` lines (security normalised to t/f) against `02c-functions-functiondef-md5.txt`. Approved exclusions per plan C1.15: `supabase_migrations` bookkeeping (outside the capture), object OIDs (never captured), `c1_rehearsal_marker` (present in both captures, so not a difference). No exclusion was needed to make any section empty.

| Section | Baseline lines | Post-rollback lines | Removed (in baseline, missing now) | Added (present now, not in baseline) | Result |
|---|---|---|---|---|---|
| columns | 289 | 289 | 0 | 0 | EMPTY |
| enums | 5 | 5 | 0 | 0 | EMPTY |
| functions (prosrc + functiondef) | 25 | 25 | 0 / 0 | 0 / 0 | EMPTY |
| triggers | 35 | 35 | 0 | 0 | EMPTY |
| rls | 34 | 34 | 0 | 0 | EMPTY |
| policies | 114 | 114 | 0 | 0 | EMPTY |
| constraints | 141 | 141 | 0 | 0 | EMPTY |
| indexes | 86 | 86 | 0 | 0 | EMPTY |
| grants | 34 | 34 | 0 | 0 | EMPTY |

Overall diff versus the C1.1 baseline: **EMPTY**.

No line differs in any section: every 41B.1A object is gone and every pre-existing object (table, column, enum, function body, trigger, RLS flag, policy, constraint, index, grant) is present with an identical definition. Nothing was removed by dependency behaviour.

## Section hashes (count|md5 of sorted lines; security as t/f)

| Section | C1.1 baseline | C1.15 post-rollback |
|---|---|---|
| columns | `289|089827c5211d2e8e0e34e57aa854eb49` | `289|089827c5211d2e8e0e34e57aa854eb49` |
| enums | `5|e01eb2548fddcc41e7f642a4337f3019` | `5|e01eb2548fddcc41e7f642a4337f3019` |
| functions (prosrc) | `25|c4a01c43648862bc267784f572393037` | `25|c4a01c43648862bc267784f572393037` |
| functions (functiondef) | `25|920ec2f6ef04bb28c0544cba706e2f6c` | `25|920ec2f6ef04bb28c0544cba706e2f6c` |
| triggers | `35|c76db9052a48890ef16e7106f8627abf` | `35|c76db9052a48890ef16e7106f8627abf` |
| rls | `34|5c82068f66de6c08d25a0647333b2c19` | `34|5c82068f66de6c08d25a0647333b2c19` |
| policies | `114|e87cd9928f64cef637fe1798ea939fc9` | `114|e87cd9928f64cef637fe1798ea939fc9` |
| constraints | `141|ece1b4e90c32a1bf1b61202f95bf4b30` | `141|ece1b4e90c32a1bf1b61202f95bf4b30` |
| indexes | `86|b844916ed32fa546ebdc04f7f427957a` | `86|b844916ed32fa546ebdc04f7f427957a` |
| grants | `34|22bb3e64a7ac85dc6565d9047b457d2a` | `34|22bb3e64a7ac85dc6565d9047b457d2a` |
