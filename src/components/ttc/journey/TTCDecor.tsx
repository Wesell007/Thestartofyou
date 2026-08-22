import washSrc from "@/assets/ttc-wash-sage-green.png";
import sprigSrc from "@/assets/ttc-sprig-seedhead.png";
import leafSrc from "@/assets/ttc-sprig-leaf-green.png";

/**
 * Phase 28B — decorative TTC accents from the approved concept board.
 * Phase 28B.1 — washes and sprigs lean sage and muted olive.
 *
 * Purely presentational: watercolour washes and botanical line drawings that
 * sit behind content. Always aria-hidden and never interactive.
 */

type DecorProps = {
  className?: string;
  /** 0 to 1. Kept low so text contrast is never affected. */
  opacity?: number;
};

export const TTCWatercolourWash = ({ className = "", opacity = 0.5 }: DecorProps) => (
  <img
    src={washSrc}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={1200}
    height={896}
    className={`pointer-events-none absolute select-none ${className}`}
    style={{ opacity }}
  />
);

export const TTCBotanicalSprig = ({ className = "", opacity = 0.35 }: DecorProps) => (
  <img
    src={sprigSrc}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={1024}
    height={1024}
    className={`pointer-events-none absolute select-none ${className}`}
    style={{ opacity }}
  />
);

/** Green seed head with leaves, used where a stronger TTC cue helps. */
export const TTCBotanicalLeaf = ({ className = "", opacity = 0.4 }: DecorProps) => (
  <img
    src={leafSrc}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={1024}
    height={1024}
    className={`pointer-events-none absolute select-none ${className}`}
    style={{ opacity }}
  />
);
