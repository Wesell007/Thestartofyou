import { CalendarCheck, Salad, Sprout, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: CalendarCheck,
    title: "Keep your appointments and prepare for the anatomy scan",
    body: "The 20-week scan is a major milestone, write down anything you want to ask.",
  },
  {
    Icon: Salad,
    title: "Nourish steadily and move gently if it feels good",
    body: "Eat regularly, hydrate, and find movement that fits how your body feels now.",
  },
  {
    Icon: Sprout,
    title: "Notice your body changing without judging every shift",
    body: "Skin, shape, posture, all of it is adapting. Curiosity helps more than critique.",
  },
  {
    Icon: HeartHandshake,
    title: "Make room for the pregnancy becoming more real",
    body: "First movements, scans, and visible change can land emotionally. Let them.",
  },
];

interface Props {
  closing: string;
}

const SecondTriFocus = ({ closing }: Props) => {
  return (
    <section id="focus" className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-5">
            <p className="stage-label mb-4">Right now</p>
            <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] text-foreground leading-[1.1] mb-4">
              What to focus on during this stage
            </h2>
            <p className="font-sans text-[15px] text-foreground/72 leading-relaxed">
              A short list of priorities. Nothing to optimise. Just the things
              worth gently centring through the middle of pregnancy.
            </p>
          </div>

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

export default SecondTriFocus;
