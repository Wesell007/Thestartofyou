import { CalendarDays, Compass, PenLine } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: CalendarDays,
    title: "Enter your due date",
    desc: "Your 40-week journey begins with one simple date. We calculate your current stage and build your personalised timeline.",
    accent: "bg-sage/8",
    iconBg: "bg-sage/15",
    iconColor: "text-sage",
  },
  {
    num: "02",
    icon: Compass,
    title: "Receive weekly guidance",
    desc: "Every week, your dashboard updates with stage-specific guidance: body changes, development milestones, and practical reminders.",
    accent: "bg-lavender-bg",
    iconBg: "bg-lavender/15",
    iconColor: "text-lavender",
  },
  {
    num: "03",
    icon: PenLine,
    title: "Reflect and record",
    desc: "Journal your thoughts. Track your milestones. Access your full pregnancy roadmap anytime, from anywhere.",
    accent: "bg-parchment-dark",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-parchment section-spacing overflow-hidden">
      {/* Subtle corner accents */}
      <div className="absolute top-8 left-8 w-14 h-14 border-t border-l border-sage-light/30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-sage-light/30 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="editorial-rule mb-6 md:mb-8" />
          <p className="stage-label mb-4">How It Works</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
            Three steps to begin
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            A simple process that gives you a structured, personalised pregnancy experience from day one.
          </p>
        </div>

        {/* Steps — numbered cards with icons and connector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 relative">
          {/* Connecting line behind cards (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-border/40 z-0" />

          {steps.map((s) => (
            <div
              key={s.num}
              className={`${s.accent} rounded-2xl p-7 sm:p-8 md:p-9 border border-border/20 transition-all hover:shadow-card-hover hover:-translate-y-0.5 relative z-10`}
            >
              {/* Icon + number row */}
              <div className="flex items-center justify-between mb-6 md:mb-7">
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                  <s.icon size={20} className={s.iconColor} />
                </div>
                <span className="font-serif text-4xl text-terracotta/20 leading-none">
                  {s.num}
                </span>
              </div>
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-3 md:mb-4">
                {s.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
