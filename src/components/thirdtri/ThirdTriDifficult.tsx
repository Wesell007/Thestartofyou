import {
  Weight,
  Moon,
  HelpCircle,
  Scale,
  Sofa,
  HandHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Weight, Moon, HelpCircle, Scale, Sofa, HandHeart];

interface Item {
  label: string;
  body: string;
}

const items: Item[] = [
  {
    label: "Feeling physically heavier than expected",
    body: "The cumulative weight of late pregnancy can be more tiring than you anticipated. Tasks that felt simple a few weeks ago can take real effort now.",
  },
  {
    label: "Sleep becoming broken or shallow",
    body: "Even with the right pillows and routines, sleep often refuses to be deep. Waking through the night to turn over or use the loo is part of the stage for many.",
  },
  {
    label: "Wondering if every change means labour is near",
    body: "Tightenings, pressure, an off feeling, or a sudden burst of energy can all feel like signals. Reading every change becomes its own quiet job.",
  },
  {
    label: "Feeling both ready and not ready",
    body: "Wanting birth to begin and wanting more time can sit together in the same week. Neither feeling is wrong, and both can stay until labour itself.",
  },
  {
    label: "Wanting comfort while needing to prepare",
    body: "There is real tension between resting your tired body and ticking off the practical list. Most people swing between the two, and neither side wins cleanly.",
  },
  {
    label: "Needing more support than before",
    body: "This stage can quietly raise the bar on how much help you actually need, around the house, at work, with appointments. Asking for it is a reasonable response.",
  },
];

const ThirdTriDifficult = () => {
  return (
    <section id="difficult" className="bg-[hsl(var(--parchment-dark))] section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="mb-12 md:mb-14 max-w-2xl">
          <p className="stage-label mb-3">Honest reflection</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            What can feel difficult in this stage
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-foreground/72 leading-relaxed">
            The third trimester can be physically and emotionally demanding. The body
            can feel less comfortable, labour can feel close but still uncertain, and
            preparation can soothe some people while overwhelming others.
          </p>
        </div>

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
                <p className="font-sans text-[14.5px] text-foreground/72 leading-relaxed">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-14 md:mt-16 font-serif italic text-[16px] sm:text-[17px] text-sage text-center max-w-xl mx-auto leading-relaxed">
          The final stretch can feel physically heavy and emotionally mixed. That does
          not mean you are approaching it the wrong way.
        </p>
      </div>
    </section>
  );
};

export default ThirdTriDifficult;
