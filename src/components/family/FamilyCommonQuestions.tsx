import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen } from "lucide-react";

interface QItem {
  q: string;
  answer: string;
  readMoreHref: string;
  readMoreLabel: string;
}

const questions: QItem[] = [
  {
    q: "How do I know if we are ready for another baby?",
    answer:
      "There may not be a perfect moment. It can help to look at your home rhythm, emotional capacity, support, finances and how your existing child may experience the change.",
    readMoreHref: "/family/growing-families/preparing-for-another-baby",
    readMoreLabel: "Read: preparing for another baby",
  },
  {
    q: "How do I help my child adjust to a new sibling?",
    answer:
      "Children can feel excited, unsure, jealous or proud all at once. Small preparation, predictable routines and gentle reassurance can help them feel included.",
    readMoreHref: "/family/growing-families/helping-your-child-adjust-to-a-new-sibling",
    readMoreLabel: "Read: helping your child adjust",
  },
  {
    q: "How do we make family routines easier?",
    answer:
      "Family routines do not need to be strict to be helpful. Simple repeatable steps can make mornings, evenings and busy days feel calmer.",
    readMoreHref: "/family/family-basics/building-family-routines",
    readMoreLabel: "Read: building family routines",
  },
  {
    q: "How do I set boundaries with relatives?",
    answer:
      "Boundaries can be kind and still be clear. It helps to decide what matters, use calm language and stay consistent when family expectations feel difficult.",
    readMoreHref: "/family/relationships/setting-boundaries-with-grandparents",
    readMoreLabel: "Read: setting boundaries with grandparents",
  },
  {
    q: "How do we manage money stress as a family?",
    answer:
      "Money stress can feel heavy, especially with childcare, food, travel and everyday costs. A calmer plan often starts with visibility, small choices and honest conversations.",
    readMoreHref: "/family/family-basics/managing-childcare-costs",
    readMoreLabel: "Read: managing childcare costs",
  },
  {
    q: "How do I feel less overwhelmed by family life?",
    answer:
      "Feeling overwhelmed does not mean you are failing. It may help to lower the pressure, share the load where possible and choose one small thing to make today easier.",
    readMoreHref: "/family/relationships/sharing-the-mental-load",
    readMoreLabel: "Read: sharing the mental load",
  },
];

const s = {
  color: "hsl(var(--stage-family-deep))",
  accent: "hsl(var(--stage-family-accent))",
  chipBg: "hsl(var(--stage-family-soft) / 0.55)",
  rowBg: "hsl(var(--stage-family-soft) / 0.18)",
  border: "hsl(var(--stage-family-accent) / 0.22)",
  panelBg: "hsl(var(--stage-family-soft) / 0.32)",
};

const FamilyCommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="family-questions" className="bg-parchment py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-10" style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.55)" }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          What parents quietly wonder.
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
          A short editorial answer to start with, followed by a relevant guide when you want to go deeper.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `family-q-panel-${i}`;
            const btnId = `family-q-btn-${i}`;
            return (
              <div
                key={i}
                className="rounded-[18px] border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: s.border,
                  backgroundColor: isOpen ? s.panelBg : s.rowBg,
                }}
              >
                <div className="flex items-stretch gap-3 sm:gap-4">
                  <span className="w-1 shrink-0" style={{ backgroundColor: s.accent }} aria-hidden />
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex items-center justify-between gap-4 flex-1 pr-4 sm:pr-5 py-4 sm:py-5 text-left"
                  >
                    <p className="font-serif text-base sm:text-lg text-foreground leading-snug min-w-0 flex-1">
                      {item.q}
                    </p>
                    <span
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-transform"
                      style={{
                        borderColor: s.border,
                        backgroundColor: s.chipBg,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      aria-hidden
                    >
                      <ChevronDown size={14} style={{ color: s.color }} />
                    </span>
                  </button>
                </div>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="pl-5 sm:pl-6 pr-4 sm:pr-5 pb-5 sm:pb-6"
                  >
                    <p
                      className="font-sans text-[14px] font-light leading-[1.7] mb-4"
                      style={{ color: "hsl(var(--foreground) / 0.85)" }}
                    >
                      {item.answer}
                    </p>
                    <div className="flex">
                      <Link
                        to={item.readMoreHref}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium transition-all hover:-translate-y-[1px]"
                        style={{ backgroundColor: s.accent, color: "hsl(var(--card))" }}
                      >
                        <BookOpen size={13} strokeWidth={1.9} />
                        {item.readMoreLabel}
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FamilyCommonQuestions;
