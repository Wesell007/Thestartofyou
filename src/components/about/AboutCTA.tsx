import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
        <div className="editorial-rule mb-8" />
        <p className="stage-label mb-5">Your Journey</p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-snug">
          Start with where you are
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto mb-8">
          You don't need to have everything figured out. Start with your stage, and let the journey guide you from there.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Explore your journey
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/due-date-calculator"
            className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
          >
            <Calculator size={14} className="text-sage" />
            Calculate your due date
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
