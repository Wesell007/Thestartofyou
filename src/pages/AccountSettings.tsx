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
import {
  SUGGESTED_NAMES,
  TONE_OPTIONS,
  validateCompanionName,
  isCompanionTone,
  type CompanionTone,
} from "@/lib/companion";

type Lifecycle = "pregnancy" | "ttc" | null;
type CompanionChoice = "skip" | "cindy" | "ava" | "mia" | "custom";

const suggestedFromName = (name: string | null): CompanionChoice => {
  if (!name) return "skip";
  const match = SUGGESTED_NAMES.find((n) => n.toLowerCase() === name.toLowerCase());
  return (match?.toLowerCase() as CompanionChoice | undefined) ?? "custom";
};

const AccountSettings = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<Lifecycle>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"export" | "journey" | "account" | "companion" | null>(null);

  const [companionChoice, setCompanionChoice] = useState<CompanionChoice>("skip");
  const [customName, setCustomName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [tone, setTone] = useState<CompanionTone | null>(null);

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
      const [{ data: pointer }, { data: profile }] = await Promise.all([
        supabase.from("journeys").select("lifecycle").eq("user_id", user.id).maybeSingle(),
        supabase
          .from("profiles")
          .select("companion_name, companion_tone")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);
      if (!active) return;
      setUserId(user.id);
      setLifecycle(pointer?.lifecycle === "pregnancy" || pointer?.lifecycle === "ttc" ? pointer.lifecycle : null);
      const savedName = profile?.companion_name?.trim() || null;
      const savedTone = profile?.companion_tone ?? null;
      const choice = suggestedFromName(savedName);
      setCompanionChoice(choice);
      if (choice === "custom" && savedName) setCustomName(savedName);
      setTone(isCompanionTone(savedTone) ? savedTone : null);
      setLoading(false);
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

  const saveCompanion = async () => {
    if (!userId || busy) return;
    setNameError(null);
    let companionValue: string | null = null;
    if (companionChoice === "custom") {
      const result = validateCompanionName(customName);
      if (result.ok === false) {
        setNameError(result.message);
        return;
      }
      companionValue = result.value;
    } else if (companionChoice !== "skip") {
      const suggested = SUGGESTED_NAMES.find((n) => n.toLowerCase() === companionChoice);
      companionValue = suggested ?? null;
    }
    setBusy("companion");
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { user_id: userId, companion_name: companionValue, companion_tone: tone },
        { onConflict: "user_id" },
      );
    setBusy(null);
    if (error) {
      toast({ title: "Could not save your companion", variant: "destructive" });
      return;
    }
    toast({ title: "Companion updated" });
  };

  const resetCompanion = async () => {
    if (!userId || busy) return;
    setBusy("companion");
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { user_id: userId, companion_name: null, companion_tone: null },
        { onConflict: "user_id" },
      );
    setBusy(null);
    if (error) {
      toast({ title: "Could not reset your companion", variant: "destructive" });
      return;
    }
    setCompanionChoice("skip");
    setCustomName("");
    setTone(null);
    setNameError(null);
    toast({ title: "Reset to default" });
  };

  if (loading) return <PageLoadState />;

  const pillClass = (active: boolean) =>
    `rounded-pill border px-3.5 py-1.5 font-sans text-[12.5px] transition-colors ${
      active
        ? "bg-foreground/[0.06] border-foreground/40 text-foreground"
        : "bg-parchment border-border/50 text-foreground/75 hover:border-foreground/25"
    }`;

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
            <h2 className="font-serif text-xl mb-2">Your companion</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Choose a name and tone for your companion, or leave it as the quiet default.
            </p>

            <p className="font-sans text-xs font-light text-muted-foreground/80 mb-2">Companion name</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(["skip", "cindy", "ava", "mia", "custom"] as CompanionChoice[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setCompanionChoice(opt);
                    setNameError(null);
                  }}
                  className={pillClass(companionChoice === opt)}
                >
                  {opt === "skip"
                    ? "Skip"
                    : opt === "custom"
                    ? "Custom"
                    : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
            {companionChoice === "custom" && (
              <div className="mb-3">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  maxLength={24}
                  placeholder="A name for your companion"
                  className="w-full bg-parchment border rounded-pill px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                  style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                />
                {nameError && (
                  <p role="alert" className="mt-2 font-sans text-[11.5px] text-destructive">
                    {nameError}
                  </p>
                )}
              </div>
            )}

            <p className="font-sans text-xs font-light text-muted-foreground/80 mt-4 mb-2">Tone</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {TONE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTone(tone === opt.value ? null : opt.value)}
                  className={pillClass(tone === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={saveCompanion}
                disabled={Boolean(busy)}
                className="inline-flex items-center gap-2 rounded-pill bg-terracotta text-terracotta-foreground px-5 py-2.5 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
              >
                {busy === "companion" ? "Saving…" : "Save companion"}
              </button>
              <button
                type="button"
                onClick={resetCompanion}
                disabled={Boolean(busy)}
                className="text-sm text-muted-foreground underline disabled:opacity-50"
              >
                Reset to default
              </button>
            </div>
          </section>

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
