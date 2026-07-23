import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Always inject string values so the generated Supabase client can construct
  // without throwing. Real values win when present; placeholders keep public
  // pages usable if a publish omits backend env (auth/journey will still fail).
  const publicBackendEnv = {
    VITE_SUPABASE_URL:
      env.VITE_SUPABASE_URL || env.SUPABASE_URL || "https://placeholder.supabase.co",
    VITE_SUPABASE_PUBLISHABLE_KEY:
      env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      env.SUPABASE_PUBLISHABLE_KEY ||
      env.SUPABASE_ANON_KEY ||
      "public-anon-key",
    VITE_SUPABASE_PROJECT_ID:
      env.VITE_SUPABASE_PROJECT_ID || env.SUPABASE_PROJECT_ID || "",
  };

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
