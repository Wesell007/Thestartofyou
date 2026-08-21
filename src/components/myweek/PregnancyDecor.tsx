import eucalyptusSprig from "@/assets/pregnancy-nano/botanical-eucalyptus-sprig.png";
import smallSprig from "@/assets/pregnancy-nano/botanical-sprig-small.png";
import washBlush from "@/assets/pregnancy-nano/watercolour-wash-blush.png";
import washSage from "@/assets/pregnancy-nano/watercolour-wash-sage.png";
import tapeStripSrc from "@/assets/pregnancy-nano/tape-strip.png";
import cornerMark from "@/assets/pregnancy-nano/journal-corner-mark.png";

/**
 * Phase 27B correction — shared decorative artwork for the signed-in pregnancy
 * journey: watercolour washes, botanical sprigs, washi tape and a journal
 * ribbon mark.
 *
 * Everything here is decorative only. Empty alt text, aria-hidden, never
 * focusable, and never the sole carrier of meaning.
 */

const DECOR = "select-none pointer-events-none";

interface DecorProps {
  className?: string;
  /** 0 to 1 */
  opacity?: number;
}

/** Large eucalyptus sprig, used at the top corner of hero areas. */
export const BotanicalSprig = ({ className = "", opacity = 0.5 }: DecorProps) => (
  <img
    src={eucalyptusSprig}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    width={640}
    height={768}
    style={{ opacity }}
    className={`${DECOR} absolute ${className}`}
  />
);

/** Small three-leaf sprig for card corners and section accents. */
export const SmallSprig = ({ className = "", opacity = 0.55 }: DecorProps) => (
  <img
    src={smallSprig}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    width={512}
    height={512}
    style={{ opacity }}
    className={`${DECOR} absolute ${className}`}
  />
);

interface WashProps extends DecorProps {
  tone?: "blush" | "sage";
}

/** Soft watercolour wash panel, sits behind a card or hero. */
export const WatercolourWash = ({
  tone = "blush",
  className = "",
  opacity = 0.5,
}: WashProps) => (
  <img
    src={tone === "sage" ? washSage : washBlush}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    width={1536}
    height={768}
    style={{ opacity }}
    className={`${DECOR} absolute inset-0 h-full w-full object-cover ${className}`}
  />
);

/** Torn paper tape strip, used on taped keepsake frames. */
export const TapeStrip = ({ className = "", opacity = 0.9 }: DecorProps) => (
  <img
    src={tapeStripSrc}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    width={640}
    height={512}
    style={{ opacity }}
    className={`${DECOR} absolute ${className}`}
  />
);

/** Small ribbon bookmark mark for journal bridge cards. */
export const JournalCornerMark = ({ className = "", opacity = 0.9 }: DecorProps) => (
  <img
    src={cornerMark}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    width={512}
    height={512}
    style={{ opacity }}
    className={`${DECOR} absolute ${className}`}
  />
);

/**
 * Taped keepsake wrapper: two strips of tape at the top corners of whatever
 * it wraps, echoing the physical journal's photo pages.
 */
export const TapedFrame = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <TapeStrip className="-top-4 left-5 z-20 w-[84px] -rotate-6" />
    <TapeStrip className="-top-4 right-5 z-20 w-[84px] rotate-6" />
    {children}
  </div>
);
