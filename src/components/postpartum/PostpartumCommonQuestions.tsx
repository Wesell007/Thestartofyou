import { Link } from "react-router-dom";

const questions = [
  { q: "How long does recovery take?", sub: "What to expect and when" },
  { q: "Is it normal to feel overwhelmed?", sub: "Emotional adjustment in the early weeks" },
  { q: "When will my baby sleep more?", sub: "Sleep patterns and development" },
  { q: "When will things feel easier?", sub: "The gradual shift into rhythm" },
];

const PostpartumCommonQuestions = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Guidance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Common questions during postpartum
          </h2>
        </div>

        <div className="divide-y divide-border/50">
          {questions.map((item, i) => (
            <Link
              key={i}
              to={`/ask?q=${encodeURIComponent(item.q)}`}
              className="group flex items-center justify-between py-6 hover:pl-2 transition-all"
            >
              <div className="flex flex-col gap-1">
                <p className="font-serif text-xl text-foreground leading-snug group-hover:text-sage transition-colors">
                  {item.q}
                </p>
                <p className="font-sans text-sm font-light text-muted-foreground">{item.sub}</p>
              </div>
              <span className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-6 shrink-0 font-serif text-2xl leading-none">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostpartumCommonQuestions;
