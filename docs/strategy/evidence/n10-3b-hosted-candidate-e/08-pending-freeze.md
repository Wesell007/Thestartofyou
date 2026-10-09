# 08 — Pending-deletion freeze — P (§22), and the CDN finding

**Result: PASS at the Storage origin for every operation; one CDN residual found and measured — OWNER CLASSIFICATION REQUIRED (see below).** Raw: `raw/22-pending-freeze-P.txt`, `raw/22b-download-diagnosis-P.txt`, `raw/22c-cdn-cache-key-P.txt`, `raw/22d-cdn-residual-while-pending-T.txt`, `raw/22e-cdn-residual-after-purge-T.txt`.

## P (pre-request JWT used throughout; first run aborted on a harness bug before any request existed — rerun from clean state)

| Step | Observed |
|---|---|
| P1 before the request | list, download ×4, insert, upsert, delete, createSignedUrl (3,600 s), createSignedUrls, signed-URL fetch: **all succeed** |
| P2 durable request | `n10_open_request` as the worker role through the pooler: `requested`, lease acquired and released; one row; Auth user present; freeze committed 09:40:14Z |
| P3 list (both buckets) | HTTP 200 `[]` — denied |
| P3 INSERT / upsert / UPDATE | HTTP 400 `{"statusCode":"403",…"new row violates row-level security policy"}` — denied |
| P3 DELETE | HTTP 200 `[]` — nothing removed |
| P3 createSignedUrl / createSignedUrls | 400 `not_found` / 0 usable URLs — denied |
| P3 download ×4 | **HTTP 200** — see the CDN finding |
| P4 | exactly the 4 originals, all byte-identical (service-role SHA-256); Auth user exists; request `requested` |
| P5 / D15 | the P1 pre-issued signed URL still serves while Auth exists — accepted D15 residual |

## CDN finding (new, D15 class)

| Measurement | Observed |
|---|---|
| P3 download responses | `CF-Cache-Status: HIT` for exactly the URLs P downloaded in P1 |
| Same objects, cache-busting query | `BYPASS` → origin → **400 `not_found`** (RLS + guard deny) |
| An object P never downloaded (service-role upload after the freeze) | origin → **400** |
| P's cached URL fetched with control C's JWT, the anon key, or no credentials | **BYPASS → 400** — the cache is keyed on the exact `Authorization`; no other caller can obtain the bytes |
| After purge (P, S, A, F, T) | the cached copy stopped serving at the first sample: ≤ ~30 s (P, S, first poll), ≤ 3 s (A), ≤ 4 s (F), ≤ 4 min sampling (T) — **purge terminates it** |
| While purge is withheld (T: Auth deletion forced to fail, 25 min) | T's own pre-freeze download kept serving from the CDN for the **entire 25 minutes** (5 samples, all `HIT`); origin denied every sample; media untouched; then the blocker was removed, the worker purged T, and the cached copy stopped |
| After the JWT expires | **not measured** (would require holding a frozen user > 60 min) |

**Classification (for the owner, not self-accepted):** Storage RLS and the N10 guard hold at the origin for every operation. Supabase's Smart CDN serves a cached copy of an *authenticated* download only to the **same credential that already received those exact bytes before the freeze**; it never discloses anything new, never accepts a write, and ends when the object is purged (consistent with the documented CDN invalidation on object deletion). This is the same class as the frozen D15 residual for pre-issued signed URLs, but D15 as written covers signed URLs only. Its duration while a deletion is pending but purge is withheld (Auth failure / `auth_attention`) is bounded by the CDN's retention of an unchanged object, measured ≥ 25 min, and possibly beyond JWT expiry (unmeasured). Recommended: owner decision on extending D15 to cover authenticated-download CDN caching, and on whether a post-expiry measurement or an origin-side cache-control change (outside N10's frozen scope) is required before production.
