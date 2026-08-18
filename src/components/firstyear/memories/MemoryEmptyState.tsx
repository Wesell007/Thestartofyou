import { Feather } from "lucide-react";
import {
  FY_CARD_RADIUS,
  FY_CTA_SOFT,
  FY_FOCUS_RING,
  FY_SHADOW_SOFT,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  onOpen: () => void;
};

/** Nothing kept yet. One calm invitation, and no sense of falling behind. */
const MemoryEmptyState = ({ onOpen }: Props) => (
  <div
    className={`${FY_CARD_RADIUS} border px-6 py-9 text-center sm:px-10`}
    style={{
      backgroundColor: "hsl(var(--stage-firstyear-cream))",
      borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.9)",
      boxShadow: FY_SHADOW_SOFT,
    }}
  >
    <span
      aria-hidden="true"
      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
      style={{ backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.8)" }}
    >
      <Feather
        strokeWidth={1.5}
        className="h-5 w-5"
        style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
      />
    </span>
    <p className="font-serif text-[1.28rem] leading-[1.25] text-foreground">Nothing kept yet</p>
    <p className="mx-auto mt-2 max-w-[40ch] font-sans text-[14px] leading-[1.7] text-[hsl(var(--stage-firstyear-text))]">
      When something happens that you would like to look back on, keep it here. A single line is
      enough.
    </p>
    <button
      type="button"
      onClick={onOpen}
      className={`${FY_CTA_SOFT} ${FY_FOCUS_RING} mt-5 border`}
      style={{
        borderColor: "hsl(var(--stage-firstyear-peach-soft))",
        backgroundColor: "hsl(var(--stage-firstyear-hero) / 0.7)",
        color: "hsl(var(--stage-firstyear-peach-accent))",
      }}
    >
      Keep a memory
    </button>
  </div>
);

export default MemoryEmptyState;
