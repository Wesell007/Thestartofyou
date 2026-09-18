import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, BookOpen } from "lucide-react";

interface QItem {
  q: string;
  answer: string;
  readMore?: { href: string; label: string };
}

const questions: QItem[] = [
  {
    q: "Are my early pregnancy symptoms normal?",
    answer:
      "Early pregnancy can bring nausea, tiredness, breast tenderness, cramps, bloating and changes that come and go. If pain, bleeding, sickness or anything else worries you, ask your midwife, GP or local service for advice.",
    readMore: { href: "/articles/early-pregnancy-symptoms-explained", label: "Read: early pregnancy symptoms" },
  },
  {
    q: "When should I feel my baby move?",
    answer:
      "Many people start noticing movements in the second trimester, but the pattern can feel different for every pregnancy. If your baby's movements reduce, change or worry you, ask your maternity unit or midwife for advice.",
    readMore: { href: "/articles/baby-movement-in-pregnancy", label: "Read: baby movement in pregnancy" },
  },
  {
    q: "What if I feel anxious during pregnancy?",
    answer:
      "Pregnancy can bring a lot of uncertainty, even when everything looks okay. If anxiety feels heavy, constant or hard to manage, it is okay to ask your midwife, GP or local service for support.",
    readMore: { href: "/articles/anxiety-in-pregnancy", label: "Read: anxiety in pregnancy" },
  },
  {
    q: "What happens at pregnancy scans and appointments?",
    answer:
      "Appointments and scans are there to check how you and your baby are doing, answer questions and plan care. It can help to write down anything you want to ask before you go.",
    readMore: { href: "/articles/tests-and-scans-in-pregnancy", label: "Read: tests and scans in pregnancy" },
  },
  {
    q: "When should I start preparing for birth?",
    answer:
      "Birth preparation can begin gently at any point. You do not need every detail decided at once. Learning about your options, preferences and support can help you feel more steady.",
    readMore: { href: "/articles/birth-preferences", label: "Read: birth preferences" },
  },
  {
    q: "When should I ask for help in pregnancy?",
    answer:
      "You do not need to know exactly what is wrong before asking. If bleeding, pain, movement, sickness, mood, swelling or anything else worries you, contact your midwife, GP, maternity unit or appropriate local service.",
  },
];

const s = {
  color: "hsl(var(--stage-pregnancy-accent))",
  accent: "hsl(var(--stage-pregnancy-accent))",
  chipBg: "hsl(var(--stage-pregnancy) / 0.5)",
  rowBg: "hsl(var(--stage-pregnancy) / 0.2)",
  border: "hsl(var(--stage-pregnancy-accent) / 0.22)",
  panelBg: "hsl(var(--stage-pregnancy) / 0.32)",
};

const PregnancyCommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-10" style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Questions during pregnancy
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-9 max-w-xl">
           A short answer to start with, with related guidance where it may help.
        </p>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `preg-q-panel-${i}`;
            const btnId = `preg-q-btn-${i}`;
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
                    <div>
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

export default PregnancyCommonQuestions;
