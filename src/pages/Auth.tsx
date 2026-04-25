import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { commitPendingJourneyToDB, readPendingJourney } from "@/lib/savedJourney";
import {
  parseIntent,
  parseSafeReturnTo,
  resolvePostLoginDestination,
} from "@/lib/authIntent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { toast } from "sonner";

type Step = "choose" | "code-sent";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = parseIntent(params.get("intent"));
  const returnTo = parseSafeReturnTo(params.get("return_to"));
  // Default intent: if there's a pending journey treat as start_journey,
  // otherwise treat as a returning sign_in.
  const pending = readPendingJourney();
  const effectiveIntent = intent ?? (pending ? "start_journey" : "sign_in");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("choose");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const cooldownRef = useRef<number | null>(null);

  // If already signed in, route forward (commit pending journey if needed)
  useEffect(() => {
    let cancelled = false;
    const route = async (userId: string) => {
      try {
        await commitPendingJourneyToDB(userId);
      } catch (e) {
        console.error(e);
      }
      const target = await resolvePostLoginDestination(
        userId,
        effectiveIntent,
        returnTo
      );
      if (!cancelled) navigate(target, { replace: true });
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        route(data.session.user.id);
      } else {
        // Only count as auth_viewed when the user actually sees the form
        // (signed-in arrivals are auto-routed onward and shouldn't count).
        trackEvent(EVENTS.AUTH_VIEWED);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) route(session.user.id);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate, effectiveIntent, returnTo]);

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    cooldownRef.current = window.setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => {
      if (cooldownRef.current) window.clearTimeout(cooldownRef.current);
    };
  }, [resendCooldown]);

  const buildAuthReturnUrl = () => {
    // Re-encode intent + return_to so OAuth/magic-link round trips preserve them.
    const url = new URL(window.location.origin + "/auth");
    url.searchParams.set("intent", effectiveIntent);
    if (effectiveIntent === "return_to_route" && returnTo) {
      url.searchParams.set("return_to", returnTo);
    }
    return url.toString();
  };

  const handleGoogle = async () => {
    setGoogleSubmitting(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: buildAuthReturnUrl(),
    });
    if (result.error) {
      setGoogleSubmitting(false);
      toast.error("Could not sign in with Google. Please try again.");
    }
  };

  const sendCode = async (isResend = false) => {
    if (!email.trim()) return;
    setSubmitting(true);
    // signInWithOtp without emailRedirectTo sends a 6-digit OTP code (no link).
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        // Allow new users — they'll create an account via the code.
        shouldCreateUser: true,
        // Also include the magic link as a fallback in the same email.
        emailRedirectTo: buildAuthReturnUrl(),
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message || "Could not send code. Please check the email and try again.");
      return;
    }
    setStep("code-sent");
    setResendCooldown(45);
    if (isResend) toast.success("New code sent.");
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = code.replace(/\D/g, "");
    if (cleaned.length !== 6) {
      toast.error("Please enter the 6-digit code from your email.");
      return;
    }
    setVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: cleaned,
      type: "email",
    });
    setVerifying(false);
    if (error) {
      toast.error("That code didn't match. Please check your email and try again.");
      return;
    }
    // onAuthStateChange will route forward.
  };

  const isReturning = effectiveIntent === "sign_in" || effectiveIntent === "return_to_route";

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <header className="container mx-auto px-5 sm:px-6 md:px-10 pt-8">
        <Link
          to="/"
          className="font-serif text-lg text-foreground/80 hover:text-foreground transition-colors"
        >
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
              {step === "code-sent"
                ? "Check your email"
                : isReturning
                ? "Sign in"
                : "Save your journey"}
            </p>
            <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
              {step === "code-sent"
                ? "Enter your sign-in code"
                : isReturning
                ? "Welcome back"
                : pending
                ? "One step to keep your place"
                : "Save your journey"}
            </h1>
            <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-sm mx-auto">
              {step === "code-sent"
                ? `We've sent a 6-digit code to ${email}. It works on any device.`
                : isReturning
                ? "Sign in to return to your journey."
                : pending
                ? "Sign in to save your stage and unlock your weekly space."
                : "Sign in to continue setting up your journey."}
            </p>
          </div>

          <div
            className="bg-card border rounded-2xl p-7 md:p-8 shadow-soft"
            style={{ borderColor: "hsl(var(--border) / 0.4)" }}
          >
            {step === "code-sent" ? (
              <>
                <div className="flex items-center justify-center mb-5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--stage-pregnancy) / 0.25)" }}
                  >
                    <Mail size={16} style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
                  </div>
                </div>

                <form onSubmit={verifyCode} className="space-y-4">
                  <label className="block">
                    <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block text-center">
                      6-digit code
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="\d{6}"
                      maxLength={6}
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="••••••"
                      autoFocus
                      className="w-full bg-parchment border rounded-md px-4 py-3.5 font-mono text-2xl tracking-[0.5em] text-center text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                      style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={verifying || code.length !== 6}
                    className="w-full inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
                  >
                    {verifying ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Sign in <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-5 space-y-2 text-center">
                  <p className="font-sans text-[12px] font-light text-muted-foreground/70 leading-relaxed">
                    The same email also contains a one-tap sign-in link.
                  </p>
                  <p className="font-sans text-[12px] font-light text-muted-foreground/55 leading-relaxed">
                    Can't find it? Check your spam or promotions folder.
                  </p>

                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("choose");
                        setCode("");
                      }}
                      className="inline-flex items-center gap-1.5 font-sans text-[12px] font-light text-muted-foreground/70 hover:text-foreground transition-colors"
                    >
                      <ArrowLeft size={12} /> Use a different email
                    </button>
                    <span className="text-muted-foreground/30">·</span>
                    <button
                      type="button"
                      onClick={() => sendCode(true)}
                      disabled={resendCooldown > 0 || submitting}
                      className="font-sans text-[12px] font-light text-muted-foreground/70 hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : submitting ? "Sending…" : "Resend code"}
                    </button>
                  </div>
                </div>
              </>
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
                      <path
                        fill="#fff"
                        d="M21.35 11.1H12v2.84h5.36c-.23 1.5-1.66 4.4-5.36 4.4-3.23 0-5.86-2.67-5.86-5.96s2.63-5.96 5.86-5.96c1.84 0 3.07.78 3.78 1.45l2.58-2.49C16.7 3.93 14.55 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c5.2 0 8.64-3.66 8.64-8.8 0-.59-.06-1.04-.13-1.5z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-border/50" />
                  <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground/60">
                    or
                  </span>
                  <div className="flex-1 h-px bg-border/50" />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendCode();
                  }}
                  className="space-y-3"
                >
                  <label className="block">
                    <span className="font-sans text-xs font-light text-muted-foreground/80 mb-1.5 block">
                      Email address
                    </span>
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
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        Email me a sign-in code <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                <p className="font-sans text-[11px] font-light text-muted-foreground/55 text-center mt-4 leading-relaxed">
                  We'll send a 6-digit code (and a one-tap link as a backup).
                </p>
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
