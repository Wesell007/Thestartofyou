import { validateEnvOrRenderError } from "./lib/envCheck";
import "./index.css";

// Validate required env vars BEFORE importing anything that pulls in the
// Supabase client. If validation fails, a static error screen is rendered
// and React is never mounted (which would otherwise crash on missing config).
if (validateEnvOrRenderError()) {
  void (async () => {
    const [{ createRoot }, { HelmetProvider }, { default: App }] = await Promise.all([
      import("react-dom/client"),
      import("react-helmet-async"),
      import("./App.tsx"),
    ]);
    createRoot(document.getElementById("root")!).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );
  })();
}
