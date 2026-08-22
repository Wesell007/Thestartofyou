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
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_ICON_BUBBLE,
  TTC_PAPER_CARD_WARM,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import { TTCWatercolourWash } from "@/components/ttc/journey/TTCDecor";

type Props = {
  journey: ActiveTTCJourney;
};

/**
 * Pregnancy handover section (Phase 9.5f).
 *
 * User-controlled. Never creates a pregnancy journey directly, never
 * archives the TTC journey, never switches `journeys.lifecycle`.
 * On confirm, routes to the existing due date flow, which remains the
 * source of truth for pregnancy dates and journey creation.
 */
const TTCPregnancyHandover = forwardRef<HTMLElement, Props>(
  ({ journey }, ref) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
      >
        <TTCWatercolourWash className="-bottom-24 -right-16 w-[300px]" opacity={0.3} />
        <div className="relative flex items-start gap-3 mb-3">
          <div className={`${TTC_ICON_BUBBLE} flex-shrink-0`}>
            <Sparkles
              size={15}
              className="text-[hsl(var(--stage-ttc-olive))]"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <p className={`${TTC_EYEBROW} mb-1`}>A new chapter</p>
            <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-2`}>
              Ready to move into pregnancy guidance?
            </h2>
            <p className={`${TTC_CARD_BODY} mb-5`}>
              If you have a positive test and feel ready, we can help you move
              from TTC into pregnancy support. You will still choose what to
              save next.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={TTC_SOFT_PILL}
              >
                Start pregnancy guidance <ArrowRight size={14} aria-hidden="true" />
              </button>
              <Link
                to="/due-date-calculator"
                className={TTC_QUIET_LINK}
              >
                Use due date calculator
              </Link>
              <Link
                to="/pregnancy"
                className={TTC_QUIET_LINK}
              >
                Explore pregnancy hub
              </Link>
            </div>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif">
                Move into pregnancy guidance?
              </AlertDialogTitle>
              <AlertDialogDescription>
                We will use your saved cycle start as a starting point for the
                due date calculator. You can review it before anything is
                saved. Your TTC journey stays where it is for now.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Not yet</AlertDialogCancel>
              <AlertDialogAction onClick={confirmHandover}>
                Continue to due date calculator
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
