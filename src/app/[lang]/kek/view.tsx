"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import LiFiTerminal to avoid SSR issues
const LiFiTerminal = dynamic(() => import("@/components/LiFiTerminal"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="kek-text-success font-mono text-lg">
        Loading $KEK Trading Terminal...
      </div>
    </div>
  ),
});

export function KekView() {
  const [isPolyfillsReady, setIsPolyfillsReady] = useState(false);

  useEffect(() => {
    // Wait for polyfills to be ready before loading LiFi widget
    const checkPolyfills = () => {
      const hasBuffer = typeof Buffer !== "undefined";
      const hasCrypto = typeof crypto !== "undefined";
      const hasWebCrypto = typeof window?.crypto !== "undefined";

      if (hasBuffer && hasCrypto && hasWebCrypto) {
        setIsPolyfillsReady(true);
      } else {
        // Try again in 100ms
        setTimeout(checkPolyfills, 100);
      }
    };

    checkPolyfills();
  }, []);

  if (!isPolyfillsReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="kek-text-success font-mono text-lg">
          Initializing crypto libraries...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Page Header */}

      {/* LiFi Terminal Container */}
      <div className="flex-1 overflow-hidden">
        <LiFiTerminal />
      </div>
    </div>
  );
}
