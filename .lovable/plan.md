# WC-1 — Launch-Blocker Sweep

Verified audit of the current site. Findings below are confirmed by reading the routes, pages and shared templates. No tool logic, article data, routes, sitemap URLs or robots rules change.

## What is actually broken

**1. Nine indexable pages ship with no metadata at all.**
The four First Year phase pages (`/first-year/0-3-months`, `3-6-months`, `6-9-months`, `9-12-months`) and the five Toddler age pages (`/toddler/12-17-months`, `18-23-months`, `2-years`, `30-months`, `3-years`) are thin wrappers around two shared templates, and neither template renders `SeoHead`. These routes are in the sitemap, so search engines are being pointed at pages with no title, description or canonical. This is the only true launch blocker.

**2. Four pages have no head metadata and should be explicitly non-indexable.**
- `/account-settings` — private account and data-deletion screen.
- `/postpartum/legacy` — retained legacy page.
- `/trying-to-conceive/legacy` — retained legacy page, duplicates the live TTC hub.
- The 404 route — currently inherits whatever metadata the previous route left behind.

**3. The reported dead TTC call to action is not dead.**
`TTCFinalCTA` links to `/trying-to-conceive/understanding-your-cycle`, which is served by the generic stage route and is already in the SEO allowlist with proper metadata. No fix needed; this will be confirmed by loading the page rather than assumed.

Everything else checked came back clean: all auth, setup, toolkit, journey, memories, ask and journal-start surfaces already carry `SeoHead` with `noindex`.

## The work

1. Add `SeoHead` to the two shared templates so all nine pages get metadata from their existing config, driven by data already present (`slug`, `title`, and the intro/standfirst copy). Titles and descriptions come from the content, not new copy.
2. Add `SeoHead` with `noindex` to Account Settings, both legacy pages and the 404 route.
3. Load the TTC call-to-action destination and the newly-tagged pages in a browser to confirm they render correctly and produce the expected head tags.

## Technical notes

- `SeoHead` currently requires a `canonical`. It will be made optional so the 404 route and the legacy pages can avoid declaring a canonical that would point a dead or duplicate page at real content. All existing callers pass one and are unaffected.
- Canonicals for the nine indexable pages self-reference their own route under `https://thestartofyou.com`, matching the sitemap entries exactly.
- Legacy and private pages get `noindex,follow` and no canonical; `robots.txt` is not touched, since a `Disallow` would stop crawlers ever seeing the `noindex`.
- No changes to `scripts/generate-sitemap.ts`: its entries already reconcile with the route table, and every excluded route is independently `noindex`.
- Checks: tests, lint, type-check and build. The one pre-existing lint error in generated auth storage is left as-is.
