import { Heart } from "lucide-react";
import {
  FY_CARD_RADIUS,
  FY_EYEBROW,
  FY_FOCUS_RING,
  FY_SHADOW_STRONG,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onOpen: () => void;
};

/**
 * The one warm action at the top of the shelf. Keeping a memory is a small
 * deliberate act, so it gets a card of its own rather than an open form.
 */
const MemoryHeroCard = ({ onOpen }: Props) => (
  <button
    type="button"
    onClick={onOpen}
    className={`${FY_CARD_RADIUS} ${FY_FOCUS_RING} flex w-full items-center gap-4 border px-5 py-5 text-left transition-transform duration-200 hover:-translate-y-0.5 sm:px-7 sm:py-6`}
    style={{
      backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.85)",
      borderColor: "hsl(var(--stage-firstyear-peach-soft))",
      boxShadow: FY_SHADOW_STRONG,
    }}
  >
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: "hsl(var(--stage-firstyear-cream))" }}
    >
      <Heart
        strokeWidth={1.5}
        className="h-5 w-5"
        style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
      />
    </span>
    <span className="min-w-0">
      <span className={`block ${FY_EYEBROW}`}>New memory</span>
      <span className="mt-1 block font-serif text-[1.35rem] leading-[1.2] text-foreground">
        Keep a memory
      </span>
      <span className="mt-1 block font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))]">
        A few words, and a photo if you have one.
      </span>
    </span>
  </button>
);

export default MemoryHeroCard;
