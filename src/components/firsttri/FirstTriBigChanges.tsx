import {
  Activity,
  Moon,
  Sprout,
  CloudFog,
  Stethoscope,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Item {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const items: Item[] = [
  {
    Icon: Activity,
    title: "Hormonal surge",
    body: "Rising hCG, progesterone and oestrogen drive most early symptoms.",
  },
  {
    Icon: Moon,
    title: "Tiredness & nausea",
    body: "Often disproportionate to anything visible, and rarely linear.",
  },
  {
    Icon: Sprout,
    title: "Rapid development",
    body: "Heart, brain and major organs lay their foundations by week 12.",
  },
  {
    Icon: CloudFog,
    title: "Living with uncertainty",
    body: "Long gaps between reassurance, with awareness of miscarriage close by.",
  },
  {
    Icon: Stethoscope,
    title: "First appointments & first scan",
    body: "Booking around weeks 8-10, dating scan around week 12.",
  },
  {
    Icon: UserRound,
    title: "An identity shift that hasn't quite landed",
    body: "Becoming a parent often feels abstract before it feels real.",
  },
];

interface Props {
  closing?: string;
}

const FirstTriBigChanges = ({
  closing = "Holding all of this at once is a lot. It's okay to take it one day at a time.",
}: Props) => {
  return (
    <section id="big-changes" className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="stage-label mb-3">Defining the stage</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            The big changes in this trimester
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-foreground/70 leading-relaxed">
            A calmer look at what&rsquo;s happening inside and out.
          </p>
        </div>

        {/* 6 mini-blocks in a row */}
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

export default FirstTriBigChanges;
