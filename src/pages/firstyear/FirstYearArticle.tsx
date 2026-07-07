import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import FirstYearArticlePage from "@/components/firstyear/article/FirstYearArticlePage";
import { firstYearArticles } from "@/data/firstYearArticleData";
import { FIRST_YEAR_TOPIC_INDEX, type FirstYearTopicSlug } from "@/data/firstYearTopicData";
import SeoHead from "@/components/seo/SeoHead";

const FirstYearArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = firstYearArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article) return <NotFound />;
  const topicMeta = FIRST_YEAR_TOPIC_INDEX[article.topic as FirstYearTopicSlug];
  const tone: "baby" | "recovery" =
    topicMeta?.side === "recovery" ? "recovery" : "baby";

  const canonical = `https://thestartofyou.com/first-year/${article.topic}/${article.slug}`;
  const title = article.seoTitle || `${article.title} | The Start of You`;
  const description = article.seoDescription || article.description;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    mainEntityOfPage: canonical,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "The Start of You",
      url: "https://thestartofyou.com",
    },
  };
  if (article.sources && article.sources.length > 0) {
    jsonLd.citation = article.sources.map((s) => s.url);
  }

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogType="article"
        jsonLd={jsonLd}
      />
      <FirstYearArticlePage article={article} tone={tone} />
    </>
  );
};

export default FirstYearArticle;
