import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ttcImage from "@/assets/home-stage-ttc.jpg";
import pregnancyImage from "@/assets/home-stage-pregnancy.jpg";
import firstYearImage from "@/assets/home-stage-first-year.jpg";

/** Image-led starts for the three saved lifecycles. No private data is read. */

const journeyChoices = [
  {
    label: "Trying to conceive",
    description:
      "Understand your cycle, follow gentle guidance and keep what you notice in one private place.",
    href: "/setup/trying-to-conceive",
    image: ttcImage,
    alt: "A couple sitting together at a kitchen table with a notebook and tea",
    accent: "text-stage-ttc-accent",
  },
  {
    label: "Pregnancy",
    description:
      "Begin with your dates, then follow calm week by week guidance shaped around your own pregnancy.",
    href: "/due-date-calculator",
    image: pregnancyImage,
    alt: "A pregnant woman writing in a journal beside a window",
    accent: "text-stage-pregnancy-accent",
  },
  {
    label: "First Year",
    description:
      "Start an age aware space for your baby's days and your own recovery, without pressure or comparison.",
    href: "/setup/first-year",
    image: firstYearImage,
    alt: "A parent holding a young baby close on a sofa at home",
    accent: "text-stage-firstyear-accent",
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
      className="scroll-mt-20 bg-lavender-bg py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <div className="mb-12 max-w-2xl md:mb-16">
           <div className="mb-6 h-px w-10 bg-sage/40" />
           <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Your journey starts here
          </p>
          <h2
            ref={headingRef}
            id="start-where-you-are-heading"
            tabIndex={-1}
             className="font-serif text-[2rem] leading-[1.12] text-foreground outline-none sm:text-4xl md:text-[2.75rem]"
          >
            Start where you are
          </h2>
           <p className="mt-4 max-w-lg font-sans text-[14.5px] font-light leading-relaxed text-muted-foreground">
            Choose the stage that fits you today. Your journey can move with you as things change.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
           {journeyChoices.map(({ label, description, href, image, alt, accent }, index) => (
            <Link
              key={label}
              to={href}
               className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-lavender-bg ${
                index === 1 ? "md:mt-10" : ""
              }`}
            >
              <div className="overflow-hidden rounded-[2px] shadow-soft">
                <img
                  src={image}
                  alt={alt}
                  width={1024}
                  height={1408}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
               <h3 className={`mt-6 font-serif text-[1.6rem] leading-tight text-foreground ${accent}`}>
                {label}
              </h3>
               <p className="mt-3 font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
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
