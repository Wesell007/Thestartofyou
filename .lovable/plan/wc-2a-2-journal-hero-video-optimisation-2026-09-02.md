# WC-2A.2 — Journal Hero Video Optimisation

Scope: the Journal route hero video only. No new footage, no redesign, no copy/crop/layout change.

## Verified current state

- `src/assets/video/journal-hero.mp4`: 36,508,225 bytes, 1920x1080, 15.048s, ~29.97fps, H.264 video at ~19.08 Mbit/s plus an AAC audio track at ~317 kbit/s (~19.41 Mbit/s container total).
- Only consumer is `src/components/product/ProductHero.tsx` (route `/journal`). The element is `autoPlay loop muted playsInline preload="metadata"`, no `controls`, poster `journal-cover-hand.jpg`, wrapped in a fixed `aspect-[16/10] md:aspect-[21/9]` rounded container with `object-cover`.
- No unmute pathway and no control surface exist anywhere in the component, so audio is never audible and nothing depends on the audio track. Confirmation of this is re-checked before editing; if any unmute path is found, work stops and reports.
- Same file is served to desktop and mobile; it is visible immediately at first paint on both.

## What will be done

### 1. Encoding candidates (from the existing file only)

Generate temporary candidates in `/tmp` with ffmpeg, same duration, crop, speed, grade, and 1920x1080:

- ~2.5 Mbit/s, ~3.5 Mbit/s, ~4.5 Mbit/s H.264 (two-pass or CRF-with-cap), `-profile:v high -level 4.0 -pix_fmt yuv420p -movflags +faststart`, audio stripped (`-an`) once the mute finding is confirmed.

For each candidate report dimensions, codec, bitrate, exact bytes, percentage reduction, artefacts, and compatibility. Selection rule: lowest weight that still looks premium on desktop, high-DPI desktop, and mobile — inspected via extracted frames at first scene, a motion-heavy scene, skin tones, gradients/shadows, fine journal detail, and the final scene, compared against the original. If 1080p at the lower bitrates degrades visibly, step up a tier rather than shipping a soft hero. The chosen encode replaces `src/assets/video/journal-hero.mp4` in place (same path, same filename), so no import changes are needed.

**Candidates already produced in `/tmp` (read-only work, project untouched):** all 1920x1080 H.264 High@4.0, yuv420p, faststart, audio stripped, same 15.05s footage.

| Target | Bytes | Actual bitrate | Reduction | Y-PSNR avg / min vs original |
| --- | --- | --- | --- | --- |
| 2.5 Mbit/s | 4,165,692 | 2.21 Mbit/s | -88.6% | 42.09 / 38.92 |
| 3.5 Mbit/s | 5,981,381 | 3.18 Mbit/s | -83.6% | 43.50 / 41.13 |
| 4.5 Mbit/s | 7,784,039 | 4.13 Mbit/s | -78.7% | 44.34 / 42.50 |

Frame comparisons (first scene, motion-heavy scene, skin tones, embossed journal lettering, final scene) show no visible artefacts on any tier at display size; the 2.5 tier's worst-case motion frame drops to 38.9 dB, so the intended selection is the **3.5 Mbit/s encode (5,981,381 bytes, -83.6%)** — the lowest weight that keeps a comfortable quality floor on motion for a premium hero. Final confirmation happens against the in-page rendering during implementation.


### 2. Poster-first loading in ProductHero

Presentation-only change inside `ProductHero.tsx`:

- The `<video>` renders with the poster and **no** `src`/`<source>` and no `autoPlay` until activated. Container, aspect ratios, rounded corners, gradient overlay, and floating spec card stay byte-identical, so layout is reserved exactly as today and there is no CLS.
- Activation requires **two** conditions, both true, before the source is attached (never during initial React render, and never on the first observer callback alone):
  1. **Critical-load gate.** After mount, wait for the window `load` event (or fire immediately if already loaded), then `requestIdleCallback(cb, { timeout: 2000 })` with a `setTimeout(cb, 1200)` fallback where `requestIdleCallback` is unavailable (Safari). This lets the poster, fonts, and critical route content take network priority first.
  2. **Visibility gate.** A local `useEffect` + `IntersectionObserver` on the hero container with `threshold: 0.01`, `rootMargin: "200px 0px"`, so the video is never fetched on a route or scroll position where the hero is not present/near.
- Only when both gates have opened does state flip to `active`: the source is attached and playback starts `muted loop playsInline`, with a `play()` promise catch that leaves the poster in place if the browser refuses autoplay. Observer disconnects after activation. No polling, no scheduler abstraction, no shared utility, no arbitrary long delay.
- Reduced motion: read `window.matchMedia("(prefers-reduced-motion: reduce)")` (same pattern as `NewHeroSection`). When reduce is set, neither gate is armed, the source is never attached, no request occurs (proved by network capture), and the poster stays as a static hero.


### 3. Verification

- Production preview (`npm run build` + preview server) with Playwright network capture on `/journal`, before and after: video request presence, transferred bytes at initial load, whether the request starts before activation, and total route transferred bytes. Then scroll to trigger activation and record what downloads. No zero-byte claim without network evidence.
- Playback checks after activation: autoplay, muted, loop, playsInline, poster→video transition without a blank flash, no layout shift, navigation away/back behaves, reduced-motion stays poster-only, clean console.
- Desktop and mobile viewports measured separately. No separate mobile encode is created in this slice unless the mobile measurement proves it necessary.

### 4. Guardrails

`src/assets/logo-dark.png` (400x267, 19,165 bytes) and all WC-2A.1 `fetchPriority` additions stay untouched. No hero JPG re-encoding, no srcset/sizes, no imagetools, no asset deletions, no route/SEO/sitemap/robots change, no companion/AI/grounding change (`AI_SOURCE_ROUTING_VERSION` stays `30B-source-routing-v1`, grounding candidates/approvals remain 0, `src/lib/grounding/*` and `docs/ai/grounding-approvals/*` untouched).

Then run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, leaving the known pre-existing `previewAuthStorage.ts` lint error and react-refresh warnings as they are, and return the 27-point WC-2A.2 completion report. WC-2A.3 is not started.

## Files changed

- `src/assets/video/journal-hero.mp4` (re-encoded in place)
- `src/components/product/ProductHero.tsx` (poster-first activation, reduced-motion guard)
