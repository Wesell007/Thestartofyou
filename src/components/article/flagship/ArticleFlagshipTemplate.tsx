import { Link } from "react-router-dom";
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
import ArticleContents from "@/components/article/ArticleContents";
import ArticleSources from "@/components/article/ArticleSources";
import ArticleRelatedReads from "@/components/article/ArticleRelatedReads";
import ArticleTopicReturn from "@/components/article/ArticleTopicReturn";
import ArticleIVFContext from "@/components/article/ArticleIVFContext";
import ReadingProgressBar from "@/components/shared/ReadingProgressBar";

interface Props {
  data: ArticleData;
}

const ArticleFlagshipTemplate = ({ data }: Props) => {
  const related = getRelatedArticles(data.slug, 3);
  const sections = data.editorialSections ?? [];

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <ReadingProgressBar />

      {/* Light IVF orientation strip — only renders for IVF-journey articles */}
      <ArticleIVFContext data={data} />

      {/* Opening — text left, image right */}
      <FlagshipHero data={data} />

      {/* Two-card row directly below hero */}
      <FlagshipSummaryRow data={data} />

      {/* Navigation lives in the summary row above — no second contents block */}



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
      {(data.crossLinks?.length ?? 0) > 0 && (
        <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl pb-4">
          <ul className="flex flex-col gap-2">
            {data.crossLinks?.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="font-sans text-[14px] font-light text-foreground/85 hover:text-foreground underline underline-offset-4 decoration-foreground/30"
                >
                  {link.label}
                </Link>
                {link.context && (
                  <span className="font-sans text-[13px] font-light text-muted-foreground">
                    {" "}
                    — {link.context}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ArticleTopicReturn data={data} />

      <Footer />
    </div>
  );
};

export default ArticleFlagshipTemplate;
