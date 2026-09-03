import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import BreadcrumbJsonLd from "./BreadcrumbJsonLd";
import SeoHead from "./SeoHead";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

const items: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "First year", href: "/first-year" },
  { label: "Feeding in the first year", href: "/first-year/feeding" },
  { label: "Newborn feeding rhythms", href: "/first-year/feeding/newborn-feeding-rhythms" },
];

const readSchemas = () =>
  Array.from(document.head.querySelectorAll('script[type="application/ld+json"]')).map((node) =>
    JSON.parse(node.textContent ?? "{}"),
  );

const waitForSchemas = async (count: number) => {
  await waitFor(() => expect(readSchemas()).toHaveLength(count));
  return readSchemas();
};

afterEach(() => {
  cleanup();
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
});

describe("BreadcrumbJsonLd", () => {
  it("renders nothing for empty items", async () => {
    render(
      <HelmetProvider>
        <BreadcrumbJsonLd items={[]} />
      </HelmetProvider>,
    );
    await new Promise((r) => setTimeout(r, 20));
    expect(readSchemas()).toHaveLength(0);
  });

  it("emits exactly one BreadcrumbList with ordered, absolute, 1-based items", async () => {
    render(
      <HelmetProvider>
        <BreadcrumbJsonLd items={items} />
      </HelmetProvider>,
    );
    const schemas = await waitForSchemas(1);
    const breadcrumbLists = schemas.filter((s) => s["@type"] === "BreadcrumbList");
    expect(breadcrumbLists).toHaveLength(1);

    const list = breadcrumbLists[0];
    expect(list["@context"]).toBe("https://schema.org");
    expect(list.itemListElement.map((e: { position: number }) => e.position)).toEqual([1, 2, 3, 4]);
    expect(list.itemListElement.map((e: { name: string }) => e.name)).toEqual(
      items.map((i) => i.label),
    );
    expect(
      list.itemListElement.every((e: { item: string }) => e.item.startsWith("https://thestartofyou.com")),
    ).toBe(true);
    // the current page is the final ListItem
    expect(list.itemListElement.at(-1).item).toBe(
      "https://thestartofyou.com/first-year/feeding/newborn-feeding-rhythms",
    );
  });

  it("coexists with an existing Article schema without replacing it", async () => {
    render(
      <HelmetProvider>
        <>
          <SeoHead
            title="Newborn feeding rhythms"
            description="Calm guidance."
            canonical="https://thestartofyou.com/first-year/feeding/newborn-feeding-rhythms"
            jsonLd={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Newborn feeding rhythms",
            }}
          />
          <BreadcrumbJsonLd items={items} />
        </>
      </HelmetProvider>,
    );
    const schemas = await waitForSchemas(1);
    expect(schemas.filter((s) => s["@type"] === "Article")).toHaveLength(1);
    expect(schemas.filter((s) => s["@type"] === "BreadcrumbList")).toHaveLength(1);
    expect(schemas.find((s) => s["@type"] === "Article")?.headline).toBe("Newborn feeding rhythms");
  });

  it("escapes < so a label cannot terminate the script element", async () => {
    render(
      <HelmetProvider>
        <BreadcrumbJsonLd items={[{ label: "</script><b>x", href: "/x" }]} />
      </HelmetProvider>,
    );
    await waitForSchemas(1);

    const node = document.head.querySelector('script[type="application/ld+json"]');
    expect(node?.textContent).not.toContain("</script>");
    expect(JSON.parse(node?.textContent ?? "{}").itemListElement[0].name).toBe("</script><b>x");
  });
});
