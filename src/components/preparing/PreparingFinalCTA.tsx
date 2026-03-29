import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const PreparingFinalCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-sage" />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
        <div className="editorial-rule mb-10" />
        <p className="stage-label mb-6">Your Journey</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
          Continue your journey
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          You don't need to have everything figured out. Start with what matters, and the rest will follow.
        </p>
        <Link
          to="/pregnancy"
          className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Continue your journey
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default PreparingFinalCTA;
