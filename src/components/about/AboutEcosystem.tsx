import { ArrowRight } from "lucide-react";

const stages = [
  { label: "Trying to conceive", accent: "var(--stage-ttc-accent)" },
  { label: "IVF", accent: "var(--stage-ivf-accent)" },
  { label: "Pregnancy", accent: "var(--stage-pregnancy-accent)" },
  { label: "Postpartum", accent: "var(--stage-postpartum-accent)" },
  { label: "First year", accent: "var(--stage-firstyear-accent)" },
];

const layers = [
  { label: "Preparing for baby", desc: "Practical clarity without overwhelm" },
  { label: "Emotional support", desc: "Recognising and navigating difficult feelings" },
  { label: "Guided journal", desc: "A physical companion to the journey" },
  { label: "Tools and calculators", desc: "Due dates, ovulation, timelines" },
];

const AboutEcosystem = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-center leading-snug">
          A journey that grows with you
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground text-center mb-10 max-w-md mx-auto leading-relaxed">
          Five core stages connected into one experience. Supporting layers that sit alongside every step.
        </p>

        {/* Stage trail: connected line */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute top-4 left-6 right-6 h-px bg-border hidden md:block" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {stages.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center relative">
                <div
                  className="w-8 h-8 rounded-full border-2 bg-parchment flex items-center justify-center mb-2 relative z-10"
                  style={{ borderColor: `hsl(${s.accent.replace("var(", "").replace(")", "")})` }}
                >
                  <span className="font-serif text-xs text-foreground/70">{i + 1}</span>
                </div>
                <span className="font-sans text-xs font-light text-foreground leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting layers */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-6 bg-border" />
          <p className="stage-label">Supporting layers</p>
          <div className="h-px w-6 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10">
          {layers.map((l) => (
            <div key={l.label} className="card-elevated p-4 flex items-start gap-3">
              <ArrowRight size={14} className="text-sage mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-sans text-sm text-foreground">{l.label}</span>
                <p className="font-sans text-xs font-light text-muted-foreground">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-serif text-sm italic text-foreground/70 max-w-sm mx-auto text-center">
          Each stage connects. You are never starting over, just moving forward.
        </p>
      </div>
    </section>
  );
};

export default AboutEcosystem;
