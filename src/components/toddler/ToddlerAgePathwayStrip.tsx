import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toddlerAgeConfigs, type ToddlerAgeSlug } from "@/data/toddlerAgeData";

const ageOrder: ToddlerAgeSlug[] = [
  "12-17-months",
  "18-23-months",
  "2-years",
  "30-months",
  "3-years",
];

const ToddlerAgePathwayStrip = () => (
  <section className="border-y border-stage-toddler-accent/20 bg-stage-toddler/25 py-14 md:py-16">
    <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
      <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.26em] text-stage-toddler-accent">
            Through the toddler years
          </p>
          <h2 className="mt-2 font-serif text-[1.75rem] leading-tight text-stage-toddler-deep md:text-[2rem]">
            See this stage by stage
          </h2>
        </div>
        <p className="max-w-sm font-sans text-[13.5px] font-light leading-relaxed text-stage-toddler-deep/65">
          Development is rarely linear. Choose the age that feels closest to where your child is now.
        </p>
      </div>

      <nav aria-label="Toddler age guides">
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[8px] border border-stage-toddler-accent/25 bg-stage-toddler-accent/25 sm:grid-cols-2 lg:grid-cols-5">
          {ageOrder.map((slug) => {
            const age = toddlerAgeConfigs[slug];
            return (
              <li key={slug}>
                <Link
                  to={`/toddler/${slug}`}
                  className="group flex h-full min-h-[112px] flex-col justify-between bg-parchment p-5 transition-colors duration-300 motion-reduce:transition-none hover:bg-stage-toddler-soft/60 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stage-toddler-accent"
                >
                  <span className="font-serif text-[1.05rem] leading-snug text-stage-toddler-deep">{age.ageRangeLabel}</span>
                  <span className="mt-5 flex items-center justify-between font-sans text-[11.5px] font-medium text-stage-toddler-accent">
                    Age guide
                    <ArrowRight size={14} className="transition-transform duration-300 motion-reduce:transition-none group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  </section>
);

export default ToddlerAgePathwayStrip;