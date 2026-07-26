import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import { supabase } from "@/integrations/supabase/client";
import {
  getActivePregnancyJourney,
  type PregnancyJourneyStatus,
} from "@/lib/savedJourney";
import {
  SUPPORT_ARTICLES,
  GROUP_HEADINGS,
  GROUP_ORDER,
  isSupportStatus,
  type SupportStatus,
} from "@/data/journeySupportArticles";
import SupportArticleGroup from "@/components/journey-support/SupportArticleGroup";
import JourneySupportIntro from "@/components/journey-support/JourneySupportIntro";

const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

/**
 * Protected, noindex page for signed-in users whose pregnancy journey
 * status is pregnancy_loss, paused, or no_longer_pregnant.
 * Redirects everyone else to /my-journey.
 */
const JourneySupport = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<PregnancyJourneyStatus | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadError(null);
      setReady(false);
      try {
        const { data: sess, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const user = sess.session?.user;
        if (!user) {
          navigate("/auth", { replace: true });
          return;
        }
        const journey = await getActivePregnancyJourney(user.id);
        if (cancelled) return;
        if (!journey || !isSupportStatus(journey.status)) {
          navigate("/my-journey", { replace: true });
          return;
        }
        setStatus(journey.status);
        setReady(true);
      } catch {
        if (!cancelled) setLoadError("We couldn't load this page just now.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  const supportStatus: SupportStatus | null = useMemo(
    () => (isSupportStatus(status) ? status : null),
    [status],
  );

  const grouped = useMemo(() => {
    if (!supportStatus) return [];
    return GROUP_ORDER.map((key) => ({
      key,
      heading: GROUP_HEADINGS[key],
      articles: SUPPORT_ARTICLES.filter(
        (a) => a.group === key && a.showFor.includes(supportStatus),
      ),
    })).filter((g) => g.articles.length > 0);
  }, [supportStatus]);

  if (loadError) {
    return (
      <PageLoadState
        error={loadError}
        onRetry={() => setAttempt((n) => n + 1)}
      />
    );
  }
  if (!ready || !supportStatus) return <PageLoadState />;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Journey support | The Start of You"
        description="Gentle pieces from The Start of You for when you want something to lean on."
        canonical="https://thestartofyou.com/journey-support"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        <JourneySupportIntro />

        {grouped.map((g) => (
          <SupportArticleGroup
            key={g.key}
            heading={g.heading}
            articles={g.articles}
          />
        ))}

        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 mb-8"
          style={{ borderColor: softBorder }}
        >
          <p className="font-serif text-foreground/85 text-[15.5px] leading-[1.7] mb-4">
            Your saved memories are still where you left them.
          </p>
          <Link
            to="/my-journey"
            className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
          >
            Open My Journey
          </Link>
        </section>

        <p className="font-sans text-[12.5px] font-light text-foreground/60 leading-[1.6]">
          You can change your journey status any time in{" "}
          <Link
            to="/account-settings"
            className="underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
          >
            Account Settings
          </Link>
          .
        </p>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default JourneySupport;
