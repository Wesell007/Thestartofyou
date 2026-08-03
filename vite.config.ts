import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { resolvePublicBackendEnv } from "./scripts/public-backend-env";
import { PUBLIC_BACKEND_DEFAULTS } from "./scripts/public-backend-defaults";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Deployment builds run without the gitignored .env, so fall back to the
  // committed publishable (non-secret) backend values. Real env vars win.
  const publicBackendEnv = resolvePublicBackendEnv(
    { ...PUBLIC_BACKEND_DEFAULTS, ...env },
    mode,
  );


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
