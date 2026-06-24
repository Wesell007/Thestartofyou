import { Link } from "react-router-dom";

const pathways = [
  {
    label: "Back to First Year",
    sub: "Revisit baby's first twelve months and your recovery.",
    to: "/first-year",
  },
  {
    label: "Explore Toddler topics",
    sub: "Eight calm clusters across the toddler years.",
    to: "#toddler-topics",
  },
  {
    label: "Continue to Family life",
    sub: "Ask about life beyond the toddler years.",
    to: "/ask?q=family%20life%20after%20toddler%20years",
  },
];

const ToddlerPathways = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-12">
          <p
            className="font-sans text-[11px] font-light tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-toddler-accent))" }}
          >
            Pathways
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Where to next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pathways.map(({ label, sub, to }) => (
            <Link
              key={label}
              to={to}
              className="group block rounded-2xl border bg-parchment p-7 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_40px_-24px_rgba(60,40,20,0.3)]"
              style={{ borderColor: "hsl(var(--stage-toddler-accent) / 0.22)" }}
            >
              <h3
                className="font-serif text-lg mb-2"
                style={{ color: "hsl(var(--stage-toddler-deep))" }}
              >
                {label}
              </h3>
              <p className="font-sans text-[14px] font-light text-foreground/65 leading-relaxed">
                {sub}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToddlerPathways;
