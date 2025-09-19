"use client";

import React, { ReactNode } from "react";
import { useOrderlyAuth } from "@/hooks/useOrderlyAuth";

interface OrderlyAuthWrapperProps {
  children: ReactNode;
}

export const OrderlyAuthWrapper: React.FC<OrderlyAuthWrapperProps> = ({
  children,
}) => {
  const {
    isAuthenticated,
    isGeneratingKey,
    error,
    walletAddress,
    accountId,
    retryKeyGeneration,
  } = useOrderlyAuth();

  // Show loading state while generating key
  if (isGeneratingKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              🔑 Setting Up Trading Account
            </h2>
            <p className="text-gray-600 mb-4">
              Generating secure authentication keys for trading...
            </p>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-sm text-gray-500">
              This may take a few moments. Please don't close this window.
            </p>
            {walletAddress && (
              <p className="text-xs text-gray-400 mt-2">
                Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show error state if key generation failed
  if (error && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="w-full max-w-md bg-black rounded-lg shadow-lg border p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2 text-red-[#FF0000]">
              ⚠️ Authentication Error
            </h2>
            <p className="text-gray-600 mb-4">
              Failed to set up trading account authentication
            </p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button
              onClick={retryKeyGeneration}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show success state and render children once authenticated
  if (isAuthenticated && accountId) {
    return (
      <>
        <div className=" p-3 flex items-center justify-center bg-[#1B1B1B] shadow-lg rounded-lg mx-2 mt-2">
          <p className="text-sm text-[#00FF37]">
            Trading account authenticated successfully
            {accountId && (
              <span className="ml-2 text-xs  text-purple-200">
                ID: {accountId.slice(0, 8)}...
              </span>
            )}
          </p>
        </div>
        {children}
      </>
    );
  }

  // Default state - wallet not connected or still setting up
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md bg-[#00FF37] rounded-lg shadow-lg border p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Connect Wallet</h2>
          <p className="text-black font-semibold mb-4">
            Please connect your wallet to access trading features
          </p>
          <p className="text-sm text-gray-500">
            Once connected, we&apos;ll set up your secure trading account.
          </p>
        </div>
      </div>
    </div>
  );
};
