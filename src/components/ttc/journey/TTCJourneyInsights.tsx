import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import type { TTCInsight } from "@/lib/ttcInsights";

type Props = {
  insights: TTCInsight[];
  onOpenLogPanel: () => void;
  onScrollToHandover: () => void;
};

/**
 * "Gentle insights for this cycle" section.
 * Renders 0–4 pre-computed insight cards. Emits envelope-only analytics
 * on CTA click. No cycle values, dates, or log data ever leave this file.
 */
const TTCJourneyInsights = ({ insights, onOpenLogPanel, onScrollToHandover }: Props) => {
  if (insights.length === 0) return null;

  const handleClick = (insight: TTCInsight) => {
    trackEvent(EVENTS.TTC_INSIGHT_CLICKED);
    if (insight.action.kind === "open_log_panel") onOpenLogPanel();
    else if (insight.action.kind === "scroll_to_handover") onScrollToHandover();
  };

  return (
    <section className="space-y-5">
      <div>
        <p
          className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
          style={{ color: "hsl(var(--stage-ttc-accent))" }}
        >
          Gentle insights for this cycle
        </p>
        <h2 className="font-serif text-[22px] sm:text-[24px] text-foreground mb-1">
          Small notes for where you may be right now
        </h2>
        <p className="font-sans text-[12.5px] text-muted-foreground/85 leading-relaxed max-w-[58ch]">
          Small notes based on your saved cycle and anything you have chosen
          to log. These are estimates, not guarantees, and never a diagnosis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-[18px] px-5 py-5 keepsake-surface flex flex-col"
            style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
          >
            <h3 className="font-serif text-[17px] sm:text-[18px] text-foreground leading-snug mb-2">
              {insight.heading}
            </h3>
            <p className="font-sans text-[13.5px] text-foreground/72 leading-relaxed mb-4 flex-1">
              {insight.copy}
            </p>
            {insight.action.kind === "link" ? (
              <Link
                to={insight.action.href}
                onClick={() => trackEvent(EVENTS.TTC_INSIGHT_CLICKED)}
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium self-start hover:opacity-80 transition-opacity"
                style={{ color: "hsl(var(--stage-ttc-accent))" }}
              >
                {insight.ctaLabel} <ArrowRight size={13} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleClick(insight)}
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium self-start hover:opacity-80 transition-opacity"
                style={{ color: "hsl(var(--stage-ttc-accent))" }}
              >
                {insight.ctaLabel} <ArrowRight size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TTCJourneyInsights;
