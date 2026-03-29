import { CheckCircle, AlertCircle } from "lucide-react";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const WeekNormal = ({ data }: Props) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Safety & reassurance
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
          What's normal, and when to seek support
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-14 max-w-xl">
          Variation is normal at this stage. The list below reflects what many people experience, and what's worth raising with your care team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* What's normal */}
          <div className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              What's normal
            </p>
            <ul className="space-y-4">
              {data.normal.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={14} className="text-sage mt-0.5 shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* When to seek support */}
          <div className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand">
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
              When to seek support
            </p>
            <ul className="space-y-4">
              {data.seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle size={14} className="text-terracotta mt-0.5 shrink-0" />
                  <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical review signal, subtle, elegant */}
        <p className="font-sans text-xs font-light text-sage-muted flex items-center gap-1.5">
          <span className="text-sage">✔</span> Medically reviewed by Jenny Joines
        </p>
      </div>
    </section>
  );
};

export default WeekNormal;
