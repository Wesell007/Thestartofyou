import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { toddlerAgeConfigs, type ToddlerAgeSlug } from "@/data/toddlerAgeData";

const ageOrder: ToddlerAgeSlug[] = [
  "12-17-months",
  "18-23-months",
  "2-years",
  "30-months",
  "3-years",
];

const descriptors: Record<ToddlerAgeSlug, string> = {
  "12-17-months": "First steps, first words, big shifts",
  "18-23-months": "More movement, language and opinions",
  "2-years": "Boundaries, play and growing independence",
  "30-months": "Longer stories and stronger feelings",
  "3-years": "Imagination, friendship and a wider world",
};

const shapes = [
  "rounded-tr-[72px] rounded-bl-[72px]",
  "rounded-t-[72px]",
  "rounded-tl-[72px] rounded-br-[72px]",
  "rounded-b-[72px]",
  "rounded-tr-[72px] rounded-bl-[72px]",
];

const ToddlerAgeNav = () => (
  <section id="toddler-age" className="relative overflow-hidden py-16 md:py-24">
    <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
      <header className="mb-10 md:mb-14 max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-9 bg-stage-toddler-accent/50" aria-hidden />
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-stage-toddler-accent">
            The toddler journey
          </p>
        </div>
        <h2 className="font-serif text-[2rem] leading-tight text-stage-toddler-deep sm:text-[2.5rem] md:text-[3rem]">
          Growing together through <span className="italic">every stage</span>
        </h2>
        <p className="mt-4 max-w-xl font-sans text-[15px] font-light leading-relaxed text-stage-toddler-deep/70">
          Choose the age that feels closest to today. Each guide follows the changes, questions and everyday friction of that chapter.
        </p>
      </header>

      <nav aria-label="Toddler age guides">
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {ageOrder.map((slug, index) => {
            const age = toddlerAgeConfigs[slug];
            return (
              <li key={slug} className={index % 2 === 1 ? "lg:pt-10" : ""}>
                <Link
                  to={`/toddler/${slug}`}
                  className="group block min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stage-toddler-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-parchment"
                >
                  <div className={`relative mb-5 aspect-[4/3] overflow-hidden border border-stage-toddler-accent/25 bg-stage-toddler-soft sm:aspect-[3/4] ${shapes[index]}`}>
                    <img
                      src={age.heroImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.035]"
                    />
                    <span className="absolute inset-0 bg-stage-toddler-deep/5 transition-opacity group-hover:opacity-0" aria-hidden />
                    <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-stage-toddler-accent/35 bg-parchment/90 text-stage-toddler-deep transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="font-serif text-[1.25rem] leading-snug text-stage-toddler-deep">{age.ageRangeLabel}</p>
                  <p className="mt-1 font-sans text-[12.5px] font-light leading-relaxed text-stage-toddler-deep/65">{descriptors[slug]}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  </section>
);

export default ToddlerAgeNav;
