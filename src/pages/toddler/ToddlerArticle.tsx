import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import SeoHead from "@/components/seo/SeoHead";
import ToddlerArticlePage from "@/components/toddler/article/ToddlerArticlePage";
import { toddlerArticles } from "@/data/toddlerArticleData";

const ToddlerArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = toddlerArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article || article.status !== "ready") return <NotFound />;

  const canonical = `https://thestartofyou.com/toddler/${article.topic}/${article.slug}`;
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
      <ToddlerArticlePage article={article} />
    </>
  );
};

export default ToddlerArticle;
