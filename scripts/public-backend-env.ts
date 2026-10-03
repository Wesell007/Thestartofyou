type Environment = Record<string, string | undefined>;

export type PublicBackendEnv = {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
  VITE_SUPABASE_PROJECT_ID: string;
};

export type ResolvePublicBackendEnvOptions = {
  // The committed production Supabase URL. In any non-production mode a
  // resolved URL that points here is refused unless the session opted in.
  productionUrl?: string;
};

export const DEVELOPMENT_FALLBACK_URL = "https://placeholder.supabase.co";
export const DEVELOPMENT_FALLBACK_KEY = "public-anon-key";

// Set this to exactly "true" in a local .env (or the shell) to deliberately
// point a non-production session at the production backend.
export const PRODUCTION_OPT_IN_VAR = "VITE_ALLOW_PRODUCTION_BACKEND";

const firstDefined = (env: Environment, names: string[]) =>
  names.map((name) => env[name]?.trim()).find(Boolean) ?? "";

const hostnameOf = (value: string): string | null => {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
};

export const isProductionBackendUrl = (
  value: string,
  productionUrl: string | undefined,
): boolean => {
  if (!value || !productionUrl) return false;
  const host = hostnameOf(value);
  const productionHost = hostnameOf(productionUrl);
  return Boolean(host && productionHost && host === productionHost);
};

export const isProductionOptIn = (env: Environment): boolean =>
  env[PRODUCTION_OPT_IN_VAR]?.trim() === "true";

const validateProductionUrl = (value: string): string | null => {
  if (!value) return "VITE_SUPABASE_URL is missing";
  if (value === DEVELOPMENT_FALLBACK_URL || value.includes("your-project-id")) {
    return "VITE_SUPABASE_URL is still a placeholder";
  }

  try {
    const url = new URL(value);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(isLocal && url.protocol === "http:")) {
      return "VITE_SUPABASE_URL must use HTTPS (except for a local Supabase instance)";
    }
  } catch {
    return "VITE_SUPABASE_URL is not a valid URL";
  }

  return null;
};

export const resolvePublicBackendEnv = (
  env: Environment,
  mode: string,
  options: ResolvePublicBackendEnvOptions = {},
): PublicBackendEnv => {
  const supabaseUrl = firstDefined(env, ["VITE_SUPABASE_URL", "SUPABASE_URL"]);
  const publishableKey = firstDefined(env, [
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
  ]);

  if (mode === "production") {
    const errors = [validateProductionUrl(supabaseUrl)];
    if (
      !publishableKey ||
      publishableKey === DEVELOPMENT_FALLBACK_KEY ||
      publishableKey === "your-publishable-anon-key"
    ) {
      errors.push("VITE_SUPABASE_PUBLISHABLE_KEY is missing or still a placeholder");
    }

    const failures = errors.filter((error): error is string => Boolean(error));
    if (failures.length > 0) {
      throw new Error(
        `[backend-config] Refusing to create a broken production build: ${failures.join("; ")}`,
      );
    }
  } else if (
    isProductionBackendUrl(supabaseUrl, options.productionUrl) &&
    !isProductionOptIn(env)
  ) {
    // Fail closed: a dev/test session never reaches production by accident.
    throw new Error(
      `[backend-config] Refusing to point a non-production session (mode "${mode}") at the production backend. ` +
        `Remove the production VITE_SUPABASE_URL from your local environment, or set ${PRODUCTION_OPT_IN_VAR}=true to opt in deliberately.`,
    );
  }

  return {
    VITE_SUPABASE_URL: supabaseUrl || DEVELOPMENT_FALLBACK_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: publishableKey || DEVELOPMENT_FALLBACK_KEY,
    VITE_SUPABASE_PROJECT_ID: firstDefined(env, [
      "VITE_SUPABASE_PROJECT_ID",
      "SUPABASE_PROJECT_ID",
    ]),
  };
};

export type BackendTarget = "placeholder" | "custom" | "production";

export const describeBackendTarget = (
  resolved: PublicBackendEnv,
  productionUrl: string | undefined,
): BackendTarget => {
  if (resolved.VITE_SUPABASE_URL === DEVELOPMENT_FALLBACK_URL) return "placeholder";
  if (isProductionBackendUrl(resolved.VITE_SUPABASE_URL, productionUrl)) return "production";
  return "custom";
};
