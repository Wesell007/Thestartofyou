import { Calculator, Heart, MessageCircle, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: <Calculator size={20} className="text-sage" />,
    title: "Calculate your due date",
    desc: "Enter your last period to find your estimated due date and current week.",
    cta: "Calculate",
    href: "#",
  },
  {
    icon: <Heart size={20} className="text-sage" />,
    title: "Find your fertile window",
    desc: "Understand your cycle and identify the days most likely for conception.",
    cta: "Find out",
    href: "#",
  },
  {
    icon: <MessageCircle size={20} className="text-sage" />,
    title: "Ask a question",
    desc: "Not sure where to start? Ask anything — symptoms, timing, or what to expect.",
    cta: "Ask now",
    href: "#",
  },
];

const QuickActionsSection = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Helpful tools</h2>
          <p className="font-sans text-sm font-light text-muted-foreground">
            Practical support, ready when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tools.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className="group flex flex-col gap-4 bg-card rounded-2xl p-6 border border-border/60 shadow-card-brand hover:shadow-soft hover:border-sage/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-sage-bg flex items-center justify-center shrink-0">
                {t.icon}
              </div>
              <div>
                <h3 className="font-serif text-base text-foreground mb-1.5">{t.title}</h3>
                <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 font-sans text-xs font-medium text-terracotta group-hover:gap-2.5 transition-all">
                {t.cta} <ArrowRight size={11} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionsSection;
