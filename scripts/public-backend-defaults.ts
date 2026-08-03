// Committed public (non-secret) backend configuration.
//
// `.env` is gitignored, so deployment builds run without it. These values are
// the project's publishable Supabase URL / anon key, which are safe to ship in
// a client bundle. Real environment variables always take precedence.
export const PUBLIC_BACKEND_DEFAULTS = {
  VITE_SUPABASE_URL: "https://wogepxfipdipogyogced.supabase.co",
  VITE_SUPABASE_PUBLISHABLE_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZ2VweGZpcGRpcG9neW9nY2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzAzOTYsImV4cCI6MjA5MDE0NjM5Nn0.BgNLaABx4mkurHspLXJoXmuiaMWo2FuQK8DXbr4DUxI",
  VITE_SUPABASE_PROJECT_ID: "wogepxfipdipogyogced",
} as const;
