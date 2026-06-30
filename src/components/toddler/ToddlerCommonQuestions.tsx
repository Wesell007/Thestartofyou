import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accent = "hsl(var(--stage-toddler-accent))";
const accentSoft = "hsl(var(--stage-toddler-accent) / 0.12)";
const accentMid = "hsl(var(--stage-toddler-accent) / 0.24)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.28)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

const qa = [
  { q: "Why is my toddler having so many tantrums?", a: "Tantrums are how a still-developing toddler brain handles feelings it can't yet put into words. They tend to peak between roughly 18 months and 3 years and aren't a sign of poor parenting. A calm presence, fewer words and a steady boundary usually help more than reasoning in the moment." },
  { q: "How much sleep does a toddler need?", a: "Most toddlers need around 11 to 14 hours across 24 hours, including naps. Between 12 and 18 months many drop to a single nap, and the daytime nap often fades between 3 and 4 years. If sleep is broken for weeks or your toddler seems persistently exhausted in the day, it's worth a word with your GP or health visitor." },
  { q: "Should I be worried about my toddler's speech?", a: "Children vary widely. By 18 months many toddlers have a handful of words; by around 2 years many are putting two words together. If your toddler has very few words by 18 months, doesn't seem to understand simple instructions, or you have a quiet worry, a speech and language referral through your GP or health visitor is reasonable — early input is helpful, not alarmist." },
  { q: "What do I do about picky eating?", a: "Picky eating is very common between 1 and 4 years and rarely affects growth. Offer the same food the family is eating, keep mealtimes short and pressure-free, and try not to become a short-order cook. If your toddler is losing weight, refusing whole food groups for a long stretch, or you're worried, mention it at a check-up." },
  { q: "When should we start potty training?", a: "There's no perfect age. Many toddlers show signs of readiness between 2 and 3 years — dry nappies for longer stretches, interest in the toilet, the ability to follow simple instructions and tell you they need to go. Starting once readiness is there usually goes more smoothly than starting by the calendar." },
  { q: "How do I stay patient when the toddler years feel relentless?", a: "The toddler stage is genuinely hard. Sleep is often broken, days are repetitive and feelings are loud. Lower the bar, protect small windows of rest, and let yourself feel the weight of it without judgement. If you feel low, persistently overwhelmed or detached, please speak to your GP — toddler-stage parental mental health is real and worth support." },
];

const ToddlerCommonQuestions = () => {
  return (
    <section className="py-24 md:py-28 bg-parchment">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: accentMid }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: accent }}>
            Common questions
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] leading-tight" style={{ color: deep }}>
            What parents quietly wonder
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {qa.map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="group/q relative rounded-[18px] border bg-parchment px-6 md:px-7 overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_-26px_rgba(70,40,20,0.3)] data-[state=open]:shadow-[0_22px_50px_-30px_rgba(70,40,20,0.32)]"
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
                className="relative text-left font-serif text-[17px] md:text-[18px] py-5 hover:no-underline [&>svg]:text-[hsl(var(--stage-toddler-accent))]"
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

export default ToddlerCommonQuestions;
