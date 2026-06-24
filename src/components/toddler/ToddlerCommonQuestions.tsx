import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const qa = [
  {
    q: "Why is my toddler having so many tantrums?",
    a: "Tantrums are how a toddler's still-developing brain handles big feelings it can't yet put into words. They peak between roughly 18 months and 3 years and are not a sign of poor parenting. A calm presence, fewer words and a steady boundary tend to help more than reasoning in the moment.",
  },
  {
    q: "How much sleep does a toddler need?",
    a: "Most toddlers need around 11 to 14 hours across 24 hours, including naps. Between 12 and 18 months many drop to one nap, and the daytime nap often fades between 3 and 4 years. If sleep is broken for weeks or your toddler seems exhausted in the day, it's worth speaking to your GP or health visitor.",
  },
  {
    q: "Should I be worried about my toddler's speech?",
    a: "Children vary widely. By 18 months many toddlers have a handful of words; by 2 years many are putting two words together. If your toddler has few or no words by 18 months, seems not to understand simple instructions, or you have a quiet worry, a speech and language referral via your GP or health visitor is reasonable — early input is helpful and not alarming.",
  },
  {
    q: "What do I do about picky eating?",
    a: "Picky eating is extremely common between 1 and 4 years and rarely affects growth. Offer the same food the family is eating, keep mealtimes short and pressure-free, and try not to become a short-order cook. If your toddler is losing weight, refusing whole food groups for long periods or you're worried, mention it at a check-up.",
  },
  {
    q: "When should we start potty training?",
    a: "There's no perfect age. Most children show signs of readiness between 2 and 3 years — dry nappies for longer stretches, interest in the toilet, the ability to follow simple instructions and tell you they need to go. Starting when readiness is there usually goes more smoothly than starting by the calendar.",
  },
  {
    q: "How do I stay patient when the toddler years feel relentless?",
    a: "The toddler stage is genuinely hard. Sleep is often interrupted, days are repetitive and emotions are loud. Lower the bar, protect small windows of rest, and let yourself feel the weight of it without judgement. If you feel low, persistently overwhelmed or detached, please speak to your GP — toddler-stage parental mental health is real and worth support.",
  },
];

const ToddlerCommonQuestions = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="text-center mb-12 md:mb-14">
          <p
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            Common questions
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            What parents quietly wonder
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {qa.map(({ q, a }, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="rounded-2xl border bg-parchment px-6 md:px-7"
              style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.2)" }}
            >
              <AccordionTrigger
                className="text-left font-serif text-[17px] md:text-lg py-5 hover:no-underline"
                style={{ color: "hsl(var(--stage-toddler-deep))" }}
              >
                {q}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-[15px] font-light text-foreground/70 leading-relaxed pb-6">
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
