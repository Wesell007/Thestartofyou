import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accent = "hsl(var(--stage-family-accent))";
const accentSoft = "hsl(var(--stage-family-accent) / 0.12)";
const accentMid = "hsl(var(--stage-family-accent) / 0.24)";
const accentBorder = "hsl(var(--stage-family-accent) / 0.28)";
const deep = "hsl(var(--stage-family-deep))";
const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";

const qa = [
  {
    q: "How do I know if we are ready for another baby?",
    a: "There is rarely a perfect moment. Most families weigh up sleep, energy, finances, space and how settled they feel with the child they already have. If the question keeps returning gently rather than anxiously, that's often a sign worth listening to — and it's also completely valid to sit with it a while longer.",
  },
  {
    q: "How do I help my child adjust to a new sibling?",
    a: "Prepare in small, honest ways rather than one big talk — mention the baby in everyday moments, keep a few things predictable, and protect small pockets of one-to-one time after the birth. Regression, clinginess and big feelings are all normal in the first few months and usually settle with steady, unhurried presence.",
  },
  {
    q: "How do we make family routines easier?",
    a: "Start with the two or three anchors that matter most — usually mornings, mealtimes and bedtime — and let the rest be flexible. Routines work better when they're a shape the day leans on rather than a schedule to enforce, and simple visual cues often help children more than reminders.",
  },
  {
    q: "How do I set boundaries with relatives?",
    a: "Boundaries land best when they're specific, kind and repeated calmly — a short sentence about what works for your family, without long justification. It's normal for the first few conversations to feel awkward; consistency is what makes them stick, not the perfect wording.",
  },
  {
    q: "How do we manage money stress as a family?",
    a: "Money stress often eases a little once it's out of your head and onto paper — even a simple monthly view of income, essentials and childcare helps. It's also worth naming it as a shared load with your partner rather than one person carrying it silently, and there's no shame in asking for help from a free money advice service.",
  },
  {
    q: "How do I feel less overwhelmed by family life?",
    a: "The overwhelm usually isn't one big thing — it's the stack of small ones. Try to lower the bar somewhere unimportant, protect one small window that's just yours, and let go of the idea that being organised will fix how heavy it feels. If it stays heavy for weeks, please speak to your GP.",
  },
];

const FamilyCommonQuestions = () => {
  return (
    <section className="py-24 md:py-28 bg-parchment">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="text-center mb-14 md:mb-16">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Common questions
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] leading-tight"
            style={{ color: deep }}
          >
            What parents quietly wonder
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {qa.map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="group/q relative rounded-[18px] border bg-parchment px-6 md:px-7 overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_-26px_rgba(70,50,20,0.3)] data-[state=open]:shadow-[0_22px_50px_-30px_rgba(70,50,20,0.32)]"
              style={{ borderColor: accentBorder }}
            >
              <span
                className="pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] rounded-r opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                style={{ background: accent }}
                aria-hidden
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-data-[state=open]/q:opacity-100 transition-opacity"
                style={{ background: accentSoft }}
                aria-hidden
              />
              <AccordionTrigger
                className="relative text-left font-serif text-[17px] md:text-[18px] py-5 hover:no-underline [&>svg]:text-[hsl(var(--stage-family-accent))]"
                style={{ color: deep }}
              >
                {q}
              </AccordionTrigger>
              <AccordionContent
                className="relative font-sans text-[15px] font-light leading-[1.7] pb-6 max-w-prose"
                style={{ color: deepSoft }}
              >
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FamilyCommonQuestions;
