"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-gray-900 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Something went wrong</h2>
          <p className="mb-6 text-gray-400">An unexpected error occurred.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="rounded-lg bg-purple-600 px-6 py-2 font-medium text-white hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
