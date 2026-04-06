import { Compass, Filter, Heart, Layers } from "lucide-react";

const principles = [
  { icon: Compass, title: "Meets you where you are", desc: "Guidance shaped around your stage. Not a feed. Not a search result. A structured experience that knows where you are." },
  { icon: Filter, title: "Reduces noise deliberately", desc: "Only what matters right now. Nothing that pulls you ahead, adds pressure, or drowns you in edge cases." },
  { icon: Heart, title: "Emotional and practical together", desc: "Real feelings alongside real information. Because the experience of this journey shapes decisions as much as the facts." },
  { icon: Layers, title: "A system, not scattered content", desc: "Tools, guidance, emotional support, and reflection connected into one experience. Not 12 different apps." },
];

const AboutApproach = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left editorial */}
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              So we built<br />something different
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Instead of more content, we created a structured system that guides you through each stage with clarity, warmth, and purpose.
            </p>
            <p className="font-serif text-sm italic text-foreground/70">
              The right guidance, at the right time. Nothing more.
            </p>
          </div>

          {/* Right: principle cards */}
          <div className="md:col-span-3 space-y-3">
            {principles.map((p) => (
              <div key={p.title} className="card-elevated p-5 md:p-6 flex gap-4 items-start">
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
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
