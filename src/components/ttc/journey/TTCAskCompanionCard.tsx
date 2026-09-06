/**
 * AIC-J4 — the TTC contextual entry point.
 *
 * Phase 28F made this an inline answer surface; J4 removes that. It now calls
 * no model, keeps no transcript and renders no answer. Pressing it opens the
 * one shared companion panel with entry provenance (trying to conceive, and
 * the topic for this part of the cycle) plus presentation-only suggestions.
 * No cycle dates, log rows, notes or identifiers travel with the hand-off.
 */

import { useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import type { TTCStage } from "@/lib/ttcDerived";
import type { TTCSupportMoment } from "@/lib/ttcSupportMoment";
import {
  askButtonLabelFor,
  askHeadingFor,
  ttcAskChipsFor,
  ttcAskTopicFor,
} from "@/lib/ttcAskContext";
import { TTCBotanicalLeaf, TTCBotanicalSprig } from "@/components/ttc/journey/TTCDecor";
import AskAboutThis from "@/components/companion/AskAboutThis";
import { Link } from "react-router-dom";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_OUTLINE_PILL,
  TTC_PAPER_CARD_WARM,
} from "@/components/ttc/journey/ttcStyles";

interface Props {
  stage: TTCStage | null;
  cycleDay: number | null;
  moment: TTCSupportMoment | null;
  possibleTestDate?: Date | null;
  expectedPeriodDate?: Date | null;
  hasRecentUnclearOrNegativeTest?: boolean;
  hasRecentPeriodStarted?: boolean;
  /** Phase 28G — chip ordering only when the pregnancy handover is raised. */
  handoverRaised?: boolean;
}

const TTCAskCompanionCard = ({
  stage,
  moment,
  handoverRaised = false,
}: Props) => {
  const { name } = useCompanionIdentity();
  const momentId = moment?.id ?? null;

  const suggestions = useMemo(
    () => ttcAskChipsFor(stage, momentId, 4, handoverRaised).map((chip) => chip.question),
    [stage, momentId, handoverRaised],
  );
  const topic = useMemo(() => ttcAskTopicFor(stage, momentId), [stage, momentId]);

  const heading = askHeadingFor(name);
  const askLabel = askButtonLabelFor(name);

  return (
    <div className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}>
      <TTCBotanicalSprig className="-top-9 -left-8 w-[150px] -rotate-6" opacity={0.2} />
      <TTCBotanicalLeaf className="-bottom-10 -right-6 w-[150px]" opacity={0.26} />

      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-3`}>
          {name ? `${name} is here` : "A quiet question"}
        </p>
        <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-2`}>{heading}</h2>
        <p className={`${TTC_CARD_BODY} mb-5`}>
          Ask about timing, testing, the wait or what may help next. Answers are
          general guidance, not a diagnosis or a substitute for a clinician.
        </p>

        <div className="flex flex-wrap items-start gap-3">
          <AskAboutThis
            label={
              <span className="inline-flex items-center gap-2">
                <Sparkles size={14} aria-hidden="true" />
                {askLabel}
              </span> as unknown as string
            }
            entry={{ stage: "ttc", topic, title: "Trying to conceive" }}
            suggestions={suggestions}
          />
          <Link to={`/ask?stage=ttc&topic=${topic}`} className={TTC_OUTLINE_PILL}>
            Open the full Ask page <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TTCAskCompanionCard;
