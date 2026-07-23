import { Link } from "react-router-dom";

const stages = [
  { label: "Trying to conceive", href: "/trying-to-conceive" },
  { label: "IVF", href: "/ivf" },
  { label: "First year", href: "/first-year" },
  { label: "Toddler", href: "/toddler" },
  { label: "Family", href: "/family" },
];

const LifecycleEcosystemSection = () => {
  return (
    <section className="bg-parchment py-20 md:py-32 border-t border-border/20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
        <div className="h-px w-10 bg-sage/40 mx-auto mb-6" />
        <p className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-sage mb-4">
          The wider journey
        </p>
        <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] text-foreground leading-tight mb-4">
          Support across every stage
        </h2>
        <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-[1.75] max-w-[28rem] mx-auto mb-8">
          Pregnancy is the heart of The Start of You, and the same calm, structured care extends to the stages around it.
        </p>
        <p className="font-sans text-[13.5px] font-light text-muted-foreground/80 leading-relaxed">
          {stages.map((s, i) => (
            <span key={s.href}>
              <Link
                to={s.href}
                className="text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                {s.label}
              </Link>
              {i < stages.length - 1 && (
                <span className="mx-2 text-muted-foreground/40" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default LifecycleEcosystemSection;
