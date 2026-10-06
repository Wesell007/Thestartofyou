# C1.17 Project 2 post-forward catalogue versus Project 1 C1.5 (11-c1-5-post-forward-catalogue.md)

Reference: `11-c1-5-post-forward-catalogue.md`. Set difference per section on identical line formats; functions compared by `md5(prosrc)` against the reference file and by `md5(pg_get_functiondef)` (t/f) against `02c-functions-functiondef-md5.txt`.

| Section | Reference lines | Captured lines | Removed | Added | Result |
|---|---|---|---|---|---|
| columns | 315 | 315 | 0 | 0 | EMPTY |
| enums | 5 | 5 | 0 | 0 | EMPTY |
| functions (prosrc / functiondef) | 25 | 25 | 0 / 0 | 0 / 0 | EMPTY |
| triggers | 36 | 36 | 0 | 0 | EMPTY |
| rls | 35 | 35 | 0 | 0 | EMPTY |
| policies | 118 | 118 | 0 | 0 | EMPTY |
| constraints | 161 | 161 | 0 | 0 | EMPTY |
| indexes | 104 | 104 | 0 | 0 | EMPTY |
| grants | 35 | 35 | 0 | 0 | EMPTY |

Overall diff: **EMPTY**.


| Section | Reference hash | Captured hash |
|---|---|---|
| columns | `315|f0281fd66e61ca80ee8dfdff9dd9076f` | `315|f0281fd66e61ca80ee8dfdff9dd9076f` |
| enums | `5|e01eb2548fddcc41e7f642a4337f3019` | `5|e01eb2548fddcc41e7f642a4337f3019` |
| functions (prosrc) | `25|c4a01c43648862bc267784f572393037` | `25|c4a01c43648862bc267784f572393037` |
| functions (functiondef) | `25|920ec2f6ef04bb28c0544cba706e2f6c` | `25|920ec2f6ef04bb28c0544cba706e2f6c` |
| triggers | `36|a4b05c5abb99287b808c5b7725fd507b` | `36|a4b05c5abb99287b808c5b7725fd507b` |
| rls | `35|a02d18c7827236a4a0b239e641b0fc3e` | `35|a02d18c7827236a4a0b239e641b0fc3e` |
| policies | `118|c5a61c1cbd875a2278c27248f6035d3f` | `118|c5a61c1cbd875a2278c27248f6035d3f` |
| constraints | `161|9c67159cf4c5092259d395a0892b8d30` | `161|9c67159cf4c5092259d395a0892b8d30` |
| indexes | `104|001b4ec0c45d85d8ed48ff0bc2153a64` | `104|001b4ec0c45d85d8ed48ff0bc2153a64` |
| grants | `35|0a9026c0907ba7d6718455b992d6f911` | `35|0a9026c0907ba7d6718455b992d6f911` |
