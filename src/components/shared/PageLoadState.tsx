import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  message?: string;
  error?: string | null;
  onRetry?: () => void;
};

/**
 * Shared page-level loading and error surface. While loading it renders a
 * calm, layout-shaped skeleton (announced to screen readers via the message);
 * on error it renders the message with an optional retry action.
 */
const PageLoadState = ({ message = "Loading your journey…", error, onRetry }: Props) => {
  if (error) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center px-5">
        <div className="max-w-md text-center" role="alert">
          <p className="font-serif text-xl text-foreground/80">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-5 rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white"
              style={{ background: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment" role="status" aria-live="polite">
      <span className="sr-only">{message}</span>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl pt-32 md:pt-40 pb-24" aria-hidden="true">
        {/* Eyebrow + heading */}
        <Skeleton className="h-3 w-28 rounded-full bg-foreground/[0.06]" />
        <Skeleton className="mt-6 h-10 md:h-12 w-3/4 max-w-xl rounded-xl bg-foreground/[0.07]" />
        <Skeleton className="mt-4 h-4 w-1/2 max-w-md rounded-full bg-foreground/[0.06]" />

        {/* Content blocks */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-44 rounded-2xl bg-foreground/[0.05]" />
          <Skeleton className="h-44 rounded-2xl bg-foreground/[0.05]" />
        </div>
        <div className="mt-8 space-y-3.5 max-w-2xl">
          <Skeleton className="h-4 w-full rounded-full bg-foreground/[0.05]" />
          <Skeleton className="h-4 w-11/12 rounded-full bg-foreground/[0.05]" />
          <Skeleton className="h-4 w-4/5 rounded-full bg-foreground/[0.05]" />
        </div>
      </div>
    </div>
  );
};

export default PageLoadState;
