import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import usePublicAccountLink from "@/hooks/usePublicAccountLink";

type Props = {
  /** Hero sits on the video veil, final sits on the gradient block. */
  variant?: "hero" | "final";
  className?: string;
};

/**
 * Public First Year start CTA. The hub stays public and fast: the signed-out
 * form paints immediately and the lifecycle read happens lazily afterwards.
 * The button box is a fixed shape, so the swap does not shift layout.
 */
const FYStartFirstYearCTA = ({ variant = "hero", className }: Props) => {
  const { authed, accountLink } = usePublicAccountLink();

  const buttonStyle =
    variant === "final"
      ? {
          backgroundColor: "hsl(var(--stage-firstyear-deep))",
          color: "hsl(var(--card))",
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 14px 34px -18px hsl(212 36% 20% / 0.55)",
        }
      : {
          backgroundColor: "hsl(var(--stage-firstyear-deep))",
          color: "hsl(var(--card))",
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 12px 30px -18px hsl(212 36% 20% / 0.5)",
        };

  const wrapper = variant === "final" ? "mt-6 text-center" : "mt-6";

  return (
    <div className={`${wrapper} ${className ?? ""}`}>
      <Link
        to={accountLink.href}
        className="inline-flex items-center gap-2 rounded-pill px-8 py-4 font-sans text-[13px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[1px] min-w-[240px] justify-center"
        style={buttonStyle}
      >
        {authed ? accountLink.label : "Start your journey"} <ArrowUpRight size={14} aria-hidden />
      </Link>
    </div>
  );
};

export default FYStartFirstYearCTA;
