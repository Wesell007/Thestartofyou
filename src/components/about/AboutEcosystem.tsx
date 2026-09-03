import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Trying to conceive", desc: "Cycle, ovulation and preconception clarity.", to: "/trying-to-conceive" },
  { label: "Pregnancy", desc: "Week-by-week support across the trimesters.", to: "/pregnancy" },
  { label: "First year", desc: "Feeding, sleep, development and recovery.", to: "/first-year" },
  { label: "Toddler", desc: "Behaviour, speech, sleep and everyday life.", to: "/toddler" },
  { label: "Family", desc: "Relationships, routines and growing families.", to: "/family" },
  { label: "The journal", desc: "A guided pregnancy keepsake, offline.", to: "/product" },
  { label: "Tools and calculators", desc: "Due dates, ovulation and quick answers.", to: "/due-date-calculator" },
  { label: "Your companion", desc: "Ask a question, get stage-aware support.", to: "/ask" },
];

const AboutEcosystem = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="editorial-rule mb-6 mx-auto" />
          <p className="stage-label mb-3">The connected system</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 leading-snug">
            One journey, connected across every stage
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            Each part of the site is designed to stand on its own, but also connect back to the wider journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="group rounded-2xl border border-sage/20 bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4] p-5 flex flex-col justify-between min-h-[130px] hover:border-sage/40 hover:shadow-card-hover transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-base text-foreground leading-snug">{l.label}</h3>
                  <ArrowUpRight size={14} className="text-sage/60 group-hover:text-sage transition-colors mt-1 flex-shrink-0" />
                </div>
                <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed">{l.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutEcosystem;
