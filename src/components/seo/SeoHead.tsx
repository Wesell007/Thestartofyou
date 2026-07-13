import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:url" content={resolvedOgUrl} />
      <meta property="og:type" content={ogType} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SeoHead;
