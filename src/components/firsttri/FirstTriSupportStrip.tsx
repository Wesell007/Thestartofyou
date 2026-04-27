import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Lock, Users } from "lucide-react";
import supportImage from "@/assets/guidance-hero.jpg";

const reassurances = [
  {
    Icon: ShieldCheck,
    title: "Expert-backed",
    body: "Guidance grounded in midwifery and clinical sources.",
  },
  {
    Icon: Lock,
    title: "Private & supportive",
    body: "Your questions stay yours. No judgement, no noise.",
  },
  {
    Icon: Users,
    title: "Real people",
    body: "Built around the experiences of those going through this stage.",
  },
];

const FirstTriSupportStrip = () => {
  return (
    <section className="bg-parchment section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-border/30 shadow-card-brand">
              <img
                src={supportImage}
                alt="A calm moment, looking at supportive guidance"
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-[280px] sm:h-[340px] md:h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p className="stage-label mb-3">Support</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-4">
              Still have questions? We&rsquo;re here for you.
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] font-light text-muted-foreground leading-relaxed mb-7 max-w-lg">
              Ask anything about early pregnancy and get gentle, grounded
              guidance shaped around the stage you&rsquo;re actually in.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
              <Link
                to="/ask"
                className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Ask a question
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/pregnancy"
                className="inline-flex items-center justify-center gap-2 border border-terracotta/40 text-terracotta rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium hover:bg-terracotta/5 transition-all"
              >
                Start your journey
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Three reassurance mini-blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-border/40">
              {reassurances.map(({ Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sage-bg text-sage">
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <p className="font-sans text-[13px] font-medium text-foreground">
                    {title}
                  </p>
                  <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstTriSupportStrip;
