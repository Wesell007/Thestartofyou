import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import FamilyArticlePage from "@/components/family/article/FamilyArticlePage";
import { familyArticles } from "@/data/familyArticleData";
import SeoHead from "@/components/seo/SeoHead";

const FamilyArticle = () => {
  const { topic, slug } = useParams<{ topic: string; slug: string }>();
  const article = familyArticles.find(
    (a) => a.topic === topic && a.slug === slug
  );
  if (!article) return <NotFound />;

  const canonical = `https://thestartofyou.com/family/${article.topic}/${article.slug}`;
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
      <FamilyArticlePage article={article} />
    </>
  );
};

export default FamilyArticle;
