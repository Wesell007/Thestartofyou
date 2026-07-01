import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";

const questions = [
  { q: "When do symptoms start?", sub: "Understanding early pregnancy signals" },
  { q: "Is it normal to feel nothing?", sub: "On the absence of symptoms" },
  { q: "When does the first trimester end?", sub: "Trimester transitions explained" },
  { q: "Why do symptoms change week to week?", sub: "Variation is part of the process" },
  { q: "How accurate is my due date?", sub: "What the estimated date really means" },
];

const GuidanceAndQuestions = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
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
              Questions, answered with care.
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Browse questions many people ask during pregnancy, or ask your
              own — answers are shaped to your stage.
            </p>
          </div>

          {/* Right: questions list + AI bar */}
          <div className="md:col-span-3">
            <div className="mb-6">
              {questions.map((item, i) => (
                <Link
                  key={i}
                  to={`/ask?q=${encodeURIComponent(item.q)}&ctx=Pregnancy`}
                  className="group flex items-center justify-between py-4 sm:py-[18px] border-b transition-all hover:pl-1"
                  style={{ borderColor: 'hsl(var(--stage-pregnancy) / 0.4)' }}
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                      {item.q}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground/70">
                      {item.sub}
                    </p>
                  </div>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy) / 0.3)' }}
                  >
                    <ChevronRight
                      size={14}
                      style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.6)' }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* AI bar — same band, quieter framing */}
            <div className="pt-2">
              <p
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
              >
                Ask anything
              </p>
              <AISearchBar
                placeholder="Ask anything about your pregnancy…"
                suggestions={[
                  "Is it normal to feel this tired?",
                  "Why have my symptoms changed?",
                  "What should I be aware of?",
                ]}
                context="Pregnancy"
                stage="pregnancy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceAndQuestions;
