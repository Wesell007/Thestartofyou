import { useParams, Navigate } from "react-router-dom";
import { getArticle } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleQuickAnswer from "@/components/article/ArticleQuickAnswer";
import ArticleHowThisFeels from "@/components/article/ArticleHowThisFeels";
import ArticleWhatHappening from "@/components/article/ArticleWhatHappening";
import ArticleTiming from "@/components/article/ArticleTiming";
import ArticleRealExperience from "@/components/article/ArticleRealExperience";
import ArticleInterpretation from "@/components/article/ArticleInterpretation";
import ArticleNormal from "@/components/article/ArticleNormal";
import ArticleAction from "@/components/article/ArticleAction";
import ArticleWhatNext from "@/components/article/ArticleWhatNext";
import ArticleRelatedStage from "@/components/article/ArticleRelatedStage";
import ArticleAISupport from "@/components/article/ArticleAISupport";
import ArticleCapture from "@/components/article/ArticleCapture";
import ArticleJourneyCTA from "@/components/article/ArticleJourneyCTA";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = getArticle(slug ?? "");

  if (!data) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <ArticleHero data={data} />
      <ArticleQuickAnswer data={data} />
      <ArticleHowThisFeels data={data} />
      <ArticleWhatHappening data={data} />
      <ArticleTiming data={data} />
      <ArticleRealExperience data={data} />
      <ArticleInterpretation data={data} />
      <ArticleNormal data={data} />
      <ArticleAction data={data} />
      <ArticleWhatNext data={data} />
      <ArticleRelatedStage data={data} />
      <ArticleAISupport data={data} />
      <ArticleCapture data={data} />
      <ArticleJourneyCTA data={data} />
      <Footer />
    </div>
  );
};

export default ArticlePage;
