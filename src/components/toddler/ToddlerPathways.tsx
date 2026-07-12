import { Link } from "react-router-dom";

const pathways = [
  { label: "Back to First Year", sub: "Revisit baby's first twelve months and your recovery.", to: "/first-year", eyebrow: "Previous stage" },
  { label: "Continue to Family life", sub: "Guidance for life as a family beyond the toddler years.", to: "/family", eyebrow: "What's next" },
  { label: "Keep your journey", sub: "Save the small moments as your child grows.", to: "/my-journey", eyebrow: "Journal" },
];

const ToddlerPathways = () => {
  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            Pathways
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] leading-tight" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            Where to next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map(({ label, sub, to, eyebrow }) => (
            <Link
              key={label}
              to={to}
              className="group flex h-full flex-col rounded-[22px] border bg-parchment p-8 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_50px_-28px_rgba(60,40,20,0.32)]"
              style={{
                borderColor: "hsl(var(--stage-toddler-accent) / 0.2)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <p className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--stage-toddler-accent) / 0.95)" }}>
                {eyebrow}
              </p>
              <h3 className="font-serif text-[1.25rem] mb-2.5 leading-snug" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
                {label}
              </h3>
              <p className="font-sans text-[14px] font-light text-foreground/65 leading-relaxed mb-6">
                {sub}
              </p>
              <span
                className="mt-auto inline-flex items-center gap-2 font-sans text-[12.5px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "hsl(var(--stage-toddler-accent))" }}
              >
                Continue
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerPathways;
