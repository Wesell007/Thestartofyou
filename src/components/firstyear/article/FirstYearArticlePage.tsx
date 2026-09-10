import { Link } from "react-router-dom";
import HubArticleView from "@/components/shared/HubArticleView";
import FirstYearArticleCard from "@/components/firstyear/article/FirstYearArticleCard";
import { getFirstYearArticleImages } from "@/components/firstyear/article/firstYearArticleImages";
import {
  firstYearArticles,
  type FirstYearArticle,
} from "@/data/firstYearArticleData";
import {
  FIRST_YEAR_TOPIC_INDEX,
  type FirstYearTopicSlug,
} from "@/data/firstYearTopicData";

interface Props {
  article: FirstYearArticle;
  tone: "baby" | "recovery";
}

const FirstYearArticlePage = ({ article, tone }: Props) => {
  const topicMeta = FIRST_YEAR_TOPIC_INDEX[article.topic as FirstYearTopicSlug];
  const related = (article.relatedSlugs ?? [])
    .map((slug) => firstYearArticles.find((a) => a.slug === slug))
    .filter((a): a is FirstYearArticle => !!a && a.status === "ready");

  const crossLinks = article.crossLinks ?? [];

  const base = tone === "recovery" ? "--stage-recovery" : "--stage-firstyear";
  const images = getFirstYearArticleImages(article.slug);

  return (
    <HubArticleView
      article={article}
      heroImage={images?.hero}
      bodyImages={images?.body}
      tokens={{
        base,
        soft: `${base}-soft`,
        accent: `${base}-accent`,
        deep: `${base}-deep`,
      }}
      hubLabel="First year"
      hubHref="/first-year"
      topicLabel={topicMeta?.title ?? "First year"}
      topicHref={`/first-year/${article.topic}`}
      topicEyebrow={topicMeta?.short}
      relatedSlot={
        related.length > 0 || crossLinks.length > 0 ? (
          <div className="space-y-6">
            {related.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {related.map((a) => (
                  <FirstYearArticleCard key={a.slug} article={a} tone={tone} />
                ))}
              </div>
            )}
            {crossLinks.length > 0 && (
              <ul className="flex flex-col gap-2">
                {crossLinks.map((link) => (
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
            )}
          </div>
        ) : null
      }
    />
  );
};

export default FirstYearArticlePage;
