type Environment = Record<string, string | undefined>;

export type PublicBackendEnv = {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
  VITE_SUPABASE_PROJECT_ID: string;
};

const DEVELOPMENT_FALLBACK_URL = "https://placeholder.supabase.co";
const DEVELOPMENT_FALLBACK_KEY = "public-anon-key";

const firstDefined = (env: Environment, names: string[]) =>
  names.map((name) => env[name]?.trim()).find(Boolean) ?? "";

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
