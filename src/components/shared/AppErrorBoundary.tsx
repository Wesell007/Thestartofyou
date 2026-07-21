import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { failed: boolean }

class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="min-h-screen bg-parchment flex items-center justify-center px-6">
          <div role="alert" className="max-w-md text-center">
            <h1 className="font-serif text-3xl text-foreground mb-3">Something went wrong</h1>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              This page could not be displayed. Your saved data has not been changed.
            </p>
            <button type="button" onClick={() => window.location.assign("/")} className="rounded-pill bg-terracotta px-6 py-3 text-sm text-terracotta-foreground">
              Return home
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
