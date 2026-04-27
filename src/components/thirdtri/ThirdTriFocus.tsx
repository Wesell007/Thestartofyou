import { Sofa, Activity, ListChecks, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: Sofa,
    title: "Rest more than you think you should",
    body: "Even when the list is long, real rest is part of preparing for birth, not a delay to it.",
  },
  {
    Icon: Activity,
    title: "Notice your baby's movements",
    body: "Stay aware of what feels normal for your baby each day. Any clear change is worth raising.",
  },
  {
    Icon: ListChecks,
    title: "Prepare practically without overloading",
    body: "Take it in waves. A small bag, a single appointment, one decision at a time is enough.",
  },
  {
    Icon: HeartHandshake,
    title: "Let labour feel real without forcing certainty",
    body: "You don't need a fixed plan. Flexibility and people you trust matter more than a script.",
  },
];

interface Props {
  closing: string;
}

const ThirdTriFocus = ({ closing }: Props) => {
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
              A short list of priorities for the final weeks. Not a checklist, just
              the things worth gently centring as birth comes closer.
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

export default ThirdTriFocus;
