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
        const lmp = new Date(journey.last_period_date);
        if (!isNaN(lmp.getTime())) {
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
        className="rounded-[20px] px-6 sm:px-7 py-7 keepsake-surface"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "hsl(var(--stage-pregnancy-accent) / 0.14)",
            }}
          >
            <Sparkles
              size={15}
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            />
          </div>
          <div className="flex-1">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-1"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Pregnancy handover
            </p>
            <h2 className="font-serif text-[20px] sm:text-[22px] text-foreground mb-2 leading-snug">
              Ready to move into pregnancy guidance?
            </h2>
            <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6] mb-5 max-w-[52ch]">
              If you have a positive test and feel ready, we can help you move
              from TTC into pregnancy support. You will still choose what to
              save next.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
                style={{
                  background: "hsl(var(--stage-pregnancy-accent))",
                }}
              >
                Start pregnancy guidance <ArrowRight size={14} />
              </button>
              <Link
                to="/due-date-calculator"
                className="font-sans text-[13.5px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Use due date calculator
              </Link>
              <Link
                to="/pregnancy"
                className="font-sans text-[13.5px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
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
