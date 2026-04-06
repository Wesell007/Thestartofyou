import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/data/articleData";
import editorialImg from "@/assets/guidance-editorial-4.jpg";

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
    <section className="relative bg-parchment py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="md:flex md:gap-12 lg:gap-16">
          {/* Left — image + intro (sticky on desktop) */}
          <div className="md:w-[35%] shrink-0 mb-10 md:mb-0">
            <div className="md:sticky md:top-28">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-6 hidden md:block">
                <img
                  src={editorialImg}
                  alt="Couple looking at ultrasound"
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="editorial-rule-left mb-5" />
              <p className="stage-label mb-3">Popular questions</p>
              <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-tight mb-3">
                Questions parents ask most
              </h2>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
                Quick answers to the things on your mind right now.
              </p>

              <Link
                to="/ask"
                className="hidden md:inline-flex items-center gap-2 bg-sage/10 text-sage hover:bg-sage/15 px-5 py-2.5 rounded-full font-sans text-sm transition-colors mt-6"
              >
                Ask your own question <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right — questions list */}
          <div className="flex-1">
            <div className="divide-y divide-border/30">
              {questions.map((q, i) => (
                <Link
                  key={i}
                  to={`/articles/${q.slug}`}
                  className="group flex items-center justify-between py-5 sm:py-6 hover:pl-1 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <span className="font-sans text-[11px] text-muted-foreground/30 tabular-nums shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[14px] sm:text-[15px] md:text-base text-foreground leading-snug group-hover:text-sage transition-colors">
                      {q.question}
                    </span>
                  </div>
                  <span className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-3 shrink-0 font-serif text-lg">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <Link
              to="/ask"
              className="md:hidden inline-flex items-center gap-2 bg-sage/10 text-sage hover:bg-sage/15 px-5 py-2.5 rounded-full font-sans text-sm transition-colors mt-8"
            >
              Ask your own question <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidancePopularQuestions;
