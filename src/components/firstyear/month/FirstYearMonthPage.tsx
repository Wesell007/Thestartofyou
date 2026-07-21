import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { MonthGuide } from "@/data/firstYearMonthData";
import { getAdjacentMonths } from "@/data/firstYearMonthData";

type Props = { guide: MonthGuide };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/55 mb-3">
    {children}
  </p>
);

const askHref = (guide: MonthGuide, topic: string) =>
  `/ask?stage=first-year&month=${guide.slug}&topic=${topic}`;

const Hero = ({ guide }: Props) => {
  const { prev, next } = getAdjacentMonths(guide.slug);
  return (
    <section className="relative bg-parchment pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none flex">
        <div className="w-1/2 h-full blur-3xl opacity-50" style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.26)" }} />
        <div className="w-1/2 h-full blur-3xl opacity-50" style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.22)" }} />
      </div>
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-px w-7 bg-foreground/25" />
          <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
            First year · Month guide
          </span>
        </div>
        <p className="font-sans text-[12px] font-light tracking-[0.22em] uppercase mb-4" style={{ color: "hsl(var(--stage-firstyear-deep))" }}>
          {guide.label}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] text-foreground leading-[1.1] mb-5">
          {guide.title}
        </h1>
        <p className="font-sans text-[16px] md:text-[17px] font-light text-muted-foreground leading-relaxed max-w-2xl">
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
            <Link
              to={`/first-year/${prev.slug}`}
              className="group inline-flex items-center gap-2 font-sans text-[12px] font-light text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              <span>
                <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Previous</span>
                {prev.label}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/first-year/${next.slug}`}
              className="group inline-flex items-center gap-2 font-sans text-[12px] font-light text-foreground/70 hover:text-foreground text-right"
            >
              <span>
                <span className="block text-[10px] tracking-[0.22em] uppercase text-foreground/45">Next</span>
                {next.label}
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
};

const AtAGlance = ({ guide }: Props) => (
  <section className="bg-background py-16 md:py-20">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>At a glance</SectionLabel>
      <div
        className="rounded-[22px] border bg-card p-7 md:p-9 shadow-[0_18px_50px_-32px_rgba(20,30,60,0.22)]"
        style={{ borderColor: "hsl(var(--border) / 0.7)" }}
      >
        <ul className="divide-y" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
          {guide.atAGlance.map((row) => (
            <li key={row.label} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-6 py-3.5 first:pt-0 last:pb-0">
              <span
                className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
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

const PairedSection = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {[
        {
          kicker: "For your baby",
          title: "Your baby this month",
          items: guide.baby,
          soft: "var(--stage-firstyear-soft)",
          accent: "var(--stage-firstyear-accent)",
          deep: "var(--stage-firstyear-deep)",
        },
        {
          kicker: "For you",
          title: "You this month",
          items: guide.you,
          soft: "var(--stage-recovery-soft)",
          accent: "var(--stage-recovery-accent)",
          deep: "var(--stage-recovery-deep)",
        },
      ].map((col) => (
        <div
          key={col.kicker}
          className="relative rounded-[24px] border p-7 md:p-9 overflow-hidden shadow-[0_22px_60px_-34px_rgba(20,30,60,0.24)]"
          style={{
            borderColor: `hsl(${col.accent} / 0.22)`,
            backgroundImage: `linear-gradient(160deg, hsl(${col.soft} / 0.55) 0%, hsl(var(--card)) 60%)`,
          }}
        >
          <span className="absolute inset-y-6 left-0 w-[3px] rounded-full" style={{ backgroundColor: `hsl(${col.accent} / 0.5)` }} />
          <p className="font-sans text-[10px] font-light tracking-[0.28em] uppercase mb-2" style={{ color: `hsl(${col.deep})` }}>
            {col.kicker}
          </p>
          <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground leading-tight mb-6">{col.title}</h2>
          <ul className="space-y-5">
            {col.items.map((item) => (
              <li key={item.title}>
                <h3 className="font-serif text-[1.05rem] text-foreground mb-1.5">{item.title}</h3>
                <p className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const FeelsAndHelps = ({ guide }: Props) => (
  <section className="bg-background py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {[
        { title: "What often feels hard", items: guide.feelsHard, accent: "var(--stage-recovery-accent)", deep: "var(--stage-recovery-deep)" },
        { title: "What can help", items: guide.whatHelps, accent: "var(--stage-firstyear-accent)", deep: "var(--stage-firstyear-deep)" },
      ].map((col) => (
        <div
          key={col.title}
          className="rounded-[22px] border bg-card p-7 md:p-8 shadow-[0_18px_50px_-32px_rgba(20,30,60,0.22)]"
          style={{ borderColor: "hsl(var(--border) / 0.75)" }}
        >
          <h2 className="font-serif text-xl md:text-[1.4rem] text-foreground mb-5">{col.title}</h2>
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

const WhenToAsk = ({ guide }: Props) => (
  <section className="bg-parchment py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>When to ask for support</SectionLabel>
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

const FirstYearMonthPage = ({ guide }: Props) => {
  const { prev, next } = getAdjacentMonths(guide.slug);
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <Hero guide={guide} />
      <AtAGlance guide={guide} />
      <PairedSection guide={guide} />
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
