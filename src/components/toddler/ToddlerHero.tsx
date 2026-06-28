import { Link } from "react-router-dom";
import toddlerHeroPoster from "@/assets/toddler-hero-poster.jpg.asset.json";
import toddlerHeroVideo from "@/assets/toddler-hero-video.mp4.asset.json";

/**
 * ToddlerHero — video-led.
 *
 * Primary hero media is the approved toddler video (calm home-light clip
 * of a Black toddler, ~24m, gently stacking wooden blocks on a soft wool
 * rug with a parent's hand softly in frame). The poster is a matching
 * still extracted directly from the same approved hero video, so the
 * poster-to-video handoff is seamless (same subject, framing, lighting
 * and palette). The poster only displays while the video loads or if
 * playback fails.
 *
 * Subject sits to the right of frame, so copy lives on the left over a
 * warm parchment-to-transparent wash. object-position is tuned per
 * breakpoint to keep the toddler safely framed across desktop, iPad and
 * mobile (no head/face/hand/foot crop).
 */
const ToddlerHero = () => {
  return (
    <section
      id="toddler-top"
      className="relative overflow-hidden min-h-[72vh] md:min-h-[78vh] flex items-center pt-28 pb-16 md:pb-20"
    >
      {/* Primary hero media — real toddler video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={toddlerHeroPoster.url}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-[68%_center] lg:object-[62%_center]"
      >
        <source src={toddlerHeroVideo.url} type="video/mp4" />
      </video>

      {/* Editorial wash — desktop weighted left so copy reads without darkening the toddler */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--parchment) / 0.94) 0%, hsl(var(--parchment) / 0.78) 32%, hsl(var(--parchment) / 0.32) 56%, transparent 78%)",
        }}
      />
      {/* Mobile wash — weighted top + bottom so copy stays readable around the subject */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--parchment) / 0.6) 0%, hsl(var(--parchment) / 0.18) 30%, hsl(var(--parchment) / 0.62) 62%, hsl(var(--parchment) / 0.96) 100%)",
        }}
      />

      {/* Warm apricot bloom under the copy column — adds depth without orange dominance */}
      <div
        className="absolute -bottom-24 left-0 w-[55%] h-72 pointer-events-none blur-3xl opacity-60 hidden md:block"
        style={{ backgroundColor: "hsl(var(--stage-toddler-soft) / 0.45)" }}
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-[600px] md:max-w-[560px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span
              className="h-px w-10"
              style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.55)" }}
            />
            <span
              className="font-sans text-[11px] font-light tracking-[0.34em] uppercase"
              style={{ color: "hsl(var(--stage-toddler-accent))" }}
            >
              Toddler · 12 months to 3 years
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[2.4rem] sm:text-5xl md:text-[3.55rem] mb-6 leading-[1.04] tracking-tight"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Steady guidance for the{" "}
            <span className="italic">toddler years</span>.
          </h1>

          {/* Support line */}
          <p className="font-sans text-[17px] md:text-[18px] font-light text-foreground/75 leading-[1.65] mb-10 max-w-[480px]">
            First words, first steps, big feelings and growing independence —
            calm, grounded answers for the stage between baby and child.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="#toddler-age"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] shadow-[0_14px_34px_-20px_rgba(60,40,20,0.45)] hover:-translate-y-[1px] hover:shadow-[0_18px_38px_-18px_rgba(60,40,20,0.5)]"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-soft) / 0.96)",
                color: "hsl(var(--stage-toddler-deep))",
                borderColor: "hsl(var(--stage-toddler-accent) / 0.38)",
              }}
            >
              Go to your toddler's age
            </Link>
            <Link
              to="#toddler-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:bg-[hsl(var(--stage-toddler)/0.5)]"
              style={{
                backgroundColor: "transparent",
                color: "hsl(var(--stage-toddler-deep))",
                borderColor: "hsl(var(--stage-toddler-accent) / 0.5)",
              }}
            >
              Explore toddler topics
            </Link>
          </div>
        </div>
      </div>

      {/* Quiet hairline base seam to the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.18)" }}
      />
    </section>
  );
};

export default ToddlerHero;
