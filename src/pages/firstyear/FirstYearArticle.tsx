import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import FirstYearArticlePage from "@/components/firstyear/article/FirstYearArticlePage";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { FIRST_YEAR_TOPIC_INDEX, type FirstYearTopicSlug } from "@/data/firstYearTopicData";

const FirstYearArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = firstYearArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article) return <NotFound />;
  const topicMeta = FIRST_YEAR_TOPIC_INDEX[article.topic as FirstYearTopicSlug];
  const tone: "baby" | "recovery" =
    topicMeta?.side === "recovery" ? "recovery" : "baby";
  return <FirstYearArticlePage article={article} tone={tone} />;
};

export default FirstYearArticle;
