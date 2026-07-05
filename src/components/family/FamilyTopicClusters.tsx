import { ChevronRight } from "lucide-react";

type Cluster = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
};

const clusters: Cluster[] = [
  {
    id: "family-growing",
    eyebrow: "Growing families",
    title: "Growing families",
    body: "For parents thinking about another baby, sibling changes, age gaps and the shape of family life as it grows.",
    chips: [
      "Second-time parents",
      "Preparing for another baby",
      "Sibling transitions",
      "Age gaps",
      "Blended family rhythms",
    ],
  },
  {
    id: "family-relationships",
    eyebrow: "Relationships",
    title: "Relationships",
    body: "Support for the adult relationships and family boundaries that shape the home around your child.",
    chips: [
      "You and your partner",
      "Grandparents and boundaries",
      "Making parent friends",
      "Family communication",
      "Sharing the mental load",
    ],
  },
  {
    id: "family-basics",
    eyebrow: "Family basics",
    title: "Family basics",
    body: "Everyday help for routines, childcare, money, home life and the practical pieces parents carry.",
    chips: [
      "Family routines",
      "Childcare decisions",
      "Finances",
      "Moving home",
      "Work and family life",
    ],
  },
  {
    id: "family-health",
    eyebrow: "Health & safety",
    title: "Health and safety",
    body: "Calm guidance for whole-family safety, wellbeing and knowing when to ask for extra help.",
    chips: [
      "Home safety",
      "Car safety",
      "Illness in the family",
      "Mental health in children",
      "When to ask for help",
    ],
  },
  {
    id: "family-travel",
    eyebrow: "Travel & days out",
    title: "Travel and days out",
    body: "Practical support for getting out of the house, planning trips and keeping family life moving.",
    chips: [
      "Travelling with children",
      "Holidays with kids",
      "Days out",
      "Packing and planning",
      "Car journeys",
    ],
  },
  {
    id: "family-play",
    eyebrow: "Play & connection",
    title: "Play, fun and connection",
    body: "Ideas for joy, bonding, traditions and the small moments that make family life feel like yours.",
    chips: [
      "Family traditions",
      "Birthdays and celebrations",
      "Screen time as a family",
      "Play ideas",
      "Making memories",
    ],
  },
  {
    id: "family-community",
    eyebrow: "Community & support",
    title: "Community and support",
    body: "For finding your village, asking for help and feeling less alone in the middle of family life.",
    chips: [
      "Finding your village",
      "Support groups",
      "Asking for help",
      "Community activities",
      "Feeling less alone",
    ],
  },
];

const accent = "hsl(var(--stage-family-accent))";
const accentSoft = "hsl(var(--stage-family-accent) / 0.1)";
const accentMid = "hsl(var(--stage-family-accent) / 0.24)";
const accentBorder = "hsl(var(--stage-family-accent) / 0.26)";
const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.36)";
const deep = "hsl(var(--stage-family-deep))";
const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";

const FamilyTopicClusters = () => {
  return (
    <section
      id="family-topics"
      className="relative py-24 md:py-28 overflow-hidden scroll-mt-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 -z-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--stage-family) / 0.4) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: accentMid }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Family topics
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight"
            style={{ color: deep }}
          >
            Explore by area of family life
          </h2>
          <p
            className="font-sans text-[15px] font-light leading-relaxed max-w-xl mx-auto"
            style={{ color: deepSoft }}
          >
            Seven curated areas across family life — every side of the day-to-day, gently mapped.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {clusters.map(({ id, eyebrow, title, body, chips }) => (
            <article
              key={id}
              id={id}
              className="group relative flex h-full flex-col rounded-[22px] border p-9 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-30px_rgba(70,50,20,0.42)] scroll-mt-24"
              style={{
                borderColor: accentBorder,
                background:
                  "linear-gradient(155deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family-soft) / 0.55) 100%)",
                boxShadow:
                  "0 16px 36px -28px rgba(70,50,20,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-20 -left-20 h-52 w-52 rounded-full blur-3xl opacity-80"
                style={{ background: "hsl(var(--stage-family-accent) / 0.22)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3.5 mb-5">
                <span
                  className="h-px w-6"
                  style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.5)" }}
                  aria-hidden
                />
                <p
                  className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase"
                  style={{ color: accent }}
                >
                  {eyebrow}
                </p>
              </div>
              <h3
                className="relative font-serif text-[1.55rem] md:text-[1.7rem] mb-3 leading-snug"
                style={{ color: deep }}
              >
                {title}
              </h3>
              <p
                className="relative font-sans text-[14.75px] font-light leading-relaxed mb-6"
                style={{ color: deepSoft }}
              >
                {body}
              </p>
              <div className="relative flex flex-wrap gap-1.5 mb-8">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-pill px-3 py-1 font-sans text-[11.5px] tracking-wide border"
                    style={{
                      backgroundColor: "hsl(var(--stage-family) / 0.7)",
                      color: "hsl(var(--stage-family-deep) / 0.92)",
                      borderColor: "hsl(var(--stage-family-accent) / 0.32)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="relative mt-auto flex items-center justify-between">
                <span
                  className="font-sans text-[12.5px] font-medium tracking-wide"
                  style={{ color: accent }}
                >
                  In this area
                </span>
                <span
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border"
                  style={{
                    borderColor: accentBorderStrong,
                    backgroundColor: accentSoft,
                  }}
                  aria-hidden
                >
                  <ChevronRight size={15} strokeWidth={1.8} style={{ color: accent }} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyTopicClusters;
