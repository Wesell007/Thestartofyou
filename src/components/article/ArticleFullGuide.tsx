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
    <section className="bg-parchment py-16 sm:py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="relative bg-card border border-sage/10 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Accent edge */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-sage/40 via-sage/20 to-transparent" />

          <div className="px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 pl-8 sm:pl-10 md:pl-12">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-sage/50" />
              <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage">
                Full guide available
              </p>
            </div>

            <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug mb-2">
              {cornerstone.title}
            </h3>

            <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-[1.8] max-w-xl mb-6">
              {cornerstone.metaDescription}
            </p>

            <Link
              to={`/articles/${data.cornerstoneSlug}`}
              className="inline-flex items-center gap-2.5 font-sans text-sm font-medium text-primary-foreground bg-sage hover:opacity-90 rounded-full px-6 py-3 transition-opacity"
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
