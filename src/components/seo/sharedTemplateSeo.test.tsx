import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import FirstYearPhasePage from "@/components/firstyear/phase/FirstYearPhasePage";
import ToddlerAgePage from "@/components/toddler/age/ToddlerAgePage";
import { phaseData } from "@/data/firstYearPhaseData";
import { toddlerAgeConfigs } from "@/data/toddlerAgeData";
import { toMetaDescription } from "@/lib/seo/metaDescription";

/**
 * WC-1: the nine First Year phase / Toddler age routes are indexable and are
 * rendered through two shared templates. This proves every variant emits a
 * unique title, a usable description and a self-referencing canonical, so a
 * new config entry cannot silently ship without metadata.
 */

const BASE = "https://thestartofyou.com";

const readHead = () => ({
  title: document.title,
  description: document.head
    .querySelector('meta[name="description"]')
    ?.getAttribute("content"),
  canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  robots: document.head.querySelector('meta[name="robots"]')?.getAttribute("content"),
});

const renderPage = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>,
  );

describe("shared template SEO", () => {
  afterEach(cleanup);

  const seen = new Set<string>();

  const assertIndexable = async (expectedCanonical: string, expectedDescription: string) => {
    await waitFor(() => expect(document.head.querySelector("link[rel='canonical']")).toBeTruthy());
    const head = readHead();

    expect(head.title.length).toBeGreaterThan(0);
    expect(seen.has(head.title)).toBe(false);
    seen.add(head.title);

    expect(head.description).toBe(expectedDescription);
    expect(head.description!.length).toBeLessThanOrEqual(160);
    expect(head.canonical).toBe(expectedCanonical);
    // Indexable: no robots noindex directive.
    expect(head.robots ?? "").not.toContain("noindex");
  };

  it.each(Object.values(phaseData))(
    "first year phase %#: emits unique indexable metadata",
    async (config) => {
      renderPage(<FirstYearPhasePage config={config} />);
      await assertIndexable(
        `${BASE}/first-year/${config.slug}`,
        toMetaDescription(config.intro),
      );
    },
  );

  it.each(Object.values(toddlerAgeConfigs))(
    "toddler age %#: emits unique indexable metadata",
    async (config) => {
      renderPage(<ToddlerAgePage config={config} />);
      await assertIndexable(
        `${BASE}/toddler/${config.slug}`,
        toMetaDescription(config.standfirst),
      );
    },
  );
});

describe("toMetaDescription", () => {
  it("collapses whitespace and leaves short copy untouched", () => {
    expect(toMetaDescription("  A calm   line.\nStill calm. ")).toBe("A calm line. Still calm.");
  });

  it("trims to a whole word within the display budget", () => {
    const long = `${"word ".repeat(60)}end`;
    const result = toMetaDescription(long);
    expect(result.length).toBeLessThanOrEqual(155);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toContain("  ");
  });
});
