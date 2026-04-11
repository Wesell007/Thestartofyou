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
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="editorial-rule mb-5 md:mb-6" />
          <p className="stage-label mb-3">How It Works</p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-foreground mb-3 md:mb-4">
            Three steps to begin
          </h2>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            A simple process that gives you a structured, personalised pregnancy experience from day one.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative">
          {/* Connecting line behind cards (desktop only) */}
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-border/40 z-0" />

          {steps.map((s) => (
            <div
              key={s.num}
              className={`${s.accent} rounded-2xl p-6 sm:p-7 md:p-8 border border-border/20 transition-all hover:shadow-card-hover hover:-translate-y-0.5 relative z-10`}
            >
              {/* Icon + number row */}
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                  <s.icon size={18} className={s.iconColor} />
                </div>
                <span className="font-serif text-3xl text-terracotta/15 leading-none">
                  {s.num}
                </span>
              </div>
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-2.5 md:mb-3">
                {s.title}
              </h3>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
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
