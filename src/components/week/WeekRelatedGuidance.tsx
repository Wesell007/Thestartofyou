import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { WeekData } from "@/data/weekData";
import nauseaImg from "@/assets/article-nausea.jpg";
import fatigueImg from "@/assets/article-fatigue.jpg";
import implantationImg from "@/assets/article-implantation.jpg";
import symptomsStoppingImg from "@/assets/article-symptoms-stopping.jpg";

interface RelatedArticle {
  slug: string;
  title: string;
  tag: string;
}

const articleImages: Record<string, string> = {
  "nausea-in-early-pregnancy": nauseaImg,
  "fatigue-in-early-pregnancy": fatigueImg,
  "implantation-bleeding": implantationImg,
  "pregnancy-symptoms-stopping": symptomsStoppingImg,
};

// Map week ranges to relevant article slugs + display metadata
const getRelatedArticles = (week: number): RelatedArticle[] => {
  if (week >= 1 && week <= 4) {
    return [
      { slug: "implantation-bleeding", title: "Implantation bleeding: what it is and when it happens", tag: "Early pregnancy" },
      { slug: "nausea-in-early-pregnancy", title: "Nausea in early pregnancy: why it happens and when it eases", tag: "Symptoms" },
    ];
  }
  if (week >= 5 && week <= 8) {
    return [
      { slug: "nausea-in-early-pregnancy", title: "Nausea in early pregnancy: why it happens and when it eases", tag: "Symptoms" },
      { slug: "fatigue-in-early-pregnancy", title: "Fatigue in early pregnancy: why it happens and what helps", tag: "Symptoms" },
      { slug: "implantation-bleeding", title: "Implantation bleeding: what it is and when it happens", tag: "Early pregnancy" },
    ];
  }
  if (week >= 9 && week <= 12) {
    return [
      { slug: "nausea-in-early-pregnancy", title: "Nausea in early pregnancy: why it happens and when it eases", tag: "Symptoms" },
      { slug: "fatigue-in-early-pregnancy", title: "Fatigue in early pregnancy: why it happens and what helps", tag: "Symptoms" },
      { slug: "pregnancy-symptoms-stopping", title: "Pregnancy symptoms stopping: what it means and when to seek support", tag: "Reassurance" },
    ];
  }
  if (week >= 13 && week <= 20) {
    return [
      { slug: "fatigue-in-early-pregnancy", title: "Fatigue in early pregnancy: why it happens and what helps", tag: "Symptoms" },
      { slug: "pregnancy-symptoms-stopping", title: "Pregnancy symptoms stopping: what it means and when to seek support", tag: "Reassurance" },
    ];
  }
  if (week >= 21 && week <= 27) {
    return [
      { slug: "fatigue-in-early-pregnancy", title: "Fatigue in early pregnancy: why it happens and what helps", tag: "Symptoms" },
      { slug: "pregnancy-symptoms-stopping", title: "Pregnancy symptoms stopping: what it means and when to seek support", tag: "Reassurance" },
    ];
  }
  return [
    { slug: "fatigue-in-early-pregnancy", title: "Fatigue in pregnancy: why it happens and what helps", tag: "Symptoms" },
    { slug: "pregnancy-symptoms-stopping", title: "Pregnancy symptoms stopping: what it means and when to seek support", tag: "Reassurance" },
  ];
};

interface Props {
  data: WeekData;
}

const WeekRelatedGuidance = ({ data }: Props) => {
  const articles = getRelatedArticles(data.week);

  return (
    <section className="bg-parchment py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">

        <div className="mb-10">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
            Guidance
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-2">
            Related guidance for this week
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-sm">
            Articles relevant to what you may be experiencing right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/20 hover:-translate-y-1 transition-all duration-500"
            >
              {articleImages[article.slug] && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={articleImages[article.slug]}
                    alt={article.title}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/80 mb-3">
                  {article.tag}
                </span>
                <h3 className="font-serif text-sm text-foreground leading-snug flex-1 mb-4 group-hover:text-sage transition-colors duration-300">
                  {article.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-2.5 transition-all duration-300">
                  Read more <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border/40">
          <Link
            to={data.trimesterPath}
            className="font-sans text-sm font-light text-sage-muted hover:text-sage transition-colors underline underline-offset-4"
          >
            Return to {data.trimesterLabel} overview →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WeekRelatedGuidance;
