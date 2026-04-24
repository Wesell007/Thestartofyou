import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
  type ConsentState,
} from "@/lib/consent";

/**
 * Strict opt-in analytics consent banner.
 *
 * Visible only while consent state is "unknown". Equally weighted
 * Reject / Accept actions — no dismiss, no implicit consent.
 */
const ConsentBanner = () => {
  const [state, setState] = useState<ConsentState>("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(getAnalyticsConsent());
    setMounted(true);
    return subscribeAnalyticsConsent(setState);
  }, []);

  if (!mounted || state !== "unknown") return null;

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
    >
      <div
        className="pointer-events-auto mx-auto w-full max-w-2xl bg-card border rounded-2xl shadow-soft px-5 py-5 sm:px-7 sm:py-6"
        style={{ borderColor: "hsl(var(--border) / 0.5)" }}
      >
        <p className="font-serif text-foreground text-base sm:text-lg mb-1.5">
          A small note on analytics
        </p>
        <p className="font-sans text-sm font-light text-muted-foreground/85 leading-relaxed mb-5">
          We use anonymous analytics to understand which parts of The Start of You
          are genuinely helping. It's optional, and you can change your mind at any
          time from the footer.{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setAnalyticsConsent("rejected")}
            className="flex-1 inline-flex items-center justify-center rounded-pill px-5 py-2.5 font-sans text-sm font-medium border border-foreground/20 text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => setAnalyticsConsent("accepted")}
            className="flex-1 inline-flex items-center justify-center rounded-pill px-5 py-2.5 font-sans text-sm font-medium bg-terracotta text-terracotta-foreground shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
