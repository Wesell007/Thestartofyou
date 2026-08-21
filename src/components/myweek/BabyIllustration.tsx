import { useEffect, useState } from "react";
import babyWatercolourFallback from "@/assets/pregnancy-nano/baby-watercolour-fallback.png";

interface Props {
  /** Primary source: the existing weekly realism asset for this week. */
  src: string;
  /** Cautious alt copy from the existing resolver. Content-supporting. */
  alt: string;
  className?: string;
}

type Stage = "primary" | "fallback" | "none";

/**
 * Phase 27B correction — the weekly baby illustration.
 *
 * The existing weekly realism asset stays the primary source. If it fails to
 * load, a soft watercolour illustration takes its place. If that also fails,
 * the card renders a quiet watercolour vignette instead of a broken image.
 * Presentation only: no change to which week or tone is resolved.
 */
const BabyIllustration = ({ src, alt, className = "" }: Props) => {
  const [stage, setStage] = useState<Stage>(src ? "primary" : "fallback");

  useEffect(() => {
    setStage(src ? "primary" : "fallback");
  }, [src]);

  if (stage === "none") {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        role="img"
        aria-label={alt}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, hsl(var(--stage-pregnancy-blush) / 0.9), hsl(var(--stage-pregnancy-cream) / 0.7) 60%, transparent 85%)",
        }}
      />
    );
  }

  return (
    <img
      src={stage === "primary" ? src : babyWatercolourFallback}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={() => setStage((s) => (s === "primary" ? "fallback" : "none"))}
      className={className}
    />
  );
};

export default BabyIllustration;
