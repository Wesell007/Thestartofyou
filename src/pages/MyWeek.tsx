import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekHero from "@/components/myweek/MyWeekHero";
import SlotWhatMatters from "@/components/myweek/SlotWhatMatters";
import SlotOneFocus from "@/components/myweek/SlotOneFocus";
import SlotReflection from "@/components/myweek/SlotReflection";
import SlotWhatsNext from "@/components/myweek/SlotWhatsNext";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";

const getGreeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const formatDueDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

type Loaded = {
  firstName: string;
  currentWeek: number;
  dueDate: Date;
};

const MyWeek = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<Loaded | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }

      const [{ data: profile }, { data: journey }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("saved_journeys").select("lmp_date, due_date").eq("user_id", user.id).maybeSingle(),
      ]);

      if (cancelled) return;

      if (!journey) {
        navigate("/due-date-calculator", { replace: true });
        return;
      }
      if (!profile?.first_name) {
        navigate("/setup", { replace: true });
        return;
      }

      const lmp = new Date(journey.lmp_date);
      const due = new Date(journey.due_date);
      setState({
        firstName: profile.first_name,
        currentWeek: computeWeek(lmp),
        dueDate: due,
      });
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const content = useMemo(
    () => (state ? getMyWeekContent(state.currentWeek) : null),
    [state]
  );

  if (loading || !state || !content) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { firstName, currentWeek, dueDate } = state;
  const nextWeek = currentWeek < MAX_PREGNANCY_WEEK ? currentWeek + 1 : null;
  const contextual =
    currentWeek <= 12
      ? "If something doesn't feel right, our Support hub is here."
      : currentWeek >= 37
      ? "Whatever you're feeling right now, support is here."
      : null;

  return (
    <div className="min-h-screen bg-parchment">
      <MyWeekHeader />
      <main className="mx-auto w-full max-w-[640px] md:max-w-[680px] px-5 sm:px-8 md:px-12">
        <MyWeekHero
          greeting={getGreeting()}
          firstName={firstName}
          week={currentWeek}
          dueDateLabel={formatDueDate(dueDate)}
        />
        <div aria-hidden="true" className="hidden md:flex justify-center -mt-6 mb-10">
          <span
            className="block w-1 h-1 rounded-full"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
          />
        </div>
        <SlotWhatMatters content={content} />
        <SlotOneFocus content={content} />
        <SlotReflection content={content} />
        <SlotWhatsNext content={content} nextWeek={nextWeek} />
      </main>
      <MyWeekFooter contextual={contextual} />
    </div>
  );
};

export default MyWeek;
