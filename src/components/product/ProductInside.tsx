import { PenLine, BookOpen, Sparkles, RotateCcw } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Thoughtful prompts",
    desc: "Stage-specific questions that meet you where you are, not where you should be",
  },
  {
    icon: BookOpen,
    title: "Open space",
    desc: "Room to write freely when the prompts are not enough and you need to say more",
  },
  {
    icon: Sparkles,
    title: "Gentle structure",
    desc: "Enough guidance to support you without ever making it feel like homework",
  },
  {
    icon: RotateCcw,
    title: "Built to revisit",
    desc: "A format designed to read back in weeks, months, or years and feel something again",
  },
];

const ProductInside = () => {
  return (
    <section className="relative bg-card py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-start">
          {/* Left heading */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="editorial-rule md:editorial-rule-left mb-5" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-snug">
              What you will find inside
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              Designed to feel thoughtful, not overwhelming. Every page has a purpose.
            </p>
          </div>

          {/* Right: feature list */}
          <div className="md:col-span-3 space-y-4">
            {features.map((f, i) => (
              <div key={f.title} className="flex items-start gap-4 bg-parchment/50 border border-border/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                  <f.icon size={15} className="text-sage" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">{f.title}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInside;
