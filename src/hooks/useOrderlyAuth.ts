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
      // Wait for wallet connection
      if (!walletAddress) {
        console.log("⏳ Waiting for wallet connection...", { walletAddress });
        return;
      }

      // Wait for createOrderlyKey function to be available
      if (!createOrderlyKey) {
        console.log("⏳ Waiting for createOrderlyKey function...");
        return;
      }

      // Check if key already exists and is for the correct network
      if (account?.accountId) {
        const keyStoreNetwork = account.keyStore?.networkId;
        const expectedNetwork = process.env.NEXT_PUBLIC_ORDERLY_NETWORK;

        console.log("🔍 Account network info:", {
          accountId: account.accountId,
          keyStoreNetwork,
          expectedNetwork,
          configNetwork:
            account.configStore?._originConfigStore?.get("networkId"),
        });

        // If the account exists but for wrong network, force regeneration
        if (keyStoreNetwork !== expectedNetwork) {
          console.log(
            `🔄 Account exists but for wrong network (${keyStoreNetwork} vs ${expectedNetwork}), forcing regeneration`,
          );
          // Continue to key generation below
        } else {
          console.log(
            "✅ Orderly account already exists for correct network:",
            account.accountId,
          );
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            keyGenerated: true,
            error: null,
          }));
          return;
        }
      }

      // Skip if already generating or generated
      if (authState.isGeneratingKey || authState.keyGenerated) {
        return;
      }

      // Only generate key if we don't have an account yet
      try {
        setAuthState((prev) => ({
          ...prev,
          isGeneratingKey: true,
          error: null,
        }));

        console.log("🔑 Generating Orderly key for wallet:", walletAddress);
        console.log("🔍 createOrderlyKey function:", createOrderlyKey);
        console.log("🔍 account object:", account);

        // Add delay to ensure wallet is fully connected
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate Orderly key with more detailed logging
        console.log("🚀 Calling createOrderlyKey(true)...");
        const result = await createOrderlyKey(true);
        console.log("🔍 createOrderlyKey result:", result);

        setAuthState((prev) => ({
          ...prev,
          isGeneratingKey: false,
          keyGenerated: true,
          isAuthenticated: true,
          error: null,
        }));

        console.log("✅ Orderly key generated successfully");
      } catch (error) {
        console.error("❌ Failed to generate Orderly key:", error);
        console.error("❌ Error details:", {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          walletAddress,
          account: account?.accountId,
          createOrderlyKey: typeof createOrderlyKey,
        });

        setAuthState((prev) => ({
          ...prev,
          isGeneratingKey: false,
          keyGenerated: false,
          error:
            error instanceof Error ? error.message : "Failed to generate key",
        }));
      }
    };

    handleKeyGeneration();
  }, [
    walletAddress,
    account?.accountId,
    createOrderlyKey,
    authState.isGeneratingKey,
    authState.keyGenerated,
  ]);

  const retryKeyGeneration = async () => {
    console.log(
      "🔄 Manual retry triggered - clearing all state and localStorage...",
    );

    // Clear localStorage to force regeneration for correct network
    localStorage.clear();

    // Reset authentication state completely
    setAuthState({
      isAuthenticated: false,
      isGeneratingKey: false,
      error: null,
      keyGenerated: false,
    });

    // Force page refresh to restart the entire authentication flow
    setTimeout(() => {
      console.log("🔄 Refreshing page to restart authentication...");
      window.location.reload();
    }, 500);
  };

  return {
    ...authState,
    walletAddress,
    accountId: account?.accountId,
    retryKeyGeneration,
  };
};
