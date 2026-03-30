import { Link } from "react-router-dom";

const pathways = [
  { label: "Trying to conceive", href: "/trying-to-conceive", description: "Cycles, timing, and support" },
  { label: "IVF", href: "/ivf", description: "Treatment, timelines, emotions" },
  { label: "Pregnancy", href: "/pregnancy", description: "Week by week guidance" },
  { label: "Postpartum", href: "/postpartum", description: "Recovery and adjustment" },
  { label: "First year", href: "/first-year", description: "Growth, sleep, milestones" },
];

const GuidanceJourneyPathways = () => (
  <section className="bg-card/60 py-24 md:py-32">
    <div className="container mx-auto px-6 md:px-10 max-w-5xl">
      <div className="text-center mb-14">
        <p className="stage-label mb-4">Continue your journey</p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
          Explore by stage
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pathways.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group block rounded-2xl p-5 md:p-6 bg-parchment border border-border/30 hover:border-sage/20 hover:shadow-sm transition-all duration-300 text-center"
          >
            <span className="font-serif text-sm text-foreground group-hover:text-sage transition-colors block mb-1.5">
              {item.label}
            </span>
            <span className="font-sans text-[11px] font-light text-muted-foreground leading-snug">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default GuidanceJourneyPathways;
