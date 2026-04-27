import { Heart, Sparkles, Brain, Hourglass } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ExpectSubsection } from "@/data/trimesterData";

interface Props {
  cards: ExpectSubsection[];
}

const iconByLabel: Record<string, { Icon: LucideIcon; tint: string; ring: string }> = {
  body: { Icon: Heart, tint: "bg-terracotta/10 text-terracotta", ring: "ring-terracotta/20" },
  baby: { Icon: Sparkles, tint: "bg-sage-bg text-sage", ring: "ring-sage/20" },
  emotional: { Icon: Brain, tint: "bg-lavender-section text-foreground/70", ring: "ring-foreground/10" },
  uncertainty: { Icon: Hourglass, tint: "bg-parchment-dark text-foreground/70", ring: "ring-foreground/10" },
};

const FirstTriExpect = ({ cards }: Props) => {
  return (
    <section id="expect" className="bg-lavender-section section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="stage-label mb-3">The Full Picture</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            What to expect during the first trimester
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] font-light text-muted-foreground leading-relaxed">
            Across your body, your emotions, and the space between.
          </p>
        </div>

        {/* 4-up cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {cards.map((card) => {
            const config = iconByLabel[card.id] ?? iconByLabel.body;
            const { Icon, tint } = config;
            return (
              <article
                key={card.id}
                className="bg-card rounded-2xl p-6 md:p-7 border border-border/30 shadow-card-brand flex flex-col gap-4 hover:shadow-soft transition-shadow duration-500"
              >
                <span
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${tint}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-[1.25rem] text-foreground leading-snug">
                  {card.label}
                </h3>
                <ul className="space-y-2.5 flex-1">
                  {card.points.slice(0, 4).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                      <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border/30">
                  <p className="font-serif italic text-[14px] text-sage leading-relaxed">
                    {card.meaning}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FirstTriExpect;
