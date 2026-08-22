import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { buildAuthUrl } from "@/lib/authIntent";
import { setJournalOwner } from "@/lib/journalOwner";
import {
  PG_CARD_PAD,
  PG_CARD_RADIUS,
  PG_EYEBROW,
  PG_HELPER,
  PG_QUIET_LINK,
  PG_SOFT_PILL,
} from "@/components/myweek/pregnancyStyles";
import { BotanicalSprig, SmallSprig, WatercolourWash } from "@/components/myweek/PregnancyDecor";

/**
 * Phase 27F — insert-card entry.
 *
 * Warm welcome for someone arriving from a card inside the physical journal.
 * Not a product page and not a purchase flow: the only state it touches is a
 * device-level tone preference.
 */
const JournalStart = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const resolveDestination = async (): Promise<string> => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return buildAuthUrl("start_journey");
    const journey = await getActivePregnancyJourney(user.id);
    return journey ? "/my-week" : "/setup";
  };

  const go = async (owner: boolean) => {
    if (busy) return;
    setBusy(true);
    if (owner) setJournalOwner();
    try {
      navigate(await resolveDestination());
    } catch {
      navigate("/setup");
    }
  };

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
      <SeoHead
        title="Your digital companion | The Start of You"
        description="A warm welcome to the digital companion for The Start of You pregnancy journal."
        canonical="https://thestartofyou.com/journal-start"
        noindex
      />

      <main className="relative mx-auto w-full max-w-[640px] px-4 sm:px-8 pt-16 sm:pt-24 pb-20">
        <section
          className={`pregnancy-paper relative overflow-hidden ${PG_CARD_RADIUS} ${PG_CARD_PAD}`}
        >
          <WatercolourWash tone="sage" opacity={0.32} className="!absolute" />
          <BotanicalSprig className="-right-8 -top-6 w-[132px] rotate-12" opacity={0.3} />
          <SmallSprig className="-left-5 -bottom-6 w-[104px] -rotate-12" opacity={0.32} />

          <div className="relative">
            <p className={PG_EYEBROW}>The Start of You journal</p>

            <h1 className="mt-4 font-serif text-[1.7rem] sm:text-[2.1rem] font-medium leading-[1.18] tracking-tight text-foreground max-w-[18ch]">
              Welcome to your digital companion.
            </h1>

            <p className="mt-5 font-serif text-[1.05rem] sm:text-[1.12rem] leading-[1.75] text-[hsl(var(--stage-pregnancy-text))] max-w-[46ch]">
              Use this alongside your journal whenever you want to keep something
              quickly, revisit your week or carry a memory with you.
            </p>

            <p className={`${PG_HELPER} mt-4 max-w-[46ch]`}>
              Your journal is still the place for the longer story by hand.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={() => void go(true)}
                disabled={busy}
                className={PG_SOFT_PILL}
              >
                Start my pregnancy journey
              </button>

              <button
                type="button"
                onClick={() => void go(false)}
                disabled={busy}
                className={PG_QUIET_LINK}
              >
                I do not have the journal
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JournalStart;
