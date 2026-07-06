import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "When will I feel the baby move?",
    a: "First movements are usually felt between weeks 16 and 22, often later for first pregnancies. They can feel like flutters, bubbles, or a soft tap, and they tend to become more recognisable over the following weeks.",
  },
  {
    q: "Is it normal not to feel movement yet?",
    a: "Yes. Early movements come and go, and the position of the placenta (especially an anterior placenta) can mean you feel them later than other people describe. Your midwife will talk through what to expect at each appointment.",
  },
  {
    q: "What happens at the 20-week scan?",
    a: "The 20-week anatomy scan checks how your baby is developing, including the heart, brain, spine, kidneys, and major bones. It also looks at the placenta and amniotic fluid. It is a detailed scan and usually takes around 30 minutes.",
  },
  {
    q: "Why is my body changing so quickly?",
    a: "The second trimester is a stage of rapid growth. Your bump becomes more visible as your uterus rises into the abdomen, and your skin, posture, and centre of gravity all begin to adapt. Most of this is healthy, expected, and gradual, even when it feels sudden.",
  },
  {
    q: "Is round ligament pain normal?",
    a: "Yes. Sharp, brief pulls on the sides of the lower abdomen are common as the ligaments supporting the uterus stretch. They tend to happen with sudden movement or position changes. Persistent or severe pain should always be raised with your midwife.",
  },
  {
    q: "Can anxiety still be high in the second trimester?",
    a: "Yes. Anxiety doesn't follow a tidy curve. The 20-week scan, body changes, and the shift to a more visible pregnancy can all bring new things to think about. Talking to someone you trust, or your midwife, often helps more than trying to push it away.",
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

const SecondTriFAQ = () => {
  const left = faqs.slice(0, 3);
  const right = faqs.slice(3, 6);

  return (
    <section id="faqs" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="stage-label mb-3">Common questions</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3">
              Common questions in the second trimester
            </h2>
            <p className="font-sans text-[15px] text-foreground/70 leading-relaxed">
              Quick answers to the things that often come up now.
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

export default SecondTriFAQ;
