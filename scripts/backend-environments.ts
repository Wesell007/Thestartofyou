// TSOY backend environment registry (Gate 1, October 2026).
//
// Public identifiers only: Supabase project refs are not secrets. Keys and passwords never live here.
// Authoritative description: docs/strategy/tsoy-environment-strategy.md.
//
// There is NO default backend. A build selects its backend explicitly through environment variables
// (see scripts/public-backend-env.ts); nothing in this file is ever used as a fallback value.

/** Permanent non-production staging project `tsoy-staging` (WesellProducts, eu-west-2). */
export const STAGING_PROJECT_REF = "aeeprivmakalcbnefwwm";

/** Future clean production project `tsoy-production` (Gate 7). None exists or is approved yet. */
export const PRODUCTION_PROJECT_REF: string | null = null;

/** Former Lovable-managed backend: historical, no longer verified, never to be contacted. */
export const HISTORICAL_PROJECT_REFS: readonly string[] = ["wogepxfipdipogyogced"];

/** Retired disposable rehearsal projects (C1 run1/run2, G3, N10.1, N10.3B, N10.5, D14.2). */
export const RETIRED_PROJECT_REFS: readonly string[] = [
  "wwtcnbjhttjtklpxhrkd",
  "dlftnirrnirlkhxpofoq",
  "czhopceorfqxdbfvlnap",
  "gbhwpzofnswlryqjoumw",
  "toqeefrwnsjuhjmobodg",
  "mwlryyionkpjbecnbsiq",
  "jjrhizafpikmyvfapcic",
];

export const FORBIDDEN_PROJECT_REFS: readonly string[] = [...HISTORICAL_PROJECT_REFS, ...RETIRED_PROJECT_REFS];

/** A Supabase project ref is exactly 20 lowercase letters. */
export const PROJECT_REF_PATTERN = /^[a-z]{20}$/;

/** The project ref of a hosted Supabase URL (`https://<ref>.supabase.co`), or null for any other host. */
export const supabaseProjectRefOf = (value: string): string | null => {
  try {
    const host = new URL(value).hostname.toLowerCase();
    const match = /^([a-z]{20})\.supabase\.(co|in)$/.exec(host);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
