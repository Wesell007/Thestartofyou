import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_REGISTRY,
  DEVELOPMENT_FALLBACK_KEY,
  DEVELOPMENT_FALLBACK_URL,
  describeBackendTarget,
  resolvePublicBackendEnv,
  type BackendRegistry,
} from "../../scripts/public-backend-env";
import {
  HISTORICAL_PROJECT_REFS,
  PRODUCTION_PROJECT_REF,
  RETIRED_PROJECT_REFS,
  STAGING_PROJECT_REF,
  supabaseProjectRefOf,
} from "../../scripts/backend-environments";

// Gate 1: backend selection is explicit; nothing falls back to a committed backend.
const stagingUrl = `https://${STAGING_PROJECT_REF}.supabase.co`;
const historicalUrl = `https://${HISTORICAL_PROJECT_REFS[0]}.supabase.co`;
const futureProductionRef = "zzzzzzzzzzzzzzzzzzzz";
const futureProductionUrl = `https://${futureProductionRef}.supabase.co`;
const withProduction: BackendRegistry = { ...DEFAULT_REGISTRY, productionRef: futureProductionRef };
const ci = { VITE_TSOY_ENVIRONMENT: "ci", VITE_SUPABASE_URL: "https://ci-test.supabase.co", VITE_SUPABASE_PUBLISHABLE_KEY: "ci-test-public-key" };
const staging = { VITE_TSOY_ENVIRONMENT: "staging", VITE_SUPABASE_URL: stagingUrl, VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example" };

describe("backend environment registry", () => {
  it("has no committed fallback backend and no production project yet", () => {
    expect(existsSync(resolve(process.cwd(), "scripts/public-backend-defaults.ts"))).toBe(false);
    expect(PRODUCTION_PROJECT_REF).toBeNull();
    expect(STAGING_PROJECT_REF).toMatch(/^[a-z]{20}$/);
    expect(HISTORICAL_PROJECT_REFS).toContain("wogepxfipdipogyogced");
    expect(RETIRED_PROJECT_REFS).toContain("jjrhizafpikmyvfapcic");
    expect(RETIRED_PROJECT_REFS).not.toContain(STAGING_PROJECT_REF);
  });

  it("vite.config uses the explicit resolver and no defaults", () => {
    const config = readFileSync(resolve(process.cwd(), "vite.config.ts"), "utf8");
    expect(config).toContain("resolvePublicBackendEnv(env, mode)");
    expect(config).not.toMatch(/public-backend-defaults|PUBLIC_BACKEND_DEFAULTS/);
  });

  it("parses refs only from hosted Supabase URLs", () => {
    expect(supabaseProjectRefOf(stagingUrl)).toBe(STAGING_PROJECT_REF);
    expect(supabaseProjectRefOf("http://127.0.0.1:54321")).toBeNull();
    expect(supabaseProjectRefOf("not a url")).toBeNull();
  });
});

describe("production builds fail closed", () => {
  it("rejects missing or placeholder configuration", () => {
    expect(() => resolvePublicBackendEnv({}, "production")).toThrow(/without explicit backend configuration/);
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_SUPABASE_URL: DEVELOPMENT_FALLBACK_URL }, "production")).toThrow(/placeholder/);
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_SUPABASE_PUBLISHABLE_KEY: "" }, "production")).toThrow(/PUBLISHABLE_KEY/);
  });

  it("requires an explicit environment identity", () => {
    const { VITE_TSOY_ENVIRONMENT: _omit, ...noIdentity } = ci;
    expect(() => resolvePublicBackendEnv(noIdentity, "production")).toThrow(/VITE_TSOY_ENVIRONMENT/);
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_TSOY_ENVIRONMENT: "prod" }, "production")).toThrow(/must be one of/);
  });

  it("refuses every real production build while no production project is approved", () => {
    expect(() =>
      resolvePublicBackendEnv({ ...ci, VITE_TSOY_ENVIRONMENT: "production", VITE_SUPABASE_URL: futureProductionUrl }, "production"),
    ).toThrow(/no production backend is approved/);
  });

  it("can never use tsoy-staging as a production backend", () => {
    expect(() => resolvePublicBackendEnv({ ...staging, VITE_TSOY_ENVIRONMENT: "production" }, "production")).toThrow();
    expect(() => resolvePublicBackendEnv({ ...staging, VITE_TSOY_ENVIRONMENT: "ci" }, "production")).toThrow(/real registered backend/);
    expect(() => resolvePublicBackendEnv({ ...staging, VITE_TSOY_ENVIRONMENT: "production" }, "production", withProduction)).toThrow(
      /other than the registered production project/,
    );
  });

  it("accepts the registered production project once one exists (Gate 7)", () => {
    const resolved = resolvePublicBackendEnv(
      { VITE_TSOY_ENVIRONMENT: "production", VITE_SUPABASE_URL: futureProductionUrl, VITE_SUPABASE_PUBLISHABLE_KEY: "pk" },
      "production",
      withProduction,
    );
    expect(describeBackendTarget(resolved, withProduction)).toBe("production");
  });

  it("accepts CI placeholder builds with their aliases", () => {
    expect(
      resolvePublicBackendEnv({ VITE_TSOY_ENVIRONMENT: "ci", SUPABASE_URL: "https://ci-test.supabase.co", SUPABASE_ANON_KEY: "k" }, "production"),
    ).toMatchObject({ VITE_SUPABASE_URL: "https://ci-test.supabase.co", VITE_SUPABASE_PUBLISHABLE_KEY: "k", VITE_TSOY_ENVIRONMENT: "ci" });
  });
});

describe("historical and retired projects are refused in every mode", () => {
  for (const ref of [...HISTORICAL_PROJECT_REFS, ...RETIRED_PROJECT_REFS]) {
    it(`refuses ${ref}`, () => {
      for (const mode of ["production", "staging", "development", "test"]) {
        expect(() =>
          resolvePublicBackendEnv({ VITE_TSOY_ENVIRONMENT: "ci", VITE_SUPABASE_URL: `https://${ref}.supabase.co`, VITE_SUPABASE_PUBLISHABLE_KEY: "k" }, mode),
        ).toThrow(/historical or retired/);
      }
      expect(() => resolvePublicBackendEnv({ VITE_SUPABASE_PROJECT_ID: ref }, "development")).toThrow(/historical or retired/);
    });
  }
  it("cannot be bypassed with the production opt-in or case/trailing slash", () => {
    expect(() =>
      resolvePublicBackendEnv({ VITE_SUPABASE_URL: `${historicalUrl.toUpperCase()}/`, VITE_ALLOW_PRODUCTION_BACKEND: "true" }, "development"),
    ).toThrow(/historical or retired/);
  });
});

describe("staging builds and sessions", () => {
  it("a staging build requires explicit staging identity and the staging project", () => {
    expect(describeBackendTarget(resolvePublicBackendEnv(staging, "staging"))).toBe("staging");
    expect(() => resolvePublicBackendEnv({}, "staging")).toThrow(/without explicit backend configuration/);
    expect(() => resolvePublicBackendEnv({ ...staging, VITE_TSOY_ENVIRONMENT: "local" }, "staging")).toThrow(/requires VITE_TSOY_ENVIRONMENT="staging"/);
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_TSOY_ENVIRONMENT: "staging" }, "staging")).toThrow(/must use the tsoy-staging project/);
  });

  it("dev sessions declared as staging must point at staging", () => {
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_TSOY_ENVIRONMENT: "staging" }, "development")).toThrow(/tsoy-staging/);
    expect(resolvePublicBackendEnv(staging, "development").VITE_TSOY_ENVIRONMENT).toBe("staging");
  });

  it("a non-production session can never declare itself production", () => {
    expect(() => resolvePublicBackendEnv({ ...ci, VITE_TSOY_ENVIRONMENT: "production" }, "development")).toThrow(/non-production session/);
  });
});

describe("dev / test sessions", () => {
  it("without configuration resolve to the inert placeholder", () => {
    const resolved = resolvePublicBackendEnv({}, "development");
    expect(resolved).toMatchObject({ VITE_SUPABASE_URL: DEVELOPMENT_FALLBACK_URL, VITE_SUPABASE_PUBLISHABLE_KEY: DEVELOPMENT_FALLBACK_KEY, VITE_TSOY_ENVIRONMENT: "local" });
    expect(describeBackendTarget(resolved)).toBe("placeholder");
  });

  it("explicit local values are used as given", () => {
    const resolved = resolvePublicBackendEnv(
      { VITE_SUPABASE_URL: "http://127.0.0.1:54321", VITE_SUPABASE_PUBLISHABLE_KEY: "local-anon-key", VITE_SUPABASE_PROJECT_ID: "local" },
      "development",
    );
    expect(resolved).toEqual({ VITE_SUPABASE_URL: "http://127.0.0.1:54321", VITE_SUPABASE_PUBLISHABLE_KEY: "local-anon-key", VITE_SUPABASE_PROJECT_ID: "local", VITE_TSOY_ENVIRONMENT: "local" });
    expect(describeBackendTarget(resolved)).toBe("custom");
  });

  it("the registered production project needs the exact opt-in", () => {
    const env = { VITE_SUPABASE_URL: futureProductionUrl, VITE_SUPABASE_PUBLISHABLE_KEY: "k" };
    for (const notOptedIn of ["", "false", "TRUE", "1", "yes"]) {
      expect(() => resolvePublicBackendEnv({ ...env, VITE_ALLOW_PRODUCTION_BACKEND: notOptedIn }, "development", withProduction)).toThrow(
        /Refusing to point a non-production session/,
      );
    }
    const resolved = resolvePublicBackendEnv({ ...env, VITE_ALLOW_PRODUCTION_BACKEND: "true" }, "development", withProduction);
    expect(describeBackendTarget(resolved, withProduction)).toBe("production");
  });

  it("the opt-in flag alone never pulls in a backend", () => {
    expect(resolvePublicBackendEnv({ VITE_ALLOW_PRODUCTION_BACKEND: "true" }, "development").VITE_SUPABASE_URL).toBe(DEVELOPMENT_FALLBACK_URL);
  });
});
