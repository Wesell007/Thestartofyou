import { Calculator, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: <Calculator size={20} />,
    title: "Calculate your due date",
    desc: "Enter your last period to find your estimated due date and current week.",
    cta: "Calculate",
    href: "/due-date-calculator",
    accentVar: "--stage-pregnancy-accent",
    bgVar: "--stage-pregnancy",
  },
  {
    icon: <Heart size={20} />,
    title: "Find your fertile window",
    desc: "Understand your cycle and identify the days most likely for conception.",
    cta: "Show fertility dates",
    href: "/ovulation-calculator",
    accentVar: "--stage-ttc-accent",
    bgVar: "--stage-ttc",
  },
  {
    icon: <MessageCircle size={20} />,
    title: "Ask a question",
    desc: "Not sure where to start? Ask anything about symptoms, timing, or what to expect.",
    cta: "Ask now",
    href: "/ask",
    accentVar: "--sage",
    bgVar: "--sage-bg",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="relative bg-parchment-dark py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="mb-10 md:mb-14">
          <div className="editorial-rule-left mb-5" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3">Helpful tools</h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
            Practical support, ready when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group flex flex-col gap-5 bg-card/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-border/20 hover:border-transparent hover:-translate-y-1 hover:shadow-soft transition-all duration-500"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{
                  color: `hsl(var(${t.accentVar}))`,
                  backgroundColor: `hsl(var(${t.bgVar}) / 0.7)`,
                }}
              >
                {t.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base md:text-lg text-foreground mb-2">{t.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium group-hover:gap-3 transition-all duration-300"
                style={{ color: `hsl(var(${t.accentVar}))` }}
              >
                {t.cta} <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;
