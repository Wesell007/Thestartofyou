## Wave 1 — analytics scaffolding (only)

A small, contained pass that proves the architecture end-to-end with three events, a single route tracker, identify on auth changes, and strict consent gating. No broad instrumentation.

### Files

**New**
- `src/lib/analyticsEvents.ts` — central event name constants + typed prop shapes for the 3 proof events. Single source of truth for event names; prevents string drift.
- `src/lib/analyticsContext.ts` — anonymous_id + user_id management. `anonymous_id` is **only generated after consent is accepted** (lazy on first authorised call), persisted in `localStorage` (`tsoy_anon_id_v1`). `user_id` is held in-memory only; never written to product tables.
- `src/components/analytics/RouteTracker.tsx` — listens to `useLocation`, calls `trackPageView(path)` on every route change **except `/`** (see duplication note). No-op until consent is accepted.

**Edited**
- `src/lib/analytics.ts` — extend with: lazy context attachment (anon_id once consent granted, user_id if set), `identify(userId)` that stores user_id and forwards, plus a `resetAnalyticsContext()` called on consent reset / sign-out. Keep all calls gated by `hasAnalyticsConsent()`. Console adapter unchanged.
- `src/App.tsx` — mount `<RouteTracker />` once inside `<BrowserRouter>`; subscribe to `supabase.auth.onAuthStateChange` once at app root to call `identify(user?.id ?? null)`. No product logic touched.
- `src/pages/Index.tsx` — fire `home_viewed` on mount (single, deliberate event; route tracker skips `/`).
- `src/components/home/NewHeroSection.tsx` — `start_journey_clicked` on the primary "Start your journey" CTA; `sign_in_clicked` on the inline "Sign in" link.
- `src/components/layout/Navbar.tsx` — `start_journey_clicked` on the desktop+mobile "Start your journey" buttons; `sign_in_clicked` on the desktop+mobile "Sign in" links. (Same event names, different `location` property — see taxonomy.)

### Event taxonomy (Wave 1 only)

```text
home_viewed              { }            — fired once from Index mount
start_journey_clicked    { location }   — location: "home_hero" | "navbar"
sign_in_clicked          { location }   — location: "home_hero" | "navbar"
```

Common properties auto-attached by `analytics.ts` (not by callers):
`anonymous_id`, `user_id` (nullable), `path`, `timestamp`.

Forbidden in props (enforced by convention + types): journey content, reflections, due dates, names, emails, free-text — anything from product memory or AI context.

### Exact flow for the 3 proof events

1. **`home_viewed`** — `Index.tsx` `useEffect(() => trackEvent("home_viewed"), [])`. Route tracker explicitly skips `/` to avoid duplicating this. Net result: exactly one event per homepage visit.
2. **`start_journey_clicked`** — `onClick` on each Start CTA (hero + navbar desktop + navbar mobile) calls `trackEvent("start_journey_clicked", { location })` synchronously before `<Link>` navigation. Console adapter is sync, so no race.
3. **`sign_in_clicked`** — same pattern on the three Sign in entry points (`location: "home_hero" | "navbar"`).

### Consent gating behaviour

- **Before acceptance** (`unknown` or `rejected`): every `trackEvent`/`trackPageView`/`identify` call short-circuits in `analytics.ts`. No `anonymous_id` is generated. No `user_id` is forwarded. Dev-only `console.debug("[analytics:dropped:…]")` still logs so we can verify call sites are wired without leaking data.
- **At acceptance**: `anonymous_id` is lazily created on the next authorised call and persisted. The auth subscription's most recent `userId` is forwarded via `identify()` immediately so subsequent events carry it.
- **After rejection or reset**: `resetAnalyticsContext()` clears in-memory user_id and removes `tsoy_anon_id_v1` from storage, so a future opt-in starts fresh.

### Identity model

- `anonymous_id`: UUID v4, generated **only after consent accepted**, stored in `localStorage` under `tsoy_anon_id_v1`. Stable across sessions for the same browser. Cleared on consent reset.
- `user_id`: Supabase auth user id, held **in memory only** in `analyticsContext.ts`. Set by `identify()` from the App-root auth subscription. Never written to any product table; never persisted to localStorage. On sign-out → `identify(null)`.
- Strict separation: `analytics.ts` and `analyticsContext.ts` do not import `savedJourney.ts`, `authIntent.ts`, profile data, or any AI helper. Identify only receives the bare `userId` string.

### Pageview / home-view duplication

Resolved: `RouteTracker` skips `path === "/"`. The homepage is measured by the deliberate `home_viewed` event only. All other routes get a single `page_viewed` (auto from RouteTracker). No double counting.

### Layer separation reminders

- Analytics layer: this pass only.
- Product memory: `savedJourney.ts` + Supabase tables — untouched.
- AI context: built separately from explicit product state — not consuming the event stream.
- No analytics-only flags added to product tables in this pass.

### Manual review points before Wave 2

1. Choose the real analytics sink (PostHog / Plausible / Lovable Cloud table) before Wave 2 instrumentation lands.
2. Confirm the privacy page copy lists `anonymous_id` and the `tsoy_anon_id_v1` key once a sink is wired.
3. Decide whether the `location` property convention (`home_hero`, `navbar`, …) needs a typed enum before Wave 2 expands click-tracking.
4. Confirm that `identify()` should fire on every auth state change vs only `SIGNED_IN`/`SIGNED_OUT` — current plan: every change, since the gate makes it cheap.
5. Decide retention/rotation policy for `anonymous_id` (current: indefinite until consent reset).