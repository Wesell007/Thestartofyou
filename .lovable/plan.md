## Phase 11.1 — Journal Route Small Fix

Make `/journal` the canonical route for the existing Product/Journal page, and keep `/product` working as a redirect. Update Navbar, Footer, canonical, and sitemap generator to match.

### Files inspected
- `src/App.tsx` (route table)
- `src/pages/Product.tsx` (page + `SeoHead` canonical)
- `src/components/layout/Navbar.tsx` (temp mapping note L23–25)
- `src/components/layout/Footer.tsx` (temp mapping L69)
- `scripts/generate-sitemap.ts` (`core` array contains `/product`)
- `package.json` (predev/prebuild run sitemap generator)

### Changes

1. **`src/App.tsx`** — mount the Product component on `/journal` and turn `/product` into a redirect. `Product` is imported once and reused; no page code is duplicated.
   - Add `<Route path="/journal" element={<Product />} />`
   - Change `<Route path="/product" element={<Product />} />` → `<Route path="/product" element={<Navigate to="/journal" replace />} />` (reuses the existing `Navigate` import already in the file).

2. **`src/pages/Product.tsx`** — update SEO canonical to `/journal` so `/journal` is the SEO-canonical destination (matches redirect direction). No other page content changes.
   - `canonical="https://thestartofyou.com/product"` → `canonical="https://thestartofyou.com/journal"`

3. **`src/components/layout/Navbar.tsx`** — point Journal at `/journal` and drop the temporary-mapping note.
   - Change `{ label: "Journal", href: "/product" }` → `{ label: "Journal", href: "/journal" }`
   - Remove the `// NOTE: temporary route mapping — Journal label points to /product` comment.

4. **`src/components/layout/Footer.tsx`** — same swap.
   - Change `{ to: "/product", label: "Journal" }` → `{ to: "/journal", label: "Journal" }`

5. **`scripts/generate-sitemap.ts`** — replace `/product` with `/journal` in the `core` array so the sitemap advertises the canonical route only.
   - `const core = ["/", "/about", "/support", "/product", "/preparing-for-baby"];` → `const core = ["/", "/about", "/support", "/journal", "/preparing-for-baby"];`
   - `predev` will regenerate `public/sitemap.xml` on the next dev restart (standard project workflow), so `/journal` replaces `/product` in the emitted sitemap without ad-hoc edits.

### Preserved (not touched)
TTC, Pregnancy, IVF, First Year, Toddler, Family data and components; article content; images; calculators; TTC Journey; auth/setup; robots.txt (still correct); other SEO infrastructure; the rest of the route table.

### Verification
- `bunx tsgo --noEmit` → expected clean.
- Manual: `/journal` renders the Product experience; `/product` 302-style client redirect to `/journal`; Navbar + Footer link to `/journal`; canonical on the page is `/journal`; regenerated `public/sitemap.xml` lists `/journal` (not `/product`).

### Deliverable summary
Will report files inspected, files edited, route/Navbar/Footer/redirect/canonical/sitemap results, preservation checks, typecheck exit code, and whether it is safe to move into SEO final QA.
