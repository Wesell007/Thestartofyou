import type { ArticleData } from "@/data/articleData";
import { Shield, Clock } from "lucide-react";

interface Props {
  data: ArticleData;
}

const ArticleTrustBar = ({ data }: Props) => {
  const hasReview = data.reviewedBy;
  const hasDate = data.lastUpdated;

  if (!hasReview && !hasDate) return null;

  return (
    <section className="bg-parchment pb-2">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 border-b border-border/30">
          {hasReview && (
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-sage/70" />
              <span className="font-sans text-[11px] font-light text-muted-foreground">
                Reviewed by {data.reviewedBy}
              </span>
            </div>
          )}
          {hasDate && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="font-sans text-[11px] font-light text-muted-foreground">
                Updated {data.lastUpdated}
              </span>
            </div>
          )}
          {data.isCornerstone && (
            <span className="px-2.5 py-1 rounded-full bg-sage/8 text-sage text-[10px] font-sans tracking-wide uppercase">
              Complete guide
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleTrustBar;
