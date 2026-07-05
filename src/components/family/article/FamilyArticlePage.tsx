import HubArticleView from "@/components/shared/HubArticleView";
import FamilyArticleCard from "@/components/family/article/FamilyArticleCard";
import {
  familyArticles,
  type FamilyArticle,
} from "@/data/familyArticleData";
import { FAMILY_TOPIC_INDEX, type FamilyTopicSlug } from "@/data/familyTopicData";

interface Props {
  article: FamilyArticle;
}

const FamilyArticlePage = ({ article }: Props) => {
  const topicMeta = FAMILY_TOPIC_INDEX[article.topic as FamilyTopicSlug];
  const related = (article.relatedSlugs ?? [])
    .map((slug) => familyArticles.find((a) => a.slug === slug))
    .filter((a): a is FamilyArticle => !!a);

  return (
    <HubArticleView
      article={article}
      tokens={{
        base: "--stage-family",
        soft: "--stage-family-soft",
        accent: "--stage-family-accent",
        deep: "--stage-family-deep",
      }}
      hubLabel="Family"
      hubHref="/family"
      topicLabel={topicMeta?.title ?? "Family"}
      topicHref={`/family/${article.topic}`}
      topicEyebrow={topicMeta?.eyebrow}
      relatedSlot={
        related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {related.map((a) => (
              <FamilyArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : null
      }
    />
  );
};

export default FamilyArticlePage;
