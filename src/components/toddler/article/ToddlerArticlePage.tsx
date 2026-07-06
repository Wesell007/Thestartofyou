import HubArticleView from "@/components/shared/HubArticleView";
import ToddlerArticleCard from "@/components/toddler/article/ToddlerArticleCard";
import {
  toddlerArticles,
  type ToddlerArticle,
} from "@/data/toddlerArticleData";
import {
  TODDLER_TOPIC_INDEX,
  type ToddlerTopicSlug,
} from "@/data/toddlerTopicData";

interface Props {
  article: ToddlerArticle;
}

const ToddlerArticlePage = ({ article }: Props) => {
  const topicMeta = TODDLER_TOPIC_INDEX[article.topic as ToddlerTopicSlug];
  const related = (article.relatedSlugs ?? [])
    .map((slug) => toddlerArticles.find((a) => a.slug === slug))
    .filter((a): a is ToddlerArticle => !!a && a.status === "ready");

  return (
    <HubArticleView
      article={article}
      tokens={{
        base: "--stage-toddler",
        soft: "--stage-toddler-soft",
        accent: "--stage-toddler-accent",
        deep: "--stage-toddler-deep",
      }}
      hubLabel="Toddler"
      hubHref="/toddler"
      topicLabel={topicMeta?.title ?? "Toddler"}
      topicHref={`/toddler/${article.topic}`}
      topicEyebrow={topicMeta?.eyebrow}
      relatedSlot={
        related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {related.map((a) => (
              <ToddlerArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : null
      }
    />
  );
};

export default ToddlerArticlePage;
