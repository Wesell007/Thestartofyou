import { Calculator, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: <Calculator size={20} />,
    title: "Due date calculator",
    desc: "Enter your last period to find your estimated due date and current week.",
    cta: "Calculate",
    href: "/due-date-calculator",
    accentVar: "--stage-pregnancy-accent",
  },
  {
    icon: <Heart size={20} />,
    title: "Ovulation calculator",
    desc: "Understand your cycle and find your most fertile days.",
    cta: "Find your window",
    href: "/ovulation-calculator",
    accentVar: "--stage-ttc-accent",
  },
  {
    icon: <MessageCircle size={20} />,
    title: "Ask anything",
    desc: "Not sure where to start? Ask about symptoms, timing, or what to expect next.",
    cta: "Ask now",
    href: "/ask",
    accentVar: "--sage",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(var(--parchment-dark)) 0%, hsl(var(--parchment)) 50%, hsl(var(--stage-ttc) / 0.3) 100%)` }}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="mb-10 md:mb-14 text-center sm:text-left">
          <div className="editorial-rule-left mb-5 mx-auto sm:mx-0" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-2">Tools & support</h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
            Practical help, ready when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group relative flex flex-col gap-4 bg-card/95 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:-translate-y-0.5 hover:shadow-soft transition-all duration-500 overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `hsl(var(${t.accentVar}))` }}
              />

              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  color: `hsl(var(${t.accentVar}))`,
                  backgroundColor: `hsl(var(${t.accentVar}) / 0.1)`,
                }}
              >
                {t.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base text-foreground mb-1.5">{t.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium group-hover:gap-2.5 transition-all duration-300"
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
