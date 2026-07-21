import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import type { WeekQuestion } from "@/data/weekSupportContent";

interface Props {
  week: number;
  questions: WeekQuestion[];
}

const styles = {
  color: "hsl(var(--stage-pregnancy-accent))",
  accent: "hsl(var(--stage-pregnancy-accent))",
  chipBg: "hsl(var(--stage-pregnancy) / 0.5)",
  rowBg: "hsl(var(--stage-pregnancy) / 0.2)",
  border: "hsl(var(--stage-pregnancy-accent) / 0.22)",
  panelBg: "hsl(var(--stage-pregnancy) / 0.32)",
};

/**
 * Hub-style Common Questions for pregnancy week pages.
 * Matches the pattern used by PregnancyCommonQuestions: expandable rows with
 * a short answer, an optional Read link to a live article, and an Ask CTA
 * routing to /ask with stage + week + topic context.
 */
const WeekCommonQuestions = ({ week, questions }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!questions || questions.length === 0) return null;

  return (
    <section className="bg-parchment-dark/40 py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="h-px w-10"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
          />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Common questions at week {week}
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
          A short answer to start with. Then read more, or ask your own question for tailored guidance.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `week-${week}-q-panel-${i}`;
            const btnId = `week-${week}-q-btn-${i}`;
            return (
              <div
                key={`${item.q}-${i}`}
                className="rounded-[18px] border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: styles.border,
                  backgroundColor: isOpen ? styles.panelBg : styles.rowBg,
                }}
              >
                <div className="flex items-stretch gap-3 sm:gap-4">
                  <span
                    className="w-1 shrink-0"
                    style={{ backgroundColor: styles.accent }}
                    aria-hidden
                  />
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
                        borderColor: styles.border,
                        backgroundColor: styles.chipBg,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      aria-hidden
                    >
                      <ChevronDown size={14} style={{ color: styles.color }} />
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
                          style={{
                            backgroundColor: styles.accent,
                            color: "hsl(var(--card))",
                          }}
                        >
                          <BookOpen size={13} strokeWidth={1.9} />
                          {item.readMore.label}
                          <ArrowUpRight size={12} />
                        </Link>
                      )}
                      <Link
                        to={`/ask?stage=pregnancy&week=${week}&topic=${item.askTopic}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium border transition-all hover:-translate-y-[1px]"
                        style={{
                          borderColor: styles.border,
                          backgroundColor: "hsl(var(--card))",
                          color: styles.color,
                        }}
                      >
                        <Sparkles size={13} strokeWidth={1.9} />
                        Ask about this
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

export default WeekCommonQuestions;
