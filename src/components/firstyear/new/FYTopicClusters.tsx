import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { FirstYearTopicSlug } from "@/data/firstYearTopicData";

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
    className="group relative overflow-hidden rounded-[22px] border bg-card p-5 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(20,30,60,0.28)]"
    style={{ borderColor: `hsl(var(${accent}) / 0.18)` }}
  >
    {/* Gradient background wash */}
    <div
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(${soft}) / 0.28) 0%, transparent 60%)`,
      }}
      aria-hidden
    />
    {/* Top-corner bloom */}
    <div
      className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
      style={{ backgroundColor: `hsl(var(${soft}) / 0.7)` }}
      aria-hidden
    />
    {/* Inner highlight */}
    <div
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.65), transparent)' }}
      aria-hidden
    />

    <div className="relative flex flex-col flex-1">
      <div className="flex items-start gap-2.5 mb-2">
        <span
          className="mt-1 w-1 h-6 rounded-full shrink-0"
          style={{ backgroundColor: `hsl(var(${accent}) / 0.8)` }}
        />
        <h4 className="font-serif text-[1.08rem] sm:text-[1.15rem] text-foreground leading-snug flex-1">
          {c.title}
        </h4>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{
            borderColor: `hsl(var(${accent}) / 0.28)`,
            backgroundColor: `hsl(var(${soft}) / 0.55)`,
          }}
        >
          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            style={{ color: `hsl(var(${deep}))` }}
          />
        </span>
      </div>
      <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4 ml-[14px]">
        {c.sub}
      </p>
      <ul className="flex flex-wrap gap-1.5 mt-auto ml-[14px]" aria-hidden="true">
        {c.items.map((it) => (
          <li
            key={it}
            className="font-sans text-[11.5px] font-light px-2.5 py-1 rounded-full border"
            style={{
              borderColor: `hsl(var(${accent}) / 0.22)`,
              color: `hsl(var(${deep}))`,
              backgroundColor: `hsl(var(${soft}) / 0.4)`,
            }}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  </Link>
);

const Column = ({ col }: { col: ColumnProps }) => (
  <div id={col.anchor} className="relative flex flex-col scroll-mt-24 rounded-[26px] p-5 sm:p-6 md:p-7 overflow-hidden border"
    style={{
      borderColor: `hsl(var(${col.accent}) / 0.14)`,
      backgroundImage: `linear-gradient(180deg, hsl(var(${col.bg}) / 0.32) 0%, hsl(var(${col.bg}) / 0.12) 100%)`,
    }}
  >
    {/* Ambient bloom */}
    <div
      className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-55 pointer-events-none"
      style={{ backgroundColor: `hsl(var(${col.soft}) / 0.5)` }}
      aria-hidden
    />
    {/* Column header */}
    <div className="relative mb-6">
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
    <div className="relative grid grid-cols-1 gap-3.5">
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
