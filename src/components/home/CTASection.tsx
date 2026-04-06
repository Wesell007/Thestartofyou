import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
        <div className="editorial-rule mb-8 md:mb-10" />
        <p className="stage-label mb-5 md:mb-6">Begin</p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
          Your journey starts here
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-lg mx-auto">
          Enter your due date, access your personalised 40-week guide, and begin your supported pregnancy journey — completely free.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/due-date-calculator"
            className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            Calculate your due date
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/explore"
            className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill py-4 font-sans text-sm font-light hover:bg-parchment-dark transition-all duration-300"
          >
            Explore the journey
          </Link>
        </div>

        <p className="font-sans text-sm font-light text-muted-foreground mt-8 md:mt-10">
          Not sure where to start?{" "}
          <Link to="/ask" className="text-foreground underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors duration-200 inline-flex items-center gap-1">
            Ask a question <ArrowUpRight size={12} />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
