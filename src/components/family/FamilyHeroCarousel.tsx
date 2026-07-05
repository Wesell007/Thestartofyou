import { useEffect, useState } from "react";

export type FamilyHeroSlide = {
  src?: string;
  alt: string;
  objectPosition?: string;
};

interface FamilyHeroCarouselProps {
  slides: FamilyHeroSlide[];
  /** "desktop" → aspect-[5/6]; "mobile" → clamped height */
  variant: "desktop" | "mobile";
}

const SLIDE_MS = 5500;
const FADE_MS = 700;

/**
 * FamilyHeroCarousel — calm, muted, autoplay crossfade of up to N images.
 * When `slides` has no playable entries the component renders a finished
 * abstract Family visual (nested frame, honey blooms, ochre vignette,
 * subtle constellation motif) so the live page never looks unfinished.
 */
const FamilyHeroCarousel = ({ slides, variant }: FamilyHeroCarouselProps) => {
  const playable = slides.filter((s) => !!s.src);
  const hasImages = playable.length > 0;

  const [active, setActive] = useState(0);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useEffect(() => {
    if (!hasImages || reducedMotion || playable.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % playable.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [hasImages, reducedMotion, playable.length]);

  const frameStyle: React.CSSProperties = {
    borderColor: "hsl(var(--stage-family-accent) / 0.28)",
    background:
      "linear-gradient(155deg, hsl(var(--stage-family) / 0.85) 0%, hsl(var(--stage-family-soft) / 0.85) 100%)",
    boxShadow:
      variant === "desktop"
        ? "0 40px 90px -48px rgba(70,50,20,0.4), inset 0 1px 0 hsl(0 0% 100% / 0.7)"
        : "0 26px 60px -36px rgba(70,50,20,0.36), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
  };

  const shapeClass =
    variant === "desktop"
      ? "relative aspect-[5/6] rounded-[28px] border overflow-hidden"
      : "relative rounded-[24px] border overflow-hidden";

  const shapeInline: React.CSSProperties =
    variant === "mobile" ? { height: "clamp(300px, 48vh, 420px)" } : {};

  const bloomOne =
    variant === "desktop"
      ? "pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-80"
      : "pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl opacity-80";
  const bloomTwo =
    variant === "desktop"
      ? "pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full blur-3xl opacity-70"
      : "pointer-events-none absolute -bottom-20 -right-16 h-60 w-60 rounded-full blur-3xl opacity-70";

  return (
    <div
      className={shapeClass}
      style={{ ...frameStyle, ...shapeInline }}
      aria-hidden={!hasImages}
    >
      {/* Honey corner blooms — visible on fallback and behind images */}
      <span
        className={bloomOne}
        style={{ background: "hsl(var(--stage-family-accent) / 0.22)" }}
      />
      <span
        className={bloomTwo}
        style={{ background: "hsl(var(--stage-family-soft) / 0.7)" }}
      />

      {hasImages &&
        playable.map((slide, i) => (
          <img
            key={`${slide.src}-${i}`}
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: "50% 40%",
              opacity: i === active ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          />
        ))}

      {hasImages && (
        <>
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, hsl(var(--stage-family) / 0.28) 0%, hsl(var(--stage-family-soft) / 0.18) 55%, hsl(var(--stage-family-accent) / 0.16) 100%)",
            }}
          />
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 45%, transparent 55%, hsl(var(--stage-family-deep) / 0.22) 100%)",
            }}
          />
        </>
      )}

      {/* Abstract fallback — finished Family visual when no images are wired */}
      {!hasImages && (
        <>
          {/* Ochre vignette */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 50%, transparent 55%, hsl(var(--stage-family-deep) / 0.22) 100%)",
            }}
          />

          {/* Family constellation motif */}
          <svg
            viewBox="0 0 200 240"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="fh-circle" cx="50%" cy="45%" r="55%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--stage-family-soft))"
                  stopOpacity="0.9"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--stage-family-accent))"
                  stopOpacity="0.35"
                />
              </radialGradient>
            </defs>

            {/* Connecting lines */}
            <g
              stroke="hsl(var(--stage-family-accent))"
              strokeOpacity="0.22"
              strokeWidth="0.6"
              fill="none"
            >
              <line x1="82" y1="100" x2="118" y2="100" />
              <line x1="82" y1="100" x2="86" y2="150" />
              <line x1="118" y1="100" x2="114" y2="150" />
              <line x1="86" y1="150" x2="114" y2="150" />
            </g>

            {/* Parent circles */}
            <circle
              cx="82"
              cy="100"
              r="20"
              fill="url(#fh-circle)"
              stroke="hsl(var(--stage-family-accent))"
              strokeOpacity="0.28"
              strokeWidth="0.6"
            />
            <circle
              cx="118"
              cy="100"
              r="17"
              fill="url(#fh-circle)"
              stroke="hsl(var(--stage-family-accent))"
              strokeOpacity="0.28"
              strokeWidth="0.6"
            />

            {/* Child circles */}
            <circle
              cx="86"
              cy="150"
              r="11"
              fill="url(#fh-circle)"
              stroke="hsl(var(--stage-family-accent))"
              strokeOpacity="0.28"
              strokeWidth="0.5"
            />
            <circle
              cx="114"
              cy="150"
              r="9"
              fill="url(#fh-circle)"
              stroke="hsl(var(--stage-family-accent))"
              strokeOpacity="0.28"
              strokeWidth="0.5"
            />

            {/* Rhythm dots */}
            <g fill="hsl(var(--stage-family-deep))" fillOpacity="0.18">
              <circle cx="40" cy="60" r="1.1" />
              <circle cx="52" cy="46" r="0.9" />
              <circle cx="160" cy="52" r="1.1" />
              <circle cx="172" cy="68" r="0.9" />
              <circle cx="46" cy="196" r="1.1" />
              <circle cx="158" cy="192" r="1.1" />
              <circle cx="100" cy="210" r="0.9" />
              <circle cx="100" cy="36" r="0.9" />
            </g>
          </svg>

          {/* Nested inner frame */}
          <span
            className={
              variant === "desktop"
                ? "pointer-events-none absolute inset-6 rounded-[22px] border"
                : "pointer-events-none absolute inset-4 rounded-[18px] border"
            }
            style={{ borderColor: "hsl(var(--stage-family-accent) / 0.16)" }}
          />
        </>
      )}

      {/* Inner highlight border (over images only, desktop) */}
      {hasImages && variant === "desktop" && (
        <span
          className="pointer-events-none absolute inset-6 rounded-[22px] border"
          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.14)" }}
        />
      )}
    </div>
  );
};

export default FamilyHeroCarousel;
