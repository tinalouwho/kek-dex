"use client";

import React from "react";
import { useAccount } from "@orderly.network/hooks";
import { useIsMobile } from "@/hooks/useIsMobile";

export const WalletDebugger: React.FC = () => {
  const account = useAccount();
  const { isMobile, isTablet, isMobileOrTablet } = useIsMobile();

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-green-400 p-4 rounded-lg text-xs max-w-sm z-50 font-mono">
      <div className="text-green-300 font-bold mb-2">🔧 Wallet Debug Info</div>

      <div className="space-y-1">
        <div>
          <span className="text-purple-300">Device:</span>{" "}
          {isMobile ? "📱 Mobile" : isTablet ? "📱 Tablet" : "🖥️ Desktop"}
        </div>

        <div>
          <span className="text-purple-300">Status:</span>{" "}
          {account.state?.status || "undefined"}
          {typeof account.state?.status === "number" &&
            ` (${account.state.status})`}
        </div>

        <div>
          <span className="text-purple-300">Address:</span>{" "}
          {account.state?.address
            ? `${account.state.address.slice(0, 6)}...${account.state.address.slice(-4)}`
            : "none"}
        </div>

        <div>
          <span className="text-purple-300">Wallet Connected:</span>{" "}
          {Boolean(account.state?.address) ? "✅ Yes" : "❌ No"}
        </div>

        <div>
          <span className="text-purple-300">User Agent:</span>{" "}
          {navigator.userAgent.includes("Mobile") ? "📱" : "🖥️"}
        </div>
      </div>

      <button
        onClick={() => console.log("Full account state:", account)}
        className="mt-2 text-xs bg-purple-600 px-2 py-1 rounded"
      >
        Log Full State
      </button>
    </div>
  );
};
