import {
  Weight,
  Moon,
  Activity,
  CalendarClock,
  Package,
  Baby,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: Weight,
    title: "Heaviness increases",
    body: "Carrying more becomes part of every day. Even small movements take more effort, and that is the work of the stage rather than a sign of weakness.",
  },
  {
    Icon: Moon,
    title: "Sleep becomes harder",
    body: "Comfort gets harder to find, the bladder fills more often, and the mind sometimes runs ahead. Broken sleep is one of the most universal experiences now.",
  },
  {
    Icon: Activity,
    title: "Movement matters more",
    body: "Patterns become clearer, and any clear change is something to raise. You're noticing what feels normal for your baby, not counting to a number.",
  },
  {
    Icon: CalendarClock,
    title: "Appointments become more regular",
    body: "Midwife appointments space closer together. Conversations begin to focus on growth, position, and what to do if labour starts.",
  },
  {
    Icon: Package,
    title: "Practical preparation begins to matter",
    body: "Hospital bags, car seats, and the corner of a room quietly start to take shape, sometimes in waves, sometimes all at once.",
  },
  {
    Icon: Baby,
    title: "Birth feels closer and more real",
    body: "Labour shifts from something abstract into something with a probable timeframe. That shift is grounding and unsettling at the same time.",
  },
];

interface Props {
  closing?: string;
}

const ThirdTriBigChanges = ({
  closing = "This stage asks more of your body and your attention. Slowing down is not failure, it is part of the work.",
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
            A closer look at what defines the final stage of pregnancy.
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

export default ThirdTriBigChanges;
