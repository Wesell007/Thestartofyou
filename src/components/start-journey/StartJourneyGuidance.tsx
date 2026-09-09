import { Link } from "react-router-dom";

import ttcImage from "@/assets/guidance-ttc.jpg";
import pregnancyImage from "@/assets/guidance-featured-pregnancy.jpg";
import firstYearImage from "@/assets/guidance-firstyear.jpg";
import ivfImage from "@/assets/guidance-ivf.jpg";
import toddlerImage from "@/assets/toddler-article-connection-hero.jpg";
import familyImage from "@/assets/guidance-editorial-4.jpg";

/**
 * The six active public guidance hubs. Links only, no data reads. These are
 * reading areas, deliberately presented differently from the three saved
 * journeys above.
 */

const primary = [
  { label: "Trying to Conceive", href: "/trying-to-conceive", image: ttcImage, alt: "A couple sharing a quiet moment" },
  { label: "Pregnancy", href: "/pregnancy", image: pregnancyImage, alt: "A calm pregnancy moment at home" },
  { label: "First Year", href: "/first-year", image: firstYearImage, alt: "A parent holding their baby close" },
] as const;

const wider = [
  { label: "IVF", href: "/ivf", image: ivfImage, alt: "A quiet moment during fertility treatment" },
  { label: "Toddler", href: "/toddler", image: toddlerImage, alt: "A parent and toddler playing together" },
  { label: "Family", href: "/family", image: familyImage, alt: "A family sharing an everyday moment" },
] as const;

const StartJourneyGuidance = () => (
  <section className="bg-parchment py-20 md:py-28" aria-labelledby="start-journey-guidance-heading">
    <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
      <div className="max-w-2xl">
        <div className="mb-6 h-px w-10 bg-sage/40" />
        <h2
          id="start-journey-guidance-heading"
          className="font-serif text-[1.9rem] leading-[1.14] text-foreground sm:text-[2.2rem]"
        >
          More guidance when you need it
        </h2>
        <p className="mt-4 font-sans text-[14.5px] font-light leading-[1.8] text-muted-foreground">
          Starting a saved journey focuses your personal experience. The wider Start of You
          guidance stays open to you across the whole platform.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-3">
        {primary.map(({ label, href, image, alt }) => (
          <li key={href}>
            <Link
              to={href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              <img src={image} alt={alt} loading="lazy" className="aspect-[3/2] w-full rounded-[3px] object-cover shadow-soft" />
              <span className="mt-3 block font-sans text-[13.5px] font-medium text-foreground group-hover:underline">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-border/60 pt-7">
        <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Wider guidance
        </p>
        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {wider.map(({ label, href, image, alt }) => (
            <li key={href}>
              <Link
                to={href}
                className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
              >
                <img src={image} alt={alt} loading="lazy" className="h-12 w-12 shrink-0 rounded-[3px] object-cover shadow-soft" />
                <span className="font-sans text-[13px] font-light text-foreground group-hover:underline">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default StartJourneyGuidance;
