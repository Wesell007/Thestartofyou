import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/data/articleData";

const GuidancePopularQuestions = () => {
  const questions = useMemo(() => {
    const qs: Array<{ question: string; slug: string; journey?: string }> = [];
    getAllArticles().forEach((a) => {
      a.faq?.slice(0, 1).forEach((f) => {
        qs.push({ question: f.question, slug: a.slug, journey: a.journey?.[0] });
      });
    });
    return qs.slice(0, 8);
  }, []);

  if (questions.length === 0) return null;

  return (
    <section className="relative bg-sage/[0.04] py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage/[0.03] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <p className="stage-label mb-3 sm:mb-4">Popular questions</p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
            Questions people ask most often
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Quick answers to the things on your mind right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12">
          {questions.map((q, i) => (
            <Link
              key={i}
              to={`/articles/${q.slug}`}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-border/30 hover:pl-1 transition-all"
            >
              <span className="font-serif text-[14px] sm:text-[15px] md:text-base text-foreground leading-snug group-hover:text-sage transition-colors">
                {q.question}
              </span>
              <span className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-3 sm:ml-4 shrink-0 font-serif text-lg">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/ask"
            className="inline-flex items-center gap-2 bg-sage/10 text-sage hover:bg-sage/15 px-6 py-3 rounded-full font-sans text-sm transition-colors"
          >
            Ask your own question <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidancePopularQuestions;
