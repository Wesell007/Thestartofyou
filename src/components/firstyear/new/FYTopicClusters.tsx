interface Cluster {
  title: string;
  sub: string;
  items: string[];
}

interface ColumnProps {
  anchor: string;
  eyebrow: string;
  heading: string;
  soft: string;
  accent: string;
  deep: string;
  clusters: Cluster[];
}

const babyColumn: ColumnProps = {
  anchor: "baby",
  eyebrow: "Baby's first year",
  heading: "For your baby",
  soft: "--stage-firstyear-soft",
  accent: "--stage-firstyear-accent",
  deep: "--stage-firstyear-deep",
  clusters: [
    { title: "Feeding", sub: "Breast, bottle, mixed feeding, weaning, first foods.", items: ["Latching", "Bottle refusal", "Weaning", "First foods"] },
    { title: "Sleep", sub: "Patterns, naps, regressions, settling, night waking.", items: ["Naps", "Regressions", "Night waking", "Self-settling"] },
    { title: "Development & milestones", sub: "Movement, language, social cues, healthy variation.", items: ["Rolling", "Babble", "Sitting", "Crawling"] },
    { title: "Care & safety", sub: "Routine care, illness signs, safe sleep, everyday safety.", items: ["Safe sleep", "Illness signs", "Bathing", "Travel"] },
  ],
};

const recoveryColumn: ColumnProps = {
  anchor: "recovery",
  eyebrow: "Your postpartum recovery",
  heading: "For you",
  soft: "--stage-recovery-soft",
  accent: "--stage-recovery-accent",
  deep: "--stage-recovery-deep",
  clusters: [
    { title: "Physical recovery", sub: "Bleeding, stitches, c-section healing, pelvic floor.", items: ["Bleeding", "Stitches", "C-section", "Pelvic floor"] },
    { title: "Emotional wellbeing", sub: "Mood, identity shifts, intrusive thoughts, asking for help.", items: ["Baby blues", "PND signs", "Anxiety", "Identity"] },
    { title: "Body & hormones", sub: "Cycles returning, hair, skin, intimacy, energy.", items: ["Cycle return", "Hair loss", "Intimacy", "Energy"] },
    { title: "Check-ups & warning signs", sub: "6-week check, what to raise, red flags to act on.", items: ["6-week check", "Red flags", "GP visits", "Mental health"] },
  ],
};

const ClusterCard = ({ c, accent, soft, deep }: { c: Cluster; accent: string; soft: string; deep: string }) => (
  <article
    className="rounded-2xl border bg-card p-5 sm:p-6 flex flex-col"
    style={{ borderColor: `hsl(var(${accent}) / 0.16)` }}
  >
    <div className="flex items-center gap-2.5 mb-2.5">
      <span
        className="w-1 h-5 rounded-full"
        style={{ backgroundColor: `hsl(var(${accent}) / 0.7)` }}
      />
      <h4 className="font-serif text-base sm:text-[1.05rem] text-foreground leading-snug">{c.title}</h4>
    </div>
    <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-3.5">
      {c.sub}
    </p>
    <ul className="flex flex-wrap gap-1.5 mt-auto">
      {c.items.map((it) => (
        <li
          key={it}
          className="font-sans text-[11.5px] font-light px-2.5 py-1 rounded-full border"
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
);

const Column = ({ col }: { col: ColumnProps }) => (
  <div id={col.anchor} className="flex flex-col scroll-mt-24">
    <div className="mb-5 md:mb-6 flex items-center gap-3">
      <span
        className="w-1.5 h-6 rounded-full"
        style={{ backgroundColor: `hsl(var(${col.accent}))` }}
      />
      <div>
        <p
          className="font-sans text-[10px] font-light tracking-[0.22em] uppercase"
          style={{ color: `hsl(var(${col.deep}))` }}
        >
          {col.eyebrow}
        </p>
        <h3 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-snug">
          {col.heading}
        </h3>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-3.5">
      {col.clusters.map((c) => (
        <ClusterCard key={c.title} c={c} accent={col.accent} soft={col.soft} deep={col.deep} />
      ))}
    </div>
  </div>
);

/**
 * Parallel Baby + Recovery topics — single shared section, two equal columns.
 * Mobile stacks with a clear track divider so recovery still reads as a peer.
 */
const FYTopicsParallel = () => {
  return (
    <section id="topics" className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl">
        <div className="mb-8 md:mb-10 max-w-2xl">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.6)' }} />
            <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.6)' }} />
            <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase ml-2 text-foreground/60">
              Topics across both tracks
            </p>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Eight clusters. Two tracks. One place.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
            Four clusters for your baby and four for your recovery — held side by side, with equal care. Topic pages open in the next step.
          </p>
        </div>

        {/* Parallel columns at md+, stacked on mobile with track divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-10">
          <Column col={babyColumn} />
          {/* Mobile-only track divider */}
          <div className="md:hidden flex items-center gap-3 -mb-2">
            <span className="flex-1 h-px" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.25)' }} />
            <span
              className="font-sans text-[10px] font-light tracking-[0.22em] uppercase"
              style={{ color: 'hsl(var(--stage-recovery-deep))' }}
            >
              Recovery track
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.25)' }} />
          </div>
          <Column col={recoveryColumn} />
        </div>
      </div>
    </section>
  );
};

export default FYTopicsParallel;
