import { Bed, Droplets, CalendarCheck, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: Bed,
    title: "Rest as much as you can",
    body: "First-trimester tiredness is real. Sleep isn't a luxury here.",
  },
  {
    Icon: Droplets,
    title: "Hydrate and nourish gently",
    body: "Eat little and often. Keep fluids close. Folic acid daily.",
  },
  {
    Icon: CalendarCheck,
    title: "Keep your appointments",
    body: "Booking, screening and the dating scan are your anchors.",
  },
  {
    Icon: HeartHandshake,
    title: "Be kind to your mind",
    body: "Worry is normal here. Talking about it tends to help.",
  },
];

interface Props {
  closing: string;
}

const FirstTriFocus = ({ closing }: Props) => {
  return (
    <section id="focus" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Left heading */}
          <div className="md:col-span-5">
            <p className="stage-label mb-4">Right now</p>
            <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] text-foreground leading-[1.1] mb-4">
              What to focus on during this stage
            </h2>
            <p className="font-sans text-[15px] text-foreground/72 leading-relaxed">
              A short list of priorities. Nothing to optimise. Just the things
              worth gently centring this trimester.
            </p>
          </div>

          {/* Right priorities */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {items.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-card rounded-2xl p-6 border border-border/30 shadow-card-brand flex flex-col gap-3"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage-bg text-sage">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-[1.05rem] text-foreground leading-snug">
                  {title}
                </h3>
                <p className="font-sans text-[14px] text-foreground/72 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
            <p className="sm:col-span-2 font-serif italic text-[15px] text-sage pt-2 leading-relaxed">
              {closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstTriFocus;
