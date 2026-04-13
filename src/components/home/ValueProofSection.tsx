import { Compass, CalendarDays, Heart } from "lucide-react";

const values = [
  {
    icon: CalendarDays,
    title: "Personalised by stage",
    desc: "Guidance that follows your timeline, updating week by week as your pregnancy progresses.",
  },
  {
    icon: Compass,
    title: "Calm weekly guidance",
    desc: "Clear, evidence-informed information without the noise. Only what matters right now.",
  },
  {
    icon: Heart,
    title: "A place to return to",
    desc: "Your own space to reflect, track milestones, and feel supported throughout the journey.",
  },
];

const ValueProofSection = () => {
  return (
    <section className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-10 md:mb-14">
          <div className="editorial-rule mb-5" />
          <p className="font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
            Everything you need for a supported pregnancy, nothing you don't.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-11 h-11 rounded-full bg-sage/8 flex items-center justify-center mx-auto mb-4">
                <v.icon size={18} className="text-sage" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                {v.title}
              </h3>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProofSection;
