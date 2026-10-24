# Actual TSOY logo: evidence note (Step 3B)

**Supplied file:** `Start of you dark logo.png`. The founder's upload landed in `C:\Users\Administrator\Downloads\CUsersAdministrator.tsoy-designjournal-auditraw\` (the flattened folder name the browser produced; created 24 October 2026 06:56). It was copied unchanged to the intended location `C:\Users\Administrator\.tsoy-design\journal-audit\raw\Start of you dark logo.png`; the original was not moved or modified. The raw folder also holds `cover.jpg` and `journal.pdf` from the Step 1 audit; no other logo files exist there, so there was no choice to make between variants.

| Property | Value |
|---|---|
| Format | PNG |
| Mode | RGBA (8-bit per channel) |
| Dimensions | 1536 × 1024 px |
| Transparency | yes; 95.4 % of pixels fully transparent, 4.1 % fully opaque, a thin anti-aliased edge between |
| Artwork bounding box (alpha > 8) | x 350 to 1071, y 320 to 624, i.e. 721 × 304 px of artwork centred in a transparent canvas |
| Colours | wordmark "The Start of You" in a warm grey ≈ #968F81; open-book mark in cream (#EEEDE3 range) with a sage leaf and warm-grey outline |
| SHA-256 | `d17a5535a6a6583a7b435ca81e2475c2395f9f6c0fe2c43f2326daf3e1c53860` |
| Relationship to the repository | byte-identical to the already tracked `src/assets/logo.png`; `src/assets/logo-dark.png` (400 × 267) is the same artwork at a small size and is what the current Navbar and Footer import |

**Suitability for light / warm-paper backgrounds:** this is the dark-on-light variant (warm-grey lettering on transparency), so it is the correct file for paper, blush and the light area of the hero scrim. Measured contrast of the wordmark against paper `#F8F7F3` is 2.99:1 and against blush `#FCF1E8` 2.89:1. A logotype is exempt from WCAG text contrast, and nothing in the artwork may be altered, so the prototypes place it only on the lightest grounds (masthead on paper; over the hero inside the 94 % paper fade) at a size where the lettering stays legible (56 px tall on desktop, 44 px on mobile, 46 px in the app bar).

**How it is used in the prototypes:** as an `<img>` layer (`assets/logo-tsoy-trimmed.png` in the design folder, outside Git) in every 3B header and app bar, with `alt="The Start of You"`. The prototype copy is a crop of the fully transparent margin only (the 721 × 304 artwork box); no scaling distortion, no recolouring, no redraw, no AI reproduction, never composited into the generated film. The untouched 1536 × 1024 file is also kept alongside as `assets/logo-tsoy-original.png` for reference. Because the supplied artwork is already tracked as `src/assets/logo.png`, no logo binary is added to Git by this round; production will import that asset.

Finding for the founder: the lettering contrast (about 3:1) is low for very small renderings; a slightly darker production variant of the wordmark, supplied by the brand owner rather than created here, would help legibility at app-bar sizes.
