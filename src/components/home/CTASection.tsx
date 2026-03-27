import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative bg-parchment py-32 md:py-40 overflow-hidden">
      {/* Decorative corner frames */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-sage-light/50 pointer-events-none" />
      <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-sage-light/50 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-sage-light/50 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-sage-light/50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 leading-tight">
          Start Your Journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto">
          Create your free profile and access your complete 40-week guide. Your dashboard updates every Sunday with personalized guidance for your current stage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/explore"
            className="w-full sm:flex-1 bg-terracotta text-terracotta-foreground rounded-pill py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all text-center"
          >
            Explore your journey
          </Link>
          <Link
            to="/due-date-calculator"
            className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center shrink-0 hover:bg-lavender/80 transition-colors"
          >
            <ArrowUpRight size={18} className="text-lavender-foreground" />
          </Link>
        </div>

        <p className="font-sans text-sm font-light text-muted-foreground mt-8">
          Not sure where to start?{" "}
          <Link to="/ask" className="text-foreground underline underline-offset-4 decoration-sage hover:text-sage transition-colors inline-flex items-center gap-1">
            Ask a question <ArrowUpRight size={12} />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
