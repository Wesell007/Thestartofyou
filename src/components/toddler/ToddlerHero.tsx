import { Link } from "react-router-dom";
import toddlerHeroPoster from "@/assets/toddler-hero-poster.jpg.asset.json";
import toddlerHeroVideo from "@/assets/toddler-hero-video.mp4.asset.json";
import {
  DeerMark,
  RabbitMark,
  ButterflyMark,
  LeafSprig,
} from "./ToddlerIllustrations";

/**
 * ToddlerHero — breakpoint-split composition.
 *
 * Desktop / iPad (md+): full-bleed approved Black toddler video with a
 * left-weighted parchment wash; copy sits over the wash. iPad uses its
 * own object-position and a stronger wash so the toddler sits clear of
 * the copy column.
 *
 * Mobile (<md): true stacked layout. The video lives in its own
 * controlled media zone at the top (clamp(320px, 50vh, 420px)). A solid
 * parchment copy panel sits BELOW the video — text never overlays the
 * toddler.
 *
 * Approved media preserved: Black toddler video + matching poster still,
 * autoPlay / muted / loop / playsInline / preload="auto".
 *
 * Subtle woodland illustration layer (max 2 marks per breakpoint).
 */
const ToddlerHero = () => {
  return (
    <section id="toddler-top" className="relative overflow-hidden">
      {/* ───────────────────────── DESKTOP / iPad ───────────────────────── */}
      <div className="hidden md:flex relative min-h-[78vh] items-center pt-28 pb-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={toddlerHeroPoster.url}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[78%_30%] lg:object-[62%_center]"
        >
          <source src={toddlerHeroVideo.url} type="video/mp4" />
        </video>

        {/* iPad wash — stronger left coverage */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--parchment) / 0.98) 0%, hsl(var(--parchment) / 0.92) 38%, hsl(var(--parchment) / 0.5) 62%, transparent 88%)",
          }}
        />
        {/* Desktop wash — preserved premium balance, 0% slightly strengthened */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--parchment) / 0.96) 0%, hsl(var(--parchment) / 0.8) 32%, hsl(var(--parchment) / 0.32) 56%, transparent 78%)",
          }}
        />

        {/* Warm apricot bloom under the copy column */}
        <div
          className="absolute -bottom-24 left-0 w-[55%] h-72 pointer-events-none blur-3xl opacity-60"
          style={{ backgroundColor: "hsl(var(--stage-toddler-soft) / 0.45)" }}
        />

        {/* Woodland accents — max 2, never over subject */}
        <LeafSprig className="absolute top-24 left-6 lg:left-10 w-28 lg:w-32 opacity-50 pointer-events-none rotate-[-8deg]" />
        <DeerMark className="absolute bottom-10 left-8 lg:left-16 w-20 lg:w-24 opacity-55 pointer-events-none" />

        <div className="container mx-auto px-8 md:px-10 max-w-6xl relative z-10">
          <div className="max-w-[520px] lg:max-w-[560px]">
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

            <h1
              className="font-serif text-5xl lg:text-[3.55rem] mb-6 leading-[1.04] tracking-tight text-balance"
              style={{ color: "hsl(var(--stage-toddler-deep))" }}
            >
              Steady guidance for the{" "}
              <span className="italic">toddler years</span>.
            </h1>

            <p className="font-sans text-[17px] lg:text-[18px] font-light text-foreground/80 leading-[1.65] mb-10 max-w-[480px]">
              First words, first steps, big feelings and growing independence —
              calm, grounded answers for the stage between baby and child.
            </p>

            <div className="flex flex-row gap-3">
              <Link
                to="#toddler-age"
                className="inline-flex items-center justify-center rounded-pill px-7 min-h-[48px] font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] shadow-[0_14px_34px_-20px_rgba(60,40,20,0.45)] hover:-translate-y-[1px] hover:shadow-[0_18px_38px_-18px_rgba(60,40,20,0.5)]"
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
                className="inline-flex items-center justify-center rounded-pill px-7 min-h-[48px] font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:bg-[hsl(var(--stage-toddler)/0.5)]"
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
      </div>

      {/* ───────────────────────── MOBILE ───────────────────────── */}
      <div className="md:hidden relative pt-24">
        {/* Media zone — controlled height, video on top */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(320px, 50vh, 420px)" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={toddlerHeroPoster.url}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "62% 28%" }}
          >
            <source src={toddlerHeroVideo.url} type="video/mp4" />
          </video>

          {/* Woodland accent #1 — tiny butterfly */}
          <ButterflyMark className="absolute top-4 left-5 w-10 opacity-70 pointer-events-none" />

          {/* Soft fade into copy panel */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, hsl(var(--parchment) / 0.85) 70%, hsl(var(--parchment)) 100%)",
            }}
          />
        </div>

        {/* Copy panel — solid parchment, BELOW the video */}
        <div
          className="relative px-6 pt-7 pb-12"
          style={{ backgroundColor: "hsl(var(--parchment))" }}
        >
          {/* Woodland accent #2 — small rabbit, lower-right */}
          <RabbitMark className="absolute bottom-4 right-3 w-16 opacity-55 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.55)" }}
              />
              <span
                className="font-sans text-[10.5px] font-light tracking-[0.32em] uppercase"
                style={{ color: "hsl(var(--stage-toddler-accent))" }}
              >
                Toddler · 12m – 3y
              </span>
            </div>

            <h1
              className="font-serif text-[2.15rem] leading-[1.06] tracking-tight mb-5 text-balance"
              style={{ color: "hsl(var(--stage-toddler-deep))" }}
            >
              Steady guidance for the{" "}
              <span className="italic">toddler years</span>.
            </h1>

            <p className="font-sans text-[15.5px] font-light text-foreground/80 leading-[1.65] mb-8 max-w-[30ch]">
              First words, first steps, big feelings and growing independence —
              calm, grounded answers for the stage between baby and child.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="#toddler-age"
                className="inline-flex items-center justify-center w-full rounded-pill px-6 min-h-[48px] font-sans text-[13.5px] font-medium tracking-wide border transition-all duration-300 shadow-[0_14px_34px_-20px_rgba(60,40,20,0.45)] active:translate-y-[1px]"
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
                className="inline-flex items-center justify-center w-full rounded-pill px-6 min-h-[48px] font-sans text-[13.5px] font-medium tracking-wide border transition-all duration-300"
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
      </div>

      {/* Hairline base seam */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.18)" }}
      />
    </section>
  );
};

export default ToddlerHero;
