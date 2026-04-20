import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { commitPendingJourneyToDB, readPendingJourney } from "@/lib/savedJourney";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/setup";

  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // If already signed in, route forward (commit pending journey if needed)
  useEffect(() => {
    let cancelled = false;
    const route = async (userId: string) => {
      try {
        await commitPendingJourneyToDB(userId);
      } catch (e) {
        // non-fatal; user can re-save later
        console.error(e);
      }
      // If they have a profile already, skip setup
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("user_id", userId)
        .maybeSingle();

      const target = profile?.first_name ? "/my-week" : next;
      if (!cancelled) navigate(target, { replace: true });
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) route(data.session.user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) route(session.user.id);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate, next]);

  const handleGoogle = async () => {
    setGoogleSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setGoogleSubmitting(false);
      toast.error("Could not sign in with Google. Please try again.");
    }
    // If redirected, browser leaves the page. If tokens returned, onAuthStateChange routes.
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSubmitting(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin + "/auth" },
    });
    setEmailSubmitting(false);
    if (error) {
      toast.error("Could not send link. Please check the email and try again.");
      return;
    }
    setLinkSent(true);
  };

  const pending = readPendingJourney();

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <header className="container mx-auto px-5 sm:px-6 md:px-10 pt-8">
        <Link to="/" className="font-serif text-lg text-foreground/80 hover:text-foreground transition-colors">
          The Start of You
        </Link>
      </header>

      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-md py-16 md:py-24">
          <div className="text-center mb-10">
            <p
              className="font-sans text-[10px] font-light tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
            >
              Save your journey
            </p>
            <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
              {pending ? "One step to keep your place" : "Welcome back"}
            </h1>
            <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-sm mx-auto">
              {pending
                ? "Sign in to save your stage and unlock your weekly space."
                : "Sign in to return to your weekly space."}
            </p>
          </div>

          <div
            className="bg-card border rounded-2xl p-7 md:p-8 shadow-soft"
            style={{ borderColor: "hsl(var(--border) / 0.4)" }}
          >
            {linkSent ? (
              <div className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--stage-pregnancy) / 0.2)" }}
                >
                  <Mail size={18} style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
                </div>
                <p className="font-serif text-lg text-foreground mb-2">Check your inbox</p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  We've sent a sign-in link to <span className="text-foreground">{email}</span>. Open it on this device to continue.
                </p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={googleSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-background rounded-pill px-6 py-3.5 font-sans text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {googleSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <path fill="#fff" d="M21.35 11.1H12v2.84h5.36c-.23 1.5-1.66 4.4-5.36 4.4-3.23 0-5.86-2.67-5.86-5.96s2.63-5.96 5.86-5.96c1.84 0 3.07.78 3.78 1.45l2.58-2.49C16.7 3.93 14.55 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c5.2 0 8.64-3.66 8.64-8.8 0-.59-.06-1.04-.13-1.5z"/>
                    </svg>
                  )}
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-border/50" />
                  <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground/60">or</span>
                  <div className="flex-1 h-px bg-border/50" />
                </div>

                <form onSubmit={handleMagicLink} className="space-y-3">
                  <label className="block">
                    <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">Email address</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-parchment border rounded-pill px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                      style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-60"
                  >
                    {emailSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>Send sign-in link <ArrowRight size={14} /></>}
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="font-sans text-[11px] font-light text-muted-foreground/40 text-center mt-6 leading-relaxed">
            By continuing you agree to our terms. We'll never share your details.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
