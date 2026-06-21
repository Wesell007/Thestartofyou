## A. IVF article return / parent-context

**Problem:** `ArticleTopicReturn` (rendered at the foot of every article on both Flagship and Deep templates) only understands two journeys: TTC and Pregnancy. When `data.journey` includes `"ivf"` it falls through and shows "← The Pregnancy Map", which is wrong. The in-hero breadcrumb in `FlagshipHero`/`ArticleHeader` has the same blind spot. And there is no signal anywhere in the article header that the reader came from a specific IVF stage, so once they land they feel stranded.

**Fix — small, scoped changes:**

1. **Remember the IVF stage the user came from.** In `src/components/ivf/IVFTopicPage.tsx`, on mount write a tiny record to `sessionStorage` under key `ivf:lastStage`:
   ```
   { slug, title, href }   // e.g. { slug: "before-transfer", title: "Before transfer", href: "/ivf/before-transfer" }
   ```
   No new dependency, no router change, no analytics change. Clears naturally when the tab closes.

2. **New `ArticleIVFContext` strip above the hero.** A deliberately light, secondary orientation strip — uppercase 11px muted text, single line, no card, no border, no accent colour. Shows `IVF · ← <Stage> · ← IVF hub` (stage chip only if sessionStorage has a value; otherwise just `← IVF hub`). Rendered inside `ArticleFlagshipTemplate` and `ArticleDeepTemplate` only when `data.journey?.includes("ivf")`. Must not compete with the article hero — same visual weight as the existing breadcrumb row.

3. **Suppress the in-hero breadcrumb for IVF articles.** `FlagshipHero` and `ArticleHeader` both hard-code "The Pregnancy Map" as the breadcrumb root. When `journey` is IVF, hide that breadcrumb row (the new context strip above the hero already covers it). No other changes to those components.

4. **Teach `ArticleTopicReturn` about IVF.** When `data.journey?.includes("ivf")`:
   - `← Back to <stage title>` (only if `sessionStorage.ivf:lastStage` exists)
   - `← The IVF Journey` linking to `/ivf` (always shown for IVF articles)
   - Existing TTC and Pregnancy branches untouched.

## B. Before transfer coverage audit

Current four groups already cover most of the brief. Gaps:

| Area | Status |
|---|---|
| What IVF is / timeline / protocol / appointments | ✓ |
| Injections / baseline scan / monitoring scans | ✓ |
| **Blood tests — what they're checking** | **missing** |
| Egg collection / embryo transfer / prep / treatment-week feel | ✓ (prep group + protocolWeek strip) |
| Emotional impact / steadying / relationship | ✓ |
| **Anxiety / hard-moment fallback** | **missing** |

**Minimal additions (no clutter, no duplicates):**

- Medication group → one askIVF link: *"What are the blood tests during IVF actually checking?"*
- Preparing emotionally group → one askIVF link: *"What helps when a hard IVF moment hits?"* (distinct from "steady yourself in the lead-up" — slow burn vs. acute).

No reordering, no removals. Group sizes go 3 / 4 / 4 / 4.

## C. Files touched

- `src/components/article/ArticleIVFContext.tsx` — new, light context strip.
- `src/components/article/ArticleTopicReturn.tsx` — add IVF branch.
- `src/components/article/ArticleHeader.tsx` — hide existing breadcrumb when journey is IVF.
- `src/components/article/flagship/FlagshipHero.tsx` — same.
- `src/components/article/flagship/ArticleFlagshipTemplate.tsx` — mount `ArticleIVFContext` above hero.
- `src/components/article/ArticleDeepTemplate.tsx` — same.
- `src/components/ivf/IVFTopicPage.tsx` — write `ivf:lastStage` on mount.
- `src/data/ivfTopicData.ts` — add two askIVF links inside `before-transfer`.

## D. Out of scope

- No redesign of IVF hub, stages, or articles.
- No TTC or Pregnancy changes.
- No new routing, no new breadcrumb component, no premium polish pass.
- No edits to `ArticleRelatedReads` or article body content.

## E. Verification

Navigate IVF hub → Before transfer → article: top strip shows `IVF · ← Before transfer · ← IVF hub`; bottom shows `← Back to Before transfer · ← The IVF Journey`. Repeat for After transfer and Early pregnancy. TTC and Pregnancy articles visually unchanged.
