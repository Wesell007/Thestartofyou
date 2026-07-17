## Phase 9.10 — StagePage Safety and Canonical Cleanup

Scope-limited SEO/redirect pass. No content, hub, calculator formula, or TTC Journey changes.

### 1. TTC StagePage SEO (allowlisted)

Edit `src/pages/StagePage.tsx`:
- Import `SeoHead` from `@/components/seo/SeoHead`.
- Define an explicit allowlist keyed by `${journey}/${stage}` covering only:
  - `trying-to-conceive/understanding-your-cycle`
  - `trying-to-conceive/timing-and-tracking`
  - `trying-to-conceive/waiting-and-testing`
- Each entry provides title, description, canonical (absolute `https://thestartofyou.com/...`).
- Render `<SeoHead ... />` at the top of the returned JSX only when the current route matches the allowlist. All other wildcard routes render without `SeoHead` (unchanged behaviour). No JSON-LD, no author, no reviewedBy.

Metadata values exactly as supplied in the brief.

### 2. Redirect orphaned postpartum StagePage routes

In `src/App.tsx`, add explicit routes above the `/:journey/:stage` wildcard:

```text
/postpartum/early-days          → /first-year/postpartum-recovery/healing-after-birth
/postpartum/early-weeks         → /first-year/postpartum-recovery/what-recovery-can-feel-like
/postpartum/ongoing-adjustment  → /first-year/emotional-wellbeing/feeling-like-yourself-again
```

Use `<Route path="..." element={<Navigate to="..." replace />} />`. No new pages, `/postpartum/legacy` unchanged.

### 3. Redirect duplicate `/trying-to-conceive/ovulation-calculator`

Replace the current duplicate route:

```tsx
<Route path="/trying-to-conceive/ovulation-calculator" element={<OvulationCalculator />} />
```

with a small inline query-preserving redirect component defined in `src/App.tsx`:

```tsx
const RedirectToOvulationCalculator = () => {
  const { search } = useLocation();
  return <Navigate to={`/ovulation-calculator${search}`} replace />;
};
```

Add `useLocation` to the react-router-dom import. Calculator page, formulas, and canonical `/ovulation-calculator` untouched.

### 4. Redirect duplicate `/articles/signs-of-ovulation` → `/articles/ovulation-signs`

Add an explicit route above the generic `/articles/:slug`:

```tsx
<Route path="/articles/signs-of-ovulation" element={<Navigate to="/articles/ovulation-signs" replace />} />
```

No article data touched.

### 5. Sitemap update

Edit `scripts/generate-sitemap.ts`: extend the TTC static list with the 3 allowlisted TTC StagePage URLs (append after existing TTC entries, before assembly dedupe). Do not add postpartum, duplicate calculator, or duplicate article routes.

Regenerate `public/sitemap.xml` by running the generator; verify:
- 3 new TTC URLs present
- no `/postpartum/*` StagePage URLs
- no `/trying-to-conceive/ovulation-calculator`
- no `/articles/signs-of-ovulation`
- `/due-date-results` still absent
- no duplicates, no query strings, valid XML
- `public/robots.txt` unchanged (Sitemap directive still present)

### 6. Verification

- `bunx tsgo --noEmit`
- Manual route checks per brief (TTC stage SEO in `<head>`, all 3 postpartum redirects, calculator redirect with query string preserved, article slug redirect, regression list of core routes).

### Files

Edit: `src/App.tsx`, `src/pages/StagePage.tsx`, `scripts/generate-sitemap.ts`, `public/sitemap.xml` (regenerated).
No new files. No article data edits. No robots edits.
