import { useEffect, useState } from "react";
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

interface IVFLastStage {
  slug: string;
  title: string;
  href: string;
}

interface Props {
  data: ArticleData;
}

const ArticleTopicReturn = ({ data }: Props) => {
  const isIVF = data.journey?.includes("ivf");
  const isTTC = !isIVF && data.journey?.includes("trying-to-conceive");
  const topicLabel = data.topic ? TOPIC_LABELS[data.topic] : null;
  const topicHref = data.topic ? `/pregnancy/${data.topic}` : null;

  const [ivfStage, setIvfStage] = useState<IVFLastStage | null>(null);

  useEffect(() => {
    if (!isIVF) return;
    try {
      const raw = sessionStorage.getItem("ivf:lastStage");
      if (raw) {
        const parsed = JSON.parse(raw) as IVFLastStage;
        if (parsed && parsed.slug && parsed.title && parsed.href) {
          setIvfStage(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, [isIVF]);

  return (
    <section className="bg-parchment py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 text-center">
          {isIVF ? (
            <>
              {ivfStage && (
                <>
                  <Link
                    to={ivfStage.href}
                    className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
                  >
                    ← Back to {ivfStage.title}
                  </Link>
                  <span className="hidden sm:inline text-foreground/30" aria-hidden="true">
                    ·
                  </span>
                </>
              )}
              <Link
                to="/ivf"
                className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
              >
                ← The IVF Journey
              </Link>
            </>
          ) : (
            <>
              {!isTTC && topicLabel && topicHref && (
                <Link
                  to={topicHref}
                  className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
                >
                  ← {topicLabel}
                </Link>
              )}
              {!isTTC && topicLabel && (
                <span className="hidden sm:inline text-foreground/30" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                to={isTTC ? "/trying-to-conceive" : "/pregnancy"}
                className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/70 hover:text-sage hover:underline underline-offset-4 transition-colors"
              >
                ← {isTTC ? "The TTC Guide" : "The Pregnancy Map"}
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleTopicReturn;
