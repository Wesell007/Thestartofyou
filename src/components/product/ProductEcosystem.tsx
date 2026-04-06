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
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <div className="editorial-rule mb-6" />
        <p className="stage-label mb-3">Physical + Digital</p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-snug">
          Part of your journey, not separate from it
        </h2>
        <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          The journal fits naturally alongside your digital journey on The Start of You. Use both together, or on their own. Each one adds something the other cannot.
        </p>

        {/* Stage trail */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {stages.map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-card/70 border border-border/30 rounded-pill px-4 py-2">
              <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <span className="font-sans text-xs font-light text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
        >
          Explore your journey
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default ProductEcosystem;
