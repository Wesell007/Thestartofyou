import { Link } from "react-router-dom";
import toddlerHeroPoster from "@/assets/firstyear-stage-9-12.jpg";

/**
 * ToddlerHero — video-ready.
 *
 * Structurally video-led. The <video> element is the primary hero media.
 *
 * MEDIA STATUS: pending.
 * No suitable toddler video currently exists in src/assets/. The hero
 * therefore ships with the poster image only, and no <source> child is
 * rendered yet (this avoids a 404 / fake asset wiring and lets the browser
 * fall cleanly to the poster).
 *
 * The temporary poster — firstyear-stage-9-12.jpg — is the closest existing
 * toddler-adjacent still in the project (walking child, parent's hands nearby,
 * warm home light, safe crop). It is a placeholder, NOT the final design.
 *
 * TO WIRE THE FINAL TODDLER VIDEO when the asset is uploaded:
 *   1. Upload via lovable-assets and write the manifest to
 *        src/assets/toddler-hero-video.mp4.asset.json
 *   2. Add at the top of this file:
 *        import toddlerHeroVideo from "@/assets/toddler-hero-video.mp4.asset.json";
 *   3. Inside the <video> element below, add:
 *        <source src={toddlerHeroVideo.url} type="video/mp4" />
 *
 * Required future asset: a calm 6–10s home-light clip of a true 18–30 month
 * toddler walking, playing, reading or stacking blocks; parent nearby if
 * suitable; warm daylight; safe head/face composition; no tantrums, no
 * chaotic toy mess, no bright nursery colours, no influencer-montage feel,
 * no cropped heads/faces/hands/bodies.
 */
const ToddlerHero = () => {
  return (
    <section
      id="toddler-top"
      className="relative overflow-hidden min-h-[78vh] md:min-h-[80vh] flex items-center pt-28 pb-16 md:pb-20"
    >
      {/* Primary hero media — video element, currently rendering poster only. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={toddlerHeroPoster}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[50%_28%] md:object-[center_38%] lg:object-[center_42%]"
      >
        {/* FUTURE TODDLER HERO VIDEO — add <source> here when the asset exists. */}
      </video>

      {/* Warm Toddler-token wash — desktop weighted left, mobile weighted bottom */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--parchment, 40 38% 96%) / 0.82), hsl(var(--parchment, 40 38% 96%) / 0.42) 45%, transparent)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--parchment, 40 38% 96%) / 0.7), hsl(var(--parchment, 40 38% 96%) / 0.35) 55%, hsl(var(--parchment, 40 38% 96%) / 0.05))",
        }}
      />

      {/* Oat / sand wash so the hero reads as Toddler, not First Year reuse */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 pointer-events-none blur-3xl opacity-70"
        style={{ backgroundColor: "hsl(var(--stage-toddler-soft) / 0.55)" }}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-1/3 pointer-events-none blur-3xl opacity-40"
        style={{ backgroundColor: "hsl(var(--stage-toddler) / 0.6)" }}
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        <div className="max-w-[640px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-7">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }}
            />
            <span
              className="font-sans text-[11px] font-light tracking-[0.3em] uppercase"
              style={{ color: "hsl(var(--stage-toddler-accent))" }}
            >
              Toddler
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] mb-6 leading-[1.06]"
            style={{ color: "hsl(var(--stage-toddler-deep))" }}
          >
            Guidance for the{" "}
            <span className="italic">toddler years</span>.
          </h1>

          {/* Support line */}
          <p className="font-sans text-[17px] md:text-lg font-light text-foreground/70 leading-relaxed mb-10 max-w-lg">
            From first words and first steps to growing independence — calm,
            grounded support for the years between baby and child.
          </p>

          {/* Two soft Toddler-token pill CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="#toddler-age"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] shadow-[0_10px_28px_-20px_rgba(60,40,20,0.4)] hover:-translate-y-[1px]"
              style={{
                backgroundColor: "hsl(var(--stage-toddler-soft) / 0.95)",
                color: "hsl(var(--stage-toddler-deep))",
                borderColor: "hsl(var(--stage-toddler-accent) / 0.35)",
              }}
            >
              Go to your toddler's age
            </Link>
            <Link
              to="#toddler-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px]"
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
    </section>
  );
};

export default ToddlerHero;
