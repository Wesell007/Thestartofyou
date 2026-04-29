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
  "weight-changes-in-pregnancy",
  "hospital-bag-and-what-to-pack",
  "preparing-emotionally-for-birth",
  "baby-movement-in-pregnancy",
  // Phase F — Body deepening
  "pelvic-pain-in-pregnancy",
  "round-ligament-pain",
  "braxton-hicks-contractions",
  "shortness-of-breath-in-pregnancy",
  "swelling-in-pregnancy",
  "heartburn-in-pregnancy",
  "constipation-in-pregnancy",
  "back-pain-in-pregnancy",
  // Phase G — Baby development, position, and scan deepening
  "anterior-placenta",
  "low-lying-placenta-in-pregnancy",
  "breech-baby",
  "reduced-movements-in-pregnancy",
  "baby-hiccups-in-the-womb",
  "measuring-big-or-small-in-pregnancy",
  "growth-scans-in-pregnancy",
  "cord-around-the-neck-in-pregnancy",
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
