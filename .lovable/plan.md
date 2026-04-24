# Strict opt-in consent + analytics gate

A calm, minimal banner asks the user once. Until they explicitly accept, no analytics fires. Product state, auth, and saved journeys keep working untouched.

## What gets built

### 1. Consent state (`src/lib/consent.ts`)
A single source of truth for analytics consent, decoupled from everything else.

- States: `"unknown" | "accepted" | "rejected"`
- Stored in `localStorage` under key `tsoy_consent_analytics_v1` (versioned so future schema changes don't silently inherit old answers).
- Helpers:
  - `getAnalyticsConsent(): ConsentState`
  - `setAnalyticsConsent(state: "accepted" | "rejected"): void` — writes storage and dispatches a `consentchange` window event
  - `subscribeAnalyticsConsent(cb): unsubscribe` — listens to the event for live UI updates
- Treats `unknown` as **not consented**. Dismissal is never consent.

This file knows nothing about analytics implementations or product state.

### 2. Analytics gate (`src/lib/analytics.ts`)
The single entry point all future instrumentation must go through. Day-one implementation is a no-op gate, ready for a real sink later.

- Public API:
  - `trackEvent(name: string, props?: Record<string, unknown>): void`
  - `trackPageView(path: string): void`
  - `identify(userId: string | null): void`
- Behaviour:
  - On every call, checks `getAnalyticsConsent()`.
  - If not `"accepted"`: silently no-ops (and in dev, `console.debug` the dropped event so engineers can verify gating).
  - If `"accepted"`: forwards to an internal adapter. Day-one adapter is a console adapter behind a `__DEV__` check; production adapter slot is left as a clearly marked TODO so wiring PostHog/Plausible later is a single-file change.
- Never imports product state, journey data, or AI helpers. No event payload includes profile data unless an explicit caller passes it.

### 3. Consent banner (`src/components/consent/ConsentBanner.tsx`)
A small, calm banner anchored bottom of viewport.

- Visible only when consent state is `"unknown"`.
- Copy (UK English):
  > **A small note on analytics**
  > We use anonymous analytics to understand which parts of The Start of You are genuinely helping. It's optional and you can change your mind later.
  - Two equally weighted buttons: **Reject analytics** (quiet outline) and **Accept analytics** (terracotta CTA). Neither is hidden, neither is dimmed. Same size, same prominence — reject is on the left so it's not the harder choice.
  - Small link: **Privacy** → `/privacy` (existing or future page; banner doesn't depend on it existing today).
- No "X" dismiss. No "by continuing you agree". Closing the tab leaves state as `"unknown"` and the banner returns next visit.
- Responsive: full-width strip on mobile, centred max-w-2xl card with subtle shadow on desktop. Uses existing `bg-card`, `border`, `rounded-2xl`, `shadow-soft` tokens — no new design system pieces.
- Mounted once at the root (in `App.tsx`) so it follows the user across routes until they choose.

### 4. Preference re-entry (lightweight)
Not a full preference centre. Just one tiny affordance so users who said yes/no can change their mind:

- A `<ConsentLink />` component (text-only "Manage analytics") rendered in `Footer.tsx`. Clicking it opens a small inline confirm using the existing `Sonner` toast with two action buttons (Accept / Reject), or — if simpler — resets state to `"unknown"` so the banner reappears. We'll use the latter (resets to `unknown`) for minimal new surface.

## What is **strictly necessary** (stays on without consent)

These keep working untouched. They're required to deliver the product the user asked for.

- Supabase auth session (`auth-token` localStorage entry managed by Supabase client)
- Saved journey state (`pregnancy_journeys`, `journeys`, `reflections`, `week_photos`)
- `pendingJourney` localStorage (mid-flow setup state the user explicitly initiated)
- `return_to` / `auth_intent` URL params used by protected-route flow
- React Query cache, Sonner toasts, route state

These touch no analytics layer and no consent check is added to them.

## What is **optional** (gated behind opt-in)

- Any call to `trackEvent`, `trackPageView`, `identify`
- Any future PostHog / Plausible / GA adapter
- Any future behavioural personalisation built on top of analytics

## Strict separation guarantees

```text
┌─────────────────────────┐   ┌─────────────────────────┐   ┌───────────────────────┐
│  Product state          │   │  Analytics (gated)      │   │  AI context (future)  │
│  savedJourney.ts        │   │  analytics.ts           │   │  curated from product │
│  authIntent.ts          │   │  consent.ts             │   │  state only           │
│  Supabase tables        │   │  ConsentBanner.tsx      │   │                       │
└─────────────────────────┘   └─────────────────────────┘   └───────────────────────┘
        ▲                              ▲                              ▲
        │                              │                              │
   always on                  off until accepted              never auto-fed by
                                                              the analytics layer
```

`analytics.ts` has zero imports from `savedJourney.ts`, `authIntent.ts`, or any AI helper. AI helpers (when built) will read from product state directly, never from the event stream.

## Files

**New**
- `src/lib/consent.ts`
- `src/lib/analytics.ts`
- `src/components/consent/ConsentBanner.tsx`
- `src/components/consent/ConsentLink.tsx`

**Edited**
- `src/App.tsx` — mount `<ConsentBanner />` once at root
- `src/components/layout/Footer.tsx` — add quiet `<ConsentLink />` in the legal/meta row

No changes to: auth, protected routes, saved journey logic, AI surfaces, routing, design tokens.

## Manual review points

- **Privacy page copy**: banner links to `/privacy`. If that page doesn't exist yet, link will 404 — flag for content team to draft a short privacy note before launch.
- **Jurisdictional posture**: strict opt-in is conservative globally; safe for UK/EU. If targeting US-only later, posture could be relaxed.
- **Versioning policy**: storage key includes `_v1`. Decide your policy for bumping the version (e.g. when adding a new tracking category, force re-consent).
- **Future AI personalisation consent**: intentionally out of scope. When AI context expands beyond "explicitly saved journey data", a separate consent question will likely be needed. The `consent.ts` module is structured to easily add a second key (e.g. `tsoy_consent_ai_v1`) without refactoring.
- **Sink selection**: real analytics adapter is a single TODO in `analytics.ts`. Choose PostHog / Plausible / Lovable Cloud table in a follow-up.

## Output you'll get after build

1. Consent UX implemented (banner + footer link)
2. Consent state stored in versioned localStorage key
3. Analytics gated through `analytics.ts` — no-ops until `"accepted"`
4. Strictly necessary vs optional list (above) reflected in code boundaries
5. Changed/created files list
6. Manual review notes
