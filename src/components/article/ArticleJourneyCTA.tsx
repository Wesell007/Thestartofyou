import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const ArticleJourneyCTA = ({ data }: Props) => {
  return (
    <section className="relative bg-parchment-dark py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-sage-bg/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Continue
            </p>
            <div className="h-px w-8 bg-sage-light" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Continue your journey
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
            Get week-by-week guidance tailored to your stage of pregnancy.
          </p>
          <Link
            to="/pregnancy"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Start your journey
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleJourneyCTA;
