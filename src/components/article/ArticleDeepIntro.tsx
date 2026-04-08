import { BookOpen, Clock, Shield } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

/** Opening context block for deep/cornerstone articles. Sets expectations for the reading experience. */
const ArticleDeepIntro = ({ data }: Props) => {
  if (!data.isCornerstone) return null;

  const sectionCount = data.editorialSections?.length ?? 0;
  const estimatedMinutes = Math.max(8, sectionCount * 3 + 5);

  return (
    <section className="bg-parchment py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="border-l-2 border-sage/20 pl-6 sm:pl-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-sage/50" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage">
              Complete guide
            </p>
          </div>

          <p className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/75 leading-[1.85] mb-6 max-w-xl">
            This is a comprehensive guide covering everything you need to know about this topic. It goes deeper than a quick overview, with detailed explanations, practical guidance, and answers to the questions people most commonly ask.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-sans font-light text-muted-foreground/60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {estimatedMinutes} min read
            </span>
            {sectionCount > 0 && (
              <span>{sectionCount} sections</span>
            )}
            {data.reviewedBy && (
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                Reviewed by {data.reviewedBy}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDeepIntro;
