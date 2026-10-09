import { useEffect, useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import SeoHead from "@/components/seo/SeoHead";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { supabase } from "@/integrations/supabase/client";
import { deletePregnancyJourney } from "@/lib/savedJourney";
import { deleteTTCJourney } from "@/lib/savedTTCJourney";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  accountDeletionMessage,
  interpretDeleteAccountResult,
  shouldLeaveAccount,
  type AccountDeletionOutcome,
} from "@/lib/accountDeletion";
import JourneyStatusSection from "@/components/journey-status/JourneyStatusSection";
import BabyIllustrationStyleField from "@/components/settings/BabyIllustrationStyleField";
import CompanionMemorySection from "@/components/settings/CompanionMemorySection";
import CompanionJournalSection from "@/components/settings/CompanionJournalSection";
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
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [lifecycle, setLifecycle] = useState<Lifecycle>(null);
  const [pregnancyDates, setPregnancyDates] = useState<{ lmp: string; due: string } | null>(null);
  const [ttcDates, setTtcDates] = useState<{ lmp: string; cycle: number | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"export" | "journey" | "account" | "companion" | null>(null);
  const [confirming, setConfirming] = useState<"journey" | "account" | null>(null);

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
      const nextLifecycle = pointer?.lifecycle === "pregnancy" || pointer?.lifecycle === "ttc" ? pointer.lifecycle : null;
      setLifecycle(nextLifecycle);
      // Phase 15.1 · Fix 5: surface the actual saved dates so users can
      // sanity-check what the app has stored without re-running a calculator.
      if (nextLifecycle === "pregnancy") {
        const { data: preg } = await supabase
          .from("pregnancy_journeys")
          .select("lmp_date, due_date")
          .eq("user_id", user.id)
          .maybeSingle();
        if (active && preg?.lmp_date && preg?.due_date) {
          setPregnancyDates({ lmp: preg.lmp_date, due: preg.due_date });
        }
      } else if (nextLifecycle === "ttc") {
        const { data: ttc } = await supabase
          .from("ttc_journeys")
          .select("last_period_date, cycle_length_days")
          .eq("user_id", user.id)
          .maybeSingle();
        if (active && ttc?.last_period_date) {
          setTtcDates({ lmp: ttc.last_period_date, cycle: ttc.cycle_length_days ?? null });
        }
      }
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
        // Phase 15.7: the export previously stopped here, so video memories,
        // voice notes and every toolkit record were missing from a request
        // for "all my data". Rows carry storage paths only — never URLs.
        supabase.from("week_media_memories").select("*").eq("user_id", userId),
        supabase.from("birth_plans").select("*").eq("user_id", userId),
        supabase.from("hospital_bag_items").select("*").eq("user_id", userId),
        supabase.from("pregnancy_appointments").select("*").eq("user_id", userId),
        supabase.from("baby_movement_notes").select("*").eq("user_id", userId),
        supabase.from("contraction_sessions").select("*").eq("user_id", userId),
        supabase.from("contraction_events").select("*").eq("user_id", userId),
        supabase.from("pregnancy_symptom_notes").select("*").eq("user_id", userId),
        supabase.from("midwife_questions").select("*").eq("user_id", userId),
        // Phase 16.1B: first year records.
        supabase.from("first_year_journeys").select("*").eq("user_id", userId),
        supabase.from("babies").select("*").eq("user_id", userId),
        // Phase 17B: First Year daily check-in notes.
        supabase.from("first_year_entries").select("*").eq("user_id", userId),
        // Phase 19B/22B: First Year memories. Words, plus the details of any photo
        // kept with a memory. The photo files themselves are never in the JSON.
        supabase.from("first_year_memories").select("*").eq("user_id", userId),
        // AIC-3: everything the companion has been asked to remember.
        supabase.from("companion_memories").select("*").eq("user_id", userId),
        // AIC-4: stored conversations, when conversation history is in use.
        supabase.from("companion_conversations").select("*").eq("user_id", userId),
        supabase.from("companion_messages").select("*").eq("user_id", userId),
      ]);
      const error = results.find((result) => result.error)?.error;
      if (error) throw error;
      const [
        profiles,
        journeys,
        pregnancy,
        ttc,
        logs,
        reflections,
        photos,
        archived,
        mediaMemories,
        birthPlans,
        hospitalBag,
        appointments,
        movements,
        contractionSessions,
        contractionEvents,
        symptomNotes,
        midwifeQuestions,
        firstYearJourney,
        babies,
        firstYearEntries,
        firstYearMemories,
        companionMemories,
        companionConversations,
        companionMessages,
      ] = results;
      const payload = {
        exported_at: new Date().toISOString(),
        account_id: userId,
        note:
          "This file contains every record saved to your account. Photos, videos and voice notes are stored as files; this export lists their details and storage paths, not the files themselves.",
        profile: profiles.data,
        active_journey: journeys.data,
        pregnancy_journey: pregnancy.data,
        ttc_journey: ttc.data,
        ttc_logs: logs.data,
        reflections: reflections.data,
        photo_records: photos.data,
        media_memories: mediaMemories.data,
        archived_journeys: archived.data,
        birth_plan: birthPlans.data,
        hospital_bag_items: hospitalBag.data,
        pregnancy_appointments: appointments.data,
        baby_movement_notes: movements.data,
        contraction_sessions: contractionSessions.data,
        contraction_events: contractionEvents.data,
        symptom_notes: symptomNotes.data,
        midwife_questions: midwifeQuestions.data,
        first_year_journey: firstYearJourney.data,
        babies: babies.data,
        first_year_notes: firstYearEntries.data,
        first_year_memories: firstYearMemories.data,
        companion_memories: companionMemories.data,
        companion_conversations: companionConversations.data,
        companion_messages: companionMessages.data,
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
    setConfirming(null);
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
    setConfirming(null);
    setBusy("account");
    let outcome: AccountDeletionOutcome;
    try {
      const { data, error } = await supabase.functions.invoke("delete-account", { body: { confirmed: true } });
      outcome = interpretDeleteAccountResult(data, error as { context?: { status?: number } } | null);
    } catch {
      outcome = { kind: "unknown" };
    }
    const message = accountDeletionMessage(outcome);
    if (shouldLeaveAccount(outcome)) {
      // Client sign-out is UX only; Storage RLS and the deleted Auth user are the security boundary.
      await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
      queryClient.clear();
      toast({ title: message.title, description: message.description });
      navigate("/", { replace: true });
      return;
    }
    toast({ title: message.title, description: message.description, variant: "destructive" });
    setBusy(null);
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
    <div className="min-h-screen bg-parchment-grain page-vignette relative overflow-x-hidden">
      {/* Private account surface: never indexed, no canonical. */}
      <SeoHead
        title="Account settings | The Start of You"
        description="Manage your saved records, journey and account with The Start of You."
        noindex
      />
      <MyWeekHeader />

      <main className="relative mx-auto w-full max-w-[720px] lg:max-w-[880px] px-4 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">
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

          {userId && <BabyIllustrationStyleField userId={userId} />}

          {/* AIC-3 — visible, editable, removable. Gated by the client flag. */}
          <CompanionMemorySection />
          <CompanionJournalSection />

          <section className="rounded-2xl border border-border/50 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Download your data</h2>
            <p className="text-sm text-muted-foreground mb-5">Creates a JSON file containing everything saved to your account: your profile, journey details, logs, reflections, First Year daily notes, First Year memories and the details of any photo kept with a memory, photo, video and voice note records, anything your companion has been asked to remember, any conversations kept on your account, and all of your toolkit entries. Files themselves are not included, only their details.</p>
            <button type="button" onClick={exportData} disabled={Boolean(busy)} className="inline-flex items-center gap-2 rounded-pill border border-border px-5 py-2.5 text-sm disabled:opacity-50">
              <Download size={15} /> {busy === "export" ? "Preparing…" : "Download my data"}
            </button>
          </section>

          {userId && lifecycle === "pregnancy" && (
            <JourneyStatusSection userId={userId} />
          )}

          <section className="rounded-2xl border border-border/50 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Current journey</h2>
            <p className="text-sm text-muted-foreground mb-3">
              {lifecycle ? `Your active journey is ${lifecycle === "ttc" ? "trying to conceive" : "pregnancy"}.` : "You do not currently have a saved journey."}
            </p>
            {lifecycle === "pregnancy" && pregnancyDates && (
              <dl className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">Last period</dt>
                  <dd className="font-serif text-foreground">{pregnancyDates.lmp}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">Estimated due date</dt>
                  <dd className="font-serif text-foreground">{pregnancyDates.due}</dd>
                </div>
              </dl>
            )}
            {lifecycle === "ttc" && ttcDates && (
              <dl className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">Last period</dt>
                  <dd className="font-serif text-foreground">{ttcDates.lmp}</dd>
                </div>
                {ttcDates.cycle && (
                  <div>
                    <dt className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground/70">Cycle length</dt>
                    <dd className="font-serif text-foreground">{ttcDates.cycle} days</dd>
                  </div>
                )}
              </dl>
            )}
            {lifecycle && (
              <button type="button" onClick={() => setConfirming("journey")} disabled={Boolean(busy)} className="text-sm text-destructive underline disabled:opacity-50">
                {busy === "journey" ? "Removing journey…" : "Remove this journey"}
              </button>
            )}
          </section>

          <section className="rounded-2xl border border-destructive/25 bg-card p-6">
            <h2 className="font-serif text-xl mb-2">Delete account</h2>
            <p className="text-sm text-muted-foreground mb-5">Permanently removes the account and everything saved to it: your saved journeys, logs and reflections, your baby details, your First Year daily notes, your First Year memories and their photo details, and every private photo, video and voice note you have stored.</p>
            <button type="button" onClick={() => setConfirming("account")} disabled={Boolean(busy)} className="inline-flex items-center gap-2 text-sm text-destructive underline disabled:opacity-50">
              <Trash2 size={15} /> {busy === "account" ? "Deleting account…" : "Delete my account"}
            </button>
          </section>
        </div>
      </main>

      <ConfirmDialog
        open={confirming === "journey"}
        onOpenChange={(next) => setConfirming(next ? "journey" : null)}
        title={lifecycle === "ttc" ? "Remove your trying to conceive journey?" : "Remove your pregnancy journey?"}
        description="Your saved dates and journey details will be removed from this account. Anything you have kept, such as reflections and memories, stays where it is. This cannot be undone."
        confirmLabel="Remove journey"
        cancelLabel="Keep my journey"
        onConfirm={removeJourney}
        busy={busy === "journey"}
      />

      <ConfirmDialog
        open={confirming === "account"}
        onOpenChange={(next) => setConfirming(next ? "account" : null)}
        title="Permanently delete your account?"
        description="This removes your account and everything saved to it, including your journey, reflections, toolkit records, baby details, First Year daily notes, First Year memories and their photo details, and every private photo, video and voice note you have stored. This cannot be undone. If you would like a copy first, close this and download your data."
        confirmLabel="Delete everything"
        cancelLabel="Cancel"
        onConfirm={deleteAccount}
        busy={busy === "account"}
      />

      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default AccountSettings;
