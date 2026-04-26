import { Link } from "react-router-dom";
import type { ArticleData } from "@/data/articleData";

const TOPIC_LABELS: Record<string, string> = {
  body: "Your body in pregnancy",
  baby: "Your baby in pregnancy",
  feelings: "Your feelings in pregnancy",
  "health-and-safety": "Health and safety in pregnancy",
  "diet-and-exercise": "Diet and exercise in pregnancy",
  "preparing-for-baby": "Preparing for baby",
};

interface Props {
  data: ArticleData;
}

const ArticleTopicReturn = ({ data }: Props) => {
  const topicLabel = data.topic ? TOPIC_LABELS[data.topic] : null;
  const topicHref = data.topic ? `/pregnancy/${data.topic}` : null;

  return (
    <section className="bg-parchment py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 text-center">
          {topicLabel && topicHref && (
            <Link
              to={topicHref}
              className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
            >
              ← {topicLabel}
            </Link>
          )}
          {topicLabel && (
            <span className="hidden sm:inline text-foreground/30" aria-hidden="true">
              ·
            </span>
          )}
          <Link
            to="/pregnancy"
            className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
          >
            ← The Pregnancy Map
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleTopicReturn;
