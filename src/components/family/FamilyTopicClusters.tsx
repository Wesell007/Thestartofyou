import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { familyTopics, type FamilyTopicSlug } from "@/data/familyTopicData";

const topicOrder: FamilyTopicSlug[] = [
  "growing-families",
  "relationships",
  "family-basics",
  "health-safety",
  "travel-days-out",
  "play-connection",
];

const shortDescriptions: Record<FamilyTopicSlug, string> = {
  "growing-families": "Another baby, sibling shifts and the shape of a family as it changes.",
  relationships: "Partner connection, wider family boundaries and sharing what the home asks of you.",
  "family-basics": "Routines, childcare, money and the practical work that keeps family life moving.",
  "health-safety": "Everyday care, safer homes and knowing when it is time to ask for more help.",
  "travel-days-out": "Journeys, holidays and realistic days out that fit the family you have.",
  "play-connection": "Traditions, play, screens and the ordinary moments that build closeness.",
};

const FamilyTopicClusters = () => {
  return (
    <section id="family-topics" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-10">
        <div
          className="mb-10 grid gap-5 border-b pb-8 md:mb-12 md:grid-cols-[1fr_auto] md:items-end md:pb-10"
          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.24)" }}
        >
          <div>
            <p
              className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.34em]"
              style={{ color: "hsl(var(--stage-family-accent))" }}
            >
              Family areas
            </p>
            <h2
              className="font-serif text-[2rem] leading-tight md:text-[2.5rem]"
              style={{ color: "hsl(var(--stage-family-deep))" }}
            >
              Six sides of family life
            </h2>
          </div>
          <p
            className="max-w-md font-sans text-[15px] font-light leading-relaxed md:text-right"
            style={{ color: "hsl(var(--stage-family-deep) / 0.7)" }}
          >
            Choose the part of family life that feels closest to what you need today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
          {topicOrder.map((slug, index) => {
            const topic = familyTopics[slug];
            const span = index === 0 || index === 5 ? "lg:col-span-7" : "lg:col-span-5";
            const imageRatio = index === 0 || index === 5 ? "aspect-[16/9]" : "aspect-[4/3]";

            return (
              <Link
                key={slug}
                to={`/family/${slug}`}
                className={`group ${span} block border-t pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-family-accent)/0.55)] focus-visible:ring-offset-4 focus-visible:ring-offset-parchment`}
                style={{ borderColor: "hsl(var(--stage-family-accent) / 0.3)" }}
              >
                <div className={`relative mb-5 overflow-hidden ${imageRatio}`}>
                  <img
                    src={topic.heroImage.src}
                    alt={topic.heroImage.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.025]"
                  />
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsl(var(--stage-family-deep) / 0.26), transparent 55%)" }}
                    aria-hidden
                  />
                  <span
                    className="absolute bottom-4 left-4 font-sans text-[11px] font-medium tracking-[0.22em]"
                    style={{ color: "hsl(var(--card))" }}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3
                      className="font-serif text-[1.55rem] leading-tight md:text-[1.75rem]"
                      style={{ color: "hsl(var(--stage-family-deep))" }}
                    >
                      {topic.title}
                    </h3>
                    <p
                      className="mt-2 max-w-[38rem] font-sans text-[14px] font-light leading-relaxed"
                      style={{ color: "hsl(var(--stage-family-deep) / 0.7)" }}
                    >
                      {shortDescriptions[slug]}
                    </p>
                    <p
                      className="mt-4 font-sans text-[10.5px] font-medium uppercase tracking-[0.18em]"
                      style={{ color: "hsl(var(--stage-family-accent))" }}
                    >
                      {topic.areasInside.slice(0, 3).map((area) => area.title).join(" · ")}
                    </p>
                  </div>
                  <span
                    className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ borderColor: "hsl(var(--stage-family-accent) / 0.4)" }}
                    aria-hidden
                  >
                    <ArrowUpRight size={16} strokeWidth={1.7} style={{ color: "hsl(var(--stage-family-accent))" }} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FamilyTopicClusters;