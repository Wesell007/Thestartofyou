import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
  bg?: string;
}

const TrimesterNormal = ({ data, bg = "bg-parchment-dark" }: Props) => {
  const { normal } = data;

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="stage-label mb-3">
            Reassurance
          </p>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground mb-3 leading-tight">
            What's normal, and when to seek support
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            This is one of the most common questions in pregnancy. Here's what
            tends to be part of this stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* What's normal */}
          <div className="bg-card border border-border/40 rounded-xl p-6 sm:p-7 shadow-card-brand">
            <p className="stage-label mb-5">
              Often part of this stage
            </p>
            <ul className="space-y-3">
              {normal.normalItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <span className="font-sans text-[15px] font-light text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to seek support */}
          <div className="bg-card border border-border/40 rounded-xl p-6 sm:p-7 shadow-card-brand">
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-terracotta mb-5">
              When to seek support
            </p>
            <ul className="space-y-3">
              {normal.seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  <span className="font-sans text-[15px] font-light text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 font-sans text-xs font-light text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed">
          {normal.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default TrimesterNormal;
