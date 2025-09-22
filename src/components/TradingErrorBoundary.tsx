"use client";

import React, { Component, ReactNode } from "react";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class TradingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's the DecimalError we're experiencing
    if (
      error.message.includes("DecimalError") ||
      error.message.includes("Invalid argument: undefined")
    ) {
      console.log("🔧 Caught DecimalError - likely market data loading issue");
      return { hasError: true, error };
    }
    // For other errors, let them bubble up
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("TradingErrorBoundary caught an error:", error, errorInfo);

    // If it's a DecimalError, try to reload the page after a short delay
    if (
      error.message.includes("DecimalError") ||
      error.message.includes("Invalid argument: undefined")
    ) {
      console.log("🔄 DecimalError detected - will reload page in 3 seconds");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
          <Image
            src="/images/keklogo2.png"
            alt="KEK Terminal"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-purple-100 font-bold font-mono text-xl text-center mb-2">
            Loading Market Data...
          </p>
          <p className="text-purple-200 text-sm mb-4 text-center max-w-md">
            Market data is initializing. The page will reload automatically.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Reload Now
            </button>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2 border border-purple-200 text-purple-200 font-semibold rounded-full hover:bg-purple-200 hover:text-black transition-all duration-300"
            >
              Try Again
            </button>
          </div>
          {this.state.error && (
            <details className="mt-4 text-xs text-gray-400 max-w-md">
              <summary className="cursor-pointer">Error details</summary>
              <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default TradingErrorBoundary;
