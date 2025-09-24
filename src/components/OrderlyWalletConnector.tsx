"use client";

import React, { useState } from "react";
import { useWalletConnector, useAccount } from "@orderly.network/hooks";
import { Button } from "@/components/kek-ui";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

interface OrderlyWalletConnectorProps {
  className?: string;
  children?: React.ReactNode;
}

export const OrderlyWalletConnector: React.FC<OrderlyWalletConnectorProps> = ({
  className,
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
      <Button
        variant="outline"
        className={cn("cursor-default", className)}
        disabled
      >
        <span className="text-sm font-mono">
          ✅ {account.state?.address?.slice(0, 6)}...
          {account.state?.address?.slice(-4)}
        </span>
      </Button>
    );
  }

  // Show connecting state
  if (connecting || isConnecting) {
    return (
      <Button
        variant="primary"
        isLoading={true}
        className={className}
        disabled
      />
    );
  }

  return (
    <Button variant="primary" onClick={handleConnect} className={className}>
      {children}
    </Button>
  );
};

export default OrderlyWalletConnector;
