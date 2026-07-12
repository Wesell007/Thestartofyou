import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

type Track = "baby" | "recovery";

interface QItem {
  q: string;
  answer: string;
  readMoreHref: string;
  readMoreLabel: string;
  askHref: string;
  track: Track;
}

const questions: QItem[] = [
  {
    q: "Is my baby's sleep pattern normal at this age?",
    answer:
      "Baby sleep changes a lot in the first year and often does not follow one perfect pattern. Naps, wakings and night sleep shift with growth, feeding and development.",
    readMoreHref: "/first-year/sleep/newborn-sleep-expectations",
    readMoreLabel: "Read: newborn sleep expectations",
    askHref: "/ask?stage=first-year",
    track: "baby",
  },
  {
    q: "How long is bleeding supposed to last?",
    answer:
      "Bleeding after birth can vary from person to person. If it becomes heavy, changes suddenly or worries you, it is always okay to ask your midwife, GP or local service.",
    readMoreHref: "/first-year/postpartum-recovery/healing-after-birth",
    readMoreLabel: "Read: healing after birth",
    askHref: "/ask?stage=recovery",
    track: "recovery",
  },
  {
    q: "Should I be worried about a milestone?",
    answer:
      "Babies develop at different speeds and rarely in a straight line. If something feels different or worrying, it is always okay to ask your health visitor or GP.",
    readMoreHref: "/first-year/development/when-milestones-feel-uneven",
    readMoreLabel: "Read: when milestones feel uneven",
    askHref: "/ask?stage=first-year",
    track: "baby",
  },
  {
    q: "Is what I'm feeling baby blues or something more?",
    answer:
      "Emotions can feel very intense after birth. If your mood, anxiety or ability to cope worries you, asking for support early is a good step, not a sign that anything is wrong with you.",
    readMoreHref: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
    readMoreLabel: "Read: when parenthood feels heavy",
    askHref: "/ask?stage=recovery",
    track: "recovery",
  },
  {
    q: "Why has feeding suddenly changed?",
    answer:
      "Feeding can shift with growth, sleep, illness, supply, routine and development. If nappies, weight, feeding pain or your baby's wellbeing worries you, it is okay to ask for advice.",
    readMoreHref: "/first-year/feeding/newborn-feeding-rhythms",
    readMoreLabel: "Read: newborn feeding rhythms",
    askHref: "/ask?stage=first-year",
    track: "baby",
  },
  {
    q: "When will I feel like myself again?",
    answer:
      "There is no fixed timeline. Recovery, sleep, hormones, identity and the support around you all shape how you feel in the months after birth.",
    readMoreHref: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
    readMoreLabel: "Read: feeling like yourself again",
    askHref: "/ask?stage=recovery",
    track: "recovery",
  },
];

const trackStyle = (t: Track) =>
  t === "baby"
    ? {
        color: "hsl(var(--stage-firstyear-deep))",
        accent: "hsl(var(--stage-firstyear-accent))",
        chipBg: "hsl(var(--stage-firstyear-soft) / 0.55)",
        rowBg: "hsl(var(--stage-firstyear-soft) / 0.18)",
        border: "hsl(var(--stage-firstyear-accent) / 0.22)",
        panelBg: "hsl(var(--stage-firstyear-soft) / 0.32)",
        label: "Baby",
      }
    : {
        color: "hsl(var(--stage-recovery-deep))",
        accent: "hsl(var(--stage-recovery-accent))",
        chipBg: "hsl(var(--stage-recovery-soft) / 0.55)",
        rowBg: "hsl(var(--stage-recovery-soft) / 0.16)",
        border: "hsl(var(--stage-recovery-accent) / 0.22)",
        panelBg: "hsl(var(--stage-recovery-soft) / 0.30)",
        label: "You",
      };

const FYCommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-firstyear-accent) / 0.55)" }} />
          <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-recovery-accent) / 0.55)" }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Questions parents actually ask.
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
          A short, honest answer to start with. Then read more, or ask your own question for personalised guidance.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const s = trackStyle(item.track);
            const isOpen = openIndex === i;
            const panelId = `fy-q-panel-${i}`;
            const btnId = `fy-q-btn-${i}`;
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
                  <span
                    className="w-1 shrink-0"
                    style={{ backgroundColor: s.accent }}
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
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span
                        className="font-sans text-[10px] font-light tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 mt-1"
                        style={{ color: s.color, backgroundColor: s.chipBg, borderColor: s.border }}
                      >
                        {s.label}
                      </span>
                      <p className="font-serif text-base sm:text-lg text-foreground leading-snug min-w-0">
                        {item.q}
                      </p>
                    </div>
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
                      <Link
                        to={item.readMoreHref}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium transition-all hover:-translate-y-[1px]"
                        style={{
                          backgroundColor: s.accent,
                          color: "hsl(var(--card))",
                        }}
                      >
                        <BookOpen size={13} strokeWidth={1.9} />
                        {item.readMoreLabel}
                        <ArrowUpRight size={12} />
                      </Link>
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

export default FYCommonQuestions;
