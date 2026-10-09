# 15 — Signed URLs and CDN residual (§29, D15)

**Result: PASS for signed URLs under D15; authenticated-download CDN residual recorded for owner classification (08).** Raw: `raw/29-post-purge-cache-PS.txt`, `raw/29b-post-purge-cache-F.txt`, `raw/24-end-to-end-A.txt`, `raw/22*-*.txt`.

| Case | Observed |
|---|---|
| Pre-issued 3,600 s URL before the freeze (P, S, A, F) | fetched successfully |
| New signing after freeze (P) / after Auth deletion (S) | **denied** (createSignedUrl 400 `not_found`; createSignedUrls 0 usable) |
| Auth deletion failed (F) | pre-issued URL still served, media byte-identical — **D15 accepted residual** |
| Freeze while Auth exists (P) | pre-issued URL still served — D15 accepted residual (RLS does not revoke pre-issued URLs) |
| After successful deletion + purge | exact pre-issued URL stopped serving (400, `BYPASS`): P/S at the first poll 29–32 s after purge (no earlier sample); **A ≤ 3.0 s** after the `delete-account` call started; F ≤ 4 s after purge |

Nothing continued to serve after purge beyond the documented CDN invalidation behaviour, so no D15 HOLD is triggered. RLS is **not** claimed to have revoked any pre-issued URL; termination came from the purge.
