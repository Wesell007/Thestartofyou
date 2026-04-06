import { Sprout, Heart, Moon, Sun } from "lucide-react";

const stages = [
  {
    icon: Sprout,
    label: "Early pregnancy",
    desc: "Capturing first thoughts, uncertainty, and quiet change",
    accent: "bg-sage/10 text-sage",
  },
  {
    icon: Heart,
    label: "Mid-pregnancy",
    desc: "Reflecting as things begin to feel more real and present",
    accent: "bg-stage-pregnancy/60 text-stage-pregnancy-accent",
  },
  {
    icon: Moon,
    label: "Late pregnancy",
    desc: "Slowing down, preparing, and holding onto the last stretch",
    accent: "bg-stage-postpartum/60 text-stage-postpartum-accent",
  },
  {
    icon: Sun,
    label: "After birth",
    desc: "Processing, adjusting, remembering, and finding yourself again",
    accent: "bg-stage-firstyear/60 text-stage-firstyear-accent",
  },
];

const ProductStages = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-12">
          <div className="editorial-rule mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug mb-4">
            Designed for every stage
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto leading-relaxed">
            The journal moves with you, from early pregnancy through the months after birth. Each stage has its own tone, its own prompts, and its own kind of space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stages.map((s) => (
            <div key={s.label} className="card-elevated p-6 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.accent}`}>
                <s.icon size={18} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-foreground mb-1.5">{s.label}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductStages;
