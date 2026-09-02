import { describe, expect, it } from "vitest";
import { buildBreadcrumbJsonLd, toAbsoluteUrl, type BreadcrumbItem } from "./breadcrumbs";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "Your body", href: "/pregnancy/body" },
];

describe("toAbsoluteUrl", () => {
  it("maps the root path to the production origin", () => {
    expect(toAbsoluteUrl("/")).toBe("https://thestartofyou.com/");
  });

  it("joins nested relative paths without duplicate slashes", () => {
    expect(toAbsoluteUrl("//pregnancy/body")).toBe("https://thestartofyou.com/pregnancy/body");
    expect(toAbsoluteUrl("pregnancy/body")).toBe("https://thestartofyou.com/pregnancy/body");
  });

  it("passes absolute URLs through unchanged", () => {
    expect(toAbsoluteUrl("https://example.com/x")).toBe("https://example.com/x");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  const jsonLd = buildBreadcrumbJsonLd(items);

  it("emits a schema.org BreadcrumbList", () => {
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("BreadcrumbList");
  });

  it("numbers positions from 1 in visible order and preserves labels", () => {
    expect(jsonLd.itemListElement.map((entry) => entry.position)).toEqual([1, 2, 3]);
    expect(jsonLd.itemListElement.map((entry) => entry.name)).toEqual([
      "Home",
      "Pregnancy",
      "Your body",
    ]);
    expect(jsonLd.itemListElement.every((entry) => entry["@type"] === "ListItem")).toBe(true);
  });

  it("includes the current page with an absolute URL", () => {
    expect(jsonLd.itemListElement.map((entry) => entry.item)).toEqual([
      "https://thestartofyou.com/",
      "https://thestartofyou.com/pregnancy",
      "https://thestartofyou.com/pregnancy/body",
    ]);
  });
});
