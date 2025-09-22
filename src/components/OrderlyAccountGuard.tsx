"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "@orderly.network/hooks";

interface OrderlyAccountGuardProps {
  children: React.ReactNode;
}

export const OrderlyAccountGuard: React.FC<OrderlyAccountGuardProps> = ({
  children,
}) => {
  const account = useAccount();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAndCreateAccount = async () => {
      if (!account.state) return;

      // Check if user is connected but doesn't have an Orderly account
      if (
        account.state.status === "not_connected" &&
        account.state.isWalletConnected
      ) {
        setIsCreatingAccount(true);
        setError(null);

        try {
          console.log("🔑 Creating Orderly key pair...");
          // First create the key pair
          await account.createOrderlyKey(true); // true = remember the key

          console.log("📝 Creating Orderly account...");
          // Then create the account
          await account.createAccount();

          console.log("✅ Orderly account created successfully!");
          setIsCreatingAccount(false);
        } catch (err) {
          console.error("❌ Failed to create Orderly account:", err);
          setError(
            err instanceof Error ? err.message : "Failed to create account",
          );
          setIsCreatingAccount(false);
        }
      }
    };

    checkAndCreateAccount();
  }, [account.state, account]);

  // Show loading state while creating account
  if (isCreatingAccount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <Image
          src="/images/keklogo2.png"
          alt="KEK Terminal"
          width={100}
          height={100}
          className="animate-pulse mb-4"
        />
        <p className="text-purple-100 font-bold font-mono text-xl text-center mb-2">
          Setting up your Orderly account...
        </p>
        <p className="text-purple-200 text-sm">
          Creating secure trading keys...
        </p>
      </div>
    );
  }

  // Show error state if account creation failed
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <Image
          src="/images/keklogo2.png"
          alt="KEK Terminal"
          width={100}
          height={100}
          className="mb-4"
        />
        <p className="text-red-500 font-bold font-mono text-xl text-center mb-2">
          Account Setup Failed
        </p>
        <p className="text-purple-200 text-sm mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:text-black transition-all duration-300 transform hover:scale-105"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render children if account is properly set up
  return <>{children}</>;
};
