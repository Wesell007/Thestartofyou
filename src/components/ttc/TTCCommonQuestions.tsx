import { Link } from "react-router-dom";

const questions = [
  {
    q: "When am I most fertile?",
    sub: "Understanding your fertile window",
  },
  {
    q: "How do I know if I'm ovulating?",
    sub: "Signs and tracking methods explained",
  },
  {
    q: "How long does it usually take to get pregnant?",
    sub: "Timelines and what to expect",
  },
  {
    q: "When should I take a test?",
    sub: "Testing timing and accuracy",
  },
];

const TTCCommonQuestions = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Guidance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Common questions about trying to conceive
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
                <p className="font-sans text-sm font-light text-muted-foreground">
                  {item.sub}
                </p>
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

export default TTCCommonQuestions;
