import HubArticleView from "@/components/shared/HubArticleView";
import FirstYearArticleCard from "@/components/firstyear/article/FirstYearArticleCard";
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

  const base = tone === "recovery" ? "--stage-recovery" : "--stage-firstyear";

  return (
    <HubArticleView
      article={article}
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
        related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {related.map((a) => (
              <FirstYearArticleCard key={a.slug} article={a} tone={tone} />
            ))}
          </div>
        ) : null
      }
    />
  );
};

export default FirstYearArticlePage;
