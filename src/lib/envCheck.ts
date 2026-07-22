/**
 * Startup validation for required Vite env vars.
 *
 * The generated Supabase client (src/integrations/supabase/client.ts) reads
 * VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY at module load time and
 * throws "supabaseUrl is required." if either is undefined. That throw happens
 * before React mounts, so the app renders as a blank white page with only a
 * console error — a confusing failure mode for a published build that shipped
 * without env values.
 *
 * This module runs before the Supabase client is imported and either:
 *  - returns cleanly (all required vars present), or
 *  - renders a plain, dependency-free error screen into #root and returns a
 *    signal telling main.tsx to skip React bootstrap.
 */

type EnvName = "VITE_SUPABASE_URL" | "VITE_SUPABASE_PUBLISHABLE_KEY";

const REQUIRED: EnvName[] = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"];

const isMissing = (value: unknown): boolean =>
  typeof value !== "string" || value.trim().length === 0;

const getMissingEnvVars = (): EnvName[] => {
  const env = import.meta.env as Record<string, unknown>;
  return REQUIRED.filter((name) => isMissing(env[name]));
};

const renderMissingEnvScreen = (missing: EnvName[]): void => {
  if (typeof document === "undefined") return;
  const root = document.getElementById("root");
  if (!root) return;

  const list = missing.map((n) => `<li><code>${n}</code></li>`).join("");
  root.innerHTML = `
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2a2622;">
      <div role="alert" style="max-width:520px;text-align:left;">
        <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8a7d70;margin:0 0 12px 0;">Configuration error</p>
        <h1 style="font-family:Georgia,serif;font-size:1.85rem;line-height:1.2;margin:0 0 14px 0;">This site is missing its backend configuration</h1>
        <p style="font-size:14.5px;line-height:1.65;color:#4a4239;margin:0 0 16px 0;">
          The app could not start because required environment values were not included in this build. If you are the site owner, please republish so the backend connection values are bundled correctly.
        </p>
        <p style="font-size:13px;color:#6b6157;margin:0 0 6px 0;">Missing values:</p>
        <ul style="font-size:13px;color:#4a4239;margin:0 0 20px 20px;padding:0;">${list}</ul>
        <button type="button" onclick="window.location.reload()" style="border:0;border-radius:999px;background:#c98363;color:white;padding:10px 20px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;">Try again</button>
      </div>
    </main>
  `;
};

/**
 * Returns true when the environment is valid and the app should bootstrap.
 * Returns false when required values are missing; in that case a static error
 * screen has already been rendered and React must not mount.
 */
export const validateEnvOrRenderError = (): boolean => {
  const missing = getMissingEnvVars();
  if (missing.length === 0) return true;

  const message = `Missing required environment variables: ${missing.join(", ")}. The Supabase client cannot initialize.`;
  console.error(message);
  renderMissingEnvScreen(missing);
  return false;
};
