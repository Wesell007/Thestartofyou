import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import guideWhatIvfIs from "@/assets/article-hero-what-ivf-is.jpg";
import guideFunding from "@/assets/article-hero-nhs-ivf-funding.jpg";
import guideOhss from "@/assets/article-hero-ohss-ivf.jpg";
import guideNotWork from "@/assets/article-hero-ivf-cycle-not-work.jpg";
import guideIcsi from "@/assets/article-hero-ivf-vs-icsi.jpg";
import guideFreshFrozen from "@/assets/article-hero-fresh-vs-frozen.jpg";

// Phase 34C — single hub discovery surface for the four new IVF guides.
// Each guide is surfaced here exactly once. No new stage routes.
const guides = [
  {
    href: "/articles/what-ivf-is-uk-guide",
    eyebrow: "Orientation",
    title: "What IVF is: a UK guide",
    sub: "What the treatment is, when it may be considered, and how NHS and private pathways differ.",
    image: guideWhatIvfIs,
    alt: "A calm consultation room corner with two soft armchairs, a low wooden table and a notebook in daylight.",
  },
  {
    href: "/articles/nhs-ivf-funding-and-eligibility",
    eyebrow: "Access",
    title: "NHS IVF funding and eligibility",
    sub: "Why there is no single UK rule, where variation comes from, and what to ask your GP.",
    image: guideFunding,
    alt: "A kitchen table in morning light with a closed laptop, a mug of tea and an open blank notebook.",
  },
  {
    href: "/articles/ohss-and-ivf-side-effects",
    eyebrow: "Treatment effects",
    title: "OHSS and IVF side effects",
    sub: "Common effects during treatment, what OHSS is, and the symptoms that mean you should ring your clinic.",
    image: guideOhss,
    alt: "A calm bedside table with a glass jug of water, a filled glass and a sprig of eucalyptus in morning light.",
  },
  {
    href: "/articles/when-an-ivf-cycle-does-not-work",
    eyebrow: "Afterwards",
    title: "When a cycle doesn't work",
    sub: "The follow-up appointment, questions worth asking, and how decisions about trying again are approached.",
    image: guideNotWork,
    alt: "A quiet window seat with a wool blanket, a cup of tea on the sill and dried flowers in soft light.",
  },
  // Phase 34D — two further guides in the same section. One placement each.
  {
    href: "/articles/ivf-vs-icsi",
    eyebrow: "Fertilisation",
    title: "IVF versus ICSI",
    sub: "What the two methods are, the single step where they differ, and why a clinic may discuss ICSI.",
    image: guideIcsi,
    alt: "A quiet laboratory bench corner in soft daylight with a closed notebook and a small potted plant.",
  },
  {
    href: "/articles/fresh-vs-frozen-embryo-transfer",
    eyebrow: "Transfer routes",
    title: "Fresh versus frozen transfer",
    sub: "What each route means, how the timing differs, and how embryo freezing and storage work.",
    image: guideFreshFrozen,
    alt: "A sunlit sash window sill with a small stoneware vase of dried grasses and a folded linen cloth.",
  },
];

const IVFGuides = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-ivf-accent) / 0.3)" }} />
            <span
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--stage-ivf-accent))" }}
            >
              IVF guidance
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
            Understanding <span className="italic font-normal">the treatment</span>
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
            Four guides for the questions that sit alongside the stages: what IVF is,
            how funded treatment is decided, what to watch for during treatment, and
            what happens if a cycle doesn't work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              to={guide.href}
              className="group flex flex-col rounded-2xl border bg-card overflow-hidden shadow-card-brand transition-all hover:shadow-soft hover:-translate-y-0.5"
              style={{ borderColor: "hsl(var(--stage-ivf-accent) / 0.2)" }}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.alt}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-[1.045] transition-transform duration-700"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col gap-3">
                <span
                  className="font-sans text-[10px] font-light tracking-[0.22em] uppercase"
                  style={{ color: "hsl(var(--stage-ivf-accent))" }}
                >
                  {guide.eyebrow}
                </span>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-[1.25rem] md:text-[1.35rem] text-foreground leading-[1.2]">
                    {guide.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                    style={{ color: "hsl(var(--stage-ivf-accent))" }}
                  />
                </div>
                <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
                  {guide.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFGuides;
