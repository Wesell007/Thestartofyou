## Phase 7.7 — First Year Checkups and Warning Signs Publishing

Publish the two remaining draft articles under `/first-year/checkups-and-warning-signs` by replacing their draft objects in `src/data/firstYearArticleData.ts` with full ready articles. No other files change.

### File edited

- `src/data/firstYearArticleData.ts` (lines 1298–1317)

Kept fields (unchanged): `slug`, `topic`, `title`, `description`. `readTime` stays `5 min read` for both (final length fits comfortably; no bump needed).

### Standard applied to both articles

- `status: "ready"`
- `medicallyReviewed: true`
- `reviewedBy: "Jenny Joines"`
- `lastUpdated: "July 2026"`
- `seoTitle`, `seoDescription`
- `intro` (calm, one paragraph)
- 7 `sections`, each with 2 short paragraphs
- 5–6 `keyTakeaways`
- 3 `relatedSlugs` (all confirmed `ready` in the file)
- 3–5 verified UK `sources` (real public URLs only)
- British English, no em dashes, no shame wording, no invented stats/authors, no diagnosis/treatment/medication/emergency thresholds

### Article 1 — `postnatal-checks-and-appointments`

Angle: a calm map of what early appointments are for and how to use them without needing everything figured out.

Sections:
1. Why postnatal checks exist
2. Early midwife contact after birth
3. Health visitor support
4. The GP postnatal check
5. Baby checks and routine reviews
6. What you can ask about
7. Keeping simple notes between appointments

Careful wording included once: "Appointment timing and support can vary by area, so it is always okay to ask your midwife, health visitor, GP or local service what applies to you."

Related slugs: `when-to-ask-for-help-after-birth`, `healing-after-birth`, `what-recovery-can-feel-like`.

Planned sources (verified UK, real URLs):
- NHS — Your post-pregnancy body / postnatal checks
- NHS Start for Life — Support after birth
- NHS — Health visitor services
- NHS — Newborn physical examination / 6-8 week baby check

### Article 2 — `when-to-ask-for-help-after-birth`

Angle: asking for help is part of recovery. Notice when something feels off physically, emotionally or practically, and know who to contact.

Sections:
1. Asking for help is part of recovery
2. Physical recovery worries
3. Feeding worries
4. Baby behaviour and illness worries
5. Emotional wellbeing worries
6. Practical support and exhaustion
7. What to say when you contact someone

Careful wording included once: "If bleeding, pain, mood, temperature, feeding, your baby's behaviour or anything else worries you, ask your midwife, health visitor, GP or the appropriate local service for advice."

Also included, brief and careful: if someone feels unable to keep themselves or their baby safe, they should seek urgent local help immediately.

Related slugs: `postnatal-checks-and-appointments`, `feeling-like-yourself-again`, `newborn-feeding-rhythms`.

Planned sources (verified UK, real URLs):
- NHS — Your post-pregnancy body
- NHS Start for Life — Support after birth
- NHS — Feeling depressed after childbirth
- Tommy's — Postnatal wellbeing / after birth
- NCT — Postnatal support

Source URLs will be verified via `curl` before publishing; any that 404 will be dropped (staying within the 3–5 range) and flagged in the return summary rather than substituted with invented links.

### Guardrails

- Only `src/data/firstYearArticleData.ts` is touched.
- No components, routes, cards, topic pages, SEO wiring, images or assets change.
- No changes to Pregnancy, TTC, IVF, Postpartum, Family or Toddler files.
- Image mappings deferred to Phase 7.7b.

### Verification after edit

- `tsgo` typecheck passes.
- Confirm both articles now have `status: "ready"`, `medicallyReviewed`, `reviewedBy`, `lastUpdated`, 7 sections, 5–6 takeaways, 3 related slugs, 3–5 sources.
- Confirm all `relatedSlugs` resolve to `ready` articles in the file.
- Playwright at 1280×1800: load `/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments` and `/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth`. Verify no draft placeholder text, medical review label renders, sources render, related guidance links render.
- Load `/first-year/checkups-and-warning-signs` topic page: both cards no longer show "Coming soon" and are clickable.
- Regression: quick load of one existing ready First Year article (e.g. feeding) to confirm nothing broke.

### Return summary will include

Files edited, both slugs published, ready/draft count after publish, section and takeaway counts per article, sources per article with URLs, any source gaps flagged, medical review fields added, related slugs per article, safety-wording once check, sensitive-content guardrail result, `tsgo` result, route verification result, topic page verification result, draft-gating result, cross-hub regression result, and whether it is safe to proceed to Phase 7.7b (image mappings).
