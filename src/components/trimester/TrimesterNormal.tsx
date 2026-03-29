import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterNormal = ({ data, bg = "bg-parchment-dark" }: Props) => {
  const { normal } = data;

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Reassurance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
            What's normal, and when to seek support
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            This is one of the most common questions in pregnancy. Here's what
            tends to be part of this stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What's normal */}
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              Often part of this stage
            </p>
            <ul className="space-y-3.5">
              {normal.normalItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <span className="font-sans text-sm font-light text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to seek support */}
          <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              When to seek support
            </p>
            <ul className="space-y-3.5">
              {normal.seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  <span className="font-sans text-sm font-light text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 font-sans text-xs font-light text-muted-foreground/70 text-center max-w-xl mx-auto leading-relaxed">
          {normal.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default TrimesterNormal;
