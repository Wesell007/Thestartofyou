import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { FirstYearTopicSlug } from "@/data/firstYearTopicData";
import babyPathway from "@/assets/firstyear-journey.jpg";
import recoveryPathway from "@/assets/postpartum-journey.jpg";

// Each cluster card on the hub maps to one First Year topic landing page.
// The whole card is the single click target; chips inside remain visual only.
interface Cluster {
  title: string;
  sub: string;
  items: string[];
  slug: FirstYearTopicSlug;
}

interface ColumnProps {
  anchor: string;
  eyebrow: string;
  heading: string;
  /** Quiet editorial subtitle, sits under the column heading. */
  subtitle: string;
  bg: string;
  soft: string;
  accent: string;
  deep: string;
  image: string;
  imageAlt: string;
  clusters: Cluster[];
}

const babyColumn: ColumnProps = {
  anchor: "baby-topics",
  eyebrow: "For your baby",
  heading: "Baby's first year",
  subtitle: "Feeding, sleep, growing and the everyday questions.",
  bg: "--stage-firstyear",
  soft: "--stage-firstyear-soft",
  accent: "--stage-firstyear-accent",
  deep: "--stage-firstyear-deep",
  image: babyPathway,
  imageAlt: "A parent and baby playing together at home",
  clusters: [
    { slug: "feeding", title: "Feeding", sub: "Breast, bottle, mixed feeding, weaning, first foods.", items: ["Latching", "Bottle refusal", "Weaning", "First foods"] },
    { slug: "sleep", title: "Sleep", sub: "Patterns, naps, regressions, settling, night waking.", items: ["Naps", "Regressions", "Night waking", "Self-settling"] },
    { slug: "development", title: "Development & milestones", sub: "Movement, language, social cues, healthy variation.", items: ["Rolling", "Babble", "Sitting", "Crawling"] },
    { slug: "care-and-safety", title: "Care & safety", sub: "Routine care, illness signs, safe sleep, everyday safety.", items: ["Safe sleep", "Illness signs", "Bathing", "Travel"] },
  ],
};

const recoveryColumn: ColumnProps = {
  anchor: "recovery-topics",
  eyebrow: "For you",
  heading: "Your postpartum recovery",
  subtitle: "Healing, hormones, emotions and the slower work of return.",
  bg: "--stage-recovery",
  soft: "--stage-recovery-soft",
  accent: "--stage-recovery-accent",
  deep: "--stage-recovery-deep",
  image: recoveryPathway,
  imageAlt: "A parent holding their baby in a calm room at home",
  clusters: [
    { slug: "postpartum-recovery", title: "Physical recovery", sub: "Bleeding, stitches, c-section healing, pelvic floor.", items: ["Bleeding", "Stitches", "C-section", "Pelvic floor"] },
    { slug: "emotional-wellbeing", title: "Emotional wellbeing", sub: "Mood, identity shifts, intrusive thoughts, asking for help.", items: ["Baby blues", "PND signs", "Anxiety", "Identity"] },
    { slug: "body-and-hormones", title: "Body & hormones", sub: "Cycles returning, hair, skin, intimacy, energy.", items: ["Cycle return", "Hair loss", "Intimacy", "Energy"] },
    { slug: "checkups-and-warning-signs", title: "Check-ups & warning signs", sub: "6-week check, what to raise, red flags to act on.", items: ["6-week check", "Red flags", "GP visits", "Mental health"] },
  ],
};

const ClusterCard = ({ c, accent, soft, deep }: { c: Cluster; accent: string; soft: string; deep: string }) => (
  <Link
    to={`/first-year/${c.slug}`}
    className="group flex min-h-28 items-center justify-between gap-5 border-b p-4 transition-colors hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    style={{ borderColor: `hsl(var(${accent}) / 0.22)` }}
  >
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-start gap-2.5 mb-2">
        <span
          className="mt-1 w-1 h-6 rounded-full shrink-0"
          style={{ backgroundColor: `hsl(var(${accent}) / 0.8)` }}
        />
        <h4 className="font-serif text-[1.08rem] sm:text-[1.15rem] text-foreground leading-snug flex-1">
          {c.title}
        </h4>
      </div>
      <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4 ml-[14px]">
        {c.sub}
      </p>
      <p className="ml-[14px] font-sans text-[11px] font-light text-foreground/55" aria-hidden="true">{c.items.join(" · ")}</p>
    </div>
    <ArrowUpRight size={16} strokeWidth={1.8} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: `hsl(var(${deep}))` }} />
  </Link>
);

const Column = ({ col }: { col: ColumnProps }) => (
  <div id={col.anchor} className="flex scroll-mt-24 flex-col overflow-hidden">
    <img src={col.image} alt={col.imageAlt} loading="lazy" className="aspect-[16/9] w-full rounded-lg object-cover" />
    <div className="relative mb-4 mt-6">
      <div className="flex items-center gap-3">
        <span
          className="w-1.5 h-7 rounded-full"
          style={{ backgroundColor: `hsl(var(${col.accent}))` }}
        />
        <div>
          <p
            className="font-sans text-[10px] font-light tracking-[0.24em] uppercase"
            style={{ color: `hsl(var(${col.deep}))` }}
          >
            {col.eyebrow}
          </p>
          <h3 className="font-serif text-xl sm:text-[1.45rem] text-foreground leading-snug">
            {col.heading}
          </h3>
        </div>
      </div>
      <p className="mt-2.5 ml-[22px] font-sans text-[12.5px] font-light text-muted-foreground/85 leading-relaxed max-w-xs">
        {col.subtitle}
      </p>
    </div>
    <div className="relative grid grid-cols-1 border-t" style={{ borderColor: `hsl(var(${col.accent}) / 0.22)` }}>
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
        <div className="mb-9 md:mb-12 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
            <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
            <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
              Topics
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Everything, side by side.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
            For your baby on one side, for you on the other.
          </p>
        </div>

        {/* Parallel columns at md+, stacked on mobile with quiet divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8">
          <Column col={babyColumn} />
          {/* Mobile-only divider */}
          <div className="md:hidden flex items-center gap-3 -mb-2">
            <span className="flex-1 h-px" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.2)' }} />
            <span
              className="font-sans text-[10px] font-light tracking-[0.22em] uppercase"
              style={{ color: 'hsl(var(--stage-recovery-deep))' }}
            >
              For you
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.2)' }} />
          </div>
          <Column col={recoveryColumn} />
        </div>
      </div>
    </section>
  );
};

export default FYTopicsParallel;
