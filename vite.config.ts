import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { describeBackendTarget, resolvePublicBackendEnv } from "./scripts/public-backend-env";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Backend selection is explicit (scripts/public-backend-env.ts, docs/strategy/tsoy-environment-strategy.md).
  // There is no committed fallback: production and staging builds fail closed without explicit
  // configuration, a production build can never use tsoy-staging, and historical or retired
  // projects are refused in every mode. Dev/test sessions without configuration use an inert
  // placeholder backend.
  const publicBackendEnv = resolvePublicBackendEnv(env, mode);

  if (mode !== "production") {
    const target = describeBackendTarget(publicBackendEnv);
    const line = "=".repeat(72);
    if (target === "production") {
      console.warn(
        [
          line,
          `[backend-config] WARNING: THIS ${mode.toUpperCase()} SESSION IS CONNECTED TO PRODUCTION`,
          `[backend-config] ${publicBackendEnv.VITE_SUPABASE_URL}`,
          "[backend-config] VITE_ALLOW_PRODUCTION_BACKEND=true is set. Real user data is reachable.",
          line,
        ].join("\n"),
      );
    } else if (target === "placeholder") {
      console.info(
        `[backend-config] ${mode} session uses the inert placeholder backend (${publicBackendEnv.VITE_SUPABASE_URL}). ` +
          "Backend calls will fail; set VITE_TSOY_ENVIRONMENT, VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env (see .env.example).",
      );
    } else {
      console.info(
        `[backend-config] ${mode} session uses the ${target} backend ${publicBackendEnv.VITE_SUPABASE_URL} (VITE_TSOY_ENVIRONMENT=${publicBackendEnv.VITE_TSOY_ENVIRONMENT}).`,
      );
    }
  }

  const define = Object.fromEntries(
    Object.entries(publicBackendEnv).map(([name, value]) => [
      `import.meta.env.${name}`,
      JSON.stringify(value),
    ]),
  );

  return {
    define,
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  };
});
