# 1. Article: the Editorial Keepsake baseline

Prototype: `prototype-source/article.html` · captures `review/article-desktop.jpg`, `review/article-mobile.jpg`. Copy: the real article *Nausea in early pregnancy* (`src/data/articleData.ts`), reviewer Jenny Joines.

## Desktop concept (1440)

Masthead (72 px, hairline below): spaced-capital wordmark, six journey links, Companion and Sign in as text links; the current journey underlined by a 1 px rule. Below, a centred 1040 px editorial column. The header stack is: journey label (brown small caps, linked), sentence-case display headline (48 px, max 22ch), the dotted title rule, a reading-serif deck (the article's own quick answer), then a hairline meta row: reviewed by, updated, read time, "Guidance, not diagnosis". The body runs in a 66ch reading-serif column beside a 260 px sticky aside (In this guide, Related weeks set in the display serif, Keep this week). One full-column photograph with a caption. Section heads in spaced display capitals; sub-heads in the UI sans semibold. A two-column "Usually normal / Worth a check" list on hairlines, followed by the graded notice (soon tier: "Contact your midwife or GP today"). Then the provenance block, the Companion entry (ask line, voice control, two suggested questions in prompt voice) and a ruled list of related guidance.

## Mobile concept (390)

Single column, 20 px gutters. Masthead collapses to wordmark + Menu. Headline 32 px over two or three lines; deck 19 px; body 17 px. Meta wraps onto two lines. The aside moves below the body (contents, related weeks, keep this week). Normal/Worth-a-check stack vertically; the notice spans the column; related rows stack title over description.

## Hierarchy and typography roles

| Role | Face | Size d/m | Notes |
|---|---|---|---|
| Journey label | UI sans 600, brown, tracked caps | 12/12 | the only tracked-caps label above the headline |
| Headline | display serif 400, sentence case | 48/32 | a deliberate adaptation: long editorial titles use sentence case; spaced capitals are kept for short titles, section heads and the wordmark |
| Deck | reading serif | 21/19 | ink-soft |
| Body | reading serif | 19/17 | line-height 1.6, 66ch |
| Section head | display serif 400, spaced caps | 22/19 | |
| Sub-head | UI sans 600 | 17 | |
| Meta, captions, provenance | UI sans | 14–15 | |

## Spacing

8 px base. Header padding 48/32; section heads 2.4em above, 0.8em below; figures 2.2em; notice and provenance separated by hairlines rather than boxes; related section 64 px above, 96 px below; footer 36/48.

## Interaction notes

- Contents links scroll to anchored sections; related weeks are display-serif numerals.
- The notice is static content, never a toast.
- Companion entry: pressing Ask opens the Companion with the question and the article as context; Voice is a secondary control, never the visual centre.
- Suggested questions are links, not chips.

## Accessibility notes

- Contrast (approximate, to be verified with a tool at implementation): ink #1F1E1C on paper ≈ 15:1; ink-soft #5B5955 on paper ≈ 6.3:1; brown labels #896142 ≈ 5.1:1; signature-ink links #52696E ≈ 5.4:1; soon-tier notice text #7A4A2E ≈ 7:1. The journal's light dusty blue #96ACB1 is used only for the dotted rule and ornament because it fails text contrast.
- Body never below 17 px on mobile; measure ≤ 66ch; headings in order h1 → h2 → h3; skip link; visible focus ring (2 px signature-ink, 3 px offset); ≥ 44 px targets for Ask, Voice and the menu button; reduced-motion honoured (no motion on this page).
- The urgency notice carries wording and a bordered band, never colour alone; the "now" tier adds a bordered "!" mark.

## Journal-derived patterns

The dotted title rule; spaced-capital section heads; one quiet palette (paper, blush-free here); hairline structure; the two-column "normal / worth a check" echoing the journal's paired columns; prompt-voice follow-ups ending in "…".

## Digital adaptations

Sentence-case headline for long titles; the graded urgency semantics (NHS pattern, TSOY language); provenance block (states truthfully that this article's structured source list is not yet published; lists the NHS page TSOY routes symptom questions to); the Companion entry line; sticky aside.

## Deliberately absent

Cards and card grids; shadows; gradients; pills (the "size of" pill belongs to My Week); hero image behind text; illustration of any kind (Rule 2); eyebrow labels on every block; badges and "reviewed" seals; share bars; related-article cards with thumbnails; autoplaying anything.
