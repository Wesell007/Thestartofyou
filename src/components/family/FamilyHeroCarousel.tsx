import { useEffect, useRef, useState } from "react";

export type FamilyHeroSlide = {
  src?: string;
  poster?: string;
  alt: string;
};

interface FamilyHeroCarouselProps {
  slides: FamilyHeroSlide[];
  /** "desktop" → aspect-[5/6]; "mobile" → clamp height */
  variant: "desktop" | "mobile";
}

const SLIDE_MS = 6000;
const FADE_MS = 700;

/**
 * FamilyHeroCarousel — calm, muted, autoplay crossfade of up to N videos.
 * When `slides` has no playable entries the component renders the same
 * abstract buttercream→honey panel the Family hero shipped with, so the
 * live page never shows an unfinished state.
 */
const FamilyHeroCarousel = ({ slides, variant }: FamilyHeroCarouselProps) => {
  const playable = slides.filter((s) => !!s.src);
  const hasVideos = playable.length > 0;

  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
    if (!hasVideos || reducedMotion || playable.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % playable.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [hasVideos, reducedMotion, playable.length]);

  useEffect(() => {
    if (!hasVideos) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        try {
          v.currentTime = 0;
        } catch {
          /* noop */
        }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, hasVideos]);

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
      aria-hidden={!hasVideos}
    >
      {/* Honey corner blooms — visible on fallback and behind video */}
      <span
        className={bloomOne}
        style={{ background: "hsl(var(--stage-family-accent) / 0.22)" }}
      />
      <span
        className={bloomTwo}
        style={{ background: "hsl(var(--stage-family-soft) / 0.7)" }}
      />

      {hasVideos &&
        playable.map((slide, i) => (
          <video
            key={`${slide.src}-${i}`}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={slide.src}
            poster={slide.poster}
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === active ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          />
        ))}

      {hasVideos && (
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

      {/* Inner highlight border */}
      {variant === "desktop" && (
        <span
          className="pointer-events-none absolute inset-6 rounded-[22px] border"
          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.14)" }}
        />
      )}
    </div>
  );
};

export default FamilyHeroCarousel;
