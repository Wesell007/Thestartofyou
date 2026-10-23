// Explicit public backend selection for Vite builds and dev sessions (Gate 1, October 2026).
//
// There is no committed fallback backend. Every build names its environment and its backend:
//   VITE_TSOY_ENVIRONMENT  local | staging | production | ci
//   VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY (aliases SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY,
//   SUPABASE_ANON_KEY)
// Rules (fail closed):
//   - Historical or retired project refs are refused in every mode.
//   - `vite build` (mode "production") requires VITE_TSOY_ENVIRONMENT=production with the registered
//     production project (none exists yet, so every real production build fails), or
//     VITE_TSOY_ENVIRONMENT=ci with a non-registered placeholder backend. Staging can never become a
//     production backend.
//   - `vite build --mode staging` requires VITE_TSOY_ENVIRONMENT=staging and the staging project.
//   - Dev/test sessions without configuration use an inert placeholder that cannot reach any backend.
//     A session that names the registered production project needs VITE_ALLOW_PRODUCTION_BACKEND=true.
import {
  FORBIDDEN_PROJECT_REFS,
  PRODUCTION_PROJECT_REF,
  STAGING_PROJECT_REF,
  supabaseProjectRefOf,
} from "./backend-environments";

type Environment = Record<string, string | undefined>;

export type TsoyEnvironment = "local" | "staging" | "production" | "ci";
export const TSOY_ENVIRONMENTS: readonly TsoyEnvironment[] = ["local", "staging", "production", "ci"];

export type PublicBackendEnv = {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
  VITE_SUPABASE_PROJECT_ID: string;
  VITE_TSOY_ENVIRONMENT: string;
};

export type BackendRegistry = { stagingRef: string; productionRef: string | null; forbiddenRefs: readonly string[] };

export const DEFAULT_REGISTRY: BackendRegistry = {
  stagingRef: STAGING_PROJECT_REF,
  productionRef: PRODUCTION_PROJECT_REF,
  forbiddenRefs: FORBIDDEN_PROJECT_REFS,
};

export const DEVELOPMENT_FALLBACK_URL = "https://placeholder.supabase.co";
export const DEVELOPMENT_FALLBACK_KEY = "public-anon-key";

// Set to exactly "true" to deliberately point a non-production session at the registered production backend.
export const PRODUCTION_OPT_IN_VAR = "VITE_ALLOW_PRODUCTION_BACKEND";

const firstDefined = (env: Environment, names: string[]) =>
  names.map((name) => env[name]?.trim()).find(Boolean) ?? "";

export const isProductionOptIn = (env: Environment): boolean => env[PRODUCTION_OPT_IN_VAR]?.trim() === "true";

const fail = (message: string): never => {
  throw new Error(`[backend-config] ${message}`);
};

const validateRealBackend = (url: string, key: string): string[] => {
  const errors: string[] = [];
  if (!url) errors.push("VITE_SUPABASE_URL is missing");
  else if (url === DEVELOPMENT_FALLBACK_URL || url.includes("your-project-ref") || url.includes("your-project-id")) {
    errors.push("VITE_SUPABASE_URL is still a placeholder");
  } else {
    try {
      const parsed = new URL(url);
      const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
      if (parsed.protocol !== "https:" && !(isLocal && parsed.protocol === "http:")) {
        errors.push("VITE_SUPABASE_URL must use HTTPS (except for a local Supabase instance)");
      }
    } catch {
      errors.push("VITE_SUPABASE_URL is not a valid URL");
    }
  }
  if (!key || key === DEVELOPMENT_FALLBACK_KEY || key === "your-publishable-key" || key === "your-publishable-anon-key") {
    errors.push("VITE_SUPABASE_PUBLISHABLE_KEY is missing or still a placeholder");
  }
  return errors;
};

export const resolvePublicBackendEnv = (
  env: Environment,
  mode: string,
  registry: BackendRegistry = DEFAULT_REGISTRY,
): PublicBackendEnv => {
  const supabaseUrl = firstDefined(env, ["VITE_SUPABASE_URL", "SUPABASE_URL"]);
  const publishableKey = firstDefined(env, ["VITE_SUPABASE_PUBLISHABLE_KEY", "SUPABASE_PUBLISHABLE_KEY", "SUPABASE_ANON_KEY"]);
  const projectId = firstDefined(env, ["VITE_SUPABASE_PROJECT_ID", "SUPABASE_PROJECT_ID"]);
  const declared = firstDefined(env, ["VITE_TSOY_ENVIRONMENT"]);
  const ref = supabaseUrl ? supabaseProjectRefOf(supabaseUrl) : null;

  if (declared && !(TSOY_ENVIRONMENTS as readonly string[]).includes(declared)) {
    fail(`VITE_TSOY_ENVIRONMENT must be one of ${TSOY_ENVIRONMENTS.join(", ")} (got "${declared}")`);
  }
  if (ref && registry.forbiddenRefs.includes(ref)) {
    fail(`Refusing backend ${ref}: it is a historical or retired project and must not be contacted.`);
  }
  if (projectId && registry.forbiddenRefs.includes(projectId)) {
    fail(`Refusing VITE_SUPABASE_PROJECT_ID ${projectId}: it is a historical or retired project.`);
  }

  if (mode === "production") {
    const errors = validateRealBackend(supabaseUrl, publishableKey);
    if (errors.length > 0) fail(`Refusing to create a production build without explicit backend configuration: ${errors.join("; ")}`);
    if (declared === "production") {
      if (!registry.productionRef) {
        fail("Refusing to create a production build: no production backend is approved yet (tsoy-production is created at Gate 7).");
      }
      if (ref !== registry.productionRef) fail("Refusing to create a production build against a backend other than the registered production project.");
    } else if (declared === "ci") {
      if (ref && (ref === registry.stagingRef || ref === registry.productionRef)) {
        fail("Refusing a CI build against a real registered backend; CI uses placeholder values only.");
      }
    } else {
      fail('Refusing to create a production build without VITE_TSOY_ENVIRONMENT="production" (or "ci" for placeholder CI builds).');
    }
    if (ref && ref === registry.stagingRef) fail("Refusing to create a production build against tsoy-staging.");
  } else if (mode === "staging") {
    const errors = validateRealBackend(supabaseUrl, publishableKey);
    if (errors.length > 0) fail(`Refusing to create a staging build without explicit backend configuration: ${errors.join("; ")}`);
    if (declared !== "staging") fail('A staging build requires VITE_TSOY_ENVIRONMENT="staging".');
    if (ref !== registry.stagingRef) fail("A staging build must use the tsoy-staging project.");
  } else {
    if (declared === "production") fail(`Refusing VITE_TSOY_ENVIRONMENT="production" in a non-production session (mode "${mode}").`);
    if (declared === "staging" && supabaseUrl && ref !== registry.stagingRef) {
      fail('VITE_TSOY_ENVIRONMENT="staging" must point VITE_SUPABASE_URL at the tsoy-staging project.');
    }
    if (ref && registry.productionRef && ref === registry.productionRef && !isProductionOptIn(env)) {
      fail(
        `Refusing to point a non-production session (mode "${mode}") at the production backend. ` +
          `Remove the production VITE_SUPABASE_URL from your local environment, or set ${PRODUCTION_OPT_IN_VAR}=true to opt in deliberately.`,
      );
    }
  }

  return {
    VITE_SUPABASE_URL: supabaseUrl || DEVELOPMENT_FALLBACK_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: publishableKey || DEVELOPMENT_FALLBACK_KEY,
    VITE_SUPABASE_PROJECT_ID: projectId,
    VITE_TSOY_ENVIRONMENT: declared || (ref && ref === registry.stagingRef ? "staging" : "local"),
  };
};

export type BackendTarget = "placeholder" | "staging" | "production" | "custom";

export const describeBackendTarget = (resolved: PublicBackendEnv, registry: BackendRegistry = DEFAULT_REGISTRY): BackendTarget => {
  if (resolved.VITE_SUPABASE_URL === DEVELOPMENT_FALLBACK_URL) return "placeholder";
  const ref = supabaseProjectRefOf(resolved.VITE_SUPABASE_URL);
  if (ref && ref === registry.stagingRef) return "staging";
  if (ref && registry.productionRef && ref === registry.productionRef) return "production";
  return "custom";
};
