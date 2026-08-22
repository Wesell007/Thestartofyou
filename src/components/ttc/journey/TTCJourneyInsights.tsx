import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import type { TTCInsight } from "@/lib/ttcInsights";
import {
  TTC_CARD_TITLE,
  TTC_EYEBROW,
  TTC_FOCUS_RING,
  TTC_HEADING,
  TTC_HELPER,
  TTC_PAPER_CARD,
  TTC_TILE_PAD,
} from "@/components/ttc/journey/ttcStyles";

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
        <p className={`${TTC_EYEBROW} mb-3`}>Gentle notes for this cycle</p>
        <h2 className={`${TTC_HEADING} text-[22px] sm:text-[25px] mb-2`}>
          Small notes for where you may be right now
        </h2>
        <p className={`${TTC_HELPER} max-w-[58ch]`}>
          Small notes based on your saved cycle and anything you have chosen
          to log. These are estimates, not guarantees, and never a diagnosis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`${TTC_PAPER_CARD} ${TTC_TILE_PAD} flex flex-col`}
          >
            <h3 className={`${TTC_CARD_TITLE} mb-2`}>{insight.heading}</h3>
            <p className={`${TTC_HELPER} mb-4 flex-1`}>{insight.copy}</p>
            {insight.action.kind === "link" ? (
              <Link
                to={insight.action.href}
                onClick={() => trackEvent(EVENTS.TTC_INSIGHT_CLICKED)}
                className={`inline-flex min-h-11 items-center gap-1.5 self-start rounded-sm font-sans text-[13px] font-medium text-[hsl(var(--stage-ttc-olive))] transition-opacity hover:opacity-80 ${TTC_FOCUS_RING}`}
              >
                {insight.ctaLabel} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleClick(insight)}
                className={`inline-flex min-h-11 items-center gap-1.5 self-start rounded-sm font-sans text-[13px] font-medium text-[hsl(var(--stage-ttc-olive))] transition-opacity hover:opacity-80 ${TTC_FOCUS_RING}`}
              >
                {insight.ctaLabel} <ArrowRight size={13} aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TTCJourneyInsights;
