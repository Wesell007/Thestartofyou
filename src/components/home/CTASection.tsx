import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Heart } from "lucide-react";
import botanicalDivider from "@/assets/botanical-divider.png";

const CTASection = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
        <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
          <Heart size={18} className="text-sage" />
        </div>
        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-foreground mb-3 md:mb-4">
          Your journey starts here
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto">
          Enter your due date, access your personalised week-by-week guide, and begin your supported pregnancy journey, completely free.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-6">
          <Link
            to="/due-date-calculator"
            className="w-full sm:flex-1 flex items-center justify-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            Calculate your due date
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/pregnancy"
            className="w-full sm:flex-1 flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all duration-300"
          >
            Explore the journey
          </Link>
        </div>

        {/* Botanical divider instead of plain line */}
        <img
          src={botanicalDivider}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-28 md:w-36 h-auto mx-auto mb-5 opacity-30 select-none"
        />

        <p className="font-sans text-sm font-light text-muted-foreground">
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
