import { Link } from "react-router-dom";

const pathways = [
  {
    eyebrow: "Earlier stage",
    label: "Back to Toddler",
    sub: "For guidance through the toddler years — behaviour, sleep, speech and daily rhythms.",
    to: "/toddler",
  },
  {
    eyebrow: "Earlier stage",
    label: "First Year guidance",
    sub: "For gentle support through feeding, sleep, milestones and everyday care in the first year.",
    to: "/first-year",
  },
  {
    eyebrow: "Earlier stage",
    label: "Pregnancy guidance",
    sub: "For week-by-week support, symptoms, appointments and preparing calmly for a baby.",
    to: "/pregnancy",
  },
];

const FamilyPathways = () => {
  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-family-accent))" }}
          >
            Pathways
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] leading-tight"
            style={{ color: "hsl(var(--stage-family-deep))" }}
          >
            Where to next
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map(({ eyebrow, label, sub, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex h-full flex-col rounded-[22px] border bg-parchment p-8 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_50px_-28px_rgba(70,50,20,0.32)]"
              style={{
                borderColor: "hsl(var(--stage-family-accent) / 0.22)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.7)",
              }}
            >
              <p
                className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase mb-3"
                style={{ color: "hsl(var(--stage-family-accent) / 0.95)" }}
              >
                {eyebrow}
              </p>
              <h3
                className="font-serif text-[1.25rem] mb-2.5 leading-snug"
                style={{ color: "hsl(var(--stage-family-deep))" }}
              >
                {label}
              </h3>
              <p className="font-sans text-[14px] font-light text-foreground/65 leading-relaxed mb-6">
                {sub}
              </p>
              <span
                className="mt-auto inline-flex items-center gap-2 font-sans text-[12.5px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "hsl(var(--stage-family-accent))" }}
              >
                Continue
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-wide hover:underline underline-offset-4"
            style={{ color: "hsl(var(--stage-family-accent))" }}
          >
            Or open your Journal
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FamilyPathways;
