import { Link } from "react-router-dom";
import ppEarlyDaysImg from "@/assets/postpartum-stage-early-days.jpg";
import ppEarlyWeeksImg from "@/assets/postpartum-stage-early-weeks.jpg";
import ppAdjustmentImg from "@/assets/postpartum-stage-adjustment.jpg";

const stages = [
  {
    num: "01",
    title: "Early days",
    range: "Week 1–2",
    sub: "Recovery, feeding, sleep disruption, and immediate adjustment",
    emotion: "Intensity and tenderness",
    href: "/first-year/postpartum-recovery/healing-after-birth",
    image: ppEarlyDaysImg,
    featured: true,
  },
  {
    num: "02",
    title: "Early weeks",
    range: "Week 3–6",
    sub: "Gradual healing, emotional shifts, and small routines beginning to form",
    emotion: "Searching for rhythm",
    href: "/first-year/postpartum-recovery/what-recovery-can-feel-like",
    image: ppEarlyWeeksImg,
    featured: false,
  },
  {
    num: "03",
    title: "Ongoing adjustment",
    range: "Week 7–12",
    sub: "Building rhythm, confidence, and adapting to a new normal",
    emotion: "Growing familiarity",
    href: "/first-year/emotional-wellbeing/feeling-like-yourself-again",
    image: ppAdjustmentImg,
    featured: false,
  },
];

const PostpartumStages = () => {
  return (
    <section id="postpartum-stages" className="bg-parchment py-16 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              The Process
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              Stages of postpartum
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Postpartum unfolds in phases, each with its own physical and emotional patterns. Understanding where you are can help reduce uncertainty.
            </p>
          </div>
        </div>

        {/* Featured first stage */}
        <Link
          to={stages[0].href}
          className="group block mb-6"
        >
          <div
            className="rounded-2xl overflow-hidden border border-border/30 grid grid-cols-1 md:grid-cols-2 transition-all hover:shadow-soft"
            style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
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
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
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
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.5)' }}
                />
                <span className="font-sans text-xs font-light text-muted-foreground italic">
                  {stages[0].emotion}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stages.slice(1).map((stage) => (
            <Link
              key={stage.num}
              to={stage.href}
              className="group bg-card border border-border/40 rounded-xl overflow-hidden shadow-card-brand flex flex-col hover:shadow-soft transition-all"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-postpartum-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                >
                  {stage.num} · {stage.range}
                </span>
                <h3 className="font-serif text-xl text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {stage.sub}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--stage-postpartum-accent) / 0.35)' }}
                  />
                  <span className="font-sans text-xs font-light text-muted-foreground italic">
                    {stage.emotion}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostpartumStages;
