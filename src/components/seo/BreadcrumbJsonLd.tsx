import { Helmet } from "react-helmet-async";
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo/breadcrumbs";

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

/**
 * BreadcrumbList structured data for routes with an authoritative visible
 * breadcrumb trail (WC-3d).
 *
 * It is always fed the *same* BreadcrumbItem[] array that renders the visible
 * <Breadcrumbs />, so the schema hierarchy can never drift from the UI.
 * Mount it exactly once per route, at the level that owns the crumb array.
 */
const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Local, minimal safe serialisation: `<` is escaped so no breadcrumb label
  // can terminate the <script> element early.
  const serialised = JSON.stringify(buildBreadcrumbJsonLd(items)).replace(/</g, "\\u003c");

  return (
    <Helmet>
      <script type="application/ld+json" data-schema="breadcrumbs">
        {serialised}
      </script>
    </Helmet>
  );
};

export default BreadcrumbJsonLd;
