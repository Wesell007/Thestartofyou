import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { MonthGuide, EditorialSection, FocusSection } from "@/data/firstYearMonthData";
import { getAdjacentMonths, getMonthImagery } from "@/data/firstYearMonthData";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { HOME_CRUMB, FIRST_YEAR_CRUMB } from "@/lib/seo/journeyCrumbs";


type Props = { guide: MonthGuide };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/55 mb-3">
    {children}
  </p>
);

const askHref = (guide: MonthGuide, topic: string) =>
  `/ask?stage=first-year&month=${guide.slug}&topic=${topic}`;

/* ---------------------------------------------------------------- HERO */

const Hero = ({ guide }: Props) => {
  const { prev, next } = getAdjacentMonths(guide.slug);
  const img = getMonthImagery(guide.slug);
  // Single authoritative crumb array: feeds the visible trail and the schema.
  const breadcrumbItems: BreadcrumbItem[] = [
    HOME_CRUMB,
    FIRST_YEAR_CRUMB,
    { label: guide.label, href: `/first-year/${guide.slug}` },
  ];

  return (
    <section className="relative bg-parchment pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none flex">
        <div className="w-1/2 h-full blur-3xl opacity-50" style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.28)" }} />
        <div className="w-1/2 h-full blur-3xl opacity-50" style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.24)" }} />
      </div>
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl relative">
        <BreadcrumbJsonLd items={breadcrumbItems} />
        <Breadcrumbs
          tone="section"
          className="mb-8 font-sans tracking-wide"

          items={breadcrumbItems}
        />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-10 md:gap-14 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-7 bg-foreground/25" />
              <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
                First year · Month guide
              </span>
            </div>
            <p className="font-sans text-[12px] font-light tracking-[0.22em] uppercase mb-4" style={{ color: "hsl(var(--stage-firstyear-deep))" }}>
              {guide.label}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.08] mb-5">
              {guide.title}
            </h1>
            <p className="font-sans text-[16px] md:text-[17px] font-light text-muted-foreground leading-relaxed">
              {guide.standfirst}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] font-sans font-light">
              <Link
                to="/first-year"
                className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 hover:-translate-y-[1px] transition-transform"
                style={{ borderColor: "hsl(var(--border) / 0.7)", color: "hsl(var(--foreground) / 0.75)" }}
              >
                <ArrowLeft size={12} /> First year hub
              </Link>
              <Link
                to={guide.phase.href}
                className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 hover:-translate-y-[1px] transition-transform"
                style={{
                  borderColor: "hsl(var(--stage-firstyear-accent) / 0.35)",
                  backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.45)",
                  color: "hsl(var(--stage-firstyear-deep))",
                }}
              >
                Phase: {guide.phase.label}
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-5" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
              {prev ? (
                <Link to={`/first-year/${prev.slug}`} className="group inline-flex items-center gap-2 font-sans text-[12px] font-light text-foreground/70 hover:text-foreground">
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                  <span>
                    <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Previous</span>
                    {prev.label}
                  </span>
                </Link>
              ) : (<span />)}
              {next ? (
                <Link to={`/first-year/${next.slug}`} className="group inline-flex items-center gap-2 font-sans text-[12px] font-light text-foreground/70 hover:text-foreground text-right">
                  <span>
                    <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Next</span>
                    {next.label}
                  </span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (<span />)}
            </div>
          </div>

          {/* Hero image column */}
          <div className="relative">
            <div
              className="absolute -inset-4 md:-inset-6 rounded-[32px] blur-2xl opacity-70 -z-10"
              style={{ backgroundImage: "linear-gradient(140deg, hsl(var(--stage-firstyear-soft) / 0.55), hsl(var(--stage-recovery-soft) / 0.45))" }}
            />
            <div
              className="relative overflow-hidden rounded-[26px] border shadow-[0_40px_90px_-40px_rgba(20,30,60,0.35)]"
              style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)" }}
            >
              <img
                src={img.hero.src}
                alt={img.hero.alt}
                width={1600}
                height={1100}
                className="w-full h-full object-cover aspect-[4/5] md:aspect-[5/6]"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(to top, hsl(var(--parchment) / 0.85), transparent)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------- STORY IMAGE BAND */

const StoryBand = ({
  src, alt, caption, tint,
}: { src: string; alt: string; caption: string; tint: "firstyear" | "recovery" }) => {
  const soft = tint === "recovery" ? "var(--stage-recovery-soft)" : "var(--stage-firstyear-soft)";
  const deep = tint === "recovery" ? "var(--stage-recovery-deep)" : "var(--stage-firstyear-deep)";
  return (
    <section className="bg-parchment pt-4 pb-4 md:pt-6 md:pb-6">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <figure
          className="relative overflow-hidden rounded-[28px] border shadow-[0_36px_80px_-44px_rgba(20,30,60,0.32)]"
          style={{ borderColor: `hsl(${soft} / 0.7)` }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            width={1400}
            height={1000}
            className="w-full h-auto object-cover aspect-[16/9] md:aspect-[21/9]"
          />
          <figcaption
            className="absolute bottom-4 left-4 md:bottom-6 md:left-6 max-w-md rounded-full px-4 py-2 backdrop-blur-sm font-serif italic text-[13px] md:text-[14px] leading-relaxed"
            style={{ backgroundColor: `hsl(${soft} / 0.85)`, color: `hsl(${deep})` }}
          >
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};


/* -------------------------------------------------------- SHORT VERSION */

const ShortVersion = ({ guide }: Props) => {
  const rows: { label: string; value: string }[] = [
    { label: "Your baby", value: guide.shortVersion.baby },
    { label: "Feeding", value: guide.shortVersion.feeding },
    { label: "Sleep", value: guide.shortVersion.sleep },
    { label: "You", value: guide.shortVersion.you },
    { label: "When to ask", value: guide.shortVersion.whenToAsk },
  ];
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <SectionLabel>The short version</SectionLabel>
        <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground leading-tight mb-6">
          This month at a glance
        </h2>
        <div
          className="rounded-[24px] border bg-card p-7 md:p-9 shadow-[0_18px_50px_-32px_rgba(20,30,60,0.22)]"
          style={{ borderColor: "hsl(var(--border) / 0.7)" }}
        >
          <ul className="divide-y" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
            {rows.map((row) => (
              <li key={row.label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 py-4 first:pt-0 last:pb-0">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.22em] uppercase pt-1"
                  style={{ color: "hsl(var(--stage-firstyear-deep))" }}
                >
                  {row.label}
                </span>
                <span className="font-sans text-[15px] font-light text-foreground/85 leading-relaxed">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------- EDITORIAL SECTION */

const Editorial = ({
  kicker,
  title,
  section,
  tint = "firstyear",
}: {
  kicker: string;
  title: string;
  section: EditorialSection;
  tint?: "firstyear" | "recovery";
}) => {
  const deep = tint === "recovery" ? "var(--stage-recovery-deep)" : "var(--stage-firstyear-deep)";
  const accent = tint === "recovery" ? "var(--stage-recovery-accent)" : "var(--stage-firstyear-accent)";
  return (
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <p className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3" style={{ color: `hsl(${deep})` }}>
        {kicker}
      </p>
      <h2 className="font-serif text-[1.9rem] sm:text-3xl md:text-[2.1rem] text-foreground leading-[1.15] mb-5">
        {title}
      </h2>
      <span className="block h-px w-16 mb-8" style={{ backgroundColor: `hsl(${accent} / 0.55)` }} />
      <p className="font-sans text-[16px] md:text-[17px] font-light text-foreground/85 leading-[1.75] mb-10">
        {section.intro}
      </p>
      <div className="space-y-9">
        {section.subsections.map((s, idx) => (
          <div key={s.heading} className={idx > 0 ? "pt-9 border-t" : ""} style={idx > 0 ? { borderColor: "hsl(var(--border) / 0.5)" } : undefined}>
            <h3 className="font-serif text-[1.35rem] md:text-[1.45rem] text-foreground leading-snug mb-3">
              {s.heading}
            </h3>
            <p className="font-sans text-[15.5px] font-light text-foreground/80 leading-[1.75]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BabySection = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-24">
    <Editorial
      kicker="Your baby this month"
      title="What your baby may be doing"
      section={guide.babyEditorial}
      tint="firstyear"
    />
  </section>
);

const YouSection = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-24">
    <Editorial
      kicker="You this month"
      title="How this stage may feel for you"
      section={guide.youEditorial}
      tint="recovery"
    />
  </section>
);

/* --------------------------------------------------- FOCUS SECTION (feeding / sleep) */

const Focus = ({
  kicker,
  title,
  section,
  tint,
}: {
  kicker: string;
  title: string;
  section: FocusSection;
  tint: "firstyear" | "recovery";
}) => {
  const soft = tint === "recovery" ? "var(--stage-recovery-soft)" : "var(--stage-firstyear-soft)";
  const accent = tint === "recovery" ? "var(--stage-recovery-accent)" : "var(--stage-firstyear-accent)";
  const deep = tint === "recovery" ? "var(--stage-recovery-deep)" : "var(--stage-firstyear-deep)";
  return (
    <section className="bg-background py-16 md:py-22">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div
          className="relative rounded-[26px] border p-8 md:p-11 overflow-hidden shadow-[0_22px_60px_-34px_rgba(20,30,60,0.22)]"
          style={{
            borderColor: `hsl(${accent} / 0.22)`,
            backgroundImage: `linear-gradient(160deg, hsl(${soft} / 0.5) 0%, hsl(var(--card)) 62%)`,
          }}
        >
          <span className="absolute inset-y-8 left-0 w-[3px] rounded-full" style={{ backgroundColor: `hsl(${accent} / 0.55)` }} />
          <p className="font-sans text-[11px] font-light tracking-[0.28em] uppercase mb-3" style={{ color: `hsl(${deep})` }}>
            {kicker}
          </p>
          <h2 className="font-serif text-2xl md:text-[1.9rem] text-foreground leading-tight mb-5">
            {title}
          </h2>
          <p className="font-sans text-[15.5px] md:text-[16px] font-light text-foreground/85 leading-[1.75] mb-6">
            {section.intro}
          </p>
          <ul className="space-y-3.5 mb-7">
            {section.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: `hsl(${accent})` }}
                />
                <span className="font-sans text-[15px] font-light text-foreground/80 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          {section.safeSleep ? (
            <div
              className="rounded-[16px] border p-5 mb-6"
              style={{ borderColor: `hsl(${accent} / 0.28)`, backgroundColor: `hsl(${soft} / 0.55)` }}
            >
              <p className="font-sans text-[10px] font-light tracking-[0.24em] uppercase mb-1.5" style={{ color: `hsl(${deep})` }}>
                Safe sleep
              </p>
              <p className="font-sans text-[14.5px] font-light text-foreground/85 leading-relaxed">{section.safeSleep}</p>
            </div>
          ) : null}
          <div className="border-t pt-5" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
            <p className="font-sans text-[10px] font-light tracking-[0.24em] uppercase mb-1.5" style={{ color: `hsl(${deep})` }}>
              When to ask
            </p>
            <p className="font-sans text-[14.5px] font-light text-foreground/85 leading-relaxed">{section.whenToAsk}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeedingSection = ({ guide }: Props) => (
  <Focus kicker="Feeding this month" title="Feeding, in a little more depth" section={guide.feedingSection} tint="firstyear" />
);

const SleepSection = ({ guide }: Props) => (
  <Focus kicker="Sleep this month" title="Sleep, in a little more depth" section={guide.sleepSection} tint="recovery" />
);

/* -------------------------------------------------- FEELS HARD / WHAT HELPS */

const FeelsAndHelps = ({ guide }: Props) => (
  <section className="bg-background py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {[
        {
          title: "What often feels hard",
          intro: guide.feelsHardIntro,
          items: guide.feelsHard,
          accent: "var(--stage-recovery-accent)",
          deep: "var(--stage-recovery-deep)",
        },
        {
          title: "What can help",
          intro: guide.whatHelpsIntro,
          items: guide.whatHelps,
          accent: "var(--stage-firstyear-accent)",
          deep: "var(--stage-firstyear-deep)",
        },
      ].map((col) => (
        <div
          key={col.title}
          className="rounded-[22px] border bg-card p-7 md:p-8 shadow-[0_18px_50px_-32px_rgba(20,30,60,0.22)]"
          style={{ borderColor: "hsl(var(--border) / 0.75)" }}
        >
          <h2 className="font-serif text-xl md:text-[1.5rem] text-foreground mb-3">{col.title}</h2>
          <p className="font-sans text-[14.5px] font-light text-foreground/70 leading-relaxed mb-6">
            {col.intro}
          </p>
          <ul className="divide-y" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
            {col.items.map((line, idx) => (
              <li key={line} className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
                <span
                  className="mt-0.5 shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-sans font-light"
                  style={{ backgroundColor: `hsl(${col.accent} / 0.16)`, color: `hsl(${col.deep})` }}
                >
                  {idx + 1}
                </span>
                <span className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------ SUPPORT PANEL */

const WhenToAsk = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>When to ask for support</SectionLabel>
      <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground mb-6">
        Your health visitor, GP, midwife or NHS 111 are all here to help
      </h2>
      <div
        className="rounded-[22px] border bg-card p-7 md:p-9"
        style={{ borderColor: "hsl(var(--stage-recovery-accent) / 0.28)" }}
      >
        <ul className="space-y-6">
          {guide.support.map((item) => (
            <li key={item.when} className="flex items-start gap-4">
              <span
                className="mt-1 shrink-0 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-recovery-accent))" }}
              />
              <div>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 mb-2 font-sans text-[10px] font-light tracking-[0.22em] uppercase"
                  style={{
                    backgroundColor: "hsl(var(--stage-recovery-soft) / 0.55)",
                    color: "hsl(var(--stage-recovery-deep))",
                  }}
                >
                  {item.when}
                </span>
                <p className="font-sans text-[15px] font-light text-foreground/85 leading-relaxed">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* --------------------------------------------------- COMMON QUESTIONS */

const CommonQuestions = ({ guide }: Props) => (
  <section className="bg-background py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>Common questions</SectionLabel>
      <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground mb-8">
        Questions parents often ask at {guide.label.toLowerCase()}
      </h2>
      <ul className="space-y-4">
        {guide.questions.map((q) => (
          <li
            key={q.question}
            className="rounded-[22px] border bg-card p-6 md:p-7 transition-all hover:-translate-y-[1px] hover:shadow-[0_24px_60px_-36px_rgba(20,30,60,0.28)]"
            style={{ borderColor: "hsl(var(--border) / 0.75)" }}
          >
            <h3 className="font-serif text-[1.15rem] md:text-[1.2rem] text-foreground leading-snug mb-3">{q.question}</h3>
            <p className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed mb-5">{q.answer}</p>
            <div className="flex flex-wrap gap-2">
              {q.readMore ? (
                <Link
                  to={q.readMore.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-sans text-[12px] font-light border transition-all hover:-translate-y-[1px]"
                  style={{
                    backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.4)",
                    borderColor: "hsl(var(--stage-firstyear-accent) / 0.3)",
                    color: "hsl(var(--stage-firstyear-deep))",
                  }}
                >
                  <BookOpen size={12} /> {q.readMore.label}
                </Link>
              ) : null}
              <Link
                to={askHref(guide, q.askTopic)}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-sans text-[12px] font-light border transition-all hover:-translate-y-[1px]"
                style={{
                  backgroundColor: "hsl(var(--stage-recovery-soft) / 0.4)",
                  borderColor: "hsl(var(--stage-recovery-accent) / 0.3)",
                  color: "hsl(var(--stage-recovery-deep))",
                }}
              >
                <Sparkles size={12} /> Ask about this
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* --------------------------------------------------- RELATED / REFERENCES */

const RelatedGuidance = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>Related guidance</SectionLabel>
      <h2 className="font-serif text-2xl md:text-[1.7rem] text-foreground mb-8">Deeper reads from the First Year hub</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {guide.related.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group rounded-[22px] border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-36px_rgba(20,30,60,0.28)]"
            style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)" }}
          >
            <p className="font-sans text-[10px] font-light tracking-[0.24em] uppercase mb-3" style={{ color: "hsl(var(--stage-firstyear-deep))" }}>
              {item.kicker}
            </p>
            <h3 className="font-serif text-[1.1rem] text-foreground leading-snug mb-6">{item.label}</h3>
            <span className="inline-flex items-center gap-1 font-sans text-[12px] font-light text-foreground/70 group-hover:text-foreground">
              Read guide <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const References = ({ guide }: Props) => (
  <section className="bg-background py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>References and guidance</SectionLabel>
      <div
        className="rounded-[22px] border p-7 md:p-8"
        style={{ backgroundColor: "hsl(var(--parchment-dark) / 0.4)", borderColor: "hsl(var(--border) / 0.7)" }}
      >
        <ul className="space-y-4">
          {guide.sources.map((s, idx) => (
            <li key={s.url} className="grid grid-cols-[32px_1fr] gap-4">
              <span className="font-sans text-[12px] font-light tabular-nums text-foreground/45 pt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 font-sans text-[14.5px] font-light text-foreground hover:underline"
                >
                  {s.label}
                  <ExternalLink size={12} className="mt-1 shrink-0 opacity-60" />
                </a>
                <p className="font-sans text-[12px] font-light text-foreground/55 mt-0.5">{s.publisher}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- PAGE */

const FirstYearMonthPage = ({ guide }: Props) => {
  const { prev, next } = getAdjacentMonths(guide.slug);
  const imagery = getMonthImagery(guide.slug);
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <Hero guide={guide} />
      <ShortVersion guide={guide} />
      <BabySection guide={guide} />
      <StoryBand src={imagery.baby.src} alt={imagery.baby.alt} caption={imagery.baby.caption} tint="firstyear" />
      <FeedingSection guide={guide} />
      <SleepSection guide={guide} />
      <StoryBand src={imagery.parent.src} alt={imagery.parent.alt} caption={imagery.parent.caption} tint="recovery" />
      <YouSection guide={guide} />

      <FeelsAndHelps guide={guide} />
      <WhenToAsk guide={guide} />
      <CommonQuestions guide={guide} />
      <RelatedGuidance guide={guide} />
      <References guide={guide} />

      {/* Foot rail: prev / next */}
      <section className="bg-parchment pb-20">
        <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
          <div
            className="flex items-center justify-between border-t pt-6"
            style={{ borderColor: "hsl(var(--border) / 0.55)" }}
          >
            {prev ? (
              <Link to={`/first-year/${prev.slug}`} className="group inline-flex items-center gap-2 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                <span>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Previous</span>
                  {prev.label}
                </span>
              </Link>
            ) : (
              <Link to={guide.phase.href} className="group inline-flex items-center gap-2 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground">
                <ArrowLeft size={14} />
                <span>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Phase</span>
                  {guide.phase.label}
                </span>
              </Link>
            )}
            {next ? (
              <Link to={`/first-year/${next.slug}`} className="group inline-flex items-center gap-2 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground text-right">
                <span>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Next</span>
                  {next.label}
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <Link to={guide.phase.href} className="group inline-flex items-center gap-2 font-sans text-[13px] font-light text-foreground/75 hover:text-foreground text-right">
                <span>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Continue</span>
                  {guide.phase.label}
                </span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FirstYearMonthPage;
