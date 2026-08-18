import { Heart } from "lucide-react";
import {
  FY_CARD_RADIUS,
  FY_FOCUS_RING,
  FY_PEACH_INVITE_STYLE,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onOpen: () => void;
};

/**
 * The one warm action at the top of the shelf. Keeping a memory is a small
 * deliberate act, so it gets an invitation card of its own rather than a row.
 */
const MemoryHeroCard = ({ onOpen }: Props) => (
  <button
    type="button"
    onClick={onOpen}
    className={`${FY_CARD_RADIUS} ${FY_FOCUS_RING} block w-full border px-6 py-8 text-center transition-transform duration-200 hover:-translate-y-0.5 sm:px-8 sm:py-10`}
    style={FY_PEACH_INVITE_STYLE}
  >
    <Heart
      aria-hidden="true"
      className="mx-auto h-6 w-6"
      style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
      fill="hsl(var(--stage-firstyear-terracotta))"
      strokeWidth={0}
    />
    <span className="mt-3 block font-serif text-[1.5rem] leading-[1.2] text-foreground sm:text-[1.62rem]">
      Keep a memory
    </span>
    <span className="mx-auto mt-2 block max-w-[30ch] font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))]">
      A few words, and a photo if you have one.
    </span>
  </button>
);

export default MemoryHeroCard;
