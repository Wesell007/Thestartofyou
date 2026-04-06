import { PenLine, BookOpen, Sparkles, RotateCcw } from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Thoughtful prompts",
    desc: "Stage-specific questions that meet you where you are",
  },
  {
    icon: BookOpen,
    title: "Open space",
    desc: "Room to write freely, without structure or expectation",
  },
  {
    icon: Sparkles,
    title: "Gentle guidance",
    desc: "Enough structure to support you, never enough to pressure you",
  },
  {
    icon: RotateCcw,
    title: "Built to revisit",
    desc: "A format you can return to and read back weeks, months, or years later",
  },
];

const ProductInside = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-12">
          <div className="editorial-rule mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-snug">
            What you will find inside
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="bg-card/80 border border-border/30 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                <f.icon size={16} className="text-sage" />
              </div>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1">{f.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInside;
