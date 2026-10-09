# 09 — Stale JWT after Auth deletion — S (§23)

**Result: PASS** (origin denies every operation; same-credential CDN residual as in 08, ended by purge). Raw: `raw/23-stale-jwt-S.txt`.

| Step | Observed |
|---|---|
| S0 | S's JWT downloaded **one** object (to make any CDN effect visible) and signed one URL |
| S1 | request opened through `private.n10_open_request` as the worker role, lease released; S hard-deleted **directly through Auth admin** (isolated semantics case) at 09:41:59.8Z; Auth user absent; request `requested`; 4 objects present; no purge yet |
| S2 list | HTTP 200 `[]` — denied |
| S2 download, never-downloaded objects (3) | HTTP 400 `not_found` — denied |
| S2 download, the one object S fetched before deletion | HTTP 200 from the CDN (same-credential residual, 08 §CDN) |
| S2 INSERT / upsert / UPDATE | HTTP 400 `{"statusCode":"403","error":"Unauthorized","message":"new row violates row-level security policy"}` — denied |
| S2 DELETE | HTTP 200 `[]` — nothing removed |
| S2 createSignedUrl / createSignedUrls | 400 `not_found` / no usable URL — denied |
| S2 integrity | exactly the 4 originals; all byte-identical (service-role SHA-256) |
| S3 worker | manual invocation with the invocation-only secret → HTTP 200 exactly `{"ok":true}`; S: Auth delete reports not-found → database confirms absence → `auth_deleted` → purge → **`awaiting_final_sweep`**, `objects_removed = 4`, canonical media 0; `final_sweep_after - auth_deleted_at = 01:15:00`; admin Storage calls carried no user session (service-role client, `persistSession: false`) |

The same worker run also processed P (08). Control C intact.

This closes, on hosted infrastructure, the N10.1 finding that a pre-deletion JWT could still upload to Storage: every stale write is now refused by the guarded policies, and the stale JWT cannot sign or newly read anything from the origin.

Note on `auth_deleted_at`: for S it records the worker's database confirmation (09:42:07.9Z), 8 s after the actual Auth deletion — the window anchor is therefore later than the real deletion, which only widens the post-deletion sweep coverage (H1).
