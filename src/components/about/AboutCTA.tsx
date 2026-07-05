import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pathways = [
  { label: "Explore pregnancy", to: "/pregnancy" },
  { label: "Calculate your due date", to: "/due-date-calculator" },
  { label: "View the journal", to: "/product" },
  { label: "Explore family guidance", to: "/family" },
];

const AboutCTA = () => {
  return (
    <section className="page-ending frame-corner overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="editorial-rule mb-6 mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-snug">
            Start where you are
          </h2>
          <p className="font-sans text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            You do not need to have everything figured out. Choose the part of the journey you are in, and let the right support meet you there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {pathways.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-sage/20 bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4] px-5 py-4 hover:border-sage/40 hover:shadow-card-hover transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              <span className="font-sans text-sm text-foreground">{p.label}</span>
              <ArrowRight size={15} className="text-sage/70 group-hover:text-sage group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
