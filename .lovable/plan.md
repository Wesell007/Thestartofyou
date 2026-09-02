# WC-2A.3-i — Final Verification Gate (verification only)

No assets are re-encoded or replaced. No routing changes. WC-2A.3-ii is not started.
Approve this to switch me into build mode so I can run the production build, serve it, and measure.

## 1. Production-preview baseline

- `npm run build`, then serve `dist/` with the project's preview server (`npm run preview`, Vite preview) on a fixed port.
- Measure with Playwright/Chromium against the production preview at desktop 1280x1800 and mobile 390x844 for:
  `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/journal`, `/pregnancy`.
- Per route and viewport: LCP element, LCP resource + bytes, total image bytes during measurement, indicative LCP timing.
- Confirm optimised bytes are actually served, content-type is `image/jpeg`, no decode errors, no 404/asset regression, LCP element unchanged for implementation reasons.
- Production-preview timings are reported as a new post-WC-2A.3-i baseline, not compared against the earlier dev-server numbers. No Lighthouse scores.

## 2. Trimester route resolution

`/trimester/second` was never a real route; the real routes registered in `src/App.tsx` are
`/pregnancy/first-trimester`, `/pregnancy/second-trimester`, `/pregnancy/third-trimester`.

Confirmed consumers (source evidence):

- `trimester-first.jpg` — `FirstTriEditorialImage`, `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTrimesterCards`, `PregnancyTimeline`, `PregnancyTopicPage`
- `trimester-second.jpg` — `SecondTriEditorialImage`, `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTrimesterCards`, `PregnancyTimeline`, `PregnancyTopicPage`
- `trimester-third.jpg` — `ThirdTriEditorialImage`, `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTrimesterCards`, `PregnancyTimeline`, `PregnancyTopicPage`

Verification step: trace which of those components actually mount on the live trimester pages and on `/pregnancy`, then screenshot the three trimester routes plus `/pregnancy` at both viewports and check render, framing, crop, layout/dimensions, sharpness, gradients, skin/detail, and decode. Any component that is imported but never mounted on a reachable route is reported honestly as unreachable, with no routing change made.

## 3. Frozen state to confirm

- 28-image batch totals 5,513,604 bytes, unchanged.
- WC-2A.1: `logo-dark.png` 400x267, 19,165 bytes.
- WC-2A.2: `journal-hero.mp4` 5,981,381 bytes, ProductHero poster-first logic untouched.
- `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.
- WC-2A.3-ii remains exactly 12 Journal photographs.

## 4. Output

The 20-point final verification report, ending with a CLOSE / DO-NOT-CLOSE verdict. Then stop.
