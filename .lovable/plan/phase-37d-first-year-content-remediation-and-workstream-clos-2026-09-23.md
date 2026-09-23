# Phase 37D — First Year content remediation and workstream closure

Implements only the reconciled 37C P1/P2 remediation. No redesign, no AI, grounding, database, lifecycle, TTC or Pregnancy changes. No deployment. Phase 37C documents and numbers are not edited; 37C stays the historical pre-remediation audit and 37D records the post-remediation state separately.

Safeguards confirmed: new heroes come from the approved asset library first and otherwise from Nano Banana inside Lovable, never generic or duplicate imagery; the existing 26 heroes stay locked. "Published" means a complete ready repository record that resolves through the existing article architecture and passes every gate, not a deployment. Each P1/P2 finding is accounted for individually even where one article resolves several intents. No scope expansion beyond the items below.

Grounding safeguard: the two new slugs are not added to grounding eligibility, candidates, approved sources or AI source routing. The existing article-grounding registry and drift-guard tests are checked first; only if repository governance requires every public article slug to carry a record is the minimum default-deny record added, using the established pattern with candidate, approved and eligible all false and no approval, reviewer, review-date or justification metadata. If no record is required, no grounding file is touched. Runtime behaviour and `AI_SOURCE_ROUTING_VERSION` stay unchanged, and this is reported as registry maintenance, not grounding enablement.

Topic ownership uses the exact existing enum values in the repository (no new topic identifiers invented from labels), and both new records use the same ready/live conventions as equivalent First Year articles, with a consistent inventory record created at the same time so no new staleness is introduced.

## Scope confirmed against the repository

- The 26 First Year articles live in `src/data/firstYearArticleData.ts` as typed records; adding two records creates two new pages through the existing dynamic route, so no route definitions change.
- Hero images are wired in `src/components/firstyear/article/firstYearArticleImages.ts` by slug; two new entries are needed and the existing 26 stay untouched.
- The legacy milestones article in `src/data/articleData.ts` does carry a defensible distinct intent already present in its own copy: milestone anxiety, comparison and "when to relax" reassurance, rather than the broad developmental overview. That supports the approved REPOSITION + internal link rather than a blocker.
- `src/data/articleInventory.ts` has fixed enums; the staleness fix uses `currentStatus: "live"`, `contentState: "final"`, `recommendedAction: "keep"` — the values already used for equivalent ready records. No new vocabulary.

## What gets built

**1. NC-1 — Breastfeeding problems and where to get help** (Baby, feeding topic). Owns P1-1, P1-3, P2-13: nipple and breast pain, latch difficulty, mastitis concerns, tongue-tie where appropriate, and where to get real support. Escalation-led, not a handbook, not a diagnostic tool, clearly distinct from the general feeding overview.

**2. NC-2 — Postpartum recovery in the later first year** (Postpartum, postpartum-recovery topic). Owns P2-11 and P2-12: recovery that continues past six weeks, pelvic floor and continence, fatigue, body changes, cycle return, persistent symptoms and when they deserve support. No rigid timetable, no overlap with the earlier healing articles.

Both articles use verified current UK guidance for every material claim, with real source records. No invented sources, reviewer names, review dates or review claims; reviewer display stays provenance-gated. Any claim that cannot be supported is narrowed or dropped, or recorded as a genuine blocker.

**3. Six expansions** (additive, voice and structure preserved, heroes untouched):
- `bottle-and-breastfeeding-questions` — feeding worries plus a contextual handoff to NC-1 (P2-1)
- `baby-development-in-the-first-year` — language, early sounds and babble (P2-5)
- `introducing-solid-foods` — family meals and self-feeding progression (P2-4)
- `healing-after-birth` — caesarean recovery (P2-7)
- `body-changes-after-birth` — early and ongoing pelvic floor, continence, return of periods (P2-8, P2-9, P2-10)
- `when-to-ask-for-help-after-birth` — intrusive thoughts, written with the existing safety and escalation pattern (P1-2)

**4. Discovery pass** for the four weak-discovery records (teething, colic and evening crying, newborn quirks and reflexes, newborn skin spots and marks): contextual inbound placement on the semantically right phase, month, topic and related-guidance surfaces. No rewrites, no link stuffing, no visual change.

**5. Handoffs** — a short editorial transition passage on the existing 9–12 month phase experience pointing into Toddler (P2), and minimal contextual First Year → Family links inside the same link pass. No new routes, stages or lifecycle logic.

**6. Milestone canonical decision** — keep the legacy route, narrow its editorial role to the milestone-anxiety and comparison intent already in its content, make `baby-development-in-the-first-year` clearly authoritative, add a contextual link to it, and record the resolved supporting role in inventory metadata. No delete, merge, redirect, noindex or route change.

**7. Inventory staleness fix** for `when-to-ask-for-help-after-birth`, plus a consistency sweep across the First Year inventory with any other stale rows reported, not silently changed.

**8. Heroes for NC-1 and NC-2 only** — one article-specific hero each, reusing an existing strong asset if one genuinely fits, otherwise newly generated. No fallback, no suppression, no duplication, no new body images.

## Discovery placement

NC-1: Baby pathway, feeding topic, early phase and month guidance, and the general feeding article, with at least one high-salience path because it resolves P1 needs. NC-2: Postpartum pathway, physical recovery topic, the 6–9 and 9–12 month phases, and the two earlier recovery articles. Semantically relevant placement only.

## Verification

Targeted closure re-audit of the closure-level findings only (P1 3, P2 13, AI-only 2, expansions 6, link records 4, handoffs, milestone, inventory), route and sitemap accounting measured from the build, source and claim gate on all new and changed content, responsive checks at 1280 / 834 / 390 on both new pages and every changed discovery surface.

New and updated focused tests covering final record count and ownership, both new routes, hero mappings, no generic fallback, P1 discovery, weak-discovery remediation, both handoffs, the milestone relationship, the inventory status fix, internal-link validity, sitemap uniqueness, grounding unchanged and reviewer claims still provenance-gated. Then locked First Year regressions, full suite, typecheck twice, lint against the established baseline of 11 problems, and a production validation build. Any flake reported as FIRST RUN and RERUN.

## Documentation

New `docs/content/phase37d-first-year-remediation.md` (finding → treatment → location → source evidence → validation) and `docs/content/phase37d-first-year-closure.md` (final measured state). `roadmap.md` gets a Phase 37D record appended; earlier phase records are not rewritten.

## Closure

Closes as CLOSED PASS only if every closure gate passes; otherwise returns BLOCKED with the exact unresolved gate. No further phase is started.
