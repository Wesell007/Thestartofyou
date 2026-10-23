# The Start of You

A React and TypeScript health-content product covering trying to conceive, IVF, pregnancy, early parenthood, toddler years, and family life. Public editorial guidance is paired with private Supabase-backed journey tools.

## Local development

Requirements: Node.js 22+ and npm.

```sh
cp .env.example .env
npm ci
npm run dev
```

Set the three public Supabase variables in `.env`. Server-only secrets such as the Supabase service-role key, AI provider key, email provider credentials, allowed origins, and AI rate-limit salt belong in Supabase Edge Function secrets, never in the Vite environment.

## Quality checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The pre-build step regenerates `public/sitemap.xml`. Database changes are forward-only SQL files under `supabase/migrations`; Edge Functions live under `supabase/functions`.

## Operating model (Gate 0, October 2026)

This GitHub repository is the single source of truth, and Claude Code is the implementation owner. The Lovable site is intentionally unpublished, and there is currently **no approved production Supabase environment**. A permanent `tsoy-staging` and a clean `tsoy-production` are planned, not created. Before using any backend, read `docs/strategy/tsoy-environment-strategy.md` (environments) and `docs/strategy/tsoy-v1-product-rebaseline.md` (programme gates). The committed public backend defaults point at a historical project that is no longer verified.

See `AGENTS.md` for architecture, health-content, privacy, and testing conventions.
