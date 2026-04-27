import {
  EyeOff,
  HelpCircle,
  Battery,
  Compass,
  CloudRain,
  UserMinus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TrimesterDifficulty } from "@/data/trimesterData";

const icons: LucideIcon[] = [EyeOff, HelpCircle, Battery, Compass, CloudRain, UserMinus];

interface Props {
  title: string;
  intro: string;
  items: TrimesterDifficulty[];
  closing: string;
}

const FirstTriDifficult = ({ title, intro, items, closing }: Props) => {
  return (
    <section id="difficult" className="bg-[hsl(var(--parchment-dark))] section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="mb-12 md:mb-14 max-w-2xl">
          <p className="stage-label mb-3">Honest reflection</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            {title}
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] font-light text-muted-foreground leading-relaxed">
            {intro}
          </p>
        </div>

        {/* 2x3 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 md:p-7 border border-border/30 shadow-card-brand flex flex-col gap-3"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-terracotta/10 text-terracotta">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">
                  {item.label}
                </h3>
                <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-14 md:mt-16 font-serif italic text-[16px] sm:text-[17px] text-sage text-center max-w-xl mx-auto leading-relaxed">
          {closing}
        </p>
      </div>
    </section>
  );
};

export default FirstTriDifficult;
