import { describe, expect, it } from "vitest";
import {
  DEVELOPMENT_FALLBACK_KEY,
  DEVELOPMENT_FALLBACK_URL,
  describeBackendTarget,
  resolvePublicBackendEnv,
} from "../../scripts/public-backend-env";
import { PUBLIC_BACKEND_DEFAULTS } from "../../scripts/public-backend-defaults";

const productionUrl = PUBLIC_BACKEND_DEFAULTS.VITE_SUPABASE_URL;
const productionHost = new URL(productionUrl).hostname;

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

  it("gives a production build the committed production defaults", () => {
    const resolved = resolvePublicBackendEnv(
      { ...PUBLIC_BACKEND_DEFAULTS },
      "production",
      { productionUrl },
    );
    expect(resolved).toMatchObject(PUBLIC_BACKEND_DEFAULTS);
    expect(describeBackendTarget(resolved, productionUrl)).toBe("production");
  });

  it("local dev without a .env resolves to the placeholder, never production", () => {
    const resolved = resolvePublicBackendEnv({}, "development", { productionUrl });
    expect(resolved).toMatchObject({
      VITE_SUPABASE_URL: DEVELOPMENT_FALLBACK_URL,
      VITE_SUPABASE_PUBLISHABLE_KEY: DEVELOPMENT_FALLBACK_KEY,
    });
    expect(new URL(resolved.VITE_SUPABASE_URL).hostname).not.toBe(productionHost);
    expect(describeBackendTarget(resolved, productionUrl)).toBe("placeholder");
  });

  it("explicit non-production values override the placeholder in dev", () => {
    const resolved = resolvePublicBackendEnv(
      {
        VITE_SUPABASE_URL: "http://127.0.0.1:54321",
        VITE_SUPABASE_PUBLISHABLE_KEY: "local-anon-key",
        VITE_SUPABASE_PROJECT_ID: "local",
      },
      "development",
      { productionUrl },
    );
    expect(resolved).toEqual({
      VITE_SUPABASE_URL: "http://127.0.0.1:54321",
      VITE_SUPABASE_PUBLISHABLE_KEY: "local-anon-key",
      VITE_SUPABASE_PROJECT_ID: "local",
    });
    expect(describeBackendTarget(resolved, productionUrl)).toBe("custom");
  });

  it("fails closed when a non-production mode points at production without opt-in", () => {
    for (const mode of ["development", "test", "staging"]) {
      expect(() =>
        resolvePublicBackendEnv(
          {
            VITE_SUPABASE_URL: productionUrl,
            VITE_SUPABASE_PUBLISHABLE_KEY: "any-key",
          },
          mode,
          { productionUrl },
        ),
      ).toThrow(/Refusing to point a non-production session/);
    }

    // Trailing slash and case must not sneak past the guard.
    expect(() =>
      resolvePublicBackendEnv(
        { VITE_SUPABASE_URL: `${productionUrl.toUpperCase()}/` },
        "development",
        { productionUrl },
      ),
    ).toThrow(/Refusing to point a non-production session/);

    // The SUPABASE_URL alias is guarded too.
    expect(() =>
      resolvePublicBackendEnv({ SUPABASE_URL: productionUrl }, "development", {
        productionUrl,
      }),
    ).toThrow(/Refusing to point a non-production session/);
  });

  it("allows local production access only with the explicit opt-in", () => {
    const env = {
      VITE_SUPABASE_URL: productionUrl,
      VITE_SUPABASE_PUBLISHABLE_KEY: "any-key",
    };

    for (const notOptedIn of ["", "false", "TRUE", "1", "yes"]) {
      expect(() =>
        resolvePublicBackendEnv(
          { ...env, VITE_ALLOW_PRODUCTION_BACKEND: notOptedIn },
          "development",
          { productionUrl },
        ),
      ).toThrow(/Refusing to point a non-production session/);
    }

    const resolved = resolvePublicBackendEnv(
      { ...env, VITE_ALLOW_PRODUCTION_BACKEND: "true" },
      "development",
      { productionUrl },
    );
    expect(resolved.VITE_SUPABASE_URL).toBe(productionUrl);
    expect(describeBackendTarget(resolved, productionUrl)).toBe("production");
  });

  it("does not let the opt-in flag alone pull in production values", () => {
    const resolved = resolvePublicBackendEnv(
      { VITE_ALLOW_PRODUCTION_BACKEND: "true" },
      "development",
      { productionUrl },
    );
    expect(resolved.VITE_SUPABASE_URL).toBe(DEVELOPMENT_FALLBACK_URL);
  });
});
