import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {
  describeBackendTarget,
  resolvePublicBackendEnv,
} from "./scripts/public-backend-env";
import { PUBLIC_BACKEND_DEFAULTS } from "./scripts/public-backend-defaults";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const productionUrl = PUBLIC_BACKEND_DEFAULTS.VITE_SUPABASE_URL;

  // Deployment builds run without the gitignored .env, so production builds
  // fall back to the committed publishable (non-secret) backend values. Real
  // env vars win. Every other mode (dev server, build:dev, tests) must NOT
  // inherit those defaults: it gets the explicit local environment only, and
  // the resolver fails closed if that environment points at production
  // without VITE_ALLOW_PRODUCTION_BACKEND=true.
  const isProductionMode = mode === "production";
  const publicBackendEnv = resolvePublicBackendEnv(
    isProductionMode ? { ...PUBLIC_BACKEND_DEFAULTS, ...env } : env,
    mode,
    { productionUrl },
  );

  if (!isProductionMode) {
    const target = describeBackendTarget(publicBackendEnv, productionUrl);
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
        `[backend-config] ${mode} session uses the non-production placeholder backend (${publicBackendEnv.VITE_SUPABASE_URL}). ` +
          "Backend calls will fail; set VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY in .env for a non-production project.",
      );
    } else {
      console.info(
        `[backend-config] ${mode} session uses the explicitly configured backend ${publicBackendEnv.VITE_SUPABASE_URL}.`,
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
