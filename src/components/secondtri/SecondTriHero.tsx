import { Link } from "react-router-dom";
import { Calendar, ArrowDown } from "lucide-react";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface Props {
  label: string;
  range: string;
  tagline: string;
  subtitle: string;
  weekStart: number;
  weekEnd: number;
}

const SecondTriHero = ({ label, range, tagline, subtitle, weekStart, weekEnd }: Props) => {
  // 4 timeline markers across the trimester (13, 18, 22, 27)
  const milestones = [
    weekStart,
    Math.round(weekStart + (weekEnd - weekStart) * 0.34),
    Math.round(weekStart + (weekEnd - weekStart) * 0.62),
    weekEnd,
  ];

  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Pregnancy", href: "/pregnancy" },
    { label, href: "/pregnancy/second-trimester" },
  ];

  return (
    <section className="relative bg-parchment overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[760px] h-[480px] rounded-full bg-sage-bg/35 blur-3xl" />
      </div>

      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 w-[160px] lg:w-[200px] opacity-20 select-none hidden lg:block"
      />
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 w-[160px] lg:w-[200px] opacity-20 select-none hidden lg:block"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10 text-center">
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs
          tone="section"
          className="flex justify-center mb-7"

          items={breadcrumbItems}
        />

        <p className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase text-sage-muted mb-5">
          {range} · {tagline}
        </p>

        <h1 className="font-serif text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] text-foreground leading-[1.04] mb-5 sm:mb-6 animate-fade-up">
          {label}
        </h1>

        <p className="font-sans text-[15.5px] sm:text-[17px] md:text-[18px] text-foreground/70 leading-[1.7] mb-9 sm:mb-12 max-w-[34ch] sm:max-w-2xl mx-auto animate-fade-up [animation-delay:0.1s]">
          {subtitle}
        </p>

        <div
          className="relative h-12 max-w-[18rem] sm:max-w-md md:max-w-xl mx-auto mb-9 sm:mb-12 animate-fade-up [animation-delay:0.15s]"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-sage/30 -translate-y-1/2" />
          {milestones.map((week) => {
            const pct = ((week - weekStart) / (weekEnd - weekStart)) * 100;
            return (
              <div
                key={week}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                style={{ left: `${pct}%` }}
              >
                <div className="w-3 h-3 rounded-full border border-sage/60 bg-card" />
                <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-foreground/55 whitespace-nowrap mt-2">
                  Wk {week}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 animate-fade-up [animation-delay:0.2s] max-w-sm sm:max-w-none mx-auto">
          <Link
            to="/due-date-calculator"
            className="flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            <Calendar size={15} />
            Calculate your due date
          </Link>
          <a
            href="#week-by-week"
            className="flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            <ArrowDown size={15} />
            Jump to week-by-week
          </a>
        </div>
      </div>
    </section>
  );
};

export default SecondTriHero;
