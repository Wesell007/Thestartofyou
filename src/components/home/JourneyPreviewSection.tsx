import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MyWeekBabyImage from "@/components/myweek/MyWeekBabyImage";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";

/**
 * Truthful homepage product preview.
 *
 * Replaces the earlier generic "Your Dashboard" glimpse with a calm,
 * editorial composition of three real product surfaces:
 *   - My Week (live weekly anchor) — primary
 *   - My Journey (saved memory spine) — secondary
 *   - Kept Chapter (preserved week page) — tertiary
 *
 * No invented widgets. No progress bars. No SaaS chrome. Each card
 * faithfully mirrors the visual language of its real surface using the
 * same tokens (keepsake-surface, pregnancy stage accent, MyWeekBabyImage,
 * serif type, parchment background).
 */

const PRIMARY_WEEK = 18;
const KEPT_WEEK = 12;

const accent = "hsl(var(--stage-pregnancy-accent))";
const accentSoft = (a: number) => `hsl(var(--stage-pregnancy-accent) / ${a})`;
const tint = (a: number) => `hsl(var(--stage-pregnancy) / ${a})`;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase"
    style={{ color: accent }}
  >
    {children}
  </p>
);

// ─── My Week preview ───────────────────────────────────────────────────────
const MyWeekPreview = () => {
  const identity = getWeekIdentity(PRIMARY_WEEK);
  const content = getMyWeekContent(PRIMARY_WEEK);

  return (
    <article
      aria-label="Preview of My Week"
      className="relative rounded-[24px] keepsake-surface overflow-hidden"
      style={{ borderColor: accentSoft(0.18) }}
    >
      <div className="px-7 sm:px-9 pt-7 sm:pt-9 pb-7 sm:pb-8">
        <div className="flex items-center justify-between mb-5">
          <Eyebrow>Current week · Week {PRIMARY_WEEK}</Eyebrow>
          <span className="font-sans text-[10px] font-light tracking-[0.22em] uppercase text-foreground/45">
            Second trimester
          </span>
        </div>

        {/* Greeting + due meta */}
        <p className="font-serif text-foreground text-[1.15rem] sm:text-[1.25rem] leading-tight mb-1.5">
          Good afternoon, Anna
        </p>
        <p className="font-sans text-[11.5px] font-light text-foreground/55 mb-6">
          Due 14 October · 22 weeks to go
        </p>

        {/* Chapter heading + baby image */}
        <div className="flex items-start gap-5 sm:gap-6 mb-6">
          <div
            className="shrink-0 w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 75%)",
              border: `1px solid ${accentSoft(0.22)}`,
            }}
          >
            <MyWeekBabyImage
              week={PRIMARY_WEEK}
              className="w-full h-full flex items-center justify-center"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="font-serif font-medium text-foreground text-[1.45rem] sm:text-[1.65rem] leading-[1.1] mb-2">
              {identity.chapterTitle}
            </h3>
            <p className="font-serif italic text-foreground/60 text-[14px] leading-[1.5]">
              {identity.theme}
            </p>
          </div>
        </div>

        {/* Lead paragraph — mirrors Slot 1 lead */}
        <p className="font-serif text-foreground/75 text-[15px] sm:text-[15.5px] leading-[1.7] mb-6">
          {content.lead}
        </p>
      </div>

      {/* Ritual rail strip — labels only, no inputs */}
      <div
        className="border-t px-7 sm:px-9 py-4 sm:py-5"
        style={{ borderColor: accentSoft(0.14), background: tint(0.08) }}
      >
        <div className="flex items-center gap-6 sm:gap-8">
          {[
            { label: "One focus" },
            { label: "Photo" },
            { label: "Reflection" },
          ].map((slot) => (
            <div key={slot.label} className="flex items-center gap-2">
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: accentSoft(0.5) }}
              />
              <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/55">
                {slot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

// ─── My Journey preview ───────────────────────────────────────────────────
const MyJourneyPreview = () => {
  const currentIdentity = getWeekIdentity(PRIMARY_WEEK);
  const keptRows = [
    { week: 16, line: "First flutters, easy to miss." },
    { week: 14, line: "Steadier this week. Slept better." },
  ];

  return (
    <article
      aria-label="Preview of My Journey"
      className="relative rounded-[24px] keepsake-surface px-6 sm:px-7 py-6 sm:py-7"
      style={{ borderColor: accentSoft(0.16) }}
    >
      <div className="flex items-baseline justify-between mb-5">
        <Eyebrow>Your journey</Eyebrow>
        <span className="font-sans text-[10px] font-light tracking-[0.22em] uppercase text-foreground/45">
          Week {PRIMARY_WEEK} · Started 12 June
        </span>
      </div>

      {/* Mini current chapter card */}
      <div
        className="flex items-center gap-3.5 rounded-[16px] p-3 mb-5"
        style={{ background: tint(0.12), border: `1px solid ${accentSoft(0.18)}` }}
      >
        <div
          className="shrink-0 w-[44px] h-[44px] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 75%)",
            border: `1px solid ${accentSoft(0.22)}`,
          }}
        >
          <MyWeekBabyImage
            week={PRIMARY_WEEK}
            className="w-full h-full flex items-center justify-center"
            imgClassName="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p
            className="font-sans text-[9px] font-medium tracking-[0.26em] uppercase mb-0.5"
            style={{ color: accent }}
          >
            Current chapter · Week {PRIMARY_WEEK}
          </p>
          <p className="font-serif font-medium text-foreground text-[14.5px] leading-tight truncate">
            {currentIdentity.chapterTitle}
          </p>
        </div>
      </div>

      {/* Group label */}
      <p className="font-sans text-[9.5px] font-medium tracking-[0.28em] uppercase text-foreground/50 mb-1">
        Second trimester
      </p>
      <p className="font-serif italic text-foreground/55 text-[12.5px] leading-[1.5] mb-3">
        Steadier weeks, finding rhythm.
      </p>

      {/* Kept week rows */}
      <ul className="space-y-2">
        {keptRows.map((row) => {
          const id = getWeekIdentity(row.week);
          return (
            <li
              key={row.week}
              className="flex items-start gap-3 rounded-[14px] keepsake-surface px-3 py-2.5"
              style={{ borderColor: accentSoft(0.14) }}
            >
              <div
                className="shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center mt-0.5"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.45), hsl(var(--card)) 75%)",
                  border: `1px solid ${accentSoft(0.18)}`,
                }}
              >
                <MyWeekBabyImage
                  week={row.week}
                  className="w-full h-full flex items-center justify-center"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-medium text-foreground/85 text-[13px]">
                    Week {row.week}
                  </span>
                  <span className="font-serif italic text-foreground/55 text-[12px] truncate">
                    {id.chapterTitle}
                  </span>
                </div>
                <p className="font-serif italic text-foreground/55 text-[12px] leading-[1.45] mt-0.5 truncate">
                  “{row.line}”
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

// ─── Kept Chapter preview ─────────────────────────────────────────────────
const KeptChapterPreview = () => {
  const identity = getWeekIdentity(KEPT_WEEK);

  return (
    <article
      aria-label="Preview of a Kept Chapter"
      className="relative rounded-[24px] keepsake-surface px-6 sm:px-7 py-6 sm:py-7"
      style={{ borderColor: accentSoft(0.16) }}
    >
      <Eyebrow>Kept chapter</Eyebrow>

      <div className="mt-3 mb-4">
        <h3 className="font-serif font-medium text-foreground text-[1.6rem] leading-[1] tracking-tight mb-1.5">
          Week {KEPT_WEEK}
        </h3>
        <p className="font-serif text-foreground/80 text-[14.5px] leading-[1.3]">
          {identity.chapterTitle}
        </p>
        <p className="font-serif italic text-foreground/55 text-[12.5px] leading-[1.5] mt-1">
          First trimester · {identity.theme}
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <div
          className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 78%)",
            border: `1px solid ${accentSoft(0.22)}`,
          }}
        >
          <MyWeekBabyImage
            week={KEPT_WEEK}
            className="w-full h-full flex items-center justify-center"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="rounded-[16px] px-4 py-4"
        style={{ background: tint(0.16), border: `1px solid ${accentSoft(0.18)}` }}
      >
        <p className="font-serif italic text-foreground/85 text-[13.5px] leading-[1.7]">
          The week the news became real. Quieter than I expected, and steadier.
        </p>
        <p className="font-sans text-[9px] font-medium tracking-[0.24em] uppercase text-foreground/45 mt-3">
          Kept · 24 March
        </p>
      </div>
    </article>
  );
};

const JourneyPreviewSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div className="editorial-rule mb-5" />
          <Eyebrow>Inside your journey</Eyebrow>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.5rem] text-foreground leading-[1.15] mt-3 mb-4">
            Your week, your journey, and the moments you return to
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Follow your pregnancy week by week, keep reflections and photos, and return to the chapters that matter as your journey grows.
          </p>
        </div>

        {/* Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:gap-7 items-start">
          <div className="lg:col-span-7">
            <MyWeekPreview />
            <p className="font-sans text-[11px] font-light tracking-[0.18em] uppercase text-foreground/40 text-center mt-4">
              Where you are right now
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            <div>
              <MyJourneyPreview />
              <p className="font-sans text-[11px] font-light tracking-[0.18em] uppercase text-foreground/40 text-center mt-4">
                The weeks you keep, gathered over time
              </p>
            </div>
            <div>
              <KeptChapterPreview />
              <p className="font-sans text-[11px] font-light tracking-[0.18em] uppercase text-foreground/40 text-center mt-4">
                A week you can return to later
              </p>
            </div>
          </div>
        </div>

        {/* Quiet section-level link */}
        <div className="text-center mt-12 md:mt-14">
          <Link
            to="/product"
            className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            See how the journey works
            <ArrowRight size={13} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyPreviewSection;
