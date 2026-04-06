import { Compass, Filter, Heart, Layers } from "lucide-react";

const principles = [
  { icon: Compass, title: "Meets you where you are", desc: "Guidance shaped around your stage, not a generic content feed." },
  { icon: Filter, title: "Reduces noise", desc: "Only what matters right now. Nothing that pulls you ahead or adds pressure." },
  { icon: Heart, title: "Emotional and practical", desc: "Real feelings alongside real information, because both shape the experience." },
  { icon: Layers, title: "Connected, not scattered", desc: "Tools, guidance, support, and reflection work together as one system." },
];

const AboutApproach = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-center leading-snug">
          So we built something different
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto text-center mb-12">
          Instead of more content, we created a structured system that guides you through each stage with clarity, warmth, and purpose.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {principles.map((p) => (
            <div key={p.title} className="card-elevated p-6 flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <p.icon size={16} className="text-sage" />
              </div>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1">{p.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-serif text-sm italic text-foreground/80 mt-12 text-center">
          You don't need more information. You need the right guidance, at the right time.
        </p>
      </div>
    </section>
  );
};

export default AboutApproach;
