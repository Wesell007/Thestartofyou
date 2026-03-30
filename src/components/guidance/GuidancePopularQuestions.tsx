import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "@/data/articleData";

const GuidancePopularQuestions = () => {
  const questions = useMemo(() => {
    const qs: Array<{ question: string; slug: string }> = [];
    getAllArticles().forEach((a) => {
      a.faq?.slice(0, 1).forEach((f) => {
        qs.push({ question: f.question, slug: a.slug });
      });
    });
    return qs.slice(0, 8);
  }, []);

  if (questions.length === 0) return null;

  return (
    <section className="bg-card/60 py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-14">
          <p className="stage-label mb-4">Popular questions</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            Questions people ask most often
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Quick answers to the things on your mind right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          {questions.map((q, i) => (
            <Link
              key={i}
              to={`/articles/${q.slug}`}
              className="group flex items-center justify-between py-4.5 border-b border-border/30 hover:pl-1 transition-all"
            >
              <span className="font-serif text-[15px] md:text-base text-foreground leading-snug group-hover:text-sage transition-colors">
                {q.question}
              </span>
              <span className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-4 shrink-0 font-serif text-lg">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/ask"
            className="inline-flex items-center gap-2 font-sans text-sm text-sage hover:text-sage-dark transition-colors"
          >
            Ask your own question <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidancePopularQuestions;
