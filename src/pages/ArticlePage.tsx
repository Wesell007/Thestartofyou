import { useParams, Navigate } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import ArticleDeepTemplate from "@/components/article/ArticleDeepTemplate";
import ArticleLegacyPage from "@/pages/ArticleLegacyPage";

// Per-article opt-in for the new unified deep template.
// Add a slug here once the article has been authored against the new template
// (topic, standfirst, hero, editorialSections). Remaining articles stay on the
// legacy render path until individually migrated.
const NEW_TEMPLATE_SLUGS = new Set<string>([
  "early-pregnancy-symptoms-explained",
  "implantation-bleeding",
  "complete-guide-morning-sickness",
  "foods-to-avoid-in-pregnancy",
  "tests-and-scans-in-pregnancy",
  "vaccinations-in-pregnancy",
  "medicines-in-pregnancy",
  "eating-well-in-pregnancy",
  "moving-your-body-in-pregnancy",
  "key-nutrients-in-pregnancy",
  "when-you-cant-face-food-in-pregnancy",
  "how-your-baby-develops-in-pregnancy",
  "twins-and-multiples-in-pregnancy",
  "the-space-your-baby-will-come-home-to",
  "sleep-in-pregnancy",
  "signs-of-labour",
  "stages-of-labour",
  "when-to-go-in-for-labour",
  "anxiety-in-pregnancy",
  "pregnancy-after-loss",
  "the-first-trimester-emotionally",
  "when-the-joy-doesnt-arrive-yet",
]);

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  if (NEW_TEMPLATE_SLUGS.has(data.slug)) {
    return <ArticleDeepTemplate data={data} />;
  }

  return <ArticleLegacyPage data={data} />;
};

export default ArticlePage;
