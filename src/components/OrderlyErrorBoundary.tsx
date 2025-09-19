"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class OrderlyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("🚨 OrderlyErrorBoundary caught error:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Handle WebSocket-specific errors
    if (
      error.message.includes(
        "Cannot read properties of undefined (reading 'send')",
      )
    ) {
      console.warn(
        "🔌 WebSocket connection error detected - this is likely due to early initialization",
      );
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-black">
          <div className="max-w-md w-full bg-red-900/20 border border-red-600 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-300 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
