# Phase 26H — Notification Permission and Reminder Delivery Foundation

Parents can explicitly turn on browser notifications, on this device, for reminders they set themselves. App-open delivery only. No push, no service worker, no AI, no prediction.

## Discovery findings

1. Phase 26G files exist as built: `src/lib/firstYearRemindersSchema.ts` (pure types, validation, `groupReminders`, `describeDue`), `src/lib/firstYearReminders.ts` (CRUD), `src/components/firstyear/today/RemindersCard.tsx`, `src/components/firstyear/today/ReminderSheet.tsx`, plus the reminder migration.
2. No notification code anywhere: `Notification`, `requestPermission` return no matches in `src/` or `public/`.
3. No service worker code anywhere: `serviceWorker` returns no matches.
4. A device-level localStorage preference pattern already exists, for example the feed unit key in `firstYearCareEventsSchema.ts` and the consent key in `src/lib/consent.ts`, both guarded for absent storage.
5. Toasts use `useToast` from `@/hooks/use-toast`; `FirstYearToday.tsx` already has a `setStatus` and a reminder error helper.
6. Session access on Today comes from the existing `loaded.userId` value used by every reminder call.
7. Reminders load in the single `Promise.all` on Today and refresh through `refreshReminders(userId)`.
8. Due labels already refresh: `RemindersCard` keeps a `now` state on a 60 second interval, cleared on unmount.
9. Duplicate prevention will key on `reminder.id` plus `due_at`, so an edited time counts as a fresh occurrence.

## What gets built

### New pure module: `src/lib/firstYearReminderNotifications.ts`

- `notificationSupport()` returning `unsupported | granted | denied | default`, reading `window.Notification` defensively.
- Device preference read/write under `firstYearReminderNotifications:{userId}:preference` (`"on"` or absent).
- Delivered-occurrence set under `firstYearReminderNotifications:{userId}:delivered`, holding only `{id, dueAt}` pairs, pruned to recent entries. No labels, names or care details.
- `dueForNotification(reminders, now, delivered)` returning active reminders whose `due_at` has passed and which have not been delivered for that exact `due_at`.
- `NOTIFICATION_TITLE = "The Start of You reminder"`, `NOTIFICATION_BODY = "A reminder you set is due."`

### New hook: `src/hooks/useReminderNotifications.ts`

- Exposes `state` (`unsupported | off | requesting | on | blocked`), `enable()`, `disable()`.
- `enable()` is the only place that calls `Notification.requestPermission()`, and it runs from a click handler, never from an effect.
- While `state === "on"`, a light interval (60s) checks the reminders passed in and fires at most one `new Notification(...)` per unseen due occurrence, marking it delivered first. Interval cleared on unmount.
- Clicking a notification calls `window.focus()` where available. No service worker handling.
- Defensive throughout: `Notification.requestPermission()` and `new Notification(...)` are both wrapped in guarded try/catch, so unsupported, denied or restricted environments produce no console errors. If creating a notification throws, that occurrence is marked delivered and app-open delivery stops for the session, so the same reminder is never retried on every interval.
- The browser permission state stays the source of truth, re-read on each state resolution rather than trusted from local storage. If the preference is "on" but permission has since become denied outside the app, the UI shows the blocked state and no notification is attempted. If `window.Notification` becomes unavailable or restricted, the UI shows the unsupported state and nothing retries in a loop. The local preference only means: this app may attempt app-open reminder notifications on this device while browser permission is granted, and "Turn off" is worded to say exactly that, never that browser permission changed.


### UI: notification control inside `Gentle reminders`

A quiet row rendered below the card helper line and above the reminder list in `RemindersCard.tsx`, driven by props from `FirstYearToday.tsx`.

- Unsupported: "Notifications are not available in this browser." No button.
- Off: "Notifications are off on this device." Button "Turn on notifications".
- Requesting: calm "Turning notifications on…" with the button disabled.
- On: "Notifications are on for this device." Quiet "Turn off" text action, which clears the local preference only.
- Blocked: "Notifications are blocked in this browser." No button, no repeat requests.

Styling uses existing First Year constants only (`FY_FOCUS_RING`, pill button classes already in the card, HSL tokens). No hex, no new radius or shadow values, and the control stays quieter than the timer, reminders and Cindy cards.

## Tests

New `src/lib/firstYearReminderNotifications.test.ts` and `src/hooks/useReminderNotifications.test.tsx` with a mocked `window.Notification`:

- no permission request on render
- request only after the button click
- unsupported renders without a button
- denied renders without repeated requests
- granted enables delivery
- one notification per due active reminder
- no repeat for the same `id` and `due_at`, and a new `due_at` counts as new
- done and removed reminders never notify
- notification title and body contain no baby name, label, note or care detail

Where jsdom cannot assert real browser behaviour, the limitation is stated in the report.

## Not touched

Reminder schema, RLS, ownership trigger, care events, Cindy summary, Memories, First Year home, app shell and bottom nav, AI prompts and endpoint, storage, sitemap, public SEO routes, pregnancy chapter, setup flow. No service worker, push subscription, VAPID, edge function, cron, scheduler, email, SMS, new route or nav item.

## Verification

Signed-in `/my-first-year/today` at 390px and 1440px with the analytics banner dismissed: control placement, no load-time permission request, click-only request, unsupported, blocked and on states, one notification for a due reminder, duplicate prevention, done and removed reminders silent, generic notification content, logging and Cindy and reminder CRUD and bottom nav intact, sheet above the nav, no overflow, no console errors, visible focus rings, no hex, no banned words. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`.
