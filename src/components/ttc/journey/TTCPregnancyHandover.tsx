import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  TTC_HANDOVER_COPY,
  TTC_HANDOVER_DIALOG,
  type TTCHandoverState,
} from "@/lib/ttcHandoverState";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_HELPER,
  TTC_ICON_BUBBLE,
  TTC_PAPER_CARD_WARM,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import {
  TTCBotanicalLeaf,
  TTCWatercolourWash,
} from "@/components/ttc/journey/TTCDecor";

type Props = {
  journey: ActiveTTCJourney;
  /** Phase 28G — presentation state only. Never changes what confirm does. */
  state?: Exclude<TTCHandoverState, "active_pregnancy_exists">;
};

/**
 * Pregnancy handover section (Phase 9.5f, upgraded in Phase 28G).
 *
 * User-controlled. Never creates a pregnancy journey directly, never
 * archives the TTC journey, never resets the cycle and never switches
 * `journeys.lifecycle`. On confirm, routes to the existing due date flow,
 * which remains the source of truth for pregnancy dates and journey creation.
 * Only the saved cycle start is carried forward: no note text, no log rows.
 */
const TTCPregnancyHandover = forwardRef<HTMLElement, Props>(
  ({ journey, state = "neutral" }, ref) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const copy = TTC_HANDOVER_COPY[state];
    const raised = state === "positive_test_logged";

    const confirmHandover = () => {
      trackEvent(EVENTS.TTC_PREGNANCY_HANDOVER_STARTED);
      setOpen(false);
      if (journey.last_period_date) {
        const lmp = parseDateOnly(journey.last_period_date);
        if (lmp) {
          navigate(
            `/due-date-results?lmp=${lmp.getTime()}&from=ttc-positive`,
          );
          return;
        }
      }
      navigate("/due-date-calculator?from=ttc-positive");
    };

    return (
      <section
        ref={ref}
        className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}
        aria-labelledby="ttc-handover-heading"
      >
        <TTCWatercolourWash className="-bottom-24 -right-16 w-[300px]" opacity={0.3} />
        {raised && (
          <>
            <TTCBotanicalLeaf
              className="-top-10 -left-8 w-[160px] rotate-[8deg]"
              opacity={0.2}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--stage-ttc-peach) / 0.55) 0%, transparent 70%)",
              }}
            />
          </>
        )}
        <div className="relative flex items-start gap-3 mb-3">
          <div className={`${TTC_ICON_BUBBLE} flex-shrink-0`}>
            <Sparkles
              size={15}
              className="text-[hsl(var(--stage-ttc-olive))]"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <p className={`${TTC_EYEBROW} mb-1`}>{copy.eyebrow}</p>
            <h2
              id="ttc-handover-heading"
              className={`${TTC_HEADING} ${
                raised ? "text-[23px] sm:text-[26px]" : "text-[21px] sm:text-[23px]"
              } mb-2`}
            >
              {copy.heading}
            </h2>
            <p className={`${TTC_CARD_BODY} mb-2`}>{copy.body}</p>
            <p className={`${TTC_HELPER} mb-5`}>{copy.supportLine}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={TTC_SOFT_PILL}
              >
                {copy.primary} <ArrowRight size={14} aria-hidden="true" />
              </button>
              {raised ? (
                <Link to="/my-ttc-journey" className={TTC_QUIET_LINK}>
                  {copy.secondary}
                </Link>
              ) : (
                <>
                  <Link to="/due-date-calculator" className={TTC_QUIET_LINK}>
                    {copy.secondary}
                  </Link>
                  <Link to="/pregnancy" className={TTC_QUIET_LINK}>
                    Explore pregnancy hub
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif">
                {TTC_HANDOVER_DIALOG.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {TTC_HANDOVER_DIALOG.body}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{TTC_HANDOVER_DIALOG.secondary}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmHandover}>
                {TTC_HANDOVER_DIALOG.primary}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    );
  },
);

TTCPregnancyHandover.displayName = "TTCPregnancyHandover";

export default TTCPregnancyHandover;
