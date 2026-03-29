import { Calculator, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: <Calculator size={20} className="text-sage" />,
    title: "Calculate your due date",
    desc: "Enter your last period to find your estimated due date and current week.",
    cta: "Calculate",
    href: "/due-date-calculator",
  },
  {
    icon: <Heart size={20} className="text-sage" />,
    title: "Find your fertile window",
    desc: "Understand your cycle and identify the days most likely for conception.",
    cta: "Show Fertility Dates",
    href: "/ovulation-calculator",
  },
  {
    icon: <MessageCircle size={20} className="text-sage" />,
    title: "Ask a question",
    desc: "Not sure where to start? Ask anything, symptoms, timing, or what to expect.",
    cta: "Ask now",
    href: "/ask",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="relative bg-parchment-dark section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="mb-14">
          <div className="editorial-rule-left mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">Helpful tools</h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Practical support, ready when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group flex flex-col gap-6 card-elevated p-8 hover:shadow-soft hover:border-sage/20 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-sage-bg/80 flex items-center justify-center shrink-0 group-hover:bg-sage-bg transition-colors duration-300">
                {t.icon}
              </div>
              <div>
                <h3 className="font-serif text-base md:text-lg text-foreground mb-2.5">{t.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 font-sans text-xs font-medium text-terracotta group-hover:gap-3 transition-all duration-300">
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
