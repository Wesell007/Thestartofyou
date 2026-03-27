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
    desc: "Not sure where to start? Ask anything — symptoms, timing, or what to expect.",
    cta: "Ask now",
    href: "/ask",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">Helpful tools</h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Practical support, ready when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className="group flex flex-col gap-5 bg-card rounded-2xl p-7 border border-border/40 shadow-card-brand hover:shadow-soft hover:border-sage/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-sage-bg flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div>
                <h3 className="font-serif text-base md:text-lg text-foreground mb-2">{t.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 font-sans text-xs font-medium text-terracotta group-hover:gap-2.5 transition-all">
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
