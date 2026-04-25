## Restore Wave 2 / Pass 2 — signed-in core product events

Verified: the seven Pass 2 events (`my_week_viewed`, `my_journey_viewed`, `kept_chapter_viewed`, `reflection_saved`, `photo_saved`, `protected_route_redirect`, `post_login_redirect`) are **not** in `analyticsEvents.ts` and have **no fire points** anywhere in the codebase, while `RouteTracker` already skips `/my-week`, `/my-journey`, and `/my-week/:week`. Result: those routes are currently uninstrumented.

Apply the **preferred fix** — restore the seven semantic events. Keep the existing skip rules intact. No content / AI tracking changes in this pass.

---

### Files

**Edited**
- `src/lib/analyticsEvents.ts` — add seven `EVENTS` constants and matching `EventMap` entries, all with `Record<string, never>` (common envelope only).
- `src/pages/MyWeek.tsx` — fire `my_week_viewed` once after data load (ref-guarded).
- `src/pages/MyJourney.tsx` — fire `my_journey_viewed` once after data load (ref-guarded).
- `src/pages/KeptChapter.tsx` — fire `kept_chapter_viewed` once per `:week` after chapter load (ref keyed on week; re-fires on week change).
- `src/components/myweek/SlotReflection.tsx` — fire `reflection_saved` on each successful debounced upsert and on each successful `acceptShapedDraft`, deduped against `lastTrackedRef` so identical re-saves do not double-fire and so initial hydration of an existing reflection does not fire.
- `src/components/myweek/SlotPhotoMemory.tsx` — fire `photo_saved` after both the storage upload and `week_photos` upsert succeed in `handleFiles`. Removal does not fire.
- `src/components/auth/ProtectedRoute.tsx` — fire `protected_route_redirect` once when `status === "anon"`, from a `useEffect` (not during render). Ref guard prevents StrictMode double-fire.
- `src/pages/Auth.tsx` — fire `post_login_redirect` inside the `route()` helper, immediately before `navigate(target, { replace: true })`. Closure-level `routedRef` ensures the parallel `getSession()` and `onAuthStateChange` paths cannot double-fire.

**Unchanged**
- `src/components/analytics/RouteTracker.tsx` — skip rules stay as they are. No fallback removal needed.
- `src/lib/analytics.ts`, `src/lib/analyticsContext.ts`, `src/lib/consent.ts` — no changes.
- All article / hub / AI surfaces — out of scope.

---

### Taxonomy additions (`src/lib/analyticsEvents.ts`)

```ts
// Wave 2 / Pass 2 — signed-in core product
MY_WEEK_VIEWED:           "my_week_viewed",
MY_JOURNEY_VIEWED:        "my_journey_viewed",
KEPT_CHAPTER_VIEWED:      "kept_chapter_viewed",
REFLECTION_SAVED:         "reflection_saved",
PHOTO_SAVED:              "photo_saved",
PROTECTED_ROUTE_REDIRECT: "protected_route_redirect",
POST_LOGIN_REDIRECT:      "post_login_redirect",
```

All seven map to `Record<string, never>` in `EventMap`. Page identity for `kept_chapter_viewed` is carried by the envelope's `path` (e.g. `"/my-week/14"`), not a `week` property — keeps the common model intact.

---

### Exact fire points

| Event | File | Trigger | Dedupe |
|---|---|---|---|
| `my_week_viewed` | `src/pages/MyWeek.tsx` | `useEffect` watching `state` and `loading`; fires when `loading === false && state !== null`. | `useRef` flag, one-shot per mount. |
| `my_journey_viewed` | `src/pages/MyJourney.tsx` | `useEffect` watching `state`; fires on first non-null `state`. | `useRef` flag. |
| `kept_chapter_viewed` | `src/pages/KeptChapter.tsx` | `useEffect` watching `data` and `week`; fires when `data !== null` and re-fires when `week` changes. | Ref carrying the last fired week. |
| `reflection_saved` | `src/components/myweek/SlotReflection.tsx` | Inside the debounced upsert callback on success and inside `acceptShapedDraft` on success. | `lastTrackedRef` seeded from initial hydration; fires only when saved content is non-empty and differs from the last tracked value. |
| `photo_saved` | `src/components/myweek/SlotPhotoMemory.tsx` | At the end of `handleFiles` after both storage upload and `week_photos` upsert succeed. | One fire per successful save action; removal does not fire (replacement does — it is a real new save). |
| `protected_route_redirect` | `src/components/auth/ProtectedRoute.tsx` | `useEffect` watching `status`; fires when `status === "anon"` (before the `<Navigate>` returns on the next render). | Ref guard, one fire per mount per anon resolution. |
| `post_login_redirect` | `src/pages/Auth.tsx` | First line inside `route()` after `commitPendingJourneyToDB(...)` resolves and `target` is computed, immediately before `navigate(target, { replace: true })`. | Closure-level `routedRef` shared by the two callers (`getSession` resolution and `onAuthStateChange`). |

For a signed-out user opening `/my-week`, the resulting sequence is:
`protected_route_redirect` → `auth_viewed` → user authenticates → `auth_completed` → `post_login_redirect` → `my_week_viewed`. No duplication; each event marks a distinct moment.

---

### `reflection_saved` definition (carried over verbatim)

A **save-action metric**, not a reflection-adoption metric.

- Fires once per successful upsert of non-empty content that differs from the last tracked value (debounced typing-saves and shaping-accept saves both count).
- A long writing session legitimately produces several events.
- It does **not** measure: how many users ever wrote a reflection, distinct weeks with a reflection, or first-vs-returning save behaviour. A separate adoption event must be designed before any dashboard treats `reflection_saved` as adoption.

---

### Final source of truth for signed-in routes (after this pass)

| Path | Generic `page_viewed`? | Sole semantic event(s) |
|---|---|---|
| `/my-week` | skipped | `my_week_viewed` |
| `/my-journey` | skipped | `my_journey_viewed` |
| `/my-week/:week` | skipped | `kept_chapter_viewed` |

Plus, occurring on the signed-in product but not view-class:
- `reflection_saved` — emitted by the reflection slot inside `/my-week`.
- `photo_saved` — emitted by the photo slot inside `/my-week`.
- `protected_route_redirect` — emitted by `ProtectedRoute` for any signed-out hit on `/my-week`, `/my-week/:week`, `/my-journey`.
- `post_login_redirect` — emitted by `Auth` immediately before forwarding the user post-login.

After this pass, no signed-in core product surface is left uninstrumented, and the existing skip rules continue to prevent any duplication with generic `page_viewed`.

---

### Issue #5 status

**Fully resolved** by the preferred fix. The seven semantic events are added to the taxonomy and have explicit, deduped fire points. The `RouteTracker` skip rules remain in place and are now backed by real semantic events on every signed-in product surface. No fallback (skip-rule removal) is required.

---

### Layer separation reaffirmed

- All seven events use `Record<string, never>` — no per-event properties, no product-memory or AI-context fields.
- `analyticsEvents.ts` continues to import nothing from product or AI layers.
- `analytics.ts` continues to gate every fire through the existing consent check.
- AI context never reads from the analytics stream; analytics never reads from product memory.

---

### Out of scope (do not touch in this pass)

- Content tracking events (`stage_hub_viewed`, `article_viewed`, `article_deep_read`).
- Embedded calculator coverage.
- AI surfaces.
- Reflection-adoption metric design (still a carry-over).
- Real analytics sink wiring (still a carry-over).