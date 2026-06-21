import type { ArticleData } from "@/data/articleData";
import { getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleQuickAnswer from "@/components/article/ArticleQuickAnswer";
import ArticleHeroImage from "@/components/article/ArticleHeroImage";
import ArticleContents from "@/components/article/ArticleContents";
import ArticleTakeaways from "@/components/article/ArticleTakeaways";
import ArticleEditorialContent from "@/components/article/ArticleEditorialContent";
import ArticleNormalSignals from "@/components/article/ArticleNormalSignals";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import ArticleSources from "@/components/article/ArticleSources";
import ArticleRelatedReads from "@/components/article/ArticleRelatedReads";
import ArticleTopicReturn from "@/components/article/ArticleTopicReturn";
import ArticleIVFContext from "@/components/article/ArticleIVFContext";

interface Props {
  data: ArticleData;
}

const ArticleDeepTemplate = ({ data }: Props) => {
  const related = getRelatedArticles(data.slug, 3); // up to 3, never padded

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Opening sequence */}
      <ArticleHeader data={data} />
      <ArticleQuickAnswer data={data} variant="calm" />
      <ArticleHeroImage data={data} />
      <ArticleContents data={data} />
      <ArticleTakeaways data={data} />

      {/* Substance */}
      {data.editorialSections?.length ? (
        <ArticleEditorialContent sections={data.editorialSections} />
      ) : null}
      <ArticleNormalSignals data={data} />
      <ArticleFAQ data={data} variant="calm" />
      <ArticleSources data={data} />

      {/* Return */}
      {related.length > 0 && (
        <ArticleRelatedReads articles={related} variant="calm" />
      )}
      <ArticleTopicReturn data={data} />

      <Footer />
    </div>
  );
};

export default ArticleDeepTemplate;
