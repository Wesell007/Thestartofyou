import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ToddlerArticlePage from "@/components/toddler/article/ToddlerArticlePage";
import { toddlerArticles } from "@/data/toddlerArticleData";

const ToddlerArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = toddlerArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article) return <NotFound />;
  return <ToddlerArticlePage article={article} />;
};

export default ToddlerArticle;
