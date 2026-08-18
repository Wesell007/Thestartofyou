import { Heart } from "lucide-react";
import {
  FY_CARD_RADIUS,
  FY_CTA,
  FY_PEACH_INVITE_STYLE,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onOpen: () => void;
};

/** Nothing kept yet. One calm invitation, and no sense of falling behind. */
const MemoryEmptyState = ({ onOpen }: Props) => (
  <div
    className={`${FY_CARD_RADIUS} border px-6 py-11 text-center sm:px-10 sm:py-14`}
    style={FY_PEACH_INVITE_STYLE}
  >
    <Heart
      aria-hidden="true"
      className="mx-auto h-7 w-7"
      style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
      fill="hsl(var(--stage-firstyear-terracotta))"
      strokeWidth={0}
    />
    <p className="mt-5 font-serif text-[1.6rem] leading-[1.2] text-foreground">Nothing kept yet</p>
    <p className="mx-auto mt-3 max-w-[34ch] font-sans text-[14px] leading-[1.72] text-[hsl(var(--stage-firstyear-text))]">
      When something small feels worth keeping, you can add it here.
    </p>
    <button
      type="button"
      onClick={onOpen}
      className={`${FY_CTA} mt-6`}
      style={{
        backgroundColor: "hsl(var(--stage-firstyear-accent))",
        color: "hsl(var(--background))",
      }}
    >
      Keep a memory
    </button>
  </div>
);

export default MemoryEmptyState;
