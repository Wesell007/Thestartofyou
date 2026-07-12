import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

interface QItem {
  q: string;
  answer: string;
  readMoreHref: string;
  readMoreLabel: string;
  askHref: string;
}

const questions: QItem[] = [
  {
    q: "Why is my toddler having so many tantrums?",
    answer:
      "Tantrums can happen when toddlers have big feelings they cannot yet manage. Tiredness, hunger, transitions, frustration and wanting independence can all play a part.",
    readMoreHref: "/toddler/behaviour-emotions/understanding-toddler-tantrums",
    readMoreLabel: "Read: understanding toddler tantrums",
    askHref: "/ask?stage=toddler&topic=tantrums",
  },
  {
    q: "How much sleep does a toddler need?",
    answer:
      "Toddler sleep can vary, and needs can shift with naps, growth, routines and development. It can help to look at the whole day rather than one night in isolation.",
    readMoreHref: "/toddler/sleep/toddler-sleep-rhythms",
    readMoreLabel: "Read: toddler sleep rhythms",
    askHref: "/ask?stage=toddler&topic=sleep",
  },
  {
    q: "Should I be worried about my toddler's speech?",
    answer:
      "Speech and communication can develop at different speeds, but your concern matters. If speech, understanding, hearing or interaction worries you, it is okay to ask for advice.",
    readMoreHref: "/toddler/speech-language/when-to-ask-about-speech-delay",
    readMoreLabel: "Read: when to ask about speech delay",
    askHref: "/ask?stage=toddler&topic=speech",
  },
  {
    q: "What do I do about picky eating?",
    answer:
      "Picky eating can be frustrating, but pressure often makes meals harder. Calm repetition, small choices and a steady routine can help mealtimes feel less tense.",
    readMoreHref: "/toddler/food-feeding/picky-eating-in-toddlers",
    readMoreLabel: "Read: picky eating in toddlers",
    askHref: "/ask?stage=toddler&topic=picky-eating",
  },
  {
    q: "When should we start potty training?",
    answer:
      "Potty learning is usually easier when your child shows readiness signs, not just when they reach a certain age. Interest, awareness and cooperation all matter.",
    readMoreHref: "/toddler/potty-learning/signs-your-child-may-be-ready-for-potty-training",
    readMoreLabel: "Read: signs of potty readiness",
    askHref: "/ask?stage=toddler&topic=potty-training",
  },
  {
    q: "How do I stay patient when the toddler years feel relentless?",
    answer:
      "The toddler years can ask a lot from parents. You do not need to be perfectly calm all the time. Small pauses, repair and support can help you get through hard moments.",
    readMoreHref: "/toddler/behaviour-emotions/helping-your-toddler-with-big-feelings",
    readMoreLabel: "Read: helping your toddler with big feelings",
    askHref: "/ask?stage=toddler&topic=parent-patience",
  },
];

const s = {
  color: "hsl(var(--stage-toddler-deep))",
  accent: "hsl(var(--stage-toddler-accent))",
  chipBg: "hsl(var(--stage-toddler-soft) / 0.55)",
  rowBg: "hsl(var(--stage-toddler-soft) / 0.18)",
  border: "hsl(var(--stage-toddler-accent) / 0.22)",
  panelBg: "hsl(var(--stage-toddler-soft) / 0.32)",
};

const ToddlerCommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-10" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.55)" }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          What parents quietly wonder.
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
          A short, honest answer to start with. Then read more, or ask your own question for personalised guidance.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `toddler-q-panel-${i}`;
            const btnId = `toddler-q-btn-${i}`;
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
                      <Link
                        to={item.readMoreHref}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12.5px] font-medium transition-all hover:-translate-y-[1px]"
                        style={{ backgroundColor: s.accent, color: "hsl(var(--card))" }}
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

export default ToddlerCommonQuestions;
