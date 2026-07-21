type Props = {
  message?: string;
  error?: string | null;
  onRetry?: () => void;
};

const PageLoadState = ({ message = "Loading your journey…", error, onRetry }: Props) => (
  <div className="min-h-screen bg-parchment flex items-center justify-center px-5">
    <div className="max-w-md text-center" role={error ? "alert" : "status"} aria-live="polite">
      <p className="font-serif text-xl text-foreground/80">
        {error ?? message}
      </p>
      {error && onRetry && (
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

export default PageLoadState;
