# F. Physical → digital product references

Looking for: QR activation, claim/ownership flows, companion apps for physical products, packaging-to-account experiences, elegant onboarding after scanning something physical. Evaluated against `docs/product/physical-product-activation-and-journal-owner-experience.md` (acquisition ≠ ownership ≠ entitlement ≠ journey; activation QR ≠ contextual QR).

## F1. LEGO Insiders (QR in the instructions / on the box)

- **Source:** LEGO newsroom ([link](https://www.lego.com/aboutus/news/2023/august/lego-insiders-launch)); Brick Fanatics guides ([link](https://www.brickfanatics.com/lego-insiders-everything-you-need-to-know), [earn points wherever you buy](https://www.brickfanatics.com/earn-lego-insiders-points-wherever-you-buy)); App Store listing ([link](https://apps.apple.com/app/id6740403375)).
- **Exact flow:** scan the unique QR in the instructions → landing page offering the Builder app or LEGO.com → sign in → the set is added to "My Collection" and awards points; **one set can be registered by one account once**; codes have been printed since 2018 so older sets can be claimed retroactively; launch-time reports of scans landing in the wrong app.
- **Works:** per-copy uniqueness, claim-once, retroactive claiming for older copies, and "collection" as the owner view are exactly TSOY's `product_instances` / `product_claims` model.
- **Does not work:** points gamification; the split landing page confused users at launch (two destinations).
- **Translates:** one activation URL with one job; the "claimed by another account" state; claims for journals bought before the digital product existed (TSOY already has copies in circulation).
- **Must not copy:** rewards mechanics; marketing-first landing.
- **Principles:** supports P1 (one page, one action).
- **Direction relevance:** A (activation surface).

## F2. Apple proximity setup cards (AirPods, HomePod, Apple Card)

- **Source:** 9to5Mac on HomePod setup ([link](https://9to5mac.com/2018/01/24/homepod-setup-process/)); iPhone in Canada on Apple Card activation ([link](https://www.iphoneincanada.ca/2019/03/28/apple-card-activation/)); AppleInsider on pairing tones ([link](https://appleinsider.com/articles/17/09/02/apple-homepod-uses-generated-tones-for-device-pairing-setup)).
- **Exact interaction:** a bottom sheet appears with a 3D render of the physical object and one question ("Set up?"); the phone then handles sign-in and the heavy steps; manual fallback (code read aloud / typed) when the automatic path fails.
- **Works:** **recognise the object first, ask one question, then do the work**; the product image on the card creates instant "this is mine" recognition; a graceful manual fallback.
- **Does not work:** needs hardware (NFC/BLE); Apple-only.
- **Translates:** the TSOY activation screen opens with an image of *the journal* and a single line ("Your journal continues here"), then sign in / create account, then the claim; the typed fallback code mirrors the Siri-dictated code.
- **Must not copy:** Apple's visual language.
- **Principles:** supports P1, P7 (a small ceremony).
- **Direction relevance:** A.

## F3. Nike Connect (NFC jerseys, 2017)

- **Source:** TechCrunch ([link](https://techcrunch.com/2017/09/15/nike-and-the-nba-unveil-connected-jerseys-and-theyre-super-cool)); SGB on how to use it ([link](https://sgbonline.com/how-to-use-nikes-connected-jerseys/)); Wareable ([link](https://www.wareable.com/sport/nike-connected-nba-jerseys-5092)). *Launch coverage; current status unverified.*
- **Exact flow:** tap the tag → the app launches → sign in with the account → content tied to that specific product unlocks, and re-tapping later unlocks fresh content.
- **Works:** the **re-tap for fresh context** idea is TSOY's contextual QR: scanning a week page later returns that week's digital page.
- **Does not work:** device-limited; content was promotional; the programme appears to have faded, which is a warning that physical-digital links need durable value, not novelty.
- **Translates:** contextual QR targets must resolve to durable, useful pages (the week, a checklist, a mood board) for years, since journals live on shelves.
- **Must not copy:** offers and promotions on tap.
- **Principles:** supports P8 (durable value).
- **Direction relevance:** A.

## F4. Rocketbook (symbol destinations) and Moleskine Smart Writing Set

- **Source:** Rocketbook "How it works" ([link](https://getrocketbook.com/pages/how-rocketbook-works)) and app guide ([link](https://getrocketbook.com/pages/how-to-use-the-rocketbook-app)); Moleskine reviews ([Tom's Guide](https://tomsguide.com/us/moleskine-smart-writing-set,review-3558.html), [We and the Color 2026](https://weandthecolor.com/the-moleskine-smart-writing-set-still-works-in-2026-heres-what-changed-my-mind/211281), [The Gadgeteer](https://the-gadgeteer.com/2020/03/30/moleskine-smart-writing-set-review/)).
- **Exact interaction:** Rocketbook pages carry **printed symbols** (not QR) that the user marks to route a scanned page to a destination; the app auto-captures when the page is framed. Moleskine's pen digitises in the background so "the notebook still feels like a notebook first".
- **Works:** both keep the **paper experience primary** and the digital quiet; auto-capture without button presses; the page itself tells the app where it belongs.
- **Does not work:** Moleskine reliability complaints (pen pairing, app reinstalls); Rocketbook's reusable-paper utility is unrelated to keepsakes.
- **Translates:** "capture a page" in the TSOY app: photograph the handwritten journal page and file it against the matching week automatically (the week number printed on the page is the destination cue); no hardware.
- **Must not copy:** proprietary pens or symbols.
- **Principles:** supports P8, P10 (quiet technology).
- **Direction relevance:** A (physical/digital bridge).

## F5. Papier (personalised stationery) and Artifact Uprising design studios

- **Source:** Maddyness on Papier ([link](https://www.maddyness.com/uk/entreprise/papier/)); reviews.co.uk (praise for products, "website difficult to navigate") ([link](https://reviews.co.uk/company-reviews/store/papier/4p6)); Artifact Uprising (see `journal-keepsake.md` B4).
- **Exact pattern:** a web studio where the customer personalises a physical product and the company prints it; marketplace breadth.
- **Works:** demonstrates the **digital → physical** return path (TSOY's future "print your year" or a second-child journal), and that premium stationery buyers accept a digital studio.
- **Does not work:** marketplace navigation complaints; product-grid commerce composition.
- **Translates:** a later keepsake-export bridge; commerce composition kept separate from guidance (C6).
- **Must not copy:** marketplace layout.
- **Direction relevance:** A/B, later gates.

## Category conclusion

The best activation experiences share one shape: **recognise the object, ask one thing, then quietly do the rest**, with a typed fallback and a durable owner view. LEGO supplies claim-once and retroactive-claim semantics; Apple supplies the ceremony; Rocketbook/Moleskine supply the "paper first, digital quiet" bridge. Nike Connect is the warning: links must carry lasting value, not promotions.
