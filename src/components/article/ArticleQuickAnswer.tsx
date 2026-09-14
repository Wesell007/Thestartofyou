import type { ArticleData } from "@/data/articleData";
import MedicalReviewClaim from "@/components/shared/MedicalReviewClaim";
import { hasReviewClaim, reviewSurfaceKey } from "@/lib/reviewClaims";

interface Props {
  data: ArticleData;
  variant?: "legacy" | "calm";
}

const ArticleQuickAnswer = ({ data, variant = "legacy" }: Props) => {
  const isDeep = data.isCornerstone;

  if (variant === "calm") {
    return (
      <section className="bg-parchment pt-2 sm:pt-3 md:pt-4 pb-2">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
          <div className="bg-card border border-border/40 rounded-xl sm:rounded-2xl px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted mb-3">
              At a glance
            </p>
            <p className="font-sans text-base sm:text-[17px] font-light text-foreground leading-[1.75]">
              {data.quickAnswer}
            </p>

            {hasReviewClaim(reviewSurfaceKey("article", data.slug)) && (
              <div className="mt-4 pt-3 border-t border-border/20">
                <MedicalReviewClaim contentKey={reviewSurfaceKey("article", data.slug)} />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── legacy variant (unchanged) ──
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

          {hasReviewClaim(reviewSurfaceKey("article", data.slug)) && (
            <div className="mt-4 pt-3 border-t border-border/20">
              <MedicalReviewClaim contentKey={reviewSurfaceKey("article", data.slug)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleQuickAnswer;
