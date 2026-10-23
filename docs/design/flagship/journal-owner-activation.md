# 4. Journal-owner activation: "Your journal continues here"

Prototype: `prototype-source/activation.html` (four sheets, thirteen states) · captures `review/activation-*.jpg`. The code is synthetic. No activation system exists yet; this is the future TSOY touchpoint designed from the new system (never from the legacy packaging). Product requirements: `docs/product/physical-product-activation-and-journal-owner-experience.md`.

## The emotional sequence

recognition → reassurance → one clear action → quiet completion. Four screens at most for a happy path; never an enterprise setup wizard.

## Sheet 1: recognition (initial scan · code recognised · not signed in)

Blush chapter ground with the real cover artwork's branches masked softly into the top-left corner (Rule 2: welcome state). Left: the real printed cover in a paper frame (420 px). Right: label "Your journal"; headline in the signature colour "Your journal continues here."; a deck that says what the code is and what claiming does; **one primary action** "Continue"; a quiet "Enter the code by hand instead"; a meta line "Code recognised · TSOY-····-····-K7Q · Not claimed yet · Nothing happens until you confirm." Mobile: cover first at 260 px, then the text and a full-width primary button.

## Sheet 2: account (create account · existing account · gifted journal)

"Who is this journal for?" with the deck "The code belongs to whoever uses the journal, not to whoever bought it." Two panels: *I'm new here* (email, first name, sign-in link, privacy line) and *I already have an account* (email, sign-in link), plus *Given as a gift?* (create your own account; the giver can check the code without claiming). Step indicator in the masthead as plain text ("Step 1 of 2").

## Sheet 3: claim and connect (code recognised · claim confirmation · connect journal to pregnancy)

"Add this journal to your account?" with "One copy, one account." A radio list: *Your current pregnancy* (due date, week; the week page will match the journal's Week Twelve), *A pregnancy I'll add now*, *Not now*. Primary "Claim my journal"; quiet "Not this journal". Right panel: **What claiming does / does not do** (records ownership, shows the owner band, lets the Companion mention the journal; never reads the journal, never shares, never changes guidance; disconnect any time).

## Sheet 4: outcomes (claimed successfully · already claimed · invalid code · typed fallback · support route)

- **It's yours** (quiet completion): spaced-caps title, dotted rule, one sentence, primary "Open this week's page", quiet "Keep the card somewhere safe", and the real photo of the printed journal with the caption "Connected".
- **This code is already in use** (sentence-case heading, not shouting): what happened, a promise never to move a journal without checking with both parties, "Ask us to help" and "Try a different code"; a meta note of what support will ask (nothing from inside the journal).
- **We couldn't recognise that code** with the **typed fallback**: three four-character groups after a fixed TSOY prefix, a plain validation message under the field ("The third group is one character short"), "Check the code" and "Scan the card instead"; the support route "Send us a photo of the card".

## Typography and spacing

Ceremony headline display serif 48/32 in signature-ink; sheet titles display-2 spaced caps 30/24 (positive states) or sentence-case display 34 (problem states); panel heads brown small caps; copy UI sans 16–17; fields 44 px; code inputs 92 px wide, letter-spaced; generous 96/48 px vertical padding on the ceremony.

## Interaction notes

- Activation URL: on a phone with the app installed, the same URL deep-links into the app; otherwise the web ceremony.
- Recognition happens before sign-in so the first thing seen is the journal, not a form; nothing is claimed until the explicit "Claim my journal".
- Typed fallback accepts lower case, ignores spaces and hyphens, and validates per group with a specific message; O/0 confusion is designed out of the code alphabet.
- Gift path never requires the buyer; "check without claiming" verifies the code's validity only.

## Accessibility notes

Primary buttons 44 px with paper-on-signature text (≈ 5.4:1); radio rows are full-width labels; code inputs have individual accessible names; validation text is adjacent and not colour-only; the cover image carries descriptive alt text while the corner art is decorative (`aria-hidden`); headings in order per sheet; focus visible throughout.

## Journal-derived

The cover composition (centred statement, botanicals at the edges, cream-blush ground), the real cover as the recognition object, the dotted rule, the quiet two-word completion title.

## Digital adaptations

Code recognition before sign-in; one-copy-one-account semantics with retroactive claims (LEGO reference); recognise-then-ask (Apple proximity reference); typed fallback and support route; connect-to-journey choice; the explicit what-claiming-does panel.

## Deliberately absent

A progress bar wizard; marketing or upsell; Amazon or order lookups; asking who bought it; confetti; QR-scanning illustration; any legacy maker branding; collecting anything beyond email and a first name.
