import type { ArticleData } from "@/data/articleData";
import { getRelatedArticles } from "@/data/articleData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlagshipHero from "./FlagshipHero";
import FlagshipSummaryRow from "./FlagshipSummaryRow";
import FlagshipKeyTakeawaysStrip from "./FlagshipKeyTakeawaysStrip";
import FlagshipEditorialSections from "./FlagshipEditorialSections";
import FlagshipNormalCheckPanel from "./FlagshipNormalCheckPanel";
import FlagshipFAQ from "./FlagshipFAQ";
import ArticleSources from "@/components/article/ArticleSources";
import ArticleRelatedReads from "@/components/article/ArticleRelatedReads";
import ArticleTopicReturn from "@/components/article/ArticleTopicReturn";
import ArticleIVFContext from "@/components/article/ArticleIVFContext";

interface Props {
  data: ArticleData;
}

const ArticleFlagshipTemplate = ({ data }: Props) => {
  const related = getRelatedArticles(data.slug, 3);
  const sections = data.editorialSections ?? [];

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Opening — text left, image right */}
      <FlagshipHero data={data} />

      {/* Two-card row directly below hero */}
      <FlagshipSummaryRow data={data} />

      {/* Slim key-takeaways strip — cards, not a list */}
      <FlagshipKeyTakeawaysStrip data={data} />

      {/* Substance — alternating image/text editorial modules */}
      {sections.length > 0 && (
        <FlagshipEditorialSections
          slug={data.slug}
          sections={sections}
          heroSrc={data.hero?.src}
        />
      )}

      {/* Single bordered card with two columns */}
      <FlagshipNormalCheckPanel data={data} />

      {/* Split FAQ */}
      <FlagshipFAQ data={data} />

      {/* Sources, related, return — preserved from existing system */}
      <ArticleSources data={data} />
      {related.length > 0 && (
        <ArticleRelatedReads articles={related} variant="calm" />
      )}
      <ArticleTopicReturn data={data} />

      <Footer />
    </div>
  );
};

export default ArticleFlagshipTemplate;
