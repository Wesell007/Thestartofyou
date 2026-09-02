export const SITE_ORIGIN = "https://thestartofyou.com";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function toAbsoluteUrl(href: string): string {
  const trimmed = (href ?? "").trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const path = trimmed.replace(/^\/+/, "");

  return path.length === 0 ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}/${path}`;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href),
    })),
  };
}
