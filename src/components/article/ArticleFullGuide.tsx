import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import { getArticle } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

/** Strong bridge module connecting a short article to its cornerstone deep guide. */
const ArticleFullGuide = ({ data }: Props) => {
  if (!data.cornerstoneSlug || data.isCornerstone) return null;

  const cornerstone = getArticle(data.cornerstoneSlug);
  if (!cornerstone) return null;

  const sectionCount = cornerstone.editorialSections?.length ?? 0;

  return (
    <section className="bg-parchment-dark py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
            Go deeper
          </p>
        </div>

        <div className="relative bg-card border border-border/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-soft">
          {/* Top accent gradient */}
          <div className="h-[3px] bg-gradient-to-r from-sage/30 via-sage/50 to-sage/30" />

          <div className="px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/8 text-sage text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                <BookOpen className="w-3 h-3" />
                Complete guide
              </span>
              {sectionCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-sans tracking-[0.12em] uppercase">
                  {sectionCount} sections
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
              {cornerstone.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-[1.8] max-w-xl mb-4">
              {cornerstone.metaDescription}
            </p>

            {/* What this guide covers */}
            {cornerstone.keyTakeaways && cornerstone.keyTakeaways.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-sage/60 mb-3">
                  What this guide covers
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {cornerstone.keyTakeaways.slice(0, 4).map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-sage/40 shrink-0" />
                      <span className="font-sans text-[12px] sm:text-[13px] font-light text-foreground/65 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              to={`/articles/${data.cornerstoneSlug}`}
              className="inline-flex items-center gap-2.5 font-sans text-sm font-medium text-primary-foreground bg-sage hover:opacity-90 rounded-full px-6 py-3 transition-opacity shadow-sm"
            >
              Read the complete guide
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleFullGuide;
