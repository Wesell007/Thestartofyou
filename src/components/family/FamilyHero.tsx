import { Link } from "react-router-dom";
import FamilyHeroCarousel, {
  type FamilyHeroSlide,
} from "./FamilyHeroCarousel";

/**
 * Family hero media slides (images).
 *
 * TODO — connect Family hero images once assets are uploaded. Expected pointers:
 *   src/assets/family-hero-parents.jpg.asset.json       (calm mum & dad moment)
 *   src/assets/family-hero-family-four.jpg.asset.json   (warm family of four)
 *   src/assets/family-hero-everyday.jpg.asset.json      (everyday family life)
 *
 * When the pointers exist, follow the same asset pattern used elsewhere:
 *
 *   import parents from "@/assets/family-hero-parents.jpg.asset.json";
 *   import familyFour from "@/assets/family-hero-family-four.jpg.asset.json";
 *   import everyday from "@/assets/family-hero-everyday.jpg.asset.json";
 *
 *   const familyHeroSlides: FamilyHeroSlide[] = [
 *     { src: parents.url,    alt: "" },
 *     { src: familyFour.url, alt: "" },
 *     { src: everyday.url,   alt: "" },
 *   ];
 *
 * Until then, the empty array keeps the abstract Family fallback active.
 */
const familyHeroSlides: FamilyHeroSlide[] = [];

const accent = "hsl(var(--stage-family-accent))";
const accentBorder = "hsl(var(--stage-family-accent) / 0.38)";
const deep = "hsl(var(--stage-family-deep))";
const soft = "hsl(var(--stage-family-soft) / 0.96)";

/**
 * FamilyHero — warm editorial hero for the Family Hub.
 * Left copy column, right token-washed placeholder media frame
 * (no asset — the frame is ready to accept an image or video later).
 * Mobile: media frame stacks above copy, matching the polished
 * Toddler mobile pattern.
 */
const FamilyHero = () => {
  return (
    <section id="family-top" className="relative overflow-hidden">
      {/* ───────────────────────── DESKTOP / iPad ───────────────────────── */}
      <div className="hidden md:block relative pt-32 pb-20 md:pt-36 md:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-family) / 0.7) 0%, hsl(var(--stage-family) / 0.35) 55%, hsl(var(--parchment)) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-70"
          style={{ background: "hsl(var(--stage-family-soft) / 0.55)" }}
          aria-hidden
        />

        <div className="container mx-auto px-8 md:px-10 max-w-6xl relative z-10">
          <div className="grid grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="max-w-[520px]">
              <div className="flex items-center gap-3 mb-7">
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.55)" }}
                />
                <span
                  className="font-sans text-[11px] font-light tracking-[0.34em] uppercase"
                  style={{ color: accent }}
                >
                  Family life
                </span>
              </div>

              <h1
                className="font-serif text-5xl lg:text-[3.4rem] mb-6 leading-[1.05] tracking-tight text-balance"
                style={{ color: deep }}
              >
                Support for the life you are{" "}
                <span className="italic">building together</span>.
              </h1>

              <p className="font-sans text-[17px] lg:text-[18px] font-light text-foreground/80 leading-[1.65] mb-10 max-w-[480px]">
                From growing your family to daily routines, relationships,
                money, travel and the moments that hold everyone together.
              </p>

              <div className="flex flex-row gap-3">
                <Link
                  to="#family-topics"
                  className="inline-flex items-center justify-center rounded-pill px-7 min-h-[48px] font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] shadow-[0_14px_34px_-20px_rgba(70,50,20,0.45)] hover:-translate-y-[1px] hover:shadow-[0_18px_38px_-18px_rgba(70,50,20,0.5)]"
                  style={{
                    backgroundColor: soft,
                    color: deep,
                    borderColor: accentBorder,
                  }}
                >
                  Explore family topics
                </Link>
                <Link
                  to="#family-ai"
                  className="inline-flex items-center justify-center rounded-pill px-7 min-h-[48px] font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px] hover:bg-[hsl(var(--stage-family)/0.55)]"
                  style={{
                    backgroundColor: "transparent",
                    color: deep,
                    borderColor: "hsl(var(--stage-family-accent) / 0.5)",
                  }}
                >
                  Ask a family question
                </Link>
              </div>
            </div>

            {/* Media — video carousel (falls back to abstract panel when no slides) */}
            <div className="relative">
              <FamilyHeroCarousel slides={familyHeroSlides} variant="desktop" />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────── MOBILE ───────────────────────── */}
      <div className="md:hidden relative pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-family) / 0.7) 0%, hsl(var(--parchment)) 100%)",
          }}
          aria-hidden
        />

        <div className="relative px-6 pt-3">
          <div className="mb-8">
            <FamilyHeroCarousel slides={familyHeroSlides} variant="mobile" />
          </div>

          <div className="relative pb-12">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.55)" }}
              />
              <span
                className="font-sans text-[10.5px] font-light tracking-[0.32em] uppercase"
                style={{ color: accent }}
              >
                Family life
              </span>
            </div>

            <h1
              className="font-serif text-[2.15rem] leading-[1.06] tracking-tight mb-5 text-balance"
              style={{ color: deep }}
            >
              Support for the life you are{" "}
              <span className="italic">building together</span>.
            </h1>

            <p className="font-sans text-[15.5px] font-light text-foreground/80 leading-[1.65] mb-8 max-w-[30ch]">
              From growing your family to daily routines, relationships,
              money, travel and the moments that hold everyone together.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="#family-topics"
                className="inline-flex items-center justify-center w-full rounded-pill px-6 min-h-[48px] font-sans text-[13.5px] font-medium tracking-wide border transition-all duration-300 shadow-[0_14px_34px_-20px_rgba(70,50,20,0.45)] active:translate-y-[1px]"
                style={{
                  backgroundColor: soft,
                  color: deep,
                  borderColor: accentBorder,
                }}
              >
                Explore family topics
              </Link>
              <Link
                to="#family-ai"
                className="inline-flex items-center justify-center w-full rounded-pill px-6 min-h-[48px] font-sans text-[13.5px] font-medium tracking-wide border transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: deep,
                  borderColor: "hsl(var(--stage-family-accent) / 0.5)",
                }}
              >
                Ask a family question
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.18)" }}
      />
    </section>
  );
};

export default FamilyHero;
