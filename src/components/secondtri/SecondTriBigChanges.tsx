import {
  Sun,
  Sprout,
  Activity,
  Stethoscope,
  Wind,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: Sun,
    title: "Energy often lifts",
    body: "Many people feel more like themselves again as early symptoms ease, though not universally.",
  },
  {
    Icon: Sprout,
    title: "Your bump becomes visible",
    body: "Usually between 16 and 20 weeks, the pregnancy starts to show outwardly.",
  },
  {
    Icon: Activity,
    title: "Movement begins",
    body: "First flutters often arrive between weeks 16 and 22, faint at first, more recognisable later.",
  },
  {
    Icon: Stethoscope,
    title: "The anatomy scan matters",
    body: "Around 20 weeks, a fuller picture of how your baby is developing comes into view.",
  },
  {
    Icon: Wind,
    title: "Your body stretches and adapts",
    body: "Round ligament pulls, skin changes, and a shifting centre of gravity all become more familiar.",
  },
  {
    Icon: Eye,
    title: "Pregnancy becomes more public",
    body: "Other people begin to notice. Comments, questions, and attention may increase.",
  },
];

interface Props {
  closing?: string;
}

const SecondTriBigChanges = ({
  closing = "This stage often brings relief, new awareness, and a different kind of adjustment all at once.",
}: Props) => {
  return (
    <section id="big-changes" className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="stage-label mb-3">Defining the stage</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            The big changes in this trimester
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-foreground/70 leading-relaxed">
            A closer look at what becomes more visible, more physical, and more felt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-sage/30 bg-card text-sage">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <h3 className="font-serif text-[1.1rem] text-foreground leading-snug">
                {title}
              </h3>
              <p className="font-sans text-[14px] text-foreground/72 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 md:mt-16 font-serif italic text-[16px] sm:text-[17px] text-sage text-center max-w-xl mx-auto leading-relaxed">
          {closing}
        </p>
      </div>
    </section>
  );
};

export default SecondTriBigChanges;
