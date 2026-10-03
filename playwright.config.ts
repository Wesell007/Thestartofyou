import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    // The dev server no longer inherits the production backend defaults, so
    // give the e2e app the same non-production placeholder values CI uses.
    // Real env vars still win.
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? "https://ci-test.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY:
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "ci-test-public-key",
    },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
