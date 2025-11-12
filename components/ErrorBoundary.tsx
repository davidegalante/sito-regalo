import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced the constructor with the class property syntax for state initialization.
  // This resolves the TypeScript errors where `this.state` and `this.props` were not
  // being recognized on the component instance. This change also fixes the
  // downstream type error in index.tsx.
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-brand-pink-50 min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-2xl font-bold text-brand-pink-500 mb-4">Oops! Qualcosa è andato storto.</h1>
          <p className="text-gray-600">Impossibile caricare l'app. Prova a ricaricarla.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-brand-pink-400 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
            aria-label="Ricarica l'applicazione"
          >
            Ricarica
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;