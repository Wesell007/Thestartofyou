import { Shield } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleQuickAnswer = ({ data }: Props) => {
  const isDeep = data.isCornerstone;

  return (
    <section className="relative bg-parchment">
      {/* Pull the card up into the hero */}
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl -mt-8 sm:-mt-10 md:-mt-14 relative z-20">
        <div className="bg-card border border-border/40 rounded-xl sm:rounded-2xl shadow-elevated px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
          <p className="stage-label mb-3">
            {isDeep ? 'At a glance' : 'Quick answer'}
          </p>
          <p className="font-sans text-base sm:text-[17px] font-light text-foreground leading-[1.75]">
            {data.quickAnswer}
          </p>

          {/* Medical trust */}
          {data.reviewedBy && (
            <div className="mt-4 pt-3 border-t border-border/20">
              <span className="flex items-center gap-1.5 font-sans text-[11px] font-light text-sage">
                <Shield className="w-3 h-3 text-sage/60" />
                Medically reviewed by {data.reviewedBy}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleQuickAnswer;
