import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative bg-parchment py-28 md:py-36 overflow-hidden">
      {/* Decorative corner frames */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t border-l border-sage-light pointer-events-none" />
      <div className="absolute top-8 left-14 w-14 h-14 border-t border-l border-sage-light/50 pointer-events-none" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t border-r border-sage-light pointer-events-none" />
      <div className="absolute top-8 right-14 w-14 h-14 border-t border-r border-sage-light/50 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b border-l border-sage-light pointer-events-none" />
      <div className="absolute bottom-8 left-14 w-14 h-14 border-b border-l border-sage-light/50 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b border-r border-sage-light pointer-events-none" />
      <div className="absolute bottom-8 right-14 w-14 h-14 border-b border-r border-sage-light/50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight">
          Save Your Pregnancy Journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
          Create your free profile and access your complete 40-week guide. Your dashboard updates every Sunday with personalized guidance for your current stage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button className="w-full sm:flex-1 bg-terracotta text-terracotta-foreground rounded-pill py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            Start your journey
          </button>
          <button className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center shrink-0 hover:bg-lavender/80 transition-colors">
            <ArrowUpRight size={18} className="text-lavender-foreground" />
          </button>
        </div>

        <p className="font-sans text-sm font-light text-muted-foreground mt-6">
          Already have a profile?{" "}
          <a href="#" className="text-foreground underline underline-offset-4 decoration-sage hover:text-sage transition-colors inline-flex items-center gap-1">
            Sign In <ArrowUpRight size={12} />
          </a>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
