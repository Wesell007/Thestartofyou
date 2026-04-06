import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const questions = [
  {
    q: "When do symptoms start?",
    sub: "Understanding early pregnancy signals",
  },
  {
    q: "Is it normal to feel nothing?",
    sub: "On the absence of symptoms",
  },
  {
    q: "When does the first trimester end?",
    sub: "Trimester transitions explained",
  },
  {
    q: "Why do symptoms change week to week?",
    sub: "Variation is part of the process",
  },
];

const CommonQuestions = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14">
          {/* Left header */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              Guidance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Common questions about pregnancy
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Questions many people ask during pregnancy, answered with care.
            </p>
          </div>

          {/* Right questions */}
          <div className="md:col-span-3">
            <div className="divide-y" style={{ borderColor: 'hsl(var(--stage-pregnancy) / 0.5)' }}>
              {questions.map((item, i) => (
                <Link
                  key={i}
                  to={`/ask?q=${encodeURIComponent(item.q)}`}
                  className="group flex items-center justify-between py-5 first:pt-0 last:pb-0 hover:pl-1 transition-all"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-serif text-lg sm:text-xl text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                      {item.q}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground">
                      {item.sub}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors ml-4 shrink-0"
                    style={{ ['--tw-translate-x' as string]: '0' }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonQuestions;
