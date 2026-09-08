import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Homepage Story Refinement — chapter three: Guidance for the journey.
 *
 * The public information ecosystem. The three personal journeys lead, and the
 * wider audited hubs sit beneath them as support. Links only; no data reads.
 */

const primaryHubs = [
  {
    label: "Trying to conceive",
    href: "/trying-to-conceive",
    description: "Cycles, timing, early signs and the questions that come with waiting.",
  },
  {
    label: "Pregnancy",
    href: "/pregnancy",
    description: "Week by week changes, appointments, symptoms and preparing for birth.",
  },
  {
    label: "First Year",
    href: "/first-year",
    description: "Feeding, sleep, development and your own recovery, month by month.",
  },
] as const;

const wider = [
  { label: "IVF", href: "/ivf", description: "Treatment steps and what to expect." },
  {
    label: "Preparing for baby",
    href: "/preparing-for-baby",
    description: "Practical planning before birth.",
  },
  { label: "Toddler", href: "/toddler", description: "Growing independence and change." },
  { label: "Family", href: "/family", description: "Life, relationships and the wider picture." },
] as const;

const LifecycleEcosystemSection = () => (
  <section className="bg-parchment py-20 md:py-28" aria-labelledby="guidance-ecosystem-heading">
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
        <div>
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

        <div>
          <ul className="border-t border-border/60">
            {primaryHubs.map(({ label, href, description }) => (
              <li key={href} className="border-b border-border/60">
                <Link
                  to={href}
                  className="group flex items-baseline justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.3rem] leading-tight text-foreground">
                      {label}
                    </span>
                    <span className="mt-1 block font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 translate-y-1 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Wider support
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {wider.map(({ label, href, description }) => (
              <Link
                key={href}
                to={href}
                className="rounded-[2px] border border-border/60 bg-card/70 px-4 py-4 transition-colors hover:border-sage/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
              >
                <span className="block font-sans text-[13.5px] font-medium text-foreground">
                  {label}
                </span>
                <span className="mt-1 block font-sans text-[12.5px] font-light leading-relaxed text-muted-foreground">
                  {description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LifecycleEcosystemSection;
