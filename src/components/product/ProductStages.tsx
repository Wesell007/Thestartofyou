import { Sprout, Heart, Moon, Sun } from "lucide-react";

const stages = [
  {
    icon: Sprout,
    label: "Early pregnancy",
    tone: "Uncertainty, first thoughts, quiet overwhelm",
    prompt: "What are you carrying that no one else can see?",
    accent: "border-t-2" as const,
    accentColor: "hsl(var(--sage))",
    iconClass: "bg-sage/10 text-sage",
  },
  {
    icon: Heart,
    label: "Mid-pregnancy",
    tone: "Things becoming real, identity shifting",
    prompt: "What feels different about you this week?",
    accent: "border-t-2" as const,
    accentColor: "hsl(var(--stage-pregnancy-accent))",
    iconClass: "bg-stage-pregnancy/60 text-stage-pregnancy-accent",
  },
  {
    icon: Moon,
    label: "Late pregnancy",
    tone: "Slowing down, preparing, the weight of waiting",
    prompt: "What do you want to remember about right now?",
    accent: "border-t-2" as const,
    accentColor: "hsl(var(--stage-postpartum-accent))",
    iconClass: "bg-stage-postpartum/60 text-stage-postpartum-accent",
  },
  {
    icon: Sun,
    label: "After birth",
    tone: "Adjusting, processing, finding yourself again",
    prompt: "What surprised you most about today?",
    accent: "border-t-2" as const,
    accentColor: "hsl(var(--stage-firstyear-accent))",
    iconClass: "bg-stage-firstyear/60 text-stage-firstyear-accent",
  },
];

const ProductStages = () => {
  return (
    <section className="relative bg-card py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-10">
          <div className="editorial-rule mb-5" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-snug mb-3">
            Every stage feels different. The journal knows that.
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Each section has its own tone, its own prompts, and its own kind of space, because what you need in week 8 is not what you need in month 4.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s) => (
            <div
              key={s.label}
              className="card-elevated p-5 flex flex-col"
              style={{ borderTopColor: s.accentColor, borderTopWidth: '2px' }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mb-4 ${s.iconClass}`}>
                <s.icon size={16} />
              </div>
              <h3 className="font-serif text-base text-foreground mb-1.5">{s.label}</h3>
              <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed mb-4">{s.tone}</p>
              <div className="mt-auto pt-4 border-t border-border/30">
                <p className="font-sans text-[10px] font-light tracking-wide uppercase text-muted-foreground/60 mb-1">Sample prompt</p>
                <p className="font-serif text-xs italic text-foreground leading-snug">{s.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductStages;
