import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { resolvePublicBackendEnv } from "./scripts/public-backend-env";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Development can render public pages without a backend. A production build
  // must never silently embed placeholders because that breaks auth, journeys,
  // storage and every Edge Function while still producing a deployable bundle.
  const publicBackendEnv = resolvePublicBackendEnv(env, mode);

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
