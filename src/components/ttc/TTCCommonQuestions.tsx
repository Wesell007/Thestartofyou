import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

interface QItem {
  q: string;
  answer: string;
  readMore?: { href: string; label: string };
  askHref: string;
}

const questions: QItem[] = [
  {
    q: "When am I most fertile?",
    answer:
      "Your most fertile days are usually the days leading up to ovulation and the day of ovulation itself. Cycle tracking can help you notice your own pattern over time.",
    readMore: { href: "/articles/fertile-window", label: "Read: the fertile window" },
    askHref: "/ask?stage=ttc&topic=fertile-window",
  },
  {
    q: "How do I track my cycle without feeling obsessed?",
    answer:
      "Tracking can be helpful, but it does not need to take over your life. Choose one or two signs that feel manageable and give yourself space from constant checking.",
    askHref: "/ask?stage=ttc&topic=cycle-tracking",
  },
  {
    q: "When should I take a pregnancy test?",
    answer:
      "Testing too early can make the wait feel harder. Many people get clearer results after a missed period, but timing depends on your cycle and the type of test.",
    readMore: { href: "/articles/when-to-take-a-pregnancy-test", label: "Read: when to take a pregnancy test" },
    askHref: "/ask?stage=ttc&topic=pregnancy-tests",
  },
  {
    q: "How do I cope with the two-week wait?",
    answer:
      "The two-week wait can feel emotionally intense because there is so much uncertainty. Gentle routines, fewer repeated checks and support can help the days feel more manageable.",
    readMore: { href: "/articles/two-week-wait", label: "Read: the two-week wait" },
    askHref: "/ask?stage=ttc&topic=two-week-wait",
  },
  {
    q: "When should I ask for fertility help?",
    answer:
      "It is okay to ask for advice if you are worried, have irregular cycles, known health concerns or have been trying for a while. Your GP or local service can guide you on next steps.",
    readMore: { href: "/articles/how-long-to-try-before-getting-help", label: "Read: when to ask for help" },
    askHref: "/ask?stage=ttc&topic=when-to-ask-help",
  },
  {
    q: "When should we start thinking about IVF?",
    answer:
      "IVF may become part of the conversation after tests, treatment advice or a longer time trying. It is okay to learn about it gently before you know whether it is your next step.",
    readMore: { href: "/ivf", label: "Explore IVF guidance" },
    askHref: "/ask?stage=ttc&topic=ivf-next-step",
  },
];

const s = {
  color: "hsl(var(--stage-ttc-accent))",
  accent: "hsl(var(--stage-ttc-accent))",
  chipBg: "hsl(var(--stage-ttc) / 0.7)",
  rowBg: "hsl(var(--stage-ttc) / 0.25)",
  border: "hsl(var(--stage-ttc-accent) / 0.22)",
  panelBg: "hsl(var(--stage-ttc) / 0.4)",
};

const TTCCommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-10" style={{ backgroundColor: "hsl(var(--stage-ttc-accent) / 0.55)" }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Questions while trying to conceive
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
          A short answer to start with. Then read more, or ask your own question for personalised guidance.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `ttc-q-panel-${i}`;
            const btnId = `ttc-q-btn-${i}`;
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
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {item.readMore && (
                        <Link
                          to={item.readMore.href}
                          className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium transition-all hover:-translate-y-[1px]"
                          style={{ backgroundColor: s.accent, color: "hsl(var(--card))" }}
                        >
                          <BookOpen size={13} strokeWidth={1.9} />
                          {item.readMore.label}
                          <ArrowUpRight size={12} />
                        </Link>
                      )}
                      <Link
                        to={item.askHref}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium border transition-all hover:-translate-y-[1px]"
                        style={{
                          borderColor: s.border,
                          backgroundColor: "hsl(var(--card))",
                          color: s.color,
                        }}
                      >
                        <Sparkles size={13} strokeWidth={1.9} />
                        Ask more
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

export default TTCCommonQuestions;
