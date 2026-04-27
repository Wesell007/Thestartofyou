import {
  Hourglass,
  HelpCircle,
  Eye,
  Activity,
  CloudFog,
  UserMinus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Hourglass, HelpCircle, Eye, Activity, CloudFog, UserMinus];

interface Item {
  label: string;
  body: string;
}

const items: Item[] = [
  {
    label: "Waiting for the anatomy scan",
    body: "The 20-week scan can sit in the calendar for weeks, gathering quiet anxiety. It's normal for the lead-up to feel heavier than the day itself.",
  },
  {
    label: "Not feeling as reassured as people expect",
    body: "Even when symptoms ease, worry can stay close. Being told this is the easy trimester can make harder feelings feel out of place.",
  },
  {
    label: "Adjusting to a more visible body",
    body: "A growing bump can feel grounding for some and uncomfortable for others. Both responses are real, and both can shift week to week.",
  },
  {
    label: "Worry when movement is inconsistent at first",
    body: "Early movements come and go, sometimes daily, sometimes not for days. That irregularity is normal and rarely means something is wrong.",
  },
  {
    label: "The gap between &lsquo;supposed to be better&rsquo; and how it really feels",
    body: "Tiredness, nausea, and emotional weight don't always lift on cue. If the second trimester doesn't feel easier, you're not the only one.",
  },
  {
    label: "Feeling more seen before you feel fully ready",
    body: "Comments from colleagues, family, even strangers tend to begin here. The shift from private to visible pregnancy can feel sudden.",
  },
];

const SecondTriDifficult = () => {
  return (
    <section id="difficult" className="bg-[hsl(var(--parchment-dark))] section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="mb-12 md:mb-14 max-w-2xl">
          <p className="stage-label mb-3">Honest reflection</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            What can feel difficult in this stage
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-foreground/72 leading-relaxed">
            The second trimester is often described as easier, but that doesn&rsquo;t
            mean it feels easy for everyone. Visibility, scans, movement, and
            body changes carry their own kinds of pressure.
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
                <h3
                  className="font-serif text-[1.15rem] text-foreground leading-snug"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
                <p
                  className="font-sans text-[14.5px] text-foreground/72 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            );
          })}
        </div>

        <p className="mt-14 md:mt-16 font-serif italic text-[16px] sm:text-[17px] text-sage text-center max-w-xl mx-auto leading-relaxed">
          This stage can still feel tender, uncertain, and strange. Feeling that
          does not mean you are doing it wrong.
        </p>
      </div>
    </section>
  );
};

export default SecondTriDifficult;
