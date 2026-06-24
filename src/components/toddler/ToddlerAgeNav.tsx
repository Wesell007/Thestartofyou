import { Link } from "react-router-dom";

const ages = [
  { label: "12–17 months", q: "12 to 17 month old toddler development sleep food speech" },
  { label: "18–23 months", q: "18 to 23 month old toddler development sleep food speech behaviour" },
  { label: "2 years", q: "2 year old toddler development behaviour speech sleep food" },
  { label: "30 months", q: "30 month old toddler development behaviour speech independence" },
  { label: "3 years", q: "3 year old child development behaviour speech independence" },
];

/**
 * Calm, compact age strip. No carousel, no arrows, no tracker feel.
 * Pills wrap on every breakpoint, generous tap targets, hairline borders.
 */
const ToddlerAgeNav = () => {
  return (
    <section
      id="toddler-age"
      className="py-16 md:py-20"
      style={{ backgroundColor: "hsl(var(--stage-toddler) / 0.4)" }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-9 md:mb-11">
          <p
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            By age
          </p>
          <h2
            className="font-serif text-2xl md:text-3xl mb-3"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Go to your toddler's age
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/65 max-w-md mx-auto leading-relaxed">
            Find guidance by age, from the first birthday through to the third year.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {ages.map(({ label, q }) => (
            <Link
              key={label}
              to={`/ask?q=${encodeURIComponent(q)}`}
              className="inline-flex items-center justify-center rounded-pill px-5 md:px-6 py-3 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-h-[44px] hover:-translate-y-[1px]"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-soft) / 0.7)",
                color: "hsl(var(--stage-toddler-deep))",
                borderColor: "hsl(var(--stage-toddler-accent) / 0.3)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerAgeNav;
