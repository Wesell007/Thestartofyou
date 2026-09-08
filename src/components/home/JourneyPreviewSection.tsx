import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Heart } from "lucide-react";

const previews = [
  {
    stage: "TTC",
    title: "Your cycle, with context",
    description: "A clear view of your cycle, timely guidance and a private place for what you notice along the way.",
    href: "/trying-to-conceive",
    linkLabel: "Explore TTC support",
    icon: CalendarDays,
  },
  {
    stage: "Pregnancy",
    title: "Guidance for this week",
    description: "A calm weekly view of changes, appointments and questions, shaped around your own dates.",
    href: "/pregnancy",
    linkLabel: "Explore pregnancy",
    icon: Heart,
  },
  {
    stage: "First Year",
    title: "Today, in one place",
    description: "Age aware guidance for feeding, sleep, development and your recovery, without comparison or pressure.",
    href: "/first-year",
    linkLabel: "Explore the first year",
    icon: BookOpen,
  },
] as const;

const JourneyPreviewSection = () => (
  <section className="bg-background py-20 md:py-28" aria-labelledby="journey-preview-heading">
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <div className="mb-10 max-w-2xl md:mb-14">
        <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Made for the stage you are in
        </p>
        <h2 id="journey-preview-heading" className="font-serif text-[2rem] leading-[1.12] text-foreground sm:text-4xl md:text-[2.75rem]">
          One journey, changing with you
        </h2>
        <p className="mt-4 max-w-xl font-sans text-[14.5px] font-light leading-relaxed text-muted-foreground">
          A simple glimpse of the guidance each stage brings. Your own journey stays private and personal to you.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        {previews.map(({ stage, title, description, href, linkLabel, icon: Icon }) => (
          <article key={stage} className="flex min-h-[300px] flex-col bg-card p-7 md:p-8">
            <div className="mb-10 flex items-center justify-between">
              <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {stage}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-bg text-sage">
                <Icon size={16} aria-hidden="true" />
              </span>
            </div>
            <p className="mb-3 font-sans text-[11px] text-muted-foreground">A typical view</p>
            <h3 className="font-serif text-[1.45rem] leading-tight text-foreground">{title}</h3>
            <p className="mt-4 flex-1 font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
              {description}
            </p>
            <Link
              to={href}
              className="mt-7 inline-flex items-center gap-2 self-start font-sans text-[12px] font-medium text-foreground underline-offset-4 hover:underline"
            >
              {linkLabel} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default JourneyPreviewSection;