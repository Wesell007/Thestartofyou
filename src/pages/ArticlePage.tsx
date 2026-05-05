import { useParams, Navigate } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import ArticleLegacyPage from "@/pages/ArticleLegacyPage";
import ArticleFlagshipTemplate from "@/components/article/flagship/ArticleFlagshipTemplate";

// Articles forced to legacy render path (none currently).
const LEGACY_FORCED_SLUGS = new Set<string>([]);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
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

  if (hasFlagshipShape && !LEGACY_FORCED_SLUGS.has(data.slug)) {
    return <ArticleFlagshipTemplate data={data} />;
  }

  // 2. Everything else continues on the existing deep template (unchanged).
  const hasMinimumDeepShape = !!data.quickAnswer;
  if (LEGACY_FORCED_SLUGS.has(data.slug) || !hasMinimumDeepShape) {
    return <ArticleLegacyPage data={data} />;
  }

  return <ArticleDeepTemplate data={data} />;
};

export default ArticlePage;
