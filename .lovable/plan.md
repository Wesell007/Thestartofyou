## Cleanup pass: skip signed-in product routes from generic pageviews

Stop double-measuring the signed-in core product surfaces. The semantic view-events from Pass 2 (`my_week_viewed`, `my_journey_viewed`, `kept_chapter_viewed`) become the sole truth for these pages. No content or AI instrumentation in this pass.

### Files

**Edited**
- `src/components/analytics/RouteTracker.tsx` — extend the skip set so `/my-week`, `/my-journey`, and any `/my-week/:week` path are not emitted as generic `page_viewed`.

**Unchanged**
- `src/lib/analyticsEvents.ts`, `src/lib/analytics.ts`, `src/lib/analyticsContext.ts`, `src/lib/consent.ts`
- `src/pages/MyWeek.tsx`, `src/pages/MyJourney.tsx`, `src/pages/KeptChapter.tsx`
- `src/components/myweek/SlotReflection.tsx` — `reflection_saved` fire logic untouched (see note below).
- All article, content, and AI surfaces — explicitly out of scope.

### Implementation detail

`RouteTracker` currently uses an exact-match `Set<string>`. We extend it to also handle the kept-chapter pattern `/my-week/:week` (a path segment after `/my-week/`).

```ts
const PAGEVIEW_SKIP_EXACT = new Set<string>([
  "/",
  "/auth",
  "/my-week",
  "/my-journey",
]);

// /my-week/:week — kept chapters are measured by `kept_chapter_viewed`.
const KEPT_CHAPTER_RE = /^\/my-week\/[^/]+\/?$/;

const shouldSkip = (pathname: string) =>
  PAGEVIEW_SKIP_EXACT.has(pathname) || KEPT_CHAPTER_RE.test(pathname);
```

The effect then checks `shouldSkip(location.pathname)` before calling `trackPageView`. The skip rules live in one place; no other call site changes.

### Final skip-list behaviour

| Path | Generic `page_viewed`? | Sole semantic event |
|---|---|---|
| `/` | skipped | `home_viewed` |
| `/auth` | skipped | `auth_viewed` |
| `/my-week` | skipped | `my_week_viewed` |
| `/my-journey` | skipped | `my_journey_viewed` |
| `/my-week/14` (any `:week`) | skipped | `kept_chapter_viewed` |
| Everything else (articles, hubs, calculators, setup, etc.) | emitted | — |

### Double-measurement check

After this change, the signed-in core product surfaces emit exactly one view-class event per visit:

- `/my-week` → `my_week_viewed` (after data load)
- `/my-journey` → `my_journey_viewed` (after data load)
- `/my-week/:week` → `kept_chapter_viewed` (after chapter load, re-fires per `:week` change)

No `page_viewed` is emitted for these paths. Other route changes (articles, hubs, calculators) still emit `page_viewed` as before.

### `reflection_saved` — explicit definition (no logic change)

`reflection_saved` is a **save-action metric**, not a reflection-adoption metric.

- Fires once per successful upsert of non-empty content that differs from the last tracked value (debounced typing-saves and shaping-accept saves both count).
- A long writing session can produce multiple `reflection_saved` events in a single sitting — each represents a real persisted save, not a unique reflection.
- It does **not** measure: how many users ever wrote a reflection, how many distinct weeks have a reflection, or first-time vs. returning save behaviour.
- For a true adoption metric (e.g. "users who kept ≥ 1 reflection", "weeks with a reflection per user"), introduce a distinct event in a later pass — do not reinterpret `reflection_saved` after the fact.

This definition should be mirrored in the analytics dictionary / privacy copy when those land.

### Remaining issues before content tracking

1. **Reflection-adoption metric** — design and name a separate event (e.g. `reflection_first_kept_for_week`) before content tracking lands, so dashboards do not silently lean on `reflection_saved` as a proxy.
2. **Common-model extension policy** — content tracking will want minimal context (article slug, hub stage, position in feed). Agree the typed-enum allowlist (and the rule against free-text values) before instrumenting any article surface.
3. **Pageview policy for hubs and articles** — decide whether hub roots (`/pregnancy`, `/postpartum`, etc.) should retain generic `page_viewed` or move to semantic `hub_viewed` events when content tracking starts. Current default is to keep generic pageviews until content tracking explicitly replaces them.
4. **Real analytics sink** — still pending; required before content/AI tracking adds volume.
5. **Privacy copy** — list the now-stable view, save, and routing event categories before adding content/AI categories.
6. **Strict layer separation** — reaffirm: analytics never reads from product memory or AI context, and AI context never reads from the analytics stream. Content tracking must follow the same rule.