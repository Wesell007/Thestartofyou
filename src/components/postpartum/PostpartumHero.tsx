import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const PostpartumHero = () => {
  return (
    <section className="relative min-h-[80vh] bg-parchment overflow-hidden flex flex-col justify-center pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sage-bg/25 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10 text-center">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
          Postpartum
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
          Your <span className="italic">postpartum journey</span>
        </h1>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up [animation-delay:0.1s]">
          Recovery, adjustment, and the early weeks with your baby — one step at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
          <button className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all">
            <ArrowUpRight size={15} />
            Start your postpartum journey
          </button>
          <button className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all">
            <ArrowDown size={15} />
            Jump to your week
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
    </section>
  );
};

export default PostpartumHero;
