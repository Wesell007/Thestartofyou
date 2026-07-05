import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { PhaseConfig } from "@/data/firstYearPhaseData";

// Resolve hero asset via Vite's import.meta.glob (eager URL imports).
const heroAssets = import.meta.glob("@/assets/firstyear-stage-*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
const resolveHero = (filename?: string): string | undefined => {
  if (!filename) return undefined;
  const match = Object.entries(heroAssets).find(([k]) => k.endsWith(`/${filename}`));
  return match?.[1];
};

type Props = { config: PhaseConfig };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-foreground/55 mb-3">
    {children}
  </p>
);

const QuietRule = () => (
  <div className="h-px w-full" style={{ backgroundColor: "hsl(var(--border) / 0.55)" }} />
);

const PhaseHero = ({ config }: Props) => {
  const imgSrc = resolveHero(config.heroImage);

  return (
    <section className="relative bg-parchment pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none flex">
        <div
          className="w-1/2 h-full blur-3xl opacity-50"
          style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.26)" }}
        />
        <div
          className="w-1/2 h-full blur-3xl opacity-50"
          style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.22)" }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-7 bg-foreground/25" />
              <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
                First year · Month by month
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.08] mb-5">
              {config.title}
            </h1>
            <p className="font-sans text-[16px] md:text-[17px] font-light text-muted-foreground leading-relaxed max-w-xl">
              {config.intro}
            </p>
            <p className="font-sans text-[12px] font-light tracking-[0.2em] uppercase text-foreground/50 mt-7">
              {config.ageRange}
            </p>
          </div>

          <div className="hidden md:block">
            {imgSrc ? (
              <div
                className="relative w-full aspect-[5/6] max-w-[460px] ml-auto overflow-hidden rounded-2xl border"
                style={{ borderColor: "hsl(var(--border) / 0.7)" }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: config.heroObjectPosition ?? "center 40%" }}
                />
              </div>
            ) : (
              <div
                className="relative w-full aspect-[5/6] max-w-[460px] ml-auto overflow-hidden rounded-2xl border"
                style={{ borderColor: "hsl(var(--border) / 0.7)" }}
              >
                <div className="absolute inset-0 grid grid-cols-2">
                  <div style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.5)" }} />
                  <div style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.45)" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const InPhaseAges = ({ ages }: { ages: string[] }) => (
  <section className="bg-parchment py-10 md:py-12">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>In this phase</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {ages.map((a) => (
          <span
            key={a}
            className="inline-flex items-center rounded-full px-4 py-2 font-sans text-[12px] font-light border"
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.35)",
              color: "hsl(var(--stage-firstyear-deep))",
              borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)",
            }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const PairedSection = ({ config }: Props) => (
  <section className="bg-parchment py-12 md:py-16">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 items-stretch">
        <div
          className="relative overflow-hidden rounded-[22px] border p-6 md:p-8 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.28)]"
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.26)",
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)",
          }}
        >
          <div
            className="absolute -top-16 -left-16 w-52 h-52 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.6)" }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.7), transparent)' }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-firstyear-accent))" }}
              />
              <p
                className="font-sans text-[10px] font-light tracking-[0.25em] uppercase"
                style={{ color: "hsl(var(--stage-firstyear-deep))" }}
              >
                For your baby
              </p>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-5">
              Baby changes in this phase
            </h2>
            <ul className="space-y-4">
              {config.babyChanges.map((b) => (
                <li key={b.label}>
                  <p
                    className="font-sans text-[11px] font-light tracking-wider uppercase mb-1"
                    style={{ color: "hsl(var(--stage-firstyear-deep))" }}
                  >
                    {b.label}
                  </p>
                  <p className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[22px] border p-6 md:p-8 shadow-[0_24px_60px_-40px_rgba(60,40,55,0.24)]"
          style={{
            backgroundColor: "hsl(var(--stage-recovery-soft) / 0.22)",
            borderColor: "hsl(var(--stage-recovery-accent) / 0.18)",
          }}
        >
          <div
            className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-55 pointer-events-none"
            style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.55)" }}
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.65), transparent)' }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-recovery-accent))" }}
              />
              <p
                className="font-sans text-[10px] font-light tracking-[0.25em] uppercase"
                style={{ color: "hsl(var(--stage-recovery-deep))" }}
              >
                For you
              </p>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-5">
              Recovery and adjustment in this phase
            </h2>
            <ul className="space-y-4">
              {config.parentRecovery.map((b) => (
                <li key={b.label}>
                  <p
                    className="font-sans text-[11px] font-light tracking-wider uppercase mb-1"
                    style={{ color: "hsl(var(--stage-recovery-deep))" }}
                  >
                    {b.label}
                  </p>
                  <p className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CommonQuestions = ({ items }: { items: PhaseConfig["commonQuestions"] }) => (
  <section className="bg-parchment py-12 md:py-16">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
      <SectionLabel>Common questions</SectionLabel>
      <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-8">
        Things parents often ask in this phase.
      </h2>
      <ul className="space-y-5">
        {items.map((qa) => (
          <li key={qa.q}>
            <p className="font-serif text-[17px] text-foreground leading-snug mb-1.5">{qa.q}</p>
            <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">{qa.a}</p>
            <div className="mt-5"><QuietRule /></div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const FeaturedGuidance = ({ items }: { items: PhaseConfig["featuredGuidance"] }) => (
  <section className="bg-parchment py-12 md:py-16">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>Featured guidance</SectionLabel>
      <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-8">
        A few places to start.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {items.map((g) => (
          <Link
            key={g.title}
            to={`/ask?q=${encodeURIComponent(g.title)}&stage=first-year`}
            className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-soft hover:-translate-y-[1px]"
            style={{ borderColor: "hsl(var(--border) / 0.7)" }}
          >
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-3 text-foreground/55">
              Guidance
            </p>
            <h3 className="font-serif text-[18px] text-foreground leading-snug mb-2.5">{g.title}</h3>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
              {g.description}
            </p>
            <span className="inline-flex items-center gap-1 font-sans text-[11px] font-light text-foreground/65 group-hover:text-foreground/90 transition-colors">
              Read guidance <ArrowUpRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const RelatedTopics = ({ items }: { items: PhaseConfig["relatedTopics"] }) => (
  <section className="bg-parchment py-12 md:py-14">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>Related First Year topics</SectionLabel>
      <div className="flex flex-wrap gap-2.5">
        {items.map((t) => (
          <Link
            key={t.href}
            to={t.href}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[13px] font-light border bg-card transition-colors hover:bg-parchment-dark"
            style={{
              borderColor: "hsl(var(--border) / 0.7)",
              color: "hsl(var(--foreground) / 0.85)",
            }}
          >
            {t.label}
            <ArrowUpRight size={12} className="opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Endcap = () => (
  <section
    className="py-14 md:py-16"
    style={{
      background:
        "linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--stage-firstyear-soft) / 0.18) 100%)",
    }}
  >
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl text-center">
      <p className="font-serif italic text-foreground/65 text-[17px] leading-relaxed mb-7">
        Whichever phase you are in, you are not behind. You are with your baby, and that counts for a great deal.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/first-year"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border bg-card text-foreground/85 hover:bg-parchment-dark transition-colors"
          style={{ borderColor: "hsl(var(--border) / 0.7)" }}
        >
          <ArrowLeft size={12} /> Back to First Year
        </Link>
        <Link
          to="/first-year#baby-topics"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border transition-colors"
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.5)",
            color: "hsl(var(--stage-firstyear-deep))",
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.28)",
          }}
        >
          Explore baby topics
        </Link>
        <Link
          to="/first-year#recovery-topics"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border transition-colors"
          style={{
            backgroundColor: "hsl(var(--stage-recovery-soft) / 0.42)",
            color: "hsl(var(--stage-recovery-deep))",
            borderColor: "hsl(var(--stage-recovery-accent) / 0.26)",
          }}
        >
          Explore postpartum recovery
        </Link>
      </div>
    </div>
  </section>
);

const FirstYearPhasePage = ({ config }: Props) => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <PhaseHero config={config} />
        <InPhaseAges ages={config.ages} />
        <PairedSection config={config} />
        <CommonQuestions items={config.commonQuestions} />
        <FeaturedGuidance items={config.featuredGuidance} />
        <RelatedTopics items={config.relatedTopics} />
        <Endcap />
      </main>
      <Footer />
    </div>
  );
};

export default FirstYearPhasePage;
