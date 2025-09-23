"use client";

import React, { useState } from "react";
import { useWalletConnector, useAccount } from "@orderly.network/hooks";
import { useIsMobile } from "@/hooks/useIsMobile";

interface OrderlyWalletConnectorProps {
  className?: string;
  children?: React.ReactNode;
}

export const OrderlyWalletConnector: React.FC<OrderlyWalletConnectorProps> = ({
  className = "px-6 py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#00FF37]/30 transition-all duration-300 transform hover:scale-105",
  children = "Connect Wallet",
}) => {
  const { connect, connecting, wallet } = useWalletConnector();
  const account = useAccount();
  const { isMobileOrTablet } = useIsMobile();
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if user is already connected
  const isWalletConnected = wallet && Boolean(account.state?.address);

  const handleConnect = async () => {
    if (connecting || isConnecting) return; // Prevent double clicks

    try {
      setIsConnecting(true);
      console.log("🔌 Connecting wallet using Orderly...");
      console.log("📱 Device:", isMobileOrTablet ? "Mobile/Tablet" : "Desktop");
      console.log("🔍 Current wallet state:", {
        wallet: wallet?.type,
        address: account.state?.address,
        status: account.state?.status,
      });

      // Use Orderly's connect method - this handles both EVM and Solana
      await connect();

      console.log("✅ Wallet connection initiated through Orderly");
    } catch (error) {
      console.error("❌ Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // If already connected, show connected state
  if (isWalletConnected) {
    return (
      <div
        className={className
          .replace("hover:scale-105", "cursor-default")
          .replace(
            "bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black",
            "bg-green-600 text-white",
          )}
      >
        <span className="text-sm font-mono">
          ✅ {account.state?.address?.slice(0, 6)}...
          {account.state?.address?.slice(-4)}
        </span>
      </div>
    );
  }

  // Show connecting state
  if (connecting || isConnecting) {
    return (
      <div className={className.replace("hover:scale-105", "cursor-wait")}>
        <span className="text-sm">Connecting...</span>
      </div>
    );
  }

  return (
    <button onClick={handleConnect} className={className}>
      {children}
    </button>
  );
};

export default OrderlyWalletConnector;
