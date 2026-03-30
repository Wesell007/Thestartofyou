import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import { getArticle } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleFullGuide = ({ data }: Props) => {
  if (!data.cornerstoneSlug || data.isCornerstone) return null;

  const cornerstone = getArticle(data.cornerstoneSlug);
  if (!cornerstone) return null;

  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="relative bg-card/70 backdrop-blur-sm border border-sage/12 rounded-2xl overflow-hidden">
          {/* Accent edge */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sage/50 via-sage/20 to-transparent" />

          <div className="px-8 py-8 md:px-10 md:py-10 pl-10 md:pl-12">
            {/* Label */}
            <div className="flex items-center gap-2.5 mb-5">
              <BookOpen className="w-4 h-4 text-sage/60" />
              <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage">
                Full guide available
              </p>
            </div>

            {/* Cornerstone title */}
            <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-3">
              {cornerstone.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] max-w-xl mb-7">
              {cornerstone.metaDescription}
            </p>

            {/* Meta signals */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
              {cornerstone.inThisArticle && (
                <span className="font-sans text-[11px] font-light text-muted-foreground/60">
                  {cornerstone.inThisArticle.length} sections
                </span>
              )}
              {cornerstone.reviewedBy && (
                <span className="font-sans text-[11px] font-light text-muted-foreground/60">
                  Reviewed by {cornerstone.reviewedBy}
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              to={`/articles/${data.cornerstoneSlug}`}
              className="inline-flex items-center gap-2.5 font-sans text-sm font-medium text-white bg-sage hover:bg-sage-dark rounded-full px-6 py-3 transition-colors"
            >
              Read the complete guide
              <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleFullGuide;
