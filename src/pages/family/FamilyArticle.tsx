import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import FamilyArticlePage from "@/components/family/article/FamilyArticlePage";
import { familyArticles } from "@/data/familyArticleData";

const FamilyArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = familyArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article) return <NotFound />;
  return <FamilyArticlePage article={article} />;
};

export default FamilyArticle;
