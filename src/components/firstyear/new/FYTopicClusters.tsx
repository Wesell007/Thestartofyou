interface Cluster {
  title: string;
  sub: string;
  items: string[];
}

interface Props {
  anchor: string;
  eyebrow: string;
  heading: string;
  intro: string;
  bg: string;
  soft: string;
  accent: string;
  deep: string;
  clusters: Cluster[];
}

const FYTopicClusters = ({ anchor, eyebrow, heading, intro, bg, soft, accent, deep, clusters }: Props) => {
  return (
    <section
      id={anchor}
      className="py-14 md:py-20"
      style={{ backgroundColor: `hsl(var(${bg}) / 0.25)` }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="mb-8 md:mb-10 max-w-2xl">
          <p
            className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
            style={{ color: `hsl(var(${deep}))` }}
          >
            {eyebrow}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            {heading}
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {clusters.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border bg-card p-6 sm:p-7 flex flex-col"
              style={{ borderColor: `hsl(var(${accent}) / 0.16)` }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: `hsl(var(${accent}) / 0.7)` }}
                />
                <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug">{c.title}</h3>
              </div>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
                {c.sub}
              </p>
              <ul className="flex flex-wrap gap-2 mt-auto">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="font-sans text-[12px] font-light px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: `hsl(var(${accent}) / 0.2)`,
                      color: `hsl(var(${deep}))`,
                      backgroundColor: `hsl(var(${soft}) / 0.35)`,
                    }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FYBabyTopics = () => (
  <FYTopicClusters
    anchor="baby"
    eyebrow="Baby's first year"
    heading="Topics across the year"
    intro="Four clusters that cover most of what comes up during the first twelve months. Topic pages open in the next step."
    bg="--stage-firstyear"
    soft="--stage-firstyear-soft"
    accent="--stage-firstyear-accent"
    deep="--stage-firstyear-deep"
    clusters={[
      { title: "Feeding", sub: "Breast, bottle, mixed feeding, weaning, first foods.", items: ["Latching", "Bottle refusal", "Weaning", "First foods"] },
      { title: "Sleep", sub: "Patterns, naps, regressions, settling, night waking.", items: ["Naps", "Regressions", "Night waking", "Self-settling"] },
      { title: "Development & milestones", sub: "Movement, language, social cues, healthy variation.", items: ["Rolling", "Babble", "Sitting", "Crawling"] },
      { title: "Care & safety", sub: "Routine care, illness signs, safe sleep, everyday safety.", items: ["Safe sleep", "Illness signs", "Bathing", "Travel"] },
    ]}
  />
);

export const FYRecoveryTopics = () => (
  <FYTopicClusters
    anchor="recovery"
    eyebrow="Your postpartum recovery"
    heading="What recovery actually covers"
    intro="Recovery is more than the first six weeks. These four clusters hold the physical, emotional, and clinical parts honestly."
    bg="--stage-recovery"
    soft="--stage-recovery-soft"
    accent="--stage-recovery-accent"
    deep="--stage-recovery-deep"
    clusters={[
      { title: "Physical recovery", sub: "Bleeding, stitches, c-section healing, pelvic floor.", items: ["Bleeding", "Stitches", "C-section", "Pelvic floor"] },
      { title: "Emotional wellbeing", sub: "Mood, identity shifts, intrusive thoughts, asking for help.", items: ["Baby blues", "PND signs", "Anxiety", "Identity"] },
      { title: "Body & hormones", sub: "Cycles returning, hair, skin, intimacy, energy.", items: ["Cycle return", "Hair loss", "Intimacy", "Energy"] },
      { title: "Check-ups & warning signs", sub: "6-week check, what to raise, red flags to act on.", items: ["6-week check", "Red flags", "GP visits", "Mental health"] },
    ]}
  />
);

export default FYTopicClusters;
