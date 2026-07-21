import { useEffect, useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoadState from "@/components/shared/PageLoadState";
import { supabase } from "@/integrations/supabase/client";
import { deletePregnancyJourney } from "@/lib/savedJourney";
import { deleteTTCJourney } from "@/lib/savedTTCJourney";
import { toast } from "@/hooks/use-toast";

type Lifecycle = "pregnancy" | "ttc" | null;

const AccountSettings = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<Lifecycle>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"export" | "journey" | "account" | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast({ title: "Could not load account settings", variant: "destructive" });
        if (active) setLoading(false);
        return;
      }
      const user = data.session?.user;
      if (!user) return;
      const { data: pointer } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", user.id)
        .maybeSingle();
      if (active) {
        setUserId(user.id);
        setLifecycle(pointer?.lifecycle === "pregnancy" || pointer?.lifecycle === "ttc" ? pointer.lifecycle : null);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const exportData = async () => {
    if (!userId || busy) return;
    setBusy("export");
    try {
      const results = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId),
        supabase.from("journeys").select("*").eq("user_id", userId),
        supabase.from("pregnancy_journeys").select("*").eq("user_id", userId),
        supabase.from("ttc_journeys").select("*").eq("user_id", userId),
        supabase.from("ttc_logs").select("*").eq("user_id", userId),
        supabase.from("reflections").select("*").eq("user_id", userId),
        supabase.from("week_photos").select("*").eq("user_id", userId),
        supabase.from("archived_journeys").select("*").eq("user_id", userId),
      ]);
      const error = results.find((result) => result.error)?.error;
      if (error) throw error;
      const [profiles, journeys, pregnancy, ttc, logs, reflections, photos, archived] = results;
      const payload = {
        exported_at: new Date().toISOString(),
        account_id: userId,
        profile: profiles.data,
        active_journey: journeys.data,
        pregnancy_journey: pregnancy.data,
        ttc_journey: ttc.data,
        ttc_logs: logs.data,
        reflections: reflections.data,
        photo_records: photos.data,
        archived_journeys: archived.data,
      };
      const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `the-start-of-you-data-${new Date().toISOString().slice(0, 10)}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast({ title: "Your data export is ready" });
    } catch {
      toast({ title: "Could not export your data", description: "Please try again.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const removeJourney = async () => {
    if (!userId || !lifecycle || busy) return;
    if (!window.confirm(`Remove your ${lifecycle === "ttc" ? "TTC" : "pregnancy"} journey? This cannot be undone.`)) return;
    setBusy("journey");
    try {
      if (lifecycle === "pregnancy") await deletePregnancyJourney(userId);
      else await deleteTTCJourney(userId);
      setLifecycle(null);
      toast({ title: "Journey removed" });
    } catch {
      toast({ title: "Could not remove journey", description: "Nothing was removed. Please try again.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const deleteAccount = async () => {
    if (busy) return;
    if (!window.confirm("Permanently delete your account, saved journeys, reflections, logs and photos? This cannot be undone.")) return;
    setBusy("account");
    try {
      const { error } = await supabase.functions.invoke("delete-account", { body: { confirmed: true } });
      if (error) throw error;
      await supabase.auth.signOut();
      navigate("/", { replace: true });
    } catch {
      toast({ title: "Could not delete your account", description: "Please try again. Your account is still available.", variant: "destructive" });
      setBusy(null);
    }
  };

  if (loading) return <PageLoadState />;

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-5 sm:px-8 py-16 md:py-24">
        <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-terracotta mb-3">Your account</p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Data and account settings</h1>
        <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Download a copy of your saved records, remove the current journey, or permanently delete your account.
        </p>

        <div className="space-y-5">
          <section className="rounded-2xl border border-border/50 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Download your data</h2>
            <p className="text-sm text-muted-foreground mb-5">Creates a JSON file containing your profile, journey details, logs, reflections and photo records.</p>
            <button type="button" onClick={exportData} disabled={Boolean(busy)} className="inline-flex items-center gap-2 rounded-pill border border-border px-5 py-2.5 text-sm disabled:opacity-50">
              <Download size={15} /> {busy === "export" ? "Preparing…" : "Download my data"}
            </button>
          </section>

          <section className="rounded-2xl border border-border/50 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Current journey</h2>
            <p className="text-sm text-muted-foreground mb-5">
              {lifecycle ? `Your active journey is ${lifecycle === "ttc" ? "trying to conceive" : "pregnancy"}.` : "You do not currently have a saved journey."}
            </p>
            {lifecycle && (
              <button type="button" onClick={removeJourney} disabled={Boolean(busy)} className="text-sm text-destructive underline disabled:opacity-50">
                {busy === "journey" ? "Removing journey…" : "Remove this journey"}
              </button>
            )}
          </section>

          <section className="rounded-2xl border border-destructive/25 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Delete account</h2>
            <p className="text-sm text-muted-foreground mb-5">Permanently removes the account and its saved journeys, logs, reflections and weekly photos.</p>
            <button type="button" onClick={deleteAccount} disabled={Boolean(busy)} className="inline-flex items-center gap-2 text-sm text-destructive underline disabled:opacity-50">
              <Trash2 size={15} /> {busy === "account" ? "Deleting account…" : "Delete my account"}
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings;
