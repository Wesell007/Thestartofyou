import { Link } from "react-router-dom";
import stage03Img from "@/assets/firstyear-stage-0-3.jpg";
import stage36Img from "@/assets/firstyear-stage-3-6.jpg";
import stage69Img from "@/assets/firstyear-stage-6-9.jpg";
import stage912Img from "@/assets/firstyear-stage-9-12.jpg";

const stages = [
  {
    num: "01",
    title: "0–3 months",
    range: "Newborn to 3 months",
    sub: "Adjustment, early patterns, and moving out of survival mode",
    emotion: "Adjustment and discovery",
    href: "/first-year/0-3-months",
    image: stage03Img,
  },
  {
    num: "02",
    title: "3–6 months",
    range: "3 to 6 months",
    sub: "More awareness, interaction, and early routines beginning to form",
    emotion: "Interaction and rhythm",
    href: "/first-year/3-6-months",
    image: stage36Img,
  },
  {
    num: "03",
    title: "6–9 months",
    range: "6 to 9 months",
    sub: "Movement, curiosity, and increasing engagement with the world",
    emotion: "Curiosity and momentum",
    href: "/first-year/6-9-months",
    image: stage69Img,
  },
  {
    num: "04",
    title: "9–12 months",
    range: "9 months to one year",
    sub: "Mobility, personality, and transition into the next stage",
    emotion: "Independence and growth",
    href: "/first-year/9-12-months",
    image: stage912Img,
  },
];

const FirstYearStages = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              The Process
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              Stages of the first year
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Four developmental phases, each with its own rhythms, challenges, and shifts. Understanding where you are can help reduce the pressure to have it all figured out.
            </p>
          </div>
        </div>

        {/* Featured first stage */}
        <Link to={stages[0].href} className="group block mb-5">
          <div
            className="rounded-2xl overflow-hidden border border-border/30 grid grid-cols-1 md:grid-cols-2 transition-all hover:shadow-soft"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.12)' }}
          >
            <div className="h-48 md:h-64 overflow-hidden">
              <img
                src={stages[0].image}
                alt={stages[0].title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-7 sm:p-8 flex flex-col justify-center">
              <span
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
              >
                {stages[0].num} · {stages[0].range}
              </span>
              <h3 className="font-serif text-2xl text-foreground leading-snug mb-2 group-hover:text-foreground/80 transition-colors">
                {stages[0].title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
                {stages[0].sub}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.5)' }} />
                <span className="font-sans text-xs font-light text-muted-foreground italic">{stages[0].emotion}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining 3 stages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stages.slice(1).map((stage) => (
            <Link
              key={stage.num}
              to={stage.href}
              className="group bg-card border border-border/40 rounded-xl overflow-hidden shadow-card-brand flex flex-col hover:shadow-soft transition-all"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-firstyear-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <div className="h-32 overflow-hidden relative">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.4)' }} />
              </div>
              <div className="p-5 flex flex-col gap-2.5 flex-1">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                >
                  {stage.num} · {stage.range}
                </span>
                <h3 className="font-serif text-lg text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {stage.sub}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.35)' }} />
                  <span className="font-sans text-xs font-light text-muted-foreground italic">{stage.emotion}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstYearStages;
