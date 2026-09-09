import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ttcImage from "@/assets/guidance-ttc.jpg";
import pregnancyImage from "@/assets/guidance-featured-pregnancy.jpg";
import firstYearImage from "@/assets/guidance-firstyear.jpg";
import ivfImage from "@/assets/guidance-ivf.jpg";
import toddlerImage from "@/assets/toddler-article-connection-hero.jpg";
import familyImage from "@/assets/family-hero-everyday.jpg.asset.json";

/**
 * Homepage Story Refinement: Guidance for the journey.
 *
 * The public information ecosystem. The three personal journeys lead, and the
 * wider audited hubs sit beneath them as support. Links only; no data reads.
 */

const primaryHubs = [
  {
    label: "Trying to conceive",
    href: "/trying-to-conceive",
    description: "Cycles, timing, early signs and the questions that come with waiting.",
    image: ttcImage,
    alt: "A couple sharing a quiet moment while trying to conceive",
  },
  {
    label: "Pregnancy",
    href: "/pregnancy",
    description: "Week by week changes, appointments, symptoms and preparing for birth.",
    image: pregnancyImage,
    alt: "A calm pregnancy moment at home",
  },
  {
    label: "First Year",
    href: "/first-year",
    description: "Feeding, sleep, development and your own recovery, month by month.",
    image: firstYearImage,
    alt: "A parent holding their baby close",
  },
] as const;

const wider = [
  { label: "IVF", href: "/ivf", description: "Treatment steps and what to expect.", image: ivfImage, alt: "A quiet moment during fertility treatment" },
  { label: "Toddler", href: "/toddler", description: "Growing independence and change.", image: toddlerImage, alt: "A parent and toddler connecting through play" },
  { label: "Family", href: "/family", description: "Life, relationships and the wider picture.", image: familyImage.url, alt: "A family sharing an everyday moment" },
] as const;

const LifecycleEcosystemSection = () => (
  <section className="bg-parchment py-20 md:py-28" aria-labelledby="guidance-ecosystem-heading">
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
       <div className="max-w-2xl">
          <div className="mb-6 h-px w-10 bg-sage/40" />
          <p className="mb-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-sage">
            Guidance for the journey
          </p>
          <h2
            id="guidance-ecosystem-heading"
            className="font-serif text-[1.9rem] leading-[1.14] text-foreground sm:text-[2.3rem]"
          >
            Support for where you are — and what comes next
          </h2>
          <p className="mt-4 max-w-md font-sans text-[14.5px] font-light leading-[1.75] text-muted-foreground">
            Explore clear, thoughtful guidance across the stages, questions and changes that can
            shape family life.
          </p>
       </div>
       <div className="mt-12 grid gap-7 md:grid-cols-3">
             {primaryHubs.map(({ label, href, description, image, alt }) => (
                <Link
                   key={href}
                  to={href}
                   className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
                >
                   <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover shadow-soft transition-transform duration-500 group-hover:-translate-y-1" />
                   <span className="mt-5 flex items-start justify-between gap-4">
                     <span><span className="block font-serif text-[1.45rem] leading-tight text-foreground">
                      {label}
                    </span>
                    <span className="mt-1 block font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                      {description}
                     </span></span>
                  </span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 translate-y-1 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1"
                  />
                 </Link>
            ))}
       </div>
       <div className="mt-14 border-t border-border/60 pt-8">
          <p className="mt-8 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Wider support
          </p>
           <div className="mt-5 grid gap-5 md:grid-cols-3">
             {wider.map(({ label, href, description, image, alt }) => (
              <Link
                key={href}
                to={href}
                 className="group grid grid-cols-[88px_1fr] items-center gap-4 border-b border-border/60 pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 md:grid-cols-1"
              >
                 <img src={image} alt={alt} loading="lazy" className="aspect-square w-full rounded-[3px] object-cover shadow-soft md:aspect-[3/2]" />
                 <span><span className="block font-sans text-[13.5px] font-medium text-foreground">
                  {label}
                 </span></span>
                <span className="mt-1 block font-sans text-[12.5px] font-light leading-relaxed text-muted-foreground">
                  {description}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  </section>
);

export default LifecycleEcosystemSection;
