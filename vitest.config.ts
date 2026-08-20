import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Lets edge function handlers be imported and exercised under Vitest.
      "https://deno.land/std@0.168.0/http/server.ts": path.resolve(
        __dirname,
        "./src/test/stubs/denoStdServe.ts",
      ),
    },
  },
});
