import { useParams } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import ArticleLegacyPage from "@/pages/ArticleLegacyPage";
import ArticleFlagshipTemplate from "@/components/article/flagship/ArticleFlagshipTemplate";
import SeoHead from "@/components/seo/SeoHead";
import NotFound from "@/pages/NotFound";

// Articles forced to legacy render path (none currently).
const LEGACY_FORCED_SLUGS = new Set<string>([]);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <NotFound />;
  }

  // Flagship template is now the default for any article with the minimum
  // shape it expects. The 3 anchor articles render byte-identically; the rest
  // of the eligible library inherits the same layout, image rules and rhythm.
  const hasFlagshipShape =
    !!data.quickAnswer &&
    !!data.editorialSections &&
    data.editorialSections.length > 0 &&
    !!data.keyTakeaways &&
    data.keyTakeaways.length > 0;

  const hasMinimumDeepShape = !!data.quickAnswer;

  // ── Per-route SEO metadata (mounted once, before template dispatch) ──
  const canonical = `https://thestartofyou.com/articles/${data.slug}`;
  const title = `${data.title} | The Start of You`;
  const description =
    data.metaDescription ||
    data.quickAnswer ||
    "Calm, practical guidance from The Start of You.";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description,
    mainEntityOfPage: canonical,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "The Start of You",
      url: "https://thestartofyou.com",
    },
  };

  // Structured sources only — never emit plain string labels as citations.
  const citation = (data.sources ?? [])
    .map((source) => (typeof source === "string" ? null : source.url))
    .filter((url): url is string => Boolean(url));
  if (citation.length > 0) {
    jsonLd.citation = citation;
  }

  if (data.reviewedBy) {
    jsonLd.reviewedBy = { "@type": "Person", name: data.reviewedBy };
  }

  if (data.lastUpdated && ISO_DATE.test(data.lastUpdated)) {
    jsonLd.dateModified = data.lastUpdated;
  }

  const seo = (
    <SeoHead
      title={title}
      description={description}
      canonical={canonical}
      ogType="article"
      jsonLd={jsonLd}
    />
  );

  if (hasFlagshipShape && !LEGACY_FORCED_SLUGS.has(data.slug)) {
    return (
      <>
        {seo}
        <ArticleFlagshipTemplate data={data} />
      </>
    );
  }

  if (LEGACY_FORCED_SLUGS.has(data.slug) || !hasMinimumDeepShape) {
    return (
      <>
        {seo}
        <ArticleLegacyPage data={data} />
      </>
    );
  }

  return (
    <>
      {seo}
      <ArticleDeepTemplate data={data} />
    </>
  );
};

export default ArticlePage;
