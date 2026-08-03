import { describe, expect, it } from "vitest";
import { resolvePublicBackendEnv } from "../../scripts/public-backend-env";

describe("resolvePublicBackendEnv", () => {
  it("rejects a production build without real public backend configuration", () => {
    expect(() => resolvePublicBackendEnv({}, "production")).toThrow(
      /Refusing to create a broken production build/,
    );
    expect(() =>
      resolvePublicBackendEnv(
        {
          VITE_SUPABASE_URL: "https://placeholder.supabase.co",
          VITE_SUPABASE_PUBLISHABLE_KEY: "public-anon-key",
        },
        "production",
      ),
    ).toThrow(/placeholder/);
  });

  it("accepts real production values and their supported aliases", () => {
    expect(
      resolvePublicBackendEnv(
        {
          SUPABASE_URL: "https://project-ref.supabase.co",
          SUPABASE_ANON_KEY: "a-public-project-key",
        },
        "production",
      ),
    ).toMatchObject({
      VITE_SUPABASE_URL: "https://project-ref.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "a-public-project-key",
    });
  });

  it("keeps the public-only development fallback", () => {
    expect(resolvePublicBackendEnv({}, "development")).toMatchObject({
      VITE_SUPABASE_URL: "https://placeholder.supabase.co",
      VITE_SUPABASE_PUBLISHABLE_KEY: "public-anon-key",
    });
  });
});
