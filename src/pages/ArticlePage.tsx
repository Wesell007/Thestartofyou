import { useParams, Navigate } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import ArticleLegacyPage from "@/pages/ArticleLegacyPage";

// Articles that have NOT yet been authored against the unified deep template
// (no editorialSections, no standfirst). These continue to use the legacy
// render path so we don't break their structure. Every other article uses
// the premium deep template by default.
const LEGACY_FORCED_SLUGS = new Set<string>([]);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  // Default to the premium deep template across the whole article library.
  // Fallback to legacy ONLY if explicitly forced or the article truly has no
  // content the new template can render (no editorial sections AND no
  // quickAnswer). Most articles satisfy this.
  const hasMinimumDeepShape = !!data.quickAnswer;

  if (LEGACY_FORCED_SLUGS.has(data.slug) || !hasMinimumDeepShape) {
    return <ArticleLegacyPage data={data} />;
  }

  return <ArticleDeepTemplate data={data} />;
};

export default ArticlePage;
