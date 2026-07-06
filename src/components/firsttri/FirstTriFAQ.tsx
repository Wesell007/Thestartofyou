import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "Is it normal not to have symptoms?",
    a: "Yes. Symptoms in early pregnancy vary enormously, and a quieter first trimester can be just as healthy as a difficult one. Some people feel almost nothing in the early weeks, especially before week 6, and symptoms can also come and go from day to day.",
  },
  {
    q: "When can I tell family and friends?",
    a: "There is no single right answer. Many people wait until after the 12-week scan, when miscarriage risk drops, but plenty share earlier with the people they want close. The right time is whenever you feel ready, not a fixed week.",
  },
  {
    q: "Can I exercise in the first trimester?",
    a: "Generally yes, if you exercised before pregnancy you can usually continue at a gentler pace. Walking, swimming, yoga and light strength work are all fine for most people. If you have any concerns, speak with your midwife or GP.",
  },
  {
    q: "What foods should I avoid?",
    a: "The main groups to avoid are unpasteurised dairy, raw or undercooked meat and seafood, certain soft and mould-ripened cheeses, pâté, liver, and high-mercury fish. Caffeine should be limited to around 200mg a day. The NHS has a full list worth checking.",
  },
  {
    q: "How much weight should I gain?",
    a: "Most people gain very little, sometimes nothing, in the first trimester. Some lose weight if nausea is heavy. Healthy total weight gain across pregnancy varies based on starting weight and is something your midwife will discuss with you, not something to track closely week by week.",
  },
  {
    q: "When will I feel better?",
    a: "For many people, the worst of the nausea and exhaustion eases between weeks 10 and 14, as hormone levels start to plateau. It isn't universal, and a small number of people continue to have symptoms longer, but most notice a real shift as the second trimester begins.",
  },
];

const FAQRow = ({ faq, defaultOpen = false }: { faq: FAQ; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-serif text-[1.05rem] sm:text-[1.15rem] text-foreground leading-snug group-hover:text-sage transition-colors">
          {faq.q}
        </span>
        <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border border-border/40 text-muted-foreground group-hover:border-sage/40 group-hover:text-sage transition-all">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      {open && (
        <p className="pb-6 pr-10 font-sans text-[14.5px] text-foreground/75 leading-relaxed">
          {faq.a}
        </p>
      )}
    </div>
  );
};

const FirstTriFAQ = () => {
  const left = faqs.slice(0, 3);
  const right = faqs.slice(3, 6);

  return (
    <section id="faqs" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="stage-label mb-3">Common questions</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3">
              Common questions in the first trimester
            </h2>
            <p className="font-sans text-[15px] text-foreground/70 leading-relaxed">
              Quick answers to the things you&rsquo;re asking now.
            </p>
          </div>
          <Link
            to="/pregnancy"
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors whitespace-nowrap"
          >
            See all FAQs
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          <div>
            {left.map((f, i) => (
              <FAQRow key={f.q} faq={f} defaultOpen={i === 0} />
            ))}
          </div>
          <div>
            {right.map((f) => (
              <FAQRow key={f.q} faq={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstTriFAQ;
