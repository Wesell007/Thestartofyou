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
  soft: string;
  accent: string;
  deep: string;
  clusters: Cluster[];
}

const babyColumn: ColumnProps = {
  // anchor used for hero/sticky-nav deep links

  anchor: "baby-topics",
  eyebrow: "For your baby",
  heading: "Baby's first year",
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
    className="group rounded-2xl border bg-card p-5 sm:p-6 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
    style={{ borderColor: `hsl(var(${accent}) / 0.16)` }}
  >
    <div className="flex items-center gap-2.5 mb-2.5">
      <span
        className="w-1 h-5 rounded-full"
        style={{ backgroundColor: `hsl(var(${accent}) / 0.7)` }}
      />
      <h4 className="font-serif text-base sm:text-[1.05rem] text-foreground leading-snug flex-1">
        {c.title}
      </h4>
      <ArrowUpRight
        size={15}
        strokeWidth={1.8}
        style={{ color: `hsl(var(${accent}))` }}
        className="shrink-0 opacity-60 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </div>
    <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed mb-3.5">
      {c.sub}
    </p>
    <ul className="flex flex-wrap gap-1.5 mt-auto" aria-hidden="true">
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
  </Link>
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
          <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3 text-foreground/55">
            Topics
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Everything, side by side.
          </h2>
          <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">
            For your baby on one side, for you on the other.
          </p>
        </div>

        {/* Parallel columns at md+, stacked on mobile with quiet divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-10">
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
