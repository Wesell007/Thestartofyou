import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Baby, CalendarHeart, Sprout } from "lucide-react";

const journeyChoices = [
  {
    label: "Trying to conceive",
    description: "Understand your cycle and keep your TTC journey in one place.",
    href: "/setup/trying-to-conceive",
    icon: Sprout,
    iconClassName: "bg-stage-ttc text-stage-ttc-accent",
  },
  {
    label: "Pregnancy",
    description: "Begin with your dates, then follow calm guidance week by week.",
    href: "/due-date-calculator",
    icon: CalendarHeart,
    iconClassName: "bg-stage-pregnancy text-stage-pregnancy-accent",
  },
  {
    label: "First Year",
    description: "Start an age aware space for your baby and your own recovery.",
    href: "/setup/first-year",
    icon: Baby,
    iconClassName: "bg-stage-firstyear text-stage-firstyear-accent",
  },
] as const;

const JourneyBrandedSection = () => {
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (location.hash !== "#start-where-you-are") return;
    window.requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }, [location.hash]);

  return (
    <section
      id="start-where-you-are"
      aria-labelledby="start-where-you-are-heading"
      className="scroll-mt-20 bg-lavender py-20 md:py-28"
    >
      <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.25em] text-lavender-foreground/55">
            Your journey starts here
          </p>
          <h2
            ref={headingRef}
            id="start-where-you-are-heading"
            tabIndex={-1}
            className="font-serif text-[2rem] leading-[1.12] text-lavender-foreground outline-none sm:text-4xl md:text-[2.75rem]"
          >
            Start where you are
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-[14.5px] font-light leading-relaxed text-lavender-foreground/65">
            Choose the stage that fits today. Your journey can move with you as things change.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {journeyChoices.map(({ label, description, href, icon: Icon, iconClassName }) => (
            <Link
              key={label}
              to={href}
              className="group flex min-h-[218px] flex-col border border-lavender-foreground/10 bg-card/75 p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-lavender-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-lavender"
            >
              <span className={`mb-8 flex h-10 w-10 items-center justify-center rounded-full ${iconClassName}`}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="font-serif text-xl text-foreground">{label}</h3>
              <p className="mt-2 flex-1 font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                {description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-sans text-[12px] font-medium text-foreground">
                Start here <ArrowRight size={13} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyBrandedSection;