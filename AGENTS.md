# AGENTS.md

## Project overview

The Start of You is a Vite 8 + React 18 + TypeScript single-page application for pregnancy, trying to conceive (TTC), IVF, the first year, toddler, and family guidance. It combines public editorial content with authenticated journey tools backed by Supabase. Styling is Tailwind CSS with shadcn/Radix primitives and a custom editorial design system.

Treat this as a health-content product. Preserve user trust, privacy, accessibility, SEO, and the calm editorial tone alongside functional correctness.

## Toolchain and commands

Use npm and the committed `package-lock.json` as the single package-manager source of truth. Use `npm ci` in CI and avoid generating Bun, Yarn, or pnpm lockfiles.

```sh
npm ci
npm run dev             # generates public/sitemap.xml, then starts Vite on :8080
npm test                # Vitest in jsdom
npm run test:watch
npm run lint
npm run typecheck
npm run build           # generates the sitemap, then builds dist/
npx playwright test     # browser tests, when relevant
```

Run the smallest relevant checks while iterating. Before handing off a normal code change, run tests, lint, type-check, and build when the environment permits. Report checks that could not run. Note that `dev` and `build` intentionally rewrite `public/sitemap.xml`.

## Repository map

- `src/App.tsx`: providers, analytics/auth bridges, redirects, and the complete route table.
- `src/pages/`: route-level composition. Many topic pages are intentionally thin wrappers around shared templates.
- `src/components/`: feature components grouped by journey; `layout/` contains shared navigation/footer; `ui/` contains shadcn-style primitives.
- `src/data/`: the source of truth for articles, topics, stages, weeks, and content inventories.
- `src/lib/`: analytics, consent, saved-journey access, TTC derivations, and shared utilities.
- `src/hooks/`: reusable browser and AI-search behavior.
- `src/integrations/supabase/`: generated Supabase client and database types.
- `supabase/functions/`: Deno edge functions for AI and email processing.
- `supabase/migrations/`: forward-only database migrations, RLS policies, storage, and email infrastructure.
- `scripts/generate-sitemap.ts`: sitemap assembly and extraction rules.
- `src/index.css` and `tailwind.config.ts`: global tokens, stage palettes, typography, motion, and Tailwind extensions.
- `src/test/`: shared Vitest setup. Co-locate new `*.test.ts(x)` or `*.spec.ts(x)` files under `src/`.

## Implementation conventions

- Use function components, hooks, and TypeScript. Follow the surrounding file's formatting; the codebase generally uses double quotes in application code and the `@/` alias for `src/` imports.
- Keep route files focused on SEO, parameter lookup, and composition. Put reusable layouts and behavior in the appropriate feature component directory, and structured copy/content in `src/data/`.
- Prefer existing templates before creating a parallel page system. First Year, Toddler, Family, TTC, trimester, week, and article pages each have established data-to-template patterns.
- Reuse primitives from `src/components/ui/` and the existing Tailwind/CSS variables. Use `font-serif` for editorial display text, `font-sans` for interface text, and the relevant `--stage-*` palette rather than introducing arbitrary colors or fonts.
- Preserve responsive layouts and keyboard/screen-reader behavior. Use semantic headings, meaningful image alt text, labelled controls, visible focus states, and `aria-hidden` for decorative elements.
- Import repository assets rather than adding remote hotlinks. Files ending in `.asset.json` are Lovable asset descriptors; consume their `url` using the same pattern as adjacent code.
- Do not edit `src/integrations/lovable/index.ts` or `src/integrations/supabase/client.ts` directly; both are marked generated. Regenerate `src/integrations/supabase/types.ts` after schema changes when the Supabase tooling is available.

## Routing, content, and SEO

- Register routes centrally in `src/App.tsx`. Specific routes must remain above generic routes such as `/pregnancy/week/:week`, `/:journey/:stage`, and `*`.
- Preserve canonical redirects and query strings where applicable. Do not revive legacy mounts without checking their redirect and sitemap intent.
- Every indexable public page should use `SeoHead` (or the relevant helper), with a unique title, description, and canonical URL under `https://thestartofyou.com`.
- When adding or changing a public route, update `scripts/generate-sitemap.ts` unless its data extractor already covers that route. Only `status: "ready"` hub articles are indexed; drafts must not leak into the sitemap.
- Legacy `/articles/:slug` content lives in `src/data/articleData.ts`; its renderer is selected by content shape in `ArticlePage.tsx`. Family, First Year, and Toddler articles have separate typed datasets and parameterized routes. Extend the appropriate existing system instead of duplicating an article in another one.
- Keep slug, topic, route, internal-link, image-map, canonical, redirect, and sitemap entries consistent. Check `src/data/articleInventory.ts` before creating content that may compete with an existing canonical article.
- Structured-data citations must be real structured source URLs. Do not place plain labels into JSON-LD citation arrays.

## Health-content rules

- Use calm, specific, non-alarmist language. Clearly distinguish common experiences, uncertainty, and signs that warrant professional or urgent help.
- Do not invent clinical claims, source URLs, reviewer names, review dates, or `medicallyReviewed` status. Preserve the existing source and reviewer metadata when editing reviewed content.
- Calculators and cycle estimates are estimates, not diagnoses or confirmation of pregnancy, ovulation, fertility, or “safe” timing. Keep uncertainty and safety wording intact.
- Avoid guarantees and absolute reassurance. Never imply that the product or AI replaces a qualified healthcare professional or emergency care.

## Supabase, auth, AI, and privacy

- Browser code may use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Keep `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`, and email-provider credentials server-side in edge-function secrets. Never commit `.env` values.
- Add database changes as new timestamped migrations; do not rewrite migrations that may already be deployed. Include appropriate constraints, indexes, grants, and RLS policies. User-owned records must be scoped with `auth.uid()`.
- Keep `ProtectedRoute` around authenticated journey screens. Handle loading, missing-session, error, and empty states without exposing another user's data.
- AI responses stream as server-sent events from `ai-search`; preserve cancellation/error/loading behavior and do not expose provider secrets to the client.
- Analytics is consent-gated. Add event names and typed properties in `src/lib/analyticsEvents.ts`, then call the helpers in `src/lib/analytics.ts`. Never send names, emails, dates, free-text questions/reflections/notes, cycle details, AI context, or other sensitive/health data as analytics properties.
- Preserve consent behavior and identity reset semantics when changing analytics or auth flows.

## Testing expectations

- Add focused Vitest/Testing Library coverage for new logic, conditional rendering, forms, redirects, and regressions. The current example test is only a smoke placeholder, not evidence of feature coverage.
- Prefer testing behavior visible to a user over component internals. Mock Supabase, fetch/SSE, dates, and browser APIs at the boundary.
- Add Playwright coverage for high-value multi-page flows when practical: auth redirects, journey setup, calculators, route/canonical redirects, and protected dashboards.
- Manually inspect visually significant changes at mobile and desktop widths. Check navigation, content hierarchy, overflow, focus behavior, image cropping, loading/error/empty states, and console errors.

## Change discipline

- Keep changes scoped. Do not reformat generated shadcn primitives, large editorial datasets, or unrelated files as drive-by cleanup.
- Preserve existing user changes and legacy code explicitly retained for migration/reference.
- A route/content change is complete only when its data, UI, SEO, internal links, redirects, and sitemap behavior agree.
- In the handoff, summarize changed behavior, list validation performed, and call out schema, environment, content-review, or deployment follow-ups.
