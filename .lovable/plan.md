## Phase 1 Fix — IVF Weak Article Regression

### Finding

The build fix I applied added a `featured` anchor read to the `after-transfer` IVF topic themed on "the two-week wait". Its `href` uses `askIVF(...)` (which routes to `/ask`, not `/articles/two-week-wait`), so it does not link the weak article directly. However, per your rule this featured slot must only promote `ivf-timeline-what-to-expect` or `emotional-impact-of-ivf`, so it needs to change.

No other card, startHere entry, group link or anchor in `src/data/ivfTopicData.ts` points at `/articles/two-week-wait`. The `LINKS.twoWeekWait` constant on line 128 is defined but unreferenced (dead) — leaving it alone to avoid unrelated churn.

The `askIVF(...)` group links whose labels mention "two-week wait" or "test after transfer" go to the AI ask flow, not to weak article slugs, so they stay.

### Change (only file touched: `src/data/ivfTopicData.ts`)

Replace the `after-transfer.featured` block (currently themed on the two-week wait) with the approved emotional-impact anchor read:

```ts
featured: {
  eyebrow: "Anchor read · after transfer",
  title: "The emotional impact of IVF",
  body: "The waiting period after transfer can bring the emotional weight of the whole cycle to the surface. A steady read on why this stretch hits so hard, and how to hold yourself gently through it.",
  href: LINKS.emotionalIVF,
  hrefLabel: "Read the emotional impact of IVF",
},
```

`startHere: []` stays empty (component supports it).

### Guardrails honoured

- Only `src/data/ivfTopicData.ts` edited.
- No article objects deleted, no redirects, no noindex.
- No changes to `articleData.ts`, other topic data, templates, routes, SEO, calculators, product, About, AI, saved journey, or design tokens.
- `/articles/two-week-wait` still resolves directly.

### Verification

1. `tsgo` (typecheck).
2. Load `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy` and confirm:
   - No card, featured block, anchor read or startHere entry promotes any of the removed weak IVF slugs (`two-week-wait`, `when-to-take-a-pregnancy-test`, `how-long-implantation-takes`, `chemical-pregnancy`, `faint-positive-pregnancy-test`, `symptoms-stopping-early-pregnancy`, `fatigue-in-early-pregnancy`, `what-happens-at-a-fertility-appointment`, `emotional-wellbeing-pregnancy`).
   - `after-transfer` featured now shows the emotional-impact anchor.
   - Pages render without build errors.

### Return summary (will report after implementation)

- Whether `two-week-wait` was reintroduced, and where.
- Exact change applied.
- Replacement used (`emotional-impact-of-ivf`) and why.
- `tsgo` result.
- Confirmation no weak removed IVF slugs remain promoted.
