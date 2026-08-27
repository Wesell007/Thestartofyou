import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TTCLogType } from "@/lib/ttcLogs";
import type { TTCSupportMoment } from "@/lib/ttcSupportMoment";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { companionAskLabel } from "@/lib/companion/companionName";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_HELPER,
  TTC_PAPER_CARD_WARM,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import {
  TTCBotanicalLeaf,
  TTCWatercolourWash,
} from "@/components/ttc/journey/TTCDecor";

/**
 * Phase 28E — a single gentle support surface for the harder parts of TTC.
 *
 * Presentation only. The moment is computed elsewhere from existing stage and
 * log data; this file renders it and calls back into the existing note flow.
 */

type Props = {
  moment: TTCSupportMoment;
  onAddNote: (type: TTCLogType, value?: string) => void;
};

const TTCSupportMomentCard = ({ moment, onAddNote }: Props) => (
  <section
    className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}
    aria-labelledby="ttc-support-heading"
  >
    <TTCWatercolourWash className="-bottom-24 -right-16 w-[300px]" opacity={0.26} />
    <TTCBotanicalLeaf className="-top-10 -left-8 w-[140px] rotate-[8deg]" opacity={0.2} />

    <div className="relative">
      <p className={`${TTC_EYEBROW} mb-3`}>{moment.eyebrow}</p>
      <h2
        id="ttc-support-heading"
        className={`${TTC_HEADING} text-[22px] sm:text-[25px] mb-3 max-w-[24ch]`}
      >
        {moment.heading}
      </h2>
      <p className={`${TTC_CARD_BODY} mb-3`}>{moment.body}</p>
      <p className="font-serif italic text-[15.5px] sm:text-[16px] leading-[1.65] text-[hsl(var(--stage-ttc-text-soft))] max-w-[46ch] mb-6">
        {moment.supportLine}
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {moment.actions.map((action, index) => {
          const primary = index === 0;
          const className = primary ? TTC_SOFT_PILL : TTC_QUIET_LINK;
          if (action.kind === "note") {
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onAddNote(action.logType, action.value)}
                className={className}
              >
                {action.label}
                {primary && <ArrowRight size={14} aria-hidden="true" />}
              </button>
            );
          }
          const href =
            action.kind === "ask"
              ? `/ask?stage=ttc&topic=${action.topic}`
              : action.href;
          return (
            <Link key={action.label} to={href} className={className}>
              {action.label}
              {primary && <ArrowRight size={14} aria-hidden="true" />}
            </Link>
          );
        })}
      </div>

      {moment.note && (
        <p className={`${TTC_HELPER} mt-5 max-w-[54ch]`}>{moment.note}</p>
      )}
    </div>
  </section>
);

export default TTCSupportMomentCard;
