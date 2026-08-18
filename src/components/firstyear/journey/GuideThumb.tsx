import type { LucideIcon } from "lucide-react";

type Props = {
  /** Existing repository or asset-pointer image. Never an external URL. */
  src?: string;
  /** Fallback icon shown when the linked guide has no image. */
  icon?: LucideIcon;
  /** Token name used for the fallback tile tint, without the `--`. */
  tint?: string;
  size?: "sm" | "md";
};

/**
 * A small square thumbnail for guide links, so article rows read as places to
 * go rather than plain text boxes. Decorative: the link text always carries
 * the meaning, so the image is hidden from assistive technology.
 */
const GuideThumb = ({ src, icon: Icon, tint = "stage-firstyear-accent", size = "md" }: Props) => {
  const box = size === "sm" ? "h-12 w-12" : "h-14 w-14";

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`${box} shrink-0 rounded-[12px] object-cover`}
        style={{ border: `1px solid hsl(var(--${tint}) / 0.2)` }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${box} shrink-0 rounded-[12px] flex items-center justify-center`}
      style={{
        background: `linear-gradient(145deg, hsl(var(--${tint}) / 0.18), hsl(var(--stage-firstyear-cream)))`,
        border: `1px solid hsl(var(--${tint}) / 0.22)`,
      }}
    >
      {Icon ? (
        <Icon size={18} strokeWidth={1.6} style={{ color: `hsl(var(--${tint}))` }} />
      ) : null}
    </span>
  );
};

export default GuideThumb;
