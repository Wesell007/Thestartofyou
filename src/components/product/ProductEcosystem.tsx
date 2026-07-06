import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stages = [
  { label: "Pregnancy", color: "bg-stage-pregnancy" },
  { label: "Postpartum", color: "bg-stage-postpartum" },
  { label: "First Year", color: "bg-stage-firstyear" },
  { label: "Preparing", color: "bg-stage-preparing" },
  { label: "Support", color: "bg-stage-support" },
];

const ProductEcosystem = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Left: copy */}
          <div>
            <div className="editorial-rule-left mb-5" />
            <p className="stage-label mb-2">Physical + Digital</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-4 leading-snug">
              Part of your journey, not separate from it
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-md mb-6">
              The journal fits alongside your digital journey on The Start of You. Use both together, or on their own. The physical pages hold what the screen cannot.
            </p>
            <Link
              to="/pregnancy"
              className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
            >
              Explore your journey
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: stage trail cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stages.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 bg-card/70 border border-border/30 rounded-2xl px-4 py-3.5">
                <span className={`w-3 h-3 rounded-full ${s.color} shrink-0`} />
                <span className="font-sans text-xs font-light text-foreground">{s.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-sage/8 border border-sage/15 rounded-2xl px-4 py-3.5">
              <span className="w-3 h-3 rounded-full bg-sage shrink-0" />
              <span className="font-sans text-xs font-light text-foreground">The Journal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductEcosystem;
