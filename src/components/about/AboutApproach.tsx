import { Compass, Wrench, Sparkles, BookHeart } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Stage-by-stage guidance",
    desc: "Trying to conceive, pregnancy, first year, toddler and family support, each with its own structure and tone.",
  },
  {
    icon: Wrench,
    title: "Tools when they help",
    desc: "Calculators and practical resources that support decisions without overwhelming the page.",
  },
  {
    icon: Sparkles,
    title: "AI support in context",
    desc: "Ask questions from the stage you are in, with support shaped around that part of the journey.",
  },
  {
    icon: BookHeart,
    title: "A journal for what matters",
    desc: "A physical place to keep thoughts, scan photos, memories and the moments you do not want to lose.",
  },
];

const AboutApproach = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <p className="stage-label mb-3">What we built</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              So we built<br />something connected
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Instead of another content feed, The Start of You is structured around the stages families actually move through. Guidance, tools, AI support and reflection are connected, so you are not starting from scratch every time something changes.
            </p>
            <p className="font-serif text-sm italic text-foreground/70">
              The right guidance, at the right time. Nothing more.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/30 shadow-card-brand p-5 md:p-6 flex gap-4 items-start bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]"
              >
                <div className="w-9 h-9 rounded-full bg-sage/15 border border-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
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
