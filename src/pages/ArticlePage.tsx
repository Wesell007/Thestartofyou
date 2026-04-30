import { useParams, Navigate } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import ArticleLegacyPage from "@/pages/ArticleLegacyPage";
import ArticleFlagshipTemplate from "@/components/article/flagship/ArticleFlagshipTemplate";
import { isFlagshipSlug } from "@/components/article/flagship/flagshipImageMap";

// Articles that have NOT yet been authored against the unified deep template.
const LEGACY_FORCED_SLUGS = new Set<string>([]);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  // 1. Locked flagship reference set — only these 3 slugs use the new template.
  if (isFlagshipSlug(data.slug)) {
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
