# Substantive content digest specification

**Specification version: `30K-content-digest-v1`** (pinned before first use).

Implemented by `scripts/grounding-content-digest.ts`. Governance tooling only:
no runtime module imports it, and it prints slugs and digests only, never
article text.

## Algorithm

SHA-256 over the canonical serialisation below. The authoritative stored value
is the **full 64-character lowercase hex digest**. Any shortened prefix shown
in prose is display-only and never authoritative.

## Substantive input fields

In this fixed order:

1. `specVersion` (this specification version)
2. `slug`
3. `title`
4. `description`
5. `intro` (absent renders as an empty string)
6. `sections`, in source order, each as `heading` then `body` paragraphs in source order
7. `keyTakeaways`, in source order

Any further genuinely substantive user-facing field must be added to this list,
documented here, and the specification version bumped **before** it is hashed.

## Excluded fields

Governance and editorial metadata: `lastUpdated`, `status`, `reviewedBy`,
`owner`, `reviewer`, `reviewedDate`, and all approval metadata. Presentational
fields: `seoTitle`, `seoDescription`, `readTime`, `relatedSlugs`, imagery and
media. A metadata-only edit therefore leaves the fingerprint unchanged.

## Canonicalisation

- fixed field order, as listed above;
- arrays in source order, never sorted or deduplicated;
- line-ending normalisation only: CRLF -> LF, lone CR -> LF;
- deterministic JSON serialisation with no presentation-only JSON whitespace;
- **substantive string content is preserved exactly.** Paragraphs, list
  formatting, indentation, internal spacing and meaningful line breaks are
  never collapsed, trimmed, re-wrapped or otherwise rewritten for hashing.

## Version labels

Content versions are labelled `<slug>@<n>`; the first authorised version is
`<slug>@1`. A version label is minted only by an explicit human decision, never
because a digest was computed. A new version is minted when the substantive
content changes; an approval attaches to exactly one version and lapses when
that version changes.

## Status of a computed digest

A digest is a prepared evidence fingerprint. It is not review, authorisation,
sensitivity confirmation, source validation, candidate status, approval or
eligibility.
