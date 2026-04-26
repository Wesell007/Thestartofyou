## Goal

Define a reusable **Pregnancy Topic Landing** template that sits between `/pregnancy` and individual articles. Calm, editorial, premium — not a blog category page, not a publisher portal. One template, six future routes:

- `/pregnancy/body`
- `/pregnancy/baby`
- `/pregnancy/feelings`
- `/pregnancy/health-and-safety`
- `/pregnancy/diet-and-exercise`
- `/pregnancy/preparing-for-baby`

This plan covers structure only. Implementation comes in a later pass once approved.

## Design principles

- **One topic, one quiet page.** No carousels, no "trending", no read-times, no thumbnails on tiles, no chips, no dates, no author bylines, no tag clouds.
- **Editorial over portal.** Long vertical rhythm, generous whitespace, serif headings, sans support copy — same language as `/pregnancy` and existing hubs.
- **Honest density.** Sections only appear if they have real content. Thin topics show fewer sections rather than padding with filler.
- **Stage-coloured accents only.** Reuse `--stage-pregnancy-accent` for the same hairline / label / arrow treatment used in `PregnancyTopicMap`. No new palette.
- **Always a way back.** Every page connects up to `/pregnancy`, across to sibling topics, and down to articles + week-by-week.

## Page structure (top → bottom)

```text
1. Topic Hero                  (required)
2. What this topic covers      (required)
3. Start here                  (required)
4. Subtopic groups             (required)
5. Week-by-week bridge         (optional)
6. Sibling topics              (include when sibling routes exist or can be safely stubbed)
7. AI reassurance / Ask        (optional)
8. Quiet footer link           (required)
```

### 1. Topic Hero

- Small uppercase eyebrow: `The Pregnancy Map · Your body` (stage accent, same treatment as existing eyebrows).
- Serif H1, single line where possible: e.g. *Your body in pregnancy*.
- One short editorial intro paragraph (≤ 2 sentences, sans-serif, muted).
- No primary CTA buttons.
- No image, illustration, or video. Hero is typographic and restrained.
- Optional `BotanicalCorner` if the rhythm allows.

### 2. What this topic covers

- One short paragraph plus a quiet bullet list of 3–5 plain-language statements.
- Orientation only — no links inside this block.
- Purpose: reassures the user they're in the right place before any decision point.

### 3. Start here (1–3 anchor articles)

- Maximum three. Often one or two.
- Editorial list, not cards. Each row:
  - serif title link (article title, exact)
  - one-line italic support sentence explaining why it is the entry point
  - hairline divider above each row (same `accent / 0.1` border as topic map)
- Reads like a confident editorial shortlist, not a featured-content promo row.

### 4. Subtopic groups

Core of the page. Vertical stack of grouped link clusters.

Each group:

```text
GROUP LABEL              (eyebrow, stage accent, uppercase, tracked)
Optional one-line note   (serif, muted — only when truly needed)
  → Subtopic link 1
  → Subtopic link 2
  → Subtopic link 3
```

Rules:

- 2–5 groups per page.
- 3–7 links per group. Below 3 → fold into a sibling group. Above 7 → split.
- Visible labels stay **verbatim** from the locked pregnancy topic-map set.
- Destinations follow the `PregnancyTopicMap` policy: exact article > closest article substitute > `/guidance?topic=...` bridge.
- Same chevron + hairline treatment as the topic map. No thumbnails, excerpts, or metadata.

Layout:

- Two columns on `lg`, single column below.
- Asymmetry is allowed; do not force a rigid balanced grid. Groups flow based on link counts.

### 5. Week-by-week bridge (optional)

Only where week context genuinely helps (e.g. Your body, Your baby, possibly Health & safety).

- One short serif line (e.g. *"This often shifts week by week."*).
- One quiet accent link → `/pregnancy#week-by-week` or relevant trimester page.
- No duplicated timeline component, no mini week-picker.

### 6. Sibling topics

Quiet lateral navigation to the other pregnancy topic pages. Text links only — no cards, no descriptions, no chevrons stacked into tile shapes. A simple wrapping row of 5 labels with the standard accent chevron treatment.

### 7. AI reassurance / Ask (optional)

Reuse the existing hub AI pattern only where topic depth is strong enough to support a useful answer. Design space for it here; no implementation assumptions in this pass.

### 8. Quiet footer link

Single underlined sage link, centred, mirroring `/pregnancy`'s footer:

> ← Back to the Pregnancy Map

No second CTA. No newsletter. No related-topics block (siblings already covered in section 6).

## How it connects to the rest of the site

- **Up:** eyebrow + footer link → `/pregnancy`. Navbar handles global up-traversal.
- **Across:** sibling topics row → other `/pregnancy/*` pages.
- **Down:** start-here rows and subtopic links → individual `/articles/*` pages, with `/guidance?topic=...` bridges where articles do not yet exist.
- **Week context:** optional bridge → `/pregnancy#week-by-week` and trimester pages.
- **AI:** optional topic-aware ask flow, scoped to the topic slug.

When articles are later built, their footer "Related" block should link back up to the topic page — closing the Up/Down/Across loop already used in guidance articles.

## Reusable component shape

A single template component, e.g. `PregnancyTopicPage`, driven by typed config:

```ts
interface PregnancyTopicPageConfig {
  slug:
    | "body"
    | "baby"
    | "feelings"
    | "health-and-safety"
    | "diet-and-exercise"
    | "preparing-for-baby";
  eyebrow: string;            // "Your body"
  title: string;              // "Your body in pregnancy"
  intro: string;              // 1–2 sentence editorial line

  whatThisCovers: {
    lead: string;
    bullets: string[];        // 3–5
  };

  startHere: {                // 1–3
    title: string;
    href: string;
    why: string;
  }[];

  groups: {                   // 2–5
    label: string;
    description?: string;
    links: { label: string; href: string }[];   // 3–7
  }[];

  weekBridge?: {
    line: string;
    href: string;
    label: string;
  };

  showSiblings?: boolean;     // defaults true
  showAI?: boolean;
  aiPrompts?: string[];       // 3 suggestion chips when AI shown
}
```

Per-topic config lives alongside `stageData.ts` (e.g. `src/data/pregnancyTopicData.ts`). The template renders any optional section only when its config is present and non-empty — enforcing the honest-density principle.

This shape also means the bridge URLs currently used in `PregnancyTopicMap` (`/guidance?topic=...`) can later be swapped to the real `/pregnancy/<topic>` routes in one place, without redesigning anything.

## What to borrow from What to Expect

- Clear topic taxonomy (already locked in our label set).
- Grouped link clusters as the primary navigation pattern.
- "Start here" anchor articles per topic.
- Lateral sibling-topic navigation.

## What to leave behind

- Thumbnails, dates, read-times, bylines.
- Trending / most popular / editor's picks blocks.
- Ad-like density and inline newsletter inserts.
- Tag clouds and faceted filters.
- Quiz, poll, and community widgets.
- Heavy SEO preamble paragraphs above the fold.
- Dense breadcrumb trails (eyebrow + footer link replace these).

## Design cautions

- Default to no group description; add only when the label genuinely needs disambiguation.
- Two-column groups on `lg` must not collapse into a forced 2×N grid — let groups flow asymmetrically based on link counts.
- Resist a "Featured article" hero card. The Start Here list does this job without visual weight.
- The AI section is opt-in per topic; on a thin topic, omit it rather than show a half-empty answer surface.

## Out of scope

- Implementation.
- Final per-topic copy (intro lines, "what this covers" bullets, start-here picks).
- Routing wiring in `App.tsx`.
- Updating `PregnancyTopicMap` bridge URLs to point at the new routes.