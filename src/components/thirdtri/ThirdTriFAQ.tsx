import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "How much should my baby be moving?",
    a: "There isn't a fixed number to count to. What matters is the pattern that feels normal for your baby across the day. Movements often feel stronger and more recognisable in late pregnancy. If the pattern clearly changes, contact your midwife or maternity unit straight away, even if it has only just happened.",
  },
  {
    q: "Is it normal to feel so uncomfortable?",
    a: "Yes. The third trimester is genuinely demanding. Heaviness, pelvic pressure, back ache, breathlessness, and disrupted sleep are all common as the baby grows. None of it means you're doing anything wrong, it means the body is doing the work of the stage.",
  },
  {
    q: "When should I pack my hospital bag?",
    a: "Most people aim to have a bag ready by around 36 weeks, in case labour begins earlier than expected. There is no perfect packing list, the basics for you, your baby, and the journey home are usually enough. Doing it in stages tends to feel calmer than doing it all at once.",
  },
  {
    q: "How do I know if labour is starting?",
    a: "Early signs can include regular tightenings that get longer, stronger, and closer together, lower back pain that doesn't ease, a 'show', or your waters breaking. Many people have signs that come and go for a while before active labour. If you're unsure, your midwife or maternity unit would rather hear from you.",
  },
  {
    q: "Is it normal to feel emotional or unsettled now?",
    a: "Yes. Anticipation, fear, impatience, and a sense of being on the edge of something big can all sit together in the same week. Mixed feelings about birth and finishing pregnancy are part of arriving at the end. Talking to someone you trust often helps more than trying to push it away.",
  },
  {
    q: "When should I call my midwife or maternity unit?",
    a: "Reduced or changed baby movement, severe headaches, vision changes, sudden swelling, heavy bleeding, severe pain, contractions before 37 weeks, or anything that feels significantly different are all reasons to make contact. You don't need to be sure, you just need to ring.",
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

const ThirdTriFAQ = () => {
  const left = faqs.slice(0, 3);
  const right = faqs.slice(3, 6);

  return (
    <section id="faqs" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="stage-label mb-3">Common questions</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3">
              Common questions in the third trimester
            </h2>
            <p className="font-sans text-[15px] text-foreground/70 leading-relaxed">
              Quick answers to the things that often come up now.
            </p>
          </div>
          <Link
            to="/guidance"
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors whitespace-nowrap"
          >
            See all FAQs
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
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

export default ThirdTriFAQ;
