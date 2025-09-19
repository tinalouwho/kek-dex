"use client";

import { useEffect, useState } from "react";
import { useAccount, useWalletConnector } from "@orderly.network/hooks";

interface OrderlyAuthState {
  isAuthenticated: boolean;
  isGeneratingKey: boolean;
  error: string | null;
  keyGenerated: boolean;
}

export const useOrderlyAuth = () => {
  const { account, createOrderlyKey } = useAccount();
  const { wallet } = useWalletConnector();
  const [authState, setAuthState] = useState<OrderlyAuthState>({
    isAuthenticated: false,
    isGeneratingKey: false,
    error: null,
    keyGenerated: false,
  });

  // Get wallet address from accounts array
  const walletAddress = wallet?.accounts?.[0]?.address;

  useEffect(() => {
    const handleKeyGeneration = async () => {
      if (!walletAddress || !account) return;

      try {
        // Check if key already exists
        if (account.accountId) {
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            keyGenerated: true,
            error: null,
          }));
          return;
        }

        // Generate new Orderly key if needed
        if (!authState.isGeneratingKey && !authState.keyGenerated) {
          setAuthState((prev) => ({
            ...prev,
            isGeneratingKey: true,
            error: null,
          }));

          console.log("🔑 Generating Orderly key for wallet:", walletAddress);

          // Pass remember parameter (true to remember the key)
          await createOrderlyKey(true);

          setAuthState((prev) => ({
            ...prev,
            isGeneratingKey: false,
            keyGenerated: true,
            isAuthenticated: true,
            error: null,
          }));

          console.log("✅ Orderly key generated successfully");
        }
      } catch (error) {
        console.error("❌ Failed to generate Orderly key:", error);
        setAuthState((prev) => ({
          ...prev,
          isGeneratingKey: false,
          error:
            error instanceof Error ? error.message : "Failed to generate key",
        }));
      }
    };

    handleKeyGeneration();
  }, [
    walletAddress,
    account,
    createOrderlyKey,
    authState.isGeneratingKey,
    authState.keyGenerated,
  ]);

  const retryKeyGeneration = async () => {
    if (!walletAddress) return;

    setAuthState((prev) => ({
      ...prev,
      isGeneratingKey: false,
      keyGenerated: false,
      error: null,
    }));
  };

  return {
    ...authState,
    walletAddress,
    accountId: account?.accountId,
    retryKeyGeneration,
  };
};
