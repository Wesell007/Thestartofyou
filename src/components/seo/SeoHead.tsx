import { Helmet } from "react-helmet-async";

type SeoHeadBaseProps = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  jsonLd?: Record<string, unknown>;
};

/** Indexable surface: a self-referencing canonical is mandatory. */
type SeoHeadIndexableProps = SeoHeadBaseProps & {
  canonical: string;
  noindex?: boolean;
};

/**
 * Deliberate non-canonical surface (404, retained legacy duplicates, private
 * account screens). Canonical may be omitted, but only together with
 * `noindex`, so an indexable page can never lose its canonical by accident.
 */
type SeoHeadNoindexProps = SeoHeadBaseProps & {
  canonical?: undefined;
  noindex: true;
};

type SeoHeadProps = SeoHeadIndexableProps | SeoHeadNoindexProps;

/**
 * Per-route head metadata. Each og:* tag renders exactly once, falling back
 * cleanly to title / description / canonical when its optional prop is omitted.
 */
const SeoHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogUrl,
  jsonLd,
  noindex = false,
}: SeoHeadProps) => {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedOgUrl = ogUrl ?? canonical;

  // Development guard: an indexable page must never ship without a canonical.
  if (import.meta.env.DEV && !canonical && !noindex) {
    console.error(
      `SeoHead: indexable page "${title}" is missing a canonical URL. Add a self-referencing canonical, or mark the surface noindex.`,
    );
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      {resolvedOgUrl ? <meta property="og:url" content={resolvedOgUrl} /> : null}
      <meta property="og:type" content={ogType} />
      {noindex ? <meta name="robots" content="noindex,follow" /> : null}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SeoHead;

